function loadPageCompo() {
    var players = [];
    var confirmations = [];
    var effectif = "";
    if (numberPlayerInMatch > 0) {
        var data = playersInTheMatchForFinalCompo();
        data.forEach(function (p) {
            players.push(p[1]);
            confirmations.push(p[10]);
            if (p[0] && numberPlayerInMatch == numberPlayerMatch) {
                if(p[9]=='Rouge') {
                    effectif += "<tr style='background-color:#ffcdd2'>";
                } else {
                    effectif += "<tr style='background-color:#bbdefb'>";
                }

                if(param.isAdmin) {
                    effectif += "<td>" + buttonModificationProfilCompo(p[0]) + "</td>";
                } else {
                    effectif += "<td>" + p[0] + "</td>";
                }

                effectif += "<td>" + p[1] + "</td>";

                if(p[7]>0){
                    effectif += "<td>" + Utilities.formatString("%02d",Number(p[7])) + "</td>";
                } else {
                    effectif += "<td>-</td>";
                }
                if(param.isAdmin) {
                    effectif += "<td>" + p[2] + "</td>"
                        + "<td>" + Utilities.formatString("%02d",Number(p[3]+p[4]+p[5])) + " : " + p[3] + "/" + p[4]+ "/" + p[5] + "</td>";
                }
                effectif += "<td>" + getSerieLumieres(p[8]) + "</td>"
                    + "<td>" + p[6] + "</td>"
                    + "<td>" + getLogoCar(p[11]) + "</td>";
                if(param.isAdmin) {
                    effectif += "<td>" + buttonConfirmationCompo() + "</td>"
                }
                effectif += "</tr>";
            }
        });

    }

    var niveauEquipe = "";
    if (param.isAdmin && effectif != "") {
        niveauEquipe = "<tr><td>Dribble</td><td>" + levelDribbleRed + "</td><td>" + levelDribbleBlue + "</td></tr>"
            + "<tr><td>Frappe</td><td>" + levelShotRed + "</td><td>" + levelShotBlue + "</td></tr>"
            + "<tr><td>Défence</td><td>" + levelDefenceRed + "</td><td>" + levelDefenceBlue + "</td></tr>"
            + "<tr><td>Total</td><td>" + levelRed + "</td><td>" + levelBlue + "</td></tr>"
    }

    var listeAttente = "";
    if (numberPlayerInWaitingList > 0 && isTheMatchInProgress()) {
        playersInWaitingListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listeAttente += player.fullName + "<br>";
            }
        });

    }
    var listePasDispo = "";
    if(param.isAdmin && notAvailablePlayerMailList && isTheMatchInProgress()) {
        playersNotAvailablePlayerListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasDispo += player.fullName + "<br>";
            }
        });
    }
    var listePasRepondu = "";
    if(param.isAdmin && notRespondedPlayerMailList && isTheMatchInProgress()) {
        listePasRepondu += "<div class='row s6'><table class='centered striped'><tbody>";
        playersNotRespondedPlayerMailList().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasRepondu += "<tr>" +
                    "<td>"+ player.fullName + "</td>" +
                    "<td>" + buttonModificationProfilCompo() + "</td>" +
                    "<td>" + buttonInscriptionCompo() + "</td>" +
                    "<td>" + buttonDesinscriptionCompo() + "</td>" +
                    "</tr>";
            }
        });
        listePasRepondu += "</tbody></table>";
    }
    var listeBlesse = "";
    if(param.isAdmin && injuredPlayerMailList && isTheMatchInProgress()) {
        playersInjuredPlayerMailList().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listeBlesse += player.fullName + "<br>";
            }
        });
    }
    var tabTitle = "Barbeuc : Composition";
    return render("front/page/compo", tabTitle, {
        mail: param.mail,
        key: param.key,
        fullName: getFullName(param.mail),
        date: matchDayGapInFrench(true),
        compo: players,
        inscriptionPhase: mailSendingPrio1!="",
        confirmationPhase: mailSendingConfirmation!="",
        teamSaved: teamSaved!="",
        confirmations: confirmations,
        effectif: effectif,
        niveauEquipe: niveauEquipe,
        listeAttente: listeAttente,
        listePasDispo: listePasDispo,
        listePasRepondu: listePasRepondu,
        listeBlesse: listeBlesse,
        admin: param.isAdmin,
        cancelMatch: isTheMatchCancel(),
        testing: isTest(),
        stadium: getStadiumInfo()
    });
}


function playersInTheMatchForFinalCompo() {
    if (numberPlayerInMatch > 0) {
        return sheetComposition.getRange(13, 2, numberPlayerMatch, 13).getValues();
    }
}

function getLogoCar(type) {
    switch (type) {
        case "sharing":
            return "<div class=logoCarSharingBlack></div>";
        case "alone":
            return "<div class=logoCarAloneBlack></div>";
        case "need":
            return "<div class=logoCarNeedBlack></div>";
        default :
            return "";
    }
}


function buttonInscriptionCompo() {
    return "<a id=inscriptionCompo class=smallButtonGreen onclick=inscriptionCompo(this)>Inscription</a>";
}

function buttonDesinscriptionCompo() {
    return "<a id=desinscriptionCompo class=smallButtonRed onclick=desinscriptionCompo(this)>Désinscription</a>";
}

function buttonModificationProfilCompo(name) {
    if(name) {
        return "<a id=redirectProfilPageCompo class=smallButtonGreen onclick=redirectProfilPageCompo(this)>" + name + "</a>";
    } else {
        return "<a id=redirectProfilPageCompo class=smallButtonGreen onclick=redirectProfilPageCompo(this)>Profil</a>";
    }
}

function buttonConfirmationCompo() {
    return "<a id=confirmationCompo class=smallButtonGreen onclick=confirmationCompo(this)><i class='tiny material-icons'>check</i></a>";
}
