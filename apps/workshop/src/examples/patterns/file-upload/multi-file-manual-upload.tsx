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
  VisaDocumentJpgLow,
  VisaCloseTiny,
  VisaDocumentXlsLow,
} from '@visa/nova-icons-react';

import { UploadCard } from './shared/upload-card';
import { UploadDialog } from './shared/upload-dialog';
import { UploadFile } from './shared/types';
import { mockUpload } from './shared/mock-upload';

import { useRef, useState } from 'react';
import { FileStatusButton } from './shared/file-status-button';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = [
  { type: 'image/jpeg', icon: <VisaDocumentJpgLow /> },
  { type: 'application/pdf', icon: <VisaDocumentPdfLow /> },
  { type: 'application/msword', icon: <VisaDocumentLow /> },
  { type: 'application/vnd.ms-excel', icon: <VisaDocumentXlsLow /> },
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

const uploadQueueDialogId = 'manual-upload-dialog';
const UPLOAD_DIALOG_TITLE = 'Upload files';
const UPLOAD_DIALOG_DESCRIPTION =
  'Upload one or more files, up to 10 MB each. Accepted file types are .jpg, .pdf, .docx, and .xlsx. Only files that meet these requirements will be uploaded.';

const MultiFileManualUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const retryRefs = useRef<Record<string, (element: HTMLDivElement | null) => void>>({});
  const retryElements = useRef<Record<string, HTMLDivElement | null>>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [queuedFiles, setQueuedFiles] = useState<UploadFile[]>([]);
  const [showSectionMessage, setShowSectionMessage] = useState(true);
  const [showFlag, setShowFlag] = useState(true);

  const handleSelectFilesClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);

      const uploadFiles: UploadFile[] = filesArray.map(f => validateFile(f));

      setQueuedFiles((prevQueuedFiles: UploadFile[]) => {
        const newlyQueuedFiles = uploadFiles
          // if we're already tracking the file, remove the new duplicate
          .filter(file => !prevQueuedFiles.some(f => f.id === file.id));

        return [...prevQueuedFiles, ...newlyQueuedFiles];
      });
    }
  };

  const handleUploadClick = () => {
    handleCloseDialog();

    setUploadedFiles((oldUploadFiles: UploadFile[]) => {
      const newUploadFiles = queuedFiles
        // if we're already tracking the file, remove the new duplicate
        .filter(file => !oldUploadFiles.some(f => f.id === file.id))
        .map(f => ({
          ...f,
          uploading: true,
        }));

      newUploadFiles.forEach(newFileItem => {
        // mock an api request to simulate a file upload.
        mockUpload(newFileItem, {
          maxFileSize: MAX_FILE_SIZE,
          acceptedFileTypes: ACCEPTED_FILE_TYPES.map(t => t.type),
        })
          .then(() => {
            setUploadedFiles(oldUploadFiles =>
              oldUploadFiles.map(f =>
                f.file === newFileItem.file ? { ...f, uploading: false, uploaded: true, error: undefined } : f
              )
            );
            setShowFlag(true);
          })
          .catch((err: Error) => {
            setUploadedFiles(oldUploadFiles =>
              oldUploadFiles.map(f =>
                f.file === newFileItem.file ? { ...f, uploading: false, uploaded: false, error: err.message } : f
              )
            );
            setShowSectionMessage(true);
          });
      });

      return [...oldUploadFiles, ...newUploadFiles];
    });
  };

  const handleDeleteFile = (fileToDelete: UploadFile) => {
    setUploadedFiles(files => files.filter(file => file.id !== fileToDelete.id));
    if (fileToDelete.error) {
      setShowFlag(false);
    }
  };

  const handleDeleteQueuedFile = (fileToDelete: UploadFile) => {
    setQueuedFiles(files => files.filter(file => file.id !== fileToDelete.id));
  };

  const handleRetryAll = () => {
    erroredFiles.forEach(f => handleRetryFile(f));
  };

  const handleRetryFile = (fileToRetry: UploadFile) => {
    const validatedFile = validateFile(fileToRetry.file);

    // set the file's status to uploading and clear error
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

  const erroredFiles = uploadedFiles.filter(f => !!f.error);
  const uploadingFiles = uploadedFiles.filter(f => !!f.uploading);

  const allFilesUploaded =
    uploadedFiles.length > 0 && uploadedFiles.filter(f => f.uploaded).length === uploadedFiles.length;

  // create callback refs for errored files
  erroredFiles.forEach(f => {
    if (!retryRefs.current[f.id]) {
      retryRefs.current[f.id] = (element: HTMLDivElement | null) => {
        retryElements.current[f.id] = element;
      };
    }
  });

  const handleSectionMessageClose = () => {
    setShowSectionMessage(false);
  };

  const handleFlagClose = () => {
    setShowFlag(false);
  };

  const handleCloseDialog = () => {
    setQueuedFiles([]);
  };

  return (
    <Utility vFlex vFlexCol vGap={25}>
      <Utility vFlex vFlexCol vGap={25} style={{ maxWidth: '400px' }}>
        <Utility vFlex vFlexCol vGap={16}>
          <Utility vFlex vFlexCol vGap={8}>
            <Typography tag="h4" variant="subtitle-1">
              Upload files
            </Typography>
            <Typography variant="label-small">
              Choose one or more files to upload, up to 10MB each. Accepted file types are jpg, pdf, docx, and xlsx.
            </Typography>
          </Utility>
          <ScreenReader<'input'>
            tag={'input'}
            type="file"
            hidden
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
          ></ScreenReader>
          <UtilityFragment vAlignSelf="start">
            <Button colorScheme="secondary" onClick={handleSelectFilesClick}>
              Select file(s)
            </Button>
          </UtilityFragment>
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
          {!!erroredFiles.length && showSectionMessage && (
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
                {' '}
                <VisaCloseTiny />{' '}
              </SectionMessageCloseButton>
            </SectionMessage>
          )}
        </Utility>
        {!!uploadedFiles.length && (
          <Utility tag="ul" vFlex vFlexCol vGap={8}>
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
      <UploadDialog
        isOpen={queuedFiles.length > 0}
        title={UPLOAD_DIALOG_TITLE}
        description={UPLOAD_DIALOG_DESCRIPTION}
        queuedFiles={queuedFiles}
        onSelectFiles={handleSelectFilesClick}
        onUpload={handleUploadClick}
        onClose={handleCloseDialog}
        onDeleteQueuedFile={handleDeleteQueuedFile}
        dialogId={uploadQueueDialogId}
      />
    </Utility>
  );
};

export default MultiFileManualUpload;
