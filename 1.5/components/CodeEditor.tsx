import React from 'react';
import Editor, { loader } from '@monaco-editor/react';

// 配置 Monaco Editor 的 CDN 路径
loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onShowHints: () => void;
}

const HintButton: React.FC<{ onShow: () => void }> = ({ onShow }) => (
  <button
    onClick={onShow}
    className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-sm active:scale-95 border border-blue-200 group"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    代码提示
  </button>
);

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, onShowHints }) => {
  return (
    <div className="flex flex-col flex-grow h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="bg-gray-50/80 backdrop-blur-sm px-4 py-2 border-b border-gray-200 flex justify-between items-center flex-shrink-0 h-10">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="text-sm font-medium text-gray-600">main.py</span>
        </div>
        <HintButton onShow={onShowHints} />
      </div>
      <div className="flex-grow relative">
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs" // Light theme
          value={value}
          onChange={(val) => onChange(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            fontFamily: "'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
            contextmenu: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: 'line',
            renderLineHighlightOnlyWhenFocus: true,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
          }}
          loading={
            <div className="flex items-center justify-center h-full text-gray-400 animate-pulse">
              <span className="mr-2">⚡</span> 加载编辑器...
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CodeEditor;