import { describe } from 'riteway'

import { UniqueGenerator } from '../../class/UniqueGenerator'

function checkType(number) {
    return {
        isInteger: Number.isInteger(number),
        isPositive: Math.abs(number) === number,
        type: typeof number,
    }
}

describe('UniqueGenerator', async (assert) => {
    const uniq = new UniqueGenerator()

    const firstNumber = uniq.get()

    assert({
        given: 'first get()',
        should: 'receive first number',
        actual: checkType(firstNumber),
        expected: {
            isInteger: true,
            isPositive: true,
            type: 'number',
        },
    })

    const secondNumber = uniq.get()

    assert({
        given: 'second get()',
        should: 'receive second number that is different from the first',
        actual: {
            ...checkType(secondNumber),
            differentThanFirst: firstNumber !== secondNumber,
        },
        expected: {
            isInteger: true,
            isPositive: true,
            type: 'number',
            differentThanFirst: true,
        },
    })

    uniq.resolve()
    const thirdNumber = uniq.get()

    assert({
        given: 'third get() after resolve()',
        should: 'receive third number that is different from the first two',
        actual: {
            ...checkType(secondNumber),
            differentThanFirst: firstNumber !== thirdNumber,
            differentThanSecond: secondNumber !== thirdNumber,
        },
        expected: {
            isInteger: true,
            isPositive: true,
            type: 'number',
            differentThanFirst: true,
            differentThanSecond: true,
        },
    })

    uniq.resolve()
    uniq.resolve()

    const firstNumberAfterResolves = uniq.get()

    assert({
        given: 'first get() after as many resolve() calls as there have been get() calls',
        should: 'receive number that is equal to original first number',
        actual: firstNumber === firstNumberAfterResolves,
        expected: true,
    })

    uniq.reset()

    const firstNumberAfterReset = uniq.get()

    assert({
        given: 'first get() after reset() is called',
        should: 'receive number that is equal to original first number',
        actual: firstNumber === firstNumberAfterReset,
        expected: true,
    })

    uniq.resolve()
    uniq.resolve()

    const firstNumberAfterExtraResolves = uniq.get()

    assert({
        given: 'first get() after resolve() is called more time than get()',
        should: 'receive number that is equal to original first number',
        actual: firstNumber === firstNumberAfterReset,
        expected: true,
    })
})
