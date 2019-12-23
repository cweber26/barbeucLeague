function playerNameInSheetResultFilter() {
    return sheetResultFilter.getRange(1, 1, sheetResultFilter.getRange("A1:A").getValues().filter(String).length, 1).getValues();
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
    var resultFilterColumn = 16;
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
            return i+1;
        }
    }
}

var statsColumnRange = {
    rank: 0,
    mail: 1,
    nickName: 2,
    match: 3,
    victory: 4,
    draw: 5,
    defeat: 6,
    offensiveBonus: 7,
    defensiveBonus: 8,
    points: 9,
    pointsPerMatch: 10,
    victoryPercent: 11,
    defeatPercent: 12,
    rankThisWeek: 13,
    rankLastWeek: 14,
    rankEvolution: 15,
    maxVictoryInRaw: 16,
    maxDefeatInRaw: 17,
    currentVictoryInRaw: 18,
    currentDefeatInRaw: 19,
    result1: 20,
    result2: 21,
    result3: 22,
    result4: 23,
    result5: 24
};

function loadPageStat() {
    var stats = "";
    var data = sheetStats.getRange(2, 1, sheetStats.getLastRow(), sheetStats.getLastColumn()).getValues();
    data.forEach(function (p) {
        if(p[statsColumnRange.mail]){
            stats += "<tr>";
            if (p[statsColumnRange.rankEvolution]) {
                stats += "<td>" + p[statsColumnRange.rank] + "<sup> (" + p[statsColumnRange.rankEvolution] + ")</sup></td>";
            } else {
                stats += "<td>" + p[statsColumnRange.rank] + "</td>";
            }
            stats += "<td class='tooltipped' data-position='bottom' data-tooltip='" + getPlayerWithMail(p[statsColumnRange.mail]).fullName + "'>" + p[statsColumnRange.nickName] + "</td>"
                + "<td>" + p[statsColumnRange.match] + "</td>"
                + "<td>" + p[statsColumnRange.victory] + "</td>"
                + "<td>" + p[statsColumnRange.draw] + "</td>"
                + "<td>" + p[statsColumnRange.defeat] + "</td>"
                + "<td>" + p[statsColumnRange.offensiveBonus] + "</td>"
                + "<td>" + p[statsColumnRange.defensiveBonus] + "</td>"
                + "<td>" + p[statsColumnRange.points] + "</td>"
                + "<td>" + p[statsColumnRange.pointsPerMatch] + "</td>"
                + "<td>" + p[statsColumnRange.maxVictoryInRaw] + "</td>"
                + "<td>" + p[statsColumnRange.maxDefeatInRaw] + "</td>"
                + "<td>" + getLumieres(p) + "</td>"
                + "</tr>";
        }
    });
    return render("front/page/stat", "Barbeuc : Stats", {
        mail: param.mail,
        key: param.key,
        fullName: getFullName(param.mail),
        table: stats,
        admin: param.isAdmin,
        testing: isTest()
    });
}

function saveRank() {
    var currentRank = sheetResultFilter.getRange(1, 13, sheetResultFilter.getRange("A1:A").getValues().filter(String).length, 1).getValues();
    sheetResultFilter.getRange(1, 14, sheetResultFilter.getRange("A1:A").getValues().filter(String).length, 1).setValues(currentRank);
}