function loadPageRecord() {
    var victoryPercentage = sheetRecordFilter.getRange(2, 2, 2, 3).getValues();
    var losePercentage = sheetRecordFilter.getRange(5, 2, 2, 3).getValues();
    var victoryInRow = sheetRecordFilter.getRange(8, 2, 2, 3).getValues();
    var loseInRow = sheetRecordFilter.getRange(11, 2, 2, 3).getValues();
    var participation = sheetRecordFilter.getRange(20, 2, 2, 3).getValues();
    var victoryLastMonth = sheetRecordFilter.getRange(24, 2, 3, 3).getValues();
    var loseLastMonth = sheetRecordFilter.getRange(29, 2, 3, 3).getValues();

    return render("front/page/record", "Barbeuc : Records", {
        mail: param.mail,
        key: param.key,
        admin: param.isAdmin,
        victoryPercentage: victoryPercentage,
        losePercentage: losePercentage,
        victoryInRow: victoryInRow,
        loseInRow: loseInRow,
        participation: participation,
        victoryLastMonth: victoryLastMonth,
        loseLastMonth: loseLastMonth,
        testing: modeTest==true
    });
}