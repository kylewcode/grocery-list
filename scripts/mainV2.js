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
    
    //Add listener to main input
    
    //Add Grocery Item Name
    function addItems(addButton, userInput){
        addButton.addEventListener('click', () => {
            const li = document.createElement('li');
            li.setAttribute('class', 'list-group-item');
            const groceryItem = document.getElementById('grocery-item').value;
            const text = document.createElement('span');
            setAttributes(text, {'class': 'text-element', 'spellcheck': 'true', 'autocomplete': 'on'});
            const textContent = document.createTextNode(`${groceryItem}`);
            text.appendChild(textContent);
            li.appendChild(text);
            
            if (groceryItem === '') {
                alert('Enter a grocery item.');
            } else {
                document.getElementById('my-ul').appendChild(li);
            }
            
            updateItems(text, li);
            addQuantity(li);
            removeItems(li);
        });

        userInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter'){
                const li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                const groceryItem = document.getElementById('grocery-item').value;
                const text = document.createElement('span');
                setAttributes(text, {'class': 'text-element', 'spellcheck': 'true', 'autocomplete': 'on'});
                const textContent = document.createTextNode(`${groceryItem}`);
                text.appendChild(textContent);
                li.appendChild(text);
                
                if (groceryItem === '') {
                    alert('Enter a grocery item.');
                } else {
                    document.getElementById('my-ul').appendChild(li);
                }
                
                updateItems(text, li);
                addQuantity(li);
                removeItems(li);
            };
        });
    };
    
    //Update Items
    function updateItems(itemSpan, li){
        itemSpan.addEventListener('click', () => {
            itemSpan.remove();
            const input = document.createElement('input');
            li.firstChild.before(input);
            input.focus();
            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    const userInput = input.value;
                    input.remove();
                    const newItem = document.createElement('span');
                    newItem.textContent = userInput;
                    li.firstChild.before(newItem);
                    updateItems(newItem, li);
                };
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

