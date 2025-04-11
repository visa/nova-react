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
import { VisaChevronDownTiny } from '@visa/nova-icons-react';
import {
  InputContainer,
  InputControl,
  Label,
  Link as VLink,
  Select,
  Switch,
  SwitchLabel,
  Utility,
  UtilityFragment,
  Footer as VFooter,
} from '@visa/nova-react';
import { Link } from 'react-router-dom';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { defaultPreferencesProp, useTheme } from '../../../providers';
import VersionPicker from '../version-picker';
import { Paths } from '../../../routes/paths';

const themes = [
  {
    name: 'None',
    value: 'none',
  },
  {
    name: 'Default dark',
    value: 'default-dark',
  },
  {
    name: 'Default hybrid',
    value: 'default-hybrid',
  },
  {
    name: 'Default light',
    value: 'default-light',
  },
  {
    name: 'Visa dark',
    value: 'visa-dark',
  },
  {
    name: 'Visa dark alt',
    value: 'visa-dark-alt',
  },
  {
    name: 'Visa hybrid',
    value: 'visa-hybrid',
  },
  {
    name: 'Visa hybrid alt',
    value: 'visa-hybrid-alt',
  },
  {
    name: 'Visa light',
    value: 'visa-light',
  },
];

const getMode = (themeKey: string) => {
  if (themeKey.toLowerCase().includes('dark')) return true;
  if (themeKey.toLowerCase().includes('light')) return false;
  return undefined;
};

type FooterProps = unknown;

const Footer: FC<FooterProps> = () => {
  const [rtlMode, setRtlMode] = useState(false);
  const { preferences, setGlobalStyles, resetGlobalStyles, updatePreferences } = useTheme();

  const onThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onUpdateTheme(event.target.value);
  };

  const onUpdateTheme = async (themeKey: string) => {
    updatePreferences({ darkMode: getMode(themeKey), themeKey });
    if (themeKey === 'none') return resetGlobalStyles();
    return import(`../../../../node_modules/@visa/nova-styles/themes/${themeKey}/index.css?raw`).then(css =>
      setGlobalStyles(css.default)
    );
  };

  const onToggleRtlMode = () => {
    const newMode = !rtlMode;
    setRtlMode(newMode);
    document.body.setAttribute('dir', newMode ? 'rtl' : 'ltr');
  };

  useEffect(() => {
    onUpdateTheme(preferences.themeKey || defaultPreferencesProp.themeKey);
  }, []);

  const copyright = `Copyright © ${new Date().getFullYear()} Visa Inc. All Rights Reserved`;

  return (
    <UtilityFragment vAlignItems="center" vFlex vFlexRow vJustifyContent="center" vGap={12}>
      <VFooter>
        <Utility vFlexGrow>{copyright}</Utility>
        <VersionPicker vMediaHide="desktop" />
        <Utility tag="fieldset" vAlignItems="center" vFlex vFlexRow vGap={6}>
          <Label htmlFor="theme-selector">Theme</Label>
          <InputContainer>
            <Select id="theme-selector" name="theme-select" onChange={onThemeChange} value={preferences.themeKey}>
              {themes.map(theme => (
                <option key={theme.value} value={theme.value}>
                  {theme.name}
                </option>
              ))}
            </Select>
            <InputControl>
              <VisaChevronDownTiny />
            </InputControl>
          </InputContainer>
        </Utility>
        <Utility vFlex vFlexWrap vGap={8} vJustifyContent="between" vMargin={8}>
          <SwitchLabel htmlFor="rtl-control">Right to Left</SwitchLabel>
          <Switch checked={rtlMode} id="rtl-control" name="rtl-switch" onChange={onToggleRtlMode} />
        </Utility>
        <Utility>
          <VLink element={<Link to={Paths.sitemap} />}>Sitemap</VLink>
        </Utility>
      </VFooter>
    </UtilityFragment>
  );
};

export default Footer;
