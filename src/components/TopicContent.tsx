import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, BookOpen, Target } from 'lucide-react';
import { SubtopicContent } from '../types';
import { Quiz } from './Quiz';

interface TopicContentProps {
  content: SubtopicContent;
  onQuizComplete: (score: number) => void;
}

export const TopicContent: React.FC<TopicContentProps> = ({ content, onQuizComplete }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold">Explanation</h2>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 leading-relaxed text-slate-700">
          {content.explanation}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <Lightbulb size={24} />
          </div>
          <h2 className="text-2xl font-bold">Practical Shortcuts</h2>
        </div>
        <div className="grid gap-4">
          {content.shortcuts.map((shortcut, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl border-l-4 border-amber-400 shadow-sm flex items-start gap-4"
            >
              <div className="min-w-[24px] h-6 flex items-center justify-center bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
                {index + 1}
              </div>
              <p className="text-slate-700">{shortcut}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Target size={24} />
          </div>
          <h2 className="text-2xl font-bold">Practice Questions</h2>
        </div>
        <Quiz questions={content.questions} onComplete={onQuizComplete} />
      </section>
    </div>
  );
};
