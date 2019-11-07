function cleaning() {
    if ((sheetInscription.getLastRow() - 1) >= 1) {
        sheetInscription.deleteRows(2, sheetInscription.getLastRow() - 1);
    }

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