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
import { Button, Link, Tab, Tabs, Typography, Utility, useTabs } from '@visa/nova-react';
import Code from '../code';

const packageManagers = [
  {
    formatter: (packageName: string, version?: string) => `npm install ${packageName}${version ? `@${version}` : ''}`,
    name: 'NPM',
  },
  {
    formatter: (packageName: string, version?: string) => `pnpm install ${packageName}${version ? `@^${version}` : ''}`,
    name: 'PNPM',
  },
  {
    formatter: (packageName: string, version?: string) => `yarn add ${packageName}${version ? `@${version}` : ''}`,
    name: 'Yarn',
  },
  {
    formatter: (packageName: string, version?: string) => `bun add ${packageName}${version ? `@${version}` : ''}`,
    name: 'Bun',
  },
];

type PackageInstallerProps = {
  description?: string;
  packageLink?: string;
  packageName: string;
  packageOfficialName: string;
  title?: string;
  version?: string;
};

const PackageInstaller = ({
  description,
  packageLink,
  packageName,
  packageOfficialName,
  title,
  version,
}: PackageInstallerProps) => {
  const { getTabIndex, onIndexChange, onKeyNavigation, ref: tabsRef, selectedIndex } = useTabs({ defaultSelected: 0 });

  const packageManager = packageManagers[selectedIndex];

  return (
    <Utility className="hover-card" vFlex vFlexCol vGap={16}>
      {(description || title) && (
        <div>
          {title && <Typography variant="subtitle-1">{title}</Typography>}
          {description && <Typography variant="body-2">{description}</Typography>}
        </div>
      )}
      <Utility vFlex vFlexCol vGap={12}>
        <Tabs onKeyDown={onKeyNavigation} role="tablist">
          {packageManagers.map((packageManager, index) => (
            <Tab key={`active-horizontal-tab-${index}`} role="none">
              <Button
                aria-selected={index === selectedIndex}
                buttonSize="large"
                colorScheme="tertiary"
                onClick={() => onIndexChange(index)}
                ref={el => {
                  tabsRef.current[index] = el;
                }}
                role="tab"
                tabIndex={getTabIndex(index)}
              >
                {packageManager.name}
              </Button>
            </Tab>
          ))}
        </Tabs>

        <Code
          code={packageManager.formatter(packageName, version)}
          exampleName={`${packageOfficialName} installation command for ${packageManager.name}`}
          language="bash"
        />
      </Utility>
      {packageLink && (
        <div>
          <Link
            aria-label={`documentation for ${packageOfficialName} (opens in new tab)`}
            href={packageLink}
            noUnderline
            rel="noopener noreferrer"
            target="_blank"
          >
            {packageOfficialName} documentation
            <VisaMaximizeTiny rtl />
          </Link>
        </div>
      )}
      {packageManager.name !== 'NPM' && (
        <Typography colorScheme="subtle" variant="label">
          NOTE: Package managers can resolve dependencies differently and might not automatically install all required
          dependencies.
        </Typography>
      )}
    </Utility>
  );
};

export default PackageInstaller;
