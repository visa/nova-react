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
import {
  MessageIcon,
  VisaArrowBackTiny,
  VisaArrowForwardTiny,
  VisaCheckmarkTiny,
  VisaCloseTiny,
  VisaErrorAltTiny,
  VisaErrorTiny,
} from '@visa/nova-icons-react';
import {
  Badge,
  Button,
  ContentCard,
  Input,
  InputContainer,
  InputMessage,
  Label,
  SectionMessage,
  SectionMessageCloseButton,
  SectionMessageContent,
  Typography,
  Utility,
  UtilityFragment,
  Wizard,
  WizardStep,
  useFocusTrap,
  useWizard,
} from '@visa/nova-react';
import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { ExitDialog } from './shared/exit-dialog';
import { SaveFlag } from './shared/save-flag';
import { SuccessMessage } from './shared/success-message';
import { SummaryPage } from './shared/summary-page';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'vertical-multi-page-wizard';
const navRegionAriaLabel = 'Vertical multi-page wizard';

const steps = [
  {
    label: '1',
    title: 'Step 1 label',
    inputLabel: 'Label',
    inputId: `${id}-step-1-input`,
    buttonId: `${id}-step-1-button`,
  },
  {
    label: '2',
    title: 'Step 2 label',
    inputLabel: 'Label',
    inputId: `${id}-step-2-input`,
    buttonId: `${id}-step-2-button`,
  },
  {
    label: '3',
    title: 'Step 3 label',
    inputLabel: 'Label',
    inputId: `${id}-step-3-input`,
    buttonId: `${id}-step-3-button`,
  },
  {
    label: '4',
    title: 'Step 4 label',
    inputLabel: 'Label',
    inputId: `${id}-step-4-input`,
    buttonId: `${id}-step-4-button`,
  },
  {
    label: '5',
    title: 'Step 5 label',
  },
];

const exitDialogId = `${id}-exit-warning-dialog`;

const DEFAULT_INPUT_VALUES = Array(steps.length).fill('');

