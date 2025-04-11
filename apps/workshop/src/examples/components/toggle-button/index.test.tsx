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
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { DefaultToggles } from './default-toggles';
import { LeadingIconToggles } from './leading-icon-toggles';
import { TrailingIconToggles } from './trailing-icon-toggles';
import { IconOnlyToggles } from './icon-only-toggles';
import { DisabledToggles } from './disabled-toggles';
import { DisabledAndActiveToggles } from './disabled-and-active-toggles';
import { MultiSelectToggles } from './multi-select-toggles';
import { StandaloneMultiSelectToggle } from './standalone-multi-select-toggle';
import { MultiSelectCheckboxToggles } from './multi-select-checkbox-toggles';
import { SingleSelectRadioToggles } from './single-select-radio-toggles';

const examples = [
  { Component: DefaultToggles, title: metaData['default-toggles'].title },
  { Component: DisabledToggles, title: metaData['disabled-toggles'].title },
  { Component: IconOnlyToggles, title: metaData['icon-only-toggles'].title },
  { Component: LeadingIconToggles, title: metaData['leading-icon-toggles'].title },
  { Component: TrailingIconToggles, title: metaData['trailing-icon-toggles'].title },
  { Component: DisabledAndActiveToggles, title: metaData['disabled-and-active-toggles'].title },
  { Component: MultiSelectToggles, title: metaData['multi-select-toggles'].title },
  { Component: StandaloneMultiSelectToggle, title: metaData['standalone-multi-select-toggle'].title },
  { Component: MultiSelectCheckboxToggles, title: metaData['multi-select-checkbox-toggles'].title },
  { Component: SingleSelectRadioToggles, title: metaData['single-select-radio-toggles'].title },
];

describe('Toggle examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});

describe('DefaultToggles Component', () => {
  test('should toggle the pressed state correctly', () => {
    render(<DefaultToggles />);

    // Get the toggle buttons
    const toggleButton1 = screen.getByRole('button', { name: 'Label 1' });
    const toggleButton2 = screen.getByRole('button', { name: 'Label 2' });
    const toggleButton3 = screen.getByRole('button', { name: 'Label 3' });

    // Initial state: first button should be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Click on the second button
    fireEvent.click(toggleButton2);

    // Second button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Click on the third button
    fireEvent.click(toggleButton3);

    // Third button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('DisabledAndActiveToggles Component', () => {
  test('should toggle the pressed state correctly for enabled buttons', () => {
    render(<DisabledAndActiveToggles />);

    // Get the toggle buttons
    const toggleButton1 = screen.getByRole('button', { name: 'Label 1' });
    const toggleButton2 = screen.getByRole('button', { name: 'Label 2' });
    const toggleButton3 = screen.getByRole('button', { name: 'Label 3' });

    // Initial state: first button should be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Button 3 should be disabled
    expect(toggleButton3).toBeDisabled();

    // Click on the second button
    fireEvent.click(toggleButton2);

    // Second button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Click on the first button
    fireEvent.click(toggleButton1);

    // First button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Attempt to click on the disabled third button
    fireEvent.click(toggleButton3);

    // State should remain unchanged since the third button is disabled
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('IconOnlyToggles Component', () => {
  test('should toggle the pressed state correctly', () => {
    render(<IconOnlyToggles />);

    // Get the toggle buttons by their aria-labels
    const toggleButton1 = screen.getByRole('button', { name: 'Label 1' });
    const toggleButton2 = screen.getByRole('button', { name: 'Label 2' });
    const toggleButton3 = screen.getByRole('button', { name: 'Label 3' });

    // Initial state: first button should be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Click on the second button
    fireEvent.click(toggleButton2);

    // Second button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Click on the third button
    fireEvent.click(toggleButton3);

    // Third button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'true');

    // Click on the first button again
    fireEvent.click(toggleButton1);

    // First button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('LeadingIconToggles Component', () => {
  test('should toggle the pressed state correctly', () => {
    render(<LeadingIconToggles />);

    // Get the toggle buttons by their text
    const toggleButton1 = screen.getByRole('button', { name: 'Label 1' });
    const toggleButton2 = screen.getByRole('button', { name: 'Label 2' });
    const toggleButton3 = screen.getByRole('button', { name: 'Label 3' });

    // Initial state: first button should be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Click on the second button
    fireEvent.click(toggleButton2);

    // Second button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Click on the third button
    fireEvent.click(toggleButton3);

    // Third button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'true');

    // Click on the first button again
    fireEvent.click(toggleButton1);

    // First button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('StandaloneMultiSelectToggle Component', () => {
  test('should toggle the pressed state correctly', () => {
    render(<StandaloneMultiSelectToggle />);

    // Get the toggle button by its aria-label
    const toggleButton = screen.getByRole('button', { name: 'Label 1' });

    // Initial state: button should not be pressed
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

    // Click on the button
    fireEvent.click(toggleButton);

    // Button should now be pressed
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

    // Click on the button again
    fireEvent.click(toggleButton);

    // Button should now not be pressed
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('TrailingIconToggles Component', () => {
  test('should toggle the pressed state correctly', () => {
    render(<TrailingIconToggles />);

    // Get the toggle buttons by their text
    const toggleButton1 = screen.getByRole('button', { name: 'Label 1' });
    const toggleButton2 = screen.getByRole('button', { name: 'Label 2' });
    const toggleButton3 = screen.getByRole('button', { name: 'Label 3' });

    // Initial state: first button should be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Click on the second button
    fireEvent.click(toggleButton2);

    // Second button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');

    // Click on the third button
    fireEvent.click(toggleButton3);

    // Third button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'true');

    // Click on the first button again
    fireEvent.click(toggleButton1);

    // First button should now be pressed, others not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('MultiSelectToggles Component', () => {
  test('should toggle the pressed state correctly', () => {
    render(<MultiSelectToggles />);

    // Get the toggle buttons by their aria-label
    const toggleButton1 = screen.getByRole('button', { name: 'Label 1' });
    const toggleButton2 = screen.getByRole('button', { name: 'Label 2' });
    const toggleButton3 = screen.getByRole('button', { name: 'Label 3' });

    // Initial state: first and third buttons should be pressed, second should not
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'true');

    // Click on the second button
    fireEvent.click(toggleButton2);

    // Second button should now be pressed
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'true');

    // Click on the first button
    fireEvent.click(toggleButton1);

    // First button should now not be pressed
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'true');

    // Click on the third button
    fireEvent.click(toggleButton3);

    // Third button should now not be pressed
    expect(toggleButton1).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton2).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton3).toHaveAttribute('aria-pressed', 'false');
  });
});
