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
import { ForwardedRef } from 'react';
import forwardRef from '../types';

export type TheadProperties = Record<string, unknown>;

const Thead = <HTMLElementType,>(props: TheadProperties, ref: ForwardedRef<HTMLElementType>) => (
  <thead ref={ref as ForwardedRef<HTMLTableSectionElement>} {...props} />
);

/**
 * Table head component that contains all the th cells.
 * @docs {@link https://design.visa.com/react/components/table | See Docs}
 */
export default forwardRef<TheadProperties, HTMLTableSectionElement>(Thead);

Thead.displayName = 'Thead';