export const VerticalWizard = () => {
  const {
    currentStep,
    isStepAvailable,
    isStepComplete,
    isStepError,
    onStepError,
    onStepChange,
    onStepComplete,
    onStepPrevious,
    onWizardReset,
  } = useWizard({ length: steps.length });

  // Track whether the wizard has been interacted with in order
  // to control focus within a useEffect
  const [hasWizardStepChanged, setHasWizardStepChanged] = useState(false);

  const { onKeyNavigation, ref: exitDialogRef } = useFocusTrap();

  const [inputValues, setInputValues] = useState(DEFAULT_INPUT_VALUES);

  const [showSavedFlag, setShowSavedFlag] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [visibleErrorMessages, setVisibleErrorMessages] = useState<boolean[]>(Array(steps.length).fill(true));

  // Create an array of refs to handle focusing input fields on error
  // https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback
  const inputRefs = useRef(new Map());
  function getInputRefMap() {
    if (!inputRefs.current) {
      inputRefs.current = new Map();
    }
    return inputRefs.current;
  }

  const buttonRefs = useRef(new Map());
  function getButtonRefMap() {
    if (!buttonRefs.current) {
      buttonRefs.current = new Map();
    }
    return buttonRefs.current;
  }

  const editButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!hasWizardStepChanged) {
      return;
    }
    // apply focus to the input field of the current step
    const inputRefsMap = getInputRefMap();
    const currentStepInputNode = inputRefsMap.get(steps[currentStep].inputId);
    if (currentStepInputNode) {
      currentStepInputNode.focus();
    } else {
      // focus the first available edit button in the array
      const firstEditButton = editButtonRefs.current.find(ref => ref !== null);
      if (firstEditButton) {
        firstEditButton.focus();
      }
    }

    setHasWizardStepChanged(false);
  }, [hasWizardStepChanged, currentStep]);

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  // On next button click, simulate completion on all steps
  const handleClickNext = () => {
    if (!inputValues[currentStep]) {
      onStepError(currentStep);
      // Reset error message visibility for this step
      const newVisibleErrorMessages = [...visibleErrorMessages];
      newVisibleErrorMessages[currentStep] = true;
      setVisibleErrorMessages(newVisibleErrorMessages);
      // find the input element with the error in the refs map and set focus on it
      const inputRefsMap = getInputRefMap();
      const currentStepInputNode = inputRefsMap.get(steps[currentStep].inputId);
      currentStepInputNode.focus();
      return;
    }

    setHasWizardStepChanged(true);
    setShowSavedFlag(false);
    onStepComplete(currentStep);
  };

  // On previous button click, reset the current step status from the list of completed steps
  const handleClickPrevious = () => {
    setHasWizardStepChanged(true);
    setShowSavedFlag(false);
    onStepPrevious();
  };

  const handleSave = () => {
    setShowSavedFlag(true);
  };

  // On next button click, simulate completion on all steps
  const handleResetWizard = () => {
    setHasWizardStepChanged(true);
    setInputValues(DEFAULT_INPUT_VALUES);
    setFormSubmitted(false);
    onWizardReset();
  };

  const handleSubmit = () => {
    const formValues: { [key: string]: string } = {};
    steps.forEach((step, i) => {
      if (!step.inputId) return;
      formValues[step.inputId] = inputValues[i];
    });
    setFormSubmitted(true);
  };

  const handleExit = () => {
    exitDialogRef.current?.showModal();
  };

  const handleErrorMessageClose = (stepIndex: number) => {
    const newVisibleErrorMessages = [...visibleErrorMessages];
    newVisibleErrorMessages[stepIndex] = false;
    setVisibleErrorMessages(newVisibleErrorMessages);
  };

  // On step button click, change the current step and reset the status of all steps after the clicked step
  const handleClickStep = (i: number) => {
    setHasWizardStepChanged(true);

    // If navigating forward, validate current step like "Next"
    if (i > currentStep) {
      if (!inputValues[currentStep]) {
        onStepError(currentStep);
        const newVisibleErrorMessages = [...visibleErrorMessages];
        newVisibleErrorMessages[currentStep] = true;
        setVisibleErrorMessages(newVisibleErrorMessages);
        // focus input with error
        const inputRefsMap = getInputRefMap();
        const currentStepInputNode = inputRefsMap.get(steps[currentStep].inputId);
        if (currentStepInputNode) {
          currentStepInputNode.focus();
        }
        return;
      }
      onStepComplete(currentStep);
      onStepChange(i);
    } else {
      onStepChange(i);
    }
  };

  const renderSummaryStep = () => (
    <SummaryPage
      steps={steps}
      inputValues={inputValues}
      onStepClick={handleClickStep}
      maxWidth="603px"
      editButtonRefs={editButtonRefs.current}
    />
  );

  const renderActionButtons = () => {
    return (
      <Utility vMarginTop={40}>
        <Utility vJustifyContent="between" vFlex vFlexWrap vColGap={24} vRowGap={16}>
          <Utility vJustifyContent="start" vFlex vFlexWrap vColGap={24} vRowGap={16}>
            <Button onClick={handleSave} colorScheme="secondary">
              Save
            </Button>
            <Button onClick={handleExit} colorScheme="tertiary">
              Exit
            </Button>
          </Utility>
          <Utility vFlexGrow vJustifyContent="end" vFlex vFlexWrap vColGap={24} vRowGap={16}>
            <UtilityFragment vHide={currentStep === 0}>
              <Button onClick={handleClickPrevious} colorScheme="secondary">
                <VisaArrowBackTiny />
                Back
              </Button>
            </UtilityFragment>
            <UtilityFragment vHide={currentStep === steps.length - 1}>
              <Button onClick={handleClickNext}>
                Next
                <VisaArrowForwardTiny />
              </Button>
            </UtilityFragment>
            <UtilityFragment vHide={currentStep !== steps.length - 1}>
              <Button onClick={handleSubmit}>Submit</Button>
            </UtilityFragment>
          </Utility>
        </Utility>
      </Utility>
    );
  };

  if (formSubmitted) {
    return <SuccessMessage onReset={handleResetWizard} />;
  }

  return (
    <Utility vFlex vGap={40} vFlexRow vFlexWrap style={{ margin: '0 auto', maxInlineSize: '878px' }}>
      <nav aria-label={navRegionAriaLabel} style={{ maxInlineSize: '235px', inlineSize: '100%' }}>
        <Wizard vertical>
          {steps.map((step, i) => (
            <WizardStep key={`horizontal-wizard-step-${i + 1}`} aria-current={currentStep === i ? 'step' : undefined}>
              {isStepAvailable(i) ? (
                <>
                  <Button
                    className={`${
                      currentStep === i
                        ? 'v-typography-label-large-active v-typography-color-default'
                        : 'v-typography-label-large'
                    }`}
                    colorScheme="tertiary"
                    aria-label={`${isStepError(i) ? 'Error ' : isStepComplete(i) ? 'Completed ' : `${i + 1} `}${
                      step.title
                    }`}
                    onClick={() => handleClickStep(i)}
                    id={step.buttonId}
                    ref={node => {
                      const map = getButtonRefMap();
                      if (node) {
                        // store the node in the inputRefs Map
                        map.set(step.buttonId, node);
                      } else {
                        map.delete(step.buttonId);
                      }
                    }}
                  >
                    <Badge
                      aria-current={i === currentStep ? 'step' : undefined}
                      active={currentStep === i && !isStepError(i) && !isStepComplete(i)}
                      badgeType={isStepError(i) ? 'critical' : isStepComplete(i) ? 'stable' : 'subtle'}
                      badgeVariant="icon"
                      clear={i !== currentStep}
                      tag="span"
                    >
                      {isStepError(i) ? <VisaErrorAltTiny /> : isStepComplete(i) ? <VisaCheckmarkTiny /> : step.label}
                    </Badge>
                    <Typography tag="span">{step.title}</Typography>
                  </Button>
                </>
              ) : (
                <>
                  <Badge
                    active={currentStep === i && !isStepError(i) && !isStepComplete(i)}
                    clear={i !== currentStep}
                    badgeType={isStepError(i) ? 'critical' : isStepComplete(i) ? 'stable' : 'subtle'}
                    badgeVariant="icon"
                    tag="span"
                  >
                    {isStepError(i) ? <VisaErrorAltTiny /> : isStepComplete(i) ? <VisaCheckmarkTiny /> : step.label}
                  </Badge>
                  <Typography variant={i === currentStep ? 'label-large-active' : 'label-large'}>
                    {step.title}
                  </Typography>
                </>
              )}
            </WizardStep>
          ))}
        </Wizard>
      </nav>
      <Utility vFlex vFlexCol vGap={12} vFlexGrow style={{ maxInlineSize: '603px' }}>
        <SaveFlag show={showSavedFlag} onClose={() => setShowSavedFlag(false)} />
        {steps.slice(0, steps.length - 1).map((step, i) => {
          return (
            <Utility key={i} vHide={currentStep !== i}>
              <UtilityFragment vFlex vFlexCol vGap={24} vPadding={48}>
                <ContentCard style={{ boxShadow: 'none' }}>
                  <Utility vFlex vFlexCol vGap={isStepError(i) ? 16 : 8}>
                    <Typography variant="headline-2">{step.title}</Typography>
                    {isStepError(i) && visibleErrorMessages[i] && (
                      <SectionMessage messageType="error" id="step-error-vertical">
                        <MessageIcon messageType="error" />
                        <UtilityFragment vPaddingLeft={2} vPaddingBottom={2}>
                          <SectionMessageContent>
                            <Typography>
                              One or more required fields are missing. Complete all required fields to continue.
                            </Typography>
                          </SectionMessageContent>
                        </UtilityFragment>
                        <SectionMessageCloseButton onClick={() => handleErrorMessageClose(i)}>
                          <VisaCloseTiny />
                        </SectionMessageCloseButton>
                      </SectionMessage>
                    )}
                    <Typography variant="body-1">* Indicates a required field.</Typography>
                  </Utility>
                  <Utility vFlex vFlexCol vGap={4}>
                    <Label htmlFor={step.inputId}>{`* ${step.inputLabel}`}</Label>
                    <InputContainer>
                      <Input
                        aria-describedby={isStepError(i) ? `step-error-vertical ${step.inputId}-message` : undefined}
                        aria-required="true"
                        aria-invalid={isStepError(i)}
                        id={step.inputId}
                        type="text"
                        value={inputValues[i]}
                        onChange={e => handleInputChange(i, e as ChangeEvent<HTMLInputElement>)}
                        ref={node => {
                          const map = getInputRefMap();
                          if (node) {
                            // store the node in the inputRefs Map
                            map.set(step.inputId, node);
                          } else {
                            map.delete(step.inputId);
                          }
                        }}
                      />
                    </InputContainer>
                    {isStepError(i) && (
                      <InputMessage id={`${step.inputId}-message`}>
                        <VisaErrorTiny />
                        This is a required field.
                      </InputMessage>
                    )}
                  </Utility>
                </ContentCard>
              </UtilityFragment>
              <UtilityFragment vMarginTop={10}>
                <Typography variant="body-3">Changes have been automatically saved.</Typography>
              </UtilityFragment>
            </Utility>
          );
        })}
        {currentStep === steps.length - 1 && renderSummaryStep()}
        {renderActionButtons()}
      </Utility>
      <ExitDialog exitDialogId={exitDialogId} exitDialogRef={exitDialogRef as RefObject<HTMLDialogElement>} onKeyNavigation={onKeyNavigation} />
    </Utility>
  );
};
