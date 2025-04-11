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
import { VisaOptionHorizontalHigh } from '@visa/nova-icons-react';
import { useState } from 'react';
import { Button, DropdownButton, DropdownMenu, Listbox, UtilityFragment } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'dropdown-menu-icon';

export const IconDropdownMenu = () => {
  const [open, setOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
  });

  const onClick = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([onClick]);

  return (
    // This div is not required, it's used to show the whole dropdown menu in the example
    <div style={{ blockSize: 250 }}>
      <DropdownButton
        aria-controls={id}
        aria-expanded={open}
        aria-label="see more options"
        iconButton
        id={`${id}-button`}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <VisaOptionHorizontalHigh />
      </DropdownButton>
      {open && (
        <DropdownMenu
          id={id}
          aria-hidden={!open}
          ref={refs.setFloating}
          style={{ inlineSize: '180px', ...floatingStyles }}
          {...getFloatingProps()}
        >
          <UtilityFragment vHide={!open}>
            <Listbox>
              <li>
                <UtilityFragment
                  vFlex
                  vFlexRow
                  vAlignItems="start"
                  vGap={6}
                  vPaddingHorizontal={8}
                  vPaddingVertical={11}
                >
                  <Button className="v-listbox-item" colorScheme="tertiary" subtle>
                    Label 1
                  </Button>
                </UtilityFragment>
              </li>
              <li>
                <UtilityFragment
                  vFlex
                  vFlexRow
                  vAlignItems="start"
                  vGap={6}
                  vPaddingHorizontal={8}
                  vPaddingVertical={11}
                >
                  <Button className="v-listbox-item" colorScheme="tertiary" subtle>
                    Label 2
                  </Button>
                </UtilityFragment>
              </li>
              <li>
                <UtilityFragment
                  vFlex
                  vFlexRow
                  vAlignItems="start"
                  vGap={6}
                  vPaddingHorizontal={8}
                  vPaddingVertical={11}
                >
                  <Button className="v-listbox-item" colorScheme="tertiary" subtle>
                    Label 2
                  </Button>
                </UtilityFragment>
              </li>
              <li>
                <UtilityFragment
                  vFlex
                  vFlexRow
                  vAlignItems="start"
                  vGap={6}
                  vPaddingHorizontal={8}
                  vPaddingVertical={11}
                >
                  <Button className="v-listbox-item" colorScheme="tertiary" subtle>
                    Label 4
                  </Button>
                </UtilityFragment>
              </li>
            </Listbox>
          </UtilityFragment>
        </DropdownMenu>
      )}
    </div>
  );
};
