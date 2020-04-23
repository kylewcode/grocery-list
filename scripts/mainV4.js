// Grab <form> and <li> element by class
const groceryForm = document.querySelector('.input');
const list = document.querySelector('.list');

// Create variable to store state (items in the grocery list, etc.)
let items = [];

// Create function to handle form submit event
function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
}

// Add event listener to <form> element to listen for submit event
groceryForm.addEventListener('submit', handleSubmit);