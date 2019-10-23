function loadPageTeam() {
    var tableTeam = "";
    var data = playersTeamList;
    data.forEach(function (p) {
        tableTeam += "<tr>"
            + "<td id='mail'>" + p[0] + "</td>"
            + "<td>" + p[2] + "</td>"
            + "<td>" + p[3] + "</td>"
            + "<td>" + p[6] + "</td>"
            + "<td>" + checkbox(p[7]) + "</td>"
            + "<td>" + getDateFormat(p[8]) + "</td>"
            + "<td>" + checkbox(p[9]) + "</td>"
            + "<td>" + checkbox(p[10]) + "</td>"
            + "<td>" + checkbox(p[11]) + "</td>"
            + "<td>" + checkbox(p[12]) + "</td>"
            + "<td>" + checkbox(p[13]) + "</td>"
            + "<td>" + p[14] + "</td>"
            + "<td>" + p[15] + "</td>"
            + "<td>" + p[16] + "</td>"
            + "<td>" + p[17] + "</td>"
            + "<td>" + p[18] + "</td>"
            + "<td>" + checkbox(p[19]) + "</td>"
            + "<td>" + checkbox(p[20]) + "</td>"
            + "<td>" + p[21] + "</td>"
            + "<td>" + checkbox(p[22]) + "</td>"
            + "<td>" + checkbox(p[23]) + "</td>";
        if (param.isAdmin) {
            tableTeam += "<td>" + buttonModificationProfil() + "</td>"
                + "<td>" + buttonInscriptionTeam() + "</td>"
                + "<td>" + buttonDesinscriptionTeam() + "</td>"
                + "<td>" + buttonConfirmationTeam() + "</td>"
                + "<td>" + buttonRetractationTeam() + "</td>";
        }
        tableTeam += "</tr>";
    });

    return render("front/page/team", "Barbeuc : Team", {
        mail: param.mail,
        key: param.key,
        admin: param.isAdmin,
        testing: modeTest==true,
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

function buttonRetractationTeam() {
    return "<a id=retractationTeam class=smallButtonRed onclick=retractationTeam(this)>Retractation</a>";
}