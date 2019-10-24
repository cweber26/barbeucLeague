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
    parameterApplication.modeTest = isTest();
    parameterApplication.mailTester = mailTester;
    parameterApplication.applicationName = applicationName;

    var log = {};
    log.send1withPrio = getDateTimeFormat(mailSendingPrio1WithPriority);
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
        testing: isTest()
    });
}

// noinspection JSUnusedGlobalSymbols
function updateParameters(parameterApplication) {
    updateParameter("victoryPoint", parameterApplication.victory);
    updateParameter("drawPoint", parameterApplication.draw);
    updateParameter("defeatPoint", parameterApplication.defeat);
    updateParameter("offensiveBonusPoint", parameterApplication.offensiveBonus);
    updateParameter("minGoalOffensiveBonus", parameterApplication.offensiveBonusGap);
    updateParameter("defensiveBonusPoint", parameterApplication.defensiveBonus);
    updateParameter("maxGoalDefensiveBonus", parameterApplication.defensiveBonusGap);
    updateParameter("minMatchForStat", parameterApplication.minMatch);
    updateParameter("numberPlayerMatch", parameterApplication.nbPlayersMatch);
    updateParameter("minPlayerForAutoCancelation", parameterApplication.nbLimitPlayers);
    if (parameterApplication.modeTest) {
        updateParameter("modeTest", true);
    } else {
        updateParameter("modeTest", false);
    }
    updateParameter("mailTester", parameterApplication.mailTester);
    updateParameter("applicationName", parameterApplication.applicationName);
}

// noinspection JSUnusedGlobalSymbols
function switchMode() {
    if(isTest()) {
        modeTest=false;
        updateParameter("modeTest", false);
    } else {
        modeTest=true;
        updateParameter("modeTest", true);
    }
}

function isTest() {
    return modeTest==true;
}

function isProd() {
    return modeTest==false;
}
