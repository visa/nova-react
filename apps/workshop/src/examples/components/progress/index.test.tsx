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
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { CircularCustomSizeProgress } from './circular-custom-size-progress';
import { CompleteCircularProgress } from './complete-circular-progress';
import { CompleteProgress } from './complete-progress';
import { DeterminateCircularProgress } from './determinate-circular-progress';
import { DeterminateCircularSmallProgress } from './determinate-circular-small-progress';
import { DeterminateNoLabelProgress } from './determinate-no-label-progress';
import { DeterminateProgress } from './determinate-progress';
import { ErrorCircularProgress } from './error-circular-progress';
import { ErrorProgress } from './error-progress';
import { IndeterminateCircularProgress } from './indeterminate-circular-progress';
import { IndeterminateCircularSmallProgress } from './indeterminate-circular-small-progress';
import { IndeterminateNoLabelProgress } from './indeterminate-no-label-progress';
import { IndeterminateProgress } from './indeterminate-progress';

const examples = [
  { Component: IndeterminateProgress, title: metaData['indeterminate-progress'].title },
  { Component: IndeterminateNoLabelProgress, title: metaData['indeterminate-no-label-progress'].title },
  { Component: IndeterminateCircularProgress, title: metaData['indeterminate-circular-progress'].title },
  { Component: IndeterminateCircularSmallProgress, title: metaData['indeterminate-circular-small-progress'].title },
  { Component: CircularCustomSizeProgress, title: metaData['circular-custom-size-progress'].title },
  { Component: CompleteProgress, title: metaData['complete-progress'].title },
  { Component: DeterminateCircularProgress, title: metaData['determinate-circular-progress'].title },
  { Component: DeterminateCircularSmallProgress, title: metaData['determinate-circular-small-progress'].title },
  { Component: DeterminateProgress, title: metaData['determinate-progress'].title },
  { Component: DeterminateNoLabelProgress, title: metaData['determinate-no-label-progress'].title },
  { Component: ErrorProgress, title: metaData['error-progress'].title },
  { Component: CompleteCircularProgress, title: metaData['complete-circular-progress'].title },
  { Component: ErrorCircularProgress, title: metaData['error-circular-progress'].title },
];

const indeterminateLinear = [
  {
    Component: IndeterminateProgress,
    title: metaData['indeterminate-progress'].title,
    id: `#indeterminate-linear-progress`,
  },
  {
    Component: IndeterminateNoLabelProgress,
    title: metaData['indeterminate-no-label-progress'].title,
    id: `#no-label-indeterminate-linear-progress`,
  },
];

const determinateLinear = [
  { Component: DeterminateProgress, title: metaData['determinate-progress'].title },
  { Component: DeterminateNoLabelProgress, title: metaData['determinate-no-label-progress'].title },
];

const indeterminateCircular = [
  { Component: IndeterminateCircularProgress, title: metaData['indeterminate-circular-progress'].title },
  { Component: IndeterminateCircularSmallProgress, title: metaData['indeterminate-circular-small-progress'].title },
];

const determinateCircular = [
  { Component: DeterminateCircularProgress, title: metaData['determinate-circular-progress'].title },
  { Component: DeterminateCircularSmallProgress, title: metaData['determinate-circular-small-progress'].title },
  { Component: CircularCustomSizeProgress, title: metaData['circular-custom-size-progress'].title },
];

jest.setTimeout(30000);

