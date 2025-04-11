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
import { VisaAccountLow, VisaChevronDownLow, VisaChevronUpLow } from '@visa/nova-icons-react';
import { Avatar, Button, DropdownMenu, TabSuffix, Tab, UtilityFragment } from '@visa/nova-react';
import { CSSProperties, useState } from 'react';
import { offset, useClick, useFloating, useInteractions } from '@floating-ui/react';

export const SmallHorizontalIconAvatar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const onToggleAccountMenu = () => setAccountMenuOpen(!accountMenuOpen);

  // TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
  const id = 'horizontal-advanced-nav';

  // For dropdown menu in the horizontal nav, we use floating UI to open it up
  const { context, floatingStyles, refs } = useFloating({
    middleware: [offset(2)],
    open: accountMenuOpen,
    onOpenChange: setAccountMenuOpen,
    placement: 'bottom-start',
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context)]);

  return (
    <div style={{ blockSize: '175px' }}>
      <Tab tag="div">
        <Button
          aria-expanded={accountMenuOpen}
          aria-label="Alex Miller"
          element={<Avatar tag="button" />}
          buttonSize="large"
          colorScheme="tertiary"
          ref={refs.setReference}
          {...getReferenceProps({ onClick: onToggleAccountMenu })}
        >
          <VisaAccountLow />
          <TabSuffix element={accountMenuOpen ? <VisaChevronUpLow /> : <VisaChevronDownLow />} />
        </Button>
        {accountMenuOpen && (
          <UtilityFragment vFlex vFlexCol vPadding={4}>
            <DropdownMenu
              id={`${id}-account-menu`}
              ref={refs.setFloating}
              style={
                {
                  inlineSize: '180px',
                  maxInlineSize: '100%',
                  '--v-surface-padding': '8px',
                  ...floatingStyles,
                } as CSSProperties
              }
              {...getFloatingProps()}
            >
              <UtilityFragment vFlex vJustifyContent="start" vPaddingHorizontal={8} vPaddingVertical={11}>
                <Button buttonSize="large" colorScheme="tertiary" tag="a" href="./avatar">
                  L2 label 1
                </Button>
              </UtilityFragment>
              <UtilityFragment vFlex vJustifyContent="start" vPaddingHorizontal={8} vPaddingVertical={11}>
                <Button buttonSize="large" colorScheme="tertiary" tag="a" href="./avatar">
                  L2 label 2
                </Button>
              </UtilityFragment>
            </DropdownMenu>
          </UtilityFragment>
        )}
      </Tab>
    </div>
  );
};
