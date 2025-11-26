import React from 'react';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hintCode: string;
}

const HintModal: React.FC<HintModalProps> = ({ isOpen, onClose, hintCode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 animate-scale-in border border-gray-100"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            代码提示
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
            <p className="text-sm text-blue-800 flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              参考代码仅供思路参考，建议先尝试独立解决问题。
            </p>
          </div>

          <div className="relative">
            <pre className="bg-gray-50 text-gray-800 p-5 rounded-lg text-sm font-mono overflow-x-auto custom-scrollbar border border-gray-200 shadow-inner">
              {hintCode}
            </pre>
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default HintModal;
