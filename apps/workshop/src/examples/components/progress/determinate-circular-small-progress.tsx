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
import { Button, ProgressCircular, Typography, Utility } from '@visa/nova-react';
import { useCallback, useState, useRef } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'small-determinate-circular-progress';

export const DeterminateCircularSmallProgress = () => {
  const [value, setValue] = useState(0);
  const countingRef = useRef(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  

  const startCountUp = useCallback(async () => {
    setValue(0);
    countingRef.current = true;
    setLoadingMsg('Loading...');
    for (let i = 0; i < 100; i++) {
      if (!countingRef.current) {
        resetCount();
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 50)); // mock the time it takes to load
      setValue(prev => prev + 1); // increment the value by 1 percent
    }
    setLoadingMsg('Loading complete');
    countingRef.current = false;
  }, []);
  const resetCount = () => {
    countingRef.current = false;
    setValue(0);
    setLoadingMsg('');
  };
  return (
    <>
      <ProgressCircular aria-labelledby={id} progressSize="small" value={value} aria-valuenow={value}>
        <Typography tag="div" className="v-progress-label" variant="body-2-bold" id={id}>{value}%</Typography>
      </ProgressCircular>
      <Utility tag="span" role="alert" className="v-sr">{loadingMsg}</Utility>
      <Utility vMarginVertical={12} vFlex vGap={12}>
        <Button onClick={startCountUp}>
          Start
        </Button>
        <Button colorScheme="secondary" onClick={resetCount}>
          Reset
        </Button>
      </Utility>
    </>
  );
};
