function sendLastMonthResultMail() {
    var mails = lastMonthPlayerMailList.split(',');
    for (var i in mails) {
        var player = getPlayerWithMail(mails[i]);
        sendLastMonthResultMailForAPlayer(player);
    }
}

function sendLastMonthResultMailForAPlayer(player) {
    var body = includeWithArgs("front/mail/mailLastMonthResult", {
        urlMail: getUrlMail(player),
        winnersTable: getWinnersLosersTable("winners"),
        losersTable: getWinnersLosersTable("losers")
    });
    sendMail(player.mail, "Resultats du mois dernier", body);
}

function getWinnersLosersTable(value) {
    var data;
    if (value == "winners") {
        data = sheetRecordFilter.getRange(23, 2, 4, 5).getValues();
    } else if (value == "losers") {
        data = sheetRecordFilter.getRange(28, 2, 4, 5).getValues();
    }
    var dataHtml = "";
    for (var i in data[0]) {
        dataHtml += "<tr>"
            + "<td>" + data[0][i] + "</td>"
            + "<td>" + data[1][i] + "</td>"
            + "<td>" + data[2][i] + "</td>"
            + "<td>" + data[3][i] + "</td>"
            + "</tr>";
    }
    return dataHtml;
}