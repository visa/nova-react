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
import { lazy } from 'react';
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

interface RouterFutureOptions {
  v7_relativeSplatPath?: boolean;
  v7_fetcherPersist?: boolean;
  v7_normalizeFormMethod?: boolean;
  v7_partialHydration?: boolean;
  v7_skipActionErrorRevalidation?: boolean;
}

interface RouterProviderFutureOptions {
  v7_relativeSplatPath?: boolean;
  v7_startTransition?: boolean;
}

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
              <Home />
            }
            path={Paths.root}
          />
          <Route
            element={
              <Sitemap />
            }
            path={Paths.sitemap}
          />
          <Route
            element={
              <Changelog />
            }
            path={Paths.changeLog}
          />
          <Route
            element={
              <Resources />
            }
            path={Paths.resources}
          />
          <Route
            element={
              <Components />
            }
            path={Paths.components}
          />
          <Route
            element={
              <ExampleLayout />
            }
          >
            <Route
              element={
                <DocsTemplate />
              }
              path={Paths.documentationPage()}
            />
            <Route
              element={
                <DocsTemplate />
              }
              path={Paths.documentationExample()}
            />
            <Route
              element={
                <DocsTemplate />
              }
              path={Paths.documentationApi()}
            />
          </Route>
          <Route
            element={
              <HooksTemplate />
            }
            path={Paths.documentationPage('hooks')}
          />
          <Route
            element={
              <PageNotFound />
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
    {
      basename: Paths.base,
      future: {
        v7_fetcherPersist: false,
        v7_normalizeFormMethod: false,
        v7_partialHydration: false,
        v7_skipActionErrorRevalidation: false,
      } as RouterFutureOptions,
    }
  );

  return (
    <RouterProvider
      router={router}
      fallbackElement={<VSuspense />}
      future={
        {
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        } as RouterProviderFutureOptions
      }
    />
  );
};

Routing.displayName = 'Routing';

export default Routing;
export { default as Paths } from './paths';
