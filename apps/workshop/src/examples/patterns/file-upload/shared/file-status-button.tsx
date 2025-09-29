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
import React, { forwardRef, CSSProperties } from 'react';
import { ProgressCircular, ScreenReader, Utility } from '@visa/nova-react';
import { VisaReloadTiny, VisaSuccessTiny } from '@visa/nova-icons-react';
import { FileStatusButtonProps } from './types';

export const FileStatusButton = forwardRef<HTMLDivElement, FileStatusButtonProps>(({ uploadFile, onRetry }, ref) => {
  const isError = !!uploadFile.error;
  const isUploading = !!uploadFile.uploading && !uploadFile.error;
  const isUploaded = !!uploadFile.uploaded && !uploadFile.error && !uploadFile.uploading;

  let content: React.ReactNode;
  let ariaLabel: string | undefined;
  let role: string | undefined;
  let tabIndex: number = -1;

  if (isError) {
    content = <VisaReloadTiny />;
    ariaLabel = `Retry uploading ${uploadFile.file.name}`;
    role = 'button';
    tabIndex = 0;
  } else if (isUploading) {
    content = (
      <Utility vMarginHorizontal={11} style={{ '--v-progress-bar-thickness': '2px' } as CSSProperties}>
        <ProgressCircular indeterminate progressSize={16} />
        <ScreenReader>{`Uploading ${uploadFile.file.name}`}</ScreenReader>
      </Utility>
    );
    role = 'img';
    ariaLabel = `Uploading ${uploadFile.file.name}`;
  } else if (isUploaded) {
    content = (
      <Utility vMarginHorizontal={11} style={{ blockSize: '16px' }}>
        <VisaSuccessTiny />
      </Utility>
    );
    role = 'img';
    ariaLabel = `Successfully uploaded ${uploadFile.file.name}`;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if ((e.key === 'Enter' || e.key === ' ') && isError) {
      e.preventDefault();
      onRetry();
    }
  }

  return (
    <div
      ref={ref}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      role={role}
      onClick={isError ? onRetry : undefined}
      onKeyDown={isError ? handleKeyDown : undefined}
      className={isError ? 'v-button v-button-tertiary v-button-icon' : ''}
      style={{
        ...(!isError && { outline: 'none' }),
      }}
    >
      {content}
    </div>
  );
});

FileStatusButton.displayName = 'FileStatusButton';
