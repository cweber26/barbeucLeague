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
    var row = getRowSheetResultFilter(playerName);
    var serie = sheetResultFilter.getRange(row, resultFilterColumnRange.lastResult, 1, sheetResultFilter.getLastColumn()).getValues()[0].filter(String);
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
    sheetResultFilter.getRange(row, resultFilterColumnRange.maxVictoryInRaw).setValue(maxWin);
    sheetResultFilter.getRange(row, resultFilterColumnRange.maxDefeatInRaw).setValue(maxLose);
    sheetResultFilter.getRange(row, resultFilterColumnRange.currentVictoryInRaw).setValue(winInProgress);
    sheetResultFilter.getRange(row, resultFilterColumnRange.currentDefeatInRaw).setValue(loseInProgress);
}

var resultFilterColumnRange = {
    mail: 1,
    nickName: 2,
    fullName: 3,
    match: 4,
    victory: 5,
    draw: 6,
    defeat: 7,
    offensiveBonus: 8,
    defensiveBonus: 9,
    points: 10,
    pointsPerMatch: 11,
    victoryPercent: 12,
    defeatPercent: 13,
    rankThisWeek: 14,
    rankLastWeek: 15,
    rankEvolution: 16,
    maxVictoryInRaw: 17,
    maxDefeatInRaw: 18,
    currentVictoryInRaw: 19,
    currentDefeatInRaw: 20,
    lastResult: 21
};

function getRowSheetResultFilter(playerName) {
    var playerNames = playerNameInSheetResultFilter();
    for (var i = 0; i < playerNames.length; i++) {
        if (playerNames[i][0] == playerName) {
            return i+1;
        }
    }
}

var statsColumn = {
    rank: 0,
    mail: 1,
    nickName: 2,
    fullName: 3,
    match: 4,
    victory: 5,
    draw: 6,
    defeat: 7,
    offensiveBonus: 8,
    defensiveBonus: 9,
    points: 10,
    pointsPerMatch: 11,
    victoryPercent: 12,
    defeatPercent: 13,
    rankThisWeek: 14,
    rankLastWeek: 15,
    rankEvolution: 16,
    maxVictoryInRaw: 17,
    maxDefeatInRaw: 18,
    currentVictoryInRaw: 19,
    currentDefeatInRaw: 20,
    result1: 21,
    result2: 22,
    result3: 23,
    result4: 24,
    result5: 25
};

function loadPageStat() {
    var stats = "";
    var data = sheetStats.getRange(2, 1, sheetStats.getLastRow(), sheetStats.getLastColumn()).getValues();
    data.forEach(function (p) {
        if(p[statsColumn.mail]){
            stats += "<tr>";
            if (p[statsColumn.rankEvolution]) {
                stats += "<td>" + p[statsColumn.rank] + "<sup> (" + p[statsColumn.rankEvolution] + ")</sup></td>";
            } else {
                stats += "<td>" + p[statsColumn.rank] + "</td>";
            }
            stats += "<td class='tooltipped' data-position='bottom' data-tooltip='" + p[statsColumn.fullName] + "'>" + p[statsColumn.nickName] + "</td>"
                + "<td>" + p[statsColumn.match] + "</td>"
                + "<td>" + p[statsColumn.victory] + "</td>"
                + "<td>" + p[statsColumn.draw] + "</td>"
                + "<td>" + p[statsColumn.defeat] + "</td>"
                + "<td>" + p[statsColumn.offensiveBonus] + "</td>"
                + "<td>" + p[statsColumn.defensiveBonus] + "</td>"
                + "<td>" + p[statsColumn.points] + "</td>"
                + "<td>" + p[statsColumn.pointsPerMatch] + "</td>"
                + "<td>" + p[statsColumn.maxVictoryInRaw] + "</td>"
                + "<td>" + p[statsColumn.maxDefeatInRaw] + "</td>"
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
    var currentRank = sheetResultFilter.getRange(1, resultFilterColumnRange.rankThisWeek, sheetResultFilter.getRange("A1:A").getValues().filter(String).length, 1).getValues();
    sheetResultFilter.getRange(1, resultFilterColumnRange.rankLastWeek, sheetResultFilter.getRange("A1:A").getValues().filter(String).length, 1).setValues(currentRank);
}