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

import useAccordion from '.';

const focusMocks = jest.fn();
const refs = {
  current: [
    {
      disabled: true,
      focus: () => focusMocks(0),
    },
    {
      focus: () => focusMocks(1),
    },
    {
      focus: () => focusMocks(2),
    },
    {
      focus: () => focusMocks(3),
    },
  ],
} as MutableRefObject<HTMLButtonElement[]>;

const refsDisabled = {
  current: [
    {
      disabled: true,
      focus: () => focusMocks(0),
    },
    {
      disabled: true,
      focus: () => focusMocks(1),
    },
  ],
} as MutableRefObject<HTMLButtonElement[]>;

afterEach(focusMocks.mockClear);

describe('useAccordion', () => {
  it('should return the correct default state', () => {
    const { result } = renderHook(() => useAccordion());
    expect(result.current.isIndexExpanded(0)).toBe(false);
  });

  it('should allow for single default expanded states', () => {
    const { result } = renderHook(() =>
      useAccordion({
        defaultExpanded: 'a',
      })
    );
    expect(result.current.isIndexExpanded(0)).toBe(false);
    expect(result.current.isIndexExpanded('a')).toBe(true);
  });
  it('should allow for multiple default expanded states', () => {
    const { result } = renderHook(() => useAccordion({ defaultExpanded: ['0', 1] }));
    expect(result.current.isIndexExpanded(0)).toBe(false);
    expect(result.current.isIndexExpanded('0')).toBe(true);
    expect(result.current.isIndexExpanded(1)).toBe(true);
  });

  it("should return the correct state after calling 'toggleIndexExpanded' for multiple type", () => {
    const { result } = renderHook(() => useAccordion({ defaultExpanded: [0, 1, 'a'] }));
    expect(result.current.isIndexExpanded(0)).toBe(true);
    expect(result.current.isIndexExpanded(1)).toBe(true);
    expect(result.current.isIndexExpanded('a')).toBe(true);
    expect(result.current.isIndexExpanded('b')).toBe(false);
    act(() => {
      result.current.toggleIndexExpanded(0);
    });
    act(() => {
      result.current.toggleIndexExpanded('a');
    });
    act(() => {
      result.current.toggleIndexExpanded('b');
    });
    expect(result.current.isIndexExpanded(0)).toBe(false);
    expect(result.current.isIndexExpanded(1)).toBe(true);
    expect(result.current.isIndexExpanded('a')).toBe(false);
    expect(result.current.isIndexExpanded('b')).toBe(true);
  });

  it("should return the correct state after calling 'toggleIndexExpanded' for single type", () => {
    const { result } = renderHook(() => useAccordion({ defaultExpanded: 'a' }));

    expect(result.current.isIndexExpanded('a')).toBe(true);
    act(() => {
      result.current.toggleIndexExpanded('a');
    });
    expect(result.current.isIndexExpanded('a')).toBe(false);
    act(() => {
      result.current.toggleIndexExpanded('b');
    });
    expect(result.current.isIndexExpanded('b')).toBe(true);
  });

  it('should focus the correct element after tab keyboard navigation', () => {
    const { result } = renderHook(() => useAccordion({ ref: refs }));

    const keyboardEvent = { key: 'Tab', preventDefault: () => {} } as KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(2);
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(3);
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(3);
    expect(focusMocks).toHaveBeenCalledTimes(2);
  });

  it('should focus the correct element after shift tab keyboard navigation', () => {
    const { result } = renderHook(() => useAccordion({ ref: refs }));

    const keyboardEvent = { key: 'Tab', preventDefault: () => {}, shiftKey: true } as KeyboardEvent<HTMLElement>;

    act(() => {
      // focus on the last element
      result.current.toggleIndexExpanded(3);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(2);
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(1);
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(1);
    expect(focusMocks).toHaveBeenCalledTimes(2);
  });

  it('should focus the correct element after arrow up keyboard navigation', () => {
    const { result } = renderHook(() => useAccordion({ ref: refs }));

    const keyboardEvent = { key: 'ArrowUp', preventDefault: () => {} } as KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(3);
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(2);
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(1);
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(3);
  });

  it('should focus the correct element after arrow down keyboard navigation', () => {
    const { result } = renderHook(() => useAccordion({ ref: refs }));

    const keyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(2);
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(3);
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(1);
  });

  it('should focus the correct element after end keyboard navigation', () => {
    const { result } = renderHook(() => useAccordion({ ref: refs }));

    const keyboardEvent = { key: 'End', preventDefault: () => {} } as KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(3);
  });

  it('should focus the correct element after home keyboard navigation', () => {
    const { result } = renderHook(() => useAccordion({ ref: refs }));

    const keyboardEvent = { key: 'Home', preventDefault: () => {} } as KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenLastCalledWith(1);
  });

  it('should focus the correct element after tab keyboard navigation with all disabled elements', () => {
    const { result } = renderHook(() => useAccordion({ ref: refsDisabled }));

    const keyboardEvent = { key: 'Tab', preventDefault: () => {} } as KeyboardEvent<HTMLElement>;

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks).toHaveBeenCalledTimes(0);
  });
});
