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
// If you are using Vite to run your application, please follow the instruction on the top of the page.
import { Footer, Link, Typography, Utility, UtilityFragment, VisaLogo } from '@visa/nova-react';

export const NavigationalFooter = () => {
  return (
    <UtilityFragment vFlex vFlexRow vGap={24} vPadding={24}>
      <Footer>
        <Utility vFlex vFlexCol vFlexGrow vFlexShrink0 vGap={24} style={{ flexBasis: 'calc(30% - 32px)' }}>
          <VisaLogo aria-label="Visa" />
          <p>
            The information furnished here is confidential and to be used solely for the support of clients' Visa
            programs. This information shall not be duplicated, published, or disclosed, in whole or in part, without
            the prior written permission of Visa.
          </p>
          <Typography colorScheme="subtle">Copyright &copy; YYYY-YYYY Visa. All rights reserved.</Typography>
        </Utility>
        <Utility vFlex vFlexGrow vFlexWrap vGap={24}>
          <Utility vFlex vFlexCol vFlexGrow vGap={24} style={{ flexBasis: 'calc(15% - 32px)' }}>
            <Typography tag="h2" variant="body-2-bold">
              Visa Inc.
            </Typography>
            <Utility tag="ul" vFlex vFlexCol vGap={16}>
              <li>
                <Link href="./footer">Privacy</Link>
              </li>
              <li>
                <Link href="./footer">Terms of use</Link>
              </li>
              <li>
                <Link href="./footer">About Visa</Link>
              </li>
            </Utility>
          </Utility>
          <Utility vFlex vFlexCol vFlexGrow vGap={24} style={{ flexBasis: 'calc(15% - 32px)' }}>
            <Typography tag="h2" variant="body-2-bold">
              Support
            </Typography>
            <Utility tag="ul" vFlex vFlexCol vGap={16}>
              <li>
                <Link href="./footer">FAQs</Link>
              </li>
              <li>
                <Link href="./footer">Feedback/Contact Us</Link>
              </li>
              <li>
                <Link href="./footer">Online help</Link>
              </li>
            </Utility>
          </Utility>
          <Utility vFlex vFlexCol vFlexGrow vGap={24} style={{ flexBasis: 'calc(15% - 32px)' }}>
            <Typography tag="h2" variant="body-2-bold">
              Update profile
            </Typography>
            <Utility tag="ul" vFlex vFlexCol vGap={16}>
              <li>
                <Link href="./footer">My information</Link>
              </li>
              <li>
                <Link href="./footer">My security</Link>
              </li>
              <li>
                <Link href="./footer">My services</Link>
              </li>
            </Utility>
          </Utility>
          <Utility vFlex vFlexCol vFlexGrow vGap={24} style={{ flexBasis: 'calc(15% - 32px)' }}>
            <Typography tag="h2" variant="body-2-bold">
              Site index
            </Typography>
            <Utility tag="ul" vFlex vFlexCol vGap={16}>
              <li>
                <Link href="./footer">Alphabetized index</Link>
              </li>
              <li>
                <Link href="./footer">Site map</Link>
              </li>
              <li>
                <Link href="./footer">Topic index</Link>
              </li>
            </Utility>
          </Utility>
        </Utility>
      </Footer>
    </UtilityFragment>
  );
};
