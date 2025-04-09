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
import { ReactNode } from 'react';

export type ExampleIndexType = 'content' | 'example' | 'section';

export type Tags = {
  alternate?: boolean;
  docs?: boolean;
  wcag?: string;
  vgar?: string;
} & Record<string, boolean | string>;

export type MetaData = {
  commit?: string;
  changeReason?: string;
  dateCreated?: string;
  dateModified?: string;
  description?: string;
  devNote?: string;
  testAvg?: number;
};

export type ExampleMetaData = MetaData & {
  file?: string;
  id?: string;
  iframe?: boolean;
  title?: string;
  tags?: Tags;
  headerTag?: string;
};

export type ExampleIndex = { description?: ReactNode } & (
  | ({ id: string; type?: 'example' } & ExampleMetaData)
  | {
      component: ReactNode;
      id: string;
      type: 'content';
    }
  | {
      id: string;
      title: string;
      type: 'section';
    }
);

export type ExamplesManifest = {
  components: string[];
  hooks: string[];
  stats: {
    components: number;
    examples: number;
    hooks: number;
  };
  testAvg: number;
  testSnapshots: number;
  testSuites: number;
  testsPassed: number;
  totalTests: number;
  utilities: string[];
};

export type LibMetaData = MetaData & {
  clientSideOnly?: boolean;
  deprecated?: string;
  displayName?: string;
  docs?: string;
  filePath?: string;
  gitLink?: string;
  noComponent?: boolean;
  params?: LibPropType[];
  props?: LibPropType[];
  related?: string[];
  returnType?: LibPropType[];
};

export type LibPropType = {
  defaultValue?: unknown;
  description?: string;
  name?: string;
  required?: boolean;
  type?: string;
};
