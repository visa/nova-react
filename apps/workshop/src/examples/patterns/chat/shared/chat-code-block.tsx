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
import { Button, Typography } from '@visa/nova-react';
import cn from 'clsx';
import { Highlight, themes } from 'prism-react-renderer';
import { useState } from 'react';
import Styles from './chat-code-block-css.module.scss';
import { VisaCheckmarkTiny, VisaCopyTiny } from '@visa/nova-icons-react';

type CodeProperties = {
    className?: string;
    code?: string;
    deprecated?: boolean;
    exampleName?: string;
    language?: string;
};

const ChatCodeBlock = ({
    className = '',
    code = '',
    deprecated,
    exampleName = '',
    language = 'typescript',
    ...remainingProps
}: CodeProperties) => {

    const formattedCode = code.trim();
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        if (!copied) {
            navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);

        }
    };

    return (
        <Highlight
            code={formattedCode}
            language={language}
            theme={themes.github}
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
                            onClick={() => copyToClipboard(formattedCode)}
                        >
                            {copied ? <VisaCheckmarkTiny /> : <VisaCopyTiny />}
                            <Typography tag="span" variant="label-active">
                                Copied!
                            </Typography>
                        </Button>
                    </div>
                    <div className={cn(Styles.overflowContainer)}>
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

export default ChatCodeBlock;
