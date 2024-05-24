var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var ftotal = document.getElementById("total");
var title = document.getElementById("title");
var count = document.getElementById("count");
var category = document.getElementById("category");
var create = document.getElementById("create");
var search = document.getElementById("search");

// Calculating the total

function result() {
    var priceValue = parseFloat(price.value) || 0;
    var taxesValue = parseFloat(taxes.value) || 0;
    var adsValue = parseFloat(ads.value) || 0;
    var discountValue = parseFloat(discount.value) || 0;

    if (!isNaN(priceValue) && !isNaN(taxesValue) && !isNaN(adsValue) && !isNaN(discountValue)) {
        var total = (priceValue + taxesValue + adsValue) - discountValue;
        ftotal.innerHTML = "Total: " + total.toFixed(2);
        ftotal.style.backgroundColor = '#007e08';
    } else {
        ftotal.innerHTML = "Total:";
        ftotal.style.backgroundColor = '#f53100';
    }
}

// Create a product

var newProduct = JSON.parse(localStorage.getItem('Products')) || [];

function storeDataInLocalStorage() {
    var product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        ftotal: ftotal.innerHTML,
        count: count.value,
        category: category.value
    };

    newProduct.push(product);
    localStorage.setItem('Products', JSON.stringify(newProduct));
}

create.onclick = function () {
    if (fnProductNameValidation()) {
        if (check()) {
            storeDataInLocalStorage();
            clearInputs();
            showData();
        } else {
            alert('Fill all required inputs');
        }
    } else {
        window.alert("Invalid product name");
    }
}

// Clear inputs

function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    ftotal.innerHTML = 'Total:';
    count.value = '';
    category.value = '';
}

// Show data

function showData() {
    var table = '';

    for (let i = 0; i < newProduct.length; i++) {
        table +=
            `<tr>
                <td>${i + 1}</td>
                <td>${newProduct[i].title}</td>
                <td>${newProduct[i].price}</td>
                <td>${newProduct[i].taxes}</td>
                <td>${newProduct[i].ads}</td>
                <td>${newProduct[i].discount}</td>
                <td>${newProduct[i].ftotal}</td>
                <td>${newProduct[i].category}</td>
                <td><button id="update_${i}" class="bttable">Update</button></td>
                <td><button id="delete_${i}" class="bttable" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
    }
    document.getElementById("tbodyt").innerHTML = table;
}

// Check if product has all required values

function check() {
    return title.value && price.value && taxes.value && ads.value && category.value;
}

// Delete a product

function deleteProduct(index) {
    newProduct.splice(index, 1);
    localStorage.setItem('Products', JSON.stringify(newProduct));
    showData();
}

// Search for a product

search.oninput = function () {
    var term = search.value.toLowerCase();
    var filteredProducts = newProduct.filter(product => product.title.toLowerCase().includes(term));
    var table = '';

    for (let i = 0; i < filteredProducts.length; i++) {
        table +=
            `<tr>
                <td>${i + 1}</td>
                <td>${filteredProducts[i].title}</td>
                <td>${filteredProducts[i].price}</td>
                <td>${filteredProducts[i].taxes}</td>
                <td>${filteredProducts[i].ads}</td>
                <td>${filteredProducts[i].discount}</td>
                <td>${filteredProducts[i].ftotal}</td>
                <td>${filteredProducts[i].category}</td>
                <td><button id="update_${i}" class="bttable">Update</button></td>
                <td><button id="delete_${i}" class="bttable" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
    }
    document.getElementById("tbodyt").innerHTML = table;
}

function fnProductNameValidation() {
    var regex = /^[A-Z][a-z]{5,8}$/;
    return regex.test(title.value);
}

function clearEntries() {
    localStorage.removeItem('Products');
    newProduct = [];
    showData();
}

// Initial call to show data on page load
showData();
