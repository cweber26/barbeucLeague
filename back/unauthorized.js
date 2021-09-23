
function loadPageUnauthorized() {
    return render("front/page/unauthorized", {mail: param.mail, key: param.key});
}
