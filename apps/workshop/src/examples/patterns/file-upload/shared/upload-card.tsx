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
import React from 'react';
import { Utility, UtilityFragment, Surface, Typography, ScreenReader } from '@visa/nova-react';
import { VisaErrorTiny } from '@visa/nova-icons-react';
import { UploadFile, UploadCardProps } from './types';

function getListItemErrorId(file: UploadFile): string {
  if (!file.error) {
    return '';
  }
  return `file-list-error-${file.id}`;
}

export const UploadCard: React.FC<UploadCardProps> = ({ file, renderActions }) => {
  const errorId = getListItemErrorId(file);
  const fileNameId = `${file.id}-name`;
  const fileSizeId = `${file.id}-size`;
  const errorMessage = `Error: ${file.error}`;
  const fileSize = `${(file.file.size / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <Utility tag="li" vFlex vFlexCol vGap={5}>
      <UtilityFragment vFlex vJustifyContent="between" vPaddingHorizontal={15} vPaddingVertical={7}>
        <Surface
          style={{
            border: file.error
              ? '1px solid var(--palette-messaging-graphics-negative)'
              : '1px solid var(--v-surface-border-color)',
            borderRadius: 'var(--theme-border-radius)',
            wordBreak: 'break-all',
          }}
        >
          <Utility vFlex vAlignItems="center" vGap={8}>
            {file.icon}
            <div>
              <Typography id={fileNameId} tag="h5" variant="label" aria-describedby={errorId}>
                {file.file.name}
              </Typography>
              <Typography id={fileSizeId} variant="label-small" colorScheme="subtle">
                {fileSize}
              </Typography>
              <UtilityFragment vHide={!file.error}>
                <ScreenReader tag="span" id={errorId}>
                  {errorMessage}
                </ScreenReader>
              </UtilityFragment>
            </div>
          </Utility>
          <Utility vFlex vAlignItems="center" vGap={8}>
            {renderActions()}
          </Utility>
        </Surface>
      </UtilityFragment>
      <UtilityFragment
        vHide={!file.error}
        vFlex
        vGap={4}
        style={{
          lineHeight: '16px',
          color: 'var(--palette-messaging-text-negative)',
        }}
      >
        <Typography tag="span" variant="label" aria-hidden>
          <VisaErrorTiny
            style={
              {
                '--v-icon-primary': 'var(--palette-messaging-text-negative)',
                '--v-icon-secondary': 'var(--palette-messaging-text-negative)',
              } as React.CSSProperties
            }
          />
          {errorMessage}
        </Typography>
      </UtilityFragment>
    </Utility>
  );
};
