import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, Code, MessageSquare, Terminal, Lightbulb } from 'lucide-react';

const icons = {
    'Numerical Ability': <Calculator />,
    'Verbal Ability': <MessageSquare />,
    'Reasoning Ability': <Lightbulb />,
    'Programming Concepts': <Terminal />,
    'Coding _ DSA': <Code />,
    'default': <BookOpen />
};

export default function TopicSelection({ topics, onSelect, onStudy }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.95 }}
            variants={containerVariants}
            style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    Select your <span className="gradient-text">Domain</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Choose a specialized topic to begin your personalized Aptimaster practice session.
                </p>
            </div>

            <div className="topic-grid">
                {topics.map(topic => (
                    <motion.div
                        key={topic.id}
                        variants={itemVariants}
                        className="glass-card topic-card"
                        onClick={() => onSelect(topic.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="topic-icon">
                            {icons[topic.title] || icons['default']}
                        </div>
                        <div className="topic-info">
                            <h3>{topic.title.replace(/_/g, ' ')}</h3>
                            <p>{topic.description}</p>
                        </div>
                        <div className="topic-meta" style={{ width: '100%', justifyContent: 'space-between', background: 'transparent', padding: 0 }}>
                            <button
                                className="btn btn-outline"
                                style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem', justifyContent: 'center' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onStudy(topic.id);
                                }}
                            >
                                Study Guide
                            </button>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{topic.questionCount}</span> Qs
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
