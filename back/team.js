function loadPageTeam() {
    var tableTeam = "";
    playersTeamList.forEach(function (p) {
        if(p[playerColumn.prioValue] <= 4) {
            tableTeam += "<tr>"
                + "<td id='mail'>" + p[playerColumn.mail] + "</td>"
                + "<td>" + p[playerColumn.firstName] + "</td>"
                + "<td>" + p[playerColumn.lastName] + "</td>"
                + "<td>" + p[playerColumn.nickName] + "</td>"
                + "<td>" + checkbox(p[playerColumn.isUnavailable]) + "</td>"
                + "<td>" + getDateFormat(p[playerColumn.endDateOfUnavailibility]) + "</td>"
                + "<td>" + checkbox(p[playerColumn.mondaySelected]) + "</td>"
                + "<td>" + checkbox(p[playerColumn.tuesdaySelected]) + "</td>"
                + "<td>" + checkbox(p[playerColumn.wednesdaySelected]) + "</td>"
                + "<td>" + checkbox(p[playerColumn.thursdaySelected]) + "</td>"
                + "<td>" + checkbox(p[playerColumn.fridaySelected]) + "</td>"
                + "<td>" + p[playerColumn.site] + "</td>"
                + "<td>" + p[playerColumn.position] + "</td>"
                + "<td>" + p[playerColumn.levelDribble] + "</td>"
                + "<td>" + p[playerColumn.levelFrappe] + "</td>"
                + "<td>" + p[playerColumn.levelDefense] + "</td>";
            if (param.isAdmin) {
                tableTeam += "<td>" + p[playerColumn.prioValue] + "</td>"
                    + "<td>" + checkbox(p[playerColumn.isAdmin]) + "</td>"
                    + "<td>" + checkbox(p[playerColumn.isPrioritary]) + "</td>"
                    + "<td>" + buttonModificationProfil() + "</td>"
                    + "<td>" + buttonInscriptionTeam() + "</td>"
                    + "<td>" + buttonDesinscriptionTeam() + "</td>"
                    + "<td>" + buttonConfirmationTeam() + "</td>";
            }
            tableTeam += "</tr>";
        }
    });

    return render("front/page/team", "Barbeuc : Team", {
        mail: param.mail,
        key: param.key,
        fullName: getFullName(param.mail),
        admin: param.isAdmin,
        testing: isTest(),
        tableTeam: tableTeam
    })

}

function checkbox(value) {
    if (value) {
        return "<input type=checkbox checked=checked /><span></span>";
    } else {
        return "<input type=checkbox /><span></span>";
    }
}

function buttonModificationProfil() {
    return "<a id=redirectProfilPage class=smallButtonGreen onclick=redirectProfilPage(this)>Profil</a>";
}

function buttonInscriptionTeam() {
    return "<a id=inscriptionTeam class=smallButtonGreen onclick=inscriptionTeam(this)>Inscription</a>";
}

function buttonDesinscriptionTeam() {
    return "<a id=desinscriptionTeam class=smallButtonRed onclick=desinscriptionTeam(this)>Désinscription</a>";
}

function buttonConfirmationTeam() {
    return "<a id=confirmationTeam class=smallButtonGreen onclick=confirmationTeam(this)>Confirmation</a>";
}
