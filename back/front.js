var Route = {};
Route.path = function (route, callback) {
    Route[route] = callback;
};

var param = {isAdmin: false};

// noinspection JSUnusedGlobalSymbols
function doGet(e) {
    param = e.parameters;

    Route.path("profil", loadPageProfil);
    Route.path("newProfil", loadPageNewProfil);
    Route.path("inscription", loadPageInscription);
    Route.path("confirmation", loadPageConfirmation);
    Route.path("compo", loadPageCompo);
    Route.path("stat", loadPageStat);
    Route.path("record", loadPageRecord);
    Route.path("resultat", loadPageResultat);
    Route.path("team", loadPageTeam);
    Route.path("backoffice", loadPageBackoffice);
    Route.path("connection", loadPageConnection);
    Route.path("error", loadPageError);

    var statusUser = getStatusUser(param);

    if (!(statusUser == "guest")) {
        if (statusUser == "unknow" || statusUser == "keyInvalid") {
            return loadPageInvalidUser();
        } else if (statusUser == "archivated") {
            return loadPageDeletion();
        }
    }

    if (Route[param.page]) {
        return Route[param.page]();
    } else {
        return loadPageUnknowPage();
    }
}