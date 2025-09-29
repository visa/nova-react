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
import {
  VisaCodeForkLow,
  VisaConnectHigh,
  VisaInformationLow,
  VisaMapHigh,
  VisaMaximizeTiny,
  VisaQuestionLow,
  VisaSplitLow,
  VisaViewGridLow,
  VisaWrenchHigh,
} from '@visa/nova-icons-react';
import { Divider, Link, Typography } from '@visa/nova-react';
import libPackageJson from '@visa/nova-react/package.json';
import Utility from '@visa/nova-react/utility';
import packageJson from '../../package.json';
import Code from '../components/code';
import { PageContent, PageHeader, PageTitle } from '../components/page';
import meta from '../examples/meta.json';
import { Paths } from '../routes';
import DescriptiveList from './components/descriptive-list';
import FAQs from './components/faqs';

const Resources = () => {
  const dependencies = { ...packageJson.dependencies, ...libPackageJson.peerDependencies } as Record<string, string>;
  delete dependencies['@visa/nova-react'];
  const optionalDependencies = {
    ...(packageJson?.optionalDependencies || {}),
    ...((libPackageJson as Record<string, unknown>)?.['optionalDependencies'] || {}),
  };
  const stats = {
    Components: meta.components.length,
    'Custom Hooks': meta.stats.hooks,
    Examples: meta.stats.examples,
    'Helper Components': meta.stats.components - meta.components.length,
    Tests: meta.totalTests,
    'Test Coverage': `${meta.testAvg}%`,
    'Test Suites': meta.testSuites,
    'Total Components': meta.stats.components,
  };
  return (
    <div>
      <PageHeader>
        <PageTitle>Resources</PageTitle>
      </PageHeader>
      <PageContent>
        <section className="hover-card-group v-mt-36">
          <div className="hover-card">
            <VisaWrenchHigh rtl />
            <div className="v-mt-20">
              <Typography tag="h2" variant="headline-4">
                Found an issue or have a feature request?
              </Typography>
              <Typography className="v-mt-8" colorScheme="subtle">
                Please submit a{' '}
                <Link
                  aria-label="Ticket (opens in a new tab)"
                  href={Paths.ticketLink}
                  noUnderline
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ticket <VisaMaximizeTiny rtl />
                </Link>
                . We will review your request and get back to you as soon as possible.
              </Typography>
            </div>
          </div>
          <div className="hover-card">
            <VisaConnectHigh rtl />
            <div className="v-mt-20">
              <Typography tag="h2" variant="headline-4">
                Want to get in touch?
              </Typography>
              <Typography className="v-mt-8" colorScheme="subtle">
                Reach out on our{' '}
                <Link
                  aria-label="Teams channel (opens in a new tab)"
                  href="https://bookmarks.visa.com/vpds-microsoft-teams-channel"
                  noUnderline
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Team's channel <VisaMaximizeTiny rtl />
                </Link>
                . We are always happy to help!
              </Typography>
            </div>
          </div>
          <div className="hover-card">
            <VisaMapHigh rtl />
            <div className="v-mt-20">
              <Typography tag="h2" variant="headline-4">
                Want to see what else we have to offer?
              </Typography>
              <Typography className="v-mt-8" colorScheme="subtle">
                Check out our{' '}
                <Link
                  aria-label="VPDS Home site (Opens in a new tab)"
                  href="https://design.visa.com/"
                  noUnderline
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  home experience <VisaMaximizeTiny rtl />
                </Link>
                . We have a lot of great resources for you to explore.
              </Typography>
            </div>
          </div>
          {/* <div className="hover-card">
            <VisaTrophyHigh rtl />
            <div className="v-mt-20">
              <Typography tag="h2" variant="headline-4">
                Are you already using VPDS?
              </Typography>
              <Typography className="v-mt-8" colorScheme="subtle">
                We'd love to see! <br />
                <Link
                  aria-label="Tell us about your project here (opens in a new tab)"
                  href="mailto:productdesignsystem@visa.com"
                  noUnderline
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Tell us about your project here <VisaMaximizeTiny rtl />
                </Link>
                .
              </Typography>
            </div>
          </div> */}
        </section>
        <section className="v-flex v-flex-col v-gap-24 v-pt-24">
          <div className="v-flex v-align-items-center v-gap-16">
            <VisaViewGridLow />
            <Typography tag="h2" variant="headline-2">
              CSS tips
            </Typography>
          </div>
          <Divider dividerType="decorative" className="v-mb-24" />
          <article className="v-flex v-flex-col v-gap-24 v-mb-24">
            <div className="v-flex v-flex-col v-gap-6">
              <Typography tag="h3" variant="headline-3">
                Flexbox and Grid
              </Typography>
            </div>
            <Typography variant="body-1">
              CSS Flexbox and CSS Grid are powerful layout models that allow for intricate designs and layouts, while
              still remaining responsive.
            </Typography>
            <div className="v-flex v-flex-wrap v-gap-24">
              <div className="hover-card v-gap-24">
                <div className="v-flex v-flex-col v-gap-8">
                  <Typography variant="headline-3">CSS Flexbox</Typography>

                  <Code exampleName="flexbox" code={`.container {\n  display: flex;\n}`} language="css" />
                  <Typography>
                    CSS Flexbox is a{' '}
                    <Typography tag="span" variant="body-2-bold">
                      one-dimensional
                    </Typography>{' '}
                    layout model, and can deal with either rows or columns at a time. It's particularly useful when you
                    want your layout to respond to different screen sizes.
                  </Typography>
                  <Typography>
                    We have utility classes built-in for CSS Flexbox, check out the examples on our{' '}
                    <Link
                      aria-label="styles workshop (opens in a new tab)"
                      href="https://design.visa.com/base-elements/responsive-grid-system/flex?code_library=css"
                      noUnderline
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      styles workshop <VisaMaximizeTiny rtl />
                    </Link>
                    .
                  </Typography>
                  <Typography>
                    <Link
                      aria-label="Flexbox froggy (opens in a new tab)"
                      href="https://flexboxfroggy.com/"
                      noUnderline
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Flexbox Froggy <VisaMaximizeTiny rtl />
                    </Link>{' '}
                    is a great interactive game to learn Flexbox.
                  </Typography>
                  <Typography>
                    For more detailed information, check out the{' '}
                    <Link
                      aria-label="MDN Flexbox reference (opens in a new tab)"
                      href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout"
                      noUnderline
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      MDN Flexbox reference
                      <VisaMaximizeTiny rtl />
                    </Link>
                    .
                  </Typography>
                  <Typography>
                    You can also play around with Flexbox in the{' '}
                    <Link
                      aria-label="Flexbox playground (opens in a new tab)"
                      href="https://codepen.io/enxaneta/full/adLPwv"
                      noUnderline
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Flexbox Playground
                      <VisaMaximizeTiny rtl />
                    </Link>
                    .
                  </Typography>
                </div>
              </div>
              <div className="hover-card v-gap-24">
                <div className="v-flex v-flex-col v-gap-12">
                  <Typography variant="headline-3">CSS Grid</Typography>
                  <Code exampleName="flexbox" code={`.container {\n  display: grid;\n}`} language="css" />
                  <Typography>
                    CSS Grid is a{' '}
                    <Typography tag="span" variant="body-2-bold">
                      two-dimensional
                    </Typography>{' '}
                    layout model, and can handle both rows and columns at a time. It's particularly useful when you want
                    to create complex, responsive designs.
                  </Typography>
                  <Typography>
                    <Link
                      aria-label="CSS Grid Garden (opens in a new tab)"
                      href="https://cssgridgarden.com/"
                      noUnderline
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      CSS Grid Garden
                      <VisaMaximizeTiny rtl />
                    </Link>{' '}
                    is an interactive game that helps you learn CSS Grid.
                  </Typography>
                  <Typography>
                    For more detailed information, check out the{' '}
                    <Link
                      aria-label="MDN Grids reference (opens in a new tab)"
                      href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout"
                      noUnderline
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      MDN Grids reference
                      <VisaMaximizeTiny rtl />
                    </Link>
                    .
                  </Typography>
                </div>
              </div>
            </div>
            <Typography variant="body-1">
              You can learn more about flex, grid, layouts and more on web.dev's{' '}
              <Link
                aria-label="Learn CSS (opens in a new tab)"
                href="https://web.dev/learn/css"
                noUnderline
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn CSS <VisaMaximizeTiny rtl />
              </Link>
              .
            </Typography>
          </article>
        </section>
        <section className="v-flex v-flex-col v-pt-24">
          <div className="v-flex v-align-items-center v-gap-24 v-pb-24">
            <VisaSplitLow />
            <Typography tag="h2" variant="headline-2">
              Dependencies
            </Typography>
          </div>
          <Divider dividerType="decorative" />
          <Utility vFlex vFlexRow vFlexWrap vJustifyContent="evenly">
            <Utility vFlexGrow>
              <Typography className="v-pl-12 v-pt-18 v-pb-6" variant="subtitle-2">
                Peer:
              </Typography>
              <DescriptiveList list={dependencies} />
            </Utility>
            <Utility vFlexGrow>
              <Typography className="v-pl-12 v-pt-18 v-pb-6" variant="subtitle-2">
                Optional:
              </Typography>
              <DescriptiveList list={optionalDependencies} />
            </Utility>
          </Utility>
        </section>
        <section className="v-flex v-flex-col v-gap-24 v-pt-24">
          <div className="v-flex v-align-items-center v-gap-16">
            <VisaQuestionLow />
            <Typography tag="h2" variant="headline-2">
              FAQ
            </Typography>
          </div>
          <Divider dividerType="decorative" />
          <FAQs />
        </section>
        <section className="v-flex v-flex-col v-gap-24 v-pt-24">
          <div className="v-flex v-align-items-center v-gap-16">
            <VisaInformationLow />
            <Typography tag="h2" variant="headline-2">
              Stats for Nerds 🤓
            </Typography>
          </div>
          <Divider dividerType="decorative" />
          <DescriptiveList list={stats} />
        </section>
        <section className="v-flex v-flex-col v-gap-24 v-pt-40">
          <div className="v-flex v-align-items-center v-gap-16">
            <VisaCodeForkLow rtl />
            <Typography tag="h2" variant="headline-2">
              Testing
            </Typography>
          </div>
          <Divider dividerType="decorative" className="v-mb-8" />
          <article className="v-flex v-flex-col v-gap-24 v-mb-24">
            <Typography variant="headline-3">Our Approach</Typography>
            <Typography variant="body-1">
              We conduct rigorous testing to ensure our components are accessible and meet our high standards. Our
              testing tools include Jest and the React Testing Library. We use Axe for comprehensive accessibility
              testing and snapshot testing to minimize regression. Each component undergoes individual unit testing
              based on its API, followed by integration testing using examples to ensure seamless interaction.
              <br />
              <br />
              Our goal is to achieve 100% test coverage for all components. Our pipeline safeguards against merging any
              code that fails our tests. While we have over 1000 tests providing us with full code coverage, we
              recognize that there is always room for improvement. We are constantly working to improve our testing
              suite.
            </Typography>
          </article>
        </section>
      </PageContent>
    </div>
  );
};

export default Resources;
