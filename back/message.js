// noinspection JSUnusedGlobalSymbols
function envoyerMessage(messageContent) {

    var playerMailList = "";

    switch (messageContent.filtreEtatJoueur) {
        case "all":
            playerMailList = playerMailList.split(',');
            break;
        case "match":
            playerMailList = matchPlayerMailList.split(',');
            break;
        case "waiting":
            playerMailList = waitingListPlayerMailList.split(',');
            break;
        case "noAnswer":
            playerMailList = notRespondedPlayerMailList.split(',');
            break;

    }

    if (playerMailList != "") {
        sendMessageForAPlayerList(playerMailList, messageContent);
    }

}

function sendMessageForAPlayerList(playerMailList, messageContent) {
    var playerList = getPlayerListWithMail(playerMailList)
    for (var i in playerList) {
        if (playerList[i].prioValue <= messageContent.filtrePrio) {
            sendMessageForAPlayer(playerList[i], messageContent.message, messageContent.isAnAlert)
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

function sendMessageForAPlayer(player, message, isAnAlert) {
    var html;
    if(isAnAlert) {
        html = "<div style='width: 400px; margin: auto; color: #ef5350; font-size: 16px; font-weight: bold;'>" + message + "</div>"
    } else {
        html = "<div style='width: 400px; margin: auto; font-size: 14px;'>" + message + "</div>"
    }
    var body = includeWithArgs("front/mail/mailSimple", {
        html: html,
        urlMail: getUrlMail(player)
    });
    sendMail(player.mail, "Message", body);
}