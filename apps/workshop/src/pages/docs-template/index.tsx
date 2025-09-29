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
import { Typography, Utility } from '@visa/nova-react';
import cn from 'clsx';
import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Example from '../../components/example';
import ExamplesDirectory from '../../components/examples-directory';
import VSuspense from '../../components/v-suspense';
import { DocType, ExampleIndex, ExampleMetaData } from '../../types';
import Styles from './styles.module.scss';

const fetchExamplesMetaData = async (docType: string, docName: string): Promise<Record<string, ExampleMetaData>> =>
  (await import(`../../examples/${docType}/${docName}/meta.json`)).default;
const fetchExamplesIndex = async (docType: string, docName: string): Promise<ExampleIndex[]> =>
  (await import(`../../examples/${docType}/${docName}/index.tsx`)).default;

const DocsTemplate = () => {
  const { hash: exampleParam = '#' } = useLocation();
  const { docName = '', docType = '' } = useParams();
  const exampleRef = useRef<HTMLButtonElement | null>(null);

  const results = useQueries({
    queries: [
      { queryKey: [`hook-${docName}-examples-meta-data`], queryFn: () => fetchExamplesMetaData(docType, docName) },
      { queryKey: [`hook-${docName}-index`], queryFn: () => fetchExamplesIndex(docType, docName) },
    ],
  });
  const [examplesMetaData, exampleIndex] = results;

  const selectedExampleId = exampleParam.slice(1);

  const onScrollToExample = () => {
    exampleRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
    exampleRef.current?.focus({ preventScroll: true });
  };

  // Scroll to url example on page load
  useEffect(() => {
    onScrollToExample();
  }, [exampleParam, results]);

  if (results.some(query => query.isPending)) return <VSuspense />;
  if (results.some(query => query.isError)) return <p>Error loading examples :'(</p>;

  return (
    <div className={cn(Styles.examplesContent, 'v-gap-24')}>
      <div className={Styles.examplesDirectory}>
        <ExamplesDirectory
          docName={docName}
          docType={docType as DocType}
          exampleIndex={exampleIndex?.data || []}
          exampleMetaData={examplesMetaData?.data || {}}
          onScrollToExample={onScrollToExample}
        />
      </div>
      <div className={Styles.examplesList}>
        {exampleIndex.data?.map(contentData => {
          if (!contentData.type || contentData.type === 'example') {
            const { id } = contentData;
            return (
              <Example
                docName={docName}
                docType={docType as DocType}
                key={`${docName}-example-${id}}`}
                metaData={(examplesMetaData.data && examplesMetaData.data[id]) || {}}
                showTitleAsLink={true}
                ref={id === selectedExampleId ? exampleRef : undefined}
                headerTag={contentData?.headerTag ? contentData.headerTag : 'h3'}
              />
            );
          }
          if (contentData.type === 'content') {
            const { component, id } = contentData;
            return <div key={`${docName}-content-${id}`}>{component}</div>;
          }
          if (contentData.type === 'section') {
            const { id, title } = contentData;
            return (
              <Utility key={`${docName}-section-${id}`} vMarginTop={48}>
                <Typography tag="h2" variant="headline-2">
                  {title}
                </Typography>
              </Utility>
            );
          }
        })}
      </div>
    </div>
  );
};

export default DocsTemplate;
