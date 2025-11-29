
// 题目分类类型定义
export type ProblemCategory =
  | 'Python 语言基础'
  | 'Python 流程控制'
  | 'Python 数据结构：列表与元组'
  | 'Python 数据结构：字典与集合'
  | 'Python 函数与模块'
  | '算法入门'
  | '数据分析';

// 测试用例接口
export interface TestCase {
  input: string;          // 输入数据
  expectedOutput: string; // 预期输出数据
}

// 题目接口定义
export interface Problem {
  id: number;             // 题目唯一标识符
  title: string;          // 题目标题
  difficulty: '简单' | '中等' | '困难'; // 题目难度
  category: ProblemCategory; // 题目分类
  description: string;    // 题目详细描述 (支持 Markdown)
  inputFormat: string;    // 输入格式说明
  outputFormat: string;   // 输出格式说明
  examples: Array<{       // 示例列表
    input: string;
    output: string;
    explanation?: string; // 可选的解释
  }>;
  starterCode: string;    // 用户开始编写时的初始代码模板
  testCases: TestCase[];  // 用于评测的内部测试用例
  tags?: string[];        // 题目标签
  timeLimit?: string;     // 时间限制 (如 "1000ms")
  memoryLimit?: string;   // 内存限制 (如 "256MB")
}

// 评测结果状态类型
export type JudgeVerdict =
  | 'Accepted'              // 通过
  | 'Wrong Answer'          // 答案错误
  | 'Runtime Error'         // 运行错误
  | 'Time Limit Exceeded'   // 超时
  | 'Presentation Error'    // 格式错误 (如多余空格)
  | 'Compile Error'         // 编译/语法错误
  | 'Memory Limit Exceeded'; // 内存超限

// 评测结果详情接口
export interface JudgeResult {
  status: JudgeVerdict;   // 评测状态
  explanation: string;    // 结果解释 (展示给用户)
  output: string;         // 实际输出或错误信息
}

// 评测过程状态
export type JudgeStatus = 'idle' | 'judging' | 'finished' | 'error';

// 提交记录接口
export interface Submission {
  id: string;             // 提交ID (通常是时间戳)
  code: string;           // 提交的代码
  result: JudgeResult;    // 评测结果
  timestamp: Date;        // 提交时间
}

// ========== 认证相关类型 ==========

// 用户接口
export interface User {
  id: number;
  username: string;
  created_at: string;
}

// 设备接口
export interface Device {
  id: number;
  user_id: number;
  device_fingerprint: string;
  device_name: string;
  last_login: string;
  created_at: string;
}

// 认证响应
export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

// 登录凭据
export interface LoginCredentials {
  username: string;
  password: string;
  deviceFingerprint: string;
  deviceName?: string;
}

// 注册凭据
export interface RegisterCredentials {
  username: string;
  password: string;
  deviceFingerprint: string;
  deviceName: string;
}
