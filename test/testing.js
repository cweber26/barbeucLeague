// noinspection JSUnusedGlobalSymbols
function testInscription15() {
    var playersList = playersTeamList;
    for (var i = 0; i < 15; i++) {
        var player = initPlayer(playersList[i]);
        inscription({mail: player.mail, key: player.keyWithSecurity, answer: "Oui"});
    }
}

// noinspection JSUnusedGlobalSymbols
function testInscription5() {
    var playersList = playersTeamList;
    for (var i = 0; i < 5; i++) {
        var player = initPlayer(playersList[i]);
        inscription({mail: player.mail, key: player.keyWithSecurity, answer: "Oui"});
    }
}

// noinspection JSUnusedGlobalSymbols
function testDesinscription() {
    var player = getPlayerWithMail("louis.williamson@decathlon.com");
    inscription({mail: player.mail, key: player.keyWithSecurity, answer: "Non"});
}


// noinspection JSUnusedGlobalSymbols
function testConfirmation() {
    var playersList = playersTeamList;
    for (var i = 0; i < 15; i++) {
        var player = initPlayer(playersList[i]);
        confirmation({mail: player.mail, key: player.keyWithSecurity, answer: "Oui", carSharing: "sharing"});
    }
}

// noinspection JSUnusedGlobalSymbols
function testMails() {
    var player = getPlayerWithMail("cedric.weber@decathlon.com");
    sendInscriptionMailForAPlayer(player, false, false);
    sendInscriptionMailForAPlayer(player, false, true);
    sendInscriptionMailForAPlayer(player, true, false);
    sendRemindMailForAPlayer(player, true);
    sendRemindMailForAPlayer(player, false);
    sendConfirmMailForAPlayer(player, true);
    sendConfirmMailForAPlayer(player, false);
    sendWaitingListMail(player);
    sendCancelMatchMailForAPlayer(player, true);
    sendCancelMatchMailForAPlayer(player, false);
    sendMatchCompletMailForAPlayer(player);
    sendLastMonthResultMailForAPlayer(player);
    sendMailForAnAdmin(player, "subject test", "<h2>html test</h2>");
    sendMailToNewUser(player);
    sendMailToAdminAboutNewPlayerForAnAdmin(player, "new.player@gmail.com", "creator.player@gmail.com");
}

// noinspection JSUnusedGlobalSymbols
function testMail() {
    var player = getPlayerWithMail("cedric.weber@decathlon.com");
    sendConfirmMailForAPlayer(player, false);
}
