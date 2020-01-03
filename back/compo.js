function loadPageCompo() {
    var compoFullName = [];
    var compoNickName = [];
    var confirmations = [];
    var effectif = "";
    if (numberPlayerInMatch > 0) {
        var data = playersInTheMatchForFinalCompo();
        data.forEach(function (p) {
            compoFullName.push(p[1]);
            compoNickName.push(p[2]);
            confirmations.push(p[11]);
            if (p[0] && numberPlayerInMatch == numberPlayerMatch) {
                if(p[10]=='Rouge') {
                    effectif += "<tr style='background-color:#ffcdd2'>";
                } else {
                    effectif += "<tr style='background-color:#bbdefb'>";
                }

                if(param.isAdmin) {
                    effectif += "<td>" + buttonModificationProfilCompo(p[1]) + "</td>";
                } else {
                    effectif += "<td>" + p[1] + "</td>";
                }

                effectif += "<td>" + p[2] + "</td>";

                if(p[8]>0){
                    effectif += "<td>" + Utilities.formatString("%02d",Number(p[8])) + "</td>";
                } else {
                    effectif += "<td>-</td>";
                }
                if(param.isAdmin) {
                    effectif += "<td>" + p[3] + "</td>"
                        + "<td>" + getLevels(p) + "</td>";
                }
                effectif += "<td>" + getSerieLumieres(p[9]) + "</td>"
                    + "<td>" + p[7] + "</td>"
                    + "<td>" + getLogoCar(p) + "</td>";
                if(param.isAdmin) {
                    effectif += "<td>" + buttonConfirmationCompo() + "</td>"
                        + "<td>" + buttonSwitchTeam(p) + "</td>"
                }
                effectif += "</tr>";
            }
        });

    }

    var niveauEquipe = "";
    if (param.isAdmin && effectif != "") {
        niveauEquipe = "<tr><td>Dribble</td><td>" + levelDribbleRed + "</td><td>" + levelDribbleBlue + "</td></tr>"
            + "<tr><td>Frappe</td><td>" + levelShotRed + "</td><td>" + levelShotBlue + "</td></tr>"
            + "<tr><td>Défense</td><td>" + levelDefenceRed + "</td><td>" + levelDefenceBlue + "</td></tr>"
            + "<tr><td>Total</td><td>" + levelRed + "</td><td>" + levelBlue + "</td></tr>"
    }

    var listeAttente = "";
    if (numberPlayerInWaitingList > 0 && isTheMatchInProgress()) {
        listeAttente += "<div class='row s6'><table class='centered striped'><tbody>";
        playersInWaitingListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listeAttente += "<tr>" +
                    "<td>" + buttonModificationProfilCompo(player.fullName) + "</td>" +
                    "<td>" + buttonDesinscriptionCompo() + "</td>" +
                    "</tr>";
            }
        });
        listeAttente += "</tbody></table>";

    }
    var listePasDispo = "";
    if(param.isAdmin && notAvailablePlayerMailList && isTheMatchInProgress()) {
        listePasDispo += "<div class='row s6'><table class='centered striped'><tbody>";
        playersNotAvailablePlayerListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasDispo += "<tr>" +
                    "<td>" + buttonModificationProfilCompo(player.fullName) + "</td>" +
                    "<td>" + buttonInscriptionCompo() + "</td>" +
                    "</tr>";
            }
        });
        listePasDispo += "</tbody></table>";
    }
    var listePasDispoJour = "";
    if(param.isAdmin && notAvailableByDayPlayerMailList && isTheMatchInProgress()) {
        listePasDispoJour += "<div class='row s6'><table class='centered striped'><tbody>";
        playersNotAvailableByDayPlayerMailListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasDispoJour += "<tr>" +
                    "<td>" + buttonModificationProfilCompo(player.fullName) + "</td>" +
                    "<td>" + buttonInscriptionCompo() + "</td>" +
                    "</tr>";
            }
        });
        listePasDispoJour += "</tbody></table>";
    }
    var listePasRepondu = "";
    if(param.isAdmin && notRespondedPlayerMailList && isTheMatchInProgress()) {
        listePasRepondu += "<div class='row s6'><table id='listePasReponduTable' class='centered striped'><tbody>";
        playersNotRespondedPlayerMailList().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasRepondu += "<tr>" +
                    "<td>" + buttonModificationProfilCompo(player.fullName) + "</td>" +
                    "<td>" + buttonInscriptionCompo() + "</td>" +
                    "<td>" + buttonDesinscriptionCompo() + "</td>" +
                    "</tr>";
            }
        });
        listePasRepondu += "</tbody></table>";
    }
    var listePasInvite = "";
    if(param.isAdmin && notInvitedPlayerMailList && isTheMatchInProgress()) {
        listePasInvite += "<div class='row s6'><table id='listePasInviteTable' class='centered striped'><tbody>";
        playersNotInvitedPlayerMailList().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasInvite += "<tr>" +
                    "<td>" + buttonModificationProfilCompo(player.fullName) + "</td>" +
                    "<td>" + buttonInscriptionCompo() + "</td>" +
                    "</tr>";
            }
        });
        listePasInvite += "</tbody></table>";
    }
    var listeBlesse = "";
    if(param.isAdmin && injuredPlayerMailList && isTheMatchInProgress()) {
        listeBlesse += "<div class='row s6'><table id='listeBlesseTable' class='centered striped'><tbody>";
        playersInjuredPlayerMailList().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listeBlesse += "<tr>" +
                    "<td>" + buttonModificationProfilCompo(player.fullName) + "</td>" +
                    "<td>" + buttonInscriptionCompo() + "</td>" +
                    "</tr>";
            }
        });
        listeBlesse += "</tbody></table>";
    }

    var forum = "";
    if(sheetForum.getRange("A2:A").getValues().filter(String).length > 0) {
        forum += "<div class='row s6'><table class='striped'><tbody>";
        sheetForum.getRange(2,1, sheetForum.getRange("A2:A").getValues().filter(String).length, sheetTeam.getLastColumn()).getValues().forEach(function (m) {
                forum += "<tr>" +
                    "<td>" + getDateTimeFormatForForum(m[1]) + "</td>" +
                    "<td>"+ m[0] + "</td>" +
                    "<td>" + m[2] + "</td>" +
                    "</tr>";
            }
        );
        forum += "</tbody></table>";
    }

    var tabTitle = "Barbeuc : Composition";
    return render("front/page/compo", tabTitle, {
        mail: param.mail,
        key: param.key,
        url: url,
        fullName: getFullName(param.mail),
        date: matchDayGapInFrench(true),
        compoFullName: compoFullName,
        compoNickName: compoNickName,
        buttonStatus: getButtonStatus(),
        teamSaved: teamSaved!="",
        confirmations: confirmations,
        effectif: effectif,
        niveauEquipe: niveauEquipe,
        listeAttente: listeAttente,
        listePasDispo: listePasDispo,
        listePasDispoJour: listePasDispoJour,
        listePasRepondu: listePasRepondu,
        listePasInvite: listePasInvite,
        listeBlesse: listeBlesse,
        admin: param.isAdmin,
        cancelMatch: isTheMatchCancel(),
        testing: isTest(),
        stadium: getStadiumInfo(),
        forum: forum,
        refreshAutoMiliSecond: param.refreshAutoMiliSecond
    });
}

