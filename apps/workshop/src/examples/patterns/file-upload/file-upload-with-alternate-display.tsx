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
  TableWrapper,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from '@visa/nova-react';
import {
  MessageIcon,
  VisaDocumentPdfLow,
  VisaDocumentLow,
  VisaDocumentPngLow,
  VisaDocumentJpgLow,
  VisaCloseTiny,
  VisaSortableTiny,
  VisaSortAscendingTiny,
  VisaSortDescendingTiny,
} from '@visa/nova-icons-react';

import { CSSProperties, useRef, useState } from 'react';

import { UploadRow } from './shared/upload-row';
import { UploadDialog } from './shared/upload-dialog';
import { UploadFile } from './shared/types';
import { mockUpload } from './shared/mock-upload';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = [
  { type: 'application/pdf', icon: <VisaDocumentPdfLow /> },
  { type: 'image/png', icon: <VisaDocumentPngLow /> },
  { type: 'image/jpeg', icon: <VisaDocumentJpgLow /> },
];

const UPLOAD_DIALOG_TITLE = 'Upload Files';
const UPLOAD_DIALOG_DESCRIPTION =
  'Upload one or more files, up to 10 MB each. Accepted file types are .jpg, .pdf, .docx, and .xlsx. Only files that meet these requirements will be uploaded.';
const uploadQueueDialogId = 'manual-file-upload-alternative-dialog';

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

function getFileStatusRank(file: UploadFile): number {
  if (file.uploading) return 1;
  if (file.uploaded && !file.error) return 2;
  return 3;
}

const FileUploadWithAlternateDisplay = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const retryRefs = useRef<Record<string, (element: HTMLDivElement | null) => void>>({});
  const retryElements = useRef<Record<string, HTMLDivElement | null>>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [queuedFiles, setQueuedFiles] = useState<UploadFile[]>([]);
  const [showSectionMessage, setShowSectionMessage] = useState(true);
  const [showFlag, setShowFlag] = useState(true);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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
          uploadDate: new Date(),
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
    // Set the file's status to uploading and clear error
    setUploadedFiles(files =>
      files.map(f => (f.id === fileToRetry.id ? { ...fileToRetry, error: undefined, uploading: true } : f))
    );
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

  // create callback refs for the retry buttons of errored files
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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(dir => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedFiles = [...uploadedFiles].sort((a, b) => {
    if (sortColumn === 'name') {
      if (sortDirection === 'asc') {
        return a.file.name.localeCompare(b.file.name);
      } else {
        return b.file.name.localeCompare(a.file.name);
      }
    }

    if (sortColumn === 'type') {
      if (sortDirection === 'asc') {
        return a.file.type.localeCompare(b.file.type);
      } else {
        return b.file.type.localeCompare(a.file.type);
      }
    }

    if (sortColumn === 'status') {
      if (sortDirection === 'asc') {
        return getFileStatusRank(a) - getFileStatusRank(b);
      } else {
        return getFileStatusRank(b) - getFileStatusRank(a);
      }
    }

    if (sortColumn === 'uploadDate') {
      // sort by unix time of uploadDate
      const aDate = a.uploadDate ? a.uploadDate.getTime() : 0;
      const bDate = b.uploadDate ? b.uploadDate.getTime() : 0;
      return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
    }

    return 0;
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
              Choose one or more files to upload, up to 10MB each. Accepted file types are .jpg, .pdf, .docx, and .xlsx.
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
      </Utility>
      {!!sortedFiles.length && (
        <TableWrapper style={{ '--v-table-wrapper-inline-size': '1000px' } as CSSProperties}>
          <Table
            alternate
            style={
              {
                '--v-table-data-padding-block-default': '3px',
                '--v-table-header-padding-block': '4px',
                '--v-table-header-padding-inline': '7px',
                '--v-button-default-block-size': '30px',
              } as CSSProperties
            }
          >
            <ScreenReader tag="caption">
              File upload table showing file name, type, status, and upload date with sortable columns and action
              buttons for each file.
            </ScreenReader>
            <Thead>
              <Tr>
                <Th
                  scope="col"
                  {...(sortColumn === 'name' && {
                    'aria-sort': sortDirection === 'asc' ? 'ascending' : 'descending',
                  })}
                >
                  <UtilityFragment vFlex vAlignItems="center">
                    <Button colorScheme="tertiary" onClick={() => handleSort('name')}>
                      <Typography tag="span">File name</Typography>
                      {sortColumn !== 'name' && <VisaSortableTiny />}
                      {sortColumn === 'name' && sortDirection === 'asc' && <VisaSortAscendingTiny />}
                      {sortColumn === 'name' && sortDirection !== 'asc' && <VisaSortDescendingTiny />}
                    </Button>
                  </UtilityFragment>
                </Th>
                <Th
                  scope="col"
                  {...(sortColumn === 'type' && {
                    'aria-sort': sortDirection === 'asc' ? 'ascending' : 'descending',
                  })}
                >
                  <UtilityFragment vFlex vAlignItems="center" style={{ border: 'none' }}>
                    <Button colorScheme="tertiary" onClick={() => handleSort('type')}>
                      <Typography tag="span">File type</Typography>
                      {sortColumn !== 'type' && <VisaSortableTiny />}
                      {sortColumn === 'type' && sortDirection === 'asc' && <VisaSortAscendingTiny />}
                      {sortColumn === 'type' && sortDirection !== 'asc' && <VisaSortDescendingTiny />}
                    </Button>
                  </UtilityFragment>
                </Th>
                <Th
                  scope="col"
                  {...(sortColumn === 'status' && {
                    'aria-sort': sortDirection === 'asc' ? 'ascending' : 'descending',
                  })}
                >
                  <UtilityFragment vFlex vAlignItems="center" style={{ border: 'none' }}>
                    <Button colorScheme="tertiary" onClick={() => handleSort('status')}>
                      <Typography tag="span">Status</Typography>
                      {sortColumn !== 'status' && <VisaSortableTiny />}
                      {sortColumn === 'status' && sortDirection === 'asc' && <VisaSortAscendingTiny />}
                      {sortColumn === 'status' && sortDirection !== 'asc' && <VisaSortDescendingTiny />}
                    </Button>
                  </UtilityFragment>
                </Th>
                <Th
                  scope="col"
                  {...(sortColumn === 'uploadDate' && {
                    'aria-sort': sortDirection === 'asc' ? 'ascending' : 'descending',
                  })}
                >
                  <UtilityFragment vFlex vAlignItems="center" style={{ border: 'none' }}>
                    <Button colorScheme="tertiary" onClick={() => handleSort('uploadDate')}>
                      <Typography tag="span">Upload date</Typography>
                      {sortColumn !== 'uploadDate' && <VisaSortableTiny />}
                      {sortColumn === 'uploadDate' && sortDirection === 'asc' && <VisaSortAscendingTiny />}
                      {sortColumn === 'uploadDate' && sortDirection !== 'asc' && <VisaSortDescendingTiny />}
                    </Button>
                  </UtilityFragment>
                </Th>
                <Th scope="col">
                  <Utility vPaddingHorizontal={8}>
                    <Typography tag="span">Actions</Typography>
                  </Utility>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedFiles.map(file => (
                <UploadRow
                  key={file.id}
                  retryRef={retryRefs.current[file.id]}
                  file={file}
                  onRetry={() => handleRetryFile(file)}
                  onDelete={() => handleDeleteFile(file)}
                />
              ))}
            </Tbody>
          </Table>
        </TableWrapper>
      )}
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

export default FileUploadWithAlternateDisplay;
