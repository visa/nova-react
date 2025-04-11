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
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { axe } from 'jest-axe';

import metaData from './meta.json';

import { CheckedDisabledSelectionChip } from './checked-disabled-selection-chip';
import { CompactRemovableAvatarChip } from './compact-removable-avatar-chip';
import { CompactRemovableChip } from './compact-removable-chip';
import { CompactRemovableIconChip } from './compact-removable-icon-chip';
import { DefaultRemovableChip } from './default-removable-chip';
import { DefaultSelectionChip } from './default-selection-chip';
import { DisabledRemovableChip } from './disabled-removable-chip';
import { DisabledSelectionChip } from './disabled-selection-chip';
import { MultiLineSelectionChip } from './multi-line-selection-chip';
import { RemovableAvatarChip } from './removable-avatar-chip';
import { RemovableGroupChip } from './removable-group-chip';
import { CompactRemovableGroupChip } from './compact-removable-group-chip';
import { RemovableIconChip } from './removable-icon-chip';
import { StaticChip } from './static-chip';
import { SelectedSelectionChip } from './selected-selection-chip';
import { SelectionGroupChip } from './selection-group-chip';

const examples = [
  { Component: CheckedDisabledSelectionChip, title: metaData['checked-disabled-selection-chip'].title },
  { Component: CompactRemovableAvatarChip, title: metaData['compact-removable-avatar-chip'].title },
  { Component: CompactRemovableChip, title: metaData['compact-removable-chip'].title },
  { Component: CompactRemovableIconChip, title: metaData['compact-removable-icon-chip'].title },
  { Component: DefaultRemovableChip, title: metaData['default-removable-chip'].title },
  { Component: DefaultSelectionChip, title: metaData['default-selection-chip'].title },
  { Component: DisabledRemovableChip, title: metaData['disabled-removable-chip'].title },
  { Component: DisabledSelectionChip, title: metaData['disabled-selection-chip'].title },
  { Component: MultiLineSelectionChip, title: metaData['multi-line-selection-chip'].title },
  { Component: RemovableAvatarChip, title: metaData['removable-avatar-chip'].title },
  { Component: RemovableGroupChip, title: metaData['removable-group-chip'].title },
  { Component: CompactRemovableGroupChip, title: metaData['compact-removable-group-chip'].title },
  { Component: RemovableIconChip, title: metaData['removable-icon-chip'].title },
  { Component: StaticChip, title: metaData['static-chip'].title },
  { Component: SelectedSelectionChip, title: metaData['selected-selection-chip'].title },
  { Component: SelectionGroupChip, title: metaData['selection-group-chip'].title },
];

describe('Chip examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('compact removable chip group', () => {
    it('should reset the chip state when the reset button is clicked', async () => {
      render(<CompactRemovableGroupChip />);

      // remove the first chip
      const clearButton = screen.getByLabelText('Clear Label 1');
      userEvent.click(clearButton);

      await waitFor(() => {
        expect(screen.queryByLabelText('Clear Label 1')).toBeNull();
      });

      // click the reset button
      const resetButton = screen.getByText('Reset');
      userEvent.click(resetButton);
      await waitFor(() => {});

      // verify that all initial chips are present
      const initialChips = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'];
      await waitFor(() => {
        initialChips.forEach((chip: string) => {
          expect(screen.getByText(chip)).toBeInTheDocument();
        });
      });
    });
    it('should reset the chip state when the reset button is clicked', async () => {
      render(<RemovableGroupChip />);

      // remove the first chip
      const clearButton = screen.getByLabelText('Clear Label 1');
      userEvent.click(clearButton);

      await waitFor(() => {
        expect(screen.queryByLabelText('Clear Label 1')).toBeNull();
      });

      // click the reset button
      const resetButton = screen.getByText('Reset');
      userEvent.click(resetButton);
      await waitFor(() => {});

      // verify that all initial chips are present
      const initialChips = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'];
      await waitFor(() => {
        initialChips.forEach((chip: string) => {
          expect(screen.getByText(chip)).toBeInTheDocument();
        });
      });
    });
  });
});
