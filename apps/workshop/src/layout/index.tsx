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
import { Link } from '@visa/nova-react';
import { capitalCase } from 'change-case';
import cn from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useTheme, VersionsProvider } from '../providers';
import SiteFooter from './components/footer';
import SiteHeader from './components/header';
import SiteNav from './components/nav';
import Styles from './styles.module.scss';

const helmetData = new HelmetData({});

const Layout = () => {
  const { darkMode } = useTheme();
  const location = useLocation();
  const { exampleName } = useParams();

  const layoutRef = useRef<HTMLDivElement>(null);

  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const pathName = location.pathname.split('/');
    if (pathName.length > 2)
      setPageTitle(
        pathName
          .slice(2, 3)
          .map(urlLocation => capitalCase(urlLocation))
          .join(' | ')
      );
    else if (pathName[pathName.length - 1] === 'components') setPageTitle('Components');
    else setPageTitle('Workshop');
  }, [location]);

  // On page change
  useEffect(() => {
    // Scroll to the top except when exampleName param provided
    if (!exampleName) layoutRef.current?.scrollTo(0, 0);
  }, [exampleName, location.pathname]);

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>{pageTitle + ' | React | Visa Product Design System'}</title>
      </Helmet>
      <VersionsProvider>
        <div className={cn(Styles.layout, darkMode && 'dark-mode')}>
          <div className={Styles.skipToContent}>
            <Link href="#content">Skip to content</Link>
          </div>
          <div className={Styles.layoutHeader}>
            <SiteHeader />
          </div>
          <nav aria-label="site" className={Styles.layoutNav}>
            <SiteNav />
          </nav>
          <div className={Styles.layoutContent} ref={layoutRef}>
            <main id="content" className={Styles.layoutMain}>
              <Outlet />
            </main>
            <SiteFooter />
          </div>
        </div>
      </VersionsProvider>
    </>
  );
};

export default Layout;
