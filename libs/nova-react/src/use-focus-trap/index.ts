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
import { KeyboardEvent, MutableRefObject, useRef } from 'react';

export type UseFocusTrapOptions<HTMLElementType extends HTMLElement = HTMLDialogElement> = {
  /** Document object */
  document?: Document;
  /** DOM elements selector */
  querySelector?: string;
  /** Ref object to use if ref isn't supplied in properties. */
  ref?: MutableRefObject<HTMLElementType | null>;
};

const defaultOptions = {
  querySelector:
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])',
} satisfies Partial<UseFocusTrapOptions>;

/**
 * @docs {@link https://design.visa.com/react/hooks/use-focus-trap | See Docs}
 * @description This hook is used to trap focus inside a container.
 * @related dialog, panel
 */
export const useFocusTrap = <HTMLElementType extends HTMLElement = HTMLDialogElement>(
  useFocusTrapOptions?: UseFocusTrapOptions<HTMLElementType>
) => {
  const customRef = useRef<HTMLElementType | null>(null);

  const options: UseFocusTrapOptions<HTMLElementType> = {
    document: typeof window !== 'undefined' ? document : undefined,
    ...defaultOptions,
    ...useFocusTrapOptions,
  };
  const ref = options.ref || customRef;

  const onKeyNavigation = (e: KeyboardEvent, open = false) => {
    if (!open || !ref.current?.querySelectorAll) {
      return;
    }

    const focusableElements: NodeListOf<HTMLElement> = ref.current?.querySelectorAll(
      options.querySelector || ''
    ) as NodeListOf<HTMLElement>;
    const firstElement: HTMLElement | null = focusableElements[0];
    const lastElement: HTMLElement | null = focusableElements[focusableElements.length - 1];

    if (open && e.key === 'Tab') {
      if (e.shiftKey && options.document?.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && options.document?.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  return {
    /** Function that handles on key down for navigation */
    onKeyNavigation,
    /** Ref object to use if ref isn't supplied in props */
    ref,
  };
};

export default useFocusTrap;

useFocusTrap.displayName = 'useFocusTrap';

useFocusTrap.defaultProps = {
  querySelector: 'a[href], button:not(disabled), textarea:not(disabled), input:not(disabled), select:not(disabled)',
};
