
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Problem, ProblemCategory } from '../types';

interface ProblemListProps {
  problems: Problem[];            // 所有题目列表
  selectedProblemId: number;      // 当前选中的题目ID
  onSelect: (problemId: number) => void; // 选择题目回调
  isCollapsed: boolean;           // 列表是否折叠
  onToggle: () => void;           // 切换折叠状态回调
  solvedProblemIds: Set<number>;  // 已解决的题目ID集合
}

const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
  const baseClasses = 'px-2 py-0.5 text-xs font-medium rounded-full ';
  const colorClasses = {
    '简单': 'bg-green-100 text-green-700',
    '中等': 'bg-yellow-100 text-yellow-800',
    '困难': 'bg-red-100 text-red-700',
  };

  return (
    <span className={`${baseClasses} ${colorClasses[difficulty] || 'bg-gray-100 text-gray-600'}`}>
      {difficulty}
    </span>
  );
};

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-90'}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);


const ProblemList: React.FC<ProblemListProps> = ({ problems, selectedProblemId, onSelect, isCollapsed, onToggle, solvedProblemIds }) => {
  const itemRefs = useRef<Map<number, HTMLLIElement | null>>(new Map());
  const listContainerRef = useRef<HTMLDivElement>(null);

  // 将题目按类别分组
  const groupedProblems = useMemo(() => {
    const categoryOrder: ProblemCategory[] = [
      'Python 语言基础',
      'Python 流程控制',
      'Python 数据结构：列表与元组',
      'Python 数据结构：字典与集合',
      'Python 函数与模块',
      '算法入门',
      '数据分析'
    ];
    const groups: Record<ProblemCategory, Problem[]> = {
      'Python 语言基础': [],
      'Python 流程控制': [],
      'Python 数据结构：列表与元组': [],
      'Python 数据结构：字典与集合': [],
      'Python 函数与模块': [],
      '算法入门': [],
      '数据分析': [],
    };

    for (const problem of problems) {
      if (groups[problem.category]) {
        groups[problem.category].push(problem);
      }
    }

    return categoryOrder.map(category => ({
      name: category,
      problems: groups[category],
    })).filter(group => group.problems.length > 0);
  }, [problems]);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const problem = problems.find(p => p.id === selectedProblemId);
    const initialCategory = problem ? problem.category : groupedProblems[0]?.name;
    return initialCategory ? { [initialCategory]: true } : {};
  });

  // 自动展开当前选中题目所属的类别
  useEffect(() => {
    const problem = problems.find(p => p.id === selectedProblemId);
    if (problem) {
      setOpenCategories(prev => {
        if (prev[problem.category]) {
          return prev;
        }
        return { ...prev, [problem.category]: true };
      });
    }
  }, [selectedProblemId, problems]);


  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex-shrink-0 flex items-center justify-between border-b border-gray-200">
        {!isCollapsed && (
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">题目列表</h3>
        )}
        <button
          onClick={onToggle}
          title={isCollapsed ? '展开题目列表' : '收起题目列表'}
          className={`text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-all duration-200 ${isCollapsed ? 'mx-auto rotate-180' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
      {!isCollapsed && (
        <div
          ref={listContainerRef}
          className="overflow-y-auto flex-grow p-2 space-y-1 overscroll-y-contain custom-scrollbar"
        >
          {groupedProblems.map(({ name, problems: problemGroup }) => (
            <div key={name} className="mb-2">
              <button onClick={() => toggleCategory(name)} className="w-full flex justify-between items-center px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium transition-colors text-sm">
                <span>{name} <span className="text-gray-400 ml-1 text-xs font-normal">({problemGroup.length})</span></span>
                <ChevronIcon isOpen={!!openCategories[name]} />
              </button>
              {openCategories[name] && (
                <ul className="mt-1 space-y-0.5">
                  {problemGroup.map(problem => {
                    const isSelected = selectedProblemId === problem.id;
                    const isSolved = solvedProblemIds.has(problem.id);
                    return (
                      <li key={problem.id} ref={el => { itemRefs.current.set(problem.id, el); }}>
                        <button
                          onClick={() => onSelect(problem.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-r-full border-l-4 transition-all duration-200 flex justify-between items-center group ${isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                            }`}
                          aria-current={isSelected ? 'page' : undefined}
                        >
                          <div className="flex items-center flex-grow pr-2 min-w-0">
                            <span className={`text-sm truncate ${isSelected ? 'font-medium' : ''}`}>
                              {problem.id}. {problem.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            {isSolved && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            <DifficultyBadge difficulty={problem.difficulty} />
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemList;
