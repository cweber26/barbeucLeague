function sendInscriptionMailForPrioritaryPlayers() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForPrioritaryPlayersWithoutControl();
        updateParameter("mailSentForPrioritaryPlayers", now());
    }
}

function sendInscriptionMailForPlayersWithPrio1() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForAPrioWithoutControl(1, false);
        updateParameter("mailSentForPlayersWithPrio1", now());
    }
}

function sendInscriptionMailForPlayersWithPrio2() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForAPrioWithoutControl(2, true);
        updateParameter("mailSentForPlayersWithPrio2", now());
    }
}

function sendInscriptionMailForPlayersWithPrio3() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForAPrioWithoutControl(3, true);
        updateParameter("mailSentForPlayersWithPrio3", now());
    }
}

function relaunchInscriptionMailForPlayersWithoutAnswer() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        relaunchInscriptionMailForPlayersWithoutAnswerWithoutControl(3, true);
    }
}

function sendInscriptionMailForPrioritaryPlayersWithoutControl() {
    playersTeamList.forEach(function (player) {
        if (couldBeAvailableForMatch(player) && player[playerColumn.isPrioritary] == true) {
            flagInscriptionToSentForPlayer(player);
            sendInscriptionMailForAPlayer(player, true, false);
        }
    })
}

function sendInscriptionMailForAPrioWithoutControl(prio, displayAvailableSlot) {
    playersTeamList.forEach(function (player) {
        if (couldBeAvailableForMatch(player) && player[playerColumn.prioValue] == prio) {
            flagInscriptionToSentForPlayer(player);
            sendInscriptionMailForAPlayer(player, false, displayAvailableSlot);
        }
    });
}

function relaunchInscriptionMailForPlayersWithoutAnswerWithoutControl() {
    playersTeamList.forEach(function (player) {
        if (couldBeAvailableForMatch(player) && player[playerColumn.prioValue] <= 3) {
            flagInscriptionToSentForPlayer(player);
            sendInscriptionMailForAPlayer(player, false, true);
        }
    });
}


function couldBeAvailableForMatch(player) {
    return player[playerColumn.mail]
        && player[playerColumn.answer] == ""
        && player[playerColumn.isAvailableDay] == true
        && player[playerColumn.isUnavailable] == false;
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

    if (parameter.answer != "Oui" && parameter.answer != "Non") {
        throw "La réponse ne peut être que Oui ou Non";
    }
    var player = getPlayerWithMail(parameter.mail);

    if (!(player.isInscriptionSent || player.isConfirmationSent || mailSendingPrio3 != "")) {
        throw "Le joueur " + player.fullName + " a voulu s inscrire mais n'a pas le droit";
    }

    var playersInTheMatchMailBefore = playersInTheMatchMail();

    sheetTeam.getRange(player.row, playerColumnRange.answer).setValue(parameter.answer);
    if (player.answer == "" || player.answer != parameter.answer) {
        sheetTeam.getRange(player.row, playerColumnRange.answerDate).setValue(now());
    }
    if (parameter.answer == "Non") {
        sheetTeam.getRange(player.row, playerColumnRange.carSharing).clearContent();
        if(player.answer == "Oui") {
            checkIfDesistement(parameter, playersInTheMatchMailBefore);
        }
    }
}

function flagInscriptionToSentForPlayer(player) {
    sheetTeam.getRange(player.row, playerColumnRange.isInscriptionSent).setValue(true);
}
