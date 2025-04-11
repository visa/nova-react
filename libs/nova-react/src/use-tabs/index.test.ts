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
import { act, renderHook } from '@testing-library/react';
import { KeyboardEvent, MutableRefObject } from 'react';

import useTabs from '.';

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

afterEach(focusMocks.mockClear);

describe('useTabs', () => {
  it('should return correct default state', () => {
    const { result } = renderHook(() => useTabs());
    expect(result.current.selectedIndex).toBe(-1);
  });

  it('should return correct state when declare by props', () => {
    const { result } = renderHook(() => useTabs({ defaultSelected: 2 }));
    expect(result.current.selectedIndex).toBe(2);
  });
  it('should change state onIndexChange when not disabled', () => {
    const { result } = renderHook(() => useTabs());

    act(() => {
      result.current.onIndexChange(1);
    });

    expect(result.current.selectedIndex).toBe(1);
  });

  it('should change state onIndexChange when disabled', () => {
    const { result } = renderHook(() => useTabs());

    act(() => {
      result.current.onIndexChange(1, true);
    });

    expect(result.current.selectedIndex).toBe(-1);
  });

  it('should return the correct tab index if no tab is default selected', () => {
    const { result } = renderHook(() => useTabs());

    const mock = jest.fn();

    act(() => {
      mock(result.current.getTabIndex(0, true));
    });

    act(() => {
      mock(result.current.getTabIndex(1));
    });

    act(() => {
      mock(result.current.getTabIndex(2));
    });
    expect(mock.mock.calls.flat()).toEqual([-1, 0, -1]);
    mock.mockClear();
  });

  it('should focus the correct element on Arrow Right', () => {
    const keyboardEvent = { key: 'ArrowRight', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.flat()).toEqual([2, 3, 1, 2]);
  });

  it('should not move on Arrow Down for horizontal tabs', () => {
    const keyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.length).toBe(0);
  });

  it('should focus the correct element when arrowKeyNavigation is both', () => {
    const keyboardEventRight = { key: 'ArrowRight', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;
    const keyboardEventDown = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;
    const keyboardEventLeft = { key: 'ArrowLeft', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;
    const keyboardEventUp = { key: 'ArrowUp', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ ref: refs, arrowKeyNavigation: 'both' }));

    act(() => {
      result.current.onKeyNavigation(keyboardEventRight);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEventDown);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEventRight);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEventDown);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEventLeft);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEventUp);
    });
    expect(focusMocks.mock.calls.flat()).toEqual([2, 3, 1, 2, 1, 3]);
  });

  it('should not move on Arrow when arrowKeyNavigation is none', () => {
    const keyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ ref: refs, arrowKeyNavigation: 'none' }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.length).toBe(0);
  });

  it('should focus and select the correct element on Arrow Right with auto select', () => {
    const keyboardEvent = { key: 'ArrowRight', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ autoSelect: true, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });

    expect(focusMocks).toHaveBeenLastCalledWith(2);
    expect(result.current.selectedIndex).toBe(2);
  });
  it('should focus the correct element on Arrow Right with default selected', () => {
    const keyboardEvent = { key: 'ArrowRight', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ defaultSelected: 2, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.flat()).toEqual([3, 1, 2, 3]);
  });
  it('should focus the correct element on Arrow Left', () => {
    const keyboardEvent = { key: 'ArrowLeft', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.flat()).toEqual([3, 2, 1, 3]);
  });
  it('should focus the correct element on Arrow Right', () => {
    const keyboardEvent = { key: 'ArrowRight', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.flat()).toEqual([2, 3, 1, 2]);
  });
  it('should focus the correct element on Arrow Left', () => {
    const keyboardEvent = { key: 'ArrowLeft', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.flat()).toEqual([3, 2, 1, 3]);
  });

  it('should focus the correct element on Arrow Left with default selected', () => {
    const keyboardEvent = { key: 'ArrowLeft', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ defaultSelected: 2, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.flat()).toEqual([1, 3, 2, 1]);
  });
  it('should focus the correct element on Home', () => {
    const keyboardEvent = { key: 'Home', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ defaultSelected: 2, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });

    expect(focusMocks).toHaveBeenLastCalledWith(1);
  });

  it('should focus the correct element on End', () => {
    const keyboardEvent = { key: 'End', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ defaultSelected: 2, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });

    expect(focusMocks).toHaveBeenLastCalledWith(3);
  });

  it('should reset focus index on tab', () => {
    const tabKeyboardEvent = { key: 'Tab' } as KeyboardEvent<HTMLUListElement>;
    const arrowRightKeyboardEvent = { key: 'ArrowRight', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useTabs({ defaultSelected: 2, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(arrowRightKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(tabKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowRightKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowRightKeyboardEvent);
    });

    expect(focusMocks.mock.calls.flat()).toEqual([3, 3, 1]);
  });

  it('should set orientation to vertical if parent tabs element has the v-tabs-vertical class', () => {
    const keyboardEventRight = { key: 'ArrowRight', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;
    const keyboardEventDown = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    // This is hard to test without changing the API of the useTabs hook,
    // so this is an especially intense mock. Warning.

    const focusMocks = jest.fn();
    const mockHTMLElement = Object.create(HTMLElement.prototype, {
      focus: {
        value: () => {},
        writable: true,
      },
      parentElement: {
        // Reassign the getter here because the parentElement property is read-only.
        get: () => ({
          parentElement: {
            classList: {
              contains: (className: string) => className === 'v-tabs-vertical',
            },
          },
        }),
      },
    });

    const refs = {
      current: [
        Object.assign(Object.create(mockHTMLElement), { focus: () => focusMocks(0) }),
        Object.assign(Object.create(mockHTMLElement), { focus: () => focusMocks(1) }),
        Object.assign(Object.create(mockHTMLElement), { focus: () => focusMocks(2) }),
        Object.assign(Object.create(mockHTMLElement), { focus: () => focusMocks(3) }),
      ],
    } as unknown as MutableRefObject<HTMLButtonElement[]>; // force Typescript to accept this abomination with an unknown type cast

    const { result } = renderHook(() => useTabs({ ref: refs, arrowKeyNavigation: null })); // make sure arrowKeyNavigation is null so the component has to reference the mock parentElement

    act(() => {
      result.current.onKeyNavigation(keyboardEventDown);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEventRight);
    });
    act(() => {
      result.current.onKeyNavigation(keyboardEventDown);
    });
    expect(focusMocks.mock.calls.length).toEqual(2);
  });
});
