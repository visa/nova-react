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
/**
 * Calculates how many pages there are
 * @param {number} items - how many items we have
 * @param {number} itemsPerPage - how many items there are, per page
 * @returns {number} how many pages there are in total
 */
export const calculateTotalPages = (items: number, itemsPerPage: number): number => Math.ceil(items / itemsPerPage);

/**
 * Calculates which range of items that is currently visible from pagination
 * @param {number} items - how many items we have
 * @param {number} itemsPerPage - how many items there are, per page
 * @param {number} currentPage - which page is visible
 * @param {number} startPage - which page we're starting from, defaults to page 1 (optional)
 * @returns to from object with calculated values
 */
export const calculatePagesFromTo = (
  items: number,
  itemsPerPage: number,
  currentPage: number,
  startPage: number = 1
) => {
  if (itemsPerPage < 1 || items < 1) return { 0: 0, 1: 0, from: 0, to: 0 };
  const normalizedPageNumber = currentPage - startPage + 1;
  const from = Math.max((normalizedPageNumber - 1) * itemsPerPage + 1, 0);
  const to = Math.max(from + itemsPerPage - 1 > items ? items : from + itemsPerPage - 1, 0);
  return { 0: from, 1: to, from, to };
};

/**
 * Generates an array from number to from + length
 * @param {number} from
 * @param {number} length
 * @returns {number[]}
 */
export const generateArray = (from: number, length: number): number[] => Array.from({ length }, (_, i) => i + from);
