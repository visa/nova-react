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
import { Button, Dialog, DialogCloseButton, DialogContent, DialogHeader, Typography, Utility } from '@visa/nova-react';
import { VisaCloseTiny, MessageIcon } from '@visa/nova-icons-react';
import { RefObject } from 'react';

interface ExitDialogProps {
  exitDialogId: string;
  exitDialogRef: RefObject<HTMLDialogElement>;
  onKeyNavigation: (e: React.KeyboardEvent<HTMLDialogElement>, isOpen?: boolean) => void;
}

export const ExitDialog = ({ exitDialogId, exitDialogRef, onKeyNavigation }: ExitDialogProps) => {
  return (
    <Dialog
      aria-describedby={`${exitDialogId}-description`}
      aria-labelledby={`${exitDialogId}-title`}
      ref={exitDialogRef}
      id={exitDialogId}
      messageType="warning"
      onKeyDown={e => onKeyNavigation(e, exitDialogRef.current?.open)}
      style={{ maxWidth: '300px' }}
    >
      <DialogContent>
        <DialogHeader id={`${exitDialogId}-title`}>
          <MessageIcon messageType="warning" />
          Exit form?
        </DialogHeader>
        <Typography id={`${exitDialogId}-description`}>
          Your progress has been automatically saved. You can continue where you left off when you return.
        </Typography>
        <Utility vFlex vFlexWrap vGap={8} vPaddingTop={16}>
          <Button
            style={{ width: '100%' }}
            onClick={() => {
              window?.location?.reload();
            }}
          >
            Exit
          </Button>
        </Utility>
      </DialogContent>
      <DialogCloseButton onClick={() => exitDialogRef.current?.close()}>
        <VisaCloseTiny />
      </DialogCloseButton>
    </Dialog>
  );
};
