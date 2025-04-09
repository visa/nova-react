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
import { Typography } from '@visa/nova-react';
import clsx from 'clsx';
import { Fragment } from 'react';
import Styles from './styles.module.scss';

type DescriptiveListProps = {
  list: Record<string, number | string>;
};

const DescriptiveList = ({ list }: DescriptiveListProps) => {
  const keys = Object.keys(list);
  return (
    <dl className={clsx(Styles.dl, 'v-table-wrapper')}>
      {keys.map(key => (
        <Fragment key={key}>
          <Typography className={Styles.dt} tag="dt" variant="subtitle-3">
            {key}
          </Typography>
          <dd className={Styles.dd}>{list[key]}</dd>
        </Fragment>
      ))}
    </dl>
  );
};

export default DescriptiveList;
