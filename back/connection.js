
function loadPageConnection() {
    return render("front/page/connection", "Barbeuc : Connexion",{
        mail: null,
        key: null,
        fullName: null,
        admin: false,
        testing: isTest()
    });
}
