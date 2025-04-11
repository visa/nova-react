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

import usePagination, { calculatePagesFromTo, calculateTotalPages } from '.';
import { generateArray } from './utils';

afterAll(() => (console.error as jest.Mock).mockRestore());
beforeAll(() => (console.error = jest.fn()));
describe('usePagination', () => {
  describe('generateArray', () => {
    it('should generate array from 0 to 4', () => {
      const result = generateArray(0, 5);
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });
    it('should generate array from 9 to 14', () => {
      const result = generateArray(9, 6);
      expect(result).toEqual([9, 10, 11, 12, 13, 14]);
    });
  });

  describe('calculateTotalPages', () => {
    it('should correctly calculate pages with perfect items length', () => {
      const result = calculateTotalPages(100, 10);
      expect(result).toBe(10);
    });
    it('should correctly calculate pages with overflow items length', () => {
      const result = calculateTotalPages(101, 10);
      expect(result).toBe(11);
    });
  });
  describe('calculatePagesFromTo', () => {
    it('should correctly to/from all zeros', () => {
      const result = calculatePagesFromTo(0, 0, 0, 0);
      expect(result.to).toEqual(0);
      expect(result.from).toEqual(0);
    });
    it('should correctly to/from on page zero', () => {
      const result = calculatePagesFromTo(100, 10, 0, 0);
      expect(result.from).toEqual(1);
      expect(result.to).toEqual(10);
    });

    it('should correctly to/from with firstPage 1000', () => {
      const result = calculatePagesFromTo(100, 10, 100, 99);
      expect(result.from).toEqual(11);
      expect(result.to).toEqual(20);
    });
    it('should correctly to/from on first page', () => {
      const result = calculatePagesFromTo(100, 10, 1);
      expect(result.from).toBe(1);
      expect(result.to).toBe(10);
    });
    it('should correctly to/from on middle page', () => {
      const result = calculatePagesFromTo(100, 10, 5);
      expect(result.from).toBe(41);
      expect(result.to).toBe(50);
    });
    it('should correctly to/from on last page', () => {
      const result = calculatePagesFromTo(100, 10, 10);
      expect(result.from).toBe(91);
      expect(result.to).toBe(100);
    });

    it('should correctly to/from on with last page overflow', () => {
      const result = calculatePagesFromTo(101, 10, 11);
      expect(result.from).toBe(101);
      expect(result.to).toBe(101);
    });
  });

  describe('props', () => {
    it('should have proper results with default props', () => {
      const { result } = renderHook(() => usePagination({ totalPages: 10 }));
      expect(result.current.isFirstPage).toBe(true);
      expect(result.current.isLastPage).toBe(false);
      expect(result.current.pages).toEqual([1, 2, 3, -1, 10]);
    });
    it('should allow for custom separator', () => {
      const { result } = renderHook(() => usePagination({ separator: '*', totalPages: 10 }));
      expect(result.current.pages).toEqual([1, 2, 3, '*', 10]);
    });
    it('should allow for custom startBlockMaxLength', () => {
      const { result } = renderHook(() => usePagination({ startBlockMaxLength: 2, totalPages: 10 }));
      expect(result.current.pages).toEqual([1, 2, -1, 10]);
    });
    it('should allow for custom middleBlockMaxLength', () => {
      const { result } = renderHook(() => usePagination({ defaultSelected: 5, middleBlockMaxLength: 2, totalPages: 10 }));
      expect(result.current.pages).toEqual([1, -1, 4, 5, -1, 10]);
    });
    it('should allow for custom endBlockMaxLength', () => {
      const { result } = renderHook(() => usePagination({ defaultSelected: 9, endBlockMaxLength: 2, totalPages: 10 }));
      expect(result.current.pages).toEqual([1, -1, 9, 10]);
    });
    it('should render correctly if minPageNumber is larger than defaultSelected', () => {
      const { result } = renderHook(() => usePagination({ defaultSelected: 1, startPage: 3, totalPages: 10 }));
      expect(result.current.selectedPage).toEqual(3);
    });
    it('should render correctly with zero pages', () => {
      const { result } = renderHook(() => usePagination({ totalPages: 0 }));
      expect(result.current.selectedPage).toEqual(0);
    });
  });

  describe('events', () => {
    describe('onFirstPage', () => {
      it('should navigate to first page', () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 8, totalPages: 10 }));
        act(() => result.current.onFirstPage());
        expect(result.current.selectedPage).toEqual(1);
      });
    });
    describe('onLastPage', () => {
      it('should navigate to first page', () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 8, totalPages: 10 }));
        act(() => result.current.onLastPage());
        expect(result.current.selectedPage).toEqual(10);
      });
    });
    describe('onNextPage', () => {
      it('should navigate to next page with default props', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        act(() => result.current.onNextPage());
        expect(result.current.selectedPage).toEqual(2);
      });
      it("shouldn't navigate to next page when on last page", () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 10, totalPages: 10 }));
        act(() => result.current.onNextPage());
        expect(result.current.selectedPage).toEqual(10);
      });
    });
    describe('onPreviousPage', () => {
      it("shouldn't navigate to prev page with default props", () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        act(() => result.current.onPreviousPage());
        expect(result.current.selectedPage).toEqual(1);
      });
      it('should navigate to prev page with default props', () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 5, totalPages: 10 }));
        act(() => result.current.onPreviousPage());
        expect(result.current.selectedPage).toEqual(4);
      });
      it("shouldn't navigate to prev page when on first page", () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 1, totalPages: 10 }));
        act(() => result.current.onPreviousPage());
        expect(result.current.selectedPage).toEqual(1);
      });
    });
    describe('onPageChange', () => {
      it('should navigate to page when possible', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        act(() => result.current.onPageChange(5));
        expect(result.current.selectedPage).toEqual(5);
      });
      it("shouldn't navigate to page when larger than total pages", () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        act(() => result.current.onPageChange(11));
        expect(result.current.selectedPage).toEqual(10);
      });
      it("shouldn't navigate to page when less than first page", () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        act(() => result.current.onPageChange(0));
        expect(result.current.selectedPage).toEqual(1);
      });
    });
  });

  describe('derived state', () => {
    describe('isFirst', () => {
      it('should be true if first page selected', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        expect(result.current.isFirstPage).toBe(true);
      });
      it('should be false if last page selected', () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 10, totalPages: 10 }));
        expect(result.current.isFirstPage).toBe(false);
      });
    });
    describe('isLast', () => {
      it('should be true if first page selected', () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 10, totalPages: 10 }));
        expect(result.current.isLastPage).toBe(true);
      });
      it('should be false if first page selected', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        expect(result.current.isLastPage).toBe(false);
      });
    });
    describe('pages', () => {
      it('should show all pages if not enough pages', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 3 }));
        expect(result.current.pages).toEqual([1, 2, 3]);
      });
      it('should show all pages if just enough pages', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 9 }));
        expect(result.current.pages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });
      it('should paginate if just enough pages', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        expect(result.current.pages).toEqual([1, 2, 3, -1, 10]);
      });
      it('should be in first block if first page selected', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        expect(result.current.pages).toEqual([1, 2, 3, -1, 10]);
      });
      it('should be in first block if third page selected', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 10 }));
        expect(result.current.pages).toEqual([1, 2, 3, -1, 10]);
      });

      it('should be in middle block if fourth page selected', () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 4, totalPages: 10 }));
        expect(result.current.pages).toEqual([1, -1, 3, 4, 5, -1, 10]);
      });
      it('should be in middle block if 7th page selected', () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 7, totalPages: 10 }));
        expect(result.current.pages).toEqual([1, -1, 6, 7, 8, -1, 10]);
      });
      it('should be in last block if 8th page selected', () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 8, totalPages: 10 }));
        expect(result.current.pages).toEqual([1, -1, 8, 9, 10]);
      });
      it('should be in last block if last page selected', () => {
        const { result } = renderHook(() => usePagination({ defaultSelected: 10, totalPages: 10 }));
        expect(result.current.pages).toEqual([1, -1, 8, 9, 10]);
      });

      it('should be offset by min page number', () => {
        const { result } = renderHook(() => usePagination({ startPage: 20, totalPages: 11 }));
        expect(result.current.pages).toEqual([20, 21, 22, -1, 30]);
      });

      it('should be offset by min page number, allowing for max page number', () => {
        const { result } = renderHook(() => usePagination({ maxPageNumber: 30, startPage: 20, totalPages: 100 }));
        expect(result.current.pages).toEqual([20, 21, 22, -1, 30]);
      });
      it('should show one page', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 1 }));
        expect(result.current.pages).toEqual([1]);
      });
      it('should show no pages', () => {
        const { result } = renderHook(() => usePagination({ totalPages: 0 }));
        expect(result.current.pages).toEqual([]);
      });
      it('should show middle range pages within bounds of last page', () => {
        const { result } = renderHook(() =>
          usePagination({
            defaultSelected: 9,
            middleBlockMaxLength: 5,
            startBlockMaxLength: 1,
            endBlockMaxLength: 1,
            totalPages: 10,
          })
        );
        expect(result.current.pages).toEqual([1, -1, 5, 6, 7, 8, 9, -1, 10]);
      });
      it('should show middle range pages within bounds of last page, with second from last middle index', () => {
        const { result } = renderHook(() =>
          usePagination({
            defaultSelected: 8,
            middleBlockMaxLength: 5,
            startBlockMaxLength: 1,
            endBlockMaxLength: 1,
            totalPages: 10,
          })
        );
        expect(result.current.pages).toEqual([1, -1, 5, 6, 7, 8, 9, -1, 10]);
      });

      it('should show middle range pages within bounds of last page', () => {
        const { result } = renderHook(() =>
          usePagination({
            defaultSelected: 2,
            middleBlockMaxLength: 5,
            startBlockMaxLength: 1,
            endBlockMaxLength: 1,
            totalPages: 10,
          })
        );
        expect(result.current.pages).toEqual([1, -1, 2, 3, 4, 5, 6, -1, 10]);
      });
      it('should show middle range pages within bounds of last page, with second selected middle index', () => {
        const { result } = renderHook(() =>
          usePagination({
            defaultSelected: 3,
            middleBlockMaxLength: 5,
            startBlockMaxLength: 1,
            endBlockMaxLength: 1,
            totalPages: 10,
          })
        );
        expect(result.current.pages).toEqual([1, -1, 2, 3, 4, 5, 6, -1, 10]);
      });
    });
    it('should catch throw error if limits are less than 1', () => {
      expect(() => renderHook(() => usePagination({ totalPages: 1, middleBlockMaxLength: 0 }))).toThrow();
      expect(() => renderHook(() => usePagination({ totalPages: 1, startBlockMaxLength: 0 }))).toThrow();
      expect(() => renderHook(() => usePagination({ totalPages: 1, endBlockMaxLength: 0 }))).toThrow();
    });
    it('should catch throw error if start page or maxPageNumber are less than 1 or zero', () => {
      expect(() => renderHook(() => usePagination({ totalPages: 1, maxPageNumber: 0 }))).toThrow();
      expect(() => renderHook(() => usePagination({ totalPages: 1, startPage: -1 }))).toThrow();
    });
  });
});
