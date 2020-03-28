//first thing is to set the event listeners in place

const STORE = [
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false}
];

function addItemToShoppingList(itemName){
    console.log(`Adding a ${itemName} to shopping list`);
  
    STORE.push({id: cuid(), name: itemName, checked: false});
  
  }


function renderShoppingList(){

    console.log('render funciona');

    const shoppingListItemsString = generateShoppingItemsString(STORE);
    $('.js-shopping-list').html(shoppingListItemsString);

}

function generateShoppingItemsString(shoppingList){

    const items = shoppingList.map((item) => generateItemElement(item));
console.log(items.join(''));
    return items.join('') 
}

function generateItemElement(item){

return `
  <li data-item-id="${item.id}">
    <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
  </li>`;




}

//EVENT LISTENERS

//listens on the submission to add an item
function addItem(){
    $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    console.log('im listening');

        const newItemName = $('.js-shopping-list-entry').val();
        console.log(newItemName);

        $('.js-shopping-list-entry').val(' ');

addItemToShoppingList(newItemName)
renderShoppingList();
                                                        } )

}


function removeItemFromList(itemId){

const itemIndex = STORE.findIndex(item => item.id === itemId);
STORE.splice(itemIndex, 1);


}

function getItemIdFromElement(item) {
  
    console.log(`esto es lo que buscas ${item}` );
    return $(item)
      .closest('li')
      .data('item-id');
  }

  function handleDeleteButton(){
    $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    
      console.log("I heard you wanto to delete me!!!");
      const itemId = getItemIdFromElement(event.currentTarget)
    removeItemFromList(itemId);
    renderShoppingList();
    }
    )
    };
  

function toggleButton(itemId){

const item = STORE.find(item => item.id === itemId);
item.checked = !item.checked;
}

  function handleToggleButton(){
    $('.js-shopping-list').on('click', `.js-item-toggle`, event =>{
console.log("Toggle away")
const id = getItemIdFromElement(event.currentTarget)
toggleButton(id)
renderShoppingList();


    }

    )
  }



function handleShoppingList() {
  renderShoppingList();
  addItem();
  handleDeleteButton()
  handleToggleButton()
  
  }
  
  
  
  $(handleShoppingList);




