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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

/**
 * Debounces expensive function, only calling the function after it's last call has waited for specified delay
 * @related button, input
 * @param {Function} callback - Function that runs after last delay
 * @param {number} delay - Length of time to wait since last call was made (milliseconds)
 * @returns {(...args: any[]) => void} Delayed callback
 */
export const useDebounce = <T extends (...args: any[]) => void>(callback: T, delay: number | undefined = 250): T => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset timeout
  const onReset = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  };

  // Reset timeout on hook destroy
  useEffect(() => {
    return () => {
      onReset();
    };
  }, []);

  // Return debounced function
  return ((...args: Parameters<T>) => {
    onReset();
    timeout.current = setTimeout(() => callback(...args), delay);
  }) as T;
};

export default useDebounce;

useDebounce.displayName = 'useDebounce';
