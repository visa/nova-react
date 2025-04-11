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
import { PageContent, PageHeader, PageTitle } from '../../components/page';
import meta from '../../examples/meta.json';
import { Link as VLink, Typography, Utility, UtilityFragment } from '@visa/nova-react';
import { Link } from 'react-router-dom';
import { Paths } from '../../routes/paths';

const components = meta.components;
const hooks = meta.hooks;
const utilities = meta.utilities;

const kebabToSentenceCase = (kebabName: string) => {
  return kebabName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const kebabToCamelCase = (kebabName: string) => {
  return kebabName
    .split('-')
    .map((word, i) => {
      if (i === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
};

const allLinks = [
  { name: 'Intro', destination: '/' },
  { name: 'Changelog', destination: Paths.changeLog },
  { name: 'Resources', destination: Paths.resources },
  {
    name: 'Utilities',
    children: utilities.map(u => ({
      name: kebabToSentenceCase(u),
      destination: Paths.documentationPage('utilities', u),
    })),
  },
  {
    name: 'Hooks',
    children: hooks.map(h => ({
      name: kebabToCamelCase(h),
      destination: Paths.documentationPage('hooks', h),
    })),
  },
  {
    name: 'Components',
    destination: Paths.components,
    children: components.map(c => ({
      name: kebabToSentenceCase(c),
      destination: Paths.documentationPage('components', c),
    })),
  },
];

const Sitemap = () => {
  return (
    <div>
      <PageHeader>
        <PageTitle>Sitemap</PageTitle>
      </PageHeader>
      <PageContent>
        <Utility vFlex vJustifyContent="between" vFlexWrap vGap={24}>
          {allLinks.map(resource => (
            <section key={resource.name}>
              <UtilityFragment vMarginBottom={16}>
                {resource.destination ? (
                  <Typography tag="h2">
                    <VLink element={<Link to={resource.destination} />}>
                      <Typography tag="span" variant="headline-2">
                        {resource.name}
                      </Typography>
                    </VLink>
                  </Typography>
                ) : (
                  <Typography tag="h2" variant="headline-2">
                    {resource.name}
                  </Typography>
                )}
              </UtilityFragment>
              {resource.children && (
                <UtilityFragment vFlex vFlexCol vGap={4}>
                  <ul>
                    {resource.children.map(child => (
                      <li key={child.name}>
                        <VLink element={<Link to={child.destination} />}>{child.name}</VLink>
                      </li>
                    ))}
                  </ul>
                </UtilityFragment>
              )}
            </section>
          ))}
        </Utility>
      </PageContent>
    </div>
  );
};

export default Sitemap;
