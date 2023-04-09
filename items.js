const items = require("./fakeDb");

function getAllItems() {
    return items;
}

function createItem(newItem) {
    items.push(newItem);
}

function getItem(itemName) {
    const foundItem = items.find(item => item.name === itemName);
    return foundItem;
}

function updateItem(itemName, newName, newPrice) {
    const foundItem = items.find(item => item.name === itemName);
    foundItem.name = newName;
    foundItem.price = newPrice;
    return foundItem;
}

function deleteItem(itemName) {
    const foundIndex = items.findIndex(item => item.name === itemName);
    if(foundIndex !== -1) {
        items.splice(foundIndex, 1);
    }
    return foundIndex;
}

module.exports = {
    getAllItems: getAllItems,
    createItem: createItem,
    getItem: getItem,
    updateItem: updateItem,
    deleteItem: deleteItem
}