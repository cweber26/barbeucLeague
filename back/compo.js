function loadPageCompo() {
    var players = [];
    var confirmations = [];
    var effectif = "";
    var matchCancel = parametersMap.get("isMatchCancel");
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        var data = playersInTheMatchForFinalCompo();
        data.forEach(function (p) {
            players.push(p[1]);
            confirmations.push(p[10]);
            if (p[0] && parametersMap.get("numberPlayerInMatch") == parametersMap.get("numberPlayerMatch")) {
                effectif += "<tr>"
                    + "<td>" + p[9] + "</td>"
                    + "<td>" + p[0] + "</td>"
                    + "<td>" + p[1] + "</td>";
                if(p[7]>0){
                    effectif += "<td>" + Utilities.formatString("%02d",Number(p[7])) + "</td>";
                } else {
                    effectif += "<td>-</td>";
                }
                if(param.isAdmin) {
                    effectif += "<td>" + p[2] + "</td>"
                        + "<td>" + Utilities.formatString("%02d",Number(p[3]+p[4]+p[5])) + " : " + p[3] + "/" + p[4]+ "/" + p[5] + "</td>";
                }
                effectif += "<td>" + getSerieLumieres(p[8]) + "</td>"
                    + "<td>" + p[6] + "</td>"
                    + "<td>" + getLogoCar(p[11]) + "</td>"
                    + "</tr>";
            }
        });

    }
    var listeAttente = "";
    if (parametersMap.get("numberPlayerInWaitingList") > 0 && !matchCancel) {
        playersInWaitingListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listeAttente += "<tr><td>" + player.fullName + "</td></tr>";
            }
        });

    }
    var listePasDispo = "";
    if(param.isAdmin && parametersMap.get("notAvailablePlayerMailList") && !matchCancel) {
        playersNotAvailablePlayerListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasDispo += "<tr><td>" + player.fullName + "</td></tr>";
            }
        });

    }
    var tabTitle = "Barbeuc : Composition";
    var inscriptionTable = [];
    if (param.isAdmin && parametersMap.get("numberPlayerInMatch") > 0 && !matchCancel) {
        inscriptions().forEach(function (i) {
            if (i[0]) {
                inscriptionTable += "<tr>"
                    + "<td>" + i[0] + "</td>"
                    + "<td>" + i[1] + "</td>"
                    + "<td>" + checkbox(i[2]) + "</td>"
                    + "<td>" + i[3] + "</td>"
                    + "<td>" + Utilities.formatDate(i[4], "Europe/Paris", "MM/dd/yy HH:mm") + "</td>";
                if (i[5]) {
                    inscriptionTable += "<td>" + i[5] + "</td></tr>"
                } else {
                    inscriptionTable += "<td></td></tr>";
                }
            }
        });
        tabTitle += " (" + parametersMap.get("numberPlayerInMatch") + ")";

    }
    return render("front/page/compo", tabTitle, {
        mail: param.mail,
        key: param.key,
        date: matchDayGapInFrench(true),
        compo: players,
        inscriptionPhase: isParameterNotBlank("mailSendingPrio1"),
        confirmationPhase: isParameterNotBlank("mailSendingConfirmation"),
        teamSaved: isParameterNotBlank("teamSaved"),
        confirmations: confirmations,
        effectif: effectif,
        listeAttente: listeAttente,
        listePasDispo: listePasDispo,
        admin: param.isAdmin,
        cancelMatch: matchCancel,
        testing: isParameterTrue("modeTest"),
        inscriptionTable: inscriptionTable,
        stadium: getStadiumInfo()
    });
}


function playersInTheMatchForFinalCompo() {
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        return sheetComposition.getRange(13, 2, parametersMap.get("numberPlayerMatch"), 13).getValues();
    }
}

function inscriptions() {
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        return sheetInscriptionFilter.getRange(1, 7).getDataRegion().getValues();
    }
}

function getLogoCar(type) {
    switch (type) {
        case "sharing":
            return "<div class=logoCarSharingBlack></div>";
        case "alone":
            return "<div class=logoCarAloneBlack></div>";
        case "need":
            return "<div class=logoCarNeedBlack></div>";
        default :
            return "";
    }
}