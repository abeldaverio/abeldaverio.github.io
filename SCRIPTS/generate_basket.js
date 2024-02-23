
function init_texts(article) {
    let texts = document.createElement("ul");
    let name = document.createElement("h2");
    let price = document.createElement("p");
    let name_text = document.createTextNode(article.product.name);
    let price_text = document.createTextNode(article.product.price + "€");
    name.appendChild(name_text);
    price.appendChild(price_text);
    texts.appendChild(document.createElement("li").appendChild(name));
    texts.appendChild(document.createElement("li").appendChild(price));
    return texts;
}

function init_quantity(article) {
    let container = document.createElement("div");
    container.classList.add("quantities");
    let minus = document.createElement("button");
    minus.onclick = function() { remove_article(article.product._id); };
    let plus = document.createElement("button");
    plus.onclick = function() { add_article(article.product._id); };
    let quantity = document.createElement("p");
    minus.appendChild(document.createTextNode("-"));
    plus.appendChild(document.createTextNode("+"));
    quantity.appendChild(document.createTextNode(article.quantity));
    container.appendChild(minus);
    container.appendChild(quantity);
    container.appendChild(plus);
    return container;
}

function insert_article(article) {
    let list = document.getElementById("articles");
    let box = document.createElement("li");
    let _article = document.createElement("article");
    _article.id = article.product._id;
    let img = document.createElement("img");
    img.src = ("https://api.kedufront.juniortaker.com/item/picture/" + article.product.image);
    let texts = init_texts(article);
    let quantity_counter = init_quantity(article);
    let total = document.createElement("p");
    total.appendChild(document.createTextNode("Total: " + (article.quantity * article.product.price) + "€"));
    _article.appendChild(img);
    _article.appendChild(texts);
    _article.appendChild(quantity_counter);
    _article.appendChild(total);
    box.appendChild(_article);
    list.appendChild(box);
}

function generate_empty_basket() {
    let list = document.getElementById("articles");
    let li = document.createElement("li");
    li.classList.add("empty");
    li.textContent = "Aucun article dans le panier...";
    list.appendChild(li);
}

function insert_buy_link(total) {
    let variables = new URLSearchParams(window.location.search);
    let main = document.getElementById("main");
    let link = document.createElement("a");
    link.href = (document.URL.slice(0, document.URL.length - "basket.html".length) + "command.html");
    link.textContent = "Valider La Commande: " + total + "€";
    link.id = "buy_link";
    main.appendChild(link);
}

function generate_basket() {
    if (window.localStorage.getItem("basket") == null) {
        generate_empty_basket();
        return;
    }
    const basket = JSON.parse(window.localStorage.getItem("basket"));
    let count = 0;
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].quantity != 0) {
            insert_article(basket[i]);
            count += 1;
            total += basket[i].product.price * basket[i].quantity;
        }
    }
    if (count < 1) {
        generate_empty_basket();
    } else {
        insert_buy_link(total);
    }
}

function update_buy_link(basket) {
    let link = document.getElementById("buy_link");
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
        total += basket[i].quantity * basket[i].product.price;
    }
    link.textContent = "Valider La Commande: " + total + "€";
}

function remove_article(id) {
    let childs = document.getElementById(id).childNodes;
    let basket = JSON.parse(window.localStorage.getItem("basket"));
    for (let i = 0; i < basket.length; i++) {
        if (id == basket[i].product._id && basket[i].quantity != 0) {
            basket[i].quantity -= 1;
            if (basket[i].quantity == 0);
            childs[3].textContent = "Total: " + (basket[i].product.price * basket[i].quantity) + "€";
            childs[2].childNodes[1].textContent = basket[i].quantity;
        }
    }
    update_buy_link(basket);
    window.localStorage.setItem("basket", JSON.stringify(basket));
}

function add_article(id) {
    let childs = document.getElementById(id).childNodes;
    let basket = JSON.parse(window.localStorage.getItem("basket"));
    for (let i = 0; i < basket.length; i++) {
        if (id == basket[i].product._id) {
            basket[i].quantity += 1;
            childs[3].textContent = "Total: " + (basket[i].product.price * basket[i].quantity) + "€";
            childs[2].childNodes[1].textContent = basket[i].quantity;
        }
    }
    update_buy_link(basket);
    window.localStorage.setItem("basket", JSON.stringify(basket));
}
