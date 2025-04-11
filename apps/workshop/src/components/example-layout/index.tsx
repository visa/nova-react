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
import { Button, Tab, Tabs, useTabs } from '@visa/nova-react';
import { sentenceCase } from 'change-case';
import ReactGA from 'react-ga4';
import { useParams } from 'react-router-dom';
import ApiPage from '../../pages/api';
import DocsTemplate from '../../pages/docs-template';
import { PageContent, PageHeader, PageTitle } from '../page';
import { GA_TRACKING_ID } from '../../constants';

ReactGA.initialize(GA_TRACKING_ID);

const ComponentLayout = () => {
  const { docName = '' } = useParams();
  const apiSelected = window.location.pathname.includes('api');
  const { getTabIndex, onIndexChange, onKeyNavigation, ref } = useTabs();

  return (
    <>
      <PageHeader>
        <PageTitle>{sentenceCase(docName)}</PageTitle>
        <Tabs onKeyDown={onKeyNavigation} role="tablist">
          <Tab role="none">
            <Button
              aria-selected={!apiSelected}
              colorScheme="tertiary"
              onClick={() => {
                onIndexChange(0);
                if (window.location.pathname.includes('api')) {
                  window.history.pushState({}, '', window.location.pathname.slice(0, -4));
                }
              }}
              ref={el => {
                ref.current[0] = el;
              }}
              role="tab"
              tabIndex={getTabIndex(0)}
            >
              Examples
            </Button>
          </Tab>
          <Tab role="none">
            <Button
              aria-selected={apiSelected}
              colorScheme="tertiary"
              onClick={() => {
                onIndexChange(1);
                if (!window.location.pathname.includes('api')) {
                  window.history.pushState({}, '', `${window.location.pathname}/api`);
                }
              }}
              ref={el => {
                ref.current[1] = el;
              }}
              role="tab"
              tabIndex={getTabIndex(1)}
            >
              API
            </Button>
          </Tab>
        </Tabs>
      </PageHeader>
      <PageContent>{apiSelected ? <ApiPage /> : <DocsTemplate />}</PageContent>
    </>
  );
};

export default ComponentLayout;
