<!--
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
 -->
# Nova React migration guide

## V3

V2 has been our most stable library release ever. It's been around for nearly 2 years. V3 will set up an even more stable future. It is our most standalone and future facing library ever.

Most of the examples have been migrated for a while with these latest breaking changes to ease the transistion. So if you've copied examples over recently those should be good to go for the most part.

NOTE: Before starting the migration you will want to download the latest of V2. This version has marked elements for deprecation with some helpful warnings to ease the upgrade.

### React 19 required

We had support for React 19 since day one of it's release. However, primarily due to how React 19 [simplifies ref forwarding](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop), [React 19](https://react.dev/blog/2024/12/05/react-19) is now required. This dramatically simplifies our library, and makes our components up to 2x faster.

[React 19 upgrade guide ➹](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

### Decoupling icons

In this version we severed the icons package from the library, making it completely optional. This allows you to bring your own icons, or in some senarios, no icons at all. This aligns React with our other libraries' icons packaging stragey.

#### `AccordionToggleIcon` required properties

`AccordionToggleIcon` now requires `elementClosed`, `elementOpen` properties.

**_Before:_**

```tsx
<AccordionToggleIcon />
```

**_After:_**

```tsx
import { VisaChevronDownTiny, VisaChevronRightTiny } from '@visa/nova-icons-react';

...

<AccordionToggleIcon
	elementClosed={<VisaChevronRightTiny rtl />}
	elementOpen={<VisaChevronDownTiny />}
/>
```

The `tag` property is also no longer supported.

#### `MessageIcon` migration

We migrated `BannerIcon`, `DialogIcon`, `FlagIcon`, `MessageIcon`, `SectionMessageIcon` from the React library to the consolidated `MessageIcon` component in the React _icons_ library.

**_Before:_**

```tsx
import { BannerIcon, DialogIcon, FlagIcon, MessageIcon, SectionMessageIcon } from '@visa/nova-react';
```

**_After:_**

```tsx
import { MessageIcon } from '@visa/nova-icons-react';
```

The `messageType` property is no longer passed automatically to the `MessageIcon`. So be sure to pass it to the icon.

- `BannerIcon`

  **_Before:_**

  ```tsx
  <Banner messageType="warning">
    <BannerIcon />
  </Banner>
  ```

  **_After:_**

  ```tsx
  <Banner messageType="warning">
    <MessageIcon messageType="warning" />
  </Banner>
  ```

- `DialogIcon`

  **_Before:_**

  ```tsx
  <Dialog messageType="warning">
    <DialogIcon />
  </Dialog>
  ```

  **_After:_**

  ```tsx
  <Dialog messageType="warning">
    <MessageIcon messageType="warning" />
  </Dialog>
  ```

- `FlagIcon`

  **_Before:_**

  ```tsx
  <Flag messageType="warning">
    <FlagIcon />
  </Flag>
  ```

  **_After:_**

  ```tsx
  <Flag messageType="warning">
    <MessageIcon messageType="warning" />
  </Flag>
  ```

- `SectionMessageIcon`

  **_Before:_**

  ```tsx
  <SectionMessage messageType="warning">
    <SectionMessageIcon />
  </SectionMessage>
  ```

  **_After:_**

  ```tsx
  <SectionMessage messageType="warning">
    <MessageIcon messageType="warning" />
  </SectionMessage>
  ```

#### Close icons

Child(ren) are now required for `BannerCloseButton`, `DialogCloseButton`, `FlagCloseButton`, `MessageCloseButton`, `SectionMessageCloseButton`. The `<VisaCloseTiny />` component from the icons library is no longer the default child.

- `BannerCloseButton`

  **_Before:_**

  ```tsx
  <BannerCloseButton />
  ```

  **_After:_**

  ```tsx
  <BannerCloseButton>
    <VisaCloseTiny />
  </BannerCloseButton>
  ```

- `DialogCloseButton`

  **_Before:_**

  ```tsx
  <DialogCloseButton />
  ```

  **_After:_**

  ```tsx
  <DialogCloseButton>
    <VisaCloseTiny />
  </DialogCloseButton>
  ```

- `FlagCloseButton`

  **_Before:_**

  ```tsx
  <FlagCloseButton />
  ```

  **_After:_**

  ```tsx
  <FlagCloseButton>
    <VisaCloseTiny />
  </FlagCloseButton>
  ```

- `SectionMessageCloseButton`

  **_Before:_**

  ```tsx
  <SectionMessageCloseButton />
  ```

  **_After:_**

  ```tsx
  <SectionMessageCloseButton>
    <VisaCloseTiny />
  </SectionMessageCloseButton>
  ```

The `ariaLabel` property has been changed to `aria-label` to keep it consistent with the dom property's spelling.

### `MessageContext` and `useMessage` removed

These were used to pass the `messageType` to the `MessageIcon` component. Obviously, since the MessageIcon has been migrated these are no longer being used, thus were removed.

### `Progress` component removed

Migrate to `ProgressCircular`, `ProgressLinear`

### `BadgeNumber` component removed

Migrate to `Badge` with `badgeVariant="number"` property

### Migrated `Typography` varients

Migrate `varients` `'color-default' | 'color-subtle'` to `colorScheme`

### Component type casting migrated to string literal

**_Before:_**

```tsx
<Button<AchorElement> />
```

**_After:_**

```tsx
<Button<'a'> />
```

Here is a helpful regex to find all element type castings in your codebase:
`^\s*<[^>|^ ]*<`

### Breadcrumbs

The `ariaLabel` property has been changed to `aria-label` to keep it consistent with the dom property's spelling.
