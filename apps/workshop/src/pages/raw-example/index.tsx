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
import '@visa/nova-styles/themes/visa-hybrid/index.css';
import cn from 'clsx';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Styles from './styles.module.scss';

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

const RawExample = () => {
  console.log('here');
  const { docName = '', docType = '', exampleName = '' } = useParams();
  const {
    data: Example,
    isError,
    isPending,
  } = useQuery({
    queryFn: () => fetchExample(docType, docName, exampleName),
    queryKey: [`${docType}-${docName}-${exampleName}-raw-example`],
  });

  const isPattern = docType === 'patterns';

  if (isError) return <h1>Error loading example :'(</h1>;
  if (isPending) return <h1>Loading...</h1>;
  if (!Example) return <h1>No examples found :(</h1>;

  console.log('example', Example);

  return (
    <div className={cn(isPattern ? 'patterns-background' : 'checkered-background', Styles.rawExampleContent)}>
      <Example />
    </div>
  );
};

export default RawExample;
