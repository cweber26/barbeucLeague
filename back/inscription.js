function sendInscriptionMailForAPrio(prio) {
    if (!isMatchCancel() && parametersMap.get("numberAvailableSlotInMatch") > 0) {
        sendInscriptionMailForAPrioWithoutControl(prio, false);
    }
    switch (prio) {
        case 1:
            updateParameterValue("mailSendingPrio1", now());
            break;
        case 2:
            updateParameterValue("mailSendingPrio2", now());
            break;
        case 3:
            updateParameterValue("mailSendingPrio3", now());
            break;
    }
}

function sendInscriptionForPriorityPlayerWithPrio(prio) {
    if (!isMatchCancel() && parametersMap.get("numberAvailableSlotInMatch") > 0) {
        sendInscriptionMailForAPlayer(prio, true);
    }
}


function sendInscriptionMailForAPrioWithoutControl(prio, withPriority) {
    var playersList = playersTeamList();
    for (var i in playersList) {
        var player = initPlayer(playersList[i]);
        if (shouldReceiveInscriptionMail(player, prio, withPriority)) {
            sendInscriptionMailForAPlayer(player);
        }
    }
}



function sendInscriptionMailForAPlayer(player) {
    var body = includeWithArgs("front/mail/mailInscription", {
        date: matchDayGapInFrench(true),
        nbAvailableSlots: parametersMap.get("numberAvailableSlotInMatch"),
        urlMail: getUrlMail(player),
        stadium: getStadiumInfo(),
        evalToDo: !player.haveDoneAutoEvaluation
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
    }
}


function isValidAnswer(parameter) {
    if (parameter.answer != "Oui" && parameter.answer != "Non") {
        throw "La réponse ne peut être que Oui ou Non";
    }
    return true;
}
