const products = [ // масив (конструктор масива)
    { // об'єкт - розширення прототипу object 
        title: "Product1", // ключ: значення, розділення комою
        price: 49.50, // імена ключів можно брати у ""
        "action-price": 42.00, // такі імена, що порушують іменування, треба брати у ""
    }, // перехід до нового елементу масиву
    {
        title: "Product2",
        price: 29.50,
        "action-price": 25.00,
    },
    {
        title: "Product3",
        price: 39.50,
        "action-price": 35.00,
    },
    {
        title: "Product4",
        price: 59.50,
        "action-price": 54.00,
    },
    {
        title: "Product5",
        price: 69.50,
        "action-price": 64.00,
    },
];

document.addEventListener('DOMContentLoaded', function () {
    /* Дана подія виникає коли завантажено HTML та утворено дерево DOM. Саме 
    у даній події доступні усі елементи, незалежно від розташування тега скрипт. */

    //Роботу з елементами реалізовуваємо за наступною схемою:
    // 1. Шукаємо елемент (и)
    const out = document.getElementById("out");
    // 2. Перевіряємо чи знайдено
    if (!out) {
        //3. Якщо не знайдено, то або вивести повідомлення (якщо робота може продовживатися)
        console.error('Element #out not found');
        //або викинути виключення, якщо роботу треба зупинити
        throw 'Element #out not found' ;
    }
    // 4. Працюємо з елементом.
    // а) через зміну HTML
    out.innerHTML = "<b>Вітання з DOMContentLoaded</b>";
    // б) через створення елементів та їх додавання
    const i = document.createElement("i"); // <i></i>
    const t = document.createTextNode("Hello from DOM");
    i.appendChild(t); // <i>Hello from DOM</i>
    out.appendChild(i); // <... id=out><i>Hello from DOM</i>

    // задача про таблицю
    serveButton();
});

function serveButton() {
    // інколи виникає задача пошука елемента без можливості позначити його 
    // атрибутом "id" чи в інший спосіб. У такому разі максимально деталізуємо 
    // положення елементу (по відношенню до інших елементів) та складаємо для нього селектор
    const button = document.querySelector("p button");
    if(!button) throw "Selector 'p button' not found";

    button.onclick = buttonClick; //!!! без круглих дужок
}

function buttonClick() {
    const outTable = document.getElementById("out-table");
    if (!outTable) throw "Element #out-table not found ";

    var tableHTML = "<table><tr><th>Title</th><th>Price</th><th>Action</th></tr>";


    for (let product of products) { 
        tableHTML += `<tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product['action-price']}</td>
            </tr>`;

    }
    tableHTML += "</table>";

    outTable.innerHTML = tableHTML;

}

function buttonClickWrong() {
    /*<table>
        <tr>
            <th>
                 Title
            </th>
            <th>
                Price
            </th>
            <th>
                Action
            </th>
        </tr>

        <tr>
            <td>
                 Title
            </td>
            <td>
                Price
            </td>
            <td>
                Action
            </td>
        </tr>

    </table>*/

    const outTable = document.getElementById("out-table");
    if (!outTable) throw "Element #out-table not found ";


    // будь яка зміна DOM відразу призводить до його повної перебудови.
    outTable.innerHTML = "<table><tr><th>Title</th><th>Price</th><th>Action</th></tr>";
    // ця інструкція створює незавершену таблицю і запускає перебудову DOM 
    // відповідно, HTML закриє тег і подальші команди буде сприймати поза таблицею


    for (let product of products) { // for of cycle on massive elements
        // `` - зворотні (ё-лапки) дозволяють розривати рядки та інтерполювати змінні
        outTable.innerHTML += `<tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product['action-price']}</td>
            </tr>`;

    }
    outTable.innerHTML += "</table>"
}
