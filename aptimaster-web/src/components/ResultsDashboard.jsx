import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Target, RotateCcw, CheckCircle, XCircle, Info } from 'lucide-react';

export default function ResultsDashboard({ topic, questions, userAnswers, score, timeSpent, onRestart }) {
    const percentage = Math.round((score / questions.length) * 100);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="results-container"
            style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}
        >
            <div className="glass-card results-header">
                <Award size={48} color="var(--accent-primary)" style={{ margin: '0 auto' }} />
                <h2>Practice Complete</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{topic.title.replace(/_/g, ' ')}</p>

                <div className="score-display">
                    {percentage}%
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <Target size={24} color="var(--success)" style={{ margin: '0 auto 0.5rem' }} />
                        <div className="stat-value">{score}/{questions.length}</div>
                        <div className="stat-label">Correct</div>
                    </div>
                    <div className="stat-card">
                        <Clock size={24} color="var(--warning)" style={{ margin: '0 auto 0.5rem' }} />
                        <div className="stat-value">{formatTime(timeSpent)}</div>
                        <div className="stat-label">Time Taken</div>
                    </div>
                    <div className="stat-card">
                        <Award size={24} color="var(--accent-secondary)" style={{ margin: '0 auto 0.5rem' }} />
                        <div className="stat-value">{percentage >= 80 ? 'Expert' : percentage >= 50 ? 'Good' : 'Needs Practice'}</div>
                        <div className="stat-label">Performance</div>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={onRestart}>
                    <RotateCcw size={18} /> Practice Again
                </button>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                    Detailed Review
                </h3>
                <div className="review-section">
                    {questions.map((q, i) => {
                        const userAnswer = userAnswers[i];
                        const isCorrect = userAnswer?.isCorrect;

                        return (
                            <motion.div
                                key={i}
                                className={`glass-card review-card ${isCorrect ? 'correct-ans' : 'incorrect-ans'}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                style={{ padding: '1.5rem' }}
                            >
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ marginTop: '4px' }}>
                                        {isCorrect ? <CheckCircle color="var(--success)" size={24} /> : <XCircle color="var(--danger)" size={24} />}
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{q.questionText}</h4>

                                        <div className="review-answers">
                                            <div className={`user-ans ${!isCorrect ? 'incorrect' : ''}`}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Your Answer: </span>
                                                {userAnswer?.selected || 'Skipped'}
                                            </div>
                                            {!isCorrect && q.answer && (
                                                <div className="correct-ans-label">
                                                    <span>Correct Answer: </span>
                                                    {q.answer}
                                                </div>
                                            )}
                                        </div>

                                        {q.explanation && (
                                            <div className="explanation-box" style={{ marginTop: '1rem' }}>
                                                <div className="explanation-title">
                                                    <Info size={18} /> Explanation
                                                </div>
                                                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                                                    {q.explanation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
