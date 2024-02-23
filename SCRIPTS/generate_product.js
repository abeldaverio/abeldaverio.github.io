
function insert_line(info, details, type) {
    let element = document.createElement(type);
    let li = document.createElement("li");
    element.appendChild(document.createTextNode(info));
    li.appendChild(element);
    details.insertBefore(li, document.getElementById("basket_button"));
}

function insert_element(item, image, details) {
    image.src = ("https://api.kedufront.juniortaker.com/item/picture/" + item.image);
    insert_line(item.name, details, "h1");
    insert_line(item.price + "€", details, "p");
    insert_line(item.description, details, "p");
    insert_line("Date de fabrication: " + item.createdIn, details, "p");
}

function get_product() {
    let variables = new URLSearchParams(window.location.search);
    axios.get("https://api.kedufront.juniortaker.com/item/" + variables.get("id"))
        .then(response => {
            const item = response.data;
            if (item.ok == false) {
                alert("error: 404");
                return;
            }
            const image = document.getElementById("image");
            const details = document.getElementById("details");
            document.getElementById("title").textContent = response.data.item.name;
            insert_element(response.data.item, image, details);
        }, error => {
            console.log(error);
        })
}
