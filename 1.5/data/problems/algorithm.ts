import { Problem } from '../../types';
import { algorithmTestCases } from '../testcases/algorithm';

export const algorithmProblems: Problem[] = [
    {
        id: 2,
        title: '两数之和',
        difficulty: '中等',
        category: '算法入门',
        description: '给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** 的那 **两个** 整数，并返回它们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。',
        inputFormat: '第一行是一个以逗号分隔的整数数组。第二行是一个整数 `target`。',
        outputFormat: '输出两个以逗号分隔的下标。',
        tags: ['算法', '哈希表', '列表'],
        examples: [
            {
                input: '2,7,11,15\n9',
                output: '0,1',
                explanation: '因为 nums[0] + nums[1] == 9 ，所以返回 [0, 1] 。'
            },
            {
                input: '3,2,4\n6',
                output: '1,2'
            }
        ],
        starterCode: `
import sys

def two_sum(nums, target):
    # 在这里实现你的算法
    # ...
    # ...
    return [0, 0] # 返回结果

# 读取输入
try:
    nums_str = sys.stdin.readline().strip()
    target_str = sys.stdin.readline().strip()

    nums = list(map(int, nums_str.split(',')))
    target = int(target_str)

    result = two_sum(nums, target)
    print(','.join(map(str, result)))

except (ValueError, IndexError):
    print("输入格式错误。")
`.trim(),
        testCases: algorithmTestCases[2]
    },
    {
        id: 19,
        title: '斐波那契数列',
        difficulty: '中等',
        category: '算法入门',
        description: '计算斐波那契数列的第 n 项。斐波那契数列的定义是：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) for n>1。',
        inputFormat: '输入一个非负整数 n。',
        outputFormat: '输出斐波那契数列的第 n 项。',
        tags: ['算法', '递归', '动态规划'],
        examples: [
            {
                input: '5',
                output: '5',
                explanation: '数列为 0, 1, 1, 2, 3, 5, ...'
            },
            {
                input: '10',
                output: '55',
            }
        ],
        starterCode: `
def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

try:
    num = int(input())
    if num < 0:
        print("请输入非负整数")
    else:
        print(fibonacci(num))
except ValueError:
    print("输入格式错误。")
`.trim(),
        testCases: algorithmTestCases[19]
    }
];
