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
import { Button, Pagination, PaginationOverflow } from '@visa/nova-react';

export const OneDigitPagination = () => {
  return (
    <nav aria-label="1 digit pagination" role="navigation">
      <Pagination className="v-flex v-flex-row v-align-items-center v-gap-4">
        <li className="v-mobile-container-hide">
          <Button aria-label="Go to first page" buttonSize="small" colorScheme="tertiary" disabled iconButton>
            <VisaArrowStartTiny rtl />
          </Button>
        </li>
        <li>
          <Button aria-label="Go to previous page" buttonSize="small" colorScheme="tertiary" disabled iconButton>
            <VisaChevronLeftTiny rtl />
          </Button>
        </li>
        <li>
          <Button aria-current="true" aria-label="Page 1" colorScheme="tertiary">
            1
          </Button>
        </li>
        <li>
          <Button aria-label="Page 2" colorScheme="tertiary">
            2
          </Button>
        </li>
        <li>
          <Button aria-label="Page 3" colorScheme="tertiary">
            3
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 4" colorScheme="tertiary">
            4
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 5" colorScheme="tertiary">
            5
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 6" colorScheme="tertiary">
            6
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 7" colorScheme="tertiary">
            7
          </Button>
        </li>
        <PaginationOverflow className="v-flex v-align-items-center v-mobile-container-hide">
          <VisaOptionHorizontalTiny />
        </PaginationOverflow>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 100" colorScheme="tertiary">
            100
          </Button>
        </li>
        <li>
          <Button aria-label="Go to next page" buttonSize="small" colorScheme="tertiary" iconButton>
            <VisaChevronRightTiny rtl />
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Go to last page" buttonSize="small" colorScheme="tertiary" iconButton>
            <VisaArrowEndTiny rtl />
          </Button>
        </li>
      </Pagination>
    </nav>
  );
};
