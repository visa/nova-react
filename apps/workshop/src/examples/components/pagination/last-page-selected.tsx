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

export const LastDigitPagination = () => {
  return (
    <nav aria-label="1 digit pagination" role="navigation">
      <Pagination className="v-flex v-flex-row v-align-items-center v-gap-4">
        <li className="v-mobile-container-hide">
          <Button aria-label="Go to first page" buttonSize="small" colorScheme="tertiary" iconButton>
            <VisaArrowStartTiny rtl />
          </Button>
        </li>
        <li>
          <Button aria-label="Go to previous page" buttonSize="small" colorScheme="tertiary" iconButton>
            <VisaChevronLeftTiny rtl />
          </Button>
        </li>
        <li>
          <Button aria-label="Page 1" colorScheme="tertiary">
            1
          </Button>
        </li>
        <PaginationOverflow className="v-flex v-align-items-center v-mobile-container-hide">
          <VisaOptionHorizontalTiny />
        </PaginationOverflow>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 96" colorScheme="tertiary">
            96
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 97" colorScheme="tertiary">
            97
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 98" colorScheme="tertiary">
            98
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 99" colorScheme="tertiary">
            99
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Page 100" aria-current="true" colorScheme="tertiary">
            100
          </Button>
        </li>
        <li>
          <Button aria-label="Go to next page" buttonSize="small" colorScheme="tertiary" disabled iconButton>
            <VisaChevronRightTiny rtl />
          </Button>
        </li>
        <li className="v-mobile-container-hide">
          <Button aria-label="Go to last page" buttonSize="small" colorScheme="tertiary" disabled iconButton>
            <VisaArrowEndTiny rtl />
          </Button>
        </li>
      </Pagination>
    </nav>
  );
};
