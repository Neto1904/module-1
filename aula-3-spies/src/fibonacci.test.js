const { createSandbox } = require('sinon')
const Fibonacci = require('./fibonacci')
const assert = require('assert')

const sinon = createSandbox()

    ; (async () => {

        {
            const fibonacci = new Fibonacci()
            const spy = sinon.spy(
                fibonacci,
                fibonacci.execute.name
            )
            for (const sequence of fibonacci.execute(5)) {
            }
            const expectedCallCount = 6
            assert.strictEqual(spy.callCount, expectedCallCount)
        }
        {
            const fibonacci = new Fibonacci()
            const spy = sinon.spy(
                fibonacci,
                fibonacci.execute.name
            )

            const results = [...fibonacci.execute(5)]


            const { args } = spy.getCall(2)
            const expectedParams = [3, 1, 2]
            assert.deepStrictEqual(args, expectedParams, 'arrays do no match')

            const expectedResults = [0, 1, 1, 2, 3]
            assert.deepStrictEqual(results, expectedResults)

        }
    })()