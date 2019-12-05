function sendInscriptionMailForAPrio(prio, withPriority, relaunch, displayAvailableSlot) {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForAPrioWithoutControl(prio, withPriority, relaunch, displayAvailableSlot);
    }

    if(prio==1 && withPriority) {
        updateParameter("mailSendingPrio1WithPriority", now());
    }
    if(prio==1 && !withPriority) {
        updateParameter("mailSendingPrio1", now());
    }
    if(prio==2 && withPriority) {
        updateParameter("mailSendingPrio2WithPriority", now());
    }
    if(prio==2 && !withPriority) {
        updateParameter("mailSendingPrio2", now());
    }
    if(prio==3 && withPriority) {
        updateParameter("mailSendingPrio3WithPriority", now());
    }
    if(prio==3 && !withPriority) {
        updateParameter("mailSendingPrio3", now());
    }
}

function sendInscriptionMailForAPrioWithoutControl(prio, withPriority, relaunch, displayAvailableSlot) {
    var playersList = playersTeamList;
    for (var i in playersList) {
        var player = initPlayer(playersList[i]);
        if (shouldReceiveInscriptionMail(player, prio, withPriority, relaunch)) {
            sendInscriptionMailForAPlayer(player, withPriority, displayAvailableSlot);
        }
    }
}



function sendInscriptionMailForAPlayer(player, withPriority, displayAvailableSlot) {
    var body = includeWithArgs("front/mail/mailInscription", {
        date: matchDayGapInFrench(true),
        displayAvailableSlot: displayAvailableSlot,
        nbAvailableSlots: numberAvailableSlotInMatch,
        urlMail: getUrlMail(player),
        stadium: getStadiumInfo(),
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
        case 1:
            throw "Trop tot pour s inscrire";
        case 2:
            return player.isPrioritary && player.prioValue == 1;
        case 3:
            return player.prioValue == 1 || (player.isPrioritary && player.prioValue == 2);
        case 4:
            return player.prioValue <= 2 || (player.isPrioritary && player.prioValue == 3);
        default:
            return true;
    }
}
