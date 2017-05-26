module.exports = class MockDb {
    constructor() {
        // nothing here yet, also this is a repository, jesus jason
        this.db = new Map();
    }

    addUser(user) {

    }

    getUsers(filter) {

    }

    exportUsers() {

    }

    getStatus() {
        return new Promise(resolve => {
            resolve({
                status: 'ONLINE (MOCK)',
                count: this.db.size,
            });
        });
    }
};
