// noinspection JSUnusedGlobalSymbols
function envoyerMessage(messageContent) {

    Logger.log(messageContent.tousLesJoueurs);
    var playersList = [];

    if (messageContent.tousLesJoueurs) {
        playersList = getPlayerListWithMail(parametersMap.get("playerMailList").split(','));
    } else {
        if (messageContent.joueursMatch) {
            if (parametersMap.get("matchPlayerMailList") != "") {
                playersList = getPlayerListWithMail(parametersMap.get("matchPlayerMailList").split(','));
            }
        }
        if (messageContent.joueursEnAttente) {
            if (parametersMap.get("waitingListPlayerMailList") != "") {
                playersList = playersList.concat(getPlayerListWithMail(parametersMap.get("waitingListPlayerMailList").split(',')));
            }
        }
        if (messageContent.joueursSansReponse) {
            if (parametersMap.get("notRespondedPlayerMailList") != "") {
                playersList = playersList.concat(getPlayerListWithMail(parametersMap.get("notRespondedPlayerMailList").split(',')));
            }
        }

    }

    for (var i in playersList) {
        if (playersList[i].prioValue <= messageContent.filtrePrio) {
            sendMessageForAPlayer(playersList[i], messageContent.message)
        }
    }
}

function getPlayerListWithMail(playerMailList) {
    var playerList = [];
    for (var i in playerMailList) {
        playerList.push(getPlayerWithMail(playerMailList[i]))
    }
    return playerList;
}

function sendMessageForAPlayer(player, message) {
    var body = includeWithArgs("front/mail/mailSimple", {
        html: '<h3>' + message + '</h3>',
        urlMail: getUrlMail(player)
    });
    sendMail(player.mail, "Message", body);
}