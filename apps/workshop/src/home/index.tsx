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
import {
  VisaCodeForkAltTiny,
  VisaDeveloperHigh,
  VisaGuideLow,
  VisaMaximizeTiny,
  VisaTransitTrainHigh,
  VisaWrenchHigh,
} from '@visa/nova-icons-react';
import {
  Button,
  Divider,
  Link,
  SectionMessage,
  SectionMessageContent,
  SectionMessageIcon,
  Tab,
  Tabs,
  Typography,
} from '@visa/nova-react';
import cn from 'clsx';
import { FC, useState } from 'react';
import ReactGA from 'react-ga4';
import Code from '../components/code';
import PackageInstaller from '../components/package-installer';
import { PageContent, PageHeader } from '../components/page';
import { useDocContext } from '../hooks';
import { defaultPreferencesProp, useAuth, useTheme } from '../providers';
import Paths from '../routes/paths.ts';
import YourComponentRawJS from './components/examples/your-component.jsx?raw';
import YourComponent from './components/examples/your-component.tsx';
import YourComponentRawTS from './components/examples/your-component.tsx?raw';
import HomeHero from './components/hero';
import Styles from './styles.module.scss';
import { GA_TRACKING_ID } from '../constants.ts';

ReactGA.initialize(GA_TRACKING_ID);

