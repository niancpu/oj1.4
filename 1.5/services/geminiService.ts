import { Problem, JudgeResult } from '../types';

// 使用阿里云 DashScope (通义千问) 的 OpenAI 兼容接口
// 文档: https://help.aliyun.com/zh/dashscope/developer-reference/compatibility-of-openai-with-dashscope
const API_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

function buildPrompt(problem: Problem, userCode: string): string {
  // 构建测试用例字符串
  const testCasesString = problem.testCases.map((tc, index) =>
    `测试用例 ${index + 1}:\n输入:\n${tc.input}\n预期输出:\n${tc.expectedOutput}`
  ).join('\n---\n');

  // 构建完整的 Prompt，包含问题描述、测试用例和用户代码
  return `
    你是一个专业的Python在线评测系统（Online Judge）。
    你的任务是根据给定的问题描述和一系列内部测试用例，来评测用户提交的Python代码。

    问题描述:
    标题: ${problem.title}
    描述: ${problem.description}
    输入格式: ${problem.inputFormat}
    输出格式: ${problem.outputFormat}

    内部测试用例:
    ${testCasesString}

    用户提交的Python代码:
    \`\`\`python
    ${userCode}
    \`\`\`

    评测指令:
    1. 模拟执行用户的代码。
    2. 比较代码的实际输出和预期输出（必须完全匹配，包括空格和换行）。
    3. 确定状态：
       - "Accepted": 全部通过。
       - "Wrong Answer": 输出不匹配。
       - "Runtime Error": 抛出异常。
       - "Time Limit Exceeded": 执行超时或死循环。
    4. 如果是 Wrong Answer，指出哪个测试用例失败。
    
    请务必仅返回一个标准的 JSON 对象，不要包含 markdown 格式化标记（如 \`\`\`json ... \`\`\`），格式如下：
    {
        "status": "Accepted" | "Wrong Answer" | "Runtime Error" | "Time Limit Exceeded",
        "explanation": "中文解释",
        "output": "代码输出示例"
    }
  `;
}

// 调用 AI 服务评测代码
export const judgeCode = async (problem: Problem, userCode: string): Promise<JudgeResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key 未配置。请配置阿里云 DashScope API Key。");
  }

  const prompt = buildPrompt(problem, userCode);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "qwen-plus", // 使用通义千问-Plus 模型，能力均衡
        messages: [
          {
            role: "system",
            content: "你是一个严格的Python代码评测助手。你必须只返回纯粹的JSON字符串，不要使用Markdown代码块包裹。"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.1, // 低温度以保证结果确定性
        response_format: { type: "json_object" } // 强制返回 JSON 对象
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 请求失败: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("API 返回了空内容");
    }

    // 清理可能存在的 Markdown 代码块标记（以防模型偶尔不遵守指令）
    const cleanJson = content.replace(/```json\n?|```/g, '').trim();

    const result = JSON.parse(cleanJson) as JudgeResult;
    return result;

  } catch (error) {
    console.error("Qwen API call failed:", error);
    // 能够更优雅地处理错误，返回给前端展示
    if (error instanceof Error) {
      throw new Error(`AI 评测服务调用失败: ${error.message}`);
    }
    throw new Error("调用AI评测服务失败。请检查网络或 API Key 设置。");
  }
};