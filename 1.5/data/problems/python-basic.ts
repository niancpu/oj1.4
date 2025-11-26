import { Problem } from '../../types';
import { pythonBasicTestCases } from '../testcases/python-basic';

export const pythonBasicProblems: Problem[] = [
    {
        id: 1,
        title: 'A + B 问题',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '这是一个经典的入门问题。你的任务是计算两个整数的和。',
        inputFormat: '输入包含两个整数 a 和 b，以空格分隔。',
        outputFormat: '输出一个整数，即 a 和 b 的和。',
        tags: ['基础输入输出', '算术运算'],
        examples: [
            {
                input: '1 5',
                output: '6',
            },
            {
                input: '-1 1',
                output: '0'
            }
        ],
        starterCode: `
# 读取一行输入，分割成两个数，并转换成整数
try:
    a, b = map(int, input().split())
    
    # 你的任务是计算 a 和 b 的和
    result = a + b
    
    print(result)

except (ValueError, IndexError):
    print("输入格式错误，请输入两个整数，以空格分隔。")
`.trim(),
        testCases: pythonBasicTestCases[1]
    },
    {
        id: 3,
        title: '字符串反转',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '编写一个程序，接收一个字符串作为输入，然后输出这个字符串的反转形式。',
        inputFormat: '输入一行，包含一个字符串。',
        outputFormat: '输出反转后的字符串。',
        tags: ['字符串', '切片'],
        examples: [
            {
                input: 'hello',
                output: 'olleh',
            },
            {
                input: 'Python',
                output: 'nohtyP'
            }
        ],
        starterCode: `
# 读取一行输入
s = input()

# 在这里编写你的代码来反转字符串 s
# 提示: 可以使用 Python 的切片功能 s[::-1]
reversed_s = s[::-1]

print(reversed_s)
`.trim(),
        testCases: pythonBasicTestCases[3]
    },
    {
        id: 4,
        title: '判断奇偶数',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '给定一个整数，判断它是奇数还是偶数。',
        inputFormat: '输入一个整数。',
        outputFormat: '如果该数是偶数，输出 "Even"。如果是奇数，输出 "Odd"。',
        tags: ['条件判断', '模运算'],
        examples: [
            {
                input: '4',
                output: 'Even',
            },
            {
                input: '7',
                output: 'Odd'
            }
        ],
        starterCode: `
try:
    # 读取一个整数
    num = int(input())
    
    # 在这里编写你的代码来判断 num 是奇数还是偶数
    if num % 2 == 0:
        print("Even")
    else:
        print("Odd")

except ValueError:
    print("输入无效，请输入一个整数。")
`.trim(),
        testCases: pythonBasicTestCases[4]
    },
    {
        id: 5,
        title: '列表元素求和',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '计算给定整数列表的所有元素之和。',
        inputFormat: '输入一行，包含多个以空格分隔的整数。',
        outputFormat: '输出这些整数的和。',
        tags: ['列表', '内置函数sum'],
        examples: [
            {
                input: '1 2 3 4 5',
                output: '15',
            },
            {
                input: '10 -1 5',
                output: '14'
            }
        ],
        starterCode: `
try:
    # 读取一行输入，并将其转换为整数列表
    numbers = list(map(int, input().split()))
    
    # 在这里编写你的代码来计算列表中所有元素的和
    total = sum(numbers)
    
    print(total)

except ValueError:
    print("输入格式错误，请输入以空格分隔的整数。")
`.trim(),
        testCases: pythonBasicTestCases[5]
    },
    {
        id: 16,
        title: '查找列表最大值',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '给定一个整数列表，找出其中的最大值。',
        inputFormat: '输入一行，包含多个以空格分隔的整数。',
        outputFormat: '输出列表中的最大值。',
        tags: ['列表', '内置函数max'],
        examples: [
            {
                input: '1 9 2 8 5',
                output: '9',
            },
            {
                input: '-1 -5 -2',
                output: '-1'
            }
        ],
        starterCode: `
try:
    numbers = list(map(int, input().split()))
    if not numbers:
        print("列表为空")
    else:
        # 找出列表中的最大值
        max_val = max(numbers)
        print(max_val)
except ValueError:
    print("输入格式错误。")
`.trim(),
        testCases: pythonBasicTestCases[16]
    },
    {
        id: 17,
        title: '计算阶乘',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '计算一个非负整数的阶乘。阶乘的定义是 n! = n * (n-1) * ... * 1。规定 0! = 1。',
        inputFormat: '输入一个非负整数 n。',
        outputFormat: '输出 n 的阶乘。',
        tags: ['算法', '循环'],
        examples: [
            {
                input: '5',
                output: '120',
                explanation: '5! = 5 * 4 * 3 * 2 * 1 = 120'
            },
            {
                input: '0',
                output: '1'
            }
        ],
        starterCode: `
def factorial(n):
    if n == 0:
        return 1
    # 在这里实现阶乘计算
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

try:
    num = int(input())
    if num < 0:
        print("请输入非负整数")
    else:
        print(factorial(num))
except ValueError:
    print("输入格式错误。")
`.trim(),
        testCases: pythonBasicTestCases[17]
    },
    {
        id: 18,
        title: '检查回文串',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '判断一个字符串是否是回文串。回文串是指正读和反读都一样的字符串。',
        inputFormat: '输入一个字符串。',
        outputFormat: '如果是回文串，输出 "Yes"；否则输出 "No"。',
        tags: ['字符串', '切片', '条件判断'],
        examples: [
            {
                input: 'level',
                output: 'Yes',
            },
            {
                input: 'python',
                output: 'No'
            }
        ],
        starterCode: `
s = input()

# 判断 s 是否是回文串
if s == s[::-1]:
    print("Yes")
else:
    print("No")
`.trim(),
        testCases: pythonBasicTestCases[18]
    }
];
