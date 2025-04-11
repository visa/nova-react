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
import { CSSProperties, ReactElement, cloneElement } from 'react';

export type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'desktop' | 'mobile';

export type DefaultPositions = 'center' | 'end' | 'start';

export type VPoint =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48;

export type VSpacing = VPoint | 'auto' | 'inherit';

export type UtilityFragmentProperties = {
  /** Child element that the styles are applies to. Only allows for single child element. */
  children: ReactElement;
  /** @ignore */
  className?: string;
  /** @ignore */
  style?: CSSProperties;
  vAlignContent?: DefaultPositions | 'around' | 'between' | 'evenly';
  vAlignItems?: DefaultPositions | 'baseline' | 'stretch';
  vAlignSelf?: DefaultPositions | 'auto' | 'stretch';
  vColGap?: VPoint;
  vContainerHide?: BreakPoints;
  vElevation?: 'inset' | 'large' | 'medium' | 'none' | 'small' | 'xlarge' | 'xxlarge' | 'xsmall';
  vFlex?: boolean;
  vFlexCol?: boolean;
  vFlexColReverse?: boolean;
  vFlexGrow?: boolean;
  vFlexGrow0?: boolean;
  vFlexInline?: boolean;
  vFlexNoWrap?: boolean;
  vFlexRow?: boolean;
  vFlexRowReverse?: boolean;
  vFlexShrink?: boolean;
  vFlexShrink0?: boolean;
  vFlexWrap?: boolean;
  vFlexWrapReverse?: boolean;
  vGap?: Omit<VSpacing, 'auto'> | 'normal';
  vHide?: boolean;
  vJustifyContent?: DefaultPositions | 'around' | 'between' | 'evenly';
  vMargin?: VSpacing;
  vMarginBottom?: VSpacing;
  vMarginHorizontal?: VSpacing;
  vMarginLeft?: VSpacing;
  vMarginRight?: VSpacing;
  vMarginTop?: VSpacing;
  vMarginVertical?: VSpacing;
  vMediaHide?: BreakPoints;
  vPadding?: VSpacing;
  vPaddingBottom?: VSpacing;
  vPaddingHorizontal?: VSpacing;
  vPaddingLeft?: VSpacing;
  vPaddingRight?: VSpacing;
  vPaddingTop?: VSpacing;
  vPaddingVertical?: VSpacing;
  vRowGap?: VPoint;
};

/**
 * Wraps around a component and add Nova utility classes to its direct child without adding extra elements to the DOM.
 * @docs {@link https://design.visa.com/react/utilities/api | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
const UtilityFragment = ({
  children,
  className,
  vAlignContent,
  vAlignItems,
  vAlignSelf,
  vColGap,
  vContainerHide,
  vElevation,
  vFlex,
  vFlexCol,
  vFlexColReverse,
  vFlexGrow,
  vFlexGrow0,
  vFlexInline,
  vFlexNoWrap,
  vFlexRow,
  vFlexRowReverse,
  vFlexShrink,
  vFlexShrink0,
  vFlexWrap,
  vFlexWrapReverse,
  vGap,
  vHide,
  vJustifyContent,
  vMargin,
  vMarginBottom,
  vMarginHorizontal,
  vMarginLeft,
  vMarginRight,
  vMarginTop,
  vMarginVertical,
  vMediaHide,
  vPadding,
  vPaddingBottom,
  vPaddingHorizontal,
  vPaddingLeft,
  vPaddingRight,
  vPaddingTop,
  vPaddingVertical,
  vRowGap,
  ...remainingProps
}: UtilityFragmentProperties) => {
  const classNames =
    cn(
      vAlignContent && `v-align-content-${vAlignContent}`,
      vAlignItems && `v-align-items-${vAlignItems}`,
      vAlignSelf && `v-align-self-${vAlignSelf}`,
      (vColGap || vColGap === 0) && `v-col-gap-${vColGap}`,
      vContainerHide && `v-${vContainerHide}-container-hide`,
      vElevation && `v-elevation-${vElevation}`,
      (vFlex || vFlexCol || vRowGap) && 'v-flex',
      vFlexCol && 'v-flex-col',
      vFlexColReverse && 'v-flex-col-reverse',
      vFlexGrow && 'v-flex-grow',
      vFlexGrow0 && 'v-flex-grow-0',
      vFlexInline && 'v-flex-inline',
      vFlexNoWrap && 'v-flex-nowrap',
      vFlexRow && 'v-flex-row',
      vFlexRowReverse && 'v-flex-row-reverse',
      vFlexShrink && 'v-flex-shrink',
      vFlexShrink0 && 'v-flex-shrink-0',
      vFlexWrap && 'v-flex-wrap',
      vFlexWrapReverse && 'v-flex-wrap-reverse',
      (vGap || vGap === 0) && `v-gap-${vGap}`,
      vHide && 'v-hide',
      vJustifyContent && `v-justify-content-${vJustifyContent}`,
      (vMargin || vMargin === 0) && `v-m-${vMargin}`,
      (vMarginBottom || vMarginBottom === 0) && `v-mb-${vMarginBottom}`,
      (vMarginHorizontal || vMarginHorizontal === 0) && `v-mx-${vMarginHorizontal}`,
      (vMarginLeft || vMarginLeft === 0) && `v-ml-${vMarginLeft}`,
      (vMarginRight || vMarginRight === 0) && `v-mr-${vMarginRight}`,
      (vMarginTop || vMarginTop === 0) && `v-mt-${vMarginTop}`,
      (vMarginVertical || vMarginVertical === 0) && `v-my-${vMarginVertical}`,
      vMediaHide && `v-${vMediaHide}-media-hide`,
      (vPadding || vPadding === 0) && `v-p-${vPadding}`,
      (vPaddingBottom || vPaddingBottom === 0) && `v-pb-${vPaddingBottom}`,
      (vPaddingHorizontal || vPaddingHorizontal === 0) && `v-px-${vPaddingHorizontal}`,
      (vPaddingLeft || vPaddingLeft === 0) && `v-pl-${vPaddingLeft}`,
      (vPaddingRight || vPaddingRight === 0) && `v-pr-${vPaddingRight}`,
      (vPaddingTop || vPaddingTop === 0) && `v-pt-${vPaddingTop}`,
      (vPaddingVertical || vPaddingVertical === 0) && `v-py-${vPaddingVertical}`,
      (vRowGap || vRowGap === 0) && `v-row-gap-${vRowGap}`,
      className,
      children.props.className
    ) || undefined;

  return cloneElement(children, {
    className: classNames,
    ...remainingProps,
  });
};

export default UtilityFragment;

UtilityFragment.displayName = 'UtilityFragment';
