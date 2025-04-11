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
import { ProgressLinear, ProgressLabel, UtilityFragment, Utility } from '@visa/nova-react';
import { VisaErrorTiny } from '@visa/nova-icons-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'error-determinate-linear-progress';

export const ErrorProgress = () => {
  return (
    <>
      <UtilityFragment vMarginVertical={8}>
        <ProgressLinear id={id} invalid max={100} value={0} />
      </UtilityFragment>
      <ProgressLabel htmlFor={id}>
        <Utility tag="span" vFlex vGap={4} role="alert">
          <VisaErrorTiny />
          This is required text that describes the error in more detail.
        </Utility>
        <span>0%</span>
      </ProgressLabel>
    </>
  );
};