function getLogoCar(p) {
    if(p[11]){
        switch (p[12]) {
            case "sharing":
                return "<div class=logoCarSharingBlack></div>";
            case "alone":
                return "<div class=logoCarAloneBlack></div>";
            case "need":
                return "<div class=logoCarNeedBlack></div>";
            default :
                return "<div><i class='material-icons'>help</i></div>";
        }
    }
    return "";
}

function getLevels(p) {
    return Utilities.formatString("%02d", Number(p[4] + p[5] + p[6])) + " : " + p[4] + "/" + p[5] + "/" + p[6];
}


function buttonInscriptionCompo() {
    return "<a class=smallButtonGreen onclick=inscriptionCompo(this)>Inscription</a>";
}

function buttonDesinscriptionCompo() {
    return "<a class=smallButtonRed onclick=desinscriptionCompo(this)>Désinscription</a>";
}

function buttonModificationProfilCompo(fullName) {
    if(param.isAdmin) {
        return "<a class=smallButtonGreen onclick=redirectProfilPageCompo(this)>" + fullName + "</a>";
    } else {
        return fullName;
    }
}


function buttonConfirmationCompo() {
    return "<a class=smallButtonGreen onclick=confirmationCompo(this)><i class='tiny material-icons'>check</i></a>";
}

