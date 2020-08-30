import { describe } from 'riteway'

import { bemClassName } from '../../lib/bem'

describe('bemClassName', async (assert) => {
    assert({
        given: 'valid key with modifiers',
        should: 'expand as BEM className',
        actual: bemClassName({ key: 'value' }, 'key', ['modifier']),
        expected: 'value value--modifier',
    })

    assert({
        given: 'invalid key',
        should: 'return null',
        actual: bemClassName({ key: 'value' }, 'key2', ['modifier']),
        expected: null,
    })

    assert({
        given: 'invalid value: null',
        should: 'return null',
        actual: bemClassName({ key: null }, 'key', ['modifier']),
        expected: null,
    })

    assert({
        given: 'invalid value: number',
        should: 'return null',
        actual: bemClassName({ key: 42 }, 'key', ['modifier']),
        expected: null,
    })

    assert({
        given: 'invalid value: object',
        should: 'return null',
        actual: bemClassName({ key: {} }, 'key', ['modifier']),
        expected: null,
    })

    assert({
        given: 'invalid input object',
        should: 'return null',
        actual: bemClassName(null, 'key', ['modifier']),
        expected: null,
    })

    assert({
        given: 'invalid modifiers',
        should: 'expand as BEM className without modifiers',
        actual: bemClassName({ key: 'value' }, 'key', null),
        expected: 'value',
    })

    assert({
        given: 'invalid modifier',
        should: 'expand as BEM className without modifiers',
        actual: bemClassName({ key: 'value' }, 'key', [null, undefined, NaN, {}, [], new Date(), 10]),
        expected: 'value',
    })

    assert({
        given: 'static modifiers',
        should: 'expand as BEM className with all modifiers',
        actual: bemClassName({ key: 'value --static' }, 'key', ['modifier']),
        expected: 'value value--modifier value--static',
    })
})
