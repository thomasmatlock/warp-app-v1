// Add new item
exports.addItem = (item, isNew = false) => {
    // console.log(item);
    // Create a new HTML Dom node
    let itemNode = document.createElement('div');

    // Assign "read-item" class
    itemNode.setAttribute('class', 'read-item');

    // Set item url as data attribute
    itemNode.setAttribute('data-url', item.url);

    // Add inner HTML to new node
    itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

    // Append new item to "items" container
    items.appendChild(itemNode);

    // Attach click handler to select
    itemNode.addEventListener('click', this.select); // when this element is clicked, it calls the select function

    // Attach double click handler to open
    itemNode.addEventListener('dblclick', this.open);

    // If this is the first item, select it
    if (document.getElementsByClassName('read-item').length === 1) {
        itemNode.classList.add('selected');
    }
    // Add item to storage array and persist
    if (isNew) {
        this.storage.push(item); // appends item to array
        this.save(); // saves array to local storage
    }
};