(function(){
    //Grabs the Add button.
    const addButton = document.getElementById('add-button');
    
    //Creates and displays list item.
    addButton.addEventListener('click', () => {
        const li = document.createElement('li');
        const groceryItem = document.getElementById('grocery-item').value;
        const text = document.createElement('span');
        const textClass = document.createAttribute('class');
        textClass.value = 'text-element';
        text.setAttributeNode(textClass);
        const textContent = document.createTextNode(`${groceryItem}`)
        text.appendChild(textContent);
        li.appendChild(text);
        
        if (groceryItem === '') {
            alert('Enter a grocery item.');
        } else {
            document.getElementById('my-ul').appendChild(li);
        }
        
        //Gets li element items needed for text entry updating.
        let updatedList = document.getElementsByTagName('li');
        
        //Removes old text and replaces it with an empty input.
        for (let i = 0; i < updatedList.length; i++) {
            updatedList[i].firstChild.onclick = () => {
                updatedList[i].removeChild(updatedList[i].firstChild);
                const newElement = document.createElement('input');
                const newAttribute = document.createAttribute('type');
                newAttribute.value = 'text';
                newElement.setAttributeNode(newAttribute);
                const newAttribute2 = document.createAttribute('class');
                newAttribute2.value = 'updated-items';
                newElement.setAttributeNode(newAttribute2);
                
                //Insert the new input element at the beginning of the proper <li> element.
                updatedList[i].insertBefore(newElement, updatedList[i].firstChild);
                
                //Takes input from newly created text inputs and replaces them with updated text.
                //Creates and updates list of text inputs.
                const inputList = document.getElementsByClassName('updated-items');
                console.log(inputList);
                
                for (let j = 0; j < inputList.length; j++) {
                    inputList[j].onkeydown = () => {
                        if (event.key === 'Enter') {
                            let updatedVar = inputList[j].value;
                            inputList[j].parentNode.removeChild(inputList[j]);
                            const updatedText = document.createElement('span');
                            const updatedTextClass = document.createAttribute('class');
                            updatedTextClass.value = 'text-element';
                            updatedText.setAttributeNode(updatedTextClass);
                            updatedText.textContent = updatedVar;
                            updatedList[j].insertBefore(updatedText, updatedList[j].firstChild);
                        }
                    }
                }
                
                
            }
        }
        
        
        //Creates the quantity input for grocery item.
        const quantity = document.createElement('input');
        quantity.setAttribute('class', 'quantity');
        quantity.setAttribute('type', 'number');
        quantity.setAttribute('step', '1');
        quantity.setAttribute('min', '0');
        li.appendChild(quantity);
        
        //Creates the X box and attaches it to the list item. (EDIT: The span will now need to be a child of 
        //the number input for quantity of grocery item.
        const span = document.createElement('span');
        const txt = document.createTextNode(' X');
        span.className = 'close';
        span.appendChild(txt);
        li.appendChild(span);
        
        //Makes X box click to remove the list item.
        let close = document.getElementsByClassName('close');
        
        for (let i = 0; i < close.length; i++) {
            close[i].onclick = () => {
                let x = close[i].parentNode;
                x.style.display = 'none';
            }
        }
        
        //Update existing grocery item names.
        //const updateList = text + text;
        
        //for (let i = 0; i < updateList.length; i++) {
        //  console.log('updateList loop');
        //}
        //console.log(text);
        
    });
})();

