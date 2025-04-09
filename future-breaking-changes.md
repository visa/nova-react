<!--
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
 -->
# Future breaking changes

Living document of changes to make on next breaking change. These changes are not urgent and should usually be marked as deprecated a long while before removal.

- React 19 support only
- Move types from `type/types.ts` -> `/types.ts`
- Remove `BadgeNumber` component (don't forget to remove from related on `Badge` component)
- Remove `BadgeNumber` docs pages
- Remove `Progress` component
- Remove `'color-default' | 'color-subtle'` from typography variant options
- Remove `Textarea` docs pages
- Remove `tag` prop from `AccordionToggleIcon`
- Remove forwardRef from components

  ```
    import cn from 'clsx';
    import { ComponentPropsWithRef, ElementType } from 'react';

    const CSS_PREFIX = 'v-chip';

    export type ChipProperties<ET extends ElementType = 'div'> = {
      /** Tag of Component */
      as?: ElementType;
      /** Chip Size */
      chipSize?: 'compact';
      /** Chip Type */
      chipType?: 'selection';
    } & ComponentPropsWithRef<ET>;

    export const Chip = <ET extends ElementType = 'div'>({
      as: Tag = 'div',
      className,
      chipType,
      chipSize,
      ...remainingProps
    }: ChipProperties<ET>) => (
      <Tag
        className={cn(
          CSS_PREFIX,
          chipSize && `${CSS_PREFIX}-${chipSize}`,
          chipType && `${CSS_PREFIX}-${chipType}`,
          chipType && chipType === 'selection' ? 'v-label v-gap-6' : 'v-flex',
          className
        )}
        {...remainingProps}
      />
    );

    export default Chip;
  ```

- Pass type as const `<Button<"a"> />`
- `Icon` component cleanup (can the user just pass title or description as children to keep this component standalone)
- Rename `tag` prop to `as`
  `<Chip<"button"> tag="button" />` -> `<Chip<"button"> as="button" />`
- Migrate all camelCase custom aria attributes to native kebab-case aria attributes
  - `<Breadcrumbs ariaLabel="my label" />` -> `<Breadcrumbs aria-label="my label" />`
  - Components this effects:
    - `Breadcrumbs`
    - `MessageCloseButtonProperties`
- Rework use-focus-trap implementation to handle refs updating more gracefully.
  - callback ref usage?
  - https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs
