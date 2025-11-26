import { TestCase } from '../../types';

export const algorithmTestCases: Record<number, TestCase[]> = {
    2: [
        { input: '2,7,11,15\n9', expectedOutput: '0,1' },
        { input: '3,2,4\n6', expectedOutput: '1,2' },
        { input: '3,3\n6', expectedOutput: '0,1' },
        { input: '-1,-5,0,10\n-6', expectedOutput: '0,1' },
        { input: '1,2,3,4,5\n9', expectedOutput: '3,4' },
        { input: '0,4,3,0\n0', expectedOutput: '0,3' },
        { input: '-3,4,3,90\n0', expectedOutput: '0,2' },
        { input: '1,2,3,4,5,6,7,8,9,10\n19', expectedOutput: '8,9' },
        { input: '10,20,30,40,50\n90', expectedOutput: '3,4' },
        { input: '-10,-20,-30,-40\n-50', expectedOutput: '1,2' },
        { input: '5,5,5,5\n10', expectedOutput: '0,1' },
        { input: '1,1,1,1,1\n2', expectedOutput: '0,1' },
        { input: '100,200,300\n500', expectedOutput: '1,2' },
        { input: '0,0,0,0\n0', expectedOutput: '0,1' },
        { input: '-5,5\n0', expectedOutput: '0,1' },
        { input: '1,3,5,7,9\n12', expectedOutput: '2,3' },
        { input: '2,4,6,8,10\n18', expectedOutput: '3,4' },
        { input: '15,25,35,45\n80', expectedOutput: '2,3' },
        { input: '7,7,7,7,7\n14', expectedOutput: '0,1' },
        { input: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15\n29', expectedOutput: '13,14' }
    ],
    19: [
        { input: '0', expectedOutput: '0' },
        { input: '1', expectedOutput: '1' },
        { input: '2', expectedOutput: '1' },
        { input: '3', expectedOutput: '2' },
        { input: '4', expectedOutput: '3' },
        { input: '5', expectedOutput: '5' },
        { input: '6', expectedOutput: '8' },
        { input: '7', expectedOutput: '13' },
        { input: '8', expectedOutput: '21' },
        { input: '9', expectedOutput: '34' },
        { input: '10', expectedOutput: '55' },
        { input: '11', expectedOutput: '89' },
        { input: '12', expectedOutput: '144' },
        { input: '13', expectedOutput: '233' },
        { input: '14', expectedOutput: '377' },
        { input: '15', expectedOutput: '610' },
        { input: '16', expectedOutput: '987' },
        { input: '17', expectedOutput: '1597' },
        { input: '18', expectedOutput: '2584' },
        { input: '19', expectedOutput: '4181' },
        { input: '20', expectedOutput: '6765' }
    ]
};
