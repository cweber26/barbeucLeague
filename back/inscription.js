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
    Logger.log("sendInscriptionMailForAPrioWithoutControl for prio : " + prio + " / withPriority : " + withPriority + " / relaunch : " + relaunch + " / displayAvailableSlot : " + displayAvailableSlot);
    var playersList = playersTeamList;
    for (var i in playersList) {
        var player = initPlayer(playersList[i]);
        if (shouldReceiveInscriptionMail(player, prio, withPriority, relaunch)) {
            flagInscriptionToSentForPlayer(player);
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
