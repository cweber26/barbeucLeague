function sendInscriptionMailForAPrio(prio, withPriority, relaunch) {
    if (!isTheMatchCancel() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForAPrioWithoutControl(prio, withPriority, relaunch);
    }
    if(!relaunch) {
        switch (prio) {
            case 1:
                if (withPriority) {
                    mailSendingPrio1WithPriority=now();
                    sheetParameters.getRange(getRowParameter("mailSendingPrio1WithPriority"), 2).setValue(now());
                } else {
                    mailSendingPrio1=now();
                    sheetParameters.getRange(getRowParameter("mailSendingPrio1"), 2).setValue(now());
                }
                break;
            case 2:
                if (!withPriority) {
                    mailSendingPrio2=now();
                    sheetParameters.getRange(getRowParameter("mailSendingPrio2"), 2).setValue(now());
                }
                break;
            case 3:
                if (!withPriority) {
                    mailSendingPrio3=now();
                    sheetParameters.getRange(getRowParameter("mailSendingPrio3"), 2).setValue(now());
                }
                break;
        }
    }
}

function sendInscriptionMailForAPrioWithoutControl(prio, withPriority, relaunch) {
    var playersList = playersTeamList;
    for (var i in playersList) {
        var player = initPlayer(playersList[i]);
        if (shouldReceiveInscriptionMail(player, prio, withPriority, relaunch)) {
            sendInscriptionMailForAPlayer(player, withPriority);
        }
    }
}



function sendInscriptionMailForAPlayer(player, withPriority) {
    var body = includeWithArgs("front/mail/mailInscription", {
        date: matchDayGapInFrench(true),
        nbAvailableSlots: numberAvailableSlotInMatch,
        urlMail: getUrlMail(player),
        stadium: getStadiumInfo(),
        evalToDo: !player.haveDoneAutoEvaluation,
        withPriority: withPriority
    });
    sendMail(player.mail, "Inscription au match de Footsal du " + nextMatchDateInFrench + " ✅", body);
}



function loadPageInscription() {
    if (param.answer == "Oui") {
        return render("front/page/inscription", "inscription", {mail: param.mail, key: param.key, admin: param.isAdmin});
    } else {
        return render("front/page/desinscription", "desinscription",{mail: param.mail, key: param.key, admin: param.isAdmin});
    }
}

function inscription(parameter) {
    Logger.log("Inscription for " + parameter.mail + " and answer " + parameter.answer);
    if (isValidAnswer(parameter)) {
        var playersInTheMatchMailBefore = playersInTheMatchMail();
        if (sheetInscription.getLastRow() > 1) {
            var inscriptions = sheetInscription.getRange(2, 1, sheetInscription.getLastRow(), sheetInscription.getLastColumn()).getValues();
            for (var i in inscriptions) {
                if (inscriptions[i][0] == parameter.mail) {
                    if (inscriptions[i][2] == parameter.answer) {
                        // user already send us the same answer. we do nothing
                        return;
                    } else {
                        // answer different. we delete the row and check if it is a desistement.
                        sheetInscription.deleteRow(Number(i) + 2);
                        checkIfDesistement(parameter, playersInTheMatchMailBefore);
                        break;
                    }
                }
            }
        }
        var row = sheetInscription.getLastRow() + 1;
        sheetInscription.getRange(row, 1).setValue(parameter.mail);
        sheetInscription.getRange(row, 2).setValue(now());
        sheetInscription.getRange(row, 3).setValue(parameter.answer);
        return;
    }
    throw "Pas le droit de s'inscrire maintenant";
}


function isValidAnswer(parameter) {
    if (parameter.answer != "Oui" && parameter.answer != "Non") {
        throw "La réponse ne peut être que Oui ou Non";
    }
    var player = getPlayerWithMail(parameter.mail);
    switch (getNextStep()) {
        case 2:
            return player.isPrioritary && player.prioValue == 1;
        case 3:
            return player.prioValue == 1 || (player.isPrioritary && player.prioValue == 2);
        case 4:
            return player.prioValue <= 2 || (player.isPrioritary && player.prioValue == 3);
        case 5:
            return true;
        case 6:
             return true;
        case 7:
            return true;
        default:
            throw "Trop tard pour répondre";
    }
}
