import { Problem } from '../../types';
import { pandasTestCases } from '../testcases/pandas';

export const pandasProblems: Problem[] = [
    {
        id: 11,
        title: '创建 Pandas Series',
        difficulty: '简单',
        category: '数据分析',
        description: '从给定的数据和索引创建一个 Pandas Series。',
        inputFormat: '第一行是以逗号分隔的数据。第二行是以逗号分隔的索引。',
        outputFormat: '打印创建的 Series。',
        tags: ['Pandas', 'Series创建'],
        examples: [
            {
                input: '10,20,30\na,b,c',
                output: 'a    10\nb    20\nc    30\ndtype: int64',
            }
        ],
        starterCode: `
import pandas as pd

try:
    data = list(map(int, input().split(',')))
    index = input().split(',')
    
    # 使用 data 和 index 创建一个 Pandas Series
    s = pd.Series(data, index=index)
    
    print(s)
except (ValueError, IndexError):
    print("输入格式错误。")
`.trim(),
        testCases: pandasTestCases[11]
    },
    {
        id: 12,
        title: '创建 Pandas DataFrame',
        difficulty: '简单',
        category: '数据分析',
        description: '从一个模拟的 CSV 格式字符串创建一个 Pandas DataFrame。',
        inputFormat: '多行输入。第一行是逗号分隔的列名。后续每一行是逗号分隔的数据行。输入以 "END" 结尾。',
        outputFormat: '打印创建的 DataFrame。',
        tags: ['Pandas', 'DataFrame创建', 'CSV读取'],
        examples: [
            {
                input: 'name,age\nAlice,25\nBob,30\nEND',
                output: '    name  age\n0  Alice   25\n1    Bob   30',
            }
        ],
        starterCode: `
import pandas as pd
import io
import sys

lines = []
for line in sys.stdin:
    if 'END' in line:
        break
    lines.append(line)

csv_string = "".join(lines)

# 从 csv_string 创建一个 DataFrame
# 提示: 使用 pd.read_csv 和 io.StringIO
df = pd.read_csv(io.StringIO(csv_string))

print(df)
`.trim(),
        testCases: pandasTestCases[12]
    },
    {
        id: 13,
        title: '选择 DataFrame 的列',
        difficulty: '简单',
        category: '数据分析',
        description: '创建一个 DataFrame 并选择其中的特定一列。',
        inputFormat: '第一行是要选择的列名。之后是多行CSV数据（包含表头），以 "END" 结尾。',
        outputFormat: '打印所选的列 (Pandas Series)。',
        tags: ['Pandas', '数据选择'],
        examples: [
            {
                input: 'age\nname,age,city\nAlice,25,New York\nBob,30,Paris\nEND',
                output: '0    25\n1    30\nName: age, dtype: int64',
            }
        ],
        starterCode: `
import pandas as pd
import io
import sys

col_to_select = sys.stdin.readline().strip()

lines = []
for line in sys.stdin:
    if 'END' in line:
        break
    lines.append(line)

csv_string = "".join(lines)
df = pd.read_csv(io.StringIO(csv_string))

# 从 df 中选择 col_to_select 这一列
selected_column = df[col_to_select]

print(selected_column)
`.trim(),
        testCases: pandasTestCases[13]
    },
    {
        id: 14,
        title: 'DataFrame 数据筛选',
        difficulty: '中等',
        category: '数据分析',
        description: '创建一个 DataFrame，并根据给定条件筛选行。支持的 operator 为 >、<、==。',
        inputFormat: '第一行是要筛选的列名。\n第二行是筛选条件，格式为 `operator,value` (例如 `>,28`)。\n之后是多行CSV数据（包含表头），以 "END" 结尾。',
        outputFormat: '打印筛选后的 DataFrame。',
        tags: ['Pandas', '数据筛选', '布尔索引'],
        examples: [
            {
                input: 'age\n>,28\nname,age,city\nAlice,25,New York\nBob,30,Paris\nCharlie,35,London\nEND',
                output: '      name  age    city\n1      Bob   30   Paris\n2  Charlie   35  London',
            }
        ],
        starterCode: `
import pandas as pd
import io
import sys

col_to_filter = sys.stdin.readline().strip()
condition = sys.stdin.readline().strip()
operator, value_str = condition.split(',')
value = int(value_str)

lines = []
for line in sys.stdin:
    if 'END' in line:
        break
    lines.append(line)

csv_string = "".join(lines)
df = pd.read_csv(io.StringIO(csv_string))

# 根据条件筛选 df
if operator == '>':
    filtered_df = df[df[col_to_filter] > value]
elif operator == '<':
    filtered_df = df[df[col_to_filter] < value]
elif operator == '==':
    filtered_df = df[df[col_to_filter] == value]
else:
    filtered_df = pd.DataFrame()

print(filtered_df)
`.trim(),
        testCases: pandasTestCases[14]
    },
    {
        id: 15,
        title: 'DataFrame 分组聚合',
        difficulty: '中等',
        category: '数据分析',
        description: '创建一个 DataFrame，按指定列进行分组，并计算另一列的平均值。',
        inputFormat: '第一行是要分组的列名。\n第二行是要聚合计算的列名。\n之后是多行CSV数据（包含表头），以 "END" 结尾。',
        outputFormat: '打印分组聚合后的结果 (一个 Series)。',
        tags: ['Pandas', '分组聚合', 'groupby'],
        examples: [
            {
                input: 'department\nsalary\nname,department,salary\nAlice,Sales,5000\nBob,IT,8000\nCharlie,Sales,6000\nDavid,IT,9000\nEND',
                output: 'department\nIT           8500.0\nSales        5500.0\nName: salary, dtype: float64',
            }
        ],
        starterCode: `
import pandas as pd
import io
import sys

group_by_col = sys.stdin.readline().strip()
agg_col = sys.stdin.readline().strip()

lines = []
for line in sys.stdin:
    if 'END' in line:
        break
    lines.append(line)

csv_string = "".join(lines)
df = pd.read_csv(io.StringIO(csv_string))

# 按 group_by_col 分组，并计算 agg_col 的平均值
result = df.groupby(group_by_col)[agg_col].mean()

print(result)
`.trim(),
        testCases: pandasTestCases[15]
    }
];
