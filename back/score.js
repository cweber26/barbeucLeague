function saveTeam() {
    if (teamSaved=="") {
        if(isTheMatchInProgress()){
            var row = sheetResult.getRange("A1:A").getValues().filter(String).length + 2;
            if (sheetResult.getRange(row - 1, 1).getValue().getTime() == nextMatchDate.getTime()) {
                row = row - 1;
            } else {
                sheetResult.getRange(row, 1).setValue(nextMatchDate);
            }
            var players = playersInTheMatchForFinalCompo();
            sheetResult.getRange(row, 2).setValue(players[0][0]);
            sheetResult.getRange(row, 3).setValue(players[1][0]);
            sheetResult.getRange(row, 4).setValue(players[2][0]);
            sheetResult.getRange(row, 5).setValue(players[3][0]);
            sheetResult.getRange(row, 6).setValue(players[4][0]);
            sheetResult.getRange(row, 7).setValue(players[5][0]);
            sheetResult.getRange(row, 8).setValue(players[6][0]);
            sheetResult.getRange(row, 9).setValue(players[7][0]);
            sheetResult.getRange(row, 10).setValue(players[8][0]);
            sheetResult.getRange(row, 11).setValue(players[9][0]);
        }
        updateParameter("teamSaved", now());
    }
}

// noinspection JSUnusedGlobalSymbols
function saveScore(scoreValue) {
    saveRank();
    var matchDates = sheetResult.getRange("A1:A").getValues();
    var lastRowDate = sheetResult.getRange("A1:A").getValues().filter(String).length + 1;
    var date = scoreValue.date;
    for (var i = lastRowDate + 1; i >= 3; i--) {
        if (matchDates[i][0]) {
            var dateFormated = getDateFormat(matchDates[i][0]);
            if (dateFormated == date) {
                sheetResult.getRange(i + 1, 12).setValue(scoreValue.rouge);
                sheetResult.getRange(i + 1, 13).setValue(scoreValue.bleu);
                var playersList = sheetResult.getRange(i + 1, 2, 1, 10).getValues();
                Logger.log("players for stats : " + playersList);
                playersList[0].forEach(function (fullName) {
                    Logger.log(fullName);
                    if(fullName) {
                        statsForAPlayer(fullName);
                    }
                });
                break;
            }
        }
    }
}

function sendScoreMail() {
    if (isTheMatchInProgress()) {
        var mails = adminMailList.split(',');
        for (var i in mails) {
            var player = getPlayerWithMail(mails[i]);
            sendScoreMailForAPlayer(player);
        }
    }
}

function sendScoreMailForAPlayer(player) {
    sendMail(player.mail, "Score pour le match du " + nextMatchDateInFrench, includeWithArgs("front/mail/mailScore", {
        date: matchDayGapInFrench(true),
        compo: getCompoPlayersListForMail(),
        urlMail: getUrlMail(player)
    }));
}