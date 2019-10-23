function cleaning() {
    if ((sheetInscription.getLastRow() - 1) >= 1) {
        sheetInscription.deleteRows(2, sheetInscription.getLastRow() - 1);
    }

    mailSendingPrio1="";
    sheetParameters.getRange(getRowParameter("mailSendingPrio1"), 2).clearContent();
    mailSendingPrio2="";
    sheetParameters.getRange(getRowParameter("mailSendingPrio2"), 2).clearContent();
    mailSendingPrio3="";
    sheetParameters.getRange(getRowParameter("mailSendingPrio3"), 2).clearContent();
    controlDone="";
    sheetParameters.getRange(getRowParameter("controlDone"), 2).clearContent();
    mailSendingReminder="";
    sheetParameters.getRange(getRowParameter("mailSendingReminder"), 2).clearContent();
    creationGoogleEvent="";
    sheetParameters.getRange(getRowParameter("creationGoogleEvent"), 2).clearContent();
    mailSendingConfirmation="";
    sheetParameters.getRange(getRowParameter("mailSendingConfirmation"), 2).clearContent();
    teamSaved="";
    sheetParameters.getRange(getRowParameter("teamSaved"), 2).clearContent();


    isMatchCancel=false;
    sheetParameters.getRange(getRowParameter("isMatchCancel"), 2).setValue(false);
}