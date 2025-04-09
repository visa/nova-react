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
import { render } from '@testing-library/react';

import UtilityFragment from '.';

describe('UtilityFragment', () => {
  it('renders children correctly', () => {
    const { container } = render(
      <UtilityFragment>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render child styles correctly', () => {
    const { container } = render(
      <UtilityFragment>
        <div style={{ background: 'yellow' }}>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveStyle({ background: 'yellow' });
  });

  it('applies className correctly', () => {
    const { container } = render(
      <UtilityFragment className="custom-class-1">
        <div className="custom-class-2">Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('custom-class-1 custom-class-2');
  });

  it('applies vAlignContent correctly', () => {
    const { container } = render(
      <UtilityFragment vAlignContent="center">
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-align-content-center');
  });

  it('applies vAlignItems correctly', () => {
    const { container } = render(
      <UtilityFragment vAlignItems="start">
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-align-items-start');
  });

  it('applies vAlignSelf correctly', () => {
    const { container } = render(
      <UtilityFragment vAlignSelf="end">
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-align-self-end');
  });

  it('applies vColGap correctly', () => {
    const { container } = render(
      <UtilityFragment vColGap={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-col-gap-4');
  });

  it('applies vContainerHide correctly', () => {
    const { container } = render(
      <UtilityFragment vContainerHide="sm">
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-sm-container-hide');
  });

  it('applies vFlex correctly', () => {
    const { container } = render(
      <UtilityFragment vFlex>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex');
  });

  it('applies vFlexCol correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexCol>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-col');
  });

  it('applies vFlexColReverse correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexColReverse>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-col-reverse');
  });

  it('applies vFlexGrow correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexGrow>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-grow');
  });

  it('applies vFlexGrow0 correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexGrow0>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-grow-0');
  });

  it('applies vFlexInline correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexInline>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-inline');
  });

  it('applies vFlexNoWrap correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexNoWrap>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-nowrap');
  });

  it('applies vFlexRow correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexRow>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-row');
  });

  it('applies vFlexRowReverse correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexRowReverse>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-row-reverse');
  });

  it('applies vFlexShrink correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexShrink>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-shrink');
  });

  it('applies vFlexShrink0 correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexShrink0>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-shrink-0');
  });

  it('applies vFlexWrap correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexWrap>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-wrap');
  });

  it('applies vFlexWrapReverse correctly', () => {
    const { container } = render(
      <UtilityFragment vFlexWrapReverse>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-flex-wrap-reverse');
  });

  it('applies vGap correctly', () => {
    const { container } = render(
      <UtilityFragment vGap={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-gap-4');
  });

  it('applies vHide correctly', () => {
    const { container } = render(
      <UtilityFragment vHide>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-hide');
  });

  it('applies vJustifyContent correctly', () => {
    const { container } = render(
      <UtilityFragment vJustifyContent="center">
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-justify-content-center');
  });

  it('applies vMargin correctly', () => {
    const { container } = render(
      <UtilityFragment vMargin={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-m-4');
  });

  it('applies vMarginBottom correctly', () => {
    const { container } = render(
      <UtilityFragment vMarginBottom={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-mb-4');
  });

  it('applies vMarginHorizontal correctly', () => {
    const { container } = render(
      <UtilityFragment vMarginHorizontal={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-mx-4');
  });

  it('applies vMarginLeft correctly', () => {
    const { container } = render(
      <UtilityFragment vMarginLeft={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-ml-4');
  });

  it('applies vMarginRight correctly', () => {
    const { container } = render(
      <UtilityFragment vMarginRight={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-mr-4');
  });

  it('applies vMarginTop correctly', () => {
    const { container } = render(
      <UtilityFragment vMarginTop={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-mt-4');
  });

  it('applies vMarginVertical correctly', () => {
    const { container } = render(
      <UtilityFragment vMarginVertical={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-my-4');
  });

  it('applies vMediaHide correctly', () => {
    const { container } = render(
      <UtilityFragment vMediaHide="sm">
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-sm-media-hide');
  });

  it('applies vPadding correctly', () => {
    const { container } = render(
      <UtilityFragment vPadding={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-p-4');
  });

  it('applies vPaddingBottom correctly', () => {
    const { container } = render(
      <UtilityFragment vPaddingBottom={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-pb-4');
  });

  it('applies vPaddingHorizontal correctly', () => {
    const { container } = render(
      <UtilityFragment vPaddingHorizontal={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-px-4');
  });

  it('applies vPaddingLeft correctly', () => {
    const { container } = render(
      <UtilityFragment vPaddingLeft={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-pl-4');
  });

  it('applies vPaddingRight correctly', () => {
    const { container } = render(
      <UtilityFragment vPaddingRight={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-pr-4');
  });

  it('applies vPaddingTop correctly', () => {
    const { container } = render(
      <UtilityFragment vPaddingTop={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-pt-4');
  });

  it('applies vPaddingVertical correctly', () => {
    const { container } = render(
      <UtilityFragment vPaddingVertical={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-py-4');
  });

  it('applies vRowGap correctly', () => {
    const { container } = render(
      <UtilityFragment vRowGap={4}>
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-row-gap-4');
  });

  it('applies vElevation correctly', () => {
    const { container } = render(
      <UtilityFragment vElevation="medium">
        <div>Test Content</div>
      </UtilityFragment>
    );

    expect(container.firstChild).toHaveClass('v-elevation-medium');
  });
});
