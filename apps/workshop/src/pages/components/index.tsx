/**
 *              Copyright (c) 2025 Visa, Inc.
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
import { VisaChevronLinkTiny, VisaCloseTiny, VisaSearchLow } from '@visa/nova-icons-react';
import {
  Button,
  ContentCard,
  ContentCardBody,
  ContentCardImage,
  ContentCardTitle,
  Input,
  InputContainer,
  Label,
  Typography,
  Utility,
} from '@visa/nova-react';
import { capitalCase } from 'change-case';
import { lazy, Suspense, useMemo, useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import { NavLink } from 'react-router-dom';
import { PageContent, PageHeader, PageTitle } from '../../components/page';
import meta from '../../examples/meta.json';
import { Paths } from '../../routes/paths';
import Styles from './styles.module.scss';
import { GA_TRACKING_ID } from '../../constants';

ReactGA.initialize(GA_TRACKING_ID);

const components = meta.components;

const Components = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState('');

  const clearValue = () => {
    setFilter('');
    inputRef?.current?.focus();
  };

  const filteredComponents = useMemo(() => {
    if (!filter) {
      return components;
    }

    return components.filter(component => {
      return component.toLowerCase().split('-').join(' ').includes(filter.toLowerCase());
    });
  }, [filter]);

  return (
    <>
      <PageHeader>
        <PageTitle>Components</PageTitle>
      </PageHeader>
      <PageContent centered={true}>
        <Utility vFlex vFlexCol vGap="6" vMarginBottom={36}>
          <Label htmlFor="search-component">Search Components</Label>
          <Utility element={<InputContainer />} vPaddingBottom={2}>
            <VisaSearchLow />
            <Input
              id="search-component"
              type="text"
              value={filter}
              onChange={e => setFilter(e.currentTarget.value)}
              ref={inputRef}
            />
            {filter && filter.length > 0 ? (
              <div className="v-flex v-align-items-center v-gap-4">
                <Button colorScheme="tertiary" iconButton={true} buttonSize="small" onClick={() => clearValue()}>
                  <VisaCloseTiny />
                </Button>
              </div>
            ) : null}
          </Utility>
        </Utility>

        <div className={Styles.componentsTable}>
          {filteredComponents.length > 0 ? (
            filteredComponents.map((component, i) => {
              const LazyImg = lazy(() => import(`../../examples/components/${component}/thumbnail.svg`));
              return (
                <ContentCard key={i} clickable={true}>
                  <NavLink to={Paths.documentationPage('components', component)} className="v-link-no-underline">
                    <ContentCardImage className={Styles.contentCardImg}>
                      <Suspense fallback={<></>}>
                        <LazyImg />
                      </Suspense>
                      {/* <img alt={`Thumbnail for the ${component} component`} loading="lazy" src={imageUrl} /> */}
                    </ContentCardImage>
                    <ContentCardBody>
                      <ContentCardTitle tag="h2" variant="headline-4">
                        {capitalCase(component)}
                        <VisaChevronLinkTiny />
                      </ContentCardTitle>
                      {/* <Badge type={component['v-react-wcag'] === 'WCAG 2.0' ? 'neutral' : 'stable'}>{component['v-react-wcag']}</Badge> */}
                    </ContentCardBody>
                  </NavLink>
                </ContentCard>
              );
            })
          ) : (
            <Typography variant="label-large">No component found.</Typography>
          )}
        </div>
      </PageContent>
    </>
  );
};

export default Components;
