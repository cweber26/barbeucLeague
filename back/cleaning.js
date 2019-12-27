
function cleaning() {
    purgeInscriptionAndConfirmationAnswer();
    purgeMessageForum();
    clearParameter("mailSentForPrioritaryPlayers");
    clearParameter("mailSentForPlayersWithPrio1");
    clearParameter("mailSentForPlayersWithPrio2");
    clearParameter("mailSentForPlayersWithPrio3");
    clearParameter("controlDone");
    clearParameter("mailSendingReminder");
    clearParameter("creationGoogleEvent");
    clearParameter("mailSendingConfirmation");
    clearParameter("teamSaved");
    updateParameter("isMatchCancel", false);
}

function purgeInscriptionAndConfirmationAnswer() {
    sheetTeam.getRange(3, playerColumnRange.isInscriptionSent, sheetTeam.getRange("A3:A").getValues().filter(String).length, 5).clearContent();
}

function purgeMessageForum() {
    if ((sheetForum.getLastRow() - 1) >= 1) {
        sheetForum.deleteRows(2, sheetForum.getLastRow() - 1);
    }
}
