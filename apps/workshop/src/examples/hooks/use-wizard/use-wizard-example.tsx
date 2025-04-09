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
import { Badge, Button, Utility, Wizard, WizardStep, useWizard } from '@visa/nova-react';
import { VisaCheckmarkTiny, VisaChevronRightTiny, VisaErrorAltTiny } from '@visa/nova-icons-react';

const stepList = [
  { title: 'Step label 1' },
  { title: 'Step label 2' },
  { title: 'Step label 3' },
  { title: 'Step label 4' },
  { title: 'Step label 5' },
];

export const UseWizardExample = () => {
  const {
    currentStep,
    isLastStep,
    isStepAvailable,
    isStepComplete,
    isStepError,
    onStepChange,
    onStepComplete,
    onStepError,
    onStepNext,
    onStepPrevious,
    onStepReset,
    onWizardReset,
  } = useWizard({ length: stepList.length });

  return (
    <Utility vFlex vFlexCol vGap={12}>
      <Wizard>
        {stepList.map((step, i) => (
          <WizardStep key={`horizontal-wizard-step-${i + 1}`}>
            {isStepAvailable(i) ? (
              <Button
                className={`${
                  currentStep === i ? 'v-typography-label-large-active' : 'v-typography-body-2'
                } v-typography-color-default v-gap-8`}
                colorScheme="tertiary"
                onClick={() => {
                  onStepChange(i);
                }}
              >
                <Badge
                  active={currentStep === i && !isStepError(i) && !isStepComplete(i)}
                  badgeType={(isStepError(i) && 'critical') || (isStepComplete(i) && 'stable') || 'subtle'}
                  badgeVariant="icon"
                  clear={!(currentStep === i)}
                  tag="span"
                >
                  {isStepError(i) ? <VisaErrorAltTiny /> : isStepComplete(i) ? <VisaCheckmarkTiny /> : i + 1}
                </Badge>
                {step.title}
                {i < stepList.length - 1 && <VisaChevronRightTiny className="v-typography-color-subtle" />}
              </Button>
            ) : (
              <>
                <Badge badgeType="subtle" badgeVariant="icon" clear tag="span">
                  {i + 1}
                </Badge>
                {step.title}
                {!isLastStep(i) && <VisaChevronRightTiny className="v-typography-color-subtle" />}
              </>
            )}
          </WizardStep>
        ))}
      </Wizard>
      <Utility vFlex vFlexWrap vGap={24} vJustifyContent="between">
        <Button onClick={onStepPrevious}>Previous step</Button>
        <Utility vFlex vFlexWrap vGap={12}>
          <Button colorScheme="secondary" onClick={() => onStepComplete(currentStep, { autoProgress: false })}>
            Set step successful
          </Button>
          <Button colorScheme="secondary" onClick={() => onStepError(currentStep, { autoProgress: false })}>
            Set step error
          </Button>
          <Button colorScheme="secondary" onClick={() => onStepReset(currentStep)}>
            Reset current step
          </Button>
        </Utility>
        <Button onClick={onStepNext}>Next step</Button>
      </Utility>
      <Utility vFlex vFlexWrap vGap={16} vJustifyContent="center">
        <Button destructive onClick={() => onWizardReset()}>
          Reset wizard
        </Button>
        <Button colorScheme="secondary" destructive onClick={() => onWizardReset(1)}>
          Reset to step 2
        </Button>
      </Utility>
    </Utility>
  );
};
