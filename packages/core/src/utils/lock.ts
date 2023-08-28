import { sleep } from 'koishi'
import { createLogger } from './logger'

const logger = createLogger()

export class ObjectLock {
    private _lock: boolean = false

    private _queue: number[] = []
    private _currentId = 0

    async lock() {
        if (this._lock) {
            const id = this._currentId++
            this._queue.push(id)
            while (this._queue[0] !== id || this._lock) {
                await sleep(10)
            }
        }

        this._lock = true
    }

    async runLocked<T>(func: () => Promise<T>): Promise<T> {
        await this.lock()
        const result = await func()
        await this.unlock()
        return result
    }

    async unlock() {
        if (!this._lock) {
            throw new Error("unlock without lock")
        }

        this._lock = false
        const remove = this._queue.shift()
    }

    get isLocked() {
        return this._lock
    }
}

