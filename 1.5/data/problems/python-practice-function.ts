import { Problem } from '../../types';
import { pythonPracticeFunctionTestCases } from '../testcases/python-practice-function';

export const pythonPracticeFunctionProblems: Problem[] = [
    {
        id: 101,
        title: '定义简单函数',
        difficulty: '简单',
        category: 'Python 函数与模块',
        description: '定义一个名为 `add` 的函数，接收两个参数并返回它们的和。',
        inputFormat: '输入两个以空格分隔的数字。',
        outputFormat: '输出这两个数字的和。',
        tags: ['函数', '基础'],
        examples: [
            {
                input: '3 5',
                output: '8',
            }
        ],
        starterCode: `
def add(a, b):
    # 在这里编写你的代码
    pass

# 读取输入并调用函数
a, b = map(float, input().split())
# 如果是整数，显示为整数
result = add(a, b)
print(int(result) if result == int(result) else result)
`.trim(),
        testCases: pythonPracticeFunctionTestCases[101]
    },
    {
        id: 102,
        title: '默认参数',
        difficulty: '简单',
        category: 'Python 函数与模块',
        description: '定义一个名为 `greet` 的函数，接收一个参数 `name`，默认值为 "World"。函数返回 "Hello, {name}!"。',
        inputFormat: '输入一个名字（字符串）。',
        outputFormat: '输出问候语。',
        tags: ['函数', '参数'],
        examples: [
            {
                input: 'Alice',
                output: 'Hello, Alice!',
            }
        ],
        starterCode: `
def greet(name="World"):
    return f"Hello, {name}!"

name = input().strip()
if name:
    print(greet(name))
else:
    print(greet())
`.trim(),
        testCases: pythonPracticeFunctionTestCases[102]
    },
    {
        id: 103,
        title: '可变参数求和',
        difficulty: '中等',
        category: 'Python 函数与模块',
        description: '定义一个函数 `sum_all`，使用 `*args` 接收任意数量的参数，并返回它们的和。',
        inputFormat: '输入一行以空格分隔的数字。',
        outputFormat: '输出所有数字的和。',
        tags: ['函数', '*args'],
        examples: [
            {
                input: '1 2 3',
                output: '6',
            }
        ],
        starterCode: `
def sum_all(*args):
    # 在这里编写你的代码
    pass

nums = list(map(float, input().split()))
result = sum_all(*nums)
print(int(result) if result == int(result) else result)
`.trim(),
        testCases: pythonPracticeFunctionTestCases[103]
    },
    {
        id: 104,
        title: 'Lambda 函数',
        difficulty: '简单',
        category: 'Python 函数与模块',
        description: '定义一个 lambda 函数 `square`，计算一个数的平方。',
        inputFormat: '输入一个数字。',
        outputFormat: '输出该数字的平方。',
        tags: ['Lambda', '函数'],
        examples: [
            {
                input: '5',
                output: '25',
            }
        ],
        starterCode: `
# 定义 lambda 函数
square = lambda x: x # 修改这里

num = float(input())
result = square(num)
print(int(result) if result == int(result) else result)
`.trim(),
        testCases: pythonPracticeFunctionTestCases[104]
    },
    {
        id: 105,
        title: '递归求阶乘',
        difficulty: '中等',
        category: 'Python 函数与模块',
        description: '使用递归函数计算 n 的阶乘。',
        inputFormat: '输入一个非负整数 n。',
        outputFormat: '输出 n!。',
        tags: ['递归', '函数'],
        examples: [
            {
                input: '5',
                output: '120',
            }
        ],
        starterCode: `
def factorial(n):
    # 编写递归逻辑
    pass

n = int(input())
print(factorial(n))
`.trim(),
        testCases: pythonPracticeFunctionTestCases[105]
    },
    {
        id: 106,
        title: '使用 math 模块',
        difficulty: '简单',
        category: 'Python 函数与模块',
        description: '导入 `math` 模块，计算输入数字的平方根。',
        inputFormat: '输入一个非负数字。',
        outputFormat: '输出平方根。',
        tags: ['模块', 'math'],
        examples: [
            {
                input: '16',
                output: '4.0',
            }
        ],
        starterCode: `
import math

num = float(input())
# 使用 math.sqrt 计算
print(math.sqrt(num))
`.trim(),
        testCases: pythonPracticeFunctionTestCases[106]
    },
    {
        id: 107,
        title: '使用 datetime 模块',
        difficulty: '简单',
        category: 'Python 函数与模块',
        description: '导入 `datetime` 模块，将输入的日期字符串 "YYYY-MM-DD" 解析为日期对象，并输出其年份。',
        inputFormat: '输入日期字符串 "YYYY-MM-DD"。',
        outputFormat: '输出年份（整数）。',
        tags: ['模块', 'datetime'],
        examples: [
            {
                input: '2023-01-01',
                output: '2023',
            }
        ],
        starterCode: `
from datetime import datetime

date_str = input()
# 解析日期并输出年份
dt = datetime.strptime(date_str, "%Y-%m-%d")
print(dt.year)
`.trim(),
        testCases: pythonPracticeFunctionTestCases[107]
    },
    {
        id: 108,
        title: '修改列表 (可变参数)',
        difficulty: '简单',
        category: 'Python 函数与模块',
        description: '定义函数 `append_hundred`，接收一个列表，在列表末尾添加 100。注意列表是可变对象。',
        inputFormat: '输入一行以空格分隔的数字。',
        outputFormat: '输出修改后的列表。',
        tags: ['函数', '引用传递'],
        examples: [
            {
                input: '1 2 3',
                output: '1 2 3 100',
            }
        ],
        starterCode: `
def append_hundred(lst):
    # 修改列表
    pass

nums = list(map(int, input().split()))
append_hundred(nums)
print(" ".join(map(str, nums)))
`.trim(),
        testCases: pythonPracticeFunctionTestCases[108]
    },
    {
        id: 109,
        title: '关键字参数',
        difficulty: '简单',
        category: 'Python 函数与模块',
        description: '定义函数 `info`，接收 `name` 和 `age` 两个关键字参数，返回 "Name: {name}, Age: {age}"。',
        inputFormat: '输入名字和年龄，空格分隔。',
        outputFormat: '输出格式化字符串。',
        tags: ['函数', '参数'],
        examples: [
            {
                input: 'Alice 20',
                output: 'Name: Alice, Age: 20',
            }
        ],
        starterCode: `
def info(name, age):
    return f"Name: {name}, Age: {age}"

n, a = input().split()
print(info(name=n, age=a))
`.trim(),
        testCases: pythonPracticeFunctionTestCases[109]
    },
    {
        id: 110,
        title: '生成器函数',
        difficulty: '中等',
        category: 'Python 函数与模块',
        description: '定义一个生成器函数 `squares(n)`，生成 0 到 n-1 的平方数。',
        inputFormat: '输入整数 n。',
        outputFormat: '输出生成的平方数，空格分隔。',
        tags: ['生成器', 'yield'],
        examples: [
            {
                input: '5',
                output: '0 1 4 9 16',
            }
        ],
        starterCode: `
def squares(n):
    for i in range(n):
        yield i * i

n = int(input())
print(" ".join(map(str, squares(n))))
`.trim(),
        testCases: pythonPracticeFunctionTestCases[110]
    }
];
