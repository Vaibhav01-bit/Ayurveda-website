import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const answerQuestion = (step, answer) => {
    setAnswers(prev => ({ ...prev, [step]: answer }));
  };

  return (
    <QuizContext.Provider value={{ answers, answerQuestion, currentStep, setCurrentStep }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);
