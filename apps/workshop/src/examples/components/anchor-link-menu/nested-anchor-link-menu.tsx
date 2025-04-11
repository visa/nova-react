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
import { AnchorLinkMenu, AnchorLinkMenuHeader, Link, Typography } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'nested-anchor-link-menu';

export const NestedAnchorLinkMenu = () => {
  return (
    <AnchorLinkMenu aria-labelledby={`${id}-header`}>
      <section>
        <AnchorLinkMenuHeader>
          <Typography id={`${id}-header`} tag="h2" variant="overline">
            Section title
          </Typography>
        </AnchorLinkMenuHeader>
        <ul>
          <li>
            <Link aria-current="true" href="./anchor-link-menu">
              L1 label 1
            </Link>
          </li>
          <li>
            <Link href="./anchor-link-menu">L1 label 2</Link>
            <ul>
              <li>
                <Link href="./anchor-link-menu">L2 label 1</Link>
              </li>
              <li>
                <Link href="./anchor-link-menu">L2 label 2</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="./anchor-link-menu">L1 label 3</Link>
          </li>
        </ul>
      </section>
    </AnchorLinkMenu>
  );
};
