import { Problem } from '../../types';
import { pythonPracticeLogicTestCases } from '../testcases/python-practice-logic';

export const pythonPracticeLogicProblems: Problem[] = [
    {
        id: 39,
        title: '最大公约数 (GCD)',
        difficulty: '简单',
        category: 'Python 流程控制',
        description: '输入两个正整数，计算它们的最大公约数。',
        inputFormat: '输入两个整数，以空格分隔。',
        outputFormat: '输出最大公约数。',
        tags: ['数学', '算法'],
        examples: [
            {
                input: '12 18',
                output: '6',
            }
        ],
        starterCode: `
import math

try:
    a, b = map(int, input().split())
    print(math.gcd(a, b))
except ValueError:
    print("输入错误")
`.trim(),
        testCases: pythonPracticeLogicTestCases[39]
    },
    {
        id: 40,
        title: '最小公倍数 (LCM)',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输入两个正整数，计算它们的最小公倍数。',
        inputFormat: '输入两个整数，以空格分隔。',
        outputFormat: '输出最小公倍数。',
        tags: ['数学', '算法'],
        examples: [
            {
                input: '12 18',
                output: '36',
            }
        ],
        starterCode: `
import math

try:
    a, b = map(int, input().split())
    # Python 3.9+ 支持 math.lcm，但为了兼容性可以使用公式
    lcm = abs(a * b) // math.gcd(a, b)
    print(lcm)
except ValueError:
    print("输入错误")
`.trim(),
        testCases: pythonPracticeLogicTestCases[40]
    },
    {
        id: 41,
        title: '分解质因数',
        difficulty: '中等',
        category: 'Python 语言基础',
        description: '输入一个正整数，将其分解为质因数相乘的形式（如 12=2*2*3）。',
        inputFormat: '输入一个正整数。',
        outputFormat: '输出格式如 "12=2*2*3"。',
        tags: ['数学', '循环'],
        examples: [
            {
                input: '12',
                output: '12=2*2*3',
            }
        ],
        starterCode: `
n = int(input())
print(f"{n}=", end="")
factors = []
d = 2
temp = n
while d * d <= temp:
    while temp % d == 0:
        factors.append(str(d))
        temp //= d
    d += 1
if temp > 1:
    factors.append(str(temp))
print("*".join(factors))
`.trim(),
        testCases: pythonPracticeLogicTestCases[41]
    },
    {
        id: 42,
        title: '统计字符出现次数',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输入一个字符串，统计每个字符出现的次数。',
        inputFormat: '输入一个字符串。',
        outputFormat: '按字符ASCII码顺序输出，每行格式 "字符:次数"。',
        tags: ['字典', '字符串处理'],
        examples: [
            {
                input: 'hello',
                output: 'e:1\nh:1\nl:2\no:1',
            }
        ],
        starterCode: `
s = input()
counts = {}
for char in s:
    counts[char] = counts.get(char, 0) + 1

for char in sorted(counts.keys()):
    print(f"{char}:{counts[char]}")
`.trim(),
        testCases: pythonPracticeLogicTestCases[42]
    },
    {
        id: 43,
        title: '打印菱形图案',
        difficulty: '中等',
        category: 'Python 语言基础',
        description: '输入边长 n，打印菱形。',
        inputFormat: '输入一个整数 n。',
        outputFormat: '打印 2n-1 行菱形。',
        tags: ['循环', '图形打印'],
        examples: [
            {
                input: '3',
                output: '  *\n ***\n*****\n ***\n  *',
            }
        ],
        starterCode: `
n = int(input())
# 上半部分
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))
# 下半部分
for i in range(n - 1, 0, -1):
    print(" " * (n - i) + "*" * (2 * i - 1))
`.trim(),
        testCases: pythonPracticeLogicTestCases[43]
    },
    {
        id: 44,
        title: '猜数字游戏',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '程序预设一个 1-100 的随机数（本题固定为 66 以便测试）。用户输入数字，程序提示 "Too Big", "Too Small" 或 "Correct"。',
        inputFormat: '多行输入，每行一个猜测。',
        outputFormat: '输出提示信息。',
        tags: ['循环', '条件判断'],
        examples: [
            {
                input: '50\n70\n66',
                output: 'Too Small\nToo Big\nCorrect',
            }
        ],
        starterCode: `
target = 66
while True:
    try:
        guess = int(input())
        if guess > target:
            print("Too Big")
        elif guess < target:
            print("Too Small")
        else:
            print("Correct")
            break
    except EOFError:
        break
`.trim(),
        testCases: pythonPracticeLogicTestCases[44]
    },
    {
        id: 45,
        title: '计算 1-100 内偶数和',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '计算 1 到 100 中所有偶数的和。',
        inputFormat: '无输入。',
        outputFormat: '输出一个整数。',
        tags: ['循环', '数学'],
        examples: [
            {
                input: '',
                output: '2550',
            }
        ],
        starterCode: `
print(sum(range(2, 101, 2)))
`.trim(),
        testCases: pythonPracticeLogicTestCases[45]
    },
    {
        id: 46,
        title: '判断完数',
        difficulty: '中等',
        category: 'Python 语言基础',
        description: '输入一个正整数，判断是否为完数（所有真因子之和等于自身）。',
        inputFormat: '输入一个整数。',
        outputFormat: 'Yes 或 No。',
        tags: ['数学', '循环'],
        examples: [
            {
                input: '6',
                output: 'Yes',
            }
        ],
        starterCode: `
n = int(input())
factors_sum = 0
for i in range(1, n):
    if n % i == 0:
        factors_sum += i
if factors_sum == n:
    print("Yes")
else:
    print("No")
`.trim(),
        testCases: pythonPracticeLogicTestCases[46]
    },
    {
        id: 47,
        title: '阿姆斯特朗数',
        difficulty: '中等',
        category: 'Python 语言基础',
        description: '输入一个整数，判断是否为阿姆斯特朗数（n 位数，其各位数字的 n 次方之和等于该数）。',
        inputFormat: '输入一个整数。',
        outputFormat: 'Yes 或 No。',
        tags: ['数学', '字符串处理'],
        examples: [
            {
                input: '153',
                output: 'Yes',
            }
        ],
        starterCode: `
s = input()
n = len(s)
total = sum(int(digit) ** n for digit in s)
if total == int(s):
    print("Yes")
else:
    print("No")
`.trim(),
        testCases: pythonPracticeLogicTestCases[47]
    },
    {
        id: 48,
        title: '打印杨辉三角',
        difficulty: '中等',
        category: 'Python 语言基础',
        description: '输入 n，打印杨辉三角的前 n 行。',
        inputFormat: '输入一个整数 n。',
        outputFormat: '打印 n 行，每行数字以空格分隔。',
        tags: ['列表', '循环'],
        examples: [
            {
                input: '3',
                output: '1\n1 1\n1 2 1',
            }
        ],
        starterCode: `
n = int(input())
rows = []
for i in range(n):
    row = [1] * (i + 1)
    if i > 1:
        for j in range(1, i):
            row[j] = rows[i-1][j-1] + rows[i-1][j]
    rows.append(row)
    print(" ".join(map(str, row)))
`.trim(),
        testCases: pythonPracticeLogicTestCases[48]
    },
    {
        id: 49,
        title: '计算 1-100 奇数和',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '计算 1 到 100 中所有奇数的和。',
        inputFormat: '无输入。',
        outputFormat: '输出一个整数。',
        tags: ['循环', '数学'],
        examples: [
            {
                input: '',
                output: '2500',
            }
        ],
        starterCode: `
print(sum(range(1, 101, 2)))
`.trim(),
        testCases: pythonPracticeLogicTestCases[49]
    },
    {
        id: 50,
        title: '两数差值绝对值',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输入两个数，输出它们的绝对值差。',
        inputFormat: '输入两个数，以空格分隔。',
        outputFormat: '输出绝对值差。',
        tags: ['数学'],
        examples: [
            {
                input: '5 9',
                output: '4',
            }
        ],
        starterCode: `
a, b = map(int, input().split())
print(abs(a - b))
`.trim(),
        testCases: pythonPracticeLogicTestCases[50]
    },
    {
        id: 51,
        title: '统计元音字母个数',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输入字符串，统计 a, e, i, o, u (不分大小写) 的个数。',
        inputFormat: '输入一个字符串。',
        outputFormat: '输出一个整数。',
        tags: ['字符串处理'],
        examples: [
            {
                input: 'Hello World',
                output: '3',
            }
        ],
        starterCode: `
s = input().lower()
count = 0
vowels = 'aeiou'
for char in s:
    if char in vowels:
        count += 1
print(count)
`.trim(),
        testCases: pythonPracticeLogicTestCases[51]
    },
    {
        id: 52,
        title: '能被 3 和 5 整除的数',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输出 1 到 100 中所有能同时被 3 和 5 整除的数。',
        inputFormat: '无输入。',
        outputFormat: '以空格分隔输出。',
        tags: ['循环', '条件判断'],
        examples: [
            {
                input: '',
                output: '15 30 ...',
            }
        ],
        starterCode: `
res = []
for i in range(1, 101):
    if i % 15 == 0:
        res.append(i)
print(" ".join(map(str, res)))
`.trim(),
        testCases: pythonPracticeLogicTestCases[52]
    },
    {
        id: 53,
        title: '计算 n 的 k 次方',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输入 n 和 k，计算 n^k。',
        inputFormat: '输入两个整数 n 和 k，以空格分隔。',
        outputFormat: '输出结果。',
        tags: ['数学'],
        examples: [
            {
                input: '2 3',
                output: '8',
            }
        ],
        starterCode: `
n, k = map(int, input().split())
print(n ** k)
`.trim(),
        testCases: pythonPracticeLogicTestCases[53]
    },
    {
        id: 54,
        title: '判断纯字母字符串',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输入字符串，判断是否只包含字母。',
        inputFormat: '输入一个字符串。',
        outputFormat: 'Yes 或 No。',
        tags: ['字符串处理'],
        examples: [
            {
                input: 'Python',
                output: 'Yes',
            }
        ],
        starterCode: `
s = input()
if s.isalpha():
    print("Yes")
else:
    print("No")
`.trim(),
        testCases: pythonPracticeLogicTestCases[54]
    },
    {
        id: 55,
        title: '求列表最大最小值',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输入 5 个整数，输出最大值和最小值。',
        inputFormat: '一行输入 5 个整数。',
        outputFormat: '第一行最大值，第二行最小值。',
        tags: ['列表', '内置函数'],
        examples: [
            {
                input: '1 2 3 4 5',
                output: '5\n1',
            }
        ],
        starterCode: `
nums = list(map(int, input().split()))
print(max(nums))
print(min(nums))
`.trim(),
        testCases: pythonPracticeLogicTestCases[55]
    },
    {
        id: 56,
        title: '倒序九九乘法表',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '从 9 行到 1 行打印乘法表。',
        inputFormat: '无输入。',
        outputFormat: '打印倒序乘法表。',
        tags: ['循环'],
        examples: [
            {
                input: '',
                output: '1x9=9 2x9=18 ...',
            }
        ],
        starterCode: `
for i in range(9, 0, -1):
    for j in range(1, i + 1):
        print(f"{j}x{i}={i*j}", end=" ")
    print()
`.trim(),
        testCases: pythonPracticeLogicTestCases[56]
    },
    {
        id: 57,
        title: '调和数列求和',
        difficulty: '简单',
        category: 'Python 语言基础',
        description: '输入 n，计算 1 + 1/2 + 1/3 + ... + 1/n 的和，保留 2 位小数。',
        inputFormat: '输入一个整数 n。',
        outputFormat: '输出和。',
        tags: ['数学', '循环'],
        examples: [
            {
                input: '2',
                output: '1.50',
            }
        ],
        starterCode: `
n = int(input())
total = 0
for i in range(1, n + 1):
    total += 1/i
print(f"{total:.2f}")
`.trim(),
        testCases: pythonPracticeLogicTestCases[57]
    },
    {
        id: 58,
        title: '判断互质',
        difficulty: '中等',
        category: 'Python 语言基础',
        description: '输入两个正整数，判断是否互质（最大公约数为 1）。',
        inputFormat: '输入两个整数。',
        outputFormat: 'Yes 或 No。',
        tags: ['数学'],
        examples: [
            {
                input: '3 5',
                output: 'Yes',
            }
        ],
        starterCode: `
import math
a, b = map(int, input().split())
if math.gcd(a, b) == 1:
    print("Yes")
else:
    print("No")
`.trim(),
        testCases: pythonPracticeLogicTestCases[58]
    },
    {
        id: 111,
        title: '判断奇偶数',
        difficulty: '简单',
        category: 'Python 流程控制',
        description: '输入一个整数，判断它是奇数还是偶数。',
        inputFormat: '输入一个整数。',
        outputFormat: '如果是偶数输出 "Even"，如果是奇数输出 "Odd"。',
        tags: ['if-else', '条件判断'],
        examples: [
            {
                input: '4',
                output: 'Even',
            },
            {
                input: '7',
                output: 'Odd',
            }
        ],
        starterCode: `
n = int(input())
# 在这里编写你的代码
if n % 2 == 0:
    print("Even")
else:
    print("Odd")
`.trim(),
        testCases: pythonPracticeLogicTestCases[111]
    },
    {
        id: 112,
        title: '打印九九乘法表',
        difficulty: '简单',
        category: 'Python 流程控制',
        description: '使用嵌套循环打印九九乘法表（1-9）。',
        inputFormat: '无输入。',
        outputFormat: '输出九九乘法表，每行格式如 "1*1=1 1*2=2 ..."，共9行。',
        tags: ['for循环', '嵌套循环'],
        examples: [
            {
                input: '',
                output: '1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9\n1*4=4 2*4=8 3*4=12 4*4=16\n1*5=5 2*5=10 3*5=15 4*5=20 5*5=25\n1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36\n1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49\n1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64\n1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81',
            }
        ],
        starterCode: `
for i in range(1, 10):
    row = []
    for j in range(1, i + 1):
        row.append(f"{j}*{i}={j*i}")
    print(" ".join(row))
`.trim(),
        testCases: pythonPracticeLogicTestCases[112]
    },
    {
        id: 113,
        title: '求1到N的和',
        difficulty: '简单',
        category: 'Python 流程控制',
        description: '输入一个正整数 N，计算 1 + 2 + 3 + ... + N 的和。',
        inputFormat: '输入一个正整数 N。',
        outputFormat: '输出 1 到 N 的和。',
        tags: ['while循环', '累加'],
        examples: [
            {
                input: '10',
                output: '55',
            },
            {
                input: '100',
                output: '5050',
            }
        ],
        starterCode: `
n = int(input())
total = 0
i = 1
while i <= n:
    total += i
    i += 1
print(total)
`.trim(),
        testCases: pythonPracticeLogicTestCases[113]
    },
    {
        id: 114,
        title: '找出所有质数',
        difficulty: '中等',
        category: 'Python 流程控制',
        description: '输入一个正整数 N，输出 2 到 N 之间的所有质数（包含 2 和 N）。',
        inputFormat: '输入一个正整数 N（N >= 2）。',
        outputFormat: '输出所有质数，用空格分隔。',
        tags: ['for循环', '质数', '嵌套循环'],
        examples: [
            {
                input: '10',
                output: '2 3 5 7',
            },
            {
                input: '20',
                output: '2 3 5 7 11 13 17 19',
            }
        ],
        starterCode: `
n = int(input())
primes = []
for num in range(2, n + 1):
    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(num)
print(" ".join(map(str, primes)))
`.trim(),
        testCases: pythonPracticeLogicTestCases[114]
    },
    {
        id: 115,
        title: '跳过特定数字',
        difficulty: '简单',
        category: 'Python 流程控制',
        description: '输出 1 到 20 的所有数字，但跳过所有能被 3 整除的数字。',
        inputFormat: '无输入。',
        outputFormat: '输出不能被3整除的数字，用空格分隔。',
        tags: ['for循环', 'continue'],
        examples: [
            {
                input: '',
                output: '1 2 4 5 7 8 10 11 13 14 16 17 19 20',
            }
        ],
        starterCode: `
result = []
for i in range(1, 21):
    if i % 3 == 0:
        continue
    result.append(i)
print(" ".join(map(str, result)))
`.trim(),
        testCases: pythonPracticeLogicTestCases[115]
    }
];
