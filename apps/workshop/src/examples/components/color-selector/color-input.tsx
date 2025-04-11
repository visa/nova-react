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
  offset,
  safePolygon,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { Input, Label, Button, Tooltip, Utility, UtilityFragment } from '@visa/nova-react';
import { VisaAccessibilityTiny } from '@visa/nova-icons-react';
import { useState } from 'react';


// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'color-input';

export const ColorInput = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, strategy, refs, context } = useFloating({
    middleware: [offset(2)],
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right',
  });

  const dismiss = useDismiss(context);
  const focus = useFocus(context);
  const hover = useHover(context, { handleClose: safePolygon(), move: false });
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, focus, hover, role]);

  return (
    <Utility vFlex vAlignItems="center" vGap={6}>
      <UtilityFragment vFlexGrow0 style={{ flexBasis: '5%' }}>
        <Input id={id} type="color" />
      </UtilityFragment>
      <Label htmlFor={id}>Label</Label>
      <Utility vAlignItems="center" vFlex vFlexCol vGap={2}>
      <Button 
        aria-labelledby={`${id}-label`}
        aria-label="Color selector accessibility information"
        colorScheme="tertiary"
        iconButton
        ref={refs.setReference} {...getReferenceProps()}>
          <VisaAccessibilityTiny rtl />
        </Button>
        {isOpen && (
        <Tooltip
          ref={refs.setFloating}
          style={{
            left: x,
            position: strategy,
            top: y,
            width: 'fit-content',
          }}
          {...getFloatingProps()}
        >
          For RGB, use values between 0-255. For HSL, use H values between 0-359, S and L values between 0-100%. For hex,
          use the format #RRGGBB and values between 0-9 or A-F.
        </Tooltip>
      )}
      </Utility>
    </Utility>
  );
};
