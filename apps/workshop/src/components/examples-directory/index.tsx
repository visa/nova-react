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
import { AnchorLinkMenu, AnchorLinkMenuHeader, Typography, Link as VLink } from '@visa/nova-react';
import { kebabCase } from 'change-case';
import { Link } from 'react-router-dom';
import useVisibleId from '../../hooks/use-visible-id';
import { Paths } from '../../routes/paths';
import { DocType, ExampleIndex, ExampleMetaData } from '../../types';

type ExamplesDirectoryProps = {
  docName: string;
  docType: DocType;
  exampleIndex: ExampleIndex[];
  exampleMetaData: Record<string, ExampleMetaData>;
  onScrollToExample: (exampleId: string) => void;
};

const ExamplesDirectory = ({
  docName,
  docType,
  exampleIndex,
  exampleMetaData,
  onScrollToExample,
}: ExamplesDirectoryProps) => {
  const { visibleId } = useVisibleId({
    idPrefix: 'v-example',
  });

  const examples = exampleIndex.filter(({ type = 'example' }) => type === 'example') as { id: string }[];

  if (!examples.length) return <></>;

  return (
    <AnchorLinkMenu aria-labelledby="example-anchor-link-menu-header" tag="nav">
      <section
        style={{
          maxBlockSize: '85dvh',
          overflowY: 'auto',
          padding: 'calc(var(--theme-focus-outline-offset, 0px) + 1px)',
        }}
      >
        <AnchorLinkMenuHeader>
          <Typography id="example-anchor-link-menu-header" tag="h2" variant="overline">
            On this page
          </Typography>
        </AnchorLinkMenuHeader>
        <ul>
          {examples.map(({ id }) => {
            const title = exampleMetaData[id]?.title || '';
            const tags = exampleMetaData[id]?.tags
            
            if (tags?.isShared || tags?.isSubComponent) return null;

            return (
              <li key={`${docName}-example-${kebabCase(title)}-anchor`}>
                <VLink
                  aria-current={visibleId === `v-example-${docType}-${docName}-${title}`}
                  element={<Link to={Paths.documentationExample(docType, docName, id)} />}
                  onClick={() => onScrollToExample(id)}
                  noUnderline
                >
                  {title}
                </VLink>
              </li>
            );
          })}
        </ul>
      </section>
    </AnchorLinkMenu>
  );
};

export default ExamplesDirectory;
