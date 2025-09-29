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
import { act, fireEvent, render, screen, within, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import SingleFileUpload, { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from '../single-file-upload.tsx';

import { mockUpload } from '../shared/mock-upload.ts';

jest.mock('../shared/mock-upload', () => ({
  mockUpload: jest.fn(),
}));

describe('SingleFileUpload', () => {
  const mockUploadFn = mockUpload as jest.MockedFunction<typeof mockUpload>;

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    const { container } = render(<SingleFileUpload />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  it('should trigger file input when Select file button is clicked', () => {
    const { container } = render(<SingleFileUpload />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const selectButton = screen.getByText('Select file');

    const clickSpy = jest.spyOn(fileInput, 'click');

    fireEvent.click(selectButton);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should process files when files are selected via input', async () => {
    jest.useFakeTimers();
    mockUploadFn.mockResolvedValue();

    const { container } = render(<SingleFileUpload />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    expect(mockUploadFn).toHaveBeenCalledWith(
      expect.objectContaining({
        file: expect.objectContaining({
          name: 'test.pdf',
          type: 'application/pdf',
        }),
      }),
      {
        maxFileSize: MAX_FILE_SIZE,
        acceptedFileTypes: ACCEPTED_FILE_TYPES.map(t => t.type),
      }
    );
  });

  it('should retry file upload when retry button is clicked', async () => {
    jest.useFakeTimers();
    mockUploadFn.mockRejectedValueOnce(new Error('Upload failed')).mockResolvedValueOnce();

    const { container } = render(<SingleFileUpload />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const retryButton = await within(container).findByLabelText(/^Retry upload/);

    fireEvent.click(retryButton);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    const fileListItem = within(container).getByRole('listitem');
    expect(within(fileListItem).getByLabelText(/^Success/)).toBeInTheDocument();
  });
});
