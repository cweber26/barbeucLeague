function sendReminderMail() {
    if (mailSendingReminder=="") {
        if(isTheMatchInProgress()){
            sendReminderMailWithoutControl();
        }
        updateParameter("mailSendingReminder", now());
    }
}

function sendReminderMailWithoutControl() {
    var matchMails = playersInTheMatchMail();
    for (var i in matchMails) {
        sendRemindMailForAPlayer(getPlayerWithMail(matchMails[i]), false);
    }

    if (numberPlayerInWaitingList > 0) {
        var waitingListMails = playersInWaitingListMail();
        for (var j in waitingListMails) {
            sendWaitingListMail(getPlayerWithMail(waitingListMails[j]));
        }
    }
}

function sendWaitingListMail(player) {
    var body = includeWithArgs("front/mail/mailWaitingList", {
        date: matchDayGapInFrench(true),
        urlMail: getUrlMail(player)
    });
    sendMail(player.mail, "Liste d'attente pour le match " + matchDayGapInFrench(true), body);
}

function sendRemindMailForAPlayer(player, isNewPlayer) {
    sendMail(player.mail, "Rappel : Match de footsal " + matchDayGapInFrench(false) + " 🤙🤙", getBodyMailReminder(player, isNewPlayer));
}

function getBodyMailReminder(player, isNewPlayer) {
    return includeWithArgs("front/mail/mailReminder", {
        date: matchDayGapInFrench(true),
        nbAvailableSlots: numberAvailableSlotInMatch,
        compo: getCompoPlayersListForMail(),
        isNewPlayer: isNewPlayer,
        urlMail: getUrlMail(player),
        stadium: getStadiumInfo(),
        evalToDo: !player.haveDoneAutoEvaluation
    });
}

function getCompoPlayersListForMail() {
    var players = [];
    if (numberPlayerInMatch > 0) {
        var data = playersInTheMatchForFinalCompo();
        data.forEach(function (p) {
            players.push(p[2]);
        });
    }
    return players;
}