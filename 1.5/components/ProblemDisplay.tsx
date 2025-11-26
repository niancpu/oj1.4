
import React, { useState } from 'react';
import { Problem } from '../types';

interface ProblemDisplayProps {
  problem: Problem;
}

// 难度徽章组件
const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
  const colorClasses = {
    '简单': 'bg-green-100 text-green-700',
    '中等': 'bg-yellow-100 text-yellow-800',
    '困难': 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${colorClasses[difficulty] || 'bg-gray-100 text-gray-600'}`}>
      {difficulty}
    </span>
  );
};

// 可复制的代码块组件
const CopyablePre: React.FC<{ content: string }> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group mt-2">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
        title="复制"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      <pre className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap font-mono text-sm custom-scrollbar overflow-x-auto text-gray-800 border border-gray-200">
        {content}
      </pre>
    </div>
  );
};

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem }) => {
  const timeLimit = problem.timeLimit || '1000ms';
  const memoryLimit = problem.memoryLimit || '256MB';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-y-auto overscroll-y-contain custom-scrollbar p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-normal text-gray-900">{problem.title}</h2>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      {/* 题目元信息: 时间/内存限制 & 标签 */}
      <div className="flex flex-col space-y-3 mb-8">
        <div className="flex items-center space-x-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded border border-gray-100" title="时间限制">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{timeLimit}</span>
          </div>
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded border border-gray-100" title="内存限制">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span>{memoryLimit}</span>
          </div>
        </div>

        {problem.tags && problem.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {problem.tags.map((tag, index) => (
              <span key={index} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full border border-blue-100">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none text-gray-700">
        <p className="mb-8 leading-relaxed">{problem.description}</p>

        <h3 className="text-lg font-medium text-gray-900 mb-2">输入格式</h3>
        <p className="text-gray-600 mb-6">{problem.inputFormat}</p>

        <h3 className="text-lg font-medium text-gray-900 mb-2">输出格式</h3>
        <p className="text-gray-600 mb-8">{problem.outputFormat}</p>

        {problem.examples.map((example, index) => (
          <div key={index} className="mt-6">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">示例 {index + 1}</h4>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">输入</div>
                <div className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{example.input}</div>
              </div>
              <div className="p-4 bg-white">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">输出</div>
                <div className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{example.output}</div>
              </div>
            </div>
            {example.explanation && (
              <div className="mt-2 flex items-start text-sm text-gray-500 bg-blue-50 p-3 rounded-md border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>{example.explanation}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemDisplay;
