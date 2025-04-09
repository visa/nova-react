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
import { useState } from 'react';

type UseWizardOptions = {
  /** Auto progress on complete */
  autoProgressComplete?: boolean;
  /** Auto progress on error */
  autoProgressError?: boolean;
  /** Current step */
  defaultActiveStep?: number;
  /** If the complete and error sets are mutually exclusive */
  isExclusiveSets?: boolean;
  /** Length of steps */
  length: number;
};

type WizardEventOptions = {
  /** Auto progress */
  autoProgress?: boolean;
};

const defaultOptions = {
  autoProgressComplete: true,
  autoProgressError: false,
  defaultActiveStep: 0,
  isExclusiveSets: true,
} satisfies Partial<UseWizardOptions>;

/**
 * @docs {@link https://design.visa.com/react/hooks/use-wizard | See Docs}
 * @description This hook is used to control the state of a wizard component.
 * @related wizard
 * @vgar TODO
 * @wcag TODO
 */
export const useWizard = (useWizardOptions: UseWizardOptions) => {
  /// Options
  const { autoProgressComplete, autoProgressError, isExclusiveSets, length, defaultActiveStep } = {
    ...defaultOptions,
    ...useWizardOptions,
  };

  /// State
  const [completedSteps, setCompletedSteps] = useState(() => new Set<number>()); // Which steps are completed
  const [currentStep, setCurrentStep] = useState(defaultActiveStep); // Which step is currently active
  const [errorSteps, setErrorSteps] = useState(() => new Set<number>()); // Which steps have errors
  const [maxStep, setMaxStep] = useState(defaultActiveStep); // The maximum available step

  // Change the current step to the specific index
  const onStepChange = (index: number) => {
    let nextStep = index;
    if (index < 0)
      nextStep = 0; // Stays at first step
    else if (index >= length) nextStep = length - 1; // Stays at last step
    setMaxStep(prev => Math.max(prev, nextStep)); // Update the maximum step
    setCurrentStep(nextStep);
  };

  // Add the the step from the completed list
  const onStepComplete = (index: number, { autoProgress }: WizardEventOptions = {}) => {
    setCompletedSteps(prev => new Set(prev).add(index)); // Add the step to the completed list
    // If the sets are exclusive, remove the step from the error list
    if (isExclusiveSets)
      setErrorSteps(prev => {
        const current = new Set(prev);
        current.delete(index);
        return current;
      });
    // If auto progress is enabled, move to the next step
    if ((autoProgress === undefined && autoProgressComplete) || autoProgress) onStepNext();
  };

  // Add the the step from the error list
  const onStepError = (index: number, { autoProgress }: WizardEventOptions = {}) => {
    setErrorSteps(prev => new Set(prev).add(index)); // Add the step to the error list
    // If the sets are exclusive, remove the step from the completed list
    if (isExclusiveSets)
      setCompletedSteps(prev => {
        const current = new Set(prev);
        current.delete(index);
        return current;
      });
    // If auto progress is enabled, move to the next step
    if ((autoProgress === undefined && autoProgressError) || autoProgress) onStepNext();
  };

  // Move forward to the next step
  const onStepNext = () => {
    onStepChange(currentStep + 1);
  };

  // Move back to the previous step
  const onStepPrevious = () => {
    onStepChange(currentStep - 1);
  };

  // Remove the step from the completed and error list
  const onStepReset = (index: number) => {
    // Remove the step from the error list
    setErrorSteps(prev => {
      const current = new Set(prev);
      current.delete(index);
      return current;
    });
    // Remove the step from the completed list
    setCompletedSteps(prev => {
      const current = new Set(prev);
      current.delete(index);
      return current;
    });
  };

  const onWizardReset = (index = defaultActiveStep) => {
    // Reset the completed steps
    setCompletedSteps(prev => {
      return new Set([...prev].filter(step => step < index));
    });
    // Reset the error steps
    setErrorSteps(prev => {
      return new Set([...prev].filter(step => step < index));
    });
    // Reset the current step
    setCurrentStep(index);
    setMaxStep(index);
  };

  // Check if the wizard has errors
  const hasError = () => errorSteps.size > 0;
  // Check if the step is available
  const isStepAvailable = (index: number) => index <= maxStep;
  // Check if the current step is the first step
  const isFirstStep = (index: number) => index === 0;
  // Check if the current step is the last step
  const isLastStep = (index: number) => index === length - 1;
  // Check if the step is in the error list
  const isStepError = (index: number) => errorSteps.has(index);
  // Check if the step is in the completed list
  const isStepComplete = (index: number) => completedSteps.has(index);
  // Check if the wizard is complete
  const isWizardComplete = () => completedSteps.size === length;

  return {
    /** Return the current step of the wizard */
    currentStep,
    /** Check if the wizard has any error step */
    hasError,
    /** Check if the step is available */
    isStepAvailable,
    /** Check if the current step is the first step */
    isFirstStep,
    /** Check if the current step is the last step */
    isLastStep,
    /** Check if the step is completed */
    isStepComplete,
    /** Check if the step has an error */
    isStepError,
    /** Check if the wizard is complete */
    isWizardComplete,
    /** Return the maximum available step of the wizard */
    maxStep,
    /** Move to the selected step */
    onStepChange,
    /** Move to the next step */
    onStepNext,
    /** Move to the previous step */
    onStepPrevious,
    /** Mark the step as complete */
    onStepComplete,
    /** Mark the step as error */
    onStepError,
    /** Reset the step status */
    onStepReset,
    /** Reset the wizard status */
    onWizardReset,
  };
};

export default useWizard;

useWizard.displayName = 'useWizard';

useWizard.defaultProps = {
  autoProgressComplete: true,
  autoProgressError: false,
  defaultActiveStep: 0,
  isExclusiveSets: true,
};
