const baseUrl = "https://api.coincap.io/v2";

// обробники подій для кнопок
document.addEventListener('DOMContentLoaded', () => {
    const ajax1Button = document.getElementById('ajax1-button');
    if(!ajax1Button) throw "Can't find 'ajax1-button'"
    else ajax1Button.addEventListener('click', ajax1ButtonClick); 

    const ajax2Button = document.getElementById('ajax2-button');
    if(!ajax2Button) throw "Can't find 'ajax2-button'"
    else ajax2Button.addEventListener('click', ajax2ButtonClick); 

});

function ajax1ButtonClick() {
    const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    window.fetch(url)  // надіслати асінхронний запит до url
        .then(r => {   // у відповідь на запит приходить Response - 
            // HTTP-пакет-відповідь розібрана в  JS-об'єкт 
            // r.status - число, статус-код виконання запиту
            // r.statusText - рядок, що роз'яснує статус-код
            // r.headers - заголовки-відповіді
            if(r.status === 200) {
                //у випадку успішного завантаження вилучаємо тіло пакету
                //в одному з форматів:
                //r.body() - stream
                //r.json() - JSON
                //r.blob() - Binary Large Object
                //r.text() - text
                //r.text().then(showText);
                r.json().then( showJson);
            } else {
                console.error(`fetch error: got status ${r.status}`);
            }
        });
        
    console.log("ajax1Button clicked");
}

function ajax2ButtonClick() {

    fetch(                      // запит AJAX
        `${baseUrl}/assets?limit=5`,    // адреса
        {                       // об'єкт з додатковими параметрами
            method: 'GET',      // метод запиту (https://www.rfc-editor.org/rfc/rfc7231)
            headers: {          // заголовки, зокрема авторизаційний
                'Authorization': "Bearer 03e37f75-b211-46a5-89af-0f5759c5ca6e"
            }
        }
    ).then(r => {
        if (r.status === 200) {
            //r.text().then(showText);
            r.json().then(showCryptoJson);
        } else {
            console.error(`fetch error: got status ${r.status}`);
        }
    })
}

function showCryptoJson(json) {

    var container = document.getElementById('result-container');
    if(!container) throw "Can't find id 'result-container'";

    const table = document.createElement('table');
    table.classList.add('striped');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    let th = document.createElement('th');
    th.innerText = 'Rank';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'Name';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'PriceUSD';
    tr.appendChild(th);

    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for(let rate of json.data) { // у цій API масив JSON приходить у полі "data"

        let tr = document.createElement('tr');

        let td = document.createElement('td');
        td.innerHTML = rate.rank;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = rate.name;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = rate.priceUsd;
        tr.appendChild(td);

        tr.addEventListener('click', () => showHistory(rate));
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    container.appendChild(table);
}

function showHistory( asset ) {
    alert(`${baseUrl}/assets/${asset.id}/history`);
}

function showText( txt ) {
    var container = document.getElementById('result-container');
    if(!container) throw "Can't find id 'result-container'"
    
    const div = document.createElement('div');
    div.innerText = txt;
    container.appendChild(div);
}

/*
function showJson(json) {
    var container = document.getElementById('result-container');
    if(!container) throw "Can't find id 'result-container'"
    
    const div = document.createElement('div');
    // робота з json даними передбачає, що ми розуміємо структуру даних, 
    // тобто чи є це масив чи об'экт, який його склад тощо.
    const ul = document.createElement('ul');
    
    for(let rate of json) {
        let li = document.createElement('li');
        li.innerText = `1 ${rate.cc} (${rate.txt}) - ${rate.rate} грн `;
        li.addEventListener('click', () => showRate(rate));
        ul.appendChild(li);       
    }
    container.appendChild(ul);

}

function showRate(rate) {
    alert(`${rate.exchangedate} r030: ${rate.r030} \n1 ${rate.cc} (${rate.txt}) - ${rate.rate} грн`);
}*/


function showJson(json) {
    var container = document.getElementById('result-container');
    if(!container) throw "Can't find id 'result-container'"
    
    var tableHTML = "<table><tr><th>Date</th><th>Currency</th><th>Currency name</th><th>Rate</th></tr>";


    for (let rate of json) { 

        tableHTML += "<tr><td>";
        tableHTML += rate.exchangedate;
        tableHTML += "</td><td>";
        tableHTML += rate.cc;
        tableHTML += "</td><td>";
        tableHTML += rate.txt;
        tableHTML += "</td><td>";
        tableHTML += rate.rate;
        tableHTML += "</td></tr>";

    }
    tableHTML += "</table>";

    container.innerHTML = tableHTML;

}

/*

03e37f75-b211-46a5-89af-0f5759c5ca6e

JSON - JavaScript Object Notation - формат передачі даних у текстовому представленні з синтаксисом, 
схожим на обїєкт JS
серед даних може бути: 
1. Примітив ("рядок", 123, 123.321, true/false, null)
2. Масив [ 1, 2, 3, 4, 5]
3. Об'єкт { "field1": value1, "field2": value2 }, де значення - див. пп. 1-3

Лапки: є три типи '', "", ``
"" та '' - не маєть жодної різниці, відмінність тільки у рекомендаціях
"" - user-defined values - дані, придумані користувачем
'' - стандатні літерали, те, що саме так і має бути.
`` - інтерполюючий рядок, в нього можна підставляти змінні
    `x=${x}` --> 'x=10'


У JS є декілька способів роботи зі змінними

1) без оголошення 
х = 10
це створює глобальну змінну (window.x). вона доступна 
іншим функціям та скриптам, відповідно, ії перепризначення
може спричинити збої інших активностей.

2) з оголошенням
var x = 10
створює змінну з областю відності у функціі. Для var діє принцип "піднаяття" - 
усі інструкціі підіймаються (при компіляції) до початку функціі.

function f() {         
    ...
    ....
    var x = 10
}

перетворюэтся на 

function f() {   
    var x 
    ...
    ....
    x = 10
}

3)  (JS-6)
let x = 10
const x = 10
це локальні означення - у межах найблизчього блоку {}

function f() {         
    ...
    ....{
    let x = 10
    ...
    let x = 20 - redeclaration error
    }
    x - undefined
}
більш того, ці означення відстежують повторні оголошення (redeclaration), тоді як var - ні.



*/
