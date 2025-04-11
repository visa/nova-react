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
import { VisaMediaFastForwardTiny, VisaMediaRewindTiny } from '@visa/nova-icons-react';
import {
  Panel,
  PanelBody,
  PanelContent,
  PanelHeader,
  PanelToggle,
  Typography,
  useFocusTrap,
  Utility,
  PanelTabs,
  Button,
  UtilityFragment,
  Tab,
  Divider,
} from '@visa/nova-react';
import { useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'tabbed-expandable-panel-example';

const tabs = ['FAQ', 'Chat', 'Contact'];

export const TabbedModalExpandablePanel = () => {
  const { onKeyNavigation, ref } = useFocusTrap();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <Utility vFlex>
      <UtilityFragment vMarginLeft="auto">
        <PanelToggle
          aria-expanded={false}
          aria-label="Open panel"
          buttonSize="large"
          iconButton
          iconTwoColor
          onClick={() => ref.current?.showModal()}
        >
          <VisaMediaRewindTiny rtl />
        </PanelToggle>
      </UtilityFragment>

      <UtilityFragment vMarginLeft="auto">
        <Panel
          expandable
          onKeyDown={e => onKeyNavigation(e, ref.current?.open)}
          ref={ref}
          style={{ height: 400 }}
          tag="dialog"
        >
          <PanelToggle
            aria-expanded="true"
            aria-label="Close panel"
            buttonSize="large"
            iconButton
            iconTwoColor
            onClick={() => ref.current?.close()}
          >
            <VisaMediaFastForwardTiny rtl />
          </PanelToggle>

          <PanelContent>
            <PanelTabs orientation="horizontal" role="tablist">
              {tabs.map((tab, index) => (
                <Tab key={id + tab} role="none">
                  <Button
                    aria-label={tab}
                    aria-selected={index === selectedTabIndex}
                    buttonSize="large"
                    colorScheme="tertiary"
                    onClick={() => setSelectedTabIndex(index)}
                    role="tab"
                  >
                    {tab}
                  </Button>
                </Tab>
              ))}
            </PanelTabs>
            <Divider dividerType="decorative" />
            <PanelHeader>
              <Typography tag="h2" variant="headline-3">
                Panel title
              </Typography>
            </PanelHeader>
            <PanelBody>
              <Typography tag="h3" variant="subtitle-2">
                Panel subtitle
              </Typography>
              <Typography>
                This is required text that can be used to describe the panel title and subtitle in more detail.
              </Typography>
            </PanelBody>
          </PanelContent>
        </Panel>
      </UtilityFragment>
    </Utility>
  );
};
