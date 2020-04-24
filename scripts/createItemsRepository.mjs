const createItemsRepository = (initalItems = []) => {
    const items = [...items];
    
    const updateCallbacks = [];

    const fireUpdateCallbacks = () => {
        for (let cb of updateCallbacks) {
            cb(repo.getItems());
        }
    };

    const cloneItems = () => {
        return items;
    }

    const repo = {
        addItem (item = {}) {
            items.push(item);
            fireUpdateCallbacks();
        },
        getItems(start, end) {

            return cloneItems();
        },
        updateItem(id = 0, props = {name = "", quantity = 0, updating = false}) {
            fireUpdateCallbacks();
        },
        deleteItem(id = 0) {
            fireUpdateCallbacks();
        },
        registerUpdateCallback(cb = (items = []) => {}) {
            updateCallbacks.push(cb);
        },
    };

    return repo;
};

export {createItemsRepository}; 