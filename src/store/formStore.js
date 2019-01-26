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
        commit(actionTypes.deleteField, fieldId);
    }
};

const mutations = {
    [actionTypes.addField]: (state, addPayload) => {
        const fields = [...state.fields];
        const newId = fields.length > 0 ? Math.max(...fields.map(e => e.id)) + 1 : 1;
        const newField = {
            id: newId,
            name: `${newId} Field`,
            type: addPayload.type
        };

        fields.push(newField);

        state.fields = fields;
    },
    [actionTypes.deleteField]: (state, fieldId) => {
        const fields = [...state.fields];
        const foundIndex = fields.findIndex(e => e.id === fieldId);
        if (foundIndex !== -1) {
            fields.splice(foundIndex, 1);
            state.fields = fields;
        }
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
