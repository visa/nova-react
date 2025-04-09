/**
 *              Copyright (c) 2025 Visa, Inc.
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
import { Utility } from '@visa/nova-react';
import { CSSProperties } from 'react';

// These styles simply makes a square box for demo purposes.
const defaultBoxStyle: CSSProperties = {
  alignItems: 'center',
  background: 'var(--palette-default-surface-2, #FFF)',
  display: 'flex',
  blockSize: 100,
  inlineSize: 100,
  justifyContent: 'center',
};

export const AllElevation = () => {
  return (
    <Utility vFlex vFlexWrap vGap={12}>
      <Utility vElevation="none" style={defaultBoxStyle}>
        None
      </Utility>
      <Utility vElevation="inset" style={defaultBoxStyle}>
        Inset
      </Utility>
      <Utility vElevation="xsmall" style={defaultBoxStyle}>
        XSmall
      </Utility>
      <Utility vElevation="small" style={defaultBoxStyle}>
        Small
      </Utility>
      <Utility vElevation="medium" style={defaultBoxStyle}>
        Medium
      </Utility>
      <Utility vElevation="large" style={defaultBoxStyle}>
        Large
      </Utility>
      <Utility vElevation="xlarge" style={defaultBoxStyle}>
        XLarge
      </Utility>
      <Utility vElevation="xxlarge" style={defaultBoxStyle}>
        XXLarge
      </Utility>
    </Utility>
  );
};
