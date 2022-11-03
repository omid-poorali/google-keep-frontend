import { RefObject, useEffect, useRef } from 'react';
import * as Utils from '../../utils';
import {
  tabTrappingKey,
  candidateSelectors,
  getAllTabbingElements,
} from './lib/focusTrapJs';

interface FocusTrapProps {
  container?: RefObject<HTMLElement> | null;
  initialFocusRef?: RefObject<HTMLElement>;
}

export const FocusTrap = ({ container, initialFocusRef }: FocusTrapProps) => {
  const refLastFocus = useRef<HTMLElement | null>();
  /**
   * Handle focus lock on the modal
   */
  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent) => {
      if (container?.current) {
        tabTrappingKey(event, container.current);
      }
    };

    if (Utils.isBrowser) {
      document.addEventListener('keydown', handleKeyEvent);
    }

    // On mount we focus on the first focusable element in the modal if there is one
    if (Utils.isBrowser && container?.current) {
      const savePreviousFocus = () => {
        // First we save the last focused element
        // only if it's a focusable element
        if (
          candidateSelectors.findIndex(selector =>
            document.activeElement?.matches(selector),
          ) !== -1
        ) {
          refLastFocus.current = document.activeElement as HTMLElement;
          refLastFocus.current?.blur();
        }
      };

      savePreviousFocus();
      if (initialFocusRef) {
        // We need to schedule focusing on a next frame - this allows to focus on the modal root
        requestAnimationFrame(() => {
          initialFocusRef.current?.focus();
        });
      } else {
        const allTabbingElements = getAllTabbingElements(container.current);
        if (allTabbingElements[0]) {
          allTabbingElements[0].focus();
        }
      }
    }

    return () => {
      if (Utils.isBrowser) {
        document.removeEventListener('keydown', handleKeyEvent);
        // On unmount we restore the focus to the last focused element
        refLastFocus.current?.focus();
      }
    };
  }, [container, initialFocusRef]);

  return null;
};
