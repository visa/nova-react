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
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny,
} from '@visa/nova-icons-react';
import { Button, Pagination, PaginationOverflow, UtilityFragment, usePagination } from '@visa/nova-react';

export const MinMaxPagination = () => {
  const {
    isFirstPage,
    isLastPage,
    onFirstPage,
    onLastPage,
    onNextPage,
    onPageChange,
    onPreviousPage,
    pages,
    selectedPage,
  } = usePagination({ maxPageNumber: 75, startPage: 50, totalPages: 100 });

  return (
    <nav aria-label="minimum and maximum pagination" role="navigation">
      <UtilityFragment vAlignItems="center" vFlex vFlexRow vGap={4}>
        <Pagination>
          <li>
            <Button
              aria-label="Go to first page"
              buttonSize="small"
              colorScheme="tertiary"
              disabled={isFirstPage}
              iconButton
              onClick={onFirstPage}
            >
              <VisaArrowStartTiny rtl />
            </Button>
          </li>
          <li>
            <Button
              aria-label="Go to previous page"
              buttonSize="small"
              colorScheme="tertiary"
              disabled={isFirstPage}
              iconButton
              onClick={onPreviousPage}
            >
              <VisaChevronLeftTiny rtl />
            </Button>
          </li>
          {pages.map((pageNumber, index) =>
            pageNumber === -1 ? (
              <UtilityFragment key={`min-max-pagination-ellipse-${index}`} vAlignItems="center" vFlex>
                <PaginationOverflow>
                  <VisaOptionHorizontalTiny />
                </PaginationOverflow>
              </UtilityFragment>
            ) : (
              <li key={`min-max-pagination-page-${pageNumber}`}>
                <Button
                  aria-current={selectedPage === pageNumber}
                  aria-label={`Page ${pageNumber}`}
                  colorScheme="tertiary"
                  onClick={() => onPageChange(pageNumber as number)}
                >
                  {pageNumber}
                </Button>
              </li>
            )
          )}
          <li>
            <Button
              aria-label="Go to next page"
              buttonSize="small"
              colorScheme="tertiary"
              disabled={isLastPage}
              iconButton
              onClick={onNextPage}
            >
              <VisaChevronRightTiny rtl />
            </Button>
          </li>
          <li>
            <Button
              aria-label="Go to last page"
              buttonSize="small"
              colorScheme="tertiary"
              disabled={isLastPage}
              iconButton
              onClick={onLastPage}
            >
              <VisaArrowEndTiny rtl />
            </Button>
          </li>
        </Pagination>
      </UtilityFragment>
    </nav>
  );
};
