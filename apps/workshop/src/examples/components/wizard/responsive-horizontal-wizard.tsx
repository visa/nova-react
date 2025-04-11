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
  VisaArrowBackTiny,
  VisaArrowForwardTiny,
  VisaCheckmarkTiny,
  VisaChevronRightTiny,
  VisaEditTiny,
  VisaErrorAltTiny,
  VisaErrorTiny,
  VisaSuccessHigh,
} from '@visa/nova-icons-react';
import {
  Badge,
  Button,
  Flag,
  FlagCloseButton,
  FlagContent,
  FlagIcon,
  Input,
  InputContainer,
  InputMessage,
  Label,
  Link,
  ScreenReader,
  Surface,
  Typography,
  Utility,
  UtilityFragment,
  Wizard,
  WizardStep,
  useWizard,
} from '@visa/nova-react';
import { CSSProperties, useEffect, useState, useRef, ChangeEvent } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'responsive-horizontal-wizard';
const navRegionAriaLabel = 'Responsive horizontal wizard';

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

const DEFAULT_INPUT_VALUES = Array(steps.length).fill('');

export const ResponsiveHorizontalWizard = () => {
  const {
    currentStep,
    isStepAvailable,
    isLastStep,
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

  const [inputValues, setInputValues] = useState(DEFAULT_INPUT_VALUES);

  const [showSavedFlag, setShowSavedFlag] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    const buttonRefsMap = getButtonRefMap();
    const currentStepButtonNode = buttonRefsMap.get(steps[currentStep].buttonId);
    // the wizard steps are only buttons on the full size wizard.
    // if the button is available and NOT hidden then the full size
    // wizard is being rendered. focus the current step button.
    if (
      currentStepButtonNode &&
      currentStepButtonNode.offsetParent !== null &&
      window.getComputedStyle(currentStepButtonNode).display !== 'none'
    ) {
      currentStepButtonNode.focus();
      return;
    }
    // for the compact wizard, the steps are not buttons.
    // look for an inputRef on the current step to focus instead
    const inputRefsMap = getInputRefMap();
    const currentStepInputNode = inputRefsMap.get(steps[currentStep].inputId);
    if (currentStepInputNode) {
      currentStepInputNode.focus();
    }
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

  // On step button click, change the current step and reset the status of all steps after the clicked step
  const handleClickStep = (i: number) => {
    setHasWizardStepChanged(true);
    onStepChange(i);
  };

  const renderSummaryStep = () => (
    <Utility vAlignSelf="center" vFlex vFlexCol vGap={10} style={{ maxWidth: '610px', width: '100%' }}>
      <UtilityFragment vAlignSelf="center" vFlex vJustifyContent="center" vPadding={24} vGap={32}>
        <Surface>
          <Utility style={{ maxWidth: '400px', width: '100%' }}>
            <Typography tag="h2" variant="headline-2">
              Summary
            </Typography>
            <ol>
              {steps.slice(0, steps.length - 1).map((step, i) => (
                <UtilityFragment
                  key={i}
                  vPaddingVertical={20}
                  style={{
                    borderBlockEnd: i < steps.length - 2 ? '1px solid rgba(0,0,0,0.10)' : 'none',
                  }}
                >
                  <li>
                    <Utility vFlex vJustifyContent="between">
                      <Typography
                        tag="h3"
                        variant="body-2-bold"
                        colorScheme="subtle"
                      >{`${i + 1}. ${step.title}`}</Typography>
                      <Button
                        aria-label={`Edit step ${i + 1}`}
                        colorScheme="tertiary"
                        iconButton
                        buttonSize="small"
                        onClick={() => handleClickStep(i)}
                      >
                        <VisaEditTiny rtl />
                      </Button>
                    </Utility>
                    <Typography>{`${step.inputLabel}: ${inputValues[i]}`}</Typography>
                  </li>
                </UtilityFragment>
              ))}
            </ol>
          </Utility>
        </Surface>
      </UtilityFragment>
      <Typography>Changes have been automatically saved.</Typography>
      {renderActionButtons()}
    </Utility>
  );

  const renderActionButtons = () => {
    return (
      <>
        <Utility vContainerHide="xs">
          <Utility vJustifyContent="between" vFlex vFlexWrap vGap={24}>
            <Utility>
              <Button onClick={handleSave} colorScheme="secondary">
                Save
              </Button>
            </Utility>
            <Utility vJustifyContent="end" vFlex vFlexWrap vGap={24}>
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
        <UtilityFragment vContainerHide="desktop">
          <Utility vFlex vFlexCol vGap={16} vContainerHide="sm">
            <Button onClick={handleSave} colorScheme="secondary">
              Save
            </Button>
            <Button onClick={handleClickPrevious} colorScheme="secondary">
              <VisaArrowBackTiny />
              Back
            </Button>
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
        </UtilityFragment>
      </>
    );
  };

  if (formSubmitted) {
    return (
      <Utility vFlex vJustifyContent="center" vGap={12}>
        <UtilityFragment
          vFlex
          vJustifyContent="center"
          vPaddingVertical={44}
          vPaddingHorizontal={32}
          vGap={32}
          style={{ maxWidth: '676px' }}
        >
          <Surface>
            <Utility vFlex vFlexCol vGap={24} vAlignItems="center" style={{ maxWidth: '394px', width: '394px' }}>
              <Typography tag="h2" variant="headline-2">
                Success
              </Typography>
              <VisaSuccessHigh
                style={
                  {
                    '--v-icon-primary': 'var(--palette-messaging-graphics-positive)',
                    '--v-icon-secondary': 'var(--palette-messaging-graphics-positive)',
                  } as CSSProperties
                }
              />
              <Typography tag="p" variant="body-2">
                This is required text that describes the success message in more detail.
              </Typography>
              <Utility vAlignSelf="stretch" vFlex vJustifyContent="center" vGap={24}>
                <Link element={<button />} onClick={handleResetWizard}>
                  Reset wizard example
                </Link>
                <Link href="./wizard">Destination label</Link>
              </Utility>
            </Utility>
          </Surface>
        </UtilityFragment>
      </Utility>
    );
  }

  const renderDesktopWizard = () => {
    return (
      <nav aria-label={`${navRegionAriaLabel}-desktop`}>
        <Wizard>
          {steps.map((step, i) => (
            <WizardStep key={`horizontal-wizard-step-${i + 1}`} aria-current={currentStep === i ? 'step' : undefined}>
              {isStepAvailable(i) ? (
                <>
                  <ScreenReader>
                    {`${isStepError(i) ? 'Error ' : isStepComplete(i) ? 'Completed ' : ''}Step ${i + 1} of ${steps.length}`}
                  </ScreenReader>
                  <Button
                    className={`${
                      currentStep === i ? 'v-typography-label-large-active' : 'v-typography-body-2'
                    } v-typography-color-default`}
                    colorScheme="tertiary"
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
                      active={i === currentStep && !isStepError(i) && !isStepComplete(i)}
                      badgeType={isStepError(i) ? 'critical' : isStepComplete(i) ? 'stable' : 'subtle'}
                      badgeVariant="icon"
                      clear={i !== currentStep}
                      tag="span"
                    >
                      {isStepError(i) ? <VisaErrorAltTiny /> : isStepComplete(i) ? <VisaCheckmarkTiny /> : step.label}
                    </Badge>
                    <Typography>{step.title}</Typography>
                    {i < steps.length - 1 && <VisaChevronRightTiny className="v-typography-color-subtle" />}
                  </Button>
                </>
              ) : (
                <>
                  <ScreenReader>
                    {`${isStepError(i) ? 'Error ' : isStepComplete(i) ? 'Completed ' : ''}Step ${i + 1} of ${steps.length}`}
                  </ScreenReader>
                  <Badge
                    active={i === currentStep && !isStepError(i) && !isStepComplete(i)}
                    clear={i !== currentStep}
                    badgeType={isStepError(i) ? 'critical' : isStepComplete(i) ? 'stable' : 'subtle'}
                    badgeVariant="icon"
                    tag="span"
                  >
                    {isStepError(i) ? <VisaErrorAltTiny /> : isStepComplete(i) ? <VisaCheckmarkTiny /> : step.label}
                  </Badge>
                  <Typography variant={i === currentStep ? 'label-large-active' : 'body-2'}>{step.title}</Typography>
                  {!isLastStep(i) && <VisaChevronRightTiny className="v-typography-color-subtle" />}
                </>
              )}
            </WizardStep>
          ))}
        </Wizard>
      </nav>
    );
  };

  const renderMobileWizard = () => {
    return (
      <nav aria-label={`${navRegionAriaLabel}-mobile`}>
        <UtilityFragment vJustifyContent="center">
          <Wizard
            compact
            style={
              {
                '--v-wizard-compact-gap': 'clamp(var(--size-scalable-12), 6vw, var(--size-scalable-72))',
              } as CSSProperties
            }
          >
            {steps.map((step, i) => (
              <WizardStep key={`horizontal-wizard-step-${i + 1}`} aria-current={currentStep === i ? 'step' : undefined}>
                <ScreenReader>
                  {`${isStepError(i) ? 'Error ' : isStepComplete(i) ? 'Completed ' : ''}Step ${i + 1} of ${steps.length}`}
                </ScreenReader>
                <Badge
                  aria-current={i === currentStep ? 'step' : undefined}
                  active={i === currentStep && !isStepError(i) && !isStepComplete(i)}
                  badgeType={isStepError(i) ? 'critical' : isStepComplete(i) ? 'stable' : 'subtle'}
                  badgeVariant="icon"
                  clear={i !== currentStep}
                  tag="span"
                >
                  {isStepError(i) ? <VisaErrorAltTiny /> : isStepComplete(i) ? <VisaCheckmarkTiny /> : step.label}
                </Badge>
              </WizardStep>
            ))}
          </Wizard>
        </UtilityFragment>
      </nav>
    );
  };

  return (
    <Utility vFlex vFlexCol vGap={48} style={{ containerType: 'inline-size' } as CSSProperties}>
      <Utility vFlex vFlexCol vGap={16}>
        {showSavedFlag && (
          <Utility vAlignSelf="end">
            <Flag messageType="success">
              <FlagIcon />
              <FlagContent className="v-pl-2 v-pb-2" role="alert" aria-live="polite">
                <ScreenReader>success</ScreenReader>
                Your progress has been saved.
              </FlagContent>
              <FlagCloseButton onClick={() => setShowSavedFlag(false)} />
            </Flag>
          </Utility>
        )}
        <UtilityFragment vContainerHide="mobile">{renderDesktopWizard()}</UtilityFragment>
        <UtilityFragment vContainerHide="desktop">{renderMobileWizard()}</UtilityFragment>
        {steps.slice(0, steps.length - 1).map((step, i) => {
          return (
            <Utility key={i} vFlex vFlexCol vGap={24} vHide={currentStep !== i}>
              <Utility key={i} vFlex vFlexCol vGap={4} vHide={currentStep !== i}>
                <Label htmlFor={step.inputId}>{`${step.inputLabel} (required)`}</Label>
                <InputContainer>
                  <Input
                    aria-describedby={`${step.inputId}-message`}
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
                  <InputMessage aria-atomic="true" aria-live="assertive" id={`${step.inputId}-message`} role="alert">
                    <VisaErrorTiny />
                    This is required text that describes the error in more detail.
                  </InputMessage>
                )}
              </Utility>
              {renderActionButtons()}
            </Utility>
          );
        })}
        {currentStep === steps.length - 1 && renderSummaryStep()}
      </Utility>
    </Utility>
  );
};
