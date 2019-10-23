////////////SHEET////////////
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheetTeam = spreadsheet.getSheetByName("Team");
var sheetInscription = spreadsheet.getSheetByName("Inscription");
var sheetInscriptionFilter = spreadsheet.getSheetByName("InscriptionFilter");
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

var victoryPoint = sheetParameters.getRange(getRowParameter("victoryPoint"), 2).getValue();
var drawPoint = sheetParameters.getRange(getRowParameter("drawPoint"), 2).getValue();
var defeatPoint = sheetParameters.getRange(getRowParameter("defeatPoint"), 2).getValue();
var offensiveBonusPoint = sheetParameters.getRange(getRowParameter("offensiveBonusPoint"), 2).getValue();
var minGoalOffensiveBonus = sheetParameters.getRange(getRowParameter("minGoalOffensiveBonus"), 2).getValue();
var defensiveBonusPoint = sheetParameters.getRange(getRowParameter("defensiveBonusPoint"), 2).getValue();
var maxGoalDefensiveBonus = sheetParameters.getRange(getRowParameter("maxGoalDefensiveBonus"), 2).getValue();
var minMatchForStat = sheetParameters.getRange(getRowParameter("minMatchForStat"), 2).getValue();
var applicationName = sheetParameters.getRange(getRowParameter("applicationName"), 2).getValue();
var numberPlayerMatch = sheetParameters.getRange(getRowParameter("numberPlayerMatch"), 2).getValue();
var minPlayerForAutoCancelation = sheetParameters.getRange(getRowParameter("minPlayerForAutoCancelation"), 2).getValue();
var modeTest = sheetParameters.getRange(getRowParameter("modeTest"), 2).getValue();
var mailTester = sheetParameters.getRange(getRowParameter("mailTester"), 2).getValue();
var mailSendingPrio1WithPriority = sheetParameters.getRange(getRowParameter("mailSendingPrio1WithPriority"), 2).getValue();
var mailSendingPrio1 = sheetParameters.getRange(getRowParameter("mailSendingPrio1"), 2).getValue();
var mailSendingPrio2 = sheetParameters.getRange(getRowParameter("mailSendingPrio2"), 2).getValue();
var mailSendingPrio3 = sheetParameters.getRange(getRowParameter("mailSendingPrio3"), 2).getValue();
var controlDone = sheetParameters.getRange(getRowParameter("controlDone"), 2).getValue();
var mailSendingReminder = sheetParameters.getRange(getRowParameter("mailSendingReminder"), 2).getValue();
var creationGoogleEvent = sheetParameters.getRange(getRowParameter("creationGoogleEvent"), 2).getValue();
var teamSaved = sheetParameters.getRange(getRowParameter("teamSaved"), 2).getValue();
var mailSendingConfirmation = sheetParameters.getRange(getRowParameter("mailSendingConfirmation"), 2).getValue();
var isMatchCancel = sheetParameters.getRange(getRowParameter("isMatchCancel"), 2).getValue();
var numberPlayerInMatch = sheetParameters.getRange(getRowParameter("numberPlayerInMatch"), 2).getValue();
var numberAvailableSlotInMatch = sheetParameters.getRange(getRowParameter("numberAvailableSlotInMatch"), 2).getValue();
var numberPlayerInWaitingList = sheetParameters.getRange(getRowParameter("numberPlayerInWaitingList"), 2).getValue();
var nextMatchDate = sheetParameters.getRange(getRowParameter("nextMatchDate"), 2).getValue();
var adminMailList = sheetParameters.getRange(getRowParameter("adminMailList"), 2).getValue();
var matchPlayerMailList = sheetParameters.getRange(getRowParameter("matchPlayerMailList"), 2).getValue();
var waitingListPlayerMailList = sheetParameters.getRange(getRowParameter("waitingListPlayerMailList"), 2).getValue();
var notAvailablePlayerMailList = sheetParameters.getRange(getRowParameter("notAvailablePlayerMailList"), 2).getValue();
var notRespondedPlayerMailList = sheetParameters.getRange(getRowParameter("notRespondedPlayerMailList"), 2).getValue();
var playerMailList = sheetParameters.getRange(getRowParameter("playerMailList"), 2).getValue();
var lastMonthPlayerMailList = sheetParameters.getRange(getRowParameter("lastMonthPlayerMailList"), 2).getValue();
var stadiumForced = sheetParameters.getRange(getRowParameter("stadiumForced"), 2).getValue();
var nextMatchStadiumName = sheetParameters.getRange(getRowParameter("nextMatchStadiumName"), 2).getValue();
var nextMatchStadiumAddress = sheetParameters.getRange(getRowParameter("nextMatchStadiumAddress"), 2).getValue();
var nextMatchStadiumUrlMaps = sheetParameters.getRange(getRowParameter("nextMatchStadiumUrlMaps"), 2).getValue();
var nextMatchStadiumCost = sheetParameters.getRange(getRowParameter("nextMatchStadiumCost"), 2).getValue();
var nextMatchReservationName = sheetParameters.getRange(getRowParameter("nextMatchReservationName"), 2).getValue();
var nextMatchBeginGameHour = sheetParameters.getRange(getRowParameter("nextMatchBeginGameHour"), 2).getValue();
var nextMatchComment = sheetParameters.getRange(getRowParameter("nextMatchComment"), 2).getValue();
