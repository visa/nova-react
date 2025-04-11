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
import { Checkbox, CheckboxPanel, Utility, UtilityFragment } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'without-description-panel-checkbox';

export const WithoutDescriptionPanelCheckbox = () => {
  return (
    <UtilityFragment vAlignItems="start">
      <CheckboxPanel htmlFor={id}>
        <Utility style={{ inlineSize: '100%' }} vAlignItems="center" vFlex vGap={2}>
          <Checkbox className="v-flex-shrink-0" id={id} name={id} />
          Label
        </Utility>
      </CheckboxPanel>
    </UtilityFragment>
  );
};
