function loadPageResultat() {
    var players = [];
    var matchDates = sheetResult.getRange("A1:A").getValues();
    var row = sheetResult.getRange("A1:A").getValues().filter(String).length + 1;
    var date;
    if(param.matchDate) {
        date = param.matchDate;
    } else {
        date = getDateFormat(sheetResult.getRange(row, 1).getValue());
    }

    var matchDateSelect = "";
    for (var i = 3; i <= row+1; i++){
        if(matchDates[i][0]){
            var dateFormated = getDateFormat(matchDates[i][0]);
            if(dateFormated == date) {
                var playersList = sheetResult.getRange(i+1, 2, 1, 10).getValues();
                playersList[0].forEach(function (p) {
                    if(p) {
                        players.push(getPlayerWithFullName(p).nickName);
                    } else {
                        players.push("");
                    }
                });
                var scoreRed = sheetResult.getRange(i+1, 12).getValue();
                var scoreBlue = sheetResult.getRange(i+1, 13).getValue();
                matchDateSelect += "<option selected>"+dateFormated+"</option>";
            } else {
                matchDateSelect += "<option>"+dateFormated+"</option>";
            }
        }
    }


    return render("front/page/resultat", "Barbeuc : Resultat", {
        mail: param.mail,
        key: param.key,
        matchDateSelect: matchDateSelect,
        date: date,
        compo: players,
        admin: param.isAdmin,
        testing: isTest(),
        scoreRed: scoreRed,
        scoreBlue: scoreBlue
    });
}
