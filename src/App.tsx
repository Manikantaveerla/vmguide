import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  BrainCircuit, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  Menu, 
  X,
  GraduationCap,
  Trophy
} from 'lucide-react';
import { Topic, UserProgress } from './types';
import { SUBTOPIC_CONTENT } from './constants';
import { TopicContent } from './components/TopicContent';

export default function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsRes, progressRes] = await Promise.all([
          fetch('/api/topics'),
          fetch('/api/progress')
        ]);
        const topicsData = await topicsRes.json();
        const progressData = await progressRes.json();
        setTopics(topicsData);
        setProgress(progressData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubtopicSelect = (topic: Topic, subtopicId: string) => {
    setSelectedTopic(topic);
    setSelectedSubtopicId(subtopicId);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleQuizComplete = async (score: number) => {
    if (!selectedTopic || !selectedSubtopicId) return;

    const newProgress = {
      topic_id: selectedTopic.id,
      subtopic_id: selectedSubtopicId,
      status: 'completed' as const,
      score
    };

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgress)
      });
      
      // Update local state
      setProgress(prev => {
        const filtered = prev.filter(p => !(p.topic_id === selectedTopic.id && p.subtopic_id === selectedSubtopicId));
        return [...filtered, newProgress];
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const getProgressForSubtopic = (topicId: string, subtopicId: string) => {
    return progress.find(p => p.topic_id === topicId && p.subtopic_id === subtopicId);
  };

  const calculateTopicProgress = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return 0;
    const completed = topic.subtopics.filter(s => getProgressForSubtopic(topicId, s.id)?.status === 'completed').length;
    return Math.round((completed / topic.subtopics.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading AptiMaster...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600">
              <GraduationCap size={32} />
              <span className="text-xl font-bold tracking-tight text-slate-900">AptiMaster</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-8">
            <button 
              onClick={() => {
                setSelectedTopic(null);
                setSelectedSubtopicId(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                !selectedTopic ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </button>

            {topics.map(topic => (
              <div key={topic.id} className="space-y-2">
                <div className="px-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topic.title}</span>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    {calculateTopicProgress(topic.id)}%
                  </span>
                </div>
                <div className="space-y-1">
                  {topic.subtopics.map(subtopic => {
                    const isSelected = selectedSubtopicId === subtopic.id;
                    const isCompleted = getProgressForSubtopic(topic.id, subtopic.id)?.status === 'completed';
                    return (
                      <button
                        key={subtopic.id}
                        onClick={() => handleSubtopicSelect(topic, subtopic.id)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all ${
                          isSelected 
                            ? 'bg-emerald-50 text-emerald-700 font-medium' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{subtopic.title}</span>
                        {isCompleted && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                M
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Mani</p>
                <p className="text-xs text-slate-500">Beginner Learner</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-400 hover:text-slate-600">
                <Menu size={20} />
              </button>
            )}
            <h1 className="font-bold text-slate-900">
              {selectedTopic ? `${selectedTopic.title} / ${selectedTopic.subtopics.find(s => s.id === selectedSubtopicId)?.title}` : 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-bold border border-amber-100">
              <Trophy size={16} />
              <span>{progress.reduce((acc, curr) => acc + curr.score, 0)} Points</span>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <AnimatePresence mode="wait">
            {!selectedTopic ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-6xl mx-auto space-y-10"
              >
                <div className="bg-emerald-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-lg shadow-emerald-200">
                  <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Welcome back, Mani!</h2>
                    <p className="text-emerald-50 text-lg mb-8">
                      You've completed {progress.length} subtopics so far. Keep going to master your aptitude skills!
                    </p>
                    <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                      Continue Learning
                    </button>
                  </div>
                  <GraduationCap size={200} className="absolute -right-10 -bottom-10 text-emerald-500/30 rotate-12" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {topics.map(topic => (
                    <div key={topic.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                        topic.id === 'quantitative' ? 'bg-blue-100 text-blue-600' :
                        topic.id === 'logical' ? 'bg-purple-100 text-purple-600' :
                        'bg-rose-100 text-rose-600'
                      }`}>
                        {topic.id === 'quantitative' ? <BrainCircuit size={24} /> :
                         topic.id === 'logical' ? <BookOpen size={24} /> :
                         <MessageSquare size={24} />}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{topic.description}</p>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-medium">Progress</span>
                          <span className="text-slate-900 font-bold">{calculateTopicProgress(topic.id)}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              topic.id === 'quantitative' ? 'bg-blue-500' :
                              topic.id === 'logical' ? 'bg-purple-500' :
                              'bg-rose-500'
                            }`}
                            style={{ width: `${calculateTopicProgress(topic.id)}%` }}
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => handleSubtopicSelect(topic, topic.subtopics[0].id)}
                        className="mt-8 w-full flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-xl text-slate-600 font-bold group-hover:border-emerald-500 group-hover:text-emerald-600 transition-all"
                      >
                        Start Learning
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedSubtopicId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {selectedSubtopicId && SUBTOPIC_CONTENT[selectedSubtopicId] ? (
                  <TopicContent 
                    content={SUBTOPIC_CONTENT[selectedSubtopicId]} 
                    onQuizComplete={handleQuizComplete}
                  />
                ) : (
                  <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-slate-400">Content coming soon!</h3>
                    <p className="text-slate-500 mt-2">We are working on adding more topics to AptiMaster.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
