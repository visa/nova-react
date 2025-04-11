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
import { KeyboardEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { FocusableHTMLElement } from '../types';

export type UseTabsOptions<HTMLElementType> = {
  /** Auto select tab on keyboard navigation */
  autoSelect?: boolean;
  /** Default selected tab */
  defaultSelected?: number;
  /** Ref for the tab elements */
  ref?: MutableRefObject<(HTMLElementType | null)[]>;
  /** Arrow key navigation direction, 'horizontal', 'vertical', 'both', 'none' */
  arrowKeyNavigation?: 'both' | 'horizontal' | 'none' | 'vertical' | null;
};

const defaultOptions = {
  autoSelect: false,
  defaultSelected: -1,
  arrowKeyNavigation: null,
} satisfies Partial<UseTabsOptions<HTMLElement>>;

/**
 * @docs {@link https://design.visa.com/react/hooks/use-tabs | See Docs}
 * @description This hook allows us to set the <defaultSelected> value, which indicates that we are selecting that item by default.
 * @related nav, tabs
 * @vgar TODO
 * @wcag TODO
 */
export const useTabs = <HTMLElementType extends FocusableHTMLElement = HTMLButtonElement>(
  useTabsOptions?: UseTabsOptions<HTMLElementType>
) => {
  const { defaultSelected, ...options } = { ...defaultOptions, ...useTabsOptions };
  // Custom refs if ref not provided
  const customRefs = useRef<(HTMLElementType | null)[]>([]);
  // Tracks the currently selected element
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  // Tracks the currently focused element
  const [focusedIndex, setFocusedIndex] = useState(defaultSelected);
  // Which elements are focusable depending on disabled state of refs
  const [focusableIndices, setFocusableIndices] = useState<number[]>([]);
  // Orientation of the tabs
  const [orientation, setOrientation] = useState('horizontal');

  /// Derived State
  // Current index of the focused element
  const currentIndexOfTheFocusableList = focusedIndex === -1 ? 0 : focusableIndices.indexOf(focusedIndex);
  // Tracks the first element in the list that can be focused
  const firstFocusableIndex = useRef<number | null>(null);
  // Number of focusable elements
  const focusableLength = focusableIndices.length;
  // Index for the last focusable element
  const lastFocusableIndex = focusableLength - 1;
  // Ref based on the options or custom refs
  const ref: MutableRefObject<(HTMLElementType | null)[]> = options?.ref || customRefs;

  // Callback to select a tab
  const onIndexChange = (index: number, disabled = false) => {
    if (!disabled) {
      setSelectedIndex(index);
      setFocusedIndex(index);
    }
  };

  // Let the user key TAB onto the <tab /> element
  // Takes in a second param that is used to determine the first focusable tab index
  const getTabIndex = (index: number, disabled: boolean = false) => {
    if (!disabled && firstFocusableIndex.current === null)
      // Tracks the first element in the list that can be focused
      firstFocusableIndex.current = index;
    // If it is the selected element or the first element in the list return tab index of 0 else -1
    return selectedIndex === index || (selectedIndex === -1 && firstFocusableIndex.current === index) ? 0 : -1;
  };

  // Use arrow keys to navigate through tabs
  const onKeyNavigation = (e: KeyboardEvent) => {
    // Character code
    const code = e.key;

    // Placeholder index of the next focused element
    let nextIndexOfTheFocusableList: number | null = null;

    // On ARROW RIGHT in horizontal orientation focus next element, looping to the start of the list
    if (code === 'ArrowRight' && orientation !== 'vertical' && orientation !== 'none')
      nextIndexOfTheFocusableList = (currentIndexOfTheFocusableList + 1) % focusableLength;
    // On ARROW DOWN in vertical orientation focus next element, looping to the start of the list
    else if (code === 'ArrowDown' && orientation !== 'horizontal' && orientation !== 'none')
      nextIndexOfTheFocusableList = (currentIndexOfTheFocusableList + 1) % focusableLength;
    // On ARROW LEFT in horizontal orientation focus previous element, looping to the end of the list
    else if (code === 'ArrowLeft' && orientation !== 'vertical' && orientation !== 'none')
      nextIndexOfTheFocusableList =
        currentIndexOfTheFocusableList - 1 < 0 ? lastFocusableIndex : currentIndexOfTheFocusableList - 1;
    // On ARROW UP in vertical orientation focus previous element, looping to the end of the list
    else if (code === 'ArrowUp' && orientation !== 'horizontal' && orientation !== 'none')
      nextIndexOfTheFocusableList =
        currentIndexOfTheFocusableList - 1 < 0 ? lastFocusableIndex : currentIndexOfTheFocusableList - 1;
    // On END focus the last index
    else if (code === 'End') nextIndexOfTheFocusableList = lastFocusableIndex;
    // On HOME focus the first index
    else if (code === 'Home') nextIndexOfTheFocusableList = 0;

    // Reset the focus index to the selected one when leaving the tab list
    if (code === 'Tab') setFocusedIndex(selectedIndex);

    // If there is a new element to focus then focus it
    if (ref.current && nextIndexOfTheFocusableList !== null && focusableLength) {
      // Prevent default keyboard behavior
      e.preventDefault();
      const nextFocusedIndex = focusableIndices[nextIndexOfTheFocusableList];
      if (options.autoSelect) setSelectedIndex(nextFocusedIndex);
      // Set the focused index state
      setFocusedIndex(nextFocusedIndex);
      // Focus the element
      ref.current[nextFocusedIndex]?.focus();
    }
  };

  const getOrientation = () => {
    if (options.arrowKeyNavigation !== null) {
      setOrientation(options.arrowKeyNavigation);
      return;
    } else if (ref.current) {
      if (ref.current[0] instanceof HTMLElement) {
        const tabsEl = ref.current[0].parentElement?.parentElement;
        if (tabsEl) {
          if (tabsEl.classList.contains('v-tabs-vertical')) {
            setOrientation('vertical');
          }
        }
      }
    }
  };

  // When ref updates update our focusable indices
  useEffect(() => {
    setFocusableIndices(
      ref.current?.map((element, index) => !element?.disabled && index).filter(element => element !== false) as number[]
    );
  }, [ref]);

  useEffect(() => {
    getOrientation();
  }, []);

  return {
    /** Get tab index for tab key navigation */
    getTabIndex,
    /** Function that handles selected state of tabs */
    onIndexChange,
    /** Function that handles on key down for navigation */
    onKeyNavigation,
    /** Ref object to use if ref isn't supplied in props */
    ref,
    /** Index of the selected tab  */
    selectedIndex,
  };
};

export default useTabs;

useTabs.displayName = 'useTabs';

useTabs.defaultProps = {
  autoSelect: false,
  defaultSelected: -1,
  arrowKeyNavigation: null,
};
