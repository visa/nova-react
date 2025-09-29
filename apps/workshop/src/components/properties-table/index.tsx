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
import { useQuery } from '@tanstack/react-query';
import { VisaChevronDownTiny, VisaChevronRightTiny } from '@visa/nova-icons-react';
import {
  Accordion,
  AccordionHeading,
  AccordionPanel,
  AccordionToggleIcon,
  Badge,
  ScreenReader,
  Table,
  TableWrapper,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Typography,
  Utility,
  UtilityFragment,
  Link as VLink,
} from '@visa/nova-react';
import { noCase, kebabCase } from 'change-case';
import { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paths } from '../../routes';
import { LibMetaData, LibPropType } from '../../types';

const LazyCode = lazy(() => import('../../components/code'));

const fetchSource = async (docName: string): Promise<string> =>
  (await import(`../../../node_modules/@visa/nova-react/${docName}/index.ts?raw`)).default;

const fetchHookSource = async (docName: string): Promise<string> =>
  (await import(`../../../node_modules/@visa/nova-react/${docName}/index.tsx?raw`)).default;

type PropertiesTableProperties = {
  docName: string;
  isParamType?: boolean;
  isReturnType?: boolean;
  metaData?: Partial<LibMetaData>;
  properties?: LibPropType[];
  showTableOnly?: boolean;
};

const PropertiesTable = ({
  docName,
  isParamType = false,
  isReturnType = false,
  metaData = {},
  properties = [],
  showTableOnly = false,
}: PropertiesTableProperties) => {
  const isHook = docName.startsWith('use');
  const paramDocName = kebabCase(docName);

  const [codeExpanded, setCodeExpanded] = useState(false);

  const {
    data: code,
    isError,
    isPending,
  } = useQuery({
    enabled: codeExpanded,
    queryKey: [`api-${docName}-source`],
    queryFn: () => (isHook ? fetchSource(paramDocName) : fetchHookSource(paramDocName)),
  });

  const modificationDateFormatted = new Date(metaData.dateModified || '').toLocaleDateString();

  if (metaData.noComponent) return <></>;

  return (
    <div>
      {!showTableOnly && docName && (
        <div className="v-flex v-justify-content-between v-align-items-center v-pb-8 v-gap-8">
          <div className="v-flex v-flex-row v-gap-8 v-align-items-center">
            <Typography
              style={metaData.deprecated ? { textDecoration: 'line-through' } : undefined}
              tag="span"
              variant="headline-3"
            >
              <code aria-label={`${docName} ${isHook ? 'hook' : 'component'}`}>
                {isHook ? `${docName}()` : `<${docName} />`}
              </code>
            </Typography>
          </div>
        </div>
      )}

      {!showTableOnly && metaData.deprecated && (
        <UtilityFragment vMarginBottom={12} vMarginLeft={6} vMarginTop={2}>
          <Typography colorScheme="subtle" variant="label-large">
            <b>Deprecation warning:</b> {metaData.deprecated}
          </Typography>
        </UtilityFragment>
      )}

      {!showTableOnly && metaData.description && (
        <UtilityFragment vMarginBottom={12} vMarginLeft={6} vMarginTop={2}>
          <Typography variant="label-large">{metaData.description}</Typography>
        </UtilityFragment>
      )}

      {!properties.length && !Array.isArray(properties) && <Typography variant="body-1">No properties</Typography>}

      {!!properties.length && !Array.isArray(properties) && (
        <Typography tag="code" variant="body-1">
          {properties}
        </Typography>
      )}

      {!!properties.length && Array.isArray(properties) && (
        <TableWrapper>
          <Table alternate borderBlock border>
            <ScreenReader tag="caption">{`${docName} API properties. The name of the property is in column 1, the types of the value accepted are in column 2, the default value of that property is in column 3, whether it is required are in column 4, and the description of the property is in column 5.`}</ScreenReader>
            <Thead>
              <Tr>
                <Th scope="col">{isParamType ? 'Parameter' : 'Property'}</Th>
                {isParamType && <Th scope="col">Name</Th>}
                <Th scope="col">Type</Th>
                {!isReturnType && <Th scope="col">Default</Th>}
                {!isReturnType && <Th scope="col">Required</Th>}
                <Th scope="col">Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {properties.map((prop, index) => (
                <Tr key={`property-table-row-${prop.name}`}>
                  {isParamType && <Td>{index + 1}</Td>}
                  <Td>{prop.name}</Td>
                  <Td>
                    <Typography variant="label-large-active">
                      {prop.type?.replace(/<.*$/, '')?.replace(/\|/gi, ',')}
                    </Typography>
                  </Td>
                  {!isReturnType && <Td>{prop.defaultValue?.toString() || ''}</Td>}
                  {!isReturnType && <Td>{prop.required && 'yes'}</Td>}
                  <Td>{prop.description || ''}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableWrapper>
      )}
      {!showTableOnly && (
        <Accordion id={`${docName}-example-code-accordion`} className="v-mt-8" tag="div">
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
            <AccordionToggleIcon
              accordionOpen={codeExpanded}
              elementClosed={<VisaChevronRightTiny rtl />}
              elementOpen={<VisaChevronDownTiny />}
            />
            TypeScript
            <UtilityFragment vMarginLeft="auto">
              <Badge badgeType={metaData.testAvg === 100 ? 'stable' : 'neutral'} className="v-ml-auto" tag="span">
                {metaData.testAvg}% test coverage
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
                code={(isError && 'Error loading code') || (isPending && 'Loading code...') || code || ''}
                docName={docName}
                exampleName={noCase(docName)}
                inPanel
              />
            </Suspense>
          </AccordionPanel>
        </Accordion>
      )}
      {!showTableOnly && isHook && docName && (
        <UtilityFragment vMarginLeft={3} vMarginTop={12}>
          <VLink element={<Link to={Paths.documentationPage('hooks', paramDocName)} />} noUnderline>
            See hook API <VisaChevronRightTiny rtl />
          </VLink>
        </UtilityFragment>
      )}
      {!showTableOnly && metaData.dateModified && (
        <Utility vMarginLeft={2} vMarginTop={8}>
          <Typography colorScheme="subtle" tag="span" variant="label">
            Last modified: {modificationDateFormatted}
          </Typography>
        </Utility>
      )}
    </div>
  );
};

PropertiesTable.displayName = 'PropertiesTable';

export default PropertiesTable;
