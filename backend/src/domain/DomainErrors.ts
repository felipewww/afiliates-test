export class DomainError extends Error {}

export class NotAuthorized extends DomainError {
    constructor() {
        super();
        
        this.message = "Actions ins't authorized"
    }
}

export class InvalidPassword extends DomainError {
    constructor() {
        super();
        
        this.message = "Invalid username or password"
    }
}
