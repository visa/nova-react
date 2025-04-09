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

import useListbox from '.';

const focusMocks = jest.fn();
const refs = {
  current: [
    {
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
} as MutableRefObject<HTMLLIElement[]>;

afterEach(focusMocks.mockClear);
afterAll(() => (console.error as jest.Mock).mockRestore());

describe('useListbox', () => {
  it('should return correct default state', () => {
    const { result } = renderHook(() => useListbox());
    expect(result.current.isIndexSelected(0)).toBeFalsy();
  });
  it('check the default selected Index', () => {
    const { result } = renderHook(() => useListbox());
    expect(result.current.selectedIndex).toBe(-1);
  });
  it('should return correct state when declare by props (single select)', () => {
    const { result } = renderHook(() => useListbox({ defaultSelected: 2 }));
    expect(result.current.isIndexSelected(2)).toBeTruthy();
  });
  it('should return correct state when declare by props (multiselect)', () => {
    const { result } = renderHook(() => useListbox({ defaultSelected: [1, 2] }));
    expect(result.current.isIndexSelected(0)).toBeFalsy();
    expect(result.current.isIndexSelected(1)).toBeTruthy();
    expect(result.current.isIndexSelected(2)).toBeTruthy();
    expect(result.current.isIndexSelected(3)).toBeFalsy();
  });
  it('should throw error when both auto select and multiple select are declared', () => {
    console.error = jest.fn();

    expect(() => renderHook(() => useListbox({ autoSelect: true, defaultSelected: [1, 2] }))).toThrow();
  });
  it('should change state onIndexChange when not disabled', () => {
    const { result } = renderHook(() => useListbox());

    act(() => {
      result.current.toggleIndexSelected(1);
    });

    expect(result.current.isIndexSelected(1)).toBeTruthy();
  });
  it('should return the correct list item index if no list item is default selected', () => {
    const { result } = renderHook(() => useListbox());

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
  it('should return the correct list item index if no list item is default selected for multiselect listbox', () => {
    const { result } = renderHook(() => useListbox({ defaultSelected: [] }));

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

  it('should return the correct list item index if list item is default selected for multiselect listbox', () => {
    const { result } = renderHook(() => useListbox({ defaultSelected: [1] }));

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
  it('should return the correct list item index if un-check the list item', () => {
    const { result } = renderHook(() => useListbox({ defaultSelected: 1 }));

    const mock = jest.fn();

    act(() => {
      mock(result.current.toggleIndexSelected(1));
    });
    expect(result.current.isIndexSelected(1)).toBeFalsy();
    mock.mockClear();
  });
  it('should focus the correct element on Arrow Down', () => {
    const keyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ ref: refs }));

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
    expect(focusMocks.mock.calls.flat()).toEqual([1, 2, 3, 0]);
  });
  it('should focus the correct element on Arrow Down', () => {
    const keyboardEvent = { key: 'ArrowUp', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ ref: refs }));

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
    expect(focusMocks.mock.calls.flat()).toEqual([3, 2, 1, 0]);
  });
  it('should focus the correct element on Home', () => {
    const keyboardEvent = { key: 'Home', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.flat()).toEqual([0]);
  });
  it('should focus the correct element on End', () => {
    const keyboardEvent = { key: 'End', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ ref: refs }));

    act(() => {
      result.current.onKeyNavigation(keyboardEvent);
    });
    expect(focusMocks.mock.calls.flat()).toEqual([3]);
  });
  it('should reset focus index on Tab', () => {
    const tabKeyboardEvent = { key: 'Tab' } as KeyboardEvent<HTMLUListElement>;
    const arrowDownKeyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ defaultSelected: 2, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(tabKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });

    expect(focusMocks.mock.calls.flat()).toEqual([3, 3, 0]);
  });
  it('should reset focus index on Tab for multiselect listbox', () => {
    const tabKeyboardEvent = { key: 'Tab' } as KeyboardEvent<HTMLUListElement>;
    const arrowDownKeyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ defaultSelected: [2], ref: refs }));

    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(tabKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });

    expect(focusMocks.mock.calls.flat()).toEqual([3, 0, 1]);
  });
  it('should auto select item for single option list on Arrow Down', () => {
    const arrowDownKeyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ autoSelect: true, defaultSelected: 2, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });

    expect(result.current.selectedIndex).toBe(0);
  });
  it('should select item on space for single option list', () => {
    const spaceKeyboardEvent = { key: ' ' } as KeyboardEvent<HTMLUListElement>;
    const arrowDownKeyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ defaultSelected: 2, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(spaceKeyboardEvent);
    });

    expect(result.current.selectedIndex).toBe(3);
  });
  it('should select item on enter for single option list', () => {
    const enterKeyboardEvent = { key: 'Enter' } as KeyboardEvent<HTMLUListElement>;
    const arrowDownKeyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ defaultSelected: 2, ref: refs }));

    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(enterKeyboardEvent);
    });

    expect(result.current.selectedIndex).toBe(0);
  });
  it('should select item on space for multiple option list', () => {
    const spaceKeyboardEvent = { key: ' ' } as KeyboardEvent<HTMLUListElement>;
    const arrowDownKeyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ defaultSelected: [2], ref: refs }));

    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(spaceKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(spaceKeyboardEvent);
    });

    expect(result.current.selectedIndex).toEqual([3]);
  });
  it('should select item on enter for multiple option list', () => {
    const enterKeyboardEvent = { key: 'Enter' } as KeyboardEvent<HTMLUListElement>;
    const arrowDownKeyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;

    const { result } = renderHook(() => useListbox({ defaultSelected: [2], ref: refs }));

    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(enterKeyboardEvent);
    });

    expect(result.current.selectedIndex).toEqual([2, 0]);
  });

  it('should not focus on items where ariaDisabled is equal to false string', () => {
    const arrowDownKeyboardEvent = { key: 'ArrowDown', preventDefault: () => {} } as KeyboardEvent<HTMLUListElement>;
    const enterKeyboardEvent = { key: 'Enter' } as KeyboardEvent<HTMLUListElement>;
    const refs = {
      current: [
        {
          ariaDisabled: 'false',
          focus: () => focusMocks(0),
        },
        {
          ariaDisabled: 'true',
          focus: () => focusMocks(1),
        },
        {
          ariaDisabled: true,
          focus: () => focusMocks(2),
        },
        {
          ariaDisabled: false,
          focus: () => focusMocks(3),
        },
      ],
    } as MutableRefObject<HTMLLIElement[]>;
    const { result } = renderHook(() => useListbox({ ref: refs }));
    act(() => {
      result.current.onKeyNavigation(arrowDownKeyboardEvent);
    });
    act(() => {
      result.current.onKeyNavigation(enterKeyboardEvent);
    });
    expect(result.current.selectedIndex).toEqual(3);
  });
});
