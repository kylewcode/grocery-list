//Grabs the Add button.
const addButton = document.getElementById('add-button');

//Creates and displays list item.
addButton.addEventListener('click', () => {
    const li = document.createElement('li');
    const groceryItem = document.getElementById('grocery-item').value;
    const text = document.createTextNode(groceryItem);
    li.appendChild(text);
    if (groceryItem === '') {
        alert('Enter a grocery item.');
    } else {
        document.getElementById('my-ul').appendChild(li);
    }
    //Creates the X box and attaches it to the list item.
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
});
