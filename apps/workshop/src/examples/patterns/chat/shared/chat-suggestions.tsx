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
import { Checkbox, Chip, Typography, Utility } from '@visa/nova-react';
import { useContext } from 'react';
import ChatContext from './chat-context';
const id = 'chat-suggestion';

//Customize this with your own chat suggestions
const chips = ['How do I reset my password?', 'Summarize a document', 'Find a report'];

const ChatSuggestions = () => {
  const { setResponses } = useContext(ChatContext);

  return (
    <Utility vFlex vFlexCol vAlignItems="end" vGap={8}>
      <Typography variant="label-large">Prompt suggestions</Typography>
      <Utility vFlex vFlexWrap vGap={8} vAlignItems="end" vJustifyContent="end">
        {chips.map((chip, index) => (
          <Chip<'label'>
            chipType="selection"
            htmlFor={`${id}-${index}`}
            key={`${id}-${index}`}
            tag="label"
            style={{ maxBlockSize: '32px', minBlockSize: 'fit-content' }}
          >
            <span style={{ textWrap: 'pretty' }}>{chip}</span>
            <Checkbox
              aria-label={chip}
              id={`${id}-${index}`}
              onChange={() => {
                setResponses([
                  {
                    timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    message: chip,
                    role: "User 1",
                  },
                ]);
              }}
            />
          </Chip>
        ))}
      </Utility>
    </Utility>
  );
};

export default ChatSuggestions;
