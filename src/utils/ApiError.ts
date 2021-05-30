export class ApiError extends Error {
    status: number;

    constructor({ message, status, stack }: { message: string; status: number; stack?: string }) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.stack = stack;
    }
}
