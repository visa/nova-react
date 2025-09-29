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
import {
  Button,
  Flag,
  FlagCloseButton,
  FlagContent,
  ScreenReader,
  SectionMessage,
  SectionMessageCloseButton,
  SectionMessageContent,
  Typography,
  Utility,
  UtilityFragment,
} from '@visa/nova-react';
import {
  MessageIcon,
  VisaDocumentPdfLow,
  VisaDeleteTiny,
  VisaDocumentLow,
  VisaDocumentPngLow,
  VisaDocumentJpgLow,
  VisaCloseTiny,
} from '@visa/nova-icons-react';
import { UploadFile } from './shared/types';
import { UploadCard } from './shared/upload-card';
import { FileStatusButton } from './shared/file-status-button';
import { mockUpload } from './shared/mock-upload';

import { useRef, useState } from 'react';

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
export const ACCEPTED_FILE_TYPES = [
  { type: 'application/pdf', icon: <VisaDocumentPdfLow /> },
  { type: 'image/png', icon: <VisaDocumentPngLow /> },
  { type: 'image/jpeg', icon: <VisaDocumentJpgLow /> },
];

const validateFile = (f: File): UploadFile => {
  let icon = undefined;
  const acceptedTypeObj = ACCEPTED_FILE_TYPES.find(t => t.type === f.type);
  if (!acceptedTypeObj) {
    icon = <VisaDocumentLow />;
  } else {
    icon = acceptedTypeObj.icon;
  }

  return {
    file: f,
    // create an `id` which is a combination of name + size (only alphanumeric, no spaces)
    // this will help with tracking and preventing duplicates
    id: `${f.name.replace(/[^a-zA-Z0-9-_]/g, '-')}-${f.size}`,
    icon,
  };
};

const MultiFileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const retryRefs = useRef<Record<string, (element: HTMLDivElement | null) => void>>({});
  const retryElements = useRef<Record<string, HTMLDivElement | null>>({});

  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [showSectionMessage, setShowSectionMessage] = useState(true);
  const [showFlag, setShowFlag] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (files: FileList) => {
    const filesArray = Array.from(files);

    const validatedFiles: UploadFile[] = filesArray.map(f => {
      return validateFile(f);
    });

    setUploadedFiles((prevValidatedFiles: UploadFile[]) => {
      const newlyValidatedFiles = validatedFiles
        // if we're already tracking the file, remove the new duplicate
        .filter(file => !prevValidatedFiles.some(f => f.id === file.id))
        .map(f => ({
          ...f,
          uploading: true,
        }));

      newlyValidatedFiles.forEach(newFileItem => {
        // mock a 5 second api request to simulate a file upload
        mockUpload(newFileItem, {
          maxFileSize: MAX_FILE_SIZE,
          acceptedFileTypes: ACCEPTED_FILE_TYPES.map(t => t.type),
        })
          .then(() => {
            setUploadedFiles(current =>
              current.map(f =>
                f.file === newFileItem.file ? { ...f, uploading: false, uploaded: true, error: undefined } : f
              )
            );
            setShowFlag(true);
          })
          .catch((err: Error) => {
            setUploadedFiles(current =>
              current.map(f =>
                f.file === newFileItem.file ? { ...f, uploading: false, uploaded: false, error: err.message } : f
              )
            );
            setShowSectionMessage(true);
          });
      });

      return [...prevValidatedFiles, ...newlyValidatedFiles];
    });
  };

  const handleSelectFilesClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const handleDeleteFile = (fileToDelete: UploadFile) => {
    setUploadedFiles(files => files.filter(file => file.id !== fileToDelete.id));
    if (fileToDelete.error) {
      setShowFlag(false);
    }
  };

  const handleRetryAll = () => {
    erroredFiles.forEach(f => handleRetryFile(f));
  };

  const handleRetryFile = (fileToRetry: UploadFile) => {
    const validatedFile = validateFile(fileToRetry.file);

    setUploadedFiles(files => files.map(f => (f.id === fileToRetry.id ? { ...validatedFile, uploading: true } : f)));
    setShowSectionMessage(true);

    mockUpload(fileToRetry, {
      maxFileSize: MAX_FILE_SIZE,
      acceptedFileTypes: ACCEPTED_FILE_TYPES.map(t => t.type),
    })
      .then(() => {
        setUploadedFiles(files =>
          files.map(f =>
            f.file.name === fileToRetry.file.name && f.file.size === fileToRetry.file.size
              ? { ...f, uploading: false, uploaded: true, error: undefined }
              : f
          )
        );

        setShowFlag(true);
      })
      .catch(err => {
        setUploadedFiles(files =>
          files.map(f =>
            f.file.name === fileToRetry.file.name && f.file.size === fileToRetry.file.size
              ? {
                  ...f,
                  uploading: false,
                  uploaded: false,
                  error: err?.message || 'Error: Failed to upload file to server.',
                }
              : f
          )
        );

        setShowSectionMessage(true);
      });
  };

  const handleSectionMessageClose = () => {
    setShowSectionMessage(false);
  };

  const handleFlagClose = () => {
    setShowFlag(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const erroredFiles = uploadedFiles.filter(f => !!f.error);
  const uploadingFiles = uploadedFiles.filter(f => !!f.uploading);
  const allFilesUploaded =
    uploadedFiles.length > 0 && uploadedFiles.filter(f => f.uploaded).length === uploadedFiles.length;

  // create callback refs for the retry buttons of errored files
  erroredFiles.forEach(f => {
    if (!retryRefs.current[f.id]) {
      retryRefs.current[f.id] = (element: HTMLDivElement | null) => {
        retryElements.current[f.id] = element;
      };
    }
  });

  return (
    <Utility vFlex vFlexCol vGap={25}>
      <Utility vFlex vFlexCol vGap={25} style={{ maxWidth: '400px' }}>
        <Utility vFlex vFlexCol vGap={16}>
          <Utility vFlex vFlexCol vGap={8}>
            <Typography tag="h4" variant="subtitle-1">
              Upload files
            </Typography>
            <Typography variant="label-small">
              Choose one or more files to upload, up to 25 MB each. Accepted file types are .pdf, .png, and .jpg.
            </Typography>
          </Utility>
          <Utility
            vFlex
            vFlexCol
            vJustifyContent="center"
            vAlignItems="center"
            vGap={8}
            style={{
              border: '1px solid var(--palette-default-active)',
              borderRadius: 'var(--theme-border-radius)',
              height: '158px',
              background: isDragging ? 'var(--palette-default-surface-highlight)' : 'initial',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <ScreenReader<'input'>
              tag="input"
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
            ></ScreenReader>
            <Typography>Drag and drop files or</Typography>
            <Button colorScheme="secondary" onClick={handleSelectFilesClick}>
              Select file(s)
            </Button>
          </Utility>
        </Utility>
        <Utility
          vFlex
          vFlexCol
          vGap={8}
          role="status"
          className={!uploadingFiles.length && !erroredFiles.length ? 'v-screen-reader' : undefined}
        >
          {!!uploadingFiles.length && (
            <Typography variant="label">{`Uploading ${uploadingFiles.length} file${uploadingFiles.length > 1 ? 's' : ''}...`}</Typography>
          )}
          {!!erroredFiles.length && !uploadingFiles.length && showSectionMessage && (
            <SectionMessage messageType="error">
              <MessageIcon messageType="error" />
              <UtilityFragment vPaddingLeft={2} vPaddingBottom={2}>
                <SectionMessageContent style={{ wordBreak: 'break-all' }}>
                  <Typography>The following files have errors:</Typography>
                  <UtilityFragment vPaddingLeft={20}>
                    <ul style={{ listStyle: 'initial' }}>
                      {erroredFiles.map(f => (
                        <li key={f.file.name + f.file.size}>
                          <Typography<'a'>
                            tag="a"
                            href="#"
                            onClick={e => {
                              e.preventDefault();
                              retryElements.current[f.id]?.focus();
                            }}
                          >
                            {f.file.name}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </UtilityFragment>
                  {erroredFiles.length > 1 && (
                    <UtilityFragment vMarginTop={8}>
                      <Button colorScheme="secondary" onClick={handleRetryAll}>
                        Retry all
                      </Button>
                    </UtilityFragment>
                  )}
                </SectionMessageContent>
              </UtilityFragment>
              <SectionMessageCloseButton onClick={handleSectionMessageClose}>
                <VisaCloseTiny />
              </SectionMessageCloseButton>
            </SectionMessage>
          )}
        </Utility>
        {!!uploadedFiles.length && (
          <Utility tag="ul" vFlex vFlexCol vGap={8} aria-label="Uploaded files">
            {uploadedFiles.map(uploadFile => (
              <UploadCard
                key={uploadFile.id}
                file={uploadFile}
                renderActions={() => (
                  <>
                    <FileStatusButton
                      ref={retryRefs.current[uploadFile.id]}
                      uploadFile={uploadFile}
                      onRetry={() => handleRetryFile(uploadFile)}
                    />
                    <Button
                      aria-label={`Delete ${uploadFile.file.name}`}
                      colorScheme="tertiary"
                      iconButton
                      onClick={() => handleDeleteFile(uploadFile)}
                    >
                      <VisaDeleteTiny />
                    </Button>
                  </>
                )}
              />
            ))}
          </Utility>
        )}
      </Utility>
      <Utility role="alert" vAlignSelf="end">
        {showFlag && allFilesUploaded && (
          <Flag messageType="success">
            <MessageIcon messageType="success" />
            <FlagContent className="v-pl-2 v-pb-2">Files uploaded successfully.</FlagContent>
            <FlagCloseButton onClick={handleFlagClose}>
              <VisaCloseTiny />
            </FlagCloseButton>
          </Flag>
        )}
      </Utility>
    </Utility>
  );
};

export default MultiFileUpload;
