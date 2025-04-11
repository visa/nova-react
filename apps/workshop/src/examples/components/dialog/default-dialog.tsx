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
import {
  Button,
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogHeader,
  Typography,
  useFocusTrap,
  Utility,
} from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'dialog';

export const DefaultDialog = () => {
  const { onKeyNavigation, ref } = useFocusTrap();

  return (
    <>
      <Button onClick={() => ref.current?.showModal()}>Open default dialog</Button>
      <Dialog
        aria-describedby={`${id}-description`}
        aria-labelledby={`${id}-title`}
        id={id}
        ref={ref}
        onKeyDown={e => onKeyNavigation(e, ref.current?.open)}
      >
        <DialogContent>
          <DialogHeader id={`${id}-title`}>Default title</DialogHeader>
          <Typography id={`${id}-description`}>
            This is required text that describes the dialog title in more detail.
          </Typography>
          <Utility vAlignItems="center" vFlex vFlexWrap vGap={8} vPaddingTop={16}>
            <Button>Primary action</Button>
            <Button colorScheme="secondary">Secondary action</Button>
          </Utility>
        </DialogContent>
        <DialogCloseButton onClick={() => ref.current?.close()} />
      </Dialog>
    </>
  );
};
