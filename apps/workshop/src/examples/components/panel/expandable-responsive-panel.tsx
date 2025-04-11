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
  Utility,
  UtilityFragment,
} from '@visa/nova-react';
import { useState } from 'react';

export const ExpandableResponsivePanel = () => {
  const [open, setOpen] = useState(true);

  return (
    <Utility vFlex style={{ minBlockSize: 200 }}>
      <UtilityFragment vMarginLeft="auto">
        <PanelToggle
          aria-expanded={open}
          aria-label={open ? 'Close panel' : 'Open panel'}
          buttonSize="large"
          iconButton
          iconTwoColor
          onClick={() => setOpen(open ? false : true)}
        >
          {open ? <VisaMediaFastForwardTiny rtl /> : <VisaMediaRewindTiny rtl />}
        </PanelToggle>
      </UtilityFragment>

      {open && (
        <Panel expandable style={{ minInlineSize: 'initial' }}>
          <PanelContent>
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
      )}
    </Utility>
  );
};
