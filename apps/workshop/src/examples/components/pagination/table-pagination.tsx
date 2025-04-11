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
  VisaChevronDownTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny,
} from '@visa/nova-icons-react';
import {
  Button,
  InputContainer,
  InputControl,
  InputMessage,
  Label,
  Pagination,
  PaginationOverflow,
  Select,
  Utility,
  UtilityFragment,
  calculatePagesFromTo,
  calculateTotalPages,
  usePagination,
} from '@visa/nova-react';
import { CSSProperties, FormEvent, useState } from 'react';

const totalItems = 100;

export const TablePagination = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = calculateTotalPages(totalItems, itemsPerPage);
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
  } = usePagination({ totalPages });

  const { from, to } = calculatePagesFromTo(totalItems, itemsPerPage, selectedPage);

  const onItemsPerPageChange = (event: FormEvent<HTMLSelectElement>) => {
    onFirstPage();
    setItemsPerPage(+event.currentTarget.value);
  };

  return (
    <Utility vAlignItems="center" vFlex vFlexRow vFlexWrapReverse vGap={10} vJustifyContent="between">
      <Utility
        style={{ textWrap: 'nowrap' } as CSSProperties}
        tag="fieldset"
        vAlignItems="center"
        vFlex
        vFlexRow
        vGap={12}
      >
        <Label htmlFor="select-items-per-page">Items Per Page</Label>
        <InputContainer>
          <Select
            id="select-items-per-page"
            name="select-items-per-page"
            onChange={onItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Select>
          <InputControl>
            <VisaChevronDownTiny />
          </InputControl>
        </InputContainer>
        <InputMessage id="select-default-message">{`${from} - ${to} of ${totalItems}`}</InputMessage>
      </Utility>
      <UtilityFragment>
        <nav aria-label="table pagination" role="navigation">
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
                  <UtilityFragment key={`table-pagination-ellipse-${index}`} vAlignItems="center" vFlex>
                    <PaginationOverflow>
                      <VisaOptionHorizontalTiny />
                    </PaginationOverflow>
                  </UtilityFragment>
                ) : (
                  <li key={`table-pagination-page-${pageNumber}`}>
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
      </UtilityFragment>
    </Utility>
  );
};
