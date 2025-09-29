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

import { ComponentPropsWithRef, ElementType } from "react";

export type TbodyProperties<ET extends ElementType = 'tbody',> = Record<string, unknown> & ComponentPropsWithRef<ET>;

/**
 * Table body component that contains all the tr and td cells.
 * @docs {@link https://design.visa.com/react/components/table | See Docs}
 */
const Tbody = <ET extends ElementType = 'tbody',>(props: TbodyProperties<ET>) => (
  <tbody {...props} />
);

export default Tbody;

Tbody.displayName = 'Tbody';
