(function(){
    "use strict";


    // --------------Scoped Variables------------


    // Grab <form> and <li> element by class
    const groceryForm = document.querySelector('.input');
    const list = document.querySelector('.list-group');
    
    // Create variable to store state (items in the grocery list, etc.)
    let items = [];


    // ---------------Functions--------------------

    
    // Create function to handle form submit event
    function handleSubmit(e) {
        e.preventDefault();
        const name = e.currentTarget.item.value;
        if(!name) return alert('Please enter something!');
        const item = {
            name,
            id: Date.now(),
            quantity: 1,
            updating: false,
        };
        items.push(item);
        e.currentTarget.item.value = '';
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
    
    function displayItems() {
        const html = items.map(item => `
        <li class="list-group-item">
        <div class="row">
        <input class="update-input" ${item.updating === false ? 'style="display: none"' : ''} name="${item.name}">
        <div class="col-xs-10">
        <span ${item.updating === true ? 'style="display: none"' : ''} class="text-element">${item.name}</span>
        <input class="quantity ml-3" type="number" value="${item.quantity}" name="${item.id}" step="1" min="0" style="width: 3em">
        </div>
        <div class="col">
        <button class="close" type="button" value="${item.id}" aria-label="Close">X</button>
        </div>
        </div>
        </li>
        `).join('');
        list.innerHTML = html;
    }
    
    // Stores list data to browser
    function mirrorToLocalStorage() {
        localStorage.setItem('items', JSON.stringify(items));
    }
    
    // Returns list data from browser
    function restoreFromLocalStorage() {
        const lsItems = JSON.parse(localStorage.getItem('items'));
        if(lsItems) {
            items.push(...lsItems);
            list.dispatchEvent(new CustomEvent('itemsUpdated'));
        }
    }
    
    function deleteItem(id) {
        items = items.filter(item => item.id !== id);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
    
    function quantityUpdate(id) {
        const item = items.find(item => item.id === id);
        const quantity = document.querySelector(`input[name="${id}"]`).value;
        item.quantity = quantity;
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
    
    function toggleText(name) {
        // Need specific item updating prop
        const item = items.find(item => item.name == name);
        item.updating = !item.updating;
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
    
    // Remove input element and replace with text element of the inputs value
    function updateName(text, name) {
        console.log('Running updateName');
        const newText = text;
        const item = items.find(item => item.name == name);
        
        function handleEnterKey(e) {
            console.log('Running handleEnterKey');
            if(e.key === 'Enter') {
                console.log('You hit enter');
                item.updating = !item.updating;
                list.dispatchEvent(new CustomEvent('itemsUpdated')); 
            } 
        }

        list.addEventListener('keyup', handleEnterKey);
        list.removeEventListener('keyup', handleEnterKey);
    }

    
    // --------------- Event Listeners------------------------

    
    // Add event listener to <form> element to listen for submit event
    groceryForm.addEventListener('submit', handleSubmit);
    
    // Listen for custom events from <ul>
    list.addEventListener('itemsUpdated', displayItems);
    list.addEventListener('itemsUpdated', mirrorToLocalStorage);
    
    // Listen for click on the close button X and name text from parent <ul>
    list.addEventListener('click', function(e) {
        const id = parseInt(e.target.value);
        const name = e.target.innerHTML;
        if(e.target.matches('button')) {
            deleteItem(id);
        }
        if(e.target.matches('.text-element')) {
            toggleText(name);
        }
    });
    
    // Listen for input to quantity input and update text input
    list.addEventListener('input', function(e) {
        const id = parseInt(e.target.name)
        const name = e.target.innerHTML;
        if(e.target.matches('input[type="number"]')) {
            quantityUpdate(id);
        }

        if(e.target.matches('.update-input')) {
            const text = e.target.value;
            const name = e.target.name;
            updateName(text, name);
        }
    });
    
    restoreFromLocalStorage();
    
})();