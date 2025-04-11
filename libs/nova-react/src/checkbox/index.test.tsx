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
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Checkbox from '.';

describe('Checkbox', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(
      <>
        <Checkbox id="checkbox-default" />
        <label htmlFor="checkbox-default">Test label</label>
      </>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-checkbox');
    expect(container.firstElementChild?.tagName).toBe('INPUT');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Checkbox className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-checkbox test-class');
  });

  it('should allow custom tag', () => {
    const { container } = render(<Checkbox tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });
  it('should allow for indeterminate state with tag undefined', () => {
    const { container } = render(<Checkbox indeterminate />);
    expect((container.firstElementChild as HTMLInputElement).indeterminate).toBe(true);
  });
  it('should allow for indeterminate state with tag undefined', () => {
    const { container } = render(<Checkbox indeterminate />);
    expect((container.firstElementChild as HTMLInputElement).indeterminate).toBe(true);
  });
  it('should allow for indeterminate state with ref function', () => {
    const refsFuncMock = jest.fn();
    const refsFunc = (element: HTMLInputElement | null) => {
      refsFuncMock(element);
    };
    const { container } = render(<Checkbox indeterminate ref={refsFunc} tag="input" />);
    expect(refsFuncMock.mock.calls[0][0]?.indeterminate).toBe(true);
    expect((container.firstElementChild as HTMLInputElement).indeterminate).toBe(true);
  });
  it('should allow for indeterminate state with plain ref', () => {
    const ref: React.ForwardedRef<HTMLInputElement> = { current: null };
    const { container } = render(<Checkbox indeterminate ref={ref} tag="input" />);
    expect(ref.current?.indeterminate).toBe(true);
    expect((container.firstElementChild as HTMLInputElement).indeterminate).toBe(true);
  });

  it('should permeate basic props', () => {
    const { container } = render(<Checkbox aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });
});
