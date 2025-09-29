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
import { useClick, useFloating, useInteractions } from "@floating-ui/react";
import { VisaDeleteTiny, VisaEditTiny, VisaFileDownloadTiny, VisaIdeaTiny, VisaOptionHorizontalTiny, VisaSearchTiny } from "@visa/nova-icons-react";
import {
  Button,
  DropdownButton,
  DropdownMenu,
  Listbox,
  Panel,
  PanelBody,
  PanelContent,
  PanelToggle,
  Utility,
  UtilityFragment,
} from "@visa/nova-react";
import { useState } from "react";
import { default as ChatInput } from "./shared/chat-input";
import ResponseChatBubble from "./shared/response-chat-bubble";
import UserChatBubble from "./shared/user-chat-bubble";

const DefaultPanelChat = () => {
  const BASE_URL = import.meta.env.BASE_URL;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    open: dropdownOpen,
    onOpenChange: setDropdownOpen,
    placement: 'bottom-end',
  });

  const onFloatingClick = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([onFloatingClick]);

  const [open, setOpen] = useState(false);
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

  return (
    <div className="layout-example" style={{ background: "var(--palette-default-surface-3)" }}>
      <Utility vFlex style={{ blockSize: "100vh" }}>
        <UtilityFragment vMarginLeft="auto">
          <PanelToggle
            aria-expanded={open}
            aria-label={open ? "Close panel" : "Open panel"}
            buttonSize="large"
            iconButton
            iconTwoColor
            onClick={() => setOpen(open ? false : true)}
          >
            <img role="presentation"
              src={`${BASE_URL}/chat-ai.svg`} />

          </PanelToggle>
        </UtilityFragment>

        {open && (
          <Panel expandable style={{ inlineSize: "400px" }}>
            <PanelContent style={{ display: "flex", flexDirection: "column", blockSize: "100%", overflow: "hidden" }}>
              <Utility
                vFlex
                vJustifyContent="between"
                vAlignItems="center"
                style={{
                  blockSize: "62px",
                  inlineSize: "100%",
                  paddingBlock: "8px",
                  paddingInline: "16px",
                  background: `var(--palette-default-surface-1, #FFF)`,
                  boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.05)`,
                  flexShrink: 0,
                }}
              >
                <div style={{ inlineSize: 46 }}></div>
                Chat name
                <DropdownButton
                  buttonSize="large"
                  aria-controls="more-options"
                  aria-expanded={dropdownOpen}
                  aria-label="see more options"
                  iconButton
                  colorScheme="tertiary"
                  id={`more-options-button`}
                  ref={refs.setReference}
                  {...getReferenceProps({
                    onBlur: () => setDropdownOpen(false)
                  })}
                >
                  <VisaOptionHorizontalTiny />
                </DropdownButton>
                {dropdownOpen && (
                  <DropdownMenu
                    id="more-options"
                    aria-hidden={!dropdownOpen}
                    ref={refs.setFloating}
                    style={{ inlineSize: '180px', zIndex: 9999, ...floatingStyles }}
                    {...getFloatingProps()}
                  >
                    <UtilityFragment vHide={!dropdownOpen}>
                      <Listbox>
                        <li>
                          <UtilityFragment
                            vFlex
                            vFlexRow
                            vAlignItems="start"
                            vGap={6}
                            vPaddingHorizontal={8}
                            vPaddingVertical={11}
                          >
                            <Button className="v-listbox-item" colorScheme="tertiary" subtle>
                              <VisaEditTiny /> Rename
                            </Button>
                          </UtilityFragment>
                        </li>
                        <li>
                          <UtilityFragment
                            vFlex
                            vFlexRow
                            vAlignItems="start"
                            vGap={6}
                            vPaddingHorizontal={8}
                            vPaddingVertical={11}
                          >
                            <Button className="v-listbox-item" colorScheme="tertiary" subtle>
                              <VisaSearchTiny /> Search in chat
                            </Button>
                          </UtilityFragment>
                        </li>
                        <li>
                          <UtilityFragment
                            vFlex
                            vFlexRow
                            vAlignItems="start"
                            vGap={6}
                            vPaddingHorizontal={8}
                            vPaddingVertical={11}
                          >
                            <Button className="v-listbox-item" colorScheme="tertiary" subtle>
                              <VisaFileDownloadTiny /> Download
                            </Button>
                          </UtilityFragment>
                        </li>
                        <li>
                          <UtilityFragment
                            vFlex
                            vFlexRow
                            vAlignItems="start"
                            vGap={6}
                            vPaddingHorizontal={8}
                            vPaddingVertical={11}
                          >
                            <Button className="v-listbox-item" colorScheme="tertiary" subtle>
                              <VisaIdeaTiny /> Make a suggestion
                            </Button>
                          </UtilityFragment>
                        </li>
                        <li>
                          <UtilityFragment
                            vFlex
                            vFlexRow
                            vAlignItems="start"
                            vGap={6}
                            vPaddingHorizontal={8}
                            vPaddingVertical={11}
                          >
                            <Button className="v-listbox-item" colorScheme="tertiary" destructive>
                              <VisaDeleteTiny /> Delete chat
                            </Button>
                          </UtilityFragment>
                        </li>
                      </Listbox>
                    </UtilityFragment>
                  </DropdownMenu>
                )}
              </Utility>

              <PanelBody style={{
                paddingTop: "10px",
                flex: 1,
                overflowY: "auto",
                minHeight: 300
              }}>
                <Utility vFlex vFlexCol
                  style={{
                    flex: "1",
                    overflow: "auto"
                  }}>
                  {responses.map((response, index) => {
                    //looks for the previous response to determine if the timestamp should be shown
                    const prev = responses[index - 1];
                    const id = 'default-panel-chat';
                    const showTimestamp =
                      index === 0 || response.role !== prev?.role;

                    return (
                      response.role === "User 1" ? (
                        <UserChatBubble key={`${id}-user-${index}`} response={response} hideAvatar={true} showTimestamp={showTimestamp} />
                      ) : (
                        <div style={{ marginInlineEnd: 48 }}>
                          <ResponseChatBubble key={`${id}-response-${index}`} response={response} smallAvatar={true} showTimestamp={showTimestamp} />
                        </div>
                      ))
                  })}
                </Utility>
              </PanelBody>
              <Utility
                vFlex
                vFlexCol
                vGap={8}
                vPadding={16}
                style={{
                  flexShrink: 0
                }}
              >
                <ChatInput id='panel-chat-input' showCharacterCount={false} />
              </Utility>
            </PanelContent>
          </Panel>
        )}
      </Utility>
    </div>
  )
};


export default DefaultPanelChat;
