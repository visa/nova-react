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
import { useState, useRef, useEffect } from 'react';

export type UseVisibleIdOptions = {
  /** Element who's children are queried for selected id prefix */
  element?: HTMLElement;
  /** Used to query do elements with specific ids */
  idPrefix?: string;
  /** Options for IntersectionObserver */
  intersectionObserverOptions?: IntersectionObserverInit;
};

export const defaultOptions = {
  element: document,
  idPrefix: '',
  intersectionObserverOptions: {
    root: null,
    /** This is how the size of the Intersection Observer is determines */
    rootMargin: `-5% 0% -70% 0%`,
    /** This is the percentage of how much an element needs to intersect before it's consider visible (1 is 100%, 0.01 is 1%)
     *  It's better to have smaller items like links be the elements to search for because they're more likely to intersect.
     */
    threshold: 1,
  },
};

export const useVisibleId = (useVisibleIdOptions?: UseVisibleIdOptions) => {
  const { element, idPrefix, intersectionObserverOptions } = { ...defaultOptions, ...useVisibleIdOptions };

  // Holds our IntersectionObserver object
  const observerRef = useRef<IntersectionObserver | null>(null);
  // Visible Id state
  const [visibleId, setVisibleId] = useState<string | null>(null);

  // Init our IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisibleId(entry.target.id);
    }, intersectionObserverOptions);
  }, [intersectionObserverOptions]);

  // Init our elements to observe
  useEffect(() => {
    // Find elements
    const idElements = element?.querySelectorAll(`[id^="${idPrefix}"]`);

    // Observer those elements
    idElements.forEach(element => observerRef.current?.observe(element));

    return () => {
      // Remove observer when hook destroys
      observerRef.current?.disconnect();
    };
  }, [element, idPrefix]);

  return { visibleId };
};

export default useVisibleId;
