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
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Typography from '.';

describe('Typography', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Typography />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('');
    expect(container.firstElementChild?.tagName).toBe('P');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Typography className="test-class" />);
    expect(container.firstElementChild?.className).toBe('test-class');
  });

  it('should render different variants with correct classNames', () => {
    render(
      <>
        <Typography data-testid="body-1" variant="body-1" />
        <Typography data-testid="body-2-bold" variant="body-2-bold" />
        <Typography data-testid="body-2-link" variant="body-2-link" />
        <Typography data-testid="body-2-medium" variant="body-2-medium" />
        <Typography data-testid="body-2" variant="body-2" />
        <Typography data-testid="body-3" variant="body-3" />
        <Typography data-testid="button-large" variant="button-large" />
        <Typography data-testid="button-medium" variant="button-medium" />
        <Typography data-testid="button-small" variant="button-small" />
        <Typography data-testid="display-1" variant="display-1" />
        <Typography data-testid="display-2" variant="display-2" />
        <Typography data-testid="headline-1" variant="headline-1" />
        <Typography data-testid="headline-2" variant="headline-2" />
        <Typography data-testid="headline-3" variant="headline-3" />
        <Typography data-testid="headline-4" variant="headline-4" />
        <Typography data-testid="label-active" variant="label-active" />
        <Typography data-testid="label-large-active" variant="label-large-active" />
        <Typography data-testid="label-large" variant="label-large" />
        <Typography data-testid="label-small" variant="label-small" />
        <Typography data-testid="label" variant="label" />
        <Typography data-testid="overline" variant="overline" />
        <Typography data-testid="subtitle-1" variant="subtitle-1" />
        <Typography data-testid="subtitle-2" variant="subtitle-2" />
        <Typography data-testid="subtitle-3" variant="subtitle-3" />
        <Typography data-testid="color-default" colorScheme="default" />
        <Typography data-testid="color-subtle" colorScheme="subtle" />
      </>
    );
    expect(screen.getByTestId('body-1').className).toBe('v-typography-body-1');
    expect(screen.getByTestId('body-2').className).toBe('v-typography-body-2');
    expect(screen.getByTestId('body-2-bold').className).toBe('v-typography-body-2-bold');
    expect(screen.getByTestId('body-2-link').className).toBe('v-typography-body-2-link');
    expect(screen.getByTestId('body-2-medium').className).toBe('v-typography-body-2-medium');
    expect(screen.getByTestId('body-3').className).toBe('v-typography-body-3');
    expect(screen.getByTestId('button-large').className).toBe('v-typography-button-large');
    expect(screen.getByTestId('button-large').className).toBe('v-typography-button-large');
    expect(screen.getByTestId('button-medium').className).toBe('v-typography-button-medium');
    expect(screen.getByTestId('button-small').className).toBe('v-typography-button-small');
    expect(screen.getByTestId('display-1').className).toBe('v-typography-display-1');
    expect(screen.getByTestId('display-2').className).toBe('v-typography-display-2');
    expect(screen.getByTestId('headline-1').className).toBe('v-typography-headline-1');
    expect(screen.getByTestId('headline-2').className).toBe('v-typography-headline-2');
    expect(screen.getByTestId('headline-3').className).toBe('v-typography-headline-3');
    expect(screen.getByTestId('headline-4').className).toBe('v-typography-headline-4');
    expect(screen.getByTestId('label-active').className).toBe('v-typography-label-active');
    expect(screen.getByTestId('label-large-active').className).toBe('v-typography-label-large-active');
    expect(screen.getByTestId('label-large').className).toBe('v-typography-label-large');
    expect(screen.getByTestId('label-small').className).toBe('v-typography-label-small');
    expect(screen.getByTestId('label').className).toBe('v-typography-label');
    expect(screen.getByTestId('overline').className).toBe('v-typography-overline');
    expect(screen.getByTestId('subtitle-1').className).toBe('v-typography-subtitle-1');
    expect(screen.getByTestId('subtitle-2').className).toBe('v-typography-subtitle-2');
    expect(screen.getByTestId('subtitle-3').className).toBe('v-typography-subtitle-3');
    expect(screen.getByTestId('color-default').className).toBe('v-typography-color-default');
    expect(screen.getByTestId('color-subtle').className).toBe('v-typography-color-subtle');
  });

  it('should allow custom tag', () => {
    const { container } = render(<Typography tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Typography aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<Typography>Test Child</Typography>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
