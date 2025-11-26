import { Problem } from '../../types';
import { pythonPracticeListTupleTestCases } from '../testcases/python-practice-list-tuple';

export const pythonPracticeListTupleProblems: Problem[] = [
    {
        id: 84,
        title: '列表创建与访问',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '创建包含 10 个随机整数（1-100）的列表，输出列表的第 3 个元素和最后一个元素。',
        inputFormat: '输入10个整数（1-100之间），用空格分隔。',
        outputFormat: '输出两行，第一行为第3个元素（索引2），第二行为最后一个元素。',
        tags: ['列表', '索引'],
        examples: [
            {
                input: '23 45 67 12 89 34 56 78 90 11',
                output: '67\n11',
            }
        ],
        starterCode: `
nums = list(map(int, input().split()))
print(nums[2])
print(nums[-1])
`.trim(),
        testCases: pythonPracticeListTupleTestCases[84]
    },
    {
        id: 85,
        title: '列表追加与插入',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '读取 3 个整数，先追加到列表末尾，再将第二个整数插入到列表第 2 个位置（索引 1），输出最终列表。',
        inputFormat: '输入3个整数，用空格分隔。',
        outputFormat: '输出最终列表，元素用空格分隔。',
        tags: ['列表', 'append', 'insert'],
        examples: [
            {
                input: '10 20 30',
                output: '10 20 20 30',
            }
        ],
        starterCode: `
nums = list(map(int, input().split()))
lst = []
for num in nums:
    lst.append(num)
lst.insert(1, nums[1])
print(' '.join(map(str, lst)))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[85]
    },
    {
        id: 86,
        title: '列表删除元素',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '创建列表[1,2,3,4,5]，删除元素 3（按值删除）和索引为 4 的元素，输出最终列表。',
        inputFormat: '无输入。',
        outputFormat: '输出最终列表，元素用空格分隔。',
        tags: ['列表', 'remove', 'del'],
        examples: [
            {
                input: '',
                output: '1 2 4',
            }
        ],
        starterCode: `
lst = [1, 2, 3, 4, 5]
lst.remove(3)
del lst[3]
print(' '.join(map(str, lst)))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[86]
    },
    {
        id: 87,
        title: '列表排序',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '读取 5 个整数组成列表，对列表进行升序排序后输出；再进行降序排序输出。',
        inputFormat: '输入5个整数，用空格分隔。',
        outputFormat: '输出两行，第一行为升序排序结果，第二行为降序排序结果，元素用空格分隔。',
        tags: ['列表', 'sort', '排序'],
        examples: [
            {
                input: '3 1 4 1 5',
                output: '1 1 3 4 5\n5 4 3 1 1',
            }
        ],
        starterCode: `
nums = list(map(int, input().split()))
nums.sort()
print(' '.join(map(str, nums)))
nums.sort(reverse=True)
print(' '.join(map(str, nums)))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[87]
    },
    {
        id: 88,
        title: '列表切片',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '创建列表[0,1,2,3,4,5,6,7,8,9]，使用切片输出前 3 个元素、后 4 个元素、索引 2-6 的元素（含头不含尾）。',
        inputFormat: '无输入。',
        outputFormat: '输出三行，分别为前3个元素、后4个元素、索引2-6的元素，元素用空格分隔。',
        tags: ['列表', '切片'],
        examples: [
            {
                input: '',
                output: '0 1 2\n6 7 8 9\n2 3 4 5',
            }
        ],
        starterCode: `
lst = list(range(10))
print(' '.join(map(str, lst[:3])))
print(' '.join(map(str, lst[-4:])))
print(' '.join(map(str, lst[2:6])))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[88]
    },
    {
        id: 89,
        title: '列表推导式',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '使用列表推导式创建 1-20 之间的偶数列表（即[2,4,...,20]），输出结果。',
        inputFormat: '无输入。',
        outputFormat: '输出偶数列表，元素用空格分隔。',
        tags: ['列表推导式'],
        examples: [
            {
                input: '',
                output: '2 4 6 8 10 12 14 16 18 20',
            }
        ],
        starterCode: `
evens = [x for x in range(1, 21) if x % 2 == 0]
print(' '.join(map(str, evens)))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[89]
    },
    {
        id: 90,
        title: '列表去重',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '读取一个包含重复元素的列表（如[1,2,2,3,3,3]），去除重复元素后输出（保留顺序）。',
        inputFormat: '输入若干个整数，用空格分隔。',
        outputFormat: '输出去重后的列表，元素用空格分隔，保留原顺序。',
        tags: ['列表', '去重'],
        examples: [
            {
                input: '1 2 2 3 3 3',
                output: '1 2 3',
            }
        ],
        starterCode: `
nums = list(map(int, input().split()))
result = []
for num in nums:
    if num not in result:
        result.append(num)
print(' '.join(map(str, result)))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[90]
    },
    {
        id: 91,
        title: '列表求和与最值',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '读取若干个整数组成列表（以 0 结束输入），计算列表元素的和、最大值、最小值。',
        inputFormat: '输入若干个整数，以0结束（0不计入列表）。',
        outputFormat: '输出三行，分别为和、最大值、最小值。',
        tags: ['列表', 'sum', 'max', 'min'],
        examples: [
            {
                input: '1 2 3 4 5 0',
                output: '15\n5\n1',
            }
        ],
        starterCode: `
nums = []
while True:
    n = int(input())
    if n == 0:
        break
    nums.append(n)
print(sum(nums))
print(max(nums))
print(min(nums))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[91]
    },
    {
        id: 92,
        title: '列表拼接与重复',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '创建两个列表list1 = [1,2,3]和list2 = [4,5,6]，拼接为一个新列表，再将新列表重复 2 次，输出结果。',
        inputFormat: '无输入。',
        outputFormat: '输出重复2次后的列表，元素用空格分隔。',
        tags: ['列表', '拼接', '重复'],
        examples: [
            {
                input: '',
                output: '1 2 3 4 5 6 1 2 3 4 5 6',
            }
        ],
        starterCode: `
list1 = [1, 2, 3]
list2 = [4, 5, 6]
result = (list1 + list2) * 2
print(' '.join(map(str, result)))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[92]
    },
    {
        id: 93,
        title: '统计列表元素出现次数',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '创建列表[1,3,2,3,1,3,4]，统计元素 3 出现的次数，输出结果。',
        inputFormat: '无输入。',
        outputFormat: '输出元素3出现的次数。',
        tags: ['列表', 'count'],
        examples: [
            {
                input: '',
                output: '3',
            }
        ],
        starterCode: `
lst = [1, 3, 2, 3, 1, 3, 4]
print(lst.count(3))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[93]
    },
    {
        id: 94,
        title: '元组的创建与访问',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '创建元组(10,20,30,"python")，输出元组的长度和索引为 2 的元素。',
        inputFormat: '无输入。',
        outputFormat: '输出两行，第一行为元组长度，第二行为索引2的元素。',
        tags: ['元组', 'len'],
        examples: [
            {
                input: '',
                output: '4\n30',
            }
        ],
        starterCode: `
t = (10, 20, 30, "python")
print(len(t))
print(t[2])
`.trim(),
        testCases: pythonPracticeListTupleTestCases[94]
    },
    {
        id: 95,
        title: '列表与元组转换',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '将列表[1,2,3]转为元组，再将元组(4,5,6)转为列表，输出两个结果。',
        inputFormat: '无输入。',
        outputFormat: '输出两行，第一行为转换后的元组，第二行为转换后的列表。',
        tags: ['列表', '元组', '类型转换'],
        examples: [
            {
                input: '',
                output: '(1, 2, 3)\n[4, 5, 6]',
            }
        ],
        starterCode: `
lst = [1, 2, 3]
t = tuple(lst)
print(t)
t2 = (4, 5, 6)
lst2 = list(t2)
print(lst2)
`.trim(),
        testCases: pythonPracticeListTupleTestCases[95]
    },
    {
        id: 96,
        title: '找出列表中重复最多的元素',
        difficulty: '中等',
        category: 'Python 数据结构：列表与元组',
        description: '读取一个列表，输出出现次数最多的元素（若有多个，输出第一个）。',
        inputFormat: '输入若干个整数，用空格分隔。',
        outputFormat: '输出出现次数最多的元素。',
        tags: ['列表', 'count', '统计'],
        examples: [
            {
                input: '1 2 2 3 3 3',
                output: '3',
            }
        ],
        starterCode: `
nums = list(map(int, input().split()))
max_count = 0
result = nums[0]
for num in set(nums):
    if nums.count(num) > max_count:
        max_count = nums.count(num)
        result = num
print(result)
`.trim(),
        testCases: pythonPracticeListTupleTestCases[96]
    },
    {
        id: 97,
        title: '列表嵌套访问',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '创建嵌套列表[[1,2,3],[4,5,6],[7,8,9]]，访问并输出元素 5（通过索引）。',
        inputFormat: '无输入。',
        outputFormat: '输出元素5。',
        tags: ['列表', '嵌套', '二维列表'],
        examples: [
            {
                input: '',
                output: '5',
            }
        ],
        starterCode: `
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix[1][1])
`.trim(),
        testCases: pythonPracticeListTupleTestCases[97]
    },
    {
        id: 98,
        title: '过滤列表元素',
        difficulty: '简单',
        category: 'Python 数据结构：列表与元组',
        description: '使用列表推导式过滤列表[1,2,3,4,5,6,7,8,9]，保留大于 5 的元素，输出结果。',
        inputFormat: '无输入。',
        outputFormat: '输出过滤后的列表，元素用空格分隔。',
        tags: ['列表推导式', '过滤'],
        examples: [
            {
                input: '',
                output: '6 7 8 9',
            }
        ],
        starterCode: `
lst = [1, 2, 3, 4, 5, 6, 7, 8, 9]
result = [x for x in lst if x > 5]
print(' '.join(map(str, result)))
`.trim(),
        testCases: pythonPracticeListTupleTestCases[98]
    }
];