const Index: FC = () => {
  const { preferences } = useTheme();
  const { user } = useAuth();
  const { version } = useDocContext();
  const [exampleLanguage, setExampleLanguage] = useState('tsx');

  const { themeKey } = preferences;

  return (
    <div className={Styles.home}>
      <PageHeader>
        <HomeHero />
      </PageHeader>
      <PageContent centered={true}>
        <section className="hover-card-group v-mt-36">
          <div className="hover-card">
            <VisaTransitTrainHigh rtl />
            <div className="v-mt-20">
              <Typography tag="h2" variant="headline-4">
                Light Weight
              </Typography>
              <Typography className="v-mt-8" colorScheme="subtle">
                We&apos;ve reduced our library to basic markup components and functional hooks for a lighter, simpler,
                and more flexible experience.
              </Typography>
            </div>
          </div>
          <div className="hover-card">
            <VisaWrenchHigh />
            <div className="v-mt-20">
              <Typography tag="h2" variant="headline-4">
                Building Blocks
              </Typography>
              <Typography className="v-mt-8" colorScheme="subtle">
                No more waiting on feature requests. We provide the building blocks for you to easily create and
                customize your own components.
              </Typography>
            </div>
          </div>
          <div className="hover-card">
            <VisaDeveloperHigh rtl />
            <div className="v-mt-20">
              <Typography tag="h2" variant="headline-4">
                For Developers
              </Typography>
              <Typography className="v-mt-8" colorScheme="subtle">
                Nova React is sleek and unobtrusive. Our beautifully designed components allow any developer to create
                stunning apps with ease.
              </Typography>
            </div>
          </div>
        </section>
        <section className={cn(Styles.homeGuide, 'v-flex v-flex-col v-gap-24 v-pt-24')} id="guide">
          <div className="v-flex v-align-items-center v-gap-16">
            <VisaGuideLow rtl />
            <Typography tag="h2" variant="headline-2">
              Quick Start Guide
            </Typography>
          </div>
          <Divider dividerType="decorative" className="v-mb-24" />
          <article className="v-flex v-flex-col v-gap-24 v-mb-24">
            <SectionMessage>
              <SectionMessageIcon />
              <SectionMessageContent>
                <Typography tag="h3" variant="body-2-bold">
                  Prerequisite - React 18
                </Typography>
                <Typography colorScheme="subtle" variant="body-2">
                  To avoid any compilation or runtime errors, make sure your project is using React 18 or higher. If
                  not, you can upgrade your project by following the{' '}
                  <Link
                    href="https://react.dev/blog/2022/03/08/react-18-upgrade-guide"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    official React documentation <VisaMaximizeTiny rtl />
                  </Link>
                  .
                </Typography>
              </SectionMessageContent>
            </SectionMessage>
          </article>
          <article className="v-flex v-flex-col v-gap-24 v-mb-24">
            <div className="v-flex v-flex-col v-gap-6">
              <Typography tag="h3" variant="headline-3">
                Step 1 – Installation
              </Typography>
              <Typography colorScheme="subtle" variant="body-1">
                First things first, install the library via Node or Yarn in your cli.
              </Typography>
            </div>
            <PackageInstaller packageName="@visa/nova-react" packageOfficialName="Nova react" version={version} />
          </article>
          <article className="v-flex v-flex-col v-gap-24 v-mb-24">
            <div className="v-flex v-flex-col v-gap-6">
              <Typography tag="h3" variant="headline-3">
                Step 2 – Import Nova Styles
              </Typography>
              <Typography colorScheme="subtle" variant="body-1">
                Next up, import the Nova Styles library and your desired theme above the root in your react project. The{' '}
                <code>{defaultPreferencesProp.themeKey}</code> theme is the default. To see all the available themes see
                the{' '}
                <Link
                  aria-label="themes docs (opens in new tab)"
                  href={Paths.themesDocs}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Typography tag="span" variant="body-1">
                    themes docs
                  </Typography>
                  <VisaMaximizeTiny />
                </Link>{' '}
                inside our styles workshop.
              </Typography>
            </div>
            <div className="hover-card v-gap-24">
              <div className="v-flex v-align-items-center v-gap-12">
                <VisaCodeForkAltTiny rtl />
                <Typography variant="subtitle-1">React Application</Typography>
              </div>
              <Code
                code={`import React from 'react';
import { createRoot } from 'react-dom/client';

// Import the styles:
import '@visa/nova-styles/styles.css';
// Import your desired theme${
                  themeKey !== defaultPreferencesProp.themeKey && themeKey !== 'none'
                    ? `. The default is '${defaultPreferencesProp.themeKey}' (your selected theme is currently '${themeKey}')`
                    : ''
                }:
import '@visa/nova-styles/themes/${
                  themeKey && themeKey !== 'none' ? themeKey : defaultPreferencesProp.themeKey
                }/index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`}
                exampleName="nova react import"
                language="tsx"
              />
            </div>
          </article>
          <article className="v-flex v-flex-col v-gap-24 v-mb-24">
            <div className="v-flex v-flex-col v-gap-6">
              <Typography tag="h3" variant="headline-3">
                Step 3 – Use the components
              </Typography>
              <Typography colorScheme="subtle" variant="body-1">
                Lastly, import the components you want and put them to use!
              </Typography>
            </div>
            <div className="hover-card v-gap-24">
              <div className="v-flex v-align-items-center v-gap-12">
                <Tabs>
                  <Tab>
                    <Button
                      colorScheme="tertiary"
                      onClick={() => setExampleLanguage('tsx')}
                      aria-selected={exampleLanguage === 'tsx' ? 'true' : 'false'}
                    >
                      <VisaCodeForkAltTiny rtl />
                      <Typography>TypeScript</Typography>
                    </Button>
                  </Tab>
                  <Tab>
                    <Button
                      colorScheme="tertiary"
                      onClick={() => setExampleLanguage('jsx')}
                      aria-selected={exampleLanguage === 'jsx' ? 'true' : 'false'}
                    >
                      <VisaCodeForkAltTiny rtl />
                      <Typography>JavaScript</Typography>
                    </Button>
                  </Tab>
                </Tabs>
              </div>
              <div>
                {exampleLanguage === 'tsx' ? (
                  <Code
                    language="tsx"
                    className="v-flex-grow"
                    code={YourComponentRawTS.toString()}
                    exampleName="yourComponent.tsx"
                  />
                ) : (
                  <Code
                    language="jsx"
                    className="v-flex-grow"
                    code={YourComponentRawJS.toString()}
                    exampleName="yourComponent.jsx"
                  />
                )}

                <div className={cn(Styles.hoverCardResult, 'checkered-background', 'v-flex v-mt-16')}>
                  <YourComponent name={user ? `${user.given_name} ${user.family_name}` : 'Alex Miller'} />
                </div>
              </div>
            </div>
          </article>
        </section>
      </PageContent>
    </div>
  );
};

export default Index;
