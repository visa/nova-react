/**
 *              © 2025 Visa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/
import { VisaAttachmentTiny, VisaErrorTiny, VisaMicrophoneTiny, VisaSendTiny } from "@visa/nova-icons-react";
import { Button, InputContainer, InputMessage, Label, Textarea, Utility } from "@visa/nova-react";
import { ChangeEvent, useContext, useState, useEffect } from "react";
import ChatContext from "./chat-context";
import Styles from './chat-code-block-css.module.scss';

const maxCharacters = 100000;

type Props = {
  id?: string;
  style?: React.CSSProperties;
  showCharacterCount?: boolean;
}

const ChatInput = ({ style, id = 'chat-input', showCharacterCount = true }: Props) => {

  const getMessage = ({
    characterCount,
    characterCountInvalid,
    invalid,
  }: {
    characterCount: number;
    characterCountInvalid: boolean;
    invalid: boolean;
  }) => {
    if (invalid) return "Input field can't be empty. Please enter a message to continue.";
    if (showCharacterCount) {
      if (characterCountInvalid)
        return `${(characterCount - maxCharacters).toLocaleString()} character${characterCount - maxCharacters !== 1 ? "s" : ""
          } over limit`;
      return `${(maxCharacters - characterCount).toLocaleString()} character${maxCharacters - characterCount !== 1 ? "s" : ""
        } remaining`;
    };
  }
  const { setResponses, responses } = useContext(ChatContext);

  const [invalid, setInvalid] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (responses.length === 0) {
      setInvalid(false);
    }
  }, [responses]);

  const characterCount = text.length;
  const characterCountInvalid = characterCount > maxCharacters;
  const messageIsError = characterCountInvalid || invalid;

  const message = getMessage({ characterCount, characterCountInvalid, invalid });

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvalid(false);
    setText("");
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvalid(characterCount === 0);
    if (characterCount === 0) return;
    setResponses(prevResponses => [
      ...prevResponses,
      {
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: text,
        role: "User 1",
      },
    ]);
    setText("");
  };

  const onTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInvalid(false);
    setText(e.target.value);
  };

  return (
    <form onReset={onReset} onSubmit={onSubmit}>
      <Utility vFlex vFlexCol vGap={4}>
        {/* necessary to keep an empty label for input message styling */}
        <Label />
        <InputContainer className="v-flex-row" style={{
          ...style,
          position: "relative"
        }}>
          <Textarea
            aria-describedby={`${id}-message`}
            aria-invalid={characterCountInvalid || invalid}
            aria-required="true"
            id={id}
            fixed
            name={'test'}
            onChange={onTextChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setInvalid(characterCount === 0);
                if (characterCount === 0) return;
                setResponses((prevResponses) => [
                  ...prevResponses,
                  {
                    timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    message: text,
                    role: "User 1",
                  },
                ]);
                setText("");
              }
            }}
            value={text}
            placeholder="Start typing..."
            style={{
              marginTop: "0px",
              marginBlockEnd: "40px"
            }}
            className={Styles.chatTextareaResize}
          />
          <div style={{
            position: "absolute",
            right: "8px",
            bottom: "6px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            zIndex: 1000,
          }}>
            <Button aria-label="record" type="button" colorScheme="tertiary" iconButton subtle>
              <VisaMicrophoneTiny />
            </Button>
            <Button aria-label="files" type="button" colorScheme="tertiary" iconButton subtle>
              <VisaAttachmentTiny />
            </Button>
            <Button
              aria-label="send"
              type="submit"
              iconButton
              subtle
              colorScheme="tertiary"
              style={{ blockSize: "32px", inlineSize: "32px", padding: "7px" }}
            >
              <VisaSendTiny />
            </Button>
          </div>
        </InputContainer>
        <InputMessage
          aria-atomic={messageIsError}
          aria-live={messageIsError ? "assertive" : "polite"}
          id={`${id}-message`}
          role={messageIsError ? "alert" : undefined}
        >
          {messageIsError && <VisaErrorTiny />}
          {message}
        </InputMessage>
      </Utility>
    </form>
  );
};

export default ChatInput;
