function sendMatchCompletMail() {
    if (isTheMatchInProgress()) {
        var mails = adminMailList.split(',');
        for (var i in mails) {
            var player = getPlayerWithMail(mails[i]);
            sendMatchCompletMailForAPlayer(player);
        }
    }
}

function sendMatchCompletMailForAPlayer(player) {
    sendMail(player.mail, "Match du " + nextMatchDateInFrench + " complet 🤙🤙", includeWithArgs("front/mail/mailMatchComplet", {
        date: matchDayGapInFrench(true),
        compo: getCompoPlayersListForMail(),
        urlMail: getUrlMail(player),
        reservationAlreadyDone: reservationAlreadyDone
    }));
}