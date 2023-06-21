const { readFile } = require('fs/promises')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    static async csvToJson(filePath) {
        const content = await readFile(filePath, "utf8")
        const { errorMessage, valid } = this.isValid(content)
        if (!valid) {
            throw new Error(errorMessage)
        }
        const result = this.parseCsvToJson(content)
        return result
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...content] = csvString.split(/\r?\n/)
        if (header !== options.fields.join(',')) {
            return {
                errorMessage: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        if (!content.length || content.length > options.maxLines) {
            return {
                errorMessage: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return {
            errorMessage: null,
            valid: true
        }

    }

    static parseCsvToJson(rawContent) {
        const [firstLine, ...content] = rawContent.split(/\r?\n/)
        const header = firstLine.split(',')

        const objects = content.map(line => {
            const columns = line.split(',')
            const obj = {}
            for (const [index, data] of columns.entries()) {
                obj[header[index]] = data.trim()
            }
            return obj
        })

        return objects
    }
}

module.exports = File 