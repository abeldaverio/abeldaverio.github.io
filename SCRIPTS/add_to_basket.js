
function insert_in_basket(item) {
    let basket = JSON.parse(window.localStorage.getItem("basket"));
    for (let i = 0; i < basket.length; i++) {
        if (item._id == basket[i].product._id) {
            basket[i].quantity += 1;
            window.localStorage.setItem("basket", JSON.stringify(basket));
            return;
        }
    }
    basket.push({
        product: item,
        quantity: 1,
    });
    window.localStorage.setItem("basket", JSON.stringify(basket));
}

function addItemToBasket() {
    if (window.localStorage.getItem("basket") === null) {
        let basket = [];
        window.localStorage.setItem("basket", JSON.stringify(basket));
        addItemToBasket();
    } else {
        let variables = new URLSearchParams(window.location.search);
        axios.get("https://api.kedufront.juniortaker.com/item/" + variables.get("id"))
            .then(response => {
                if (response.data.ok == false) {
                    alert("error 404");
                    return;
                }
                let item = response.data;
                insert_in_basket(response.data.item);
            }, error => {
                console.log(error);
            })
    }
}
