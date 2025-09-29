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
import { act, render, fireEvent, within, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import MultiFileManualUpload from '../multi-file-manual-upload.tsx';

import { mockUpload } from '../shared/mock-upload.ts';

jest.mock('../shared/mock-upload', () => ({
  mockUpload: jest.fn(),
}));

/**
 * Workaround until jest testing environment supports HTMLDialogElement.
 * Issue: https://github.com/jsdom/jsdom/issues/3294
 */
HTMLDialogElement.prototype.show = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});
HTMLDialogElement.prototype.showModal = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});
HTMLDialogElement.prototype.close = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = false;
});

describe('ManualFileUpload', () => {
  const mockUploadFn = mockUpload as jest.MockedFunction<typeof mockUpload>;

  it('should render correctly', async () => {
    const { container } = render(<MultiFileManualUpload />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  it('should trigger file input when Select file(s) button is clicked', () => {
    const { container } = render(<MultiFileManualUpload />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const selectButtons = within(container).getAllByText('Select file(s)');
    // there are 2 `Select file(s)` buttons, one in a dialog and one outside of it.
    // we need the non-dialog button here.
    const selectButton = selectButtons.find(button => !button.closest('dialog')) as HTMLButtonElement;

    const clickSpy = jest.spyOn(fileInput, 'click');

    fireEvent.click(selectButton);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should close the queue dialog when the last file is deleted from queue', async () => {
    mockUploadFn.mockResolvedValue();
    const { container } = render(<MultiFileManualUpload />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

    // Check if dialog exists before file change
    const dialog = container.querySelector('dialog') as HTMLDialogElement;
    expect(dialog).toBeTruthy();
    expect(dialog).not.toHaveAttribute('open');

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    // Wait for the dialog to open
    await waitFor(() => {
      expect(dialog).toHaveAttribute('open');
    });

    const deleteButton = within(dialog).getByLabelText(/^Delete/) as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Wait for the dialog to close
    await waitFor(() => {
      expect(dialog).not.toHaveAttribute('open');
    });
  });

  it('should show error message for unsupported file types and allow retry + delete', async () => {
    jest.useFakeTimers();

    // Set up initial upload to fail
    mockUploadFn.mockRejectedValue(new Error('File type not accepted.'));
    const { container } = render(<MultiFileManualUpload />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const unsupportedFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [unsupportedFile] } });
    });

    const uploadButton = within(container).getByText('Upload') as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(uploadButton);
    });

    // Fast forward to complete the initial upload
    await act(async () => {
      jest.runAllTimers();
    });

    // Verify error message appears
    const errorMessage = within(container).getByText('The following files have errors:');
    const errorList = within(errorMessage.parentElement as HTMLElement).getByRole('list');
    expect(within(errorList).getByText('test.txt')).toBeInTheDocument();

    // Find the retry button on the upload card
    const retryButton = within(container).getByLabelText(/^Retry upload/) as HTMLButtonElement;
    expect(retryButton).toBeInTheDocument();

    // Clear previous mock calls and set up retry to also fail
    mockUploadFn.mockClear();
    mockUploadFn.mockRejectedValue(new Error('File type not accepted.'));

    await act(async () => {
      fireEvent.click(retryButton);
    });

    // Verify that the mock upload function was called again
    expect(mockUploadFn).toHaveBeenCalledTimes(1);

    // Fast forward to complete the retry
    await act(async () => {
      jest.runAllTimers();
    });

    // Wait for the retry to complete and verify error state persists
    await waitFor(() => {
      const retryButtonAfterError = within(container).queryByLabelText(/^Retry upload/);
      expect(retryButtonAfterError).toBeInTheDocument();
    });

    // Find and click the delete button to remove the errored file
    const deleteButton = within(container).getByLabelText(/^Delete/) as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Verify the file card is no longer on the page
    await waitFor(() => {
      const fileCard = within(container).queryByText('test.txt');
      expect(fileCard).not.toBeInTheDocument();

      // Also verify the retry button is gone
      const retryButtonAfterDelete = within(container).queryByLabelText(/^Retry upload/);
      expect(retryButtonAfterDelete).not.toBeInTheDocument();

      // And verify the delete button is gone
      const deleteButtonAfterDelete = within(container).queryByLabelText(/^Delete/);
      expect(deleteButtonAfterDelete).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('should show success flag when all files are uploaded successfully', async () => {
    mockUploadFn.mockResolvedValue();
    const { container } = render(<MultiFileManualUpload />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const supportedFile = new File(['test content'], 'test.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [supportedFile] } });
    });

    const uploadButton = within(container).getByText('Upload') as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(uploadButton);
    });

    const successMessage = within(container).getByText('Files uploaded successfully.');
    expect(successMessage).toBeInTheDocument();
  });
});
