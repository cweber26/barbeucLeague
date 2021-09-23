function sendMatchCompletMail() {
    if (isTheMatchInProgress()) {
        var mails = adminMailList.split(',');
        for (var i in mails) {
            var adminPlayer = getPlayerWithMail(mails[i]);
            sendMatchCompletMailForAPlayer(adminPlayer);
        }
    }
}

function sendMatchCompletMailForAPlayer(player) {
    sendMail(player.mail, "Match du " + nextMatchDateInFrench + " complet 🤙🤙", includeWithArgs("front/mail/mailMatchComplet", {
        date: matchDayGapInFrench(true),
        compo: getCompoPlayersListForMail(),
        urlMail: getUrlMail(player),
        reservationAlreadyDone: isTheReservationAlreadyDone()
    }));
}