import React, { useState, useEffect } from 'react';
import { JudgeResult, JudgeStatus, JudgeVerdict, Submission } from '../types';

interface ResultPanelProps {
  status: JudgeStatus;
  result: JudgeResult | null;
  history: Submission[];
}

const EvaluationProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('准备 Python 环境...');

  useEffect(() => {
    const timeline = [
      { time: 50, p: 10, t: '加载代码...' },
      { time: 200, p: 30, t: '解析 Python 语法...' },
      { time: 400, p: 60, t: '执行测试用例...' },
      { time: 600, p: 80, t: '比对标准输出...' },
      { time: 800, p: 90, t: '生成报告...' },
    ];

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    timeline.forEach(({ time, p, t }) => {
      const timeout = setTimeout(() => {
        setProgress(p);
        setStatusText(t);
      }, time);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center justify-center space-y-4 animate-fade-in">
      <div className="w-full flex justify-between text-xs text-gray-400 font-mono mb-1">
        <span>STATUS</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(59,130,246,0.3)]"
          style={{ width: `${progress}%` }}
        >
        </div>
      </div>
      <div className="h-6 flex items-center">
        <span className="text-gray-500 text-sm font-medium transition-all duration-300 animate-pulse">
          {statusText}
        </span>
      </div>
    </div>
  );
};

const ResultDisplay: React.FC<{ result: JudgeResult }> = ({ result }) => {
  const verdictConfig: Record<JudgeVerdict, { color: string; bg: string; text: string; icon: string }> = {
    'Accepted': { color: 'text-green-700', bg: 'bg-green-50', text: 'Accepted', icon: '✓' },
    'Wrong Answer': { color: 'text-red-700', bg: 'bg-red-50', text: 'Wrong Answer', icon: '✕' },
    'Runtime Error': { color: 'text-yellow-700', bg: 'bg-yellow-50', text: 'Runtime Error', icon: '⚠' },
    'Time Limit Exceeded': { color: 'text-purple-700', bg: 'bg-purple-50', text: 'Time Limit Exceeded', icon: '⏱' },
    'Presentation Error': { color: 'text-orange-700', bg: 'bg-orange-50', text: 'Presentation Error', icon: '📝' },
    'Compile Error': { color: 'text-blue-700', bg: 'bg-blue-50', text: 'Compile Error', icon: '🔨' },
    'Memory Limit Exceeded': { color: 'text-purple-700', bg: 'bg-purple-50', text: 'Memory Limit Exceeded', icon: '💾' }
  };

  const config = verdictConfig[result.status] || { color: 'text-gray-700', bg: 'bg-gray-50', text: result.status, icon: '?' };

  return (
    <div className="w-full animate-slide-up">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">评测结果</h3>
        <span className={`flex items-center gap-1.5 font-bold text-sm px-3 py-1 rounded-full ${config.bg} ${config.color} transition-all duration-300 hover:scale-105`}>
          <span>{config.icon}</span>
          <span>{config.text}</span>
        </span>
      </div>

      <div className="space-y-4">
        <div className="group">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2 group-hover:text-blue-500 transition-colors">详细信息</span>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 leading-relaxed transition-all duration-300 hover:border-blue-200 hover:shadow-sm">
            <p className="whitespace-pre-wrap">{result.explanation}</p>
          </div>
        </div>

        {result.output && (
          <div className="group">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2 group-hover:text-blue-500 transition-colors">输出 / 错误</span>
            <pre className="bg-gray-900 text-gray-200 p-4 rounded-xl text-sm whitespace-pre-wrap font-mono border border-gray-800 max-h-60 overflow-y-auto custom-scrollbar shadow-inner transition-all duration-300 group-hover:shadow-md">
              {result.output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const ResultPanel: React.FC<ResultPanelProps> = ({ status, result, history }) => {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>('latest');
  const [viewedResult, setViewedResult] = useState<JudgeResult | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (status === 'judging' || status === 'idle') {
      setSelectedSubmissionId('latest');
      setViewedResult(null);
    } else if (result) {
      setSelectedSubmissionId('latest');
      setViewedResult(result);
    }
  }, [status, result]);

  const handleHistoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedSubmissionId(id);
    if (id === 'latest') {
      setViewedResult(result);
    } else {
      const historicSubmission = history.find(sub => sub.id === id);
      if (historicSubmission) {
        setViewedResult(historicSubmission.result);
      }
    }
  };

  useEffect(() => {
    setShowPanel(false);
    const timer = setTimeout(() => setShowPanel(true), 50);
    return () => clearTimeout(timer);
  }, [status, viewedResult]);

  const renderContent = () => {
    if (status === 'idle') {
      return (
        <div className="text-center text-gray-400 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium">准备就绪</p>
          <p className="text-xs text-gray-400 mt-1">点击运行按钮开始评测</p>
        </div>
      );
    }

    if (status === 'judging') {
      return <EvaluationProgress />;
    }

    if (viewedResult) {
      return (
        <div className="w-full h-full flex flex-col">
          {history.length > 0 && (
            <div className="mb-4 flex items-center justify-end animate-fade-in">
              <div className="relative group">
                <select
                  id="history-select"
                  value={selectedSubmissionId}
                  onChange={handleHistoryChange}
                  className="appearance-none bg-white border border-gray-200 text-gray-600 text-xs rounded-lg pl-3 pr-8 py-1.5 cursor-pointer hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                >
                  <option value="latest">最新评测</option>
                  {history.map(submission => (
                    <option key={submission.id} value={submission.id}>
                      {new Date(submission.timestamp).toLocaleTimeString()} - {submission.result.status}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 group-hover:text-blue-500 transition-colors">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          )}
          <div className="flex-grow overflow-y-auto custom-scrollbar pr-1">
            <ResultDisplay result={viewedResult} />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full overflow-hidden transition-all duration-500 ease-out hover:shadow-md ${showPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex flex-col items-center justify-center h-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default ResultPanel;
