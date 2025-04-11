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

import Utility from '.';

describe('Utility', () => {
  it('renders children correctly', () => {
    const { container, getByText } = render(<Utility>Child Component</Utility>);

    expect(container).toMatchSnapshot();
    expect(getByText('Child Component')).toBeInTheDocument();
  });

  it('applies className correctly', () => {
    const { container } = render(
      <Utility className="custom-class-1">
        <div className="custom-class-2">Child Component</div>
      </Utility>
    );

    expect(container.firstChild).toHaveClass('custom-class-1');
  });

  it('should allow for custom elements', () => {
    const { container } = render(<Utility element={<span />}>Child Component</Utility>);
    expect(container.firstChild).toHaveProperty('tagName', 'SPAN');
  });
});
