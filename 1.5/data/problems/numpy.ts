import { Problem } from '../../types';
import { numpyTestCases } from '../testcases/numpy';

export const numpyProblems: Problem[] = [
    {
        id: 6,
        title: '创建 NumPy 数组',
        difficulty: '简单',
        category: '数据分析',
        description: '从给定的整数列表中创建一个 NumPy 数组。',
        inputFormat: '一行以空格分隔的整数。',
        outputFormat: '打印创建的 NumPy 数组。',
        tags: ['NumPy', '数组创建'],
        examples: [
            {
                input: '1 2 3 4 5',
                output: '[1 2 3 4 5]',
            }
        ],
        starterCode: `
import numpy as np

try:
    input_list = list(map(int, input().split()))
    
    # 使用 input_list 创建一个 NumPy 数组
    arr = np.array(input_list)
    
    print(arr)
except ValueError:
    print("输入格式错误。")
`.trim(),
        testCases: numpyTestCases[6]
    },
    {
        id: 7,
        title: 'NumPy 数组加法',
        difficulty: '简单',
        category: '数据分析',
        description: '计算两个给定 NumPy 数组的元素级和。',
        inputFormat: '两行输入，每行都是以空格分隔的相同数量的整数。',
        outputFormat: '打印两个数组相加后的结果数组。',
        tags: ['NumPy', '数组运算'],
        examples: [
            {
                input: '1 2 3\n4 5 6',
                output: '[5 7 9]',
            }
        ],
        starterCode: `
import numpy as np

try:
    list1 = list(map(int, input().split()))
    list2 = list(map(int, input().split()))
    arr1 = np.array(list1)
    arr2 = np.array(list2)
    
    # 计算 arr1 和 arr2 的和
    result_arr = arr1 + arr2
    
    print(result_arr)
except ValueError:
    print("输入格式错误。")
`.trim(),
        testCases: numpyTestCases[7]
    },
    {
        id: 8,
        title: 'NumPy 数组变形',
        difficulty: '简单',
        category: '数据分析',
        description: '将一个一维 NumPy 数组变形为指定形状的二维数组。',
        inputFormat: '第一行是以空格分隔的整数。第二行是两个以空格分隔的整数，代表新的行数和列数。',
        outputFormat: '打印变形后的二维数组。',
        tags: ['NumPy', '数组变形'],
        examples: [
            {
                input: '1 2 3 4 5 6\n2 3',
                output: '[[1 2 3]\n [4 5 6]]',
            }
        ],
        starterCode: `
import numpy as np

try:
    elements = list(map(int, input().split()))
    shape = tuple(map(int, input().split()))
    arr = np.array(elements)
    
    # 将 arr 变形为 shape 指定的形状
    reshaped_arr = arr.reshape(shape)
    
    print(reshaped_arr)
except (ValueError, IndexError):
    print("输入格式错误或无法变形。")
`.trim(),
        testCases: numpyTestCases[8]
    },
    {
        id: 9,
        title: 'NumPy 数组均值',
        difficulty: '简单',
        category: '数据分析',
        description: '计算一个 NumPy 数组中所有元素的平均值。',
        inputFormat: '一行以空格分隔的数字。',
        outputFormat: '打印数组的平均值。',
        tags: ['NumPy', '统计计算'],
        examples: [
            {
                input: '1 2 3 4 5',
                output: '3.0',
            }
        ],
        starterCode: `
import numpy as np

try:
    elements = list(map(float, input().split()))
    arr = np.array(elements)
    
    # 计算数组 arr 的平均值
    mean_val = np.mean(arr)
    
    print(mean_val)
except ValueError:
    print("输入格式错误。")
`.trim(),
        testCases: numpyTestCases[9]
    },
    {
        id: 10,
        title: 'NumPy 数组筛选',
        difficulty: '中等',
        category: '数据分析',
        description: '给定一个 NumPy 数组，筛选出所有大于给定值的元素。',
        inputFormat: '第一行是以空格分隔的整数。第二行是一个整数。',
        outputFormat: '打印筛选后包含符合条件元素的新数组。',
        tags: ['NumPy', '布尔索引'],
        examples: [
            {
                input: '1 5 2 6 3 8\n4',
                output: '[5 6 8]',
            }
        ],
        starterCode: `
import numpy as np

try:
    elements = list(map(int, input().split()))
    threshold = int(input())
    arr = np.array(elements)
    
    # 筛选出 arr 中大于 threshold 的元素
    filtered_arr = arr[arr > threshold]
    
    print(filtered_arr)
except ValueError:
    print("输入格式错误。")
`.trim(),
        testCases: numpyTestCases[10]
    },
    {
        id: 20,
        title: 'NumPy 数组切片',
        difficulty: '简单',
        category: '数据分析',
        description: '给定一个 NumPy 数组和一个范围，提取该范围内的子数组。',
        inputFormat: '第一行是以空格分隔的数字，用于创建数组。\n第二行是两个以空格分隔的整数，代表切片的起始和结束索引（不含结束）。',
        outputFormat: '打印切片后的子数组。',
        tags: ['NumPy', '索引与切片'],
        examples: [
            {
                input: '1 2 3 4 5 6 7\n2 5',
                output: '[3. 4. 5.]',
            }
        ],
        starterCode: `
import numpy as np
try:
    elements = list(map(float, input().split()))
    start, end = map(int, input().split())
    arr = np.array(elements)
    
    # 对数组 arr 进行切片
    sliced_arr = arr[start:end]
    
    print(sliced_arr)
except (ValueError, IndexError):
    print("输入格式或索引错误。")
`.trim(),
        testCases: numpyTestCases[20]
    },
    {
        id: 21,
        title: 'NumPy 点积',
        difficulty: '中等',
        category: '数据分析',
        description: '计算两个一维 NumPy 数组（向量）的点积。',
        inputFormat: '两行输入，每行都是以空格分隔的相同数量的数字。',
        outputFormat: '打印点积的结果。',
        tags: ['NumPy', '线性代数'],
        examples: [
            {
                input: '1 2 3\n4 5 6',
                output: '32.0',
            }
        ],
        starterCode: `
import numpy as np

try:
    list1 = list(map(float, input().split()))
    list2 = list(map(float, input().split()))
    arr1 = np.array(list1)
    arr2 = np.array(list2)
    
    # 计算 arr1 和 arr2 的点积
    dot_product = np.dot(arr1, arr2)
    
    print(dot_product)
except ValueError:
    print("输入格式错误。")
`.trim(),
        testCases: numpyTestCases[21]
    }
];
