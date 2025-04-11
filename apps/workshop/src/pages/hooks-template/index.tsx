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
import { useQueries } from '@tanstack/react-query';
import { VisaLinkTiny } from '@visa/nova-icons-react';
import {
  Accordion,
  AccordionHeading,
  AccordionPanel,
  AccordionToggleIcon,
  Badge,
  Typography,
  Utility,
  UtilityFragment,
  Link as VLink,
} from '@visa/nova-react';
import { camelCase, capitalCase, noCase } from 'change-case';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Example from '../../components/example';
import { PageContent, PageHeader, PageTitle } from '../../components/page';
import PropertiesTable from '../../components/properties-table';
import VSuspense from '../../components/v-suspense';
import { Paths } from '../../routes/paths';
import { DocType, ExampleIndex, ExampleMetaData, LibMetaData } from '../../types';

const LazyCode = lazy(() => import('../../components/code'));

const fetchSource = async (docName: string): Promise<string> =>
  (await import(`../../../node_modules/@visa/nova-react/${docName}/index.ts?raw`)).default;
const fetchMetaData = async (docName: string): Promise<LibMetaData> =>
  (await import(`../../../node_modules/@visa/nova-react/${docName}/meta.json`)).default;
const fetchExamplesMetaData = async (docType: string, docName: string): Promise<Record<string, ExampleMetaData>> =>
  (await import(`../../examples/${docType}/${docName}/meta.json`)).default;
const fetchExamplesIndex = async (docType: string, docName: string): Promise<ExampleIndex[]> =>
  (await import(`../../examples/${docType}/${docName}/index.tsx`)).default;

