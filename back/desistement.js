function checkIfDesistement(parameter, playersInTheMatchMailBefore) {
    if (parameter.answer == "Non") {
        for (var i in playersInTheMatchMailBefore) {
            if (playersInTheMatchMailBefore[i] == parameter.mail) {
                actionsToDoIfDesistement(parameter.mail);
            }
        }
    }
}

function actionsToDoIfDesistement(desisteurMail) {
    if (isTheMatchInProgress()) {
        var oldPlayer = getPlayerWithMail(desisteurMail);

        if (numberPlayerInMatch == numberPlayerMatch) {
            //the match was full
            if (numberPlayerInWaitingList > 0) {
                //at least a player was in waiting list
                // we get the new player
                var newPlayer = getNewPlayerInCompo();
                reloadParameter();
                if (mailSendingReminder == "") {
                    sendMail(newPlayer.mail, "Tu es sélectionné pour le match " + matchDayGapInFrench(true) + " en raison d'un désitement", getBodyMailReminder(newPlayer, true));
                } else if (mailSendingConfirmation == "") {
                    sendRemindMailForAPlayer(newPlayer, true);
                } else {
                    sendConfirmMailForAPlayer(newPlayer, true);
                }
                sendMailSimple("Remplacement : " + oldPlayer.fullName + " s'est désité pour le match " + matchDayGapInFrench(true),
                    "<h4>" + oldPlayer.fullName + " s'est désité pour le match " + matchDayGapInFrench(true) + "</h4><h4>" + newPlayer.fullName + " est dispo pour le remplacer</h4>");
                updateCalendarEvent(newPlayer.mail, oldPlayer.mail);
            } else {
                reloadParameter();
                sendMailSimple("Alerte : " + oldPlayer.fullName + " s'est désité pour le match " + matchDayGapInFrench(true) + " il manque " + numberAvailableSlotInMatch + " joueur(s) pour le match", "<h4>" + oldPlayer.fullName + " s'est désité pour le match " + matchDayGapInFrench(true) + "</h4><h4>Il manque " + numberAvailableSlotInMatch + " joueur(s)</h4>");
            }
        }
    }
}