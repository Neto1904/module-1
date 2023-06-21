const { once } = require('events')
const http = require('http')
const DEFAULT_USER = {
    username: 'neto',
    password: '123'
}

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page')
        response.end()
    },
    '/login:post': async (request, response) => {
        const data = JSON.parse(await once(request, 'data'))
        if (
            data.username !== DEFAULT_USER.username ||
            data.password !== DEFAULT_USER.password
        ) {
            response.writeHead(401)
            response.end('Login failed!')
            return
        }
        return response.end('Login succeeded!')
        // curl -i -X POST --data '{"username": "Neto", "password":"123"}' localhost:3000/login
    },
    default(request, response) {
        response.writeHead('404')
        response.end('not found')
    }
}

function handler(request, response) {
    const { url, method } = request
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
    const chosenRoute = routes[routeKey] || routes.default
    return chosenRoute(request, response)
}

const app = http.createServer(handler)
    .listen(3000, () => console.log('running at 3000 '))

module.exports = app