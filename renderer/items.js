const fs = require("fs");

let items = document.getElementById("items");
let readerJS;
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
  readerJS = data.toString(); // read content and assign it to ready
});

// track items in storage
exports.storage = JSON.parse(localStorage.getItem("readit-items")) || [];

exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage));
};

// set item as selected
exports.select = event => {
  // remove currently selected item
  document
    .getElementsByClassName("read-item selected")[0]
    .classList.remove("selected");

  // add to clicked item
  event.currentTarget.classList.add("selected");
};

exports.changeSelection = direction => {
  let currentItem = document.getElementsByClassName("read-item selected")[0];

  if (
    direction === "ArrowUp" &&
    currentItem.previousSibling &&
    currentItem.previousSibling.classList
  ) {
    currentItem.classList.remove("selected");
    currentItem.previousSibling.classList.add("selected");
  } else if (direction === "ArrowDown" && currentItem.nextSibling) {
    currentItem.classList.remove("selected");
    currentItem.nextSibling.classList.add("selected");
  }
};

exports.open = () => {
  // only if we have items
  if (!this.storage.length) return;

  // get the selected item
  let selectedItem = document.getElementsByClassName("read-item selected")[0];

  // get the url
  let contentURL = selectedItem.dataset.url;

  // open item in proxy BrowserWindow - nodeIntegration assumes true - uh oh
  // also has same size limits as main window
  let readerWin = window.open(
    contentURL,
    "",
    `
    maxWidth=2000,
    maxHeight=2000,
    width=1200,
    height=800,
    backgroundColor=#DEDEDE,
    nodeIntegration=0,
    contextIsolation=1
  `
  );

  // inject javascript
  readerWin.eval(readerJS);
};

exports.addItem = (item, isNew = false) => {
  // Create a new DOM node
  let itemNode = document.createElement("div");

  // assign read item class
  itemNode.setAttribute("class", "read-item");

  // set item url as data attribute
  itemNode.setAttribute("data-url", item.url);

  itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

  items.appendChild(itemNode);

  // Attach click handler to select
  itemNode.addEventListener("click", this.select);
  itemNode.addEventListener("dblclick", this.open);

  if (document.getElementsByClassName("read-item").length === 1) {
    itemNode.classList.add("selected");
  }

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
