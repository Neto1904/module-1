const { describe, it } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

describe('API suite test', () => {
    let app
    before((done) => {
        app = require('./api')
        app.once('listening', done)
    })
    before((done) => {
        app.close(done)
    })
    describe('/contact', () => {
        it('should return http status 200', async () => {
            const response = await supertest(app)
                .get('/contact')
                .expect(200)

            assert.strictEqual(response.text, 'contact us page')
        })
    })

    describe('/login', () => {
        it('should return http status 200', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({ username: 'neto', password: '123' })
                .expect(200)

            assert.strictEqual(response.text, 'Login succeeded!')
        })

        it('should return http status 401', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({ username: 'nto', password: '123' })
                .expect(401)

            assert.strictEqual(response.text, 'Login failed!')
        })
    })

    describe('/default', () => {
        it('should return http status 404', async () => {
            const response = await supertest(app)
                .get('/')
                .expect(404)

            assert.strictEqual(response.text, 'not found')
        })
    })
}) 