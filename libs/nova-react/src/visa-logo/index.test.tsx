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
// START VSCODE@COPILOT with modifications
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import VisaLogo from '.';

describe('VisaLogo', () => {
    it('should render defaults correctly', async () => {
        const { container } = render(<VisaLogo />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
        expect(container).toMatchSnapshot();
        expect(container.firstElementChild?.getAttribute('class')).toBe('v-logo');
        expect(container.firstElementChild?.tagName).toBe('svg');
        expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should render with label correctly', async () => {
        const { container } = render(<VisaLogo aria-label="Visa Logo" />);
        expect(container).toMatchSnapshot();
        expect(container.firstElementChild?.getAttribute('class')).toBe('v-logo');
        expect(container.firstElementChild?.tagName).toBe('svg');
        expect(container.firstElementChild?.getAttribute('aria-label')).toBe('Visa Logo');
        expect(container.firstElementChild?.hasAttribute('aria-hidden')).toBe(false);
    });

    it('should apply additional props correctly', () => {
        const { container } = render(<VisaLogo id="visa-logo" style={{ blockSize: '23px', inlineSize: '71px', marginInlineEnd: '16px' }} />);
        expect(container.firstElementChild?.id).toBe('visa-logo');
        expect(container.firstElementChild?.getAttribute('style')).toBe('block-size: 23px; inline-size: 71px; margin-inline-end: 16px;');
    });
});
// END VSCODE@COPILOT