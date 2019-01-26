export default {
    methods: {
        inputStatus(validation) {
            return {
                'is-invalid': validation.$error,
                'is-valid': validation.$dirty && !validation.$error
            }
        }
    }
}