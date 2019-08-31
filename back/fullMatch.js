function sendMatchCompletMail() {
    if (!isMatchCancel()) {
        var mails = parametersMap.get("adminMailList").split(',');
        for (var i in mails) {
            var player = getPlayerWithMail(mails[i]);
            sendMatchCompletMailForAPlayer(player);
        }
    }
}

function sendMatchCompletMailForAPlayer(player) {
    sendMail(player.mail, "Match du " + parametersMap.get("nextMatchDateFrench") + " complet 🤙🤙", includeWithArgs("front/mail/mailMatchComplet", {
        date: matchDayGapInFrench(true),
        compo: getCompoPlayersListForMail(),
        urlMail: getUrlMail(player)
    }));
}