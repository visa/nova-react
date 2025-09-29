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
  VisaChevronDownTiny,
  VisaChevronRightTiny,
  VisaCloseTiny,
  VisaErrorAltTiny,
  VisaErrorTiny,
} from '@visa/nova-icons-react';
import {
  Accordion,
  AccordionHeading,
  AccordionPanel,
  AccordionToggleIcon,
  Badge,
  Button,
  Divider,
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
  useAccordion,
} from '@visa/nova-react';
import { CSSProperties, ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { ExitDialog } from './shared/exit-dialog';
import { SaveFlag } from './shared/save-flag';
import { SuccessMessage } from './shared/success-message';
import { SummaryPage } from './shared/summary-page';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'single-page-wizard';
const navRegionAriaLabel = 'Single page wizard';

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

export const SinglePageWizard = () => {
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

  const { isIndexExpanded, toggleIndexExpanded } = useAccordion({
    defaultExpanded: [0],
  });

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

  useEffect(() => {
    if (!hasWizardStepChanged) {
      return;
    }
    // apply focus if the currentStep has changed
    // (and the wizard has been interacted with)
    const buttonRefsMap = getButtonRefMap();
    const currentStepButtonNode = buttonRefsMap.get(steps[currentStep].buttonId);
    if (currentStepButtonNode instanceof HTMLElement) {
      // For details/summary, we need to focus the summary element
      const summaryElement = currentStepButtonNode.querySelector('summary');
      if (summaryElement) {
        summaryElement.focus();
      } else {
        currentStepButtonNode.focus();
      }
    }
  }, [hasWizardStepChanged, currentStep]);

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleClickNext = () => {
    if (!inputValues[currentStep]) {
      onStepError(currentStep);
      // Reset error message visibility for this step
      const newVisibleErrorMessages = [...visibleErrorMessages];
      newVisibleErrorMessages[currentStep] = true;
      setVisibleErrorMessages(newVisibleErrorMessages);
      // find the input element with the error in the refs map and set focus on it
      const inputRefsMap = getInputRefMap();
      const errorStepInputNode = inputRefsMap.get(steps[currentStep].inputId);
      errorStepInputNode.focus();
      return;
    }

    setHasWizardStepChanged(true);
    setShowSavedFlag(false);
    onStepComplete(currentStep);

    toggleIndexExpanded(currentStep);
    toggleIndexExpanded(currentStep + 1);
  };

  const handleClickPrevious = () => {
    setShowSavedFlag(false);

    toggleIndexExpanded(currentStep);
    toggleIndexExpanded(currentStep - 1);

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

    steps.forEach((_, index) => {
      if (isIndexExpanded(index)) {
        toggleIndexExpanded(index);
      }
    });
    toggleIndexExpanded(0);

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
        const errorStepInputNode = inputRefsMap.get(steps[currentStep].inputId);
        if (errorStepInputNode) {
          errorStepInputNode.focus();
        }
        return;
      }
      onStepComplete(currentStep);
    }

    // Only toggle and change step if validation passes or navigating backward
    requestAnimationFrame(() => {
      // Close all other steps
      steps.forEach((_, index) => {
        if (index !== i && isIndexExpanded(index)) {
          toggleIndexExpanded(index);
        }
      });

      toggleIndexExpanded(i);

      onStepChange(i);
    });
  };

  const renderActionButtons = () => {
    return (
      <Utility vPaddingVertical={12} vPaddingHorizontal={40}>
        <Utility vFlex vFlexWrap vJustifyContent="between" vColGap={24} vRowGap={16}>
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

  const renderSummaryStep = () => (
    <SummaryPage
      steps={steps}
      inputValues={inputValues}
      onStepClick={handleClickStep}
      vPaddingHorizontal={40}
      surfaceProps={{}}
      containerProps={{ vFlexGrow: true }}
    />
  );

  if (formSubmitted) {
    return <SuccessMessage onReset={handleResetWizard} />;
  }
  return (
    <nav aria-label={navRegionAriaLabel}>
      <UtilityFragment vFlex vFlexCol vGap={16}>
        <Wizard tag="div">
          <SaveFlag show={showSavedFlag} onClose={() => setShowSavedFlag(false)} />
          {steps.map((step, i) => (
            <WizardStep
              element={
                <Accordion tag="details" open={isIndexExpanded(i)} tabIndex={isStepAvailable(i) ? undefined : -1} />
              }
              key={`${id}-step-${i + 1}`}
              aria-current={isIndexExpanded(i) ? 'step' : undefined}
            >
              <UtilityFragment vFlex vJustifyContent="between">
                <AccordionHeading
                  aria-controls={`${id}-panel-${i}`}
                  aria-expanded={isIndexExpanded(i)}
                  buttonSize="large"
                  colorScheme="secondary"
                  aria-label={`${isStepError(i) ? 'Error ' : isStepComplete(i) ? 'Completed ' : `${i + 1} `}${step.title
                    }`}
                  disabled={!isStepAvailable(i)}
                  id={`${id}-${i}`}
                  onClick={e => {
                    e.preventDefault();
                    handleClickStep(i);
                  }}
                  ref={node => {
                    const map = getButtonRefMap();
                    if (node) {
                      map.set(step.buttonId, node);
                    } else {
                      map.delete(step.buttonId);
                    }
                  }}
                  tag="summary"
                >
                  <Utility vAlignItems="center" vFlex vGap={6}>
                    <Badge
                      aria-current={i === currentStep ? 'step' : undefined}
                      active={i === currentStep && !isStepError(i) && !isStepComplete(i)}
                      badgeType={isStepError(i) ? 'critical' : isStepComplete(i) ? 'stable' : 'subtle'}
                      clear={i !== currentStep}
                      badgeVariant="icon"
                      tag="span"
                      style={{ '--v-badge-disabled-background': 'var(--v-badge-subtle-icon-color)' } as CSSProperties}
                    >
                      {isStepError(i) ? (
                        <VisaErrorAltTiny aria-hidden="false" aria-label="error icon" />
                      ) : isStepComplete(i) ? (
                        <VisaCheckmarkTiny aria-hidden="false" aria-label="check mark icon" />
                      ) : (
                        step.label
                      )}
                    </Badge>
                    <Typography
                      tag="span"
                      colorScheme={
                        i === currentStep && !isStepError(i) && !isStepComplete(i)
                          ? 'active'
                          : isStepAvailable(i)
                            ? undefined
                            : 'subtle'
                      }
                    >
                      {step.title}
                    </Typography>
                  </Utility>
                  <AccordionToggleIcon
                    accordionOpen={isIndexExpanded(i)}
                    elementClosed={<VisaChevronRightTiny rtl />}
                    elementOpen={<VisaChevronDownTiny />}
                  />
                </AccordionHeading>
              </UtilityFragment>
              <UtilityFragment vPaddingVertical={0} vPaddingHorizontal={0}>
                <AccordionPanel aria-hidden={!isIndexExpanded(i)} id={`${id}-panel-${i}`}>
                  {i !== steps.length - 1 ? (
                    <Utility vPaddingVertical={12} vFlex vFlexCol vJustifyContent="between">
                      <Utility vPaddingVertical={12} vPaddingHorizontal={40} vFlex vFlexCol vGap={4}>
                        {isStepError(i) && visibleErrorMessages[i] && (
                          <UtilityFragment vMarginBottom={16}>
                            <SectionMessage messageType="error" id="step-error-single-page">
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
                          </UtilityFragment>
                        )}
                        <UtilityFragment vMarginBottom={16}>
                          <Typography tag="p">* Indicates a required field.</Typography>
                        </UtilityFragment>
                        <Label htmlFor={step.inputId}>{`* ${step.inputLabel}`}</Label>
                        <InputContainer>
                          <Input
                            aria-describedby={
                              isStepError(i) ? `step-error-single-page ${step.inputId}-message` : undefined
                            }
                            aria-required="true"
                            aria-invalid={isStepError(i)}
                            id={step.inputId}
                            type="text"
                            value={inputValues[i]}
                            onChange={e => handleInputChange(i, e as ChangeEvent<HTMLInputElement>)}
                            ref={node => {
                              const map = getInputRefMap();
                              if (node) {
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
                      <UtilityFragment vMarginVertical={12}>
                        <Divider dividerType="decorative" />
                      </UtilityFragment>
                      {renderActionButtons()}
                    </Utility>
                  ) : (
                    <Utility vPaddingVertical={12} vFlex vFlexCol vJustifyContent="between">
                      {renderSummaryStep()}
                      <UtilityFragment vMarginVertical={12}>
                        <Divider dividerType="decorative" />
                      </UtilityFragment>
                      {renderActionButtons()}
                    </Utility>
                  )}
                </AccordionPanel>
              </UtilityFragment>
            </WizardStep>
          ))}
        </Wizard>
      </UtilityFragment>
      <ExitDialog exitDialogId={exitDialogId} exitDialogRef={exitDialogRef as RefObject<HTMLDialogElement>} onKeyNavigation={onKeyNavigation} />
    </nav>
  );
};
