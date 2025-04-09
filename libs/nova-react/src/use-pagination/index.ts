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
import { useEffect, useState } from 'react';
import { generateArray } from './utils';

type UsePaginationOptions = {
  /** Default selected page */
  defaultSelected?: number;
  /** Maximum length of pages to show on the end pagination block */
  endBlockMaxLength?: number;
  /** Maximum page number to be shown, (default null for no maximum) */
  maxPageNumber?: number | null;
  /** Maximum length of pages to show on the middle pagination block */
  middleBlockMaxLength?: number;
  /** What to separate the pagination array up with, usually this separator will be replaced with icon or ellipses when shown in the UI */
  separator?: number | string;
  /** Maximum length of pages to show on the start pagination block */
  startBlockMaxLength?: number;
  /** Start from this page */
  startPage?: number;
  /** Length of total pages */
  totalPages: number;
};

const defaultOptions = {
  defaultSelected: 1,
  endBlockMaxLength: 3,
  maxPageNumber: null,
  middleBlockMaxLength: 3,
  separator: -1,
  startBlockMaxLength: 3,
  startPage: 1,
} satisfies Partial<UsePaginationOptions>;

/**
 * @docs {@link https://design.visa.com/react/hooks/use-pagination | See Docs}
 * @description This hook is used to manage pagination events, state, and visible page blocks.
 * @related pagination
 * @vgar TODO
 * @wcag TODO
 */
export const usePagination = (usePaginationOptions: UsePaginationOptions) => {
  /// Options
  const {
    defaultSelected,
    endBlockMaxLength,
    maxPageNumber,
    middleBlockMaxLength,
    separator,
    startBlockMaxLength,
    startPage,
    totalPages,
  } = { ...defaultOptions, ...usePaginationOptions };

  /// State
  const [selectedPage, setSelectedPage] = useState(Math.min(Math.max(defaultSelected, startPage), totalPages));

  /// Derived State
  // First page
  const firstPage = startPage;
  // Ideal last page without maxPageNumber interfering
  const idealLastPage = totalPages + startPage - 1;
  // Last page;
  const lastPage = maxPageNumber === null ? idealLastPage : Math.min(maxPageNumber, idealLastPage);
  // Is first element selected
  const isFirstPage = selectedPage === firstPage;
  // Is last element selected
  const isLastPage = selectedPage === lastPage;
  // Can paginate or just show all pages
  const canPaginate = totalPages > endBlockMaxLength + middleBlockMaxLength + startBlockMaxLength;
  // Selected page is in start block
  const isInStartBlock = selectedPage < firstPage + startBlockMaxLength;
  // Selected page is in end block
  const isInEndBlock = selectedPage > lastPage - endBlockMaxLength;
  // Selected page is in middle block
  const isInMiddleBlock = !isInStartBlock && !isInEndBlock;
  // Pages to show at the start
  const startBlock = isInStartBlock ? generateArray(firstPage, startBlockMaxLength) : [firstPage];
  // Pages to show in the middle
  const middleBlock = (() => {
    if (!isInMiddleBlock) return [];
    const middleBlockPadding = Math.floor(middleBlockMaxLength / 2);
    if (selectedPage - middleBlockPadding <= firstPage)
      return generateArray(selectedPage - (selectedPage - firstPage) + 1, middleBlockMaxLength);
    if (selectedPage + middleBlockPadding >= lastPage)
      return generateArray(selectedPage + (lastPage - selectedPage) - middleBlockMaxLength, middleBlockMaxLength);
    return generateArray(selectedPage - middleBlockPadding, middleBlockMaxLength);
  })();
  // Pages to show at the end
  const endBlock = isInEndBlock ? generateArray(lastPage - endBlockMaxLength + 1, endBlockMaxLength) : [lastPage];
  // Array of pages arrays to loop over
  const pages = canPaginate
    ? [startBlock, middleBlock, endBlock]
        .map(block => (block.length ? [...block, separator] : []))
        .flat()
        .slice(0, -1)
    : generateArray(firstPage, lastPage - firstPage + 1);

  /// Events
  // On first page event
  const onFirstPage = () => setSelectedPage(firstPage);
  // On last page event
  const onLastPage = () => setSelectedPage(lastPage);
  // On next page event
  const onNextPage = () => setSelectedPage(Math.min(lastPage, selectedPage + 1));
  // On page change event
  const onPageChange = (pageNumber: number) => {
    if (pageNumber > lastPage) setSelectedPage(lastPage);
    else if (pageNumber < firstPage) setSelectedPage(firstPage);
    else setSelectedPage(pageNumber);
  };
  // On previous page event
  const onPreviousPage = () => setSelectedPage(Math.max(firstPage, selectedPage - 1));

  // Catch improper prop values
  useEffect(() => {
    if (endBlockMaxLength < 1 || middleBlockMaxLength < 1 || startBlockMaxLength < 1)
      throw new Error('endBlockMaxLength, middleBlockMaxLength, and startBlockMaxLength all must be greater than 0');
    if (startPage < 0 || (maxPageNumber !== null && maxPageNumber < 1))
      throw new Error('startPage must be 0 or greater, and maxPageNumber must be 1 or greater');
  }, [endBlockMaxLength, maxPageNumber, middleBlockMaxLength, startBlockMaxLength, startPage]);

  return {
    /** Is first page currently selected */
    isFirstPage,
    /** Is last page currently selected */
    isLastPage,
    /** Event to handle first page selection */
    onFirstPage,
    /** Event to handle last page selection */
    onLastPage,
    /** Event to handle next page selection */
    onNextPage,
    /** Event to handle page selection */
    onPageChange,
    /** Event to handle previous page selection */
    onPreviousPage,
    /** Array of currently visible pages split by separator */
    pages,
    /** Currently selected page */
    selectedPage,
  };
};

export default usePagination;
export { calculatePagesFromTo, calculateTotalPages } from './utils';

usePagination.displayName = 'usePagination';

usePagination.defaultProps = {
  defaultSelected: 1,
  endBlockMaxLength: 3,
  maxPageNumber: null,
  middleBlockMaxLength: 3,
  separator: -1,
  startBlockMaxLength: 3,
  startPage: 1,
};
