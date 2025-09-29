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
import { VisaMaximizeTiny } from '@visa/nova-icons-react';
import { Link, Typography } from '@visa/nova-react';
import Code from '../../../components/code';
import chromeDownload from '../../assets/chrome-download.png';
import FAQ from '../faq';

const FAQs = () => {
  return (
    <>
      <FAQ lastUpdated="3/15/24" title="How do I contribute?">
        <div className="v-flex v-flex-col v-gap-12">
          <Typography variant="body-2">
            We're so glad you asked! Simply follow the <code>CONTRIBUTING.md</code> guide we have:
          </Typography>
          <div>
            <Link
              aria-label="Open guide in our git repository (Opens in a new tab)"
              href="https://github.com/visa/nova-react/blob/main/CONTRIBUTING.md"
              noUnderline
              rel="noopener noreferrer"
              target="_blank"
            >
              See guide in git repo <VisaMaximizeTiny />
            </Link>
          </div>
        </div>
      </FAQ>
      <FAQ
        lastUpdated="3/18/24"
        title="How do I install the workshop as a PWA?"
        sourceLink="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DDesktop"
      >
        <div className="v-flex v-flex-col v-gap-12">
          <Typography variant="body-2">
            <span>
              You can install the PWA (progressive web app) version of the site in chrome by clicking the download
              button{' '}
              <img
                alt="download site on chrome"
                src={chromeDownload}
                style={{ blockSize: '0.9rem', inlineSize: '0.9rem' }}
              />{' '}
              in the search bar. For Safari, open the site then in the toolbar click "File" &gt; "Add to Dock...".
            </span>
          </Typography>
        </div>
      </FAQ>
      <FAQ
        lastUpdated="3/15/24"
        sourceLink={[
          'https://www.npmjs.com/package/postcss-import',
          'https://bookmarks.visa.com/wiki-web-apps',
          'https://www.youtube.com/watch?v=oG6XPy1t1KA',
        ]}
        title="How do I use Tailwind alongside Nova styles?"
      >
        <div className="v-flex v-flex-col v-gap-12">
          <Typography variant="body-2">1. Install Post Import:</Typography>
          <Code
            exampleName="vite-plugin-svgr installation command"
            code={`npm install -D postcss-import`}
            language="bash"
          />
          <Typography variant="body-2">2. Add the following to your postcss.config.js file:</Typography>
          <Code
            exampleName="vite-plugin-svgr import"
            code={`module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
    }
}`}
            language="javascript"
          />
          <Typography variant="body-2">2. Add the following yo your tailwind.config.js file:</Typography>
          <Code
            exampleName="vite-plugin-svgr import"
            code={`module.exports = {
    ...,
    plugins: [],
    // add the following lines
    mode: 'jit',
    purge: ['./src/**/*.{html,js,jsx,tsx}'],
    corePlugins: {
        preflight: false
    },
    prefix: 'tw-'
}`}
            language="javascript"
          />
        </div>
      </FAQ>
      <FAQ lastUpdated="3/15/24" title="How do I use VaultKey+ styles alongside Nova styles?">
        <div className="v-flex v-flex-col v-gap-12">
          <Typography variant="body-2">
            1. Remove VK+ styles import from your root JavaScript/TypeScript file (e.g. index.jsx):
          </Typography>
          <Code
            deprecated
            exampleName="vite-plugin-svgr installation command"
            code={`\n import '@visa/vds/_stys/vds.min.css'; \n `}
            language="bash"
          />
          <Typography variant="body-2">2. Add Vault styles to your root stylesheet (e.g. index.css):</Typography>
          <Code
            exampleName="vite-plugin-svgr import"
            code={`@import url('node_modules/@visa/vds/_stys/vds-modern.min.css') layer(vendor);
            
[class^="vds-"] {
    box-sizing: initial;
}
            `}
            language="css"
          />
          <p>
            This will create the correct cascade for styles between Nova and Vault.
            <br />
            Depending on your IDE and version, the first line may cause a warning in the file for the use of 'layer',
            but it will still compile and work as expected.
          </p>
        </div>
      </FAQ>
      <FAQ
        lastUpdated="3/15/24"
        sourceLink="https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs"
        title="If I am using Create React App, how do I import SVGs?"
      >
        <div className="v-flex v-flex-col v-gap-12">
          <Typography variant="body-2">
            Simply import "ReactComponent" as what you want to call your asset component
          </Typography>
          <Code
            exampleName="vite-plugin-svgr installation command"
            code={`import { ReactComponent as Logo } from '@visa/nova-icons-svg/visa/arrow-down.svg';

const App = () => {
    return (
        <div>
            {/* Logo is an actual React component */}
            <Logo />
        </div>
    );
}`}
            language="typescript"
          />
          <p>
            Create React App actually converts your SVG files to React components under the scenes, which is why you can
            use the SVG just like a native React component, with props, class names, etc.
          </p>
        </div>
      </FAQ>
      <FAQ
        lastUpdated="11/21/23"
        sourceLink="https://www.npmjs.com/package/vite-plugin-svgr"
        title="If I am using Vite, how do I import SVGs?"
      >
        <div className="v-flex v-flex-col v-gap-12">
          <Typography variant="body-2">1. Run this command to install the package:</Typography>
          <Code
            exampleName="vite-plugin-svgr installation command"
            code={`npm install vite-plugin-svgr`}
            language="bash"
          />
          <Typography variant="body-2">
            2. Add this line to your <code>vite.config.js</code>:
          </Typography>
          <Code
            exampleName="vite-plugin-svgr import"
            code={`import svgr from "vite-plugin-svgr";\nexport default {\n  // ...\n  plugins: [..., svgr({ include: '**/*.svg' })],\n};`}
            language="javascript"
          />
          <Typography variant="body-2">3. Now the logo can be imported as a React components:</Typography>
          <Code
            exampleName="logo import"
            code={`// yourFile.tsx\nimport Logo from "{your-path-to-the-logo}/logo.svg";`}
            language="javascript"
          />
          <Typography variant="body-2">
            4. If you are using{' '}
            <Typography tag="strong" variant="body-2-bold">
              TypeScript
            </Typography>
            , there is also a declaration helper for better type inference, add this block to the file{' '}
            <code>vite-env.d.ts</code> (
            <Typography tag="strong" variant="body-2-bold">
              Note
            </Typography>
            : the order of the declaration is important):
          </Typography>
          <Code
            exampleName="declaration"
            code={`declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
  React.ComponentProps<"svg"> & { title?: string }
  >;

  export default ReactComponent;
}
/// ...`}
            language="typescript"
          />
          <Typography variant="body-2">
            5. In your <code>tsconfig.json</code>, add the type declaration to <code>compilerOptions.types</code>:
          </Typography>
          <Code
            exampleName="declaration"
            code={`{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}`}
            language="typescript"
          />
          <Typography variant="body-2">
            Now you can delete this line from your <code>vite-env.d.ts</code> for redundancy (for more information of
            type declaration, checkout{' '}
            <Link
              aria-label="Vite's Client Types documentation (Opens in a new tab)"
              href="https://vitejs.dev/guide/features#client-types"
              noUnderline
              rel="noopener noreferrer"
              target="_blank"
            >
              Vite's Client Types documentation
            </Link>
            ):
          </Typography>
          <Code exampleName="declaration" code={`/// <reference types="vite/client" />`} language="typescript" />
        </div>
      </FAQ>
    </>
  );
};

export default FAQs;
