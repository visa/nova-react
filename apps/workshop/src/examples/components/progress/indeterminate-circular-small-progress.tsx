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
import { Button, ProgressCircular, Utility } from '@visa/nova-react';
import { useState } from 'react';

export const IndeterminateCircularSmallProgress = () => {
  const [paused, setPaused] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');

const start = () => {
  setInitiated(true);
  setTimeout(() => {
    setLoadingMsg('Loading...');
  }, 0);
}
  
const reset = () => {
  setInitiated(false);
  setLoadingMsg('');
}

  return (
    <Utility vFlexCol vGap={12}>
      {initiated && (
        <>
          <ProgressCircular
            className="v-flex-grow"
            indeterminate
            paused={paused}
            progressSize="small"
          />
          <span className="v-sr" role="alert">{loadingMsg}</span>
      </>
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
