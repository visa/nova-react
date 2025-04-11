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
  UtilityFragment,
} from '@visa/nova-react';

export const SecondaryModalExpandablePanel = () => {
  const { onKeyNavigation, ref } = useFocusTrap();

  return (
    <Utility vFlex>
      <UtilityFragment vMarginLeft="auto">
        <PanelToggle
          aria-expanded={false}
          aria-label="Open panel"
          buttonSize="large"
          colorScheme="secondary"
          iconButton
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
            colorScheme="secondary"
            iconButton
            onClick={() => ref.current?.close()}
          >
            <VisaMediaFastForwardTiny rtl />
          </PanelToggle>

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
      </UtilityFragment>
    </Utility>
  );
};
