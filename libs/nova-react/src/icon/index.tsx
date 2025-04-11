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
import cn from 'clsx';
import { useId, forwardRef, SVGAttributes } from 'react';

const CSS_PREFIX = 'v-icon';
const RESOLUTION = {
  high: '48',
  low: '24',
  tiny: '16',
};

export type IconProperties = {
  /** Aria Base ID */
  ariaBaseId?: number | string;
  /** Icon Branding */
  brand?: 'generic' | 'visa';
  /** @ignore */
  children?: never;
  /** @ignore */
  className?: string;
  description?: string;
  /** Name of Icon */
  iconName?: string;
  /** Resolution of Icon */
  resolution?: keyof typeof RESOLUTION;
  /** Flips icon horizontally when document direction is set to right to left */
  rtl?: boolean;
  /** Title for Standalone SVG's */
  title?: string;
} & SVGAttributes<SVGSVGElement>;

/**
 * Meant for use with sprites only. Uses dom href linking of sprite elements expected to already be in the DOM to render the icon.
 * @docs {@link https://design.visa.com/react/components/icon | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
const Icon = forwardRef<SVGSVGElement, IconProperties>(
  (
    {
      ariaBaseId,
      brand = 'generic',
      className,
      description,
      iconName = 'help',
      resolution = 'low',
      rtl,
      title,
      ...remainingProps
    },
    ref
  ) => {
    const uniqueId = useId();

    const uid = ariaBaseId || uniqueId;
    const ariaLabelledBy = `${title ? `title-${uid}` : ''}${title && description ? ',' : ''}${
      description ? `description-${uid}` : ''
    }`;
    const iconSize = RESOLUTION[resolution];
    const symbolId = `${brand}-${iconName}-${resolution}`;

    return (
      <svg
        aria-hidden="true"
        aria-labelledby={ariaLabelledBy || undefined}
        className={cn(
          CSS_PREFIX,
          brand && `${CSS_PREFIX}-${brand}`,
          resolution && `${CSS_PREFIX}-${resolution}`,
          rtl && `${CSS_PREFIX}-rtl`,
          className
        )}
        focusable="false"
        height={iconSize}
        ref={ref}
        viewBox={`0 0 ${iconSize} ${iconSize}`}
        width={iconSize}
        {...remainingProps}
      >
        {title && <title id={`title-${uid}`}>{title}</title>}
        {description && <desc id={`description-${uid}`}>{description}</desc>}
        <use href={symbolId} xlinkHref={symbolId} />
      </svg>
    );
  }
);

export default Icon;

Icon.displayName = 'Icon';