describe('Progress examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('Indeterminate Linear Progress', () => {
    indeterminateLinear.forEach(({ Component, title, id }) => {
      it(`${title} should start and display loading message when the start button is clicked`, async () => {
        const { container } = render(<Component />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        const progressElement = container.querySelector(id);
        await waitFor(() => {
          expect(progressElement).toBeInTheDocument();
          const loadingMessage = screen.getByText('Loading...');
          expect(loadingMessage).toBeInTheDocument();
          expect(progressElement).toHaveStyle('animation-play-state: running;');
        });
      });

      it(`${title} should reset when the reset button is clicked`, async () => {
        const { container } = render(<Component />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        const progressElement = container.querySelector(id);
        expect(progressElement).not.toBeInTheDocument();
        const loadingMessage = screen.queryByText('Loading...');
        expect(loadingMessage).not.toBeInTheDocument();
      });

      it(`${title} should pause when the pause button is clicked`, async () => {
        const { container } = render(<Component />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        const pauseButton = screen.getByText('Pause');
        fireEvent.click(pauseButton);
        const progressElement = container.querySelector(id);
        expect(progressElement).toHaveStyle('animation-play-state: paused;');
        const playButton = screen.getByText('Play');
        expect(playButton).toBeInTheDocument();
        fireEvent.click(playButton);
        expect(progressElement).toHaveStyle('animation-play-state: running;');
      });

      it(`${title} should resume when the pause button is clicked`, async () => {
        const { container } = render(<Component />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        const pauseButton = screen.getByText('Pause');
        fireEvent.click(pauseButton);
        const progressElement = container.querySelector(id);
        expect(progressElement).toHaveStyle('animation-play-state: paused;');
        expect(pauseButton).toHaveTextContent('Play');
        fireEvent.click(pauseButton);
        expect(progressElement).toHaveStyle('animation-play-state: running;');
      });
    });
  });

  // START GENAI@COPILOT helped a lot

  // Determinate Linear
  describe('Determinate Linear Progress', () => {
    determinateLinear.forEach(({ Component, title }) => {
      it(`${title} should start and increment progress value when the start button is clicked`, async () => {
        render(<Component />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        const progressElement = screen.getByRole('progressbar');
        await waitFor(
          () => {
            expect(progressElement).toHaveAttribute('value', '100');
          },
          { timeout: 5500 }
        );
        const loadingMessage = screen.getByText('Loading complete');
        expect(loadingMessage).toBeInTheDocument();
      });

      it(`${title} should reset progress value when the reset button is clicked`, async () => {
        render(<Component />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        const progressElement = screen.getByRole('progressbar');
        await waitFor(() => {
          expect(progressElement).toHaveAttribute('value', '0');
        });
        const loadingMessage = screen.queryByText('Loading...');
        expect(loadingMessage).not.toBeInTheDocument();
      });
    });
  });

  // Indeterminate Circular
  describe('Indeterminate Circular Progress', () => {
    indeterminateCircular.forEach(({ Component, title }) => {
      test(`${title} IndeterminateCircularProgress component`, async () => {
        render(<Component />);

        // Test if Start button is present and clickable
        const startButton = screen.getByText('Start');
        expect(startButton).toBeInTheDocument();
        fireEvent.click(startButton);

        // Test if ProgressCircular appears after clicking Start
        await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Loading...'));

        // Test if Reset button is present and clickable
        const resetButton = screen.getByText('Reset');
        expect(resetButton).toBeInTheDocument();
        fireEvent.click(resetButton);

        // Test if ProgressCircular disappears after clicking Reset
        expect(screen.queryByRole('alert')).toBeNull();

        // Test if Pause button is present and clickable
        const pauseButton = screen.getByRole('button', { name: /pause/i });
        fireEvent.click(pauseButton);

        // Test if Pause button changes to Play after being clicked
        const playButton = screen.getByRole('button', { name: /play/i });
        expect(playButton).toBeInTheDocument();
      }, 10000);

      // END GENAI@COPILOT
    });
  });

  // Determinate Circular
  describe('Determinate Circular Progress', () => {
    determinateCircular.forEach(({ Component, title }) => {
      it(`${title} should start and increment progress value when the start button is clicked`, async () => {
        render(<Component />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        const progressElement = screen.getByRole('progressbar');
        await waitFor(
          () => {
            expect(progressElement).toHaveAttribute('aria-valuenow', '100');
            const loadingMessage = screen.getByText('Loading complete');
            expect(loadingMessage).toBeInTheDocument();
          },
          { timeout: 5500 }
        );
      }, 10000);

      it(`${title} should reset progress value when the reset button is clicked`, async () => {
        render(<Component />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        const progressElement = screen.getByRole('progressbar');
        await waitFor(
          () => {
            expect(progressElement).toHaveAttribute('aria-valuenow', '0');
          },
          { timeout: 5500 }
        );
        const loadingMessage = screen.queryByText('Loading...');
        expect(loadingMessage).not.toBeInTheDocument();
      }, 10000);

      // START GENAI@CHATGPT4
      it(`${title} should reset count when Reset button is clicked immediately after Start button`, () => {
        jest.useFakeTimers();
        const { getByText } = render(<Component />);

        // Simulate clicking the Start button to start counting
        fireEvent.click(getByText('Start'));

        // Simulate clicking the Reset button immediately after
        fireEvent.click(getByText('Reset'));

        // Check that count was reset
        expect(getByText('0%')).toBeInTheDocument();

        // Advance timers to simulate more time passing
        jest.advanceTimersByTime(5000);

        // Check that the count is still zero, indicating that counting has indeed stopped
        expect(getByText('0%')).toBeInTheDocument();
      });
      // END GENAI@CHATGPT4
    });
  });
});
