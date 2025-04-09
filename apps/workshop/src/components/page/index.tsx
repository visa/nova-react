/**
 *              Copyright (c) 2025 Visa, Inc.
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
import { Typography } from '@visa/nova-react';
import cn from 'clsx';
import { ElementType, ReactNode, forwardRef } from 'react';
import Styles from './styles.module.scss';

type DefaultProps = {
  centered?: boolean;
  children?: ReactNode;
  className?: string;
  tag?: ElementType;
};

// Page Header
export const PageHeader = ({ children, className, ...remainingProps }: DefaultProps) => {
  return (
    <header className={cn(Styles.pageHeader, className)} {...remainingProps}>
      {children}
    </header>
  );
};

export const PageContent = forwardRef<HTMLDivElement, DefaultProps>(
  ({ centered = false, children, className, tag: Tag = 'div', ...remainingProps }, ref) => (
    <Tag
      className={cn([Styles.pageContent, centered && Styles.pageContentCentered, className])}
      ref={ref}
      {...remainingProps}
    >
      {children}
    </Tag>
  )
);

PageContent.displayName = 'PageContent';

export const PageTitle = ({ children }: DefaultProps) => {
  return (
    <Typography className={Styles.pageTitle} tag="h1" variant="headline-1">
      {children}
    </Typography>
  );
};
