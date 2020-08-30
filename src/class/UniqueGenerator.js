/**
 * This is a super simple running unique number generator and thus a flawed solution for complex use cases.
 * Works "ok" for SPA-only, and universal SSR if you only render a single React app synchronously on the server.
 */
export class UniqueGenerator {
    instances = 0
    nextNumber = 0

    /**
     * Resolves unique running number.
     * @return {number} Positive integer number.
     */
    get = () => {
        this.instances++
        return this.nextNumber++
    }

    /**
     * Resets unique number generator.
     */
    reset = () => {
        this.instances = this.nextNumber = 0
    }

    /**
     * Removes unique number. Resets if last one.
     */
    resolve = () => {
        if (this.instances) {
            this.instances--
            if (this.instances === 0) this.nextNumber = 0
        }
    }
}
