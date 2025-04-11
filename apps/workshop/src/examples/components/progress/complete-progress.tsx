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
import { VisaSuccessTiny } from '@visa/nova-icons-react';
import { ProgressLabel, ProgressLinear, Utility, UtilityFragment } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'complete-linear-progress';

export const CompleteProgress = () => {
  return (
    <>
      <UtilityFragment vMarginVertical={8}>
        <ProgressLinear completed id={id} max={100} value={100} aria-valuenow={100} />
      </UtilityFragment>
      <ProgressLabel htmlFor={id}>
        <Utility tag="span" vFlex vGap={4} role="alert">
          <VisaSuccessTiny />
          File is now uploaded.
        </Utility>
        <span>100%</span>
      </ProgressLabel>
    </>
  );
};
