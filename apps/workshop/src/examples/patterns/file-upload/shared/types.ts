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
import React from 'react';

export type UploadFile = {
  file: File;
  id: string;
  icon?: React.ReactElement;
  uploaded?: boolean;
  uploading?: boolean;
  error?: string;
  uploadDate?: Date;
};

export type UploadDialogProps = {
  isOpen: boolean;
  title?: string;
  description: string;
  queuedFiles: UploadFile[];
  onSelectFiles: () => void;
  onUpload: () => void;
  onClose: () => void;
  onDeleteQueuedFile: (file: UploadFile) => void;
  dialogId?: string;
};

export type UploadCardProps = {
  file: UploadFile;
  renderActions: () => React.ReactNode;
};

export type UploadRowProps = {
  file: UploadFile;
  retryRef: React.RefObject<HTMLDivElement> | ((element: HTMLDivElement | null) => void);
  onRetry: () => void;
  onDelete: () => void;
};

export interface FileStatusButtonProps {
  uploadFile: UploadFile;
  onRetry: () => void;
}
