export default {
    methods: {
        isValidEmail(email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        inputStatus(validation) {
            return {
                'is-invalid': validation.$error,
                'is-valid': validation.$dirty && !validation.$error
            }
        }
    }
}
