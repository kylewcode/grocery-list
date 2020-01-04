import { Nodehun } from './nodehun';
 
const fs          = require('fs');
const affix       = fs.readFileSync('path/to/*.aff');
const dictionary  = fs.readFileSync('path/to/*.dic');
 
const nodehun     = new Nodehun(affix, dictionary);

//Grabs value from user input and spell checks it.
addButton.addEventListener('click', () => {
    const groceryItem = document.getElementById('grocery-item').value;
    console.log(groceryItem);
});