function loadPageRecord() {

    var victoryPercentage;
    var losePercentage;
    var victoryInRow;
    var loseInRow;
    var participation;
    var victoryLastMonth;
    var loseLastMonth;

    if(!param.year || param.year==currentYear) {
        param.year=currentYear;
        victoryPercentage = sheetRecordFilter.getRange(2, 2, 3, 3).getValues();
        losePercentage = sheetRecordFilter.getRange(5, 2, 3, 3).getValues();
        victoryInRow = sheetRecordFilter.getRange(8, 2, 3, 3).getValues();
        loseInRow = sheetRecordFilter.getRange(11, 2, 3, 3).getValues();
        participation = sheetRecordFilter.getRange(20, 2, 3, 3).getValues();
        victoryLastMonth = sheetRecordFilter.getRange(24, 2, 4, 3).getValues();
        loseLastMonth = sheetRecordFilter.getRange(29, 2, 4, 3).getValues();
    } else {
        var nameSheet = "RecordFilter" + param.year;
        var sheetRecordForParamYear = spreadsheet.getSheetByName(nameSheet);
        victoryPercentage = sheetRecordForParamYear.getRange(2, 2, 3, 3).getValues();
        losePercentage = sheetRecordForParamYear.getRange(5, 2, 3, 3).getValues();
        victoryInRow = sheetRecordForParamYear.getRange(8, 2, 3, 3).getValues();
        loseInRow = sheetRecordForParamYear.getRange(11, 2, 3, 3).getValues();
        participation = sheetRecordForParamYear.getRange(20, 2, 3, 3).getValues();
    }

    return render("front/page/record", "Barbeuc : Records", {
        mail: param.mail,
        key: param.key,
        year: param.year,
        currentYear: currentYear,
        fullName: getFullName(param.mail),
        admin: param.isAdmin,
        victoryPercentage: victoryPercentage,
        losePercentage: losePercentage,
        victoryInRow: victoryInRow,
        loseInRow: loseInRow,
        participation: participation,
        victoryLastMonth: victoryLastMonth,
        loseLastMonth: loseLastMonth,
        testing: isTest(),
        url: getUrl()
    });
}