function playerNameInSheetResultFilter() {
    return sheetResultFilter.getRange(4, 1, sheetResultFilter.getRange("A4:A").getValues().filter(String).length, 1).getValues();
}

// noinspection JSUnusedGlobalSymbols
function initStats() {
    stats(playerNameInSheetResultFilter());
}

function stats(players) {
    for (var i in players) {
        if (players[i][0]) {
            statsForAPlayer(players[i][0]);
        }
    }
}

function statsForAPlayer(playerName) {
    var resultFilterColumn = 13;
    var row = getRowSheetResultFilter(playerName);
    var serie = sheetResultFilter.getRange(row, resultFilterColumn + 4, 1, sheetResultFilter.getLastColumn()).getValues()[0].filter(String);
    var maxWin = 0;
    var maxLose = 0;
    var winInProgress = 0;
    var loseInProgress = 0;
    var current = '';
    var previous = '';
    var inProgressDone = false;
    if (serie.length > 0) {
        var win = 0;
        var lose = 0;
        for (var i in serie) {
            current = serie[i];

            if (!inProgressDone && (previous == '' || current == previous) && current != 'N') {
                if (current == 'V') {
                    winInProgress += 1
                } else if (current == 'D') {
                    loseInProgress += 1
                }
            } else {
                inProgressDone = true;
            }
            if (current != previous) {
                win = 0;
                lose = 0;
            }
            if (current == 'V') {
                win += 1;
            }
            if (current == 'D') {
                lose += 1;
            }
            if (win > maxWin) {
                maxWin = win;
            }
            if (lose > maxLose) {
                maxLose = lose;
            }
            previous = current;
        }
    }
    sheetResultFilter.getRange(row, resultFilterColumn).setValue(maxWin);
    sheetResultFilter.getRange(row, (resultFilterColumn + 1)).setValue(maxLose);
    sheetResultFilter.getRange(row, (resultFilterColumn + 2)).setValue(winInProgress);
    sheetResultFilter.getRange(row, (resultFilterColumn + 3)).setValue(loseInProgress);
}


function getRowSheetResultFilter(playerName) {
    var playerNames = playerNameInSheetResultFilter();
    for (var i = 0; i < playerNames.length; i++) {
        if (playerNames[i][0] == playerName) {
            return i + 4;
        }
    }
}

function loadPageStat() {
    var stats = "";
    var data = sheetStats.getRange(2, 1, sheetStats.getLastRow() - 1, sheetStats.getLastColumn()).getValues();
    data.forEach(function (p) {
        stats += "<tr>"
            + "<td>" + p[0] + "</td>"
            + "<td>" + p[1] + "</td>"
            + "<td>" + p[2] + "</td>"
            + "<td>" + p[3] + "</td>"
            + "<td>" + p[4] + "</td>"
            + "<td>" + p[5] + "</td>"
            + "<td>" + p[6] + "</td>"
            + "<td>" + p[7] + "</td>"
            + "<td>" + p[8] + "</td>"
            + "<td>" + p[9] + "</td>"
            + "<td>" + p[12] + "</td>"
            + "<td>" + p[13] + "</td>"
            + "<td>" + getLumieres(p) + "</td>"
            + "</tr>";
    });
    return render("front/html/stat", "Barbeuc : Stats", {mail: param.mail, key: param.key, table: stats, admin: param.isAdmin});
}