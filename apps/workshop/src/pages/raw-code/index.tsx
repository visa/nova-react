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
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const fetchCode = async (docType: string, docName: string, exampleName: string): Promise<string> =>
  (await import(`../../examples/${docType}/${docName}/${exampleName}.tsx?raw`)).default;

const RawCode = () => {
  const { docName = '', docType = '', exampleName = '' } = useParams();

  const {
    data: code,
    isError,
    isPending,
  } = useQuery({
    queryFn: () => fetchCode(docType, docName, exampleName),
    queryKey: [`${docType}-${docName}-${exampleName}-raw-code`],
  });

  if (isError) return <h1>Error loading code :'(</h1>;
  if (isPending) return <h1>Loading...</h1>;
  if (!code) return <h1>No code found :(</h1>;
  return <pre>{code}</pre>;
};

export default RawCode;
