const { error } = require('./src/constants')
const assert = require('assert')
const File = require('./src/file')

    ; (async () => {
        {
            const filePath = './mocks/empty.csv'
            const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
            const result = File.csvToJson(filePath)
            await assert.rejects(result, expected)
        }
        {
            const filePath = './mocks/invalidHeader.csv'
            const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
            const result = File.csvToJson(filePath)
            await assert.rejects(result, expected)
        }
        {
            const filePath = './mocks/longer.csv'
            const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
            const result = File.csvToJson(filePath)
            await assert.rejects(result, expected)
        }
        {
            const filePath = './mocks/valid.csv'
            const expected = [
                {
                    id: '1',
                    name: 'neto',
                    profession: 'developer',
                    age: '24'
                },
                {
                    id: '2',
                    name: 'ana',
                    profession: 'manager',
                    age: '24'
                },
                {
                    id: '3',
                    name: 'julia',
                    profession: 'tester',
                    age: '24'
                }
            ]
            const result = await File.csvToJson(filePath)
            await assert.deepEqual(result, expected)
        }
    })()