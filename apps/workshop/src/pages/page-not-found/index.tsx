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
import { VisaChevronRightTiny } from '@visa/nova-icons-react';
import {
  ContentCard,
  ContentCardBody,
  ContentCardSubtitle,
  ContentCardTitle,
  Typography,
  Utility,
  Link as VLink,
} from '@visa/nova-react';
import { Link } from 'react-router-dom';
import { Paths } from '../../routes';

const PageNotFound = () => {
  return (
    <Utility vFlex vFlexCol vMargin={48} vGap={12} vAlignItems="center">
      <Utility vMarginTop={40}>
        <Typography tag="h1" variant="headline-1">
          Page Not Found :/
        </Typography>
      </Utility>
      <Typography variant="body-1" style={{ textAlign: 'center' }}>
        Sorry, but this page does not exist. Are you lost? <br /> Not to fret! Here are some helpful links to get you on
        your way:
      </Typography>

      <Utility vFlex vFlexRow vFlexWrap vGap={20} vMarginTop={48} vJustifyContent="evenly">
        <ContentCard borderBlockEnd>
          <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={8} vFlexGrow>
            <ContentCardTitle variant="headline-4">Home</ContentCardTitle>
            <ContentCardSubtitle variant="body-3">Go home to view our getting started guide.</ContentCardSubtitle>
            <Utility vAlignItems="center" vFlex vGap={12} vPaddingTop={8}>
              <VLink element={<Link to={Paths.root} />} noUnderline>
                Getting started <VisaChevronRightTiny />
              </VLink>
            </Utility>
          </Utility>
        </ContentCard>
        <ContentCard borderBlockEnd>
          <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={8} vFlexGrow>
            <ContentCardTitle variant="headline-4">View components</ContentCardTitle>
            <ContentCardSubtitle variant="body-3">See all offered components in the library.</ContentCardSubtitle>
            <Utility vAlignItems="center" vFlex vGap={12} vPaddingTop={8}>
              <VLink element={<Link to={Paths.components} />} noUnderline>
                Components <VisaChevronRightTiny rtl />
              </VLink>
            </Utility>
          </Utility>
        </ContentCard>
        <ContentCard borderBlockEnd>
          <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={8} vFlexGrow>
            <ContentCardTitle variant="headline-4">More info</ContentCardTitle>
            <ContentCardSubtitle variant="body-3">
              Looking for tips, tricks, or more info about our library? Go to our resources page.
            </ContentCardSubtitle>
            <Utility vAlignItems="center" vFlex vGap={12} vPaddingTop={8}>
              <VLink element={<Link to={Paths.resources} />} noUnderline>
                Resources <VisaChevronRightTiny rtl />
              </VLink>
            </Utility>
          </Utility>
        </ContentCard>
        <ContentCard borderBlockEnd>
          <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={8} vFlexGrow>
            <ContentCardTitle variant="headline-4">Want to see what all we have to offer?</ContentCardTitle>
            <ContentCardSubtitle variant="body-3">
              Go to our home experience. We have a lot of great resources and tooling for you to explore.
            </ContentCardSubtitle>
            <Utility vAlignItems="center" vFlex vGap={12} vPaddingTop={8}>
              <VLink element={<Link to={Paths.components} />} noUnderline>
                VPDS Home <VisaChevronRightTiny rtl />
              </VLink>
            </Utility>
          </Utility>
        </ContentCard>
      </Utility>
    </Utility>
  );
};

export default PageNotFound;
