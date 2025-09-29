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

const SingleFileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<UploadFile | undefined>();
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
      const file = files[0];

      const uploadFile = validateFile(file);

      setUploadedFile({ ...uploadFile, uploading: true });

      mockUpload(uploadFile, {
        maxFileSize: MAX_FILE_SIZE,
        acceptedFileTypes: ACCEPTED_FILE_TYPES.map(t => t.type),
      })
        .then(() => {
          setUploadedFile(previousFile => {
            // make sure the file wasn't deleted while uploading
            if (!previousFile) {
              return undefined;
            }
            // make sure it's the same file that we started uploading
            if (previousFile.id !== uploadFile.id) {
              return previousFile;
            }
            return {
              ...uploadFile,
              uploading: false,
              uploaded: true,
              error: undefined,
            };
          });
          setShowSectionMessage(true);
        })
        .catch((err: Error) => {
          setUploadedFile(previousFile => {
            // make sure the file wasn't deleted while uploading
            if (!previousFile) {
              return undefined;
            }
            // make sure it's the same file that we started uploading
            if (previousFile.id !== uploadFile.id) {
              return previousFile;
            }
            return {
              ...uploadFile,
              uploading: false,
              uploaded: false,
              error: err.message,
            };
          });
          setShowSectionMessage(true);
        });
    }
  };

  const handleDeleteFile = (fileToDelete: UploadFile) => {
    setUploadedFile(undefined);

    if (fileToDelete.error) {
      setShowFlag(false);
    }
  };

  const handleRetryFile = (fileToRetry: UploadFile) => {
    const validatedFile = validateFile(fileToRetry.file);

    setUploadedFile({ ...validatedFile, uploading: true });
    setShowSectionMessage(true);

    mockUpload(fileToRetry, {
      maxFileSize: MAX_FILE_SIZE,
      acceptedFileTypes: ACCEPTED_FILE_TYPES.map(t => t.type),
    })
      .then(() => {
        setUploadedFile(previousFile => {
          // make sure the file wasn't deleted while uploading
          if (!previousFile) {
            return undefined;
          }
          // make sure it's the same file that we started uploading
          if (previousFile.id !== fileToRetry.id) {
            return previousFile;
          }
          return {
            ...fileToRetry,
            uploading: false,
            uploaded: true,
            error: undefined,
          };
        });
        setShowFlag(true);
      })
      .catch((err: Error) => {
        setUploadedFile(previousFile => {
          // make sure the file wasn't deleted while uploading
          if (!previousFile) {
            return undefined;
          }
          // make sure it's the same file that we started uploading
          if (previousFile.id !== fileToRetry.id) {
            return previousFile;
          }
          return {
            ...fileToRetry,
            uploading: false,
            uploaded: false,
            error: err.message,
          };
        });
        setShowFlag(true);
      });
  };

  const handleSectionMessageClose = () => {
    setShowSectionMessage(false);
  };

  const handleFlagClose = () => {
    setShowFlag(false);
  };

  return (
    <Utility vFlex vFlexCol vGap={25}>
      <Utility vFlex vFlexCol vGap={25} style={{ maxWidth: '400px' }}>
        <Utility vFlex vFlexCol vGap={16}>
          <Utility vFlex vFlexCol vGap={8}>
            <Typography tag="h4" variant="subtitle-1">
              Upload file
            </Typography>
            <Typography variant="label-small">
              Choose one file to upload, up to 25 MB each. Accepted file types are .pdf, .png, and .jpg.
            </Typography>
          </Utility>
          <>
            <ScreenReader<'input'>
              tag={'input'}
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            ></ScreenReader>
            <UtilityFragment vAlignSelf="start">
              <Button colorScheme="secondary" onClick={handleSelectFilesClick}>
                Select file
              </Button>
            </UtilityFragment>
          </>
        </Utility>
        <div
          role="status"
          className={
            (!uploadedFile?.error && !uploadedFile?.uploading) || !showSectionMessage ? 'v-screen-reader' : undefined
          }
        >
          {uploadedFile?.uploading && <Typography variant="label">Upload in progress...</Typography>}
          {uploadedFile?.error && showSectionMessage && (
            <SectionMessage messageType="error">
              <MessageIcon messageType="error" />
              <UtilityFragment vPaddingLeft={2} vPaddingBottom={2}>
                <SectionMessageContent style={{ wordBreak: 'break-all' }}>
                  <Typography>File failed to upload.</Typography>
                </SectionMessageContent>
              </UtilityFragment>
              <SectionMessageCloseButton onClick={handleSectionMessageClose}>
                <VisaCloseTiny />
              </SectionMessageCloseButton>
            </SectionMessage>
          )}
        </div>
        {!!uploadedFile && (
          <Utility tag="ul">
            <UploadCard
              file={uploadedFile}
              renderActions={() => (
                <>
                  <FileStatusButton uploadFile={uploadedFile} onRetry={() => handleRetryFile(uploadedFile)} />
                  <Button
                    aria-label={`Delete ${uploadedFile.file.name}`}
                    colorScheme="tertiary"
                    iconButton
                    onClick={() => handleDeleteFile(uploadedFile)}
                  >
                    <VisaDeleteTiny />
                  </Button>
                </>
              )}
            />
          </Utility>
        )}
      </Utility>
      <Utility role="alert" vAlignSelf="end">
        {showFlag && uploadedFile && uploadedFile.uploaded && (
          <Flag messageType="success">
            <MessageIcon messageType="success" />
            <FlagContent className="v-pl-2 v-pb-2">File uploaded successfully.</FlagContent>
            <FlagCloseButton onClick={handleFlagClose}>
              <VisaCloseTiny />
            </FlagCloseButton>
          </Flag>
        )}
      </Utility>
    </Utility>
  );
};

export default SingleFileUpload;
