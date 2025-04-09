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
import { KeyboardEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { FocusableHTMLElement } from '../types';

export type UseAccordionOptions<HTMLElementType> = {
  /** Default expanded state of the accordion */
  defaultExpanded?: (number | string)[] | number | string | undefined;
  /** Ref for the accordion elements */
  ref?: MutableRefObject<(HTMLElementType | null)[]>;
};

const defaultOptions = {
  defaultExpanded: '',
} satisfies Partial<UseAccordionOptions<HTMLElement>>;

/**
 * @docs {@link https://design.visa.com/react/hooks/use-accordion | See Docs}
 * @description This hook is used to manage the open state and keyboard navigation of accordions.
 * @related accordion
 * @vgar TODO
 * @wcag TODO
 */
export const useAccordion = <HTMLElementType extends FocusableHTMLElement = HTMLButtonElement>(
  useAccordionOptions?: UseAccordionOptions<HTMLElementType>
) => {
  const { defaultExpanded, ...options } = { ...defaultOptions, ...useAccordionOptions };
  // Custom refs if ref not provided
  const customRefs = useRef<(HTMLElementType | null)[]>([]);
  // Expanded state of accordion(s)
  const [expanded, setExpanded] = useState(defaultExpanded);
  // Currently focused index
  const [focusedIndex, setFocusedIndex] = useState(-1);
  // Which elements are focusable depending on disabled state of refs
  const [focusableIndices, setFocusableIndices] = useState<number[]>([]);

  /// Derived State
  // Current index of the focused element
  const currentIndexOfTheFocusableList = focusedIndex === -1 ? 0 : focusableIndices.indexOf(focusedIndex);
  // Number of focusable elements
  const focusableLength = focusableIndices.length;
  // Index for the last focusable element
  const lastFocusableIndex = focusableLength - 1;
  // Allows for multiple accordions to be expanded
  const multiple = Array.isArray(expanded);
  // Ref based on the options or custom refs
  const ref: MutableRefObject<(HTMLElementType | null)[]> = options?.ref || customRefs;

  // Check if a panel index or id is expanded
  const isIndexExpanded = useCallback(
    (index: number | string) => (multiple ? expanded.includes(index) : expanded === index),
    [expanded, multiple]
  );

  // Use arrow keys to navigate through tabs
  const onKeyNavigation = (e: KeyboardEvent) => {
    const code = e.key;

    // Placeholder index of the next focused element
    let nextIndexOfTheFocusableList: number | null = null;

    /// Keyboard events:
    // On shift tab, focus previous element, if element is inside our list
    if (code === 'Tab' && e.shiftKey && currentIndexOfTheFocusableList - 1 >= 0)
      nextIndexOfTheFocusableList = currentIndexOfTheFocusableList - 1;
    // On tab, focus next element, if element is inside our list
    else if (code === 'Tab' && !e.shiftKey && currentIndexOfTheFocusableList + 1 <= lastFocusableIndex)
      nextIndexOfTheFocusableList = currentIndexOfTheFocusableList + 1;
    // On arrow up, focus previous element, looping to the bottom of the list
    else if (code === 'ArrowUp')
      nextIndexOfTheFocusableList =
        currentIndexOfTheFocusableList - 1 < 0 ? lastFocusableIndex : currentIndexOfTheFocusableList - 1;
    // On arrow down, focus next element, looping to the top of the list
    else if (code === 'ArrowDown') nextIndexOfTheFocusableList = (currentIndexOfTheFocusableList + 1) % focusableLength;
    // On end key, focus last accordion element
    else if (code === 'End') nextIndexOfTheFocusableList = lastFocusableIndex;
    // On home key, focus first accordion element
    else if (code === 'Home') nextIndexOfTheFocusableList = 0;

    // If there is a next element to focus then focus it
    if (ref.current && nextIndexOfTheFocusableList !== null && focusableLength) {
      // Prevent default keyboard behavior
      if (focusedIndex !== nextIndexOfTheFocusableList) e.preventDefault();
      const nextFocusedIndex = focusableIndices[nextIndexOfTheFocusableList];
      // Set the next focused index state
      setFocusedIndex(nextFocusedIndex);
      // Focus the element
      ref.current[nextFocusedIndex]?.focus();
    }
  };

  // Toggle the expanded state of a panel
  const toggleIndexExpanded = useCallback(
    (index: number | string) => {
      // If multiple accordions are allowed to be expanded
      multiple
        ? // toggle only the selected element, leave the rest of the toggle elements as is
          setExpanded(prevExpanded =>
            isIndexExpanded(index)
              ? (prevExpanded as (number | string)[]).filter(prevIndex => prevIndex !== index)
              : [...(prevExpanded as (number | string)[]), index]
          )
        : // Set current expanded index to the index of the selected element
          setExpanded(isIndexExpanded(index) ? '' : index);
      // Update the latest focused index
      setFocusedIndex(index as number);
    },
    [isIndexExpanded, multiple]
  );

  // When ref updates update our focusable indices
  useEffect(() => {
    setFocusableIndices(
      ref.current
        ?.map((element, index) => element && !(element.disabled || element.ariaDisabled) && index)
        .filter(element => element !== false) as number[]
    );
  }, [ref]);

  return {
    /** Function that takes in index or id of element and returns expanded boolean */
    isIndexExpanded,
    /** Function that handles on key down for navigation */
    onKeyNavigation,
    /** Ref object to use if ref isn't supplied in props */
    ref,
    /** Callback to toggle accordion expanded state */
    toggleIndexExpanded,
  };
};

export default useAccordion;

useAccordion.displayName = 'useAccordion';

useAccordion.defaultProps = {
  defaultExpanded: '',
};
