'use client';

import {PropsWithChildren, useCallback, useMemo, useState} from 'react';

type Process<T> = {
  value: T;
};

function useFunnelProcess<T>({
  exit,
  submit,
  process,
  initialProcess,
}: {
  exit: VoidFunction;
  submit: VoidFunction;
  process: Process<T>[];
  initialProcess?: T;
}) {
  const [currentStep, setCurrentStep] = useState<T>(initialProcess ?? process[0].value);
  const onNext = () => {
    const nextIndex = process.findIndex(step => step.value === currentStep) + 1;
    const nextStep = process[nextIndex];
    if (!nextStep) {
      submit();
    } else {
      setCurrentStep(nextStep.value);
    }
  };

  const onPrev = () => {
    const prevIndex = process.findIndex(step => step.value === currentStep) - 1;
    const prevStep = process[prevIndex];
    if (!prevStep) {
      exit();
    } else {
      setCurrentStep(prevStep.value);
    }
  };

  const Step = useCallback(
    ({step, children}: PropsWithChildren<{step: T}>) => {
      if (step !== currentStep) return null;
      return <>{children}</>;
    },
    [currentStep],
  );

  const isCompleted = (step: T) => {
    const stepIndex = process.findIndex(st => st.value === step);
    const currentIndex = process.findIndex(st => st.value === currentStep);

    return stepIndex < currentIndex;
  };

  const isCurrent = (step: T) => {
    return step === currentStep;
  };

  return {
    onNext,
    onPrev,
    Step,
    onChange: setCurrentStep,
    currentStep,
    process,
  };
}

export {useFunnelProcess};
