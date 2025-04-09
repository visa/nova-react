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
import { autoPlacement, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-react';
import {
  DropdownButton,
  DropdownMenu,
  Listbox,
  ListboxItem,
  TabSuffix,
  UtilityProperties,
  useListbox,
} from '@visa/nova-react';
import Utility from '@visa/nova-react/utility';
import { FC, useId, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useVersions } from '../../../providers';
import { Paths } from '../../../routes';

type VersionPickerProps = UtilityProperties;

const VersionPicker: FC<VersionPickerProps> = props => {
  const id = useId();
  const { currentVersion, fetchVersions, isDevelopmentBeta, isLatest, latestVersion, loading, versions, versionType } =
    useVersions();
  const { pathname } = useLocation();
  const [versionPickerOpen, setVersionPickerOpen] = useState(false);

  const onToggleVersionMenu = (open: boolean) => {
    if (open) {
      fetchVersions();
      setVersionPickerOpen(true);
    } else setVersionPickerOpen(false);
  };

  // UseFloatingUI to open/close the version picker
  const { context, floatingStyles, refs } = useFloating({
    placement: 'bottom',
    middleware: [autoPlacement()],
    open: versionPickerOpen,
    onOpenChange: onToggleVersionMenu,
  });
  const dismiss = useDismiss(context);
  const click = useClick(context);

  const { onKeyNavigation, ref: versionListRef } = useListbox();

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <Utility {...props}>
      <DropdownButton
        aria-controls={versionPickerOpen ? 'version-dropdown-menu' + id : undefined}
        aria-expanded={versionPickerOpen}
        aria-haspopup="menu"
        aria-label={`${currentVersion} ${versionType}`}
        aria-owns={versionPickerOpen ? 'version-dropdown-menu' + id : undefined}
        colorScheme="tertiary"
        id={'version-dropdown-button' + id}
        ref={refs.setReference}
        style={{ inlineSize: '100%', minInlineSize: 'max-content' }}
        {...getReferenceProps()}
      >
        Version: {`${versionType.toLowerCase()} (${currentVersion})`}
        <TabSuffix element={versionPickerOpen ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
      </DropdownButton>
      {versionPickerOpen && (
        <DropdownMenu
          aria-labelledby={'version-dropdown-button' + id}
          id={'version-dropdown-menu' + id}
          className="v-flex-col"
          ref={refs.setFloating}
          role="listbox"
          style={{
            inlineSize: 'max-content',
            ...floatingStyles,
          }}
          {...getFloatingProps({
            onBlur: e => !e.currentTarget.contains(e.relatedTarget) && setVersionPickerOpen(false),
          })}
        >
          <Listbox onKeyDown={onKeyNavigation} tag="div">
            <ListboxItem
              aria-current={isLatest ? 'page' : undefined}
              className="v-px-8 v-py-11"
              href={Paths?.vpdsReact + pathname}
              ref={node => {
                versionListRef.current[0] = node;
              }}
              rel="noopener noreferrer"
              role="option"
              tag="a"
            >
              Latest {latestVersion && `(${latestVersion})`}
            </ListboxItem>
            <ListboxItem
              aria-disabled={isDevelopmentBeta ? true : undefined}
              aria-selected={isDevelopmentBeta ? true : undefined}
              className="v-px-8 v-py-11"
              href={Paths?.beta + pathname}
              ref={node => {
                versionListRef.current[1] = node;
              }}
              rel="noopener noreferrer"
              role="option"
              tag="a"
            >
              Beta
            </ListboxItem>
            {loading && (
              <ListboxItem className="v-px-8 v-py-11" disabled tag="span">
                Loading...
              </ListboxItem>
            )}
            {versions.slice(1).map((version, index) => (
              <ListboxItem
                aria-current={version === currentVersion ? 'page' : undefined}
                className="v-px-8 v-py-11"
                href={`${Paths.versioned}/${version}${pathname}`}
                key={`version-link-${id}-${version}`}
                ref={node => {
                  versionListRef.current[index + 2] = node;
                }}
                rel="noopener noreferrer"
                role="option"
                tag="a"
              >
                {version}
              </ListboxItem>
            ))}
          </Listbox>
        </DropdownMenu>
      )}
    </Utility>
  );
};

export default VersionPicker;
