function cancelMatchAndSendMail(isAutoCancel) {
    var playerMails = playersInTheMatchMail();
    for (var i in playerMails) {
        var player = getPlayerWithMail(playerMails[i]);
        sendCancelMatchMailForAPlayer(player, isAutoCancel);
    }
    deleteCalendarEvent();
    updateParameter("isMatchCancel", true);
}


function isTheReservationAlreadyDone() {
    return reservationAlreadyDone == true;
}

function sendCancelMatchMailForAPlayer(player, isAutoCancel) {
    var body = includeWithArgs("front/mail/mailCancelMatch", {
        date: matchDayGapInFrench(true),
        player: player,
        nbLimitPlayers: minPlayerForAutoCancelation,
        isAutoCancel: isAutoCancel,
        urlMail: getUrlMail(player),
        reservationAlreadyDone: isTheReservationAlreadyDone()
    });
    sendMail(player.mail, "⛔ Annulation du match de Footsal " + matchDayGapInFrench(true) + " ⛔😢", body);
}

function isTheMatchCancel() {
    return isMatchCancel==true;
}

function isTheMatchInProgress() {
    return isMatchCancel==false;
}