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
const id = 'touring-tips-dialog';

export const TouringTipsDialog = () => {
  const { onKeyNavigation, ref } = useFocusTrap();

  const onCloseDialog = () => ref.current?.close();

  return (
    <>
      <Button onClick={() => ref.current?.showModal()}>Open touring tips dialog</Button>
      <Dialog
        aria-describedby={`${id}-description`}
        aria-labelledby={`${id}-title`}
        ref={ref}
        id={id}
        onKeyDown={e => onKeyNavigation(e, ref.current?.open)}
      >
        <DialogContent>
          <DialogHeader id={`${id}-title`}>Touring tips title</DialogHeader>
          <Utility vAlignItems="center" vFlex vFlexRow vGap={8} vPaddingBottom={8}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="18" fill="#B3D7FF" fillOpacity="0.35" />
              <path
                d="M17.238 13.856C16.8327 13.856 16.3953 13.936 15.926 14.096C15.4567 14.256 15.03 14.496 14.646 14.816H14.502L14.614 13.136C15.0087 12.88 15.478 12.6827 16.022 12.544C16.566 12.4053 17.0727 12.336 17.542 12.336C18.7473 12.336 19.6913 12.5867 20.374 13.088C21.0673 13.5787 21.414 14.4427 21.414 15.68C21.414 16.256 21.3233 16.784 21.142 17.264C20.9713 17.7333 20.742 18.16 20.454 18.544C20.1767 18.928 19.8833 19.28 19.574 19.6C19.382 19.8133 19.126 20.0747 18.806 20.384C18.486 20.6827 18.1287 21.008 17.734 21.36C17.3393 21.712 16.9393 22.0533 16.534 22.384H21.67L21.526 24H14.406V22.576C15.0247 22.0213 15.5527 21.5467 15.99 21.152C16.438 20.7573 16.8327 20.3947 17.174 20.064C17.5153 19.7333 17.83 19.4027 18.118 19.072C18.502 18.6347 18.8167 18.1493 19.062 17.616C19.318 17.072 19.446 16.5013 19.446 15.904C19.446 15.1467 19.2593 14.6187 18.886 14.32C18.5127 14.0107 17.9633 13.856 17.238 13.856Z"
                fill="black"
              />
            </svg>
            <Typography variant="body-2-bold">Touring tips instructions</Typography>
          </Utility>
          <Typography id={`${id}-description`}>
            This is required text that describes the dialog title in more detail.
          </Typography>
          <Utility vAlignItems="center" vFlex vFlexWrap vGap={8} vJustifyContent="between" vPaddingTop={16}>
            <Typography>2 of 4</Typography>
            <Utility vFlex vFlexWrap vGap={8} vJustifyContent="between">
              <Button colorScheme="secondary" onClick={onCloseDialog}>
                Previous
              </Button>
              <Button onClick={onCloseDialog}>Next</Button>
            </Utility>
          </Utility>
        </DialogContent>
        <DialogCloseButton onClick={onCloseDialog} />
      </Dialog>
    </>
  );
};
