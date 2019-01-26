export const actionTypes = {
    addField: 'addField',
    deleteField: 'deleteField',
    updateField: 'updateField'
};

export const fieldTypes = {
    Text: 'Text',
    Check: 'Check',
    Radio: 'Radio',
    Select: 'Select',
    Email: 'Email',
    Password: 'Password'
};

const state = {
    fields: []
};

const actions = {
    [actionTypes.addField]: ({commit}, fieldType) => {
        commit(actionTypes.addField, {type: fieldType});
    },
    [actionTypes.deleteField]: ({commit}, fieldId) => {
        commit(actionTypes.deleteField, {type: fieldId});
    }
};

const mutations = {
    [actionTypes.addField]: (state, addPayload) => {
        const fields = [...state.fields];

        const newField = {
            name: `${fields.length} Field`,
            type: addPayload.type
        };

        fields.push(newField);

        state.fields = fields;
    },
    [actionTypes.deleteField]: (state, deletePayload) => {
        const fields = [...state.fields];


    },
    [actionTypes.updateField]: (state, updatedPayload) => {

    }
};

const getters = {
    fields: state => state.fields
};

export default {
    actions,
    state,
    mutations,
    getters
}
