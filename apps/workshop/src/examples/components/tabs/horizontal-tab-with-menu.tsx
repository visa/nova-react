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
import { useClick, useFloating, useInteractions } from '@floating-ui/react';
import { useState } from 'react';
import { DropdownButton, DropdownMenu, Listbox, ListboxItem, Utility, Tab, TabSuffix } from '@visa/nova-react';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaHomeTiny } from '@visa/nova-icons-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'nova-horizontal-tabs-with-menu-example';

export const HorizontalTabWithMenu = () => {
  const [open, setOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
  });

  const onClick = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([onClick]);

  return (
    <Tab tag="div" style={{ blockSize: 150 }}>
      <DropdownButton
        aria-controls={id}
        aria-expanded={open}
        colorScheme="tertiary"
        buttonSize="large"
        id={`${id}-button`}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <VisaHomeTiny /> Label
        {open ? <TabSuffix element={<VisaChevronUpTiny />} /> : <TabSuffix element={<VisaChevronDownTiny />} />}
      </DropdownButton>
      {open && (
        <DropdownMenu
          id={id}
          ref={refs.setFloating}
          style={{ maxInlineSize: '100%', inlineSize: '180px', ...floatingStyles }}
          {...getFloatingProps()}
        >
          <Listbox tag="div">
            <Utility
              element={<ListboxItem tag="button" />}
              vPaddingHorizontal={8}
              vPaddingRight={24}
              vPaddingVertical={11}
            >
              Label 1
            </Utility>
            <Utility
              element={<ListboxItem tag="button" />}
              vPaddingHorizontal={8}
              vPaddingRight={24}
              vPaddingVertical={11}
            >
              Label 2
            </Utility>
          </Listbox>
        </DropdownMenu>
      )}
    </Tab>
  );
};
