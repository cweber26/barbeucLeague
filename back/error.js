function loadPageError() {
    return render("front/page/error", "error", {
        mail: param.mail,
        key: param.key,
        admin: param.isAdmin
    });
}