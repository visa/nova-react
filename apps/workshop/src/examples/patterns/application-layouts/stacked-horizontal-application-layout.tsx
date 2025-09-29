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
import { FooterLayout } from './shared/footer-layout';
import './styles-stacked.css';
import { StackedHorizontalNavLayout } from './stacked-horizontal-nav-layout';

export const StackedHorizontalApplicationLayout = () => {
  return (
    <>
      <div className="layout layout-example layout-stacked">
        <div className="layout-header">
          <StackedHorizontalNavLayout />
        </div>
        <div id="content" className="layout-content" tabIndex={-1}>
          <main className="layout-main">{/* <h1> and other content */}</main>
          <FooterLayout />
        </div>
      </div>
    </>
  );
};
