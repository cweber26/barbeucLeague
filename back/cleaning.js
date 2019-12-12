
function cleaning() {
    purgeInscriptionAndConfirmationAnswer();
    purgeMessageForum();
    clearParameter("mailSendingPrio1WithPriority");
    clearParameter("mailSendingPrio2WithPriority");
    clearParameter("mailSendingPrio3WithPriority");
    clearParameter("mailSendingPrio1");
    clearParameter("mailSendingPrio2");
    clearParameter("mailSendingPrio3");
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
