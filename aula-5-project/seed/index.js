const { faker } = require('@faker-js/faker')
const { join } = require('path')
const { writeFile } = require('fs/promises')

const Car = require('./../src/entities/car')
const CarCategory = require('./../src/entities/carCategory')
const Customer = require('./../src/entities/customer')

const baseFolder = join(__dirname, '../', 'database')


const carCategory = new CarCategory({
    id: faker.string.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
})

const cars = []
for (let index = 0; index < 2; index++) {
    const car = new Car({
        id: faker.string.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })
    carCategory.carIds.push(car.id)
    cars.push(car)
}

const customers = []
for (let index = 0; index < 3; index++) {
    const customer = new Customer({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        age: faker.number.int({ min: 18, max: 50 })
    })
    customers.push(customer)
}

async function write(filename, data) {
    await writeFile(join(baseFolder, filename), JSON.stringify(data))
}

; (async () => {
    await write('cars.json', cars)
    await write('carCategories.json', [carCategory])
    await write('customers.json', customers)
    console.log({ cars, carCategory, customers })
})()