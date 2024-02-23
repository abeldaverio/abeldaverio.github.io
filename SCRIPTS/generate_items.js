
function insert_element(item, list) {
    const li = document.createElement("li");
    var a = document.createElement("a");
    a.href = ("HTML-CSS/item.html?id=" + item._id);
    const article = document.createElement("article");
    var name = document.createElement("h2");
    name.appendChild(document.createTextNode(item.name));
    name.classList.add("article_text");
    var price = document.createElement("p");
    price.appendChild(document.createTextNode(item.price + "€"));
    price.classList.add("article_text");
    var image = document.createElement("img");
    image.src = ("https://api.kedufront.juniortaker.com/item/picture/" + (item.image));
    article.appendChild(image, name, price);
    article.appendChild(name);
    article.appendChild(price);
    a.appendChild(article);
    li.appendChild(a);
    list.appendChild(li);
}

function get_elements() {
    axios.get("https://api.kedufront.juniortaker.com/item/")
        .then(response => {
            console.log(response.data);
            const items = response.data;
            const list = document.getElementById("product_list");
            for (let i = 0; i < items.length; i++) {
                insert_element(items[i], list);
            }
        }, error => {
            console.log(error);
        })
}
