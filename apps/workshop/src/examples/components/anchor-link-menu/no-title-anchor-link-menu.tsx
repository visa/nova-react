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
import { AnchorLinkMenu, Link } from '@visa/nova-react';

export const NoTitleAnchorLinkMenu = () => {
  return (
    <AnchorLinkMenu aria-label="Section title">
      <section>
        <ul>
          <li>
            <Link aria-current="true" href="./anchor-link-menu">
              L1 label 1
            </Link>
          </li>
          <li>
            <Link href="./anchor-link-menu">L1 label 2</Link>
          </li>
          <li>
            <Link href="./anchor-link-menu">L1 label 3</Link>
          </li>
          <li>
            <Link href="./anchor-link-menu">L1 label 4</Link>
          </li>
          <li>
            <Link href="./anchor-link-menu">L1 label 5</Link>
          </li>
        </ul>
      </section>
    </AnchorLinkMenu>
  );
};
