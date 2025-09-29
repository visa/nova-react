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
import { Button, ContentCard, Surface, Typography, Utility, UtilityFragment, VSpacing } from '@visa/nova-react';
import { VisaEditTiny } from '@visa/nova-icons-react';
import { JSX } from 'react';

interface Step {
  label: string;
  title: string;
  inputLabel?: string;
  inputId?: string;
  buttonId?: string;
}

interface SummaryPageProps {
  steps: Step[];
  inputValues: string[];
  onStepClick: (index: number) => void;
  renderActionButtons?: () => JSX.Element;
  vPaddingHorizontal?: VSpacing;
  maxWidth?: string;
  surfaceProps?: React.ComponentProps<typeof Surface>;
  containerProps?: React.ComponentProps<typeof Utility>;
  editButtonRefs?: (HTMLButtonElement | null)[];
}

export const SummaryPage = ({
  steps,
  inputValues,
  onStepClick,
  renderActionButtons,
  vPaddingHorizontal,
  maxWidth,
  surfaceProps = {},
  containerProps = {},
  editButtonRefs = [],
}: SummaryPageProps) => {
  const summarySteps = steps.slice(0, steps.length - 1);

  const renderSummaryContent = () => (
    <>
      <Typography tag="h2" variant="headline-2">
        Summary
      </Typography>
      <ol>
        {summarySteps.map((step, i) => (
          <UtilityFragment
            key={i}
            vPaddingVertical={20}
            style={{
              borderBlockEnd: i < summarySteps.length - 1 ? '1px solid rgba(0,0,0,0.10)' : 'none',
              paddingBlockEnd: i < summarySteps.length - 1 ? '20px' : '0',
            }}
          >
            <li>
              <Utility vFlex vJustifyContent="between">
                <Typography tag="h3" variant="body-2-bold" colorScheme="subtle">
                  {`${i + 1}. ${step.title}`}
                </Typography>
                <Button
                  aria-label={`Edit step ${i + 1}`}
                  colorScheme="tertiary"
                  iconButton
                  buttonSize="small"
                  onClick={() => onStepClick(i)}
                  ref={node => {
                    editButtonRefs[i] = node;
                  }}
                >
                  <VisaEditTiny rtl />
                </Button>
              </Utility>
              <Typography>{`${step.inputLabel}: ${inputValues[i]}`}</Typography>
            </li>
          </UtilityFragment>
        ))}
      </ol>
    </>
  );

  // For inline summary (like in single-page wizard)
  if (vPaddingHorizontal) {
    return (
      <UtilityFragment vPaddingHorizontal={vPaddingHorizontal}>
        <Surface {...surfaceProps}>
          <Utility vFlexGrow {...containerProps}>
            {renderSummaryContent()}
          </Utility>
        </Surface>
      </UtilityFragment>
    );
  }

  // For standalone summary page
  return (
    <Utility vAlignSelf="center" vFlex vFlexCol vGap={10} style={{ maxWidth: maxWidth, width: '100%' }}>
      <UtilityFragment vAlignSelf="center" vFlex vJustifyContent="center" vPadding={48} vGap={32}>
        <ContentCard style={{ boxShadow: 'none', inlineSize: '100%' }}>
          <Utility style={{ inlineSize: '100%' }}>{renderSummaryContent()}</Utility>
        </ContentCard>
      </UtilityFragment>
      <Typography variant="body-3">Changes have been automatically saved.</Typography>
      {renderActionButtons && renderActionButtons()}
    </Utility>
  );
};
