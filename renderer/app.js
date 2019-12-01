const { ipcRenderer } = require("electron");
const items = require("./items");

// main window renderer process
let showModal = document.getElementById("show-modal");
let closeModal = document.getElementById("close-modal");
let modal = document.getElementById("modal");
let addItem = document.getElementById("add-item");
let itemURL = document.getElementById("url");
let search = document.getElementById("search");

// Filter items with "search"
search.addEventListener("keyup", event => {
  Array.from(document.getElementsByClassName("read-item")).forEach(item => {
    let hasMatch = item.innerText.toLowerCase().includes(search.value.toLowerCase());
    item.style.display = hasMatch ? "flex" : "none";
  });
});

// navigate item selection with up/down arrows
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    items.changeSelection(event.key)
  }
})

// toggle button
const toggleModalButtons = () => {
  // check state of buttion
  if (addItem.disabled === true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = "Add Item";
    closeModal.style.display = "inline";
  } else {
    addItem.style.opacity = 0.5;
    addItem.innerText = "Adding...";
    addItem.disabled = true;
    closeModal.style.display = "none";
  }
};

// show modal
showModal.addEventListener("click", () => {
  modal.style.display = "flex";
  itemURL.focus();
});

// hide modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// handle item
addItem.addEventListener("click", () => {
  if (itemURL.value) {
    // Send new item url to main process
    ipcRenderer.send("new-item", itemURL.value);
    toggleModalButtons();
  }
});

// listen for new item from main process
ipcRenderer.on("new-item-success", (event, newItem) => {
  items.addItem(newItem, true);

  toggleModalButtons();

  // hide modal and clear value
  modal.style.display = "none";
  itemURL.value = "";
});

// listen for keyboard submit - essentially clicking button for user
itemURL.addEventListener("keyup", event => {
  if (event.key === "Enter") addItem.click();
});
