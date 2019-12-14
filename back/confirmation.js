function sendConfirmMail() {
    if (mailSendingConfirmation=="") {
        if(isTheMatchInProgress()){
            sendConfirmMailWithoutControl();
        }
        updateParameter("mailSendingConfirmation", now());
    }
}

function sendConfirmMailWithoutControl() {
    var mails = playersInTheMatchMail();
    for (var i in mails) {
        var player = getPlayerWithMail(mails[i]);
        sendConfirmMailForAPlayer(player, false);
    }
}

function sendConfirmMailForAPlayer(player, isNewPlayer) {
    flagConfirmationToSentForPlayer(player);
    var body = includeWithArgs("front/mail/mailConfirmation", {
        date: matchDayGapInFrench(true),
        nbAvailableSlots: numberAvailableSlotInMatch,
        stadium: getStadiumInfo(),
        urlMail: getUrlMail(player),
        isNewPlayer: isNewPlayer,
        compo: getCompoPlayersListForMail(),
        playersInTheMatchMails: matchPlayerMailList,
        subjectMailContact: encodeURIComponent(applicationName + " Conversation du match du " + nextMatchDateInFrench)
    });
    sendMail(player.mail, "Confirmation de présence au match de Footsal " + matchDayGapInFrench(true) + " ✅", body);
}

function loadPageConfirmation() {
    if (param.answer == "Oui") {
        return render("front/page/confirmation", "confirmation",{mail: param.mail, key: param.key, admin: param.isAdmin});
    }
}



function confirmation(parameter) {
    Logger.log("Confirmation for " + parameter.mail + " and answer " + parameter.answer);

    if (parameter.answer != "Oui") {
        throw "La réponse ne peut être que Oui";
    }
    var player = getPlayerWithMail(parameter.mail);

    if (!player.isInscriptionSent && !player.isConfirmationSent && mailSendingPrio3 == "") {
        throw "Le joueur " + player.fullName + " a voulu confirmer mais n'a pas le droit";
    }

    if(player.answer == "Oui") {
        savePlayerConfirmation(player, parameter.answer, parameter.carSharing);
    } else {
        inscription(parameter);
        confirmation(parameter);
    }
}

function flagConfirmationToSentForPlayer(player) {
    sheetTeam.getRange(player.row, playerColumnRange.isConfirmationSent).setValue(true);
}

function savePlayerConfirmation(player, answer, carSharing) {
    sheetTeam.getRange(player.row, playerColumnRange.answer).setValue(answer);
    sheetTeam.getRange(player.row, playerColumnRange.carSharing).setValue(carSharing);
}