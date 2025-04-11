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
import { act, renderHook } from '@testing-library/react';
import useWizard from '.';

describe('useWizard', () => {
  describe('props', () => {
    it('should have proper results with default props', () => {
      const { result } = renderHook(() => useWizard({ length: 10 }));
      expect(result.current.currentStep).toBe(0);
    });

    it('should have proper results with defaultActiveStep', () => {
      const { result } = renderHook(() => useWizard({ length: 10, defaultActiveStep: 5 }));
      expect(result.current.currentStep).toBe(5);
    });
    it('should have proper results with autoProgressComplete', () => {
      const { result } = renderHook(() => useWizard({ length: 10, autoProgressComplete: false }));
      act(() => {
        result.current.onStepComplete(0);
      });
      expect(result.current.currentStep).toBe(0);
    });
    it('should have proper results with autoProgressError', () => {
      const { result } = renderHook(() => useWizard({ length: 10, autoProgressError: true }));
      act(() => {
        result.current.onStepError(0);
      });
      expect(result.current.currentStep).toBe(1);
    });
    it('should have proper results with isExclusiveSets', () => {
      const { result } = renderHook(() => useWizard({ length: 10, isExclusiveSets: false }));
      act(() => {
        result.current.onStepError(0);
      });
      act(() => {
        result.current.onStepComplete(0);
      });
      expect(result.current.hasError()).toBe(true);
    });
  });

  it('should change the current step on onStepChange', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepChange(1);
    });

    expect(result.current.currentStep).toBe(1);
  });

  // START GENAI@CHATGPT4
  it('should not allow onStepChange to set an index less than 0', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepChange(-1);
    });

    expect(result.current.currentStep).toBe(0);
  });

  it('should not allow onStepChange to set an index greater than length - 1', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepChange(3);
    });

    expect(result.current.currentStep).toBe(2);
  });
  // END GENAI@CHATGPT4

  it('should move to the next step on onStepNext', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepNext();
    });

    expect(result.current.currentStep).toBe(1);
  });

  it('should move to the previous step on onStepPrevious', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepNext();
    });

    act(() => {
      result.current.onStepPrevious();
    });

    expect(result.current.currentStep).toBe(0);
  });

  it('should reset the current step on onStepReset', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepError(0);
    });

    expect(result.current.isStepError(0)).toBe(true);

    act(() => {
      result.current.onStepReset(0);
    });

    expect(result.current.hasError()).toBe(false);
  });

  it('should return the correct values for isLastStep', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    expect(result.current.isLastStep(0)).toBe(false);
    expect(result.current.isLastStep(2)).toBe(true);
  });

  it('should return the correct values for isStepAvailable', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    expect(result.current.isStepAvailable(0)).toBe(true);
    expect(result.current.isStepAvailable(3)).toBe(false);
  });

  it('should return the correct values for isFirstStep', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    expect(result.current.isFirstStep(0)).toBe(true);
    expect(result.current.isFirstStep(2)).toBe(false);
  });

  it('should return the correct values for isStepError', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepError(0);
    });

    expect(result.current.isStepError(0)).toBe(true);
  });

  it('should return the correct values for isStepComplete', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepComplete(0);
    });

    expect(result.current.isStepComplete(0)).toBe(true);
  });

  it('should return the correct values for isWizardComplete', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepComplete(0);
    });

    act(() => {
      result.current.onStepComplete(1);
    });

    act(() => {
      result.current.onStepComplete(2);
    });

    expect(result.current.isWizardComplete()).toBe(true);
  });

  it('should return reset the whole wizard onWizardReset', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepComplete(0);
    });

    act(() => {
      result.current.onStepComplete(1);
    });

    act(() => {
      result.current.onStepComplete(2);
    });

    expect(result.current.isWizardComplete()).toBe(true);

    act(() => {
      result.current.onWizardReset();
    });

    expect(result.current.currentStep).toBe(0);
    expect(result.current.isWizardComplete()).toBe(false);
  });

  it('should return reset the whole wizard onWizardReset', () => {
    const { result } = renderHook(() => useWizard({ length: 3 }));

    act(() => {
      result.current.onStepError(0);
    });

    act(() => {
      result.current.onStepError(1);
    });

    act(() => {
      result.current.onStepComplete(2);
    });

    expect(result.current.hasError()).toBe(true);

    act(() => {
      result.current.onWizardReset();
    });

    expect(result.current.currentStep).toBe(0);
    expect(result.current.hasError()).toBe(false);
  });
});
