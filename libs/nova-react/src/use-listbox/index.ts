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
import { KeyboardEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { FocusableHTMLElement } from '../types';

type UseListboxOptions<HTMLElementType> = {
  /** Auto select (not compatible with multi-select listbox) */
  autoSelect?: boolean;
  /** Default selected elements */
  defaultSelected?: number | number[];
  /** Ref for the tab elements */
  ref?: MutableRefObject<(HTMLElementType | null)[]>;
};

const defaultOptions = {
  autoSelect: false,
  defaultSelected: -1,
} satisfies Partial<UseListboxOptions<HTMLElement>>;

/**
 * @docs {@link https://design.visa.com/react/hooks/use-listbox | See Docs}
 * @description This hook is used to manage the selected state and keyboard navigation of listbox component.
 * @related listbox
 * @vgar TODO
 * @wcag TODO
 */
export const useListbox = <HTMLElementType extends FocusableHTMLElement = HTMLLIElement>(
  useListboxOptions?: UseListboxOptions<HTMLElementType>
) => {
  const { defaultSelected, ...options } = { ...defaultOptions, ...useListboxOptions };
  // Custom refs if ref not provided
  const customRefs = useRef<(HTMLElementType | null)[]>([]);
  const firstFocusableIndex = useRef<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(
    Array.isArray(defaultSelected) ? (defaultSelected.length ? defaultSelected[0] : -1) : (defaultSelected as number)
  );
  // Which elements are focusable depending on disabled state of refs
  const [focusableIndices, setFocusableIndices] = useState<number[]>([]);
  const [selectedIndices, setSelectedIndices] = useState(defaultSelected);

  /// Derived State
  // Allows for multiple listbox to be selected
  const multiple = Array.isArray(selectedIndices);
  // Current index of the focused element
  const currentIndexOfTheFocusableList = focusedIndex === -1 ? 0 : focusableIndices.indexOf(focusedIndex);
  // Number of focusable elements
  const focusableLength = focusableIndices.length;
  // Index for the last focusable element
  const lastFocusableIndex = focusableLength - 1;
  // Ref based on the options or custom refs
  const ref: MutableRefObject<(HTMLElementType | null)[]> = options?.ref || customRefs;

  // Callback to determine if an index is selected
  const isIndexSelected = useCallback(
    (index: number) => (multiple ? selectedIndices.includes(index) : selectedIndices === index),
    [multiple, selectedIndices]
  );

  // Let the user key TAB onto the <Listbox /> element
  // Takes in a second param that is used to determine the first focusable tab index
  const getTabIndex = (index: number, disabled: boolean = false) => {
    // If the element is not disabled and the first focusable index is null, set the first focusable index to the current index
    if (!disabled && firstFocusableIndex.current === null) firstFocusableIndex.current = index;
    // If the current index is the focused index or the focused index is -1 and the first focusable index is the current index, return 0
    if (multiple)
      return focusedIndex === index || (focusedIndex === -1 && firstFocusableIndex.current === index) ? 0 : -1;
    // If the current index is the selected index or the selected index is -1 and the first focusable index is the current index, return 0
    return selectedIndices === index || (selectedIndices === -1 && firstFocusableIndex.current === index) ? 0 : -1;
  };

  // Use arrow keys to navigate through list items
  const onKeyNavigation = (e: KeyboardEvent) => {
    // Character code
    const code = e.key;

    // Placeholder index of the next focused element
    let nextIndexOfTheFocusableList: number | null = null;

    /// On keyboard navigation
    // On ARROW DOWN focus next element, looping to the top of the list
    if (code === 'ArrowDown') nextIndexOfTheFocusableList = (currentIndexOfTheFocusableList + 1) % focusableLength;
    // On ARROW UP focus previous element, looping to the bottom of the list
    else if (code === 'ArrowUp')
      nextIndexOfTheFocusableList =
        currentIndexOfTheFocusableList - 1 < 0 ? lastFocusableIndex : currentIndexOfTheFocusableList - 1;
    // On END focus the last index
    else if (code === 'End') nextIndexOfTheFocusableList = lastFocusableIndex;
    // On HOME focus the first index
    else if (code === 'Home') nextIndexOfTheFocusableList = 0;

    // Toggle selected on ENTER or SPACE
    if (code === 'Enter' || code === ' ') toggleIndexSelected(focusableIndices[currentIndexOfTheFocusableList]);
    // Reset the focus index to the selected one when leave the listbox
    if (code === 'Tab') setFocusedIndex(multiple ? focusableIndices[currentIndexOfTheFocusableList] : selectedIndices);

    // If there is a next element to focus then focus it
    if (ref.current && nextIndexOfTheFocusableList !== null && focusableLength) {
      // Prevent default keyboard behavior
      e.preventDefault();
      const nextFocusedIndex = focusableIndices[nextIndexOfTheFocusableList];
      if (options.autoSelect) setSelectedIndices(nextFocusedIndex);
      // Set the next focused index state
      setFocusedIndex(nextFocusedIndex);
      // Focus the element
      ref.current[nextFocusedIndex]?.focus();
    }
  };

  // Toggle the selected state of a listbox
  const toggleIndexSelected = useCallback(
    (index: number) => {
      // If multiple listbox are allowed to be selected
      multiple
        ? // toggle only the selected element, leave the rest of the toggled elements as is
          setSelectedIndices(prevSelected =>
            isIndexSelected(index)
              ? (prevSelected as number[]).filter(prevIndex => prevIndex !== index)
              : [...(prevSelected as number[]), index]
          )
        : // Set current selected index to the index of the selected element
          setSelectedIndices(isIndexSelected(index) ? -1 : index);
      // Update the latest focused index
      setFocusedIndex(index as number);
    },
    [isIndexSelected, multiple]
  );

  // Throw error if inappropriate props passed
  useEffect(() => {
    if (multiple && options.autoSelect)
      throw new Error(
        'ERROR useListbox: autoSelect is not compatible with multi select listbox, try removing {autoSelect: true} or set autoSelect to false, or make only one element in the listbox selected by default'
      );
  }, [options, multiple]);

  // When ref updates update our focusable indices
  useEffect(() => {
    setFocusableIndices(
      ref.current
        ?.map((element, index) => (!element?.ariaDisabled || element?.ariaDisabled === 'false') && index)
        .filter(element => element !== false) as number[]
    );
  }, [ref]);

  return {
    /** Function that returns true if index is selected */
    isIndexSelected,
    /** Get tab index for tab key navigation */
    getTabIndex,
    /** Function that handles on key down for navigation */
    onKeyNavigation,
    /** Ref object to use if ref isn't supplied in props */
    ref,
    /** Index of the selected listbox  */
    selectedIndex: selectedIndices,
    /** Indices of the selected listbox(s) */
    selectedIndices,
    /** Function that toggles selected state of listbox */
    toggleIndexSelected,
  };
};

export default useListbox;

useListbox.displayName = 'useListbox';

useListbox.defaultProps = {
  autoSelect: false,
  defaultSelected: -1,
};
