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
import clsx from 'clsx';
import { ReactNode, createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';

type DefaultPreferences = { darkMode?: boolean; themeKey?: string };

type ThemeContextType<PreferencesType extends DefaultPreferences = DefaultPreferences> = {
  appendGlobalStyles: (styles: string) => void;
  darkMode: boolean;
  browserPrefersDarkMode: Readonly<boolean>;
  preferences: PreferencesType;
  resetGlobalStyles: () => void;
  setGlobalStyles: (styles: string) => void;
  setPreferences: (preferences: PreferencesType) => void;
  updatePreferences: (preferences: PreferencesType) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeContext = createContext<ThemeContextType<any>>({
  preferences: {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as ThemeContextType<any>);

type ThemeProviderProperties<PreferencesType extends DefaultPreferences = DefaultPreferences> = {
  children?: ReactNode;
  defaultPreferences?: PreferencesType;
  defaultThemeStyles?: string;
  document?: Document;
  id?: string;
  localStorageKey?: string;
};

export const defaultPreferencesProp = {
  themeKey: 'visa-light',
} satisfies DefaultPreferences;

export const ThemeProvider = <PreferencesType extends DefaultPreferences = DefaultPreferences>({
  children,
  defaultPreferences = defaultPreferencesProp as PreferencesType,
  defaultThemeStyles = '',
  document = window?.document,
  id,
  localStorageKey = 'v-preferences',
}: ThemeProviderProperties<PreferencesType>) => {
  const genId = useId();
  const [themeChanging, setThemeChanging] = useState(true);
  const globalStylesRef = useRef<HTMLStyleElement>(null);
  const [browserPrefersDarkMode, setBrowserPrefersDarkMode] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<PreferencesType>();

  const thisId = id || genId;

  const startThemeTransition = useCallback(() => {
    setThemeChanging(true);
    setTimeout(() => setThemeChanging(false), 2000);
  }, []);

  // Read initial preferences from localStorage
  useEffect(() => {
    if (!window?.localStorage) return;
    const storedThemeKey = window.localStorage.getItem(localStorageKey);
    startThemeTransition();
    setPreferences({ ...defaultPreferences, ...JSON.parse(storedThemeKey || '{}') });
  }, [defaultPreferences, localStorageKey, startThemeTransition]);

  // Sync preference changes to localStorage
  useEffect(() => {
    if (!window?.localStorage || !preferences) return;
    window.localStorage.setItem(localStorageKey, JSON.stringify({ ...preferences }));
  }, [localStorageKey, preferences]);

  // Listen to browser's dark mode preference
  useEffect(() => {
    if (!window?.matchMedia) return;
    const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMatcher.matches) setBrowserPrefersDarkMode(true);
    const darkModeMatcherListener = ({ matches }: MediaQueryListEventMap['change']) =>
      setBrowserPrefersDarkMode(matches);
    darkModeMatcher.addEventListener('change', darkModeMatcherListener);
    return () => darkModeMatcher.removeEventListener('change', darkModeMatcherListener);
  }, []);

  // Init global styles element
  useEffect(() => {
    if (globalStylesRef?.current) return;

    startThemeTransition();
    if (document.getElementById(thisId)) {
      const customStyleTag = document.getElementById(thisId) as HTMLStyleElement;
      customStyleTag.textContent = defaultThemeStyles;
      globalStylesRef.current = customStyleTag;
    } else {
      const customStyleTag = document.createElement('style');
      customStyleTag.id = thisId;
      customStyleTag.textContent = defaultThemeStyles;
      document.head.appendChild(customStyleTag);
      globalStylesRef.current = customStyleTag;
    }
  }, [defaultThemeStyles, document, startThemeTransition, thisId]);

  const appendGlobalStyles = (styles: string) => {
    startThemeTransition();
    if (globalStylesRef.current) globalStylesRef.current.textContent += styles;
  };
  const resetGlobalStyles = () => {
    startThemeTransition();
    if (globalStylesRef.current) globalStylesRef.current.textContent = defaultThemeStyles;
  };
  const setGlobalStyles = (styles: string) => {
    startThemeTransition();
    if (globalStylesRef.current) globalStylesRef.current.textContent = styles;
  };

  const updatePreferences = (newPreferences: PreferencesType) => {
    startThemeTransition();
    setPreferences({ ...preferences, ...newPreferences });
  };

  const darkMode = (preferences?.darkMode === undefined && browserPrefersDarkMode) || !!preferences?.darkMode;

  const value: ThemeContextType<PreferencesType> = {
    appendGlobalStyles,
    browserPrefersDarkMode,
    darkMode,
    preferences: preferences || ({} as PreferencesType),
    resetGlobalStyles,
    setGlobalStyles,
    setPreferences,
    updatePreferences,
  };

  return (
    <div className={clsx(themeChanging && 'color-switching-animation')}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </div>
  );
};

export default ThemeProvider;
export const useTheme = <PreferencesType extends DefaultPreferences = DefaultPreferences>() =>
  useContext(ThemeContext) as ThemeContextType<PreferencesType>;
