// Inputs
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
// Form
const form = document.getElementById('myForm');
// Form Handle
form.addEventListener('submit', function(event){
    //prevent default behav
    event.preventDefault();
    if(
        validateFirstName() &&
        validateLastName() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateEmail()
    ) {
        const name = firstName.value;
        const container = document.querySelector('div.container');
        const loader = document.createElement('div');
        loader.className = 'progress';
        const loadingBar = document.createElement('div');
        loadingBar.className = 'indeterminate';
        loader.appendChild(loadingBar);
        container.appendChild(loader);

        setTimeout(function(){
            const loaderDiv = document.querySelector('div.progress');
            const panel = document.createElement('div');
            panel.className = 'card-panel green';
            const text = document.createElement('span');
            text.className = 'white-text';
            text.appendChild(document.createTextNode(`Sign up successful. Thank You ${name}`));
            panel.appendChild(text);
            container.replaceChild(panel, loaderDiv);
        }, 1000)
    }
});
//Validating Funcs--------------------------------------------------------------------------------//
function validateFirstName(){
    //is empty?
    if(checkIfEmpty(firstName)) return;
    //has only letters?
    if(!checkIfOnlyLetters(firstName)) return;
    return true;
}
function validateLastName(){
    //is empty?
    if(checkIfEmpty(lastName)) return;
    //has only letters?
    if(!checkIfOnlyLetters(lastName)) return;
    return true;
}
function validatePassword(){
    if(checkIfEmpty(password)) return;
    // certain length
    if(!meetLength(password, 6, 18)) return;
    //against charater set
    //1- a
    //2- a 1
    //3- A a 1
    //4- A a 1 @    
    //5- for email
    if(!checkHasCaracters(password, 3)) return;
    return true;
}
function validateConfirmPassword(){
    if(password.className !== 'valid'){
        setInvalid(confirmPassword, 'Password must be valid first');
        return;
    }
    //Check is match
    if(password.value !== confirmPassword.value){
        setInvalid(confirmPassword, 'Passwords needs to be the same');
        return;
    }else {
        setValid(confirmPassword);
    }
    return true;
}
function validateEmail(){
    if(checkIfEmpty(email)) return;
    if(!checkHasCaracters(email, 5)) return;
    return true;
}
//Util Funcs------------------------------------------------------------------------------------//
function checkIfEmpty(field){
    if(isEmpty(field.value.trim())){
        // set invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;
    } else {
        //set valid
        setValid(field);
        return false;
    }
}
function isEmpty(value){
    if(value === '') return true;
    return false;
}
function setInvalid(field, message){
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    //field.nextElementSibling.innerHTML = red;
}
function setValid(field){
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    //field.nextElementSibling.innerHTML = green;
}
function checkIfOnlyLetters(field){
    if(/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`);
        return false;
    }
}
function meetLength(field, minLength, maxLength){
    if(field.value.length >= minLength && field.value.length < maxLength){
        setValid(field);
        return true;
    } else if(field.value.length < minLength){
        setInvalid(field, `${field.name} must be at least ${minLength} characters long`);
        return false;
    } else {
        setInvalid(field, `${field.name} must be shorter ${maxLength} characters`);
        return false;
    }
}
function checkHasCaracters(field, code){
    let regEx;
    switch(code){
        case 1:
            //letters
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one letter');
        case 2:
            //letters and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one letter and one number');
        case 3:
            //upper-, lowercase and number
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one upper- and lowercase letters and a number');
        case 4:
            // 3+spec charaters
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return matchWithRegEx(regEx, field, 'Must contain at least one upper- and lowercase letters, a number and a SPECIAL charater');
        case 5:
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchWithRegEx(regEx, field, 'Must a valid email address');
        default:
            return false;
    }
}
function matchWithRegEx(regEx, field, message){
    if(field.value.match(regEx)){
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}