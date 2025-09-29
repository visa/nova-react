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
import { VisaChevronDownTiny, VisaChevronRightTiny, VisaMaximizeTiny } from '@visa/nova-icons-react';
import {
  Accordion,
  AccordionHeading,
  AccordionPanel,
  AccordionToggleIcon,
  Badge,
  Button,
  ProgressLinear,
  Typography,
  Utility,
  UtilityFragment,
  UseAccordion as useAccordion,
} from '@visa/nova-react';
import { noCase } from 'change-case';
import cn from 'clsx';
import { ElementType, FC, MutableRefObject, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Paths } from '../../routes/paths';
import { DocType, ExampleMetaData } from '../../types';
import Styles from './styles.module.scss';

const LazyCode = lazy(() => import('../code'));

const fetchExampleCode = async (docType: string, docName: string, fileName: string) => {
  const importResult = await import(`../../examples/${docType}/${docName}/${fileName}.tsx?raw`);
  return importResult.default.toString();
};

const fetchExample = async (docType: string, docName: string, exampleName: string): Promise<FC> => {
  const mod = await import(`../../examples/${docType}/${docName}/${exampleName}.tsx`);
  // prefer default export if available and is a function/component
  if (mod.default) return mod.default as FC;
  // fallback to the first named export
  const values = Object.values(mod).filter(Boolean) as FC[];
  if (values.length === 0) {
    throw new Error('No exports found in the example module');
  }
  return values[0];
};

type ExampleProps = {
  docName?: string;
  docType: DocType;
  headerTag?: string;
  metaData: ExampleMetaData;
  showTitleAsLink?: boolean;
  ref?: MutableRefObject<HTMLButtonElement | null> | undefined;
};

