////////////SHEET////////////
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheetTeam = spreadsheet.getSheetByName("Team");
var sheetInscription = spreadsheet.getSheetByName("Inscription");
var sheetResult = spreadsheet.getSheetByName("Result");
var sheetResultFilter = spreadsheet.getSheetByName("ResultFilter");
var sheetRecordFilter = spreadsheet.getSheetByName("RecordFilter");
var sheetComposition = spreadsheet.getSheetByName("Composition");
var sheetStats = spreadsheet.getSheetByName("Stats");
var sheetParameters = spreadsheet.getSheetByName("Parameters");
var sheetSchedule = spreadsheet.getSheetByName("Schedule");

var playersTeamList = sheetTeam.getRange(3, 1, sheetTeam.getRange("A3:A").getValues().filter(String).length, sheetTeam.getLastColumn()).getValues();

////////////PARAMETERS INIT////////////
var parametersList = sheetParameters.getRange(1,1).getDataRegion().getValues();
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

var victoryPoint = getParameterFromList("victoryPoint");
var drawPoint = getParameterFromList("drawPoint");
var defeatPoint = getParameterFromList("defeatPoint");
var offensiveBonusPoint = getParameterFromList("offensiveBonusPoint");
var minGoalOffensiveBonus = getParameterFromList("minGoalOffensiveBonus");
var defensiveBonusPoint = getParameterFromList("defensiveBonusPoint");
var maxGoalDefensiveBonus = getParameterFromList("maxGoalDefensiveBonus");
var minMatchForStat = getParameterFromList("minMatchForStat");
var applicationName = getParameterFromList("applicationName");
var numberPlayerMatch = getParameterFromList("numberPlayerMatch");
var minPlayerForAutoCancelation = getParameterFromList("minPlayerForAutoCancelation");
var modeTest = getParameterFromList("modeTest");
var mailTester = getParameterFromList("mailTester");
var mailSendingPrio1WithPriority = getParameterFromList("mailSendingPrio1WithPriority");
var mailSendingPrio1 = getParameterFromList("mailSendingPrio1");
var mailSendingPrio2 = getParameterFromList("mailSendingPrio2");
var mailSendingPrio3 = getParameterFromList("mailSendingPrio3");
var controlDone = getParameterFromList("controlDone");
var mailSendingReminder = getParameterFromList("mailSendingReminder");
var creationGoogleEvent = getParameterFromList("creationGoogleEvent");
var teamSaved = getParameterFromList("teamSaved");
var mailSendingConfirmation = getParameterFromList("mailSendingConfirmation");
var isMatchCancel = getParameterFromList("isMatchCancel");
var numberPlayerInMatch = getParameterFromList("numberPlayerInMatch");
var numberAvailableSlotInMatch = getParameterFromList("numberAvailableSlotInMatch");
var numberPlayerInWaitingList = getParameterFromList("numberPlayerInWaitingList");
var nextMatchDate = getParameterFromList("nextMatchDate");
var adminMailList = getParameterFromList("adminMailList");
var matchPlayerMailList = getParameterFromList("matchPlayerMailList");
var waitingListPlayerMailList = getParameterFromList("waitingListPlayerMailList");
var notAvailablePlayerMailList = getParameterFromList("notAvailablePlayerMailList");
var notRespondedPlayerMailList = getParameterFromList("notRespondedPlayerMailList");
var lastMonthPlayerMailList = getParameterFromList("lastMonthPlayerMailList");
var nextMatchStadiumName = getParameterFromList("nextMatchStadiumName");
var nextMatchStadiumAddress = getParameterFromList("nextMatchStadiumAddress");
var nextMatchStadiumUrlMaps = getParameterFromList("nextMatchStadiumUrlMaps");
var nextMatchStadiumCost = getParameterFromList("nextMatchStadiumCost");
var nextMatchReservationName = getParameterFromList("nextMatchReservationName");
var nextMatchBeginGameHour = getParameterFromList("nextMatchBeginGameHour");
var nextMatchComment = getParameterFromList("nextMatchComment");
