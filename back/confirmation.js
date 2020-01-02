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
    return render("front/page/confirmation", "confirmation",{mail: param.mail, key: param.key, admin: param.isAdmin});
}



function confirmation(parameter) {
    Logger.log("Confirmation for " + parameter.mail + " with car sharing " + parameter.carSharing);

    var player = getPlayerWithMail(parameter.mail);

    if (!player.isInscriptionSent && !player.isConfirmationSent && mailSentForPlayersWithPrio3 == "") {
        throw "Le joueur " + player.fullName + " a voulu confirmer mais n'a pas le droit";
    }
    savePlayerConfirmation(player, parameter.carSharing);
}

function flagConfirmationToSentForPlayer(player) {
    sheetTeam.getRange(player.row, playerColumnRange.isConfirmationSent).setValue(true);
}

function savePlayerConfirmation(player, carSharing) {
    if(player.answer != "Oui") {
        sheetTeam.getRange(player.row, playerColumnRange.answer).setValue("Oui");
        sheetTeam.getRange(player.row, playerColumnRange.answerDate).setValue(now());
    }
    sheetTeam.getRange(player.row, playerColumnRange.carSharing).setValue(carSharing);
}