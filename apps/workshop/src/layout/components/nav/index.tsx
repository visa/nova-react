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
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny,
} from '@visa/nova-icons-react';
import { Button, Nav, Tab, TabSuffix, Tabs } from '@visa/nova-react';
import { camelCase, sentenceCase } from 'change-case';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import meta from '../../../examples/meta.json';
import { Paths } from '../../../routes/paths';
import Styles from './styles.module.scss';

const components = meta.components;
const hooks = meta.hooks;
const utilities = meta.utilities;

const mobileWidth = 768;

const SiteNav: FC = () => {
  const [expandUtility, setExpandUtility] = useState(true);
  const [hooksExpanded, setHooksExpanded] = useState(true);
  const [navOpen, setNavOpen] = useState(window.innerWidth >= mobileWidth);
  const prevScreenWidth = useRef(window.innerWidth);

  const onScreenWidthChange = useCallback(() => {
    if (prevScreenWidth.current < mobileWidth && window.innerWidth >= mobileWidth) {
      setNavOpen(true);
    }
    if (prevScreenWidth.current >= mobileWidth && window.innerWidth < mobileWidth) {
      setNavOpen(false);
    }
    prevScreenWidth.current = window.innerWidth;
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onScreenWidthChange);
    return () => window.removeEventListener('resize', onScreenWidthChange);
  }, [onScreenWidthChange]);

  return (
    <>
      {navOpen && (
        <>
          <Nav className={Styles.layoutNavMenu} orientation="vertical" tag="div">
            <Tabs orientation="vertical" role="none">
              <Tab>
                <Button colorScheme="tertiary" element={<NavLink to={Paths.root} end />}>
                  Getting Started
                </Button>
              </Tab>
              <Tab>
                <Button colorScheme="tertiary" element={<NavLink to={Paths.resources} end />}>
                  Resources
                </Button>
              </Tab>
              <Tab>
                <Button
                  aria-expanded={expandUtility}
                  colorScheme="tertiary"
                  onClick={() => setExpandUtility(!expandUtility)}
                >
                  Utility classes
                  <TabSuffix element={expandUtility ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
                </Button>
                {expandUtility && (
                  <Tabs orientation="vertical" role="none">
                    {utilities.map((utility, i) => (
                      <Tab key={i}>
                        <Button
                          colorScheme="tertiary"
                          element={
                            <NavLink to={Paths.documentationPage('utilities', utility)}>{sentenceCase(utility)}</NavLink>
                          }
                        />
                      </Tab>
                    ))}
                  </Tabs>
                )}
              </Tab>
              <Tab>
                <Button
                  aria-expanded={hooksExpanded}
                  colorScheme="tertiary"
                  onClick={() => setHooksExpanded(!hooksExpanded)}
                >
                  Hooks
                  <TabSuffix element={hooksExpanded ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
                </Button>
                {hooksExpanded && (
                  <Tabs orientation="vertical" role="none">
                    {hooks.map((hook, i) => (
                      <Tab key={i}>
                        <Button
                          colorScheme="tertiary"
                          element={<NavLink to={Paths.documentationPage('hooks', hook)}>{camelCase(hook)}</NavLink>}
                        />
                      </Tab>
                    ))}
                  </Tabs>
                )}
              </Tab>
              <Tab>
                <Button colorScheme="tertiary" element={<NavLink to={Paths.components} end />}>
                  Components
                </Button>
                <Tabs orientation="vertical" role="none">
                  {components.map((component, i) => (
                    <Tab key={i}>
                      <Button
                        colorScheme="tertiary"
                        element={
                          <NavLink to={Paths.documentationPage('components', component)}>
                            {sentenceCase(component)}
                          </NavLink>
                        }
                      />
                    </Tab>
                  ))}
                </Tabs>
              </Tab>
            </Tabs>
          </Nav>
        </>
      )}
      <div className={Styles.layoutNavFooter}>
        <Button
          iconButton
          aria-expanded={navOpen ? 'true' : 'false'}
          aria-label="navigation control"
          colorScheme="tertiary"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <VisaMediaRewindTiny rtl /> : <VisaMediaFastForwardTiny rtl />}
        </Button>
      </div>
    </>
  );
};

SiteNav.displayName = 'SiteNav';

export default SiteNav;
