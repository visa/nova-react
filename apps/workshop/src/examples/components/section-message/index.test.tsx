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

import { ButtonErrorSectionMessage } from './button-error-section-message';
import { ButtonInformationSectionMessage } from './button-information-section-message';
import { ButtonSuccessSectionMessage } from './button-success-section-message';
import { ButtonWarningSectionMessage } from './button-warning-section-message';
import { ButtonSubtleSectionMessage } from './button-subtle-section-message';
import { DefaultErrorSectionMessage } from './default-error-section-message';
import { DefaultInformationSectionMessage } from './default-information-section-message';
import { DefaultSuccessSectionMessage } from './default-success-section-message';
import { DefaultWarningSectionMessage } from './default-warning-section-message';
import { DefaultSubtleSectionMessage } from './default-subtle-section-message';
import { EmptyErrorSectionMessage } from './empty-error-section-message';
import { EmptyInformationSectionMessage } from './empty-information-section-message';
import { EmptySuccessSectionMessage } from './empty-success-section-message';
import { EmptyWarningSectionMessage } from './empty-warning-section-message';
import { EmptySubtleSectionMessage } from './empty-subtle-section-message';
import { LinkErrorSectionMessage } from './link-error-section-message';
import { LinkInformationSectionMessage } from './link-information-section-message';
import { LinkSuccessSectionMessage } from './link-success-section-message';
import { LinkWarningSectionMessage } from './link-warning-section-message';
import { LinkSubtleSectionMessage } from './link-subtle-section-message';
import { PersistentErrorSectionMessage } from './persistent-error-section-message';
import { PersistentInformationSectionMessage } from './persistent-information-section-message';
import { PersistentSuccessSectionMessage } from './persistent-success-section-message';
import { PersistentWarningSectionMessage } from './persistent-warning-section-message';
import { PersistentSubtleSectionMessage } from './persistent-subtle-section-message';
import { TitleErrorSectionMessage } from './title-error-section-message';
import { TitleInformationSectionMessage } from './title-information-section-message';
import { TitleSuccessSectionMessage } from './title-success-section-message';
import { TitleWarningSectionMessage } from './title-warning-section-message';
import { TitleSubtleSectionMessage } from './title-subtle-section-message';

const examples = [
  { Component: DefaultErrorSectionMessage, title: metaData['default-error-section-message'].title },
  { Component: DefaultInformationSectionMessage, title: metaData['default-information-section-message'].title },
  { Component: DefaultSuccessSectionMessage, title: metaData['default-success-section-message'].title },
  { Component: DefaultWarningSectionMessage, title: metaData['default-warning-section-message'].title },
  { Component: DefaultSubtleSectionMessage, title: metaData['default-subtle-section-message'].title},
  { Component: EmptyErrorSectionMessage, title: metaData['empty-error-section-message'].title },
  { Component: EmptyInformationSectionMessage, title: metaData['empty-information-section-message'].title },
  { Component: EmptySuccessSectionMessage, title: metaData['empty-success-section-message'].title },
  { Component: EmptyWarningSectionMessage, title: metaData['empty-warning-section-message'].title },
  { Component: EmptySubtleSectionMessage, title: metaData['empty-subtle-section-message'].title },
  { Component: TitleErrorSectionMessage, title: metaData['title-error-section-message'].title },
  { Component: TitleInformationSectionMessage, title: metaData['title-information-section-message'].title },
  { Component: TitleSuccessSectionMessage, title: metaData['title-success-section-message'].title },
  { Component: TitleWarningSectionMessage, title: metaData['title-warning-section-message'].title },
  { Component: TitleSubtleSectionMessage, title: metaData['title-subtle-section-message'].title },
  { Component: PersistentErrorSectionMessage, title: metaData['persistent-error-section-message'].title },
  { Component: PersistentInformationSectionMessage, title: metaData['persistent-information-section-message'].title },
  { Component: PersistentSuccessSectionMessage, title: metaData['persistent-success-section-message'].title },
  { Component: PersistentWarningSectionMessage, title: metaData['persistent-warning-section-message'].title },
  { Component: PersistentSubtleSectionMessage, title: metaData['persistent-subtle-section-message'].title },
  { Component: ButtonErrorSectionMessage, title: metaData['button-error-section-message'].title },
  { Component: ButtonInformationSectionMessage, title: metaData['button-information-section-message'].title },
  { Component: ButtonSuccessSectionMessage, title: metaData['button-success-section-message'].title },
  { Component: ButtonWarningSectionMessage, title: metaData['button-warning-section-message'].title },
  { Component: ButtonSubtleSectionMessage, title: metaData['button-subtle-section-message'].title },
  { Component: LinkErrorSectionMessage, title: metaData['link-error-section-message'].title },
  { Component: LinkInformationSectionMessage, title: metaData['link-information-section-message'].title },
  { Component: LinkSuccessSectionMessage, title: metaData['link-success-section-message'].title },
  { Component: LinkWarningSectionMessage, title: metaData['link-warning-section-message'].title },
  { Component: LinkSubtleSectionMessage, title: metaData['link-subtle-section-message'].title },
];

describe('Section message examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