function buttonSwitchTeam(p) {

    var playersInTheMatch = playersInTheMatchForFinalCompo();
    var joueur1;
    var joueur2;
    var joueur3;
    var joueur4;
    var joueur5;
    var mail1;
    var mail2;
    var mail3;
    var mail4;
    var mail5;
    if (p[10]=='Rouge') {
        mail1 = playersInTheMatch[5][0];
        mail2 = playersInTheMatch[6][0];
        mail3 = playersInTheMatch[7][0];
        mail4 = playersInTheMatch[8][0];
        mail5 = playersInTheMatch[9][0];
        joueur1 = playersInTheMatch[5][1];
        joueur2 = playersInTheMatch[6][1];
        joueur3 = playersInTheMatch[7][1];
        joueur4 = playersInTheMatch[8][1];
        joueur5 = playersInTheMatch[9][1];
    } else {
        mail1 = playersInTheMatch[0][0];
        mail2 = playersInTheMatch[1][0];
        mail3 = playersInTheMatch[2][0];
        mail4 = playersInTheMatch[3][0];
        mail5 = playersInTheMatch[4][0];
        joueur1 = playersInTheMatch[0][1];
        joueur2 = playersInTheMatch[1][1];
        joueur3 = playersInTheMatch[2][1];
        joueur4 = playersInTheMatch[3][1];
        joueur5 = playersInTheMatch[4][1];
    }

    return "<a class='dropdown-trigger smallButtonGreen' data-target=dropDownSwitchFor"+p[0]+"><i class='tiny material-icons'>autorenew</i></a>"
        +"<ul id=dropDownSwitchFor"+p[0]+" class='dropdown-content'>"
        +"<li><a id=joueur1 onclick=swithTeamJs(this)>"+joueur1+"</a><span style='display:none'>"+p[0]+"</span><span style='display:none'>"+mail1+"</span></li>"
        +"<li><a id=joueur2 onclick=swithTeamJs(this)>"+joueur2+"</a><span style='display:none'>"+p[0]+"</span><span style='display:none'>"+mail2+"</span></li>"
        +"<li><a id=joueur3 onclick=swithTeamJs(this)>"+joueur3+"</a><span style='display:none'>"+p[0]+"</span><span style='display:none'>"+mail3+"</span></li>"
        +"<li><a id=joueur4 onclick=swithTeamJs(this)>"+joueur4+"</a><span style='display:none'>"+p[0]+"</span><span style='display:none'>"+mail4+"</span></li>"
        +"<li><a id=joueur5 onclick=swithTeamJs(this)>"+joueur5+"</a><span style='display:none'>"+p[0]+"</span><span style='display:none'>"+mail5+"</span></li>"
        +"</ul>"
}

// noinspection JSUnusedGlobalSymbols
function changePlayerTeamWithMail(playerMail1, playerMail2) {
    Logger.log("playerMail1 " + playerMail1);
    Logger.log("playerMail2 " + playerMail2);
    var playersTeamRange = sheetComposition.getRange(2, 1, numberPlayerMatch, 2);
    var playersTeamValues = playersTeamRange.getValues();
    for (var i in playersTeamValues) {
        if(playersTeamValues[i][0] == playerMail1 || playersTeamValues[i][0] == playerMail2) {
            var newTeam = (playersTeamValues[i][1] == 'B' ? 'R' : 'B');
            var row = Number(i) + 2;
            Logger.log("playerMail "+ playersTeamValues[i][0] + " at row " + row + " was " + playersTeamValues[i][1] + " now is " + newTeam);
            sheetComposition.getRange(row, 2).setValue(newTeam);
        }
    }
}

function playersInTheMatchForFinalCompo() {
    if (numberPlayerInMatch > 0) {
        return sheetComposition.getRange(2, 3, numberPlayerMatch, 14).getValues();
    }
}


function getButtonStatus() {
    var buttonStatus = {
        type: "none",
        status: "none"
    };
    if (param.mail) {
        var player = getPlayerWithMail(param.mail);
        if (player.isConfirmationSent) {
            buttonStatus.type = "confirmation";
            buttonStatus.status = player.carSharing;
        } else if (player.isInscriptionSent) {
            buttonStatus.type = "inscription";
            buttonStatus.status = player.answer;
        } else if (mailSentForPlayersWithPrio3 != "") {
            buttonStatus.type = "inscription";
            buttonStatus.status = player.answer;
        }
    }
    return buttonStatus;
}
