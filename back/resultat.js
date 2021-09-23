function loadPageResultat() {
    var playersNickName = [];
    var playersFullName = [];
    var matchDates = sheetResult.getRange("A1:A").getValues();
    var row = sheetResult.getRange("A1:A").getValues().filter(String).length + 1;
    var date;
    if(param.matchDate) {
        date = param.matchDate;
    } else {
        date = getDateTimeFormatWithoutSecond(sheetResult.getRange(row, 1).getValue());
    }

    var matchDateSelect = "";
    for (var i = row+1; i >= 3; i--){
        if(matchDates[i][0]){
            var dateFormated = getDateTimeFormatWithoutSecond(matchDates[i][0]);
            if(dateFormated == date) {
                var playersMailList = sheetResult.getRange(i+1, 2, 1, 10).getValues();
                playersMailList[0].forEach(function (m) {
                    if(m) {
                        var player = getPlayerWithMail(m);
                        playersNickName.push(player.nickName);
                        playersFullName.push(player.fullName);
                    } else {
                        playersNickName.push("");
                        playersFullName.push("");
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
        fullName: getFullName(param.mail),
        matchDateSelect: matchDateSelect,
        date: date,
        compoNickName: playersNickName,
        compoFullName: playersFullName,
        admin: param.isAdmin,
        testing: isTest(),
        scoreRed: scoreRed,
        scoreBlue: scoreBlue
    });
}
