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
import { VisaMediaPauseAltTiny, VisaMediaPlayAltTiny } from '@visa/nova-icons-react';
import { Button, ProgressLinear, Utility, UtilityFragment } from '@visa/nova-react';
import { useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'no-label-indeterminate-linear-progress';

export const IndeterminateNoLabelProgress = () => {
  const [paused, setPaused] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');

const start = () => {
  setInitiated(true);
  setTimeout(() => {
    setLoadingMsg('Loading...');
  }, 500);
}
  
const reset = () => {
  setInitiated(false);
  setLoadingMsg('');
}

  return (
    <Utility vFlexCol vGap={12}>
      {initiated && (
      <Utility vFlexGrow>
        <UtilityFragment vMarginVertical={8}>
          <ProgressLinear aria-label="Please wait" id={id} paused={paused} />
        </UtilityFragment>
        <label className="v-progress-label v-sr" htmlFor={id}>
          <Utility tag="span" role="alert">{loadingMsg}</Utility>
        </label>
      </Utility>
      )}
    <Utility vMarginVertical={12} vFlex vGap={12}>
        <Button onClick={() => start()}>
          Start
        </Button>
        <Button colorScheme="secondary" onClick={() => reset()}>
          Reset
        </Button>
        <Button colorScheme="secondary" onClick={() => setPaused(!paused)}>
          {paused ? (
            <>
              <VisaMediaPlayAltTiny />
              Play
            </>
          ) : (
            <>
              <VisaMediaPauseAltTiny />
              Pause
            </>
          )}
        </Button>
      </Utility>
    </Utility>
  );
};
