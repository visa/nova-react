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
import { act, renderHook } from '@testing-library/react';
import { KeyboardEvent, MutableRefObject } from 'react';
import { useFocusTrap } from './index';

const focusMocks = jest.fn();

const mockFirstElement = {
  id: 'first',
  focus: () => focusMocks(0),
} as HTMLElement;
const mockMiddleElement = {
  id: 'last',
  focus: () => focusMocks(2),
} as HTMLElement;
const mockLastElement = {
  id: 'last',
  focus: () => focusMocks(2),
} as HTMLElement;

const refs = {
  current: {
    querySelectorAll: () => [mockFirstElement, mockMiddleElement, mockLastElement] as HTMLElement[],
  },
} as unknown as MutableRefObject<HTMLElement | null>;

const mockDocumentFirst = {
  activeElement: mockFirstElement,
} as unknown as Document;
const mockDocumentMiddle = {
  activeElement: mockMiddleElement,
} as unknown as Document;
const mockDocumentLast = {
  activeElement: mockLastElement,
} as unknown as Document;

describe('useFocusTrap', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useFocusTrap());

    expect(result.current.ref).toEqual({ current: null });
  });
  it('should default to closed onKeyNavigation', () => {
    const { result } = renderHook(() =>
      useFocusTrap({
        document: mockDocumentFirst,
        ref: refs,
      })
    );

    const mockFn = jest.fn();

    const keyboardEvent = {
      key: 'Tab',
      preventDefault: mockFn,
      shiftKey: false,
    } as unknown as KeyboardEvent<HTMLDialogElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });

    expect(mockFn).toHaveBeenCalledTimes(0);
  });
  it('should default to closed onKeyNavigation', () => {
    const { result } = renderHook(() =>
      useFocusTrap({
        document: mockDocumentFirst,
        ref: refs,
      })
    );

    const mockFn = jest.fn();

    const keyboardEvent = {
      key: 'Tab',
      preventDefault: mockFn,
      shiftKey: false,
    } as unknown as KeyboardEvent<HTMLDialogElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });

    expect(mockFn).toHaveBeenCalledTimes(0);
  });
  it('should focus last element on shift tab first element', () => {
    const { result } = renderHook(() =>
      useFocusTrap({
        document: mockDocumentFirst,
        ref: refs,
      })
    );

    const keyboardEvent = {
      key: 'Tab',
      preventDefault: () => {},
      shiftKey: true,
    } as unknown as KeyboardEvent<HTMLDialogElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent, true);
    });

    expect(focusMocks).toHaveBeenCalledWith(2);
  });
  it('should focus first element on tab last element', () => {
    const { result } = renderHook(() =>
      useFocusTrap({
        document: mockDocumentLast,
        ref: refs,
      })
    );

    const keyboardEvent = {
      key: 'Tab',
      preventDefault: () => {},
      shiftKey: false,
    } as unknown as KeyboardEvent<HTMLDialogElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent, true);
    });

    expect(focusMocks).toHaveBeenCalledWith(0);
  });
  it("shouldn't prevent default on tab middle element", () => {
    const { result } = renderHook(() =>
      useFocusTrap({
        document: mockDocumentMiddle,
        ref: refs,
      })
    );

    const mockFn = jest.fn();

    const keyboardEvent = {
      key: 'Tab',
      preventDefault: mockFn,
      shiftKey: false,
    } as unknown as KeyboardEvent<HTMLDialogElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent, true);
    });

    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
