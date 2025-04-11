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
import { useState } from 'react';
import { VisaClearAltTiny } from '@visa/nova-icons-react';
import { Button, Chip, Utility } from '@visa/nova-react';

export const CompactRemovableGroupChip = () => {
  const initialChips = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'];
  const [chips, setChips] = useState(initialChips);

  const handleRemove = (chipToRemove: string) => {
    setChips(chips => chips.filter(chip => chip !== chipToRemove));
  };

  const resetChips = () => {
    setChips(initialChips);
  };

  return (
    <>
      <Utility vFlex vFlexWrap vGap={8}>
        {chips.map((chip, index) => (
          <Chip chipSize="compact" key={index}>
            {chip}
            <Button iconButton colorScheme="tertiary" subtle aria-label={`Clear ${chip}`} onClick={() => handleRemove(chip)}>
              <VisaClearAltTiny />
            </Button>
          </Chip>
        ))}
      </Utility>
      <Utility vMarginTop={12}>
        <Button onClick={resetChips}>Reset</Button>
      </Utility>
    </>
  );
};