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
import { VisaCheckmarkLow, VisaCopyLow } from '@visa/nova-icons-react';
import { Button, Typography } from '@visa/nova-react';
import cn from 'clsx';
import { Highlight, themes } from 'prism-react-renderer';
import { useState } from 'react';
import ReactGA from 'react-ga4';
import { useTheme } from '../../providers/theme-provider';
import Styles from './styles.module.scss';

type CodeProperties = {
  className?: string;
  code?: string;
  deprecated?: boolean;
  docName?: string;
  exampleName?: string;
  inPanel?: boolean;
  language?: string;
};

const Code = ({
  className = '',
  code = '',
  deprecated,
  docName = '',
  exampleName = '',
  inPanel,
  language = 'typescript',
  ...remainingProps
}: CodeProperties) => {
  const { darkMode } = useTheme();

  const formattedCode = code.trim();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string, example: string, component: string) => {
    if (!copied) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      ReactGA.event({
        category: 'Nova React',
        action: 'copy_code',
        label: component + '-' + example.split(' ').join('-'),
      });
    }
  };

  return (
    <Highlight
      code={formattedCode}
      language={language}
      theme={darkMode ? themes.vsDark : themes.github}
      {...remainingProps}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <div className={Styles.codeContainer}>
          <div className={Styles.copyButtonContainer}>
            <Button
              aria-label={`Copy code snippet of ${exampleName}`}
              buttonSize="small"
              className={cn(Styles.copyButton, copied && Styles.copied)}
              colorScheme="tertiary"
              iconButton
              onClick={() => copyToClipboard(formattedCode, exampleName, docName)}
            >
              {copied ? <VisaCheckmarkLow /> : <VisaCopyLow />}
              <Typography tag="span" variant="label-active">
                Copied!
              </Typography>
            </Button>
          </div>
          <div className={cn(Styles.overflowContainer, inPanel && Styles.codePanelSnippet)}>
            <pre
              className={cn(Styles.codeSnippet, className)}
              style={{ ...style, textDecoration: deprecated ? 'line-through' : 'inherit' }}
            >
              {tokens.map((line, i) => (
                <span {...getLineProps({ key: i, line })} key={i}>
                  <span
                    style={{
                      display: 'inline-block',
                      opacity: '0.3',
                      userSelect: 'none',
                      width: '2em',
                    }}
                  >
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ key, token })} key={key} />
                  ))}
                </span>
              ))}
            </pre>
          </div>
        </div>
      )}
    </Highlight>
  );
};

export default Code;
