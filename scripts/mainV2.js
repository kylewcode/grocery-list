(function(){
    "use strict";
    //Grabs the Add button.
    const addButton = document.getElementById('add-button');
    
    //How can I move everything into functions that accomplish a user task/feature?
    
    //Add Items
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
            updateItems();
        })
    };
    
    addItems();
    
    //Update Items
    function updateItems(){
        let updatedList = document.getElementsByTagName('li');
        document.querySelectorAll('text-element')
        .forEach(item => {
            item.addEventListener('click', event => {
                console.log('I clicked');
            })
        })
        
    };
    
    //Remove Items
    function removeItems(){
        
    };
})();

