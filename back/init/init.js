////////////SHEET////////////
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheetTeam = spreadsheet.getSheetByName("Team");
var sheetResult = spreadsheet.getSheetByName("Result");
var sheetResultFilter = spreadsheet.getSheetByName("ResultFilter");
var sheetRecordFilter = spreadsheet.getSheetByName("RecordFilter");
var sheetComposition = spreadsheet.getSheetByName("Composition");
var sheetStats = spreadsheet.getSheetByName("Stats");
var sheetParameters = spreadsheet.getSheetByName("Parameters");
var sheetSchedule = spreadsheet.getSheetByName("Schedule");
var sheetForum = spreadsheet.getSheetByName("Forum");
var sheetHoliday = spreadsheet.getSheetByName("Holiday");

var url = ScriptApp.getService().getUrl();

var playersTeamList = sheetTeam.getRange(3, 1, sheetTeam.getRange("A3:A").getValues().filter(String).length, sheetTeam.getLastColumn()).getValues();
////////////PARAMETERS INIT////////////
var parametersList = sheetParameters.getRange(1,1).getDataRegion().getValues();
var victoryPoint = getParameterFromList("victoryPoint");
var drawPoint = getParameterFromList("drawPoint");
var defeatPoint = getParameterFromList("defeatPoint");
var offensiveBonusPoint = getParameterFromList("offensiveBonusPoint");
var minGoalOffensiveBonus = getParameterFromList("minGoalOffensiveBonus");
var defensiveBonusPoint = getParameterFromList("defensiveBonusPoint");
var maxGoalDefensiveBonus = getParameterFromList("maxGoalDefensiveBonus");
var minMatchForStat = getParameterFromList("minMatchForStat");
var participationBonus = getParameterFromList("participationBonus");
var applicationName = getParameterFromList("applicationName");
var numberPlayerMatch = getParameterFromList("numberPlayerMatch");
var minPlayerForAutoCancelation = getParameterFromList("minPlayerForAutoCancelation");
var modeTest = getParameterFromList("modeTest");
var mailTester = getParameterFromList("mailTester");
var mailSentForPrioritaryPlayers = getParameterFromList("mailSentForPrioritaryPlayers");
var mailSentForPlayersWithPrio1 = getParameterFromList("mailSentForPlayersWithPrio1");
var mailSentForPlayersWithPrio2 = getParameterFromList("mailSentForPlayersWithPrio2");
var mailSentForPlayersWithPrio3 = getParameterFromList("mailSentForPlayersWithPrio3");
var controlDone = getParameterFromList("controlDone");
var mailSendingReminder = getParameterFromList("mailSendingReminder");
var creationGoogleEvent = getParameterFromList("creationGoogleEvent");
var teamSaved = getParameterFromList("teamSaved");
var mailSendingConfirmation = getParameterFromList("mailSendingConfirmation");
var sendMonthlyResult = getParameterFromList("sendMonthlyResult");
var isMatchCancel = getParameterFromList("isMatchCancel");
var numberPlayerInMatch = getParameterFromList("numberPlayerInMatch");
var numberAvailableSlotInMatch = getParameterFromList("numberAvailableSlotInMatch");
var numberPlayerInWaitingList = getParameterFromList("numberPlayerInWaitingList");
var nextMatchDate = getParameterFromList("nextMatchDate");
var adminMailList = getParameterFromList("adminMailList");
var playerMailList = getParameterFromList("playerMailList");
var matchPlayerMailList = getParameterFromList("matchPlayerMailList");
var waitingListPlayerMailList = getParameterFromList("waitingListPlayerMailList");
var matchPlayerAndWaitingListPlayerMailList = getParameterFromList("matchPlayerAndWaitingListPlayerMailList");
var notAvailablePlayerMailList = getParameterFromList("notAvailablePlayerMailList");
var notAvailableByDayPlayerMailList = getParameterFromList("notAvailableByDayPlayerMailList");
var notRespondedPlayerMailList = getParameterFromList("notRespondedPlayerMailList");
var notInvitedPlayerMailList = getParameterFromList("notInvitedPlayerMailList");
var injuredPlayerMailList = getParameterFromList("injuredPlayerMailList");
var invitedPlayerMailList = getParameterFromList("invitedPlayerMailList");
var lastMonthPlayerMailList = getParameterFromList("lastMonthPlayerMailList");
var nextMatchStadiumName = getParameterFromList("nextMatchStadiumName");
var nextMatchStadiumAddress = getParameterFromList("nextMatchStadiumAddress");
var nextMatchStadiumUrlMaps = getParameterFromList("nextMatchStadiumUrlMaps");
var nextMatchStadiumCost = getParameterFromList("nextMatchStadiumCost");
var nextMatchReservationName = getParameterFromList("nextMatchReservationName");
var nextMatchBeginGameHour = getParameterFromList("nextMatchBeginGameHour");
var nextMatchComment = getParameterFromList("nextMatchComment");
var reservationAlreadyDone = getParameterFromList("reservationAlreadyDone");
var levelDribbleRed = getParameterFromList("levelDribbleRed");
var levelShotRed = getParameterFromList("levelShotRed");
var levelDefenceRed = getParameterFromList("levelDefenceRed");
var levelRed = getParameterFromList("levelRed");
var levelDribbleBlue = getParameterFromList("levelDribbleBlue");
var levelShotBlue = getParameterFromList("levelShotBlue");
var levelDefenceBlue = getParameterFromList("levelDefenceBlue");
var levelBlue = getParameterFromList("levelBlue");

function getRowParameter(name) {
    if(name) {
        for (var i=0; i <parametersList.length; i++) {
            if(parametersList[i][0]==name) {
                return i+1;
            }
        }
    }
}

function getParameterFromList(name) {
    return parametersList[getRowParameter(name)-1][1];
}

function clearParameter(name) {
    sheetParameters.getRange(getRowParameter(name), 2).clearContent();
}

function updateParameter(name, value) {
    sheetParameters.getRange(getRowParameter(name), 2).setValue(value);
}

function reloadParameter() {
    parametersList = sheetParameters.getRange(1,1).getDataRegion().getValues();
    numberPlayerInMatch = getParameterFromList("numberPlayerInMatch");
    numberAvailableSlotInMatch = getParameterFromList("numberAvailableSlotInMatch");
    numberPlayerInWaitingList = getParameterFromList("numberPlayerInWaitingList");
    matchPlayerMailList = getParameterFromList("matchPlayerMailList");
    waitingListPlayerMailList = getParameterFromList("waitingListPlayerMailList");
    notAvailablePlayerMailList = getParameterFromList("notAvailablePlayerMailList");
    notRespondedPlayerMailList = getParameterFromList("notRespondedPlayerMailList");
}

function reloadPlayersTeamList() {
    playersTeamList = sheetTeam.getRange(3, 1, sheetTeam.getRange("A3:A").getValues().filter(String).length, sheetTeam.getLastColumn()).getValues();
}

// noinspection JSUnusedGlobalSymbols
function getUrl() {
    Logger.log("url : " + url);
    return url;
}