const HooksTemplate = () => {
  const { docName = '', docType = 'hooks' } = useParams();
  const { pathname } = useLocation();

  const [codeExpanded, setCodeExpanded] = useState(false);

  const results = useQueries({
    queries: [
      { queryKey: [`hook-${docName}-examples-meta-data`], queryFn: () => fetchExamplesMetaData(docType, docName) },
      { queryKey: [`hook-${docName}-meta-data`], queryFn: () => fetchMetaData(docName) },
      { queryKey: [`hook-${docName}-index`], queryFn: () => fetchExamplesIndex(docType, docName) },
      {
        enabled: codeExpanded,
        queryKey: [`hook-${docName}-source`],
        queryFn: () => fetchSource(docName),
      },
    ],
  });
  const [examplesMetaData, metaData, exampleIndex, code] = results;

  useEffect(() => {
    setCodeExpanded(false);
  }, [pathname]);

  if (results.slice(0, -1).some(result => result.isPending)) return <VSuspense />;
  if (results.slice(0, -1).some(result => result.isError)) return <p>Error loading hook docs :'(</p>;

  // const commitLink = Paths.commitLinkLib({ commitId: metaData.data?.commit, docName, isHook: true });
  const modificationDateFormatted = new Date(metaData.data?.dateModified || '').toLocaleDateString();

  return (
    <>
      <PageHeader>
        <PageTitle>{camelCase(docName)}</PageTitle>
      </PageHeader>
      <PageContent>
        <Utility vFlex vFlexCol vGap={32}>
          <div>
            <UtilityFragment vPaddingBottom={12}>
              <Typography tag="h2" variant="headline-2">
                Description
              </Typography>
            </UtilityFragment>
            <p>{metaData.data?.description}</p>
          </div>
          {metaData.data?.devNote && (
            <div>
              <UtilityFragment vPaddingBottom={12}>
                <Typography tag="h3" variant="headline-3">
                  Note
                </Typography>
              </UtilityFragment>
              <p>{metaData.data?.devNote}</p>
            </div>
          )}
          <div>
            {exampleIndex.data?.map(contentData => {
              if (!contentData.type || contentData.type === 'example') {
                const { id } = contentData;
                return (
                  <Example
                    docName={docName}
                    docType={docType as DocType}
                    key={`${docName}-example-${id}}`}
                    metaData={(examplesMetaData.data && examplesMetaData.data[id]) || {}}
                    showTitleAsLink={false}
                  />
                );
              }
              if (contentData.type === 'content') {
                const { component, id } = contentData;
                return (
                  <div className="v-pt-12" key={`${docName}-content-${id}`}>
                    {component}
                  </div>
                );
              }
              if (contentData.type === 'section') {
                const { id, title } = contentData;
                return (
                  <Typography className="v-pt-24" key={`${docName}-content-${id}`} tag="h3" variant="headline-3">
                    {title}
                  </Typography>
                );
              }
            })}
          </div>
          <Utility vFlex vFlexCol vGap={16}>
            <Typography tag="h2" variant="headline-2">
              {metaData.data?.params ? 'Parameters' : 'Properties'}
            </Typography>
            <PropertiesTable
              docName={docName}
              isParamType={!!metaData.data?.params}
              properties={metaData.data?.params || metaData.data?.props}
              showTableOnly={true}
            />
          </Utility>
          <Utility vFlex vFlexCol vGap={16}>
            <Typography tag="h2" variant="headline-2">
              Returns
            </Typography>
            <PropertiesTable
              docName={docName}
              isReturnType={true}
              properties={metaData.data?.returnType}
              showTableOnly={true}
            />
          </Utility>
          {metaData.data?.clientSideOnly && (
            <Utility vFlex vFlexCol vGap={16}>
              <Typography tag="h2" variant="headline-2">
                Client side only: <Typography tag="code">{metaData.data?.clientSideOnly.toString()}</Typography>
              </Typography>
            </Utility>
          )}
          <Utility vFlex vFlexCol vGap={16}>
            <Typography tag="h2" variant="headline-2">
              Source Code
            </Typography>

            <Accordion id={`${docName}-example-code-accordion`} tag="div">
              <AccordionHeading
                aria-controls={`${docName}-example-code-accordion-panel`}
                aria-expanded={codeExpanded}
                aria-label={`Typescript of ${noCase(docName)}`}
                buttonSize="large"
                className="v-flex-wrap"
                colorScheme="secondary"
                id={`${docName}-example-code-accordion-header`}
                onClick={() => setCodeExpanded(!codeExpanded)}
                tag="button"
              >
                <AccordionToggleIcon accordionOpen={codeExpanded} />
                TypeScript
                <UtilityFragment vMarginLeft="auto">
                  <Badge
                    badgeType={metaData.data?.testAvg === 100 ? 'stable' : 'neutral'}
                    className="v-flex"
                    tag="span"
                  >
                    {metaData.data?.testAvg}% test coverage
                  </Badge>
                </UtilityFragment>
              </AccordionHeading>
              <AccordionPanel
                aria-hidden={!codeExpanded}
                id={`${docName}-example-code-accordion-panel`}
                className="v-px-0 v-py-0"
              >
                <Suspense fallback={<></>}>
                  <LazyCode
                    code={
                      (code.isError && 'Error loading code') || (code.isPending && 'Loading code...') || code.data || ''
                    }
                    docName={docName}
                    exampleName={noCase(docName)}
                    inPanel
                  />
                </Suspense>
              </AccordionPanel>
            </Accordion>
            <Utility vMarginLeft={4}>
              <Typography colorScheme="subtle" tag="span" variant="label">
                Last modified: {modificationDateFormatted}
              </Typography>
            </Utility>
          </Utility>
          {metaData.data?.related && (
            <Utility vFlex vFlexCol vGap={16}>
              <Typography tag="h2" variant="headline-2">
                See also
              </Typography>
              <Utility vFlex vFlexCol vGap={4} tag="ul">
                {metaData.data.related.map(related => (
                  <li key={`hooks-see-also-link-${related}`}>
                    <VLink element={<Link to={Paths.documentationPage('components', related)} />} noUnderline>
                      <VisaLinkTiny />
                      {capitalCase(related)}
                    </VLink>
                  </li>
                ))}
              </Utility>
            </Utility>
          )}
        </Utility>
      </PageContent>
    </>
  );
};

export default HooksTemplate;
