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
import { Avatar, Button, Badge } from '@visa/nova-react';
import { VisaAccountLow } from '@visa/nova-icons-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'avatar-as-a-button';

export const AvatarAsButton = () => {
  return (
    <Button
      element={<Avatar tag="button" />}
      aria-label="Notifications"
      aria-describedby={`${id}-notifications-count`}
      buttonSize="large"
      colorScheme="tertiary"
    >
      <VisaAccountLow />
      <Badge id={`${id}-notifications-count`} tag="sup" badgeVariant="number">
        3
      </Badge>
    </Button>
  );
};
