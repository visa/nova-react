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
import { Breadcrumbs, Link } from '@visa/nova-react';

export const InlineSeparatorBreadcrumbs = () => {
  return (
    <Breadcrumbs ariaLabel="Inline separator breadcrumbs" customSeparator>
      <ol>
        <li>
          <Link href="./">L1 label</Link> <span aria-hidden="true">|</span>
        </li>
        <li>
          <Link href="./">L2 label</Link> <span aria-hidden="true">|</span>
        </li>
        <li>
          <Link href="./">L3 label</Link> <span aria-hidden="true">|</span>
        </li>
        <li>
          <span aria-current="page">L4 label</span>
        </li>
      </ol>
    </Breadcrumbs>
  );
};
