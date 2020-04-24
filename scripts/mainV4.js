(function(){
    "use strict";
    // Grab <form> and <li> element by class
    const groceryForm = document.querySelector('.input');
    const list = document.querySelector('.list-group');
    
    // Create variable to store state (items in the grocery list, etc.)
    let items = [];
    
    // Create function to handle form submit event
    function handleSubmit(e) {
        e.preventDefault();
        const name = e.currentTarget.item.value;
        if(!name) return alert('Please enter something!');
        const item = {
            name,
            id: Date.now(),
            quantity: 1,
        };
        items.push(item);
        e.currentTarget.item.value = '';
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
    
    function displayItems() {
        const html = items.map(item => `
        <li class="list-group-item">
            <div class="row">
                <div class="col-xs-10">
                    <span class="text-element">${item.name}</span>
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
        console.log('Mirroring to storage...');
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
        console.log(quantity);
        item.quantity = quantity;
        console.log(item);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
    
    // Add event listener to <form> element to listen for submit event
    groceryForm.addEventListener('submit', handleSubmit);
    
    // Listen for custom events from <ul>
    list.addEventListener('itemsUpdated', displayItems);
    list.addEventListener('itemsUpdated', mirrorToLocalStorage);

    // Listen for click on the close button X but from parent <ul>
    list.addEventListener('click', function(e) {
        let id = parseInt(e.target.value);
        if(e.target.matches('button')) {
            deleteItem(id);
        }
        
        // id = parseInt(e.target.name)
        // if(e.target.matches('input[type="number"]')) {
        //     quantityUpdate(id);
        // }
    });

    // Listen for input to quantity input
    list.addEventListener('input', function(e) {
        const id = parseInt(e.target.name)
        if(e.target.matches('input[type="number"]')) {
            quantityUpdate(id);
        }
    });

    restoreFromLocalStorage();

})();