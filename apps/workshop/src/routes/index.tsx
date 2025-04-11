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
import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import VSuspense from '../components/v-suspense';
import Paths from './paths';

const Changelog = lazy(() => import('../pages/change-log'));
const Sitemap = lazy(() => import('../pages/sitemap'));
const Components = lazy(() => import('../pages/components'));
const DocsTemplate = lazy(() => import('../pages/docs-template'));
const Home = lazy(() => import('../home'));
const HooksTemplate = lazy(() => import('../pages/hooks-template'));
const ExampleLayout = lazy(() => import('../components/example-layout'));
const PageNotFound = lazy(() => import('../pages/page-not-found'));
const Resources = lazy(() => import('../resources'));

const Routing = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          lazy={async () => ({
            Component: (await import('../layout')).default,
          })}
        >
          <Route
            element={
              <Suspense fallback={<VSuspense />}>
                <Home />
              </Suspense>
            }
            path={Paths.root}
          />
          <Route
            element={
              <Suspense fallback={<VSuspense />}>
                <Sitemap />
              </Suspense>
            }
            path={Paths.sitemap}
          />
          <Route
            element={
              <Suspense fallback={<VSuspense />}>
                <Changelog />
              </Suspense>
            }
            path={Paths.changeLog}
          />
          <Route
            element={
              <Suspense fallback={<VSuspense />}>
                <Resources />
              </Suspense>
            }
            path={Paths.resources}
          />
          <Route
            element={
              <Suspense fallback={<VSuspense />}>
                <Components />
              </Suspense>
            }
            path={Paths.components}
          />
          <Route
            element={
              <Suspense fallback={<VSuspense />}>
                <ExampleLayout />
              </Suspense>
            }
          >
            <Route
              element={
                <Suspense fallback={<VSuspense />}>
                  <DocsTemplate />
                </Suspense>
              }
              path={Paths.documentationPage()}
            />
            <Route
              element={
                <Suspense fallback={<VSuspense />}>
                  <DocsTemplate />
                </Suspense>
              }
              path={Paths.documentationExample()}
            />
            <Route
              element={
                <Suspense fallback={<VSuspense />}>
                  <DocsTemplate />
                </Suspense>
              }
              path={Paths.documentationApi()}
            />
          </Route>
          <Route
            element={
              <Suspense fallback={<VSuspense />}>
                <HooksTemplate />
              </Suspense>
            }
            path={Paths.documentationPage('hooks')}
          />
          <Route
            element={
              <Suspense fallback={<VSuspense />}>
                <PageNotFound />
              </Suspense>
            }
            path={Paths.unknown}
          />
        </Route>
        <Route
          path={Paths.rawExample()}
          lazy={async () => ({
            Component: (await import('../pages/raw-example')).default,
          })}
        />
        <Route
          path={Paths.rawExampleCode()}
          lazy={async () => ({
            Component: (await import('../pages/raw-code')).default,
          })}
        />
      </>
    ),
    { basename: Paths.base }
  );

  return <RouterProvider router={router} fallbackElement={<VSuspense />} />;
};

Routing.displayName = 'Routing';

export default Routing;
export { default as Paths } from './paths';
