// noinspection JSUnusedGlobalSymbols
function execBatch() {
    var nextStep = getNextStep();
    Logger.log("nextStep "+ nextStep);
    if(isTimeForStep(nextStep)){
        execStep(nextStep);
    }
    createEventIfMatchIsFull();
}

function getNextStep() {
    if(mailSentForPrioritaryPlayers==""){
        return 1;
    } else if(mailSentForPlayersWithPrio1==""){
        return 2;
    } else if(mailSentForPlayersWithPrio2==""){
        return 3;
    } else if(mailSentForPlayersWithPrio3==""){
        return 4;
    } else if(controlDone==""){
        return 5;
    } else if(mailSendingReminder==""){
        return 6;
    } else if(mailSendingConfirmation==""){
        return 7;
    } else if(teamSaved==""){
        return 8;
    } else {
      return 9;
    }
}

function isTimeForStep(step) {
    var nextMatchDay = nextMatchDate.getDay();
    var column = nextMatchDay + 1;
    var row = step + 5;
    var nextStepDate = sheetSchedule.getRange(row, column).getValue();
    var nextStepDay = nextStepDate.substring(0, 3);
    var nextStepHour = nextStepDate.substring(4, 9);
    var currentDay = Utilities.formatDate(new Date(), "Europe/Paris", "E");
    var currentHour = Utilities.formatDate(new Date(), "Europe/Paris", "HH:mm");
    Logger.log("currentDay " + currentDay + " / nextStepDay " + nextStepDay);
    if(currentDay == nextStepDay) {
        Logger.log("same day for the next step");
        Logger.log("currentHour " + currentHour + " / nextStepHour " + nextStepHour);
        if(currentHour >= nextStepHour) {
            Logger.log("after or equal time (hour) for the next step");
            return true;
        }
    }
    return false;
}

function execStep(step) {
    Logger.log("execStep "+ step);
    switch (step) {
        case 1:
            deleteUnavaibility();
            sendInscriptionMailForPrioritaryPlayers();
            break;
        case 2:
            sendInscriptionMailForPlayersWithPrio1();
            break;
        case 3:
            sendInscriptionMailForPlayersWithPrio2();
            break;
        case 4:
            sendInscriptionMailForPlayersWithPrio3();
            break;
        case 5:
            controlAndCancelOrRelaunch();
            break;
        case 6:
            sendReminderMail();
            break;
        case 7:
            sendConfirmMail();
            break;
        case 8:
            saveTeam();
            break;
        case 9:
            sendScoreMail();
            updatePriority();
            setNextMatchDate();
            cleaning();
            break;
    }
}

// noinspection JSUnusedGlobalSymbols
function resultatDuMois() {
    sendLastMonthResultMail();
}


