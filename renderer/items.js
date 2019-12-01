let items = document.getElementById("items");

// track items in storage
exports.storage = JSON.parse(localStorage.getItem("readit-items")) || [];

exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage));
};

exports.addItem = (item, isNew = false) => {
  // Create a new DOM node
  let itemNode = document.createElement("div");

  // assign read item class
  itemNode.setAttribute("class", "read-item");
  itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

  items.appendChild(itemNode);

  // add item to storage and persist
  if (isNew) {
    this.storage.push(item);
    this.save();
  }
};

// Add items from storage when app loads

this.storage.forEach(item => {
  this.addItem(item);
});
