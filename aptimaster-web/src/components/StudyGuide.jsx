import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Calculator, ChevronLeft } from 'lucide-react';

export default function StudyGuide({ topic, formulas, onClose }) {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={containerVariants}
            className="glass-card"
            style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <button className="btn btn-outline" onClick={onClose} style={{ padding: '0.5rem 1rem' }}>
                    <ChevronLeft size={18} /> Back
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen color="var(--accent-primary)" size={28} />
                    <h2 style={{ fontSize: '1.8rem' }}>Study Guide: {topic.title.replace(/_/g, ' ')}</h2>
                </div>
                <div style={{ width: '80px' }}></div> {/* Spacer for centering */}
            </div>

            <div style={{ padding: '1rem 0 2rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', textAlign: 'center' }}>
                    Review these critical formulas, mathematical shortcuts, and conceptual hints before jumping into the quiz. Knowing these speeds up your solving time significantly!
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {formulas.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
                        No specific formulas loaded for this topic. Use fundamental concepts!
                    </div>
                ) : (
                    formulas.map((item, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {item.concept}
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(300px, 2fr)', gap: '1.5rem' }}>
                                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                                        <Calculator size={16} /> Formula / Core Logic
                                    </div>
                                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                        {item.formula.replace(/\\n/g, '\n')}
                                    </pre>
                                </div>

                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--success)', fontWeight: 600 }}>
                                        <Zap size={16} /> Time-saving Shortcut / Hint
                                    </div>
                                    <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                        {item.shortcut}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

        </motion.div>
    );
}
