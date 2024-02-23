
function get_cart(basket) {
    let array = [];
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].quantity != 0) {
            array.push({
                "id": basket[i].product._id,
                "amount": basket[i].quantity,
            });
        }
    }
    return array;
}

function is_basket_empty(basket) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].quantity != 0) {
            return false;
        }
    }
    return true;
}

function is_email_valid(email) {
    let i;
    for (i = 0; i < email.length; i++) {
        if (email[i] == '@') {
            break;
        }
        if (i == email.length - 1) {
            return false;
        }
    }
    for (i += 2; i < email.length - 2; i++) {
        if (email[i] == '.')
            return true;
    }
    return false;
}

function send_command() {
    let email = document.getElementById("email").value;
    let first_name = document.getElementById("first_name").value;
    let name = document.getElementById("name").value;
    let adress = document.getElementById("adress").value;
    let zip_code = document.getElementById("zip_code").value;

    if (email.length == 0 || first_name.length == 0 ||
        name.length == 0 || adress.length < 5 ||
        zip_code.length == 0 || !is_email_valid(email) || isNaN(zip_code)) {
        alert("Erreur: veuiller rentrer des informations valide");
    } else {
        let basket = JSON.parse(window.localStorage.getItem("basket"));
        if (basket == null || is_basket_empty(basket)) {
            alert("Le panier est vide, faite des achats pour valider votre commande");
        }
        let infos = {
            "email": email,
            "name": (first_name + " " + name),
            "address": (adress + " " + zip_code),
            "cart": get_cart(basket),
        }
        axios.post("https://api.kedufront.juniortaker.com/order/", infos)
            .then(response => {
                if (response.data.ok == true) {
                    alert("Commande validée,\n ID: " + response.data.command_id)
                } else {
                    console.log(response)
                    alert("Erreur, veuiller réessayer");
                }
            }, error => {
                console.log(error);
            });
    }
}
