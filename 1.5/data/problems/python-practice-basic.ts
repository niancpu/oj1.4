import { Problem } from '../../types';
import { pythonPracticeBasicTestCases } from '../testcases/python-practice-basic';

export const pythonPracticeBasicProblems: Problem[] = [
    {
        id: 22,
        title: 'BMI 指数计算器',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输入身高（米）和体重（千克），计算 BMI = 体重 / 身高²。根据结果判断体型：\n- 偏瘦: < 18.5\n- 正常: 18.5 - 23.9\n- 超重: 24 - 27.9\n- 肥胖: ≥ 28',
        inputFormat: '第一行输入身高（米），第二行输入体重（千克）。',
        outputFormat: '输出体型等级（偏瘦、正常、超重、肥胖）。',
        tags: ['条件判断', '算术运算'],
        examples: [
            {
                input: '1.75\n65',
                output: '正常',
            }
        ],
        starterCode: `
try:
    height = float(input())
    weight = float(input())
    
    bmi = weight / (height ** 2)
    
    if bmi < 18.5:
        print("偏瘦")
    elif 18.5 <= bmi <= 23.9:
        print("正常")
    elif 24 <= bmi <= 27.9:
        print("超重")
    else:
        print("肥胖")
except ValueError:
    print("输入错误")
`.trim(),
        testCases: pythonPracticeBasicTestCases[22]
    },
    {
        id: 23,
        title: '温度转换',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入摄氏度（C）或华氏度（F），转换为另一种单位。\n公式：C = (F - 32) / 1.8，F = C * 1.8 + 32。',
        inputFormat: '输入一个字符串，如 "32C" 或 "98F"。',
        outputFormat: '输出转换后的温度，保留两位小数（如 "89.60F" 或 "0.00C"）。',
        tags: ['字符串处理', '算术运算'],
        examples: [
            {
                input: '32C',
                output: '89.60F',
            },
            {
                input: '100F',
                output: '37.78C'
            }
        ],
        starterCode: `
temp_str = input()
unit = temp_str[-1]
value = float(temp_str[:-1])

if unit == 'C':
    f = value * 1.8 + 32
    print(f"{f:.2f}F")
elif unit == 'F':
    c = (value - 32) / 1.8
    print(f"{c:.2f}C")
else:
    print("格式错误")
`.trim(),
        testCases: pythonPracticeBasicTestCases[23]
    },
    {
        id: 24,
        title: '打印九九乘法表',
        difficulty: '简单',
        category: 'Python 基础',
        description: '打印经典的九九乘法表。',
        inputFormat: '无输入。',
        outputFormat: '打印 9 行乘法表，每项格式为 "1x1=1"，项之间用空格分隔。',
        tags: ['循环', '格式化输出'],
        examples: [
            {
                input: '',
                output: '1x1=1\n1x2=2 2x2=4\n...',
            }
        ],
        starterCode: `
for i in range(1, 10):
    for j in range(1, i + 1):
        print(f"{j}x{i}={i*j}", end=" ")
    print()
`.trim(),
        testCases: pythonPracticeBasicTestCases[24]
    },
    {
        id: 25,
        title: '计算 1-100 的和',
        difficulty: '简单',
        category: 'Python 基础',
        description: '计算 1 到 100 所有整数的和。',
        inputFormat: '无输入。',
        outputFormat: '输出一个整数。',
        tags: ['循环', '数学'],
        examples: [
            {
                input: '',
                output: '5050',
            }
        ],
        starterCode: `
total = 0
for i in range(1, 101):
    total += i
print(total)
`.trim(),
        testCases: pythonPracticeBasicTestCases[25]
    },
    {
        id: 26,
        title: '判断闰年',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入年份，判断是否为闰年。\n规则：能被 4 整除但不能被 100 整除，或能被 400 整除。',
        inputFormat: '输入一个年份整数。',
        outputFormat: '如果是闰年输出 "Yes"，否则输出 "No"。',
        tags: ['条件判断', '逻辑运算'],
        examples: [
            {
                input: '2000',
                output: 'Yes',
            },
            {
                input: '2100',
                output: 'No'
            }
        ],
        starterCode: `
try:
    year = int(input())
    if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
        print("Yes")
    else:
        print("No")
except ValueError:
    print("输入错误")
`.trim(),
        testCases: pythonPracticeBasicTestCases[26]
    },
    {
        id: 27,
        title: '输入密码验证',
        difficulty: '简单',
        category: 'Python 基础',
        description: '预设密码 "123456"。用户输入密码，最多 3 次机会。正确提示 "登录成功"，3 次错误提示 "锁定"。',
        inputFormat: '多行输入，每行一个密码尝试。',
        outputFormat: '输出验证结果。',
        tags: ['循环', '条件判断'],
        examples: [
            {
                input: '123456',
                output: '登录成功',
            }
        ],
        starterCode: `
password = "123456"
for i in range(3):
    try:
        user_input = input()
        if user_input == password:
            print("登录成功")
            break
        else:
            if i == 2:
                print("锁定")
            else:
                pass # 继续循环
    except EOFError:
        break
`.trim(),
        testCases: pythonPracticeBasicTestCases[27]
    },
    {
        id: 28,
        title: '打印 100 以内的质数',
        difficulty: '中等',
        category: 'Python 基础',
        description: '输出 100 以内所有质数（大于 1 且只能被 1 和自身整除）。',
        inputFormat: '无输入。',
        outputFormat: '以空格分隔打印所有质数。',
        tags: ['循环', '素数判断'],
        examples: [
            {
                input: '',
                output: '2 3 5 7 ...',
            }
        ],
        starterCode: `
primes = []
for num in range(2, 101):
    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(num)
print(" ".join(map(str, primes)))
`.trim(),
        testCases: pythonPracticeBasicTestCases[28]
    },
    {
        id: 29,
        title: '整数反转',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入一个整数，反转后输出。例如 123 -> 321，-456 -> -654。',
        inputFormat: '输入一个整数。',
        outputFormat: '输出反转后的整数。',
        tags: ['字符串处理', '数学'],
        examples: [
            {
                input: '-123',
                output: '-321',
            }
        ],
        starterCode: `
s = input()
if s.startswith('-'):
    print('-' + s[1:][::-1])
else:
    print(s[::-1])
`.trim(),
        testCases: pythonPracticeBasicTestCases[29]
    },
    {
        id: 30,
        title: '计算平均分',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入 5 个学生成绩，计算平均分并判断等级（≥90 优秀、≥80 良好、≥60 及格、否则不及格）。',
        inputFormat: '一行输入 5 个整数，以空格分隔。',
        outputFormat: '第一行输出平均分（保留1位小数），第二行输出等级。',
        tags: ['列表', '条件判断'],
        examples: [
            {
                input: '90 95 85 80 92',
                output: '88.4\n良好',
            }
        ],
        starterCode: `
scores = list(map(int, input().split()))
avg = sum(scores) / len(scores)
print(f"{avg:.1f}")

if avg >= 90:
    print("优秀")
elif avg >= 80:
    print("良好")
elif avg >= 60:
    print("及格")
else:
    print("不及格")
`.trim(),
        testCases: pythonPracticeBasicTestCases[30]
    },
    {
        id: 31,
        title: '判断数字正负零',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入一个数，判断是正数、负数还是零。',
        inputFormat: '输入一个数字。',
        outputFormat: '输出 "Positive", "Negative" 或 "Zero"。',
        tags: ['条件判断'],
        examples: [
            {
                input: '-5',
                output: 'Negative',
            }
        ],
        starterCode: `
num = float(input())
if num > 0:
    print("Positive")
elif num < 0:
    print("Negative")
else:
    print("Zero")
`.trim(),
        testCases: pythonPracticeBasicTestCases[31]
    },
    {
        id: 32,
        title: '打印 1-100 内 3 的倍数',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输出 1 到 100 中所有能被 3 整除的数。',
        inputFormat: '无输入。',
        outputFormat: '以空格分隔打印。',
        tags: ['循环', '模运算'],
        examples: [
            {
                input: '',
                output: '3 6 9 ...',
            }
        ],
        starterCode: `
res = []
for i in range(1, 101):
    if i % 3 == 0:
        res.append(i)
print(" ".join(map(str, res)))
`.trim(),
        testCases: pythonPracticeBasicTestCases[32]
    },
    {
        id: 33,
        title: '交换两个变量的值',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入两个变量 a 和 b 的值，交换它们并输出。',
        inputFormat: '输入两个以空格分隔的值。',
        outputFormat: '输出交换后的两个值，以空格分隔。',
        tags: ['变量操作'],
        examples: [
            {
                input: '1 2',
                output: '2 1',
            }
        ],
        starterCode: `
a, b = input().split()
a, b = b, a
print(a, b)
`.trim(),
        testCases: pythonPracticeBasicTestCases[33]
    },
    {
        id: 34,
        title: '输入字符串统计长度',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入字符串，输出其长度（不含空格）。',
        inputFormat: '输入一行字符串。',
        outputFormat: '输出一个整数。',
        tags: ['字符串处理'],
        examples: [
            {
                input: 'hello world',
                output: '10',
            }
        ],
        starterCode: `
s = input()
length = len(s.replace(" ", ""))
print(length)
`.trim(),
        testCases: pythonPracticeBasicTestCases[34]
    },
    {
        id: 35,
        title: '判断字符串是否全为数字',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入字符串，判断是否只包含数字。',
        inputFormat: '输入一个字符串。',
        outputFormat: '如果是输出 "Yes"，否则输出 "No"。',
        tags: ['字符串处理'],
        examples: [
            {
                input: '123',
                output: 'Yes',
            },
            {
                input: '12a3',
                output: 'No'
            }
        ],
        starterCode: `
s = input()
if s.isdigit():
    print("Yes")
else:
    print("No")
`.trim(),
        testCases: pythonPracticeBasicTestCases[35]
    },
    {
        id: 36,
        title: '计算圆的面积和周长',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入半径 r，计算圆的面积（πr²）和周长（2πr）。保留两位小数。',
        inputFormat: '输入一个数字 r。',
        outputFormat: '第一行输出面积，第二行输出周长。',
        tags: ['数学', 'math模块'],
        examples: [
            {
                input: '3',
                output: '28.27\n18.85',
            }
        ],
        starterCode: `
import math
r = float(input())
area = math.pi * r * r
circumference = 2 * math.pi * r
print(f"{area:.2f}")
print(f"{circumference:.2f}")
`.trim(),
        testCases: pythonPracticeBasicTestCases[36]
    },
    {
        id: 37,
        title: '打印等腰三角形',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入边长 n，打印等腰三角形。',
        inputFormat: '输入一个整数 n。',
        outputFormat: '打印 n 行三角形。',
        tags: ['循环', '图形打印'],
        examples: [
            {
                input: '3',
                output: '  *\n ***\n*****',
            }
        ],
        starterCode: `
n = int(input())
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))
`.trim(),
        testCases: pythonPracticeBasicTestCases[37]
    },
    {
        id: 38,
        title: '简单计算器',
        difficulty: '简单',
        category: 'Python 基础',
        description: '输入两个数和运算符（+、-、*、/），输出计算结果。',
        inputFormat: '三行输入：数字1，运算符，数字2。',
        outputFormat: '输出计算结果。如果除数为0，输出 "Error"。',
        tags: ['条件判断', '算术运算'],
        examples: [
            {
                input: '1\n+\n2',
                output: '3.0',
            }
        ],
        starterCode: `
try:
    a = float(input())
    op = input()
    b = float(input())
    
    if op == '+':
        print(a + b)
    elif op == '-':
        print(a - b)
    elif op == '*':
        print(a * b)
    elif op == '/':
        if b == 0:
            print("Error")
        else:
            print(a / b)
    else:
        print("Invalid Operator")
except ValueError:
    print("Input Error")
`.trim(),
        testCases: pythonPracticeBasicTestCases[38]
    }
];
