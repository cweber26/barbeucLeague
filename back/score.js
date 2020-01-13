function saveTeam() {
    if (isTheMatchInProgress()) {
        var row = sheetResult.getRange("A1:A").getValues().filter(String).length + 2;
        var lastSavedDate = sheetResult.getRange(row - 1, 1).getValue();
        var nextMatchDateBegin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:30:00");
        if (lastSavedDate && lastSavedDate.getTime() == nextMatchDateBegin.getTime()) {
            row = row - 1;
        } else {
            sheetResult.getRange(row, 1).setValue(nextMatchDateBegin);
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
}

// noinspection JSUnusedGlobalSymbols
function saveScore(scoreValue) {
    saveRank();
    var matchDates = sheetResult.getRange("A1:A").getValues();
    var lastRowDate = sheetResult.getRange("A1:A").getValues().filter(String).length + 1;
    var date = scoreValue.date;
    for (var i = lastRowDate + 1; i >= 3; i--) {
        if (matchDates[i][0]) {
            var dateFormated = getDateTimeFormatWithoutSecond(matchDates[i][0]);
            if (dateFormated == date) {
                sheetResult.getRange(i + 1, 12).setValue(scoreValue.rouge);
                sheetResult.getRange(i + 1, 13).setValue(scoreValue.bleu);
                var playersList = sheetResult.getRange(i + 1, 2, 1, 10).getValues();
                Logger.log("players for stats : " + playersList);
                playersList[0].forEach(function (mail) {
                    Logger.log(mail);
                    if(mail) {
                        statsForAPlayer(mail);
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