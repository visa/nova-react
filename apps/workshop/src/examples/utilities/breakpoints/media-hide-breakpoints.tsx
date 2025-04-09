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
import { VisaDeviceLaptopLow, VisaDeviceMobileLow } from '@visa/nova-icons-react';
import { Avatar, Utility, UtilityFragment } from '@visa/nova-react';
import { CSSProperties } from 'react';

export const MediaHideBreakpoints = () => {
  return (
    <Utility vFlex vFlexRow vGap={8} vFlexWrap style={{ containerType: 'inline-size' }}>
      <UtilityFragment vMediaHide="xs">
        <Avatar style={{ '--v-avatar-background': '#e50000' } as CSSProperties}>XS</Avatar>
      </UtilityFragment>
      <UtilityFragment vMediaHide="sm">
        <Avatar style={{ '--v-avatar-background': 'orange', '--v-avatar-foreground': 'black' } as CSSProperties}>
          SM
        </Avatar>
      </UtilityFragment>
      <UtilityFragment vMediaHide="md">
        <Avatar style={{ '--v-avatar-background': 'yellow', '--v-avatar-foreground': 'black' } as CSSProperties}>
          MD
        </Avatar>
      </UtilityFragment>
      <UtilityFragment vMediaHide="lg">
        <Avatar style={{ '--v-avatar-background': 'green' } as CSSProperties}>LG</Avatar>
      </UtilityFragment>
      <UtilityFragment vMediaHide="xl">
        <Avatar style={{ '--v-avatar-background': 'blue' } as CSSProperties}>XL</Avatar>
      </UtilityFragment>
      <UtilityFragment vMediaHide="xxl">
        <Avatar style={{ '--v-avatar-background': 'purple' } as CSSProperties}>XXL</Avatar>
      </UtilityFragment>
      <UtilityFragment vMediaHide="mobile">
        <Avatar>
          <VisaDeviceLaptopLow aria-label="Showing a laptop to indicate we're on a desktop-sized media" />
        </Avatar>
      </UtilityFragment>
      <UtilityFragment vMediaHide="desktop">
        <Avatar>
          <VisaDeviceMobileLow aria-label="Showing a mobile device to indicate we're on a mobile-sized media" />
        </Avatar>
      </UtilityFragment>
    </Utility>
  );
};
