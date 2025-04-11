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

import { ButtonErrorBanner } from './button-error-banner';
import { ButtonInformationBanner } from './button-information-banner';
import { ButtonSuccessBanner } from './button-success-banner';
import { ButtonWarningBanner } from './button-warning-banner';
import { DefaultErrorBanner } from './default-error-banner';
import { DefaultInformationBanner } from './default-information-banner';
import { DefaultSuccessBanner } from './default-success-banner';
import { DefaultWarningBanner } from './default-warning-banner';
import { EmptyErrorBanner } from './empty-error-banner';
import { EmptyInformationBanner } from './empty-information-banner';
import { EmptySuccessBanner } from './empty-success-banner';
import { EmptyWarningBanner } from './empty-warning-banner';
import { LinkErrorBanner } from './link-error-banner';
import { LinkInformationBanner } from './link-information-banner';
import { LinkSuccessBanner } from './link-success-banner';
import { LinkWarningBanner } from './link-warning-banner';
import { PersistentErrorBanner } from './persistent-error-banner';
import { PersistentInformationBanner } from './persistent-information-banner';
import { PersistentSuccessBanner } from './persistent-success-banner';
import { PersistentWarningBanner } from './persistent-warning-banner';
import { TitleErrorBanner } from './title-error-banner';
import { TitleInformationBanner } from './title-information-banner';
import { TitleSuccessBanner } from './title-success-banner';
import { TitleWarningBanner } from './title-warning-banner';

const examples = [
  { Component: DefaultErrorBanner, title: metaData['default-error-banner'].title },
  { Component: DefaultInformationBanner, title: metaData['default-information-banner'].title },
  { Component: DefaultSuccessBanner, title: metaData['default-success-banner'].title },
  { Component: DefaultWarningBanner, title: metaData['default-warning-banner'].title },
  { Component: EmptyErrorBanner, title: metaData['empty-error-banner'].title },
  { Component: EmptyInformationBanner, title: metaData['empty-information-banner'].title },
  { Component: EmptySuccessBanner, title: metaData['empty-success-banner'].title },
  { Component: EmptyWarningBanner, title: metaData['empty-warning-banner'].title },
  { Component: TitleErrorBanner, title: metaData['title-error-banner'].title },
  { Component: TitleInformationBanner, title: metaData['title-information-banner'].title },
  { Component: TitleSuccessBanner, title: metaData['title-success-banner'].title },
  { Component: TitleWarningBanner, title: metaData['title-warning-banner'].title },
  { Component: PersistentErrorBanner, title: metaData['persistent-error-banner'].title },
  { Component: PersistentInformationBanner, title: metaData['persistent-information-banner'].title },
  { Component: PersistentSuccessBanner, title: metaData['persistent-success-banner'].title },
  { Component: PersistentWarningBanner, title: metaData['persistent-warning-banner'].title },
  { Component: ButtonErrorBanner, title: metaData['button-error-banner'].title },
  { Component: ButtonInformationBanner, title: metaData['button-information-banner'].title },
  { Component: ButtonSuccessBanner, title: metaData['button-success-banner'].title },
  { Component: ButtonWarningBanner, title: metaData['button-warning-banner'].title },
  { Component: LinkErrorBanner, title: metaData['link-error-banner'].title },
  { Component: LinkInformationBanner, title: metaData['link-information-banner'].title },
  { Component: LinkSuccessBanner, title: metaData['link-success-banner'].title },
  { Component: LinkWarningBanner, title: metaData['link-warning-banner'].title },
];

describe('Banner examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
