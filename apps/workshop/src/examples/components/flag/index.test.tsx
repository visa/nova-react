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
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { ButtonErrorFlag } from './button-error-flag';
import { ButtonInformationFlag } from './button-information-flag';
import { ButtonSuccessFlag } from './button-success-flag';
import { ButtonWarningFlag } from './button-warning-flag';
import { DefaultErrorFlag } from './default-error-flag';
import { DefaultInformationFlag } from './default-information-flag';
import { DefaultSuccessFlag } from './default-success-flag';
import { DefaultWarningFlag } from './default-warning-flag';
import { EmptyErrorFlag } from './empty-error-flag';
import { EmptyInformationFlag } from './empty-information-flag';
import { EmptySuccessFlag } from './empty-success-flag';
import { EmptyWarningFlag } from './empty-warning-flag';
import { LinkErrorFlag } from './link-error-flag';
import { LinkInformationFlag } from './link-information-flag';
import { LinkSuccessFlag } from './link-success-flag';
import { LinkWarningFlag } from './link-warning-flag';
import { PersistentErrorFlag } from './persistent-error-flag';
import { PersistentInformationFlag } from './persistent-information-flag';
import { PersistentSuccessFlag } from './persistent-success-flag';
import { PersistentWarningFlag } from './persistent-warning-flag';
import { TitleErrorFlag } from './title-error-flag';
import { TitleInformationFlag } from './title-information-flag';
import { TitleSuccessFlag } from './title-success-flag';
import { TitleWarningFlag } from './title-warning-flag';

const examples = [
  { Component: ButtonErrorFlag, title: metaData['button-error-flag'].title },
  { Component: ButtonInformationFlag, title: metaData['button-information-flag'].title },
  { Component: ButtonSuccessFlag, title: metaData['button-success-flag'].title },
  { Component: ButtonWarningFlag, title: metaData['button-warning-flag'].title },
  { Component: DefaultErrorFlag, title: metaData['default-error-flag'].title },
  { Component: DefaultInformationFlag, title: metaData['default-information-flag'].title },
  { Component: DefaultSuccessFlag, title: metaData['default-success-flag'].title },
  { Component: DefaultWarningFlag, title: metaData['default-warning-flag'].title },
  { Component: EmptyErrorFlag, title: metaData['empty-error-flag'].title },
  { Component: EmptyInformationFlag, title: metaData['empty-information-flag'].title },
  { Component: EmptySuccessFlag, title: metaData['empty-success-flag'].title },
  { Component: EmptyWarningFlag, title: metaData['empty-warning-flag'].title },
  { Component: LinkErrorFlag, title: metaData['link-error-flag'].title },
  { Component: LinkInformationFlag, title: metaData['link-information-flag'].title },
  { Component: LinkSuccessFlag, title: metaData['link-success-flag'].title },
  { Component: LinkWarningFlag, title: metaData['link-warning-flag'].title },
  { Component: PersistentErrorFlag, title: metaData['persistent-error-flag'].title },
  { Component: PersistentInformationFlag, title: metaData['persistent-information-flag'].title },
  { Component: PersistentSuccessFlag, title: metaData['persistent-success-flag'].title },
  { Component: PersistentWarningFlag, title: metaData['persistent-warning-flag'].title },
  { Component: TitleErrorFlag, title: metaData['title-error-flag'].title },
  { Component: TitleInformationFlag, title: metaData['title-information-flag'].title },
  { Component: TitleSuccessFlag, title: metaData['title-success-flag'].title },
  { Component: TitleWarningFlag, title: metaData['title-warning-flag'].title },
];

describe('Flag examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
