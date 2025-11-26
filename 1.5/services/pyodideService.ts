
import { Problem, JudgeResult, JudgeVerdict } from '../types';

// 声明 Pyodide 全局类型
declare global {
  interface Window {
    loadPyodide: any;
  }
}

let pyodide: any = null;

// 初始化 Pyodide 并预加载常用库
export const initializePyodide = async () => {
  if (pyodide) return; // 避免重复初始化

  console.log("正在初始化 Pyodide...");
  pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
  });

  console.log("正在加载 Python 库 (numpy, pandas)...");
  // 加载常用数据科学库
  await pyodide.loadPackage(['numpy', 'pandas', 'pytz']);
  console.log("Python 环境准备就绪");
};

// 构建运行代码的 Python 包装器
// 这个包装器会重定向 sys.stdin 和 sys.stdout，以便我们在 JS 中注入输入并捕获输出
const buildPythonRunner = (userCode: string, inputData: string) => {
  // 转义输入数据中的引号和反斜杠，防止破坏 Python 字符串
  const safeInput = inputData.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');

  return `
import sys
import io

# 模拟标准输入
class MockStdin(io.TextIOBase):
    def __init__(self, input_str):
        self.inputs = input_str.split('\\n')
        self.index = 0
    
    def readline(self):
        if self.index < len(self.inputs):
            line = self.inputs[self.index]
            self.index += 1
            return line + '\\n' # input() 期望每一行都有换行符
        return ''

# 重置 stdin 和 stdout
sys.stdin = MockStdin('${safeInput}')
sys.stdout = io.StringIO()

try:
    # 用户代码区域
${userCode.split('\n').map(line => '    ' + line).join('\n')}
    
except SystemExit:
    pass
except Exception as e:
    # 重新抛出异常以便 JS 捕获，或者打印到 stdout
    # 这里我们选择打印特殊标记的错误，或者直接让 pyodide 抛出
    raise e
`;
};

// 执行评测的主函数
export const judgeCode = async (problem: Problem, userCode: string): Promise<JudgeResult> => {
  if (!pyodide) {
    await initializePyodide();
  }

  let allPassed = true;
  let failedCaseIndex = -1;
  let failedOutput = "";
  let failedExpected = "";
  let errorType: JudgeVerdict = 'Runtime Error';
  let errorMsg = "";

  // 遍历所有测试用例
  for (let i = 0; i < problem.testCases.length; i++) {
    const testCase = problem.testCases[i];
    const pythonScript = buildPythonRunner(userCode, testCase.input);

    try {
      // 运行 Python 代码
      await pyodide.runPythonAsync(pythonScript);

      // 获取捕获的标准输出
      const actualOutputRaw = pyodide.runPython("sys.stdout.getvalue()");

      // 严格评测逻辑
      // 1. 去除行尾的空格和整个输出末尾的换行符 (标准做法)
      const normalize = (str: string) => str.trim().replace(/[ \t]+$/gm, '');
      const actual = normalize(actualOutputRaw);
      const expected = normalize(testCase.expectedOutput);

      if (actual !== expected) {
        allPassed = false;
        failedCaseIndex = i;
        failedOutput = actualOutputRaw.trim(); // 展示给用户看的时候trim一下
        failedExpected = testCase.expectedOutput.trim();

        // 检测是否是格式错误 (Presentation Error)
        // 移除所有空白字符后比较
        const stripAll = (s: string) => s.replace(/\s+/g, '');
        if (stripAll(actual) === stripAll(expected)) {
          errorType = 'Presentation Error';
          errorMsg = "答案正确，但格式（空格或换行）不符合要求。";
        } else {
          errorType = 'Wrong Answer';
          errorMsg = `测试用例 ${i + 1} 未通过。`;
        }

        break;
      }

    } catch (err: any) {
      allPassed = false;
      failedCaseIndex = i;

      // 区分编译错误(语法)和运行错误
      const errName = err.name || ""; // Pyodide error names
      const errMessage = err.message || "";

      if (errName.includes("SyntaxError") || errName.includes("IndentationError")) {
        errorType = 'Compile Error';
        errorMsg = `代码存在语法错误 (Syntax Error)。`;
      } else {
        errorType = 'Runtime Error';
        errorMsg = `运行时发生错误 (Runtime Error)。`;
      }

      // 提取 Python 错误堆栈的最后几行，通常包含有用的错误信息
      const lines = errMessage.split('\n');
      // 简单的清理逻辑，尝试只保留 Python 报错部分
      const pyErrorIndex = lines.findIndex((l: string) => l.includes('File "<exec>"'));
      failedOutput = pyErrorIndex !== -1 ? lines.slice(pyErrorIndex).join('\n') : errMessage;

      break;
    }
  }

  if (allPassed) {
    return {
      status: 'Accepted',
      explanation: '恭喜！你的代码通过了所有测试用例。',
      output: 'All tests passed successfully.'
    };
  } else {
    let explanation = errorMsg;
    if (errorType === 'Wrong Answer' || errorType === 'Presentation Error') {
      explanation += `\n输入:\n${problem.testCases[failedCaseIndex].input}\n预期输出:\n${failedExpected}`;
    }

    return {
      status: errorType,
      explanation: explanation,
      output: failedOutput
    };
  }
};
