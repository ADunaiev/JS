document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) console.error('#login-form not found - ignored')
    else loginForm.addEventListener('submit', loginFormSubmit);

    const namePhoneForm = document.getElementById('name-phone-form');
    if (!namePhoneForm) console.error('#name-phone-form not found - ignore')
    else namePhoneForm.addEventListener('submit', namePhoneFormSubmit);
});

function namePhoneFormSubmit(e) {
    e.preventDefault();
    console.log('namePhoneFormSubmit');

    validateNamePhoneForm();

}

//лямбда (у програмуванні) - функціональний вираз (expression), тобто 
// інструкція (statement), яка повертає значення
loginFormSubmit = e => {
    e.preventDefault(); // зупинити обробку за замовчанням
    console.log("Submit detected");
    var result = validateForm(e.target);

    if (result !== true) {
        alert(result);
    }

};

function validateForm(formNode) {
    const loginInput = formNode.querySelector('[name="user-login"]');
    if (!loginInput) throw "Element name='user-login' not found";

    const userLogin = loginInput.value;
    if (userLogin.length < 2) {
        return "Логін закороткий";
    }
    return true;
}

function validateNamePhoneForm() {
    const namePhoneForm = document.getElementById('name-phone-form');
    if (!namePhoneForm) throw "Name-phone-form not found - Validation stopped!";

    const nameInput = namePhoneForm.querySelector('[name="user-name"');
    if (!nameInput) throw "name='user-name' not found - validation stopped";

    const phoneInput = namePhoneForm.querySelector('[name="user-phone"');
    if (!phoneInput) throw "name='user-phone' not found - validation stopped";

    const nameHelper = nameInput.parentNode.querySelector('.helper-text');
    if (!nameHelper) throw "'.helper-text' is not found";

    const phoneHelper = phoneInput.parentNode.querySelector('.helper-text');
    if (!phoneHelper) throw "'.helper-text' is not found";

    if (nameInput.value == "")
    {
        nameInput.className = "invalid";
        nameHelper.setAttribute('data-error', "Ім'я не може бути порожним");
        //alert("Name could not be empty");
    }
    else if (/\d/.test(nameInput.value)) {
        nameInput.className = "invalid";
        nameHelper.setAttribute('data-error', "Ім'я не може мистити цифри");

    }
    else if (/[^a-zа-яіЇє'ґ ]/i.test(nameInput.value)) {
        nameInput.className = "invalid";
        nameHelper.setAttribute('data-error', "Ім'я не може мистити спецзнаки");

    }
    else {
        nameInput.className = "valid";
    }

    if (phoneInput.value == "")
    {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute('data-error', "Номер не може бути порожним");
        //alert("Name could not be empty");
    }/*
    else if (/\D/.test(phoneInput.value)) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute('data-error', "Номер має складатися з цифр");
    }/*
    else if ( !/^\d{6}$/.test(phoneInput.value)) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute('data-error', "Номер має складатися з 6 цифр");
    }
    else if ( !/^\d{6,8}$/.test(phoneInput.value)) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute('data-error', "Номер має складатися від 6 до 8 цифр");
    }
    else if (! /^\d{2}-\d{2}-\d{2}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute('data-error', "Номер має виглядати як хх-хх-хх");
    }
    else if (! /^\d{2}(-\d{2}){2}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute('data-error', "Номер має виглядати як хх-хх-хх");
    }
    else if (! /^\d{2}(-?\d{2}){2}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute('data-error', "Номер має виглядати як хх-хх-хх або хххххх");
    }*/
    else if (! /^\+38\(0\d\d\)([- ]?\d){7}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute('data-error', "+38(098)7654321");
    }
    else {
        phoneInput.className = "valid";
    }
}