import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';
import { Question } from '../types';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-sm text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
        <p className="text-lg text-slate-600 mb-6">
          Your score: <span className="font-bold text-emerald-600">{score}</span> / {questions.length}
        </p>
        <button
          onClick={resetQuiz}
          className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <RefreshCcw size={20} />
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold mb-6">{currentQuestion.text}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let className = "w-full text-left p-4 rounded-xl border-2 transition-all ";
            if (isAnswered) {
              if (index === currentQuestion.correctAnswer) {
                className += "border-emerald-500 bg-emerald-50 text-emerald-700";
              } else if (index === selectedOption) {
                className += "border-rose-500 bg-rose-50 text-rose-700";
              } else {
                className += "border-slate-100 text-slate-400";
              }
            } else {
              className += selectedOption === index 
                ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                : "border-slate-100 hover:border-slate-200 text-slate-600";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={className}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && <CheckCircle2 size={20} />}
                  {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && <XCircle size={20} />}
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Explanation</p>
              <p className="text-slate-700">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-end">
          {!isAnswered ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
