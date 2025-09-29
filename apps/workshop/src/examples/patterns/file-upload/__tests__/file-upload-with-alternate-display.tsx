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
import { act, fireEvent, render, within, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import FileUploadWithAlternateDisplay from '../file-upload-with-alternate-display.tsx';
import { mockUpload } from '../shared/mock-upload.ts';

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

jest.mock('../shared/mock-upload', () => ({
  mockUpload: jest.fn(),
}));

describe('ManualFileUploadFileCardAlternative', () => {
  const mockUploadFn = mockUpload as jest.MockedFunction<typeof mockUpload>;
  it('should render correctly', async () => {
    const { container } = render(<FileUploadWithAlternateDisplay />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  it('should trigger file input when Select file(s) button is clicked', async () => {
    const { container } = render(<FileUploadWithAlternateDisplay />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const selectButtons = within(container).getAllByText('Select file(s)');
    const selectButton = selectButtons.find(button => !button.closest('dialog')) as HTMLButtonElement;

    const clickSpy = jest.spyOn(fileInput, 'click');

    fireEvent.click(selectButton);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should close the queue dialog when the last file is deleted from queue', async () => {
    mockUploadFn.mockResolvedValue();
    const { container } = render(<FileUploadWithAlternateDisplay />);

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
    const { container } = render(<FileUploadWithAlternateDisplay />);

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
    const { container } = render(<FileUploadWithAlternateDisplay />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const supportedFile = new File(['test content'], 'test.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [supportedFile] } });
    });

    // Wait for file to be processed
    await waitFor(() => {
      const dialog = container.querySelector('dialog') as HTMLDialogElement;
      expect(dialog).toHaveAttribute('open');
    });

    const uploadButton = within(container).getByText('Upload') as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(uploadButton);
    });

    const successMessage = within(container).getByText('Files uploaded successfully.');
    expect(successMessage).toBeInTheDocument();
  });

  it('should sort files by all sortable columns when clicking sort buttons', async () => {
    jest.useFakeTimers();
    const { container } = render(<FileUploadWithAlternateDisplay />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

    // Create files with different names, types, and upload times to test all sorting
    const fileA = new File(['content a'], 'zebra.png', { type: 'image/png' });
    const fileB = new File(['content b'], 'apple.pdf', { type: 'application/pdf' });
    const fileC = new File(['content c'], 'banana.jpg', { type: 'image/jpeg' });

    // Set up mock to succeed for first two files, fail for third
    mockUploadFn
      .mockResolvedValueOnce() // zebra.png succeeds
      .mockResolvedValueOnce() // apple.pdf succeeds
      .mockRejectedValueOnce(new Error('Upload failed')); // banana.jpg fails

    // Upload first file
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [fileA] } });
    });

    let uploadButton = within(container).getByText('Upload') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(uploadButton);
    });

    // Fast forward to complete first upload
    await act(async () => {
      jest.runAllTimers();
    });

    // Advance time to ensure different upload dates
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Upload second file (with slight delay to ensure different upload times)
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [fileB] } });
    });

    uploadButton = within(container).getByText('Upload') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(uploadButton);
    });

    // Fast forward to complete second upload
    await act(async () => {
      jest.runAllTimers();
    });

    // Advance time again for third upload
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Upload third file (will fail)
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [fileC] } });
    });

    uploadButton = within(container).getByText('Upload') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(uploadButton);
    });

    // Fast forward to complete third upload (which fails)
    await act(async () => {
      jest.runAllTimers();
    });

    // Wait for all files to be processed and table to appear
    await waitFor(() => {
      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(3);
    });

    // Test File Name sorting
    let fileNameCells = container.querySelectorAll('tbody tr td:first-child');
    // Files should initially be in upload order (zebra.png, apple.pdf, banana.jpg)
    expect(fileNameCells[0]).toHaveTextContent('zebra.png');
    expect(fileNameCells[1]).toHaveTextContent('apple.pdf');
    expect(fileNameCells[2]).toHaveTextContent('banana.jpg');

    const fileNameSortButton = within(container).getByRole('button', { name: /File name/ });

    await act(async () => {
      fireEvent.click(fileNameSortButton);
    });

    // After first click, files should be sorted ascending (apple.pdf, banana.jpg, zebra.png)
    fileNameCells = container.querySelectorAll('tbody tr td:first-child');
    expect(fileNameCells[0]).toHaveTextContent('apple.pdf');
    expect(fileNameCells[1]).toHaveTextContent('banana.jpg');
    expect(fileNameCells[2]).toHaveTextContent('zebra.png');

    await act(async () => {
      fireEvent.click(fileNameSortButton);
    });

    // After second click, files should be sorted descending (zebra.png, banana.jpg, apple.pdf)
    fileNameCells = container.querySelectorAll('tbody tr td:first-child');
    expect(fileNameCells[0]).toHaveTextContent('zebra.png');
    expect(fileNameCells[1]).toHaveTextContent('banana.jpg');
    expect(fileNameCells[2]).toHaveTextContent('apple.pdf');

    // Test File Type sorting
    const fileTypeSortButton = within(container).getByRole('button', { name: /File type/ });

    await act(async () => {
      fireEvent.click(fileTypeSortButton);
    });

    // After first click, files should be sorted by type ascending (application/pdf, image/jpeg, image/png)
    let fileTypeCells = container.querySelectorAll('tbody tr td:nth-child(2)');
    expect(fileTypeCells[0]).toHaveTextContent('application/pdf');
    expect(fileTypeCells[1]).toHaveTextContent('image/jpeg');
    expect(fileTypeCells[2]).toHaveTextContent('image/png');

    await act(async () => {
      fireEvent.click(fileTypeSortButton);
    });

    // After second click, files should be sorted by type descending (image/png, image/jpeg, application/pdf)
    fileTypeCells = container.querySelectorAll('tbody tr td:nth-child(2)');
    expect(fileTypeCells[0]).toHaveTextContent('image/png');
    expect(fileTypeCells[1]).toHaveTextContent('image/jpeg');
    expect(fileTypeCells[2]).toHaveTextContent('application/pdf');

    // Test Status sorting
    const statusSortButton = within(container).getByRole('button', { name: /Status/ });

    await act(async () => {
      fireEvent.click(statusSortButton);
    });

    // After first click, files should be sorted by status ascending (uploading=1, uploaded=2, error=3)
    // Since all uploads are complete, we should have uploaded files first, then errored files
    let statusCells = container.querySelectorAll('tbody tr td:nth-child(3)');
    // Status column contains icons and screen reader text, so we check for the screen reader text
    expect(within(statusCells[0] as HTMLElement).queryByText('Success')).toBeInTheDocument();
    expect(within(statusCells[1] as HTMLElement).queryByText('Success')).toBeInTheDocument();
    expect(within(statusCells[2] as HTMLElement).queryByText('Error')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(statusSortButton);
    });

    // After second click, files should be sorted by status descending (error=3, uploaded=2, uploading=1)
    statusCells = container.querySelectorAll('tbody tr td:nth-child(3)');
    expect(within(statusCells[0] as HTMLElement).queryByText('Error')).toBeInTheDocument();
    expect(within(statusCells[1] as HTMLElement).queryByText('Success')).toBeInTheDocument();
    expect(within(statusCells[2] as HTMLElement).queryByText('Success')).toBeInTheDocument();

    // Test Upload Date sorting
    const uploadDateSortButton = within(container).getByRole('button', { name: /Upload date/ });

    await act(async () => {
      fireEvent.click(uploadDateSortButton);
    });

    // After first click, files should be sorted by upload date ascending (earliest first)
    // Since zebra.png was uploaded first, it should be first
    fileNameCells = container.querySelectorAll('tbody tr td:first-child');
    expect(fileNameCells[0]).toHaveTextContent('zebra.png');

    await act(async () => {
      fireEvent.click(uploadDateSortButton);
    });

    // After second click, files should be sorted by upload date descending (latest first)
    // Since banana.jpg was uploaded last, it should be first
    fileNameCells = container.querySelectorAll('tbody tr td:first-child');
    expect(fileNameCells[0]).toHaveTextContent('banana.jpg');

    jest.useRealTimers();
  });
});
