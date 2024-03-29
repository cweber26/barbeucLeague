function sendInscriptionMailForPrioritaryPlayers() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForPrioritaryPlayersWithoutControl();
    }
}

function sendInscriptionMailForPlayersWithPrio1() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForAPrioWithoutControl(1, false);
    }
}

function sendInscriptionMailForPlayersWithPrio2() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForAPrioWithoutControl(2, true);
    }
}

function sendInscriptionMailForPlayersWithPrio3() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForAPrioWithoutControl(3, true);
    }
}

function relaunchInscriptionMailForPlayersWithoutAnswer() {
    if (isTheMatchInProgress() && numberAvailableSlotInMatch > 0) {
        relaunchInscriptionMailForPlayersWithoutAnswerWithoutControl();
    }
}

function sendInscriptionMailForPrioritaryPlayersWithoutControl() {
    playersTeamList.forEach(function (playerLine) {
        var player = initPlayer(playerLine);
        if (couldBeAvailableForMatch(player) && player.isPrioritary == true) {
            flagInscriptionToSentForPlayer(player);
            sendInscriptionMailForAPlayer(player, true, false);
        }
    })
}

// noinspection JSUnusedGlobalSymbols
function sendInscriptionMailForPrio2WithoutControl() {
    sendInscriptionMailForAPrioWithoutControl(2, true);
}

function sendInscriptionMailForAPrioWithoutControl(prio, displayAvailableSlot) {
    playersTeamList.forEach(function (playerLine) {
        var player = initPlayer(playerLine);
        if (couldBeAvailableForMatch(player) && player.prioValue == prio && player.isPrioritary == false) {
            flagInscriptionToSentForPlayer(player);
            sendInscriptionMailForAPlayer(player, false, displayAvailableSlot);
        }
    });
}

function relaunchInscriptionMailForPlayersWithoutAnswerWithoutControl() {
    playersNotRespondedPlayerMailList().forEach(function (playerMail) {
        var player = getPlayerWithMail(playerMail);
        sendInscriptionMailForAPlayer(player, false, true);
    });
}


function couldBeAvailableForMatch(player) {
    return player.mail
        && player.answer == ""
        && player.isAvailableDay == true
        && player.isUnavailable == false
        && player.isInscriptionSent == false;
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

    if (!(player.isInscriptionSent || player.isConfirmationSent || mailSentForPlayersWithPrio3 != "")) {
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
