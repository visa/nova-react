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
import { useQueries, useQuery } from '@tanstack/react-query';
import { Utility } from '@visa/nova-react';
import { Suspense, lazy } from 'react';
import ReactGA from 'react-ga4';
import { useParams } from 'react-router-dom';
import VSuspense from '../../components/v-suspense';
import { LibMetaData } from '../../types';
import { GA_TRACKING_ID } from '../../constants';

const LazyPropsTable = lazy(() => import('../../components/properties-table'));

const fetchMetaData = async (docName: string): Promise<LibMetaData> =>
  (await import(`../../../node_modules/@visa/nova-react/${docName}/meta.json`)).default;

ReactGA.initialize(GA_TRACKING_ID);

const ApiPage = () => {
  const { docName = '' } = useParams();

  const {
    data: metaData,
    isError,
    isPending,
  } = useQuery({
    queryKey: [docName, 'props'],
    queryFn: () => fetchMetaData(docName),
  });
  const relatedMetaDataResults = useQueries({
    queries: (metaData?.related || []).map(related => ({
      enabled: !!metaData?.related,
      queryKey: [docName, 'props', related],
      queryFn: () => fetchMetaData(related),
    })),
  });
  if (isPending || relatedMetaDataResults.some(data => data.isPending)) return <VSuspense />;
  if (isError || relatedMetaDataResults.some(data => data.isError)) return <p>API not found :'(</p>;

  const allMetaData = [metaData, ...relatedMetaDataResults.map(result => result.data)];

  return (
    <Suspense fallback={<VSuspense />}>
      <Utility vFlex vFlexCol vGap={48}>
        {allMetaData?.map((componentPackageJson, index) => (
          <LazyPropsTable
            docName={componentPackageJson?.displayName || ''}
            key={`props-table-${componentPackageJson?.displayName}-${index}`}
            metaData={componentPackageJson}
            properties={componentPackageJson?.props}
          />
        ))}
      </Utility>
    </Suspense>
  );
};

export default ApiPage;
