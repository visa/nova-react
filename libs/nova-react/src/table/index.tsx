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
import cn from 'clsx';
import { ComponentPropsWithRef, ElementType } from 'react';

const CSS_PREFIX = 'v-table';

export type TableProperties<ET extends ElementType = 'table',> = {
  /** Alt */
  alternate?: boolean;
  /** Borders all around the table and cells */
  border?: boolean;
  /** Borders only separating the rows */
  borderBlock?: boolean;

  /** Key value pairs where text for the first column is bold. */
  keyValue?: boolean;
  /** Subtle header */
  subtle?: boolean;
} &
  //We omit the border prop so it doesn't clash with our custom prop
  Omit<ComponentPropsWithRef<ET>, 'border'>;

/**
 * Grid that organizes information, enabling data interaction, manipulation, and criteria-based analysis using columns and rows.
 * @docs {@link https://design.visa.com/react/components/table | See Docs}
 * @related table-wrapper, tbody, td, th, thead, tr
 * @vgar TODO
 * @wcag TODO
 */
const Table = <ET extends ElementType = 'table',>(
  { alternate, border, borderBlock, className, keyValue, subtle, ...remainingProps }: TableProperties<ET>,
) => (
  <table
    {...remainingProps}
    className={cn(
      CSS_PREFIX,
      alternate && `${CSS_PREFIX}-alt`,
      border && `${CSS_PREFIX}-border`,
      borderBlock && `${CSS_PREFIX}-border-block`,
      keyValue && `${CSS_PREFIX}-key-value`,
      subtle && `${CSS_PREFIX}-subtle`,
      className
    )}
  />
);

export default Table;

Table.displayName = 'Table';
