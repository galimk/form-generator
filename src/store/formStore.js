export const actionTypes = {
    addField: 'ADD_FIELD',
    deleteField: 'DELETE_FIELD',
    updateField: 'UPDATED_FIELD'
};

export const fieldTypes = {
    Text: 'TEXT',
    Check: 'CHK',
    Radio: 'RADIO',
    Select: 'SELECT'
};

const state = {};

const actions = {
    [actionTypes.addField]: ({commit}, fieldType) => {
        commit(actionTypes.addField, {type: fieldType});
    }
};

const mutations = {
    [actionTypes.addField]: (state, addPayload) => {
        console.log('add field is invoked..');
    },
    [actionTypes.deleteField]: (state, deletePayload) => {

    },
    [actionTypes.updateField]: (state, updatedPayload) => {

    }
};

const getters = {};

export default {
    actions,
    state,
    mutations,
    getters
}
