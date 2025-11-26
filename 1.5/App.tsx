
import React, { useState, useCallback, useEffect } from 'react';
import { Problem, JudgeResult, JudgeStatus, Submission } from './types';
import { PROBLEMS } from './constants';
import ProblemList from './components/ProblemList';
import ProblemDisplay from './components/ProblemDisplay';
import CodeEditor from './components/CodeEditor';
import ResultPanel from './components/ResultPanel';
import HintModal from './components/HintModal';
import { judgeCode, initializePyodide } from './services/pyodideService';

const App: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(PROBLEMS[0]); // 当前选中的题目
  const [isHintModalOpen, setIsHintModalOpen] = useState(false); // 提示模态框是否打开
  const [userCode, setUserCode] = useState<string>(''); // 用户当前编辑的代码
  const [judgeStatus, setJudgeStatus] = useState<JudgeStatus>('idle'); // 当前评测状态
  const [judgeResult, setJudgeResult] = useState<JudgeResult | null>(null); // 评测结果
  const [isProblemListCollapsed, setIsProblemListCollapsed] = useState(false); // 题目列表是否折叠

  // 提交历史记录 State: Map<ProblemID, Submission[]>
  const [submissionHistory, setSubmissionHistory] = useState<Record<number, Submission[]>>({});
  const [solvedProblemIds, setSolvedProblemIds] = useState<Set<number>>(new Set()); // 已解决的题目ID集合

  // Python 引擎初始化状态
  const [isEngineReady, setIsEngineReady] = useState(false); // Pyodide 是否准备就绪
  const [engineLoadingText, setEngineLoadingText] = useState('正在下载 Python 引擎 (Pyodide)...'); // 加载提示文案

  // 初始化 Pyodide
  useEffect(() => {
    const init = async () => {
      try {
        setEngineLoadingText('正在启动 Python 虚拟机...');
        await initializePyodide();
        setEngineLoadingText('Python 环境准备就绪！');
        // 短暂延迟后移除遮罩
        setTimeout(() => setIsEngineReady(true), 500);
      } catch (error) {
        setEngineLoadingText('Python 引擎加载失败，请刷新页面重试。');
        console.error("Pyodide init failed", error);
      }
    };
    init();
  }, []);

  // 加载已解决的题目记录
  useEffect(() => {
    try {
      const savedSolved = localStorage.getItem('oj_solved_problems');
      if (savedSolved) {
        const ids = JSON.parse(savedSolved);
        if (Array.isArray(ids)) {
          setSolvedProblemIds(new Set(ids));
        }
      }
    } catch (e) {
      console.error('Failed to load solved problems', e);
    }
  }, []);

  // 切换题目时的处理逻辑
  const handleProblemChange = useCallback((problemId: number) => {
    const newProblem = PROBLEMS.find(p => p.id === problemId);
    if (newProblem) {
      setSelectedProblem(newProblem);
      setUserCode(''); // 切换题目时清空编辑器，避免代码混淆
      setJudgeResult(null); // 重置评测结果
      setJudgeStatus('idle'); // 重置评测状态
    }
  }, []);

  // 切换题目列表的折叠状态
  const toggleProblemList = useCallback(() => {
    setIsProblemListCollapsed(prev => !prev);
  }, []);

  const handleShowHints = () => setIsHintModalOpen(true);
  const handleCloseHints = () => setIsHintModalOpen(false);

  // 处理代码提交
  const handleSubmit = async () => {
    if (!userCode.trim()) {
      alert('代码不能为空！');
      return;
    }
    if (!isEngineReady) {
      alert('Python 引擎尚未加载完成，请稍候...');
      return;
    }

    setJudgeStatus('judging');
    setJudgeResult(null);

    try {
      // 使用本地 Pyodide 服务进行评测
      const result = await judgeCode(selectedProblem, userCode);

      setJudgeResult(result);
      setJudgeStatus('finished');

      // 创建新的提交记录
      const newSubmission: Submission = {
        id: Date.now().toString(),
        code: userCode,
        result: result,
        timestamp: new Date(),
      };

      // 更新历史记录，每个题目只保留最近 10 条
      setSubmissionHistory(prev => {
        const currentHistory = prev[selectedProblem.id] || [];
        const newHistory = [newSubmission, ...currentHistory].slice(0, 10);
        return {
          ...prev,
          [selectedProblem.id]: newHistory
        };
      });

      // 如果通过，更新已解决列表并持久化到 localStorage
      if (result.status === 'Accepted') {
        setSolvedProblemIds(prev => {
          const newSet = new Set(prev);
          newSet.add(selectedProblem.id);
          localStorage.setItem('oj_solved_problems', JSON.stringify(Array.from(newSet)));
          return newSet;
        });
      }

    } catch (error) {
      console.error('Judging error:', error);
      const errorMessage = error instanceof Error ? error.message : '发生未知错误';

      const errorResult: JudgeResult = {
        status: 'Runtime Error',
        explanation: `系统错误: ${errorMessage}`,
        output: ''
      };

      setJudgeResult(errorResult);
      setJudgeStatus('error');
    }
  };

  // 全屏加载遮罩
  if (!isEngineReady) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex flex-col items-center justify-center text-gray-800 z-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h1 className="text-xl font-medium text-gray-700 mb-2">OJ 初始化中</h1>
        <p className="text-gray-500 text-sm">{engineLoadingText}</p>
        <p className="text-xs text-gray-400 mt-4">初次加载可能需要下载约 10MB 数据</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      <header className="bg-white border-b border-gray-200 shadow-sm flex-none sticky top-0 z-20 h-16">
        <nav className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h1 className="text-xl font-medium text-gray-700 tracking-tight">
              Online Judge <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-2 font-medium">Local</span>
            </h1>
          </div>
          <div className="text-sm text-gray-500">
            Python 练习平台
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-4 lg:p-6 overflow-hidden flex flex-col h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Problem List Column */}
          <div className={`h-full min-h-0 transition-all duration-500 ease-in-out flex flex-col animate-slide-up ${isProblemListCollapsed ? 'lg:col-span-1' : 'lg:col-span-3'}`} style={{ animationDelay: '0.1s' }}>
            <ProblemList
              problems={PROBLEMS}
              selectedProblemId={selectedProblem.id}
              onSelect={handleProblemChange}
              isCollapsed={isProblemListCollapsed}
              onToggle={toggleProblemList}
              solvedProblemIds={solvedProblemIds}
            />
          </div>

          {/* Problem Display Column */}
          <div className={`h-full min-h-0 transition-all duration-500 ease-in-out overflow-hidden animate-slide-up ${isProblemListCollapsed ? 'lg:col-span-5' : 'lg:col-span-4'}`} style={{ animationDelay: '0.2s' }}>
            <ProblemDisplay problem={selectedProblem} />
          </div>

          {/* Right Column: Editor, Button, Result */}
          <div className={`flex flex-col h-full min-h-0 transition-all duration-500 ease-in-out animate-slide-up ${isProblemListCollapsed ? 'lg:col-span-6' : 'lg:col-span-5'}`} style={{ animationDelay: '0.3s' }}>
            <div className="flex-grow min-h-0 flex flex-col">
              <CodeEditor
                value={userCode}
                onChange={setUserCode}
                onShowHints={handleShowHints}
              />
            </div>
            <div className="flex-shrink-0 py-3">
              <button
                onClick={handleSubmit}
                disabled={judgeStatus === 'judging'}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm text-sm flex items-center justify-center space-x-2"
              >
                {judgeStatus === 'judging' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>运行中...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>运行并提交</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex-grow min-h-0 relative">
              <ResultPanel
                status={judgeStatus}
                result={judgeResult}
                history={submissionHistory[selectedProblem.id] || []}
              />
            </div>
          </div>
        </div>
      </main>
      <HintModal
        isOpen={isHintModalOpen}
        onClose={handleCloseHints}
        hintCode={selectedProblem.starterCode}
      />
    </div>
  );
};

export default App;
