function loadPageBackoffice() {
    var player = getPlayerWithMail(param.mail);
    if (!param.isAdmin) {
        return loadPageUnauthorized();
    }

    var parameterApplication = {};
    parameterApplication.victory = victoryPoint;
    parameterApplication.draw = drawPoint;
    parameterApplication.defeat = defeatPoint;
    parameterApplication.offensiveBonus = offensiveBonusPoint;
    parameterApplication.minGoalGap = minGoalOffensiveBonus;
    parameterApplication.deffensiveBonus = defensiveBonusPoint;
    parameterApplication.maxGoalGap = maxGoalDefensiveBonus;
    parameterApplication.minMatch = minMatchForStat;
    parameterApplication.nbPlayersMatch = numberPlayerMatch;
    parameterApplication.nbLimitPlayers = minPlayerForAutoCancelation;
    parameterApplication.modeTest = modeTest==true;
    parameterApplication.mailTester = mailTester;
    parameterApplication.applicationName = applicationName;

    var log = {};
    log.send1 = getDateTimeFormat(mailSendingPrio1);
    log.send2 = getDateTimeFormat(mailSendingPrio2);
    log.send3 = getDateTimeFormat(mailSendingPrio3);
    log.control = getDateTimeFormat(controlDone);
    log.reminder = getDateTimeFormat(mailSendingReminder);
    log.googleEvent = getDateTimeFormat(creationGoogleEvent);
    log.confirmation = getDateTimeFormat(mailSendingConfirmation);
    log.team = getDateTimeFormat(teamSaved);

    var schedule = "";
    sheetSchedule.getRange(2, 1, 1, 8).getValues().forEach(function (s) {
        schedule += "<tr>"
            + "<td>" + s[0] + "</td>"
            + "<td>" + checkbox(s[1]) + "</td>"
            + "<td>" + checkbox(s[2]) + "</td>"
            + "<td>" + checkbox(s[3]) + "</td>"
            + "<td>" + checkbox(s[4]) + "</td>"
            + "<td>" + checkbox(s[5]) + "</td>"
            + "<td>" + checkbox(s[6]) + "</td>"
            + "<td>" + checkbox(s[7]) + "</td>"
            + "</tr>";
    });
    sheetSchedule.getRange(3, 1, 12, 8).getValues().forEach(function (s) {
        schedule += "<tr>"
            + "<td>" + s[0] + "</td>"
            + "<td>" + s[1] + "</td>"
            + "<td>" + s[2] + "</td>"
            + "<td>" + s[3] + "</td>"
            + "<td>" + s[4] + "</td>"
            + "<td>" + s[5] + "</td>"
            + "<td>" + s[6] + "</td>"
            + "<td>" + s[7] + "</td>"
            + "</tr>";
    });

    return render("front/page/backoffice", "Barbeuc : BackOffice", {
        mail: param.mail,
        key: param.key,
        admin: param.isAdmin,
        player: player,
        param: parameterApplication,
        log: log,
        schedule: schedule,
        testing: modeTest==true
    });
}

// noinspection JSUnusedGlobalSymbols
function updateParameter(parameterApplication) {
    victoryPoint=parameterApplication.victory;
    sheetParameters.getRange(getRowParameter("victoryPoint"), 2).setValue(parameterApplication.victory);
    drawPoint=parameterApplication.draw;
    sheetParameters.getRange(getRowParameter("drawPoint"), 2).setValue(parameterApplication.draw);
    defeatPoint=parameterApplication.defeat;
    sheetParameters.getRange(getRowParameter("defeatPoint"), 2).setValue(parameterApplication.defeat);
    offensiveBonusPoint=parameterApplication.offensiveBonus;
    sheetParameters.getRange(getRowParameter("offensiveBonusPoint"), 2).setValue(parameterApplication.offensiveBonus);
    minGoalOffensiveBonus=parameterApplication.offensiveBonusGap;
    sheetParameters.getRange(getRowParameter("minGoalOffensiveBonus"), 2).setValue(parameterApplication.offensiveBonusGap);
    defensiveBonusPoint=parameterApplication.defensiveBonus;
    sheetParameters.getRange(getRowParameter("defensiveBonusPoint"), 2).setValue(parameterApplication.defensiveBonus);
    maxGoalDefensiveBonus=parameterApplication.defensiveBonusGap;
    sheetParameters.getRange(getRowParameter("maxGoalDefensiveBonus"), 2).setValue(parameterApplication.defensiveBonusGap);
    minMatchForStat=parameterApplication.minMatch;
    sheetParameters.getRange(getRowParameter("minMatchForStat"), 2).setValue(parameterApplication.minMatch);
    numberPlayerMatch=parameterApplication.nbPlayersMatch;
    sheetParameters.getRange(getRowParameter("numberPlayerMatch"), 2).setValue(parameterApplication.nbPlayersMatch);
    minPlayerForAutoCancelation=parameterApplication.nbLimitPlayers;
    sheetParameters.getRange(getRowParameter("minPlayerForAutoCancelation"), 2).setValue(parameterApplication.nbLimitPlayers);
    if (parameterApplication.modeTest) {
        modeTest=true;
        sheetParameters.getRange(getRowParameter("modeTest"), 2).setValue(true);
    } else {
        modeTest=false;
        sheetParameters.getRange(getRowParameter("modeTest"), 2).setValue(false);
    }
    mailTester=parameterApplication.mailTester;
    sheetParameters.getRange(getRowParameter("mailTester"), 2).setValue(parameterApplication.mailTester);
    applicationName=parameterApplication.applicationName;
    sheetParameters.getRange(getRowParameter("applicationName"), 2).setValue(parameterApplication.applicationName);
}

// noinspection JSUnusedGlobalSymbols
function switchMode() {
    if(modeTest==true) {
        modeTest=false;
        sheetParameters.getRange(getRowParameter("modeTest"), 2).setValue(false);
    } else {
        modeTest=true;
        sheetParameters.getRange(getRowParameter("modeTest"), 2).setValue(true);
    }
}
