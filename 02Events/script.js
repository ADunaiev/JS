function div1click (e) {
    console.log (e);
    e.target.style["background-color"] = 'lime';
    var productName = e.target.getAttribute('data-product');

    if (productName == null) {
        // якщо подія (клік) відбувається на внутрішньому елементі, то у 
        // якості e.target приходить не product, а його підлеглий.
        productName = e.target.parentNode.getAttribute('data-product');
    }
    const div1 = e.target.closest(`[data-product]`);
    var productName = div1.getAttribute('data-product');
    console.log(productName);   
}

function inputFocused() {
    console.log("inputFocused");
}
function inputBlured(){
    console.log("inputBlured");
}
function inputChanged() {
    console.log("inputChanged");
}

function input2keydown(e) {
    console.log(e)
}
function input2keypress(e) {
    console.log(e)
}