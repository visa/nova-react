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
import { Button, Dialog, Typography, useFocusTrap, Utility } from "@visa/nova-react";
import { default as ChatInput } from "./shared/chat-input";
import { VisaCloseLow, VisaMinimizeLow } from "@visa/nova-icons-react";
import ChatSuggestions from "./shared/chat-suggestions";
import ResponseChatBubble from "./shared/response-chat-bubble";
import UserChatBubble from "./shared/user-chat-bubble";

const id = "modal-chatbot";
const BASE_URL = import.meta.env.BASE_URL;

const DefaultDialogChat = () => {

    const { onKeyNavigation, ref } = useFocusTrap();

    const responses = [
        {
            timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: "This is a sent message.",
            role: "User 1",
        },
        {
            timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: "This is a sent message with more text. It fills the container to a maximum width, then wraps to another line.",
            role: "User 1",
        },
        {
            timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: "This is a received message.",
            role: "User 2",
        },
        {
            timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: "This is a received message with more text. It fills the container to a maximum width, then wraps to another line.",
            role: "User 2",
        }
    ];

    const handleClose = () => {
        ref.current?.close();
    };
    return (
        <div>
            <Button aria-label="open chat" iconButton onClick={() => ref.current?.showModal()}>
                <img role="presentation" src={`${BASE_URL}/chat-ai.svg`} />
            </Button>
            <Dialog
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    inlineSize: "min(500px, 90vw)",
                    blockSize: "min(500px, 90vh)",
                    margin: "0",
                    padding: "0",
                    gap: "10px",
                    flexDirection: "column"
                }}
                aria-describedby={`${id}-description`}
                aria-labelledby={`${id}-title`}
                id={id}
                ref={ref}
                onKeyDown={(e) => onKeyNavigation(e, ref.current?.open)}
            >
                <Utility
                    vFlex
                    vJustifyContent="between"
                    vAlignItems="center"
                    style={{
                        blockSize: "62px",
                        borderRadius: '10px',
                        inlineSize: "100%",
                        paddingBlock: "8px",
                        paddingInline: "16px",
                        flexShrink: 0,
                        background: `var(--palette-default-surface-1, #FFF)`,
                        boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.05)`,
                    }}
                >
                    <Button aria-label="minimize dialog" colorScheme="tertiary" iconButton buttonSize="large" onClick={handleClose}>
                        <VisaMinimizeLow />
                    </Button>
                    <Typography variant="headline-3" style={{ color: 'var(--palette-accent-app-name)' }}>Chat name</Typography>
                    <Button
                        aria-label="close dialog"
                        colorScheme="tertiary"
                        iconButton
                        buttonSize="large"
                        onClick={handleClose}
                    >
                        <VisaCloseLow />
                    </Button>
                </Utility>
                <Utility
                    vFlex
                    vFlexCol
                    style={{
                        flex: "1",
                        blockSize: "500px", overflow: "auto", padding: "var(--size-scalable-16)"
                    }
                    }
                >
                    {responses.map((response, index) => {
                        const prev = responses[index - 1];
                        const id = 'default-dialog-chat';
                        const showTimestamp = index === 0 || response.role !== prev?.role;

                        return (
                            response.role === "User 1" ? (
                                <UserChatBubble key={`${id}-user-${index}`} response={response} hideAvatar={true} showTimestamp={showTimestamp} />
                            ) : (
                                <div key={`${id}-response-${index}`} style={{ marginInlineEnd: 48 }}>
                                    <ResponseChatBubble smallAvatar={true} response={response} showTimestamp={showTimestamp} />
                                </div>))
                    })}
                </Utility>
                <Utility vFlex vFlexCol vGap={8} vPadding={16} style={{
                    overflow: 'auto',
                    flexShrink: 0
                }}>
                    {responses.length === 0 && <ChatSuggestions />}
                    <ChatInput id='dialog-chat-input' showCharacterCount={false} style={{
                        borderRadius: "10px",
                        minInlineSize: "300px"
                    }} />
                </Utility>
            </Dialog>
        </div >
    );
};

export default DefaultDialogChat;
