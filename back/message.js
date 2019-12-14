// noinspection JSUnusedGlobalSymbols
function envoyerMessage(messageContent) {

    Logger.log("envoyerMessage (filtreEtatJoueur: " + messageContent.filtreEtatJoueur +
                " / filtrePrio: " + messageContent.filtrePrio +
                " / message: " + messageContent.message +
                " / isAnAlert: " + messageContent.isAnAlert);

    var playerMailListForMessage = "";

    switch (messageContent.filtreEtatJoueur) {
        case "all":
            playerMailListForMessage = playerMailList.split(',');
            break;
        case "match":
            playerMailListForMessage = matchPlayerMailList.split(',');
            break;
        case "waiting":
            playerMailListForMessage = waitingListPlayerMailList.split(',');
            break;
        case "noAnswer":
            playerMailListForMessage = notRespondedPlayerMailList.split(',');
            break;

    }

    if (playerMailListForMessage != "") {
        Logger.log("playerMailList : " + playerMailListForMessage);
        sendMessageForAPlayerList(playerMailListForMessage, messageContent);
    }

}

function sendMessageForAPlayerList(playerMailList, messageContent) {
    var playerList = getPlayerListWithMail(playerMailList);
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

// noinspection JSUnusedGlobalSymbols
function envoyerMessageForum(mailSender, message) {

    Logger.log("envoyerMessageForum the message is : " + message);
    var addressMailList = matchPlayerAndWaitingListPlayerMailList;
    if(!matchPlayerAndWaitingListPlayerMailList.includes(mailSender)) {
        addressMailList += ","+mailSender;
    }


    var playerSender = getPlayerWithMail(mailSender);
    Logger.log("addressMailList : " + addressMailList);
    sendMessageForumForAPlayer(addressMailList, playerSender, message);

    saveMessageForum(playerSender, message);
}

function saveMessageForum(playerSender, message) {
    var row = sheetForum.getLastRow() + 1;
    sheetForum.getRange(row, 1).setValue(playerSender.nickName);
    sheetForum.getRange(row, 2).setValue(now());
    sheetForum.getRange(row, 3).setValue(message);
}

function sendMessageForumForAPlayer(addressMailList, playerSender, message) {
    sendMail(addressMailList,
        "Message concernant le match " + matchDayGapInFrench(true),
        "<b>" + playerSender.nickName + " dit : </b><br>" + message + "</div>");
}
