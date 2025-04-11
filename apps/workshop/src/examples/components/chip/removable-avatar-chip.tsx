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
import { VisaClearAltTiny } from '@visa/nova-icons-react';
import { Avatar, Button, Chip } from '@visa/nova-react';

/// This is the base url for where your site is deployed. `import.meta.env.BASE_URL` is the environment variable used to import the base url for Vite. Change this import to match your build tool's base url.
const BASE_URL = import.meta.env.BASE_URL;

export const RemovableAvatarChip = () => {
  return (
    <Chip>
      <Avatar aria-label="Alex Miller" src={BASE_URL + '/alex-miller-stock.png'} tag="img" />
      <span>Label</span>
      <Button aria-label="clear Label" colorScheme="tertiary" iconButton subtle>
        <VisaClearAltTiny />
      </Button>
    </Chip>
  );
};
