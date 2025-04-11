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
import { Button, ProgressLabel, ProgressLinear, Utility, UtilityFragment } from '@visa/nova-react';
import { useCallback, useState, useRef } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'determinate-linear-progress';

export const DeterminateProgress = () => {
  const [value, setValue] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState('');
  const countingRef = useRef(false);

  const startCountUp = useCallback(async () => {
    setValue(0);
    countingRef.current = true;
    setTimeout(() => setLoadingMsg('Loading...'), 500);
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
      <UtilityFragment vMarginVertical={8}>
        <ProgressLinear id={id} max={100} value={value}/>
      </UtilityFragment>
      <ProgressLabel htmlFor={id}>
        <span>Filename.jpg</span>
        <span>{value}%</span>
        <span role="alert" className='v-sr'>{loadingMsg}</span>
      </ProgressLabel>
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
