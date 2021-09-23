
function loadPageInvalidUser() {
    return render("front/page/invalid", "invalidUser",{
        mail: param.mail,
        key: param.key
    });
}
