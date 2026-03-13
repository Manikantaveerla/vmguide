import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react';
import formulasData from '../assets/formulas.json';

export default function QuizEngine({ topic, questions, onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(null));

    // Hint System
    const [showHint, setShowHint] = useState(false);
    const topicFormulas = topic ? (formulasData[topic.id] || []) : [];

    // Scoring
    const [score, setScore] = useState(0);

    // Timer (60 seconds per question total pool, e.g., 10 questions = 600 seconds)
    const initialTime = questions.length * 60;
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            finishQuiz();
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const currentQuestion = questions[currentIndex];

    const handleSelectOption = (opt) => {
        setSelectedOption(opt);
    };

    const handleNext = () => {
        const isCorrect = selectedOption && currentQuestion.answer &&
            (selectedOption.toLowerCase() === currentQuestion.answer.toLowerCase() ||
                selectedOption.includes(currentQuestion.answer) ||
                currentQuestion.answer.includes(selectedOption));

        // Exact match scoring heuristic (simple fallback if complex)
        let awarded = false;
        if (currentQuestion.answer) {
            const cleanSelected = selectedOption ? selectedOption.toLowerCase().trim() : "";
            const cleanAnswer = currentQuestion.answer.toLowerCase().trim();
            if (cleanSelected === cleanAnswer || cleanSelected.includes(cleanAnswer) || cleanAnswer.includes(cleanSelected)) {
                awarded = true;
            }
        }

        if (awarded) {
            setScore(prev => prev + 1);
        }

        const newAnswers = [...userAnswers];
        newAnswers[currentIndex] = {
            selected: selectedOption,
            isCorrect: awarded
        };
        setUserAnswers(newAnswers);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowHint(false);
        } else {
            // Finish
            onComplete(newAnswers, score + (awarded ? 1 : 0), initialTime - timeLeft);
        }
    };

    const finishQuiz = () => {
        onComplete(userAnswers, score, initialTime - timeLeft);
    };

    if (!currentQuestion) return null;

    const progress = ((currentIndex) / questions.length) * 100;
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const options = currentQuestion.options && currentQuestion.options.length > 0
        ? currentQuestion.options
        : ['True', 'False']; // Fallback

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-card"
            style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}
        >
            <div className="quiz-header">
                <div style={{ color: 'var(--text-secondary)' }}>
                    Question {currentIndex + 1} of {questions.length}
                </div>
                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <div className={`timer ${timeLeft < 60 ? 'danger' : ''}`}>
                    <Timer size={18} /> {formatTime(timeLeft)}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="question-text">
                        {currentQuestion.questionText}
                    </div>

                    <div className="options-grid">
                        {options.map((opt, i) => {
                            const letter = String.fromCharCode(65 + i);
                            return (
                                <button
                                    key={i}
                                    className={`option-btn ${selectedOption === opt ? 'selected' : ''}`}
                                    onClick={() => handleSelectOption(opt)}
                                >
                                    <div className="option-letter">{letter}</div>
                                    <div style={{ flex: 1 }}>{opt}</div>
                                    {selectedOption === opt && <CheckCircle2 size={20} color="var(--accent-primary)" />}
                                </button>
                            );
                        })}
                    </div>

                    <AnimatePresence>
                        {showHint && topicFormulas.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ marginTop: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)', fontWeight: 600, marginBottom: '0.5rem' }}>
                                        <Lightbulb size={18} /> Related Topic Hint
                                    </div>
                                    {/* Just randomly pick one relevant formula for demonstration layout, or show the first one generally */}
                                    <div style={{ fontSize: '0.95rem' }}>
                                        <strong>{topicFormulas[currentIndex % topicFormulas.length].concept}:</strong> {topicFormulas[currentIndex % topicFormulas.length].shortcut}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {topicFormulas.length > 0 ? (
                            <button
                                className="btn btn-outline"
                                onClick={() => setShowHint(!showHint)}
                                style={{ color: showHint ? 'var(--warning)' : 'var(--text-secondary)', borderColor: showHint ? 'rgba(245, 158, 11, 0.5)' : 'var(--glass-border)' }}
                            >
                                <Lightbulb size={18} /> {showHint ? 'Hide Hint' : 'Show Hint'}
                            </button>
                        ) : <div />}

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={!selectedOption}
                        >
                            {currentIndex === questions.length - 1 ? 'Finish Section' : 'Next Question'}
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
