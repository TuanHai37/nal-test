import bcrypt from 'bcrypt';

class HashHelper {
    async hash(password: string) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }

    async verifyPassword(password: string, hash: string) {
        const data = await bcrypt.compare(password, hash);
        return data;
    }
}

export default new HashHelper();