const Example = ({
  docName = '',
  docType = 'components',
  headerTag = 'headerTag',
  metaData,
  showTitleAsLink = true,
  ref,
}: ExampleProps) => {
  const { isIndexExpanded, toggleIndexExpanded } = useAccordion();
  const codeExpanded = isIndexExpanded(0);

  const results = useQueries({
    queries: [
      {
        queryFn: () => fetchExample(docType, docName, metaData.id || ''),
        queryKey: [`${docType}-${docName}-${metaData.id}`],
      },
      {
        enabled: codeExpanded,
        queryFn: () => fetchExampleCode(docType, docName, metaData.id || ''),
        queryKey: [`${docType}-${docName}-${metaData.id}-code`],
      },
    ],
  });

  const [exampleResults, codeResults] = results;

  const ExampleComponent: FC = exampleResults.data ? exampleResults.data : () => <ProgressLinear />;

  const code =
    (codeResults.isError && 'Error loading code') || (codeResults.isPending && 'Loading code') || codeResults.data;
  const exampleContent = (exampleResults.isError && "Error loading example :'(") || <ExampleComponent />;
  const linkId = `v-example-${docType}-${docName}-${metaData.id}`;
  const modificationDateFormatted = new Date(metaData.dateModified || '').toLocaleDateString();
  const rawExamplePath = Paths.rawExample(docType, docName, metaData.id);
  const { alternate = false, custom = false, docs = false, isShared, isSubComponent, ...remainingTags } = metaData.tags || {};
  const iframed = metaData.iframe;

  return (<>
    {!isShared && !isSubComponent && (<div className={Styles.example}>
      <Utility vFlex vFlexRow vFlexWrap vJustifyContent="between" vGap={4} vAlignItems="center">
        <Typography className="v-p-4" id={linkId} tag={headerTag as ElementType} variant="headline-3">
          {metaData.title === "Default full page chat" ? "Default full-page chat" : metaData.title}
        </Typography>
        {showTitleAsLink && (
          <Button
            aria-label={`scroll to ${metaData.title}`}
            buttonSize="small"
            className={cn(Styles.hashLink, 'v-p-4')}
            colorScheme="tertiary"
            element={<Link to={Paths.documentationExample(docType, docName, metaData.id)} />}
            ref={ref}
            subtle
          >
            <Typography tag="span" variant="headline-3">
              #
            </Typography>
          </Button>
        )}
        <Utility vFlex vFlexGrow vGap={8} vJustifyContent="end">
          {docs && <Badge badgeType="neutral">#docs</Badge>}
          {alternate && <Badge badgeType="warning">#alternate</Badge>}
          {custom && <Badge badgeType="stable">#custom</Badge>}
          {Object.keys(remainingTags).length > 0 && (
            <Badge badgeType="subtle">
              {Object.entries(remainingTags).map(([key, value]) => (value === true ? key : `${key}: ${value}`))}
            </Badge>
          )}
        </Utility>
        <Button
          buttonSize="small"
          colorScheme="tertiary"
          element={
            <Link
              aria-label={`Report feedback example (internal only, opens in a new tab)`}
              to={Paths.ticketLink}
              rel="noopener noreferrer"
              target="_blank"
            />
          }
        >
          Report feedback (internal only)
          <VisaMaximizeTiny rtl />
        </Button>
        <Button
          colorScheme="tertiary"
          buttonSize="small"
          element={
            <Link
              aria-label={`View example of ${noCase(metaData.title || '')} (Opens in a new tab)`}
              rel="noopener noreferrer"
              target="_blank"
              to={rawExamplePath}
            >
              View example
              <VisaMaximizeTiny rtl />
            </Link>
          }
        />
      </Utility>
      {metaData.description && (
        <Utility vFlex vPaddingVertical={12}>
          {metaData.description}
        </Utility>
      )}
      {metaData.devNote && (
        <Utility vFlex vPaddingVertical={12}>
          {metaData.devNote}
        </Utility>
      )}

      <div
        className={cn(
          Styles.exampleContent,
          !iframed && Styles.exampleContentUnframed,
          !iframed && 'checkered-background'
        )}
      >
        {iframed ? (
          <iframe
            className={Styles.exampleContentFramed}
            src={Paths.base + rawExamplePath}
            title={`Interaction example for ${docType} example "${metaData.title}"`}
          />
        ) : (
          exampleContent
        )}
      </div>

      <Accordion className={Styles.exampleCode} id={`${metaData.id}-example-code-accordion`} tag="div">
        <AccordionHeading
          aria-controls={`${metaData.id}-example-code-accordion-panel`}
          aria-expanded={codeExpanded}
          aria-label={`Typescript of ${metaData.title}`}
          className="v-flex-wrap"
          buttonSize="large"
          colorScheme="secondary"
          id={`${metaData.id}-example-code-accordion-header`}
          onClick={() => toggleIndexExpanded(0)}
          tag="button"
        >
          <AccordionToggleIcon
            accordionOpen={codeExpanded}
            elementClosed={<VisaChevronRightTiny rtl />}
            elementOpen={<VisaChevronDownTiny />}
          />
          TypeScript
          <UtilityFragment vFlex vMarginLeft="auto">
            <Badge badgeType={metaData.testAvg === 100 ? 'stable' : 'neutral'} tag="span">
              {metaData.testAvg}% test coverage
            </Badge>
          </UtilityFragment>
        </AccordionHeading>

        <AccordionPanel
          aria-hidden={!codeExpanded}
          className="v-px-0 v-py-0"
          id={`${metaData.id}-example-code-accordion-panel`}
        >
          <Suspense fallback={<></>}>
            <LazyCode
              className={Styles.codePanelSnippet}
              code={code}
              docName={docName}
              exampleName={metaData.title}
              inPanel
            />
          </Suspense>
        </AccordionPanel>
      </Accordion>
      <Utility vMarginTop={10} vPaddingLeft={2}>
        <Typography colorScheme="subtle" tag="span" variant="label">
          Last modified: {modificationDateFormatted}
        </Typography>
      </Utility>
    </div>)}
  </>);
};

export default Example;
