(function(){
    "use strict";
    //Grabs the Add button.
    const addButton = document.getElementById('add-button');
    
    //How can I move everything into functions that accomplish a user task/feature?
    
    //Add Grocery Item Name
    function addItems(){
        addButton.addEventListener('click', () => {
            const li = document.createElement('li');
            li.setAttribute('class', 'list-group-item');
            const groceryItem = document.getElementById('grocery-item').value;
            const text = document.createElement('span');
            text.setAttribute('class', 'text-element');
            const textContent = document.createTextNode(`${groceryItem}`)
            text.appendChild(textContent);
            li.appendChild(text);
            
            if (groceryItem === '') {
                alert('Enter a grocery item.');
            } else {
                document.getElementById('my-ul').appendChild(li);
            }

            updateItems(text);
            addQuantity(li);
            removeItems(li);
        });
    };
    
    addItems();
    
    //Update Items
    function updateItems(itemSpan){
        itemSpan.addEventListener('click', () => {
            const parent = itemSpan.offsetParent;
            itemSpan.remove();
            const input = document.createElement('input');
            parent.appendChild(input);
            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    const userInput = input.value;
                    input.remove();
                    const newItem = document.createElement('span');
                    newItem.textContent = userInput;
                    parent.appendChild(newItem);
                }
            });
        });
    };

    //Add quantity input. Dependencies - parent <li>
    function addQuantity(li) {
        const quantity = document.createElement('input');
        setAttributes(quantity, {'class': 'quantity ml-3', 'type' :'number', 'step':'1', 'min':'0'});
        li.appendChild(quantity);
    };

    //Helper function to set multiple attributes to an element.
    function setAttributes(element, attributes) {
        for(let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    };

    //Remove Items. Dependencies - parent quantity input.
    function removeItems(li){
        const bttn = document.createElement('button');
        setAttributes(bttn, {'class': 'close', 'type': 'button', 'aria-label': "Close"});
        const span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.textContent = 'x';
        bttn.appendChild(span);
        li.appendChild(bttn);
        bttn.addEventListener('click', () => {
            li.remove();
        });
    };

})();

