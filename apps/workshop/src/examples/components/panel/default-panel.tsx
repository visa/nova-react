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
import { VisaCloseTiny } from '@visa/nova-icons-react';
import {
  Button,
  Panel,
  PanelBody,
  PanelContent,
  PanelHeader,
  Typography,
  Utility,
  UtilityFragment,
} from '@visa/nova-react';

export const DefaultPanel = () => {
  return (
    <Utility vFlex>
      <UtilityFragment vMarginLeft="auto">
        <Panel style={{ minInlineSize: 'initial' }}>
          <PanelContent>
            <Utility element={<PanelHeader />} vFlex vFlexRow vGap={4} vJustifyContent="between">
              <Typography tag="h2" variant="headline-3">
                Panel title
              </Typography>
              <Button
                aria-label="Close panel"
                buttonSize="small"
                className="-v-mt-3 -v-mr-8"
                colorScheme="tertiary"
                iconButton
                subtle
              >
                <VisaCloseTiny />
              </Button>
            </Utility>
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
