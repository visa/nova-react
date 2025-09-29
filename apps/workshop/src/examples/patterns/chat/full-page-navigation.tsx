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
import { VisaAddAltTiny, VisaMediaFastForwardTiny, VisaMediaRewindTiny, VisaPinFillTiny, VisaSearchLow } from "@visa/nova-icons-react";
import {
  Button,
  Divider,
  Input,
  InputContainer,
  Link,
  Nav,
  NavAppName,
  Tab,
  Tabs,
  Typography,
  Utility,
  UtilityFragment,
} from "@visa/nova-react";
import { useContext, useState } from "react";
import ChatContext from "./shared/chat-context";

const id = "full-page-vertical-navigation";

const FullPageNavigation = () => {
  const { setResponses } = useContext(ChatContext);
  const [navExpanded, setNavExpanded] = useState(true);

  const startNewChat = () => {
    setResponses([]);
  };

  return (
    <Nav id={id} orientation="vertical" tag="header" style={{ blockSize: 'auto' }}>
      {navExpanded && (
        <Link skipLink href="#full-page-content">
          Skip to content
        </Link>
      )}
      {navExpanded ? (
        <>
          <UtilityFragment
            vFlex
            vFlexCol
            vGap={12}
            vMarginTop={16}
            vMarginRight={16}
            vMarginBottom={30}
            vMarginLeft={20}
          >
            <Link
              aria-label="application name"
              href="https://www.visa.com"
              id={`${id}-home-link`}
              noUnderline
              style={{ backgroundColor: "transparent" }}
            >
              <NavAppName>
                <Typography variant="subtitle-1">Application name</Typography>
              </NavAppName>
            </Link>
          </UtilityFragment>

          {/* Search Component */}
          <Utility vMarginHorizontal={24} vMarginBottom={24}>
            <Utility vFlex vFlexCol vGap={4}>
              <InputContainer>
                <Utility vFlex vFlexCol>
                  <VisaSearchLow />
                </Utility>
                <Input aria-required="true" id={`${id}-search-input`} type="text" placeholder="Search" />
              </InputContainer>
            </Utility>
          </Utility>

          <nav aria-label="default vertical navigation">
            <Utility vGap={8}>
              <Tabs orientation="vertical">
                <Tab sectionTitle>Pinned chats</Tab>
                <Tab>
                  <Button
                    colorScheme="tertiary"
                    element={
                      <a href="./chat">
                        <VisaPinFillTiny />
                        Chat name 1
                      </a>
                    }
                  ></Button>
                </Tab>
                <Tab sectionTitle>2 days ago</Tab>
                {['Chat name 1', 'Chat name 2', 'Chat name 3'].map((chatName, index) => (
                  <Tab key={`2-days-history-${index}`}>
                    <Button
                      colorScheme="tertiary"
                      element={<a href="./chat">{chatName}</a>}
                    />
                  </Tab>
                ))}

                <Tab sectionTitle>1 week ago</Tab>
                {['Chat name 4', 'Chat name 5', 'Chat name 6'].map((chatName, index) => (
                  <Tab key={`1-week-history-${index}`}>
                    <Button
                      colorScheme="tertiary"
                      element={<a href="./chat">{chatName}</a>}
                    />
                  </Tab>
                ))}
              </Tabs>
            </Utility>
          </nav>
          <Utility vFlex vFlexCol vAlignSelf="stretch" vGap={30} vMarginTop="auto">
            <Divider dividerType="decorative" />
            <Utility vAlignSelf="center" vGap={16} vMarginBottom={4}>
              <Button
                colorScheme="secondary"
                aria-label="start new chat"
                onClick={() => {
                  startNewChat();
                }}
              >
                <VisaAddAltTiny />
                Start new chat
              </Button>
            </Utility>
          </Utility>
        </>
      ) : (<div style={{ flex: 1 }} />)}
      <UtilityFragment vMarginLeft={navExpanded ? 'auto' : 5} vMarginRight={navExpanded ? 8 : 5}>
        <Button
          aria-label="Side bar"
          aria-expanded={!!navExpanded}
          buttonSize="small"
          colorScheme="tertiary"
          iconButton
          onClick={() => setNavExpanded(!navExpanded)}
          subtle
        >
          {navExpanded ? <VisaMediaRewindTiny rtl /> : <VisaMediaFastForwardTiny rtl />}
        </Button>
      </UtilityFragment>
    </Nav>
  );
};

export default FullPageNavigation;
