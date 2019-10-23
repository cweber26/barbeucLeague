
function loadPageConnection() {
    return render("front/page/connection", "Barbeuc : Connexion",{
        mail: null,
        key: null,
        admin: false,
        testing: modeTest==true
    });
}
