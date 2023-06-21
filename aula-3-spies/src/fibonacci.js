class Fibonacci {
    * execute(loops, current = 0, next = 1) {
        if (loops === 0) {
            return
        }

        yield current

        yield* this.execute(loops - 1, next, next + current)
    }
}

module.exports = Fibonacci