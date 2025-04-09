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
import { useClick, useFloating, useInteractions } from '@floating-ui/react';
import { VisaCloseTiny, VisaDeveloperTiny, VisaMaximizeTiny, VisaMenuLow } from '@visa/nova-icons-react';
import {
  Badge,
  Button,
  DropdownButton,
  Link,
  Listbox,
  ListboxItem,
  Nav,
  Typography,
  Utility,
  UtilityFragment,
  VisaLogo,
} from '@visa/nova-react';
import DropdownMenu from '@visa/nova-react/dropdown-menu';
import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDocContext } from '../../../hooks';
import { Paths } from '../../../routes/paths';
import VersionPicker from '../version-picker';
import Styles from './styles.module.scss';

export const MobileMenu: FC = () => {
  const [open, setOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
  });

  const onClick = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([onClick]);

  return (
    <>
      <DropdownButton
        aria-controls={open ? 'site-nav-mobile-menu' : undefined}
        aria-haspopup="menu"
        aria-label="open menu"
        aria-owns={open ? 'site-nav-mobile-menu' : undefined}
        buttonSize="large"
        className="v-desktop-container-hide v-mr-12"
        colorScheme="tertiary"
        iconButton
        iconTwoColor
        id="site-nav-mobile-menu-button"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {open ? <VisaCloseTiny /> : <VisaMenuLow />}
      </DropdownButton>
      {open && (
        <DropdownMenu
          aria-labelledby="site-nav-mobile-menu-button"
          className="v-desktop-container-hide"
          id="site-nav-mobile-menu"
          ref={refs.setFloating}
          role="listbox"
          style={{ inlineSize: 'max-content', ...floatingStyles }}
          {...getFloatingProps()}
        >
          <Listbox tag="div">
            <ListboxItem className="v-px-8 v-py-11 v-pr-24" role="option" tag="button">
              <Button
                colorScheme="tertiary"
                element={
                  <NavLink
                    aria-label="VPDS Home site (Opens in a new tab)"
                    rel="noopener noreferrer"
                    target="_blank"
                    to={Paths.vpds}
                  />
                }
              >
                VPDS Home
                <VisaMaximizeTiny rtl />
              </Button>
            </ListboxItem>
            <ListboxItem className="v-px-8 v-py-11 v-pr-24" role="option" tag="button">
              <Button
                colorScheme="tertiary"
                element={
                  <NavLink
                    aria-label="Vault React (Opens in a new tab)"
                    rel="noopener noreferrer"
                    target="_blank"
                    to={Paths.vault}
                  />
                }
              >
                Vault
                <VisaMaximizeTiny rtl />
              </Button>
            </ListboxItem>
          </Listbox>
        </DropdownMenu>
      )}
    </>
  );
};

const SiteHeader = () => {
  const { devMode } = useDocContext();

  return (
    <UtilityFragment vJustifyContent="between">
      <Nav tag="header" alternate>
        <MobileMenu />
        <div className="v-flex v-justify-content-center v-gap-10 v-align-items-center">
          <UtilityFragment vFlex vMarginHorizontal="auto" vFlexShrink vFlexGrow vAlignItems="center">
            <Link
              alternate
              className={Styles.vLinkUnstyled}
              noUnderline
              id="get-started"
              aria-label="Visa Nova React Workshop Home"
              element={<NavLink to={Paths.root} />}
            >
              <VisaLogo style={{ marginInlineEnd: '16px' }} />
              <UtilityFragment className="v-mobile-media-hide v-nav-app-name">
                <Typography tag="span" variant="headline-3">
                  VPDS Nova | React
                </Typography>
              </UtilityFragment>
            </Link>
          </UtilityFragment>
          {devMode && (
            <Badge badgeType="subtle" className="v-gap-4 v-mobile-media-hide">
              <VisaDeveloperTiny />
              DEV Mode
            </Badge>
          )}
        </div>
        <Utility vMediaHide="desktop" style={{ width: 72 }}></Utility>
        <Utility vFlex vAlignItems="center" vGap={6} vMarginLeft="auto" vMediaHide="mobile">
          <Button
            colorScheme="tertiary"
            element={
              <NavLink
                aria-label="VPDS Home site (Opens in a new tab)"
                rel="noopener noreferrer"
                target="_blank"
                to={Paths.vpds}
              />
            }
          >
            VPDS Home
            <VisaMaximizeTiny rtl />
          </Button>
          <Button
            colorScheme="tertiary"
            element={
              <NavLink
                aria-label="Vault React (Opens in a new tab)"
                rel="noopener noreferrer"
                target="_blank"
                to={Paths.vault}
              />
            }
          >
            Vault
            <VisaMaximizeTiny rtl />
          </Button>
          <VersionPicker vMediaHide="mobile" />
        </Utility>
      </Nav>
    </UtilityFragment>
  );
};

SiteHeader.displayName = 'SiteHeader';

export default SiteHeader;
