class ValidationHelper {
    validateEmail(email: string) {
        const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    }

    validatePassword(password: string) {
        const pattern = /^.{8,20}$/;
        return pattern.test(password);
    }
}

export default new ValidationHelper();