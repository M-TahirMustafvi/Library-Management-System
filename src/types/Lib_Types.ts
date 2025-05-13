
class User {
    id: string;
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.id = new Date().toISOString();
    }
}

export default User;