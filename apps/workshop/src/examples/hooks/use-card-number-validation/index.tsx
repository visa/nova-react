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
import { Link } from '@visa/nova-react';
import { ExampleIndex } from '../../../types';
import { Paths } from '../../../routes';

const validationDisclaimer = (
  <p style={{ marginBlockEnd: '3rem' }}>
    For full guidance on card validation please see our{' '}
    <Link href={Paths.vpds + '/components/card-input'}>card input design guidance</Link>. We are using updated
    validation logic inside the hook. Our logic is type safe and has been thoroughly unit tested. This logic can be
    extracted for use outside the hook or you can also bring your own validation logic. The previous{' '}
    <Link href="https://bookmarks.visa.com/vpds-bitbucket-card-number-utility">
      Visa UI Utils
    </Link>{' '}
    library is still a viable option, but might not be supported in the future. It also lacks testing and type safety
    for TypeScript users.
  </p>
);

const Examples: ExampleIndex[] = [
  { id: 'validation-section', title: 'Validation', type: 'section' },
  { component: validationDisclaimer, id: 'validation-disclaimer', type: 'content' },
  { id: 'use-card-validation-example' },
];

export default Examples;
