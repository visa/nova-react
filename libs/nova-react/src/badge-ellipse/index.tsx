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
import React from 'react';
import cn from 'clsx';
import { CSSProperties } from 'react';

const CSS_PREFIX = 'v-icon v-icon-tiny v-ellipse';

export type VisaBadgeEllipseProperties = {
  /** CSS Class Name */
  className?: string;
  /** aria-label */
  'aria-label'?: string;
} & React.SVGProps<SVGSVGElement>;

const BadgeEllipse: React.FC<VisaBadgeEllipseProperties> = ({
  className,
  'aria-label': ariaLabel,
  ...remainingProps
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={cn(CSS_PREFIX, className)}
    aria-label={ariaLabel || undefined}
    aria-hidden={ariaLabel ? undefined : 'true'}
    height="16"
    width="16"
    viewBox="0 0 16 16"
    style={
      {
        '--v-icon-height': 'var(--size-scalable-8)',
        '--v-icon-width': 'var(--size-scalable-8)',
      } as CSSProperties
    }
    {...remainingProps}
  >
    <circle cx="8" cy="8" r="8" style={{ fill: 'var(--v-badge-ellipse-color)' }} />
  </svg>
);
BadgeEllipse.displayName = 'BadgeEllipse';
export default BadgeEllipse;
