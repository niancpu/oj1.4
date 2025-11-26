import { Problem } from '../../types';
import { pythonBasicProblems } from './python-basic';
import { pythonPracticeBasicProblems } from './python-practice-basic';
import { pythonPracticeLogicProblems } from './python-practice-logic';
import { pythonPracticeDataStructProblems } from './python-practice-datastruct';
import { pythonPracticeListTupleProblems } from './python-practice-list-tuple';
import { pythonPracticeFunctionProblems } from './python-practice-function';
import { algorithmProblems } from './algorithm';
import { numpyProblems } from './numpy';
import { pandasProblems } from './pandas';

// 汇总所有题目
// 注意：请确保不同分类文件中的题目 ID 是唯一的，不要重复。
export const PROBLEMS: Problem[] = [
    ...pythonBasicProblems,
    ...pythonPracticeBasicProblems,
    ...pythonPracticeLogicProblems,
    ...pythonPracticeDataStructProblems,
    ...pythonPracticeListTupleProblems,
    ...pythonPracticeFunctionProblems,
    ...algorithmProblems,
    ...numpyProblems,
    ...pandasProblems
].sort((a, b) => a.id - b.id); // 按 ID 从小到大排序，保证列表顺序一致
