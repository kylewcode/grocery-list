(function(){
    "use strict";
    //Initializes the add button's functionality.
    function inputInit(){
        const addButton = document.getElementById('add-button');
        const userInput = document.getElementById('grocery-item');
        setAttributes(userInput, {'spellcheck': 'true', 'autocomplete': 'on'});
        addItems(addButton, userInput);
    };
    inputInit();
    
    //Activates with button or Enter key.
    function addItems(addButton, userInput){
        addButton.addEventListener('click', () => {
            createItems(userInput);
        });
        userInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter'){
                createItems(userInput);
            };
        });
    };
    
    //Creates grocery item.
    function createItems(userInput){
        const div = document.createElement('div');
        div.setAttribute('class', 'row');
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item');
        const groceryItem = userInput.value;
        userInput.value = '';
        const text = document.createElement('span');
        setAttributes(text, {'class': 'text-element', 'spellcheck': 'true', 'autocomplete': 'on'});
        const textContent = document.createTextNode(`${groceryItem}`);
        text.appendChild(textContent);
        const columnXS = createColumnXS();
        columnXS.appendChild(text);
        div.appendChild(columnXS)
        li.appendChild(div);
        
        if (groceryItem === '') {
            alert('Enter a grocery item.');
        } else {
            document.getElementById('my-ul').appendChild(li);
        }
        
        updateItems(text, div, columnXS);
        addQuantity(div, columnXS);
        removeItems(li, div);
    };
    
    //Update Items
    function updateItems(itemSpan, columnXS){
        itemSpan.addEventListener('click', () => {
            itemSpan.remove();
            const input = document.createElement('input');
            columnXS.firstChild.before(input);
            input.focus();
            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    const userInput = input.value;
                    input.remove();
                    const newItem = document.createElement('span');
                    newItem.textContent = userInput;
                    columnXS.firstChild.before(newItem);
                    updateItems(newItem, columnXS);
                };
            });
        });
    };
    
    //Add quantity input.
    function addQuantity(div, columnXS) {
        const quantity = document.createElement('input');
        setAttributes(quantity, {'class': 'quantity ml-3', 'type': 'number', 'step': '1', 'min': '0', 'style': "width: 3em"});
        columnXS.appendChild(quantity);
        div.appendChild(columnXS);
    };
    
    //Remove Items. Dependencies - parent quantity input.
    function removeItems(li, div){
        const bttn = document.createElement('button');
        setAttributes(bttn, {'class': 'close', 'type': 'button', 'aria-label': "Close"});
        //const span = document.createElement('span');
        //span.setAttribute('aria-hidden', 'true');
        //span.textContent = 'x';
        //bttn.appendChild(span);
        bttn.innerText = 'X';
        const column = createColumn();
        column.appendChild(bttn);
        div.appendChild(column);
        bttn.addEventListener('click', () => {
            li.remove();
        });
    };
    
    //Helper function to set multiple attributes to an element.
    function setAttributes(element, attributes) {
        for(let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    };
    
    //Helper function that appends multiple children to a single parent.
    function appendChildren(parent, children){
        children.forEach(child => {
            parent.appendChild(child);
        });
    };
    
    //Helper function that creates a bootstrap div column XS
    function createColumnXS(){
        const div = document.createElement('div');
        div.setAttribute('class', 'col-xs-10');
        return div;
    }

    //Helper function that creates a bootstrap div column
    function createColumn(){
        const div = document.createElement('div');
        div.setAttribute('class', 'col');
        return div;
    }
    
})();

