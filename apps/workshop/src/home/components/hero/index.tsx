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
import { VisaMaximizeTiny } from '@visa/nova-icons-react';
import { Button, Typography } from '@visa/nova-react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../routes/paths';
import Styles from './styles.module.scss';

type HomeHeroProperties = {
  [remainingProps: string]: unknown;
};
function HomeHero(props: HomeHeroProperties) {
  return (
    <div className={Styles.homeHero} {...props}>
      <div className={Styles.homeHeroLeft + ' v-xs-media-hide v-sm-media-hide v-md-media-hide v-lg-media-hide'}>
        <div className={Styles.homeHeroGlow}></div>
        <div className={Styles.homeHeroBrowser + ' v-mx-auto'}>
          <div className={Styles.homeHeroBrowserHeader}>
            <div className="v-flex v-gap-8">
              <div className={Styles.homeHeroBrowserDot}></div>
              <div className={Styles.homeHeroBrowserDot}></div>
              <div className={Styles.homeHeroBrowserDot}></div>
            </div>
          </div>
          <div className={Styles.homeHeroBrowserContent}>
            <svg width="350" height="200" viewBox="0 0 700 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="700" height="400" />
              <rect x="40" y="40" width="300" height="25" rx="4" fill="var(--palette-default-active)" />
              <rect x="40" y="95" width="270" height="18" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="40" y="131" width="270" height="18" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="40" y="167" width="196" height="18" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="40" y="241" width="93.3333" height="85" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="40" y="340" width="93.3333" height="20" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="143.333" y="241" width="93.3333" height="85" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="143.333" y="340" width="93.3333" height="20" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="246.667" y="241" width="93.3333" height="85" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="246.667" y="340" width="93.3333" height="20" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="400" y="40" width="260" height="183" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="400" y="261" width="260" height="25" rx="4" fill="var(--palette-default-active)" />
              <rect x="400" y="306" width="240" height="18" rx="4" fill="var(--palette-default-surface-3)" />
              <rect x="400" y="342" width="196" height="18" rx="4" fill="var(--palette-default-surface-3)" />
            </svg>
          </div>
        </div>
      </div>
      <div className={Styles.homeHeroRight}>
        <Typography tag="h1" variant="display-2" className="v-mb-12" style={{ color: 'var(--palette-default-active)' }}>
          VPDS Nova | React
        </Typography>
        <Typography variant="body-1">The latest VDS React components utilizing our new Nova theme.</Typography>
        <div className="v-flex v-gap-12 v-mt-32 v-flex-wrap">
          <Button element={<a href="#guide">Getting Started</a>} />
          <Button element={<NavLink to={Paths.components} />} colorScheme="secondary">
            View Components
          </Button>
          <Button
            aria-label="Vault React (Opens in a new tab)"
            element={<NavLink rel="noopener noreferrer" target="_blank" to={Paths.vault} />}
            colorScheme="tertiary"
          >
            Vault (internal only)
            <VisaMaximizeTiny rtl />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;
