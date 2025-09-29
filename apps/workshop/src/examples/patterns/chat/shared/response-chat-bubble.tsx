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
import { VisaFlagTiny } from "@visa/nova-icons-react";
import Avatar from "@visa/nova-react/avatar";
import { Button, Typography, Utility } from '@visa/nova-react';
import ChatActions from "./chat-actions";
import ChatCodeBlock from "./chat-code-block";

type Props = {
    hideAvatar?: boolean;
    smallAvatar?: boolean;
    response: {
        timeStamp: string;
        message: string;
        code?: string;
        role: string;
    };
    showTimestamp?: boolean;
}
const BASE_URL = import.meta.env.BASE_URL;


const ResponseChatBubble = (({ response, smallAvatar, hideAvatar, showTimestamp }: Props) => {
    return (
        <Utility style={{ maxInlineSize: 'calc(100cqi - 208px)' }}>
            <Utility vFlex vAlignItems="start" vAlignSelf="stretch" vGap={8} vPaddingBottom={showTimestamp ? 4 : 20}>
                {!hideAvatar && <div style={{ paddingBlockStart: "18px", paddingInlineStart: showTimestamp ? "0" : "32px" }}>
                    {showTimestamp &&
                        <Avatar small={smallAvatar} aria-label="Virtual assistant">
                            <img src={`${BASE_URL}/chat-ai-avatar.svg`} alt="chat icon" />
                        </Avatar>
                    }
                </div>}
                <Utility
                    vFlex
                    vFlexCol
                    vAlignItems="start"
                    vGap={4}
                >
                    {showTimestamp && <Utility vFlex vGap={8}>
                        <Typography variant="label-small"> {response.role}</Typography>
                        <Typography variant="label-small"> {response.timeStamp}</Typography>
                    </Utility>}
                    <Utility style={{ maxInlineSize: 'calc(100cqi - 208px)' }}>
                        <Utility vFlex vFlexCol vGap={6} vPaddingVertical={12} vPaddingHorizontal={14}
                            id="response-chat-bubble"
                            tabIndex={0}
                            aria-label={`${response.message} ${response.code} message from ${response.role} at ${response.timeStamp}. Press tab to navigate to more options.`}
                            style={{
                                borderRadius: "10px",
                                backgroundColor: "var(--palette-default-surface-highlight)",
                            }}
                        >
                            <Typography variant="body-2" style={{
                                wordWrap: "break-word",
                                wordBreak: "break-word",
                                whiteSpace: "pre-wrap",
                                overflowWrap: "break-word"
                            }}>
                                {response.message}
                            </Typography>
                            {response.code && (
                                <ChatCodeBlock language="html" code={response.code} />
                            )}
                            <Utility vFlex vJustifyContent="end" vGap={4}>
                                {/* Replace button with your desired action */}
                                <Button aria-label="action" id="refresh-action-button" buttonSize="small" colorScheme="tertiary" iconButton subtle>
                                    <VisaFlagTiny />
                                </Button>
                                <ChatActions />
                            </Utility>
                        </Utility>
                    </Utility>
                </Utility>
            </Utility>
        </Utility>
    );
});

export default ResponseChatBubble;