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
import libPackageJson from '@visa/nova-react/package.json';
import docsPackageJson from '../../package.json';
import { Paths } from '../routes/paths';

const devMode = import.meta.env.DEV;
const prodMode = import.meta.env.PROD;
const version = import.meta.env.VERSION || '';

const UseDocContext = () => ({
  basename: Paths.base,
  docsPackageJson,
  devMode,
  libraryPackageJson: libPackageJson,
  prodMode,
  version,
});

export default UseDocContext;
