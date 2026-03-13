import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ChevronRight } from 'lucide-react';
import './index.css';
import formulasData from './assets/formulas.json';
import topicsData from './assets/topics.json';

import TopicSelection from './components/TopicSelection';
import QuizEngine from './components/QuizEngine';
import ResultsDashboard from './components/ResultsDashboard';
import StudyGuide from './components/StudyGuide';

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'study', 'quiz', 'results'
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  // Helper to extract clean topics array from JSON object
  const topicsList = Object.keys(topicsData).map(key => ({
    id: key,
    title: key,
    questionCount: topicsData[key].length,
    description: `Master questions related to ${key}.`
  }));

  const handleStartQuiz = (topicId) => {
    // Select the topic questions
    const questions = topicsData[topicId];
    // Pick up to 10 random questions for the quiz mode
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));

    setSelectedTopic(topicsList.find(t => t.id === topicId));
    setQuizData(selected);
    setUserAnswers([]);
    setQuizScore(0);
    setTimeSpent(0);
    setGameState('quiz');
  };

  const handleQuizComplete = (answers, score, time) => {
    setUserAnswers(answers);
    setQuizScore(score);
    setTimeSpent(time);
    setGameState('results');
  };

  const handleOpenStudy = (topicId) => {
    setSelectedTopic(topicsList.find(t => t.id === topicId));
    setGameState('study');
  };

  const handleReturnToMenu = () => {
    setGameState('menu');
    setSelectedTopic(null);
  };

  return (
    <>
      <div className="bg-gradient">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="app-container">
        <header>
          <motion.div
            className="logo-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="logo-icon">
              <BrainCircuit size={28} />
            </div>
            <div className="logo-text" style={{ fontSize: '1.75rem', letterSpacing: '-1px' }}>
              <span style={{ color: 'var(--text-primary)' }}>vm</span>
              <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>guide</span>
            </div>
          </motion.div>
          {gameState !== 'menu' && (
            <motion.button
              className="btn btn-outline"
              onClick={handleReturnToMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Back to Menu
            </motion.button>
          )}
        </header>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            {gameState === 'menu' && (
              <TopicSelection
                key="menu"
                topics={topicsList}
                onSelect={handleStartQuiz}
                onStudy={handleOpenStudy}
              />
            )}

            {gameState === 'study' && (
              <StudyGuide
                key="study"
                topic={selectedTopic}
                formulas={formulasData[selectedTopic.id] || []}
                onClose={handleReturnToMenu}
              />
            )}

            {gameState === 'quiz' && (
              <QuizEngine
                key="quiz"
                topic={selectedTopic}
                questions={quizData}
                onComplete={handleQuizComplete}
              />
            )}

            {gameState === 'results' && (
              <ResultsDashboard
                key="results"
                topic={selectedTopic}
                questions={quizData}
                userAnswers={userAnswers}
                score={quizScore}
                timeSpent={timeSpent}
                onRestart={() => handleStartQuiz(selectedTopic.id)}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

export default App;
