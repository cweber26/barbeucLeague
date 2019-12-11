var gapLine = 3;
var playerColumn = {
    mail: 0,
    key: 1,
    firstName: 2,
    lastName: 3,
    fullName: 4,
    shortfullName: 5,
    nickName: 6,
    isUnavailable: 7,
    endDateOfUnavailibility: 8,
    mondaySelected: 9,
    tuesdaySelected: 10,
    wednesdaySelected: 11,
    thursdaySelected: 12,
    fridaySelected: 13,
    site: 14,
    position: 15,
    levelDribble: 16,
    levelFrappe: 17,
    levelDefense: 18,
    haveDoneAutoEvaluation: 19,
    haveAlreadyAnswer: 20,
    prioValue: 21,
    isAdmin: 22,
    isPrioritary: 23,
    isInscriptionSent: 24,
    isConfirmationSent: 25,
    answer: 26,
    answerDate: 27,
    carSharing: 28,
    row: 29
};

var playerColumnRange = {
    mail: (playerColumn.mail +1),
    key: (playerColumn.key +1),
    firstName: (playerColumn.firstName +1),
    lastName: (playerColumn.lastName +1),
    fullName: (playerColumn.fullName +1),
    shortfullName: (playerColumn.shortfullName +1),
    nickName: (playerColumn.nickName +1),
    isUnavailable: (playerColumn.isUnavailable +1),
    endDateOfUnavailibility: (playerColumn.endDateOfUnavailibility +1),
    mondaySelected: (playerColumn.mondaySelected +1),
    tuesdaySelected: (playerColumn.tuesdaySelected +1),
    wednesdaySelected: (playerColumn.wednesdaySelected +1),
    thursdaySelected: (playerColumn.thursdaySelected +1),
    fridaySelected: (playerColumn.fridaySelected +1),
    site: (playerColumn.site +1),
    position: (playerColumn.position +1),
    levelDribble: (playerColumn.levelDribble +1),
    levelFrappe: (playerColumn.levelFrappe +1),
    levelDefense: (playerColumn.levelDefense +1),
    haveDoneAutoEvaluation: (playerColumn.haveDoneAutoEvaluation +1),
    haveAlreadyAnswer: (playerColumn.haveAlreadyAnswer +1),
    prioValue: (playerColumn.prioValue +1),
    isAdmin: (playerColumn.isAdmin +1),
    isPrioritary: (playerColumn.isPrioritary +1),
    isInscriptionSent: (playerColumn.isInscriptionSent +1),
    isConfirmationSent: (playerColumn.isConfirmationSent +1),
    answer: (playerColumn.answer +1),
    answerDate: (playerColumn.answerDate +1),
    carSharing: (playerColumn.carSharing +1),
    row: (playerColumn.row +1)
};

function shouldReceiveInscriptionMail(player, prior, withPriority, relaunch) {
    if (player.mail
        && player.haveAlreadyAnswer == false
        && player.isUnavailable == false
        && haveSelectedMatchDay(player, nextMatchDay)) {
        if(relaunch) {
            if(player.prioValue <= prior) {
                return true;
            }
        } else {
            if(player.prioValue == prior) {
                if (withPriority) {
                    return player.isPrioritary;
                } else {
                    return !player.isPrioritary;
                }
            }
        }
    }
    return false;


}
function getPlayerWithMail(mail) {
    for (var i in playersTeamList) {
        if (playersTeamList[i][0] == mail) {
            return initPlayer(playersTeamList[i]);
        }
    }
    throw "mail " + mail + " inconnu";

}
function getPlayerWithFullName(fullName) {
    for (var i in playersTeamList) {
        if (playersTeamList[i][4] == fullName) {
            return initPlayer(playersTeamList[i]);
        }
    }
    throw "fullName " + fullName + " inconnu";
}



function initPlayer(playerLine) {
    //Logger.log("initPlayer : " + playerLine);
    var player = {};
    player.mail =                       playerLine[playerColumn.mail];
    player.key =                        playerLine[playerColumn.key];
    player.keyWithSecurity =            (playerLine[playerColumn.key] * 2 + 10);
    player.firstName =                  playerLine[playerColumn.firstName];
    player.lastName =                   playerLine[playerColumn.lastName];
    player.fullName =                   playerLine[playerColumn.fullName];
    player.shortfullName =              playerLine[playerColumn.shortfullName];
    player.nickName =                   playerLine[playerColumn.nickName];
    player.isUnavailable =              playerLine[playerColumn.isUnavailable];
    player.endDateOfUnavailibility =    playerLine[playerColumn.endDateOfUnavailibility];
    player.mondaySelected =             playerLine[playerColumn.mondaySelected];
    player.tuesdaySelected =            playerLine[playerColumn.tuesdaySelected];
    player.wednesdaySelected =          playerLine[playerColumn.wednesdaySelected];
    player.thursdaySelected =           playerLine[playerColumn.thursdaySelected];
    player.fridaySelected =             playerLine[playerColumn.fridaySelected];
    player.site =                       playerLine[playerColumn.site];
    player.position =                   playerLine[playerColumn.position];
    player.levelDribble =               playerLine[playerColumn.levelDribble];
    player.levelFrappe =                playerLine[playerColumn.levelFrappe];
    player.levelDefense =               playerLine[playerColumn.levelDefense];
    player.haveDoneAutoEvaluation =     playerLine[playerColumn.haveDoneAutoEvaluation];
    player.haveAlreadyAnswer =          playerLine[playerColumn.haveAlreadyAnswer];
    player.prioValue =                  playerLine[playerColumn.prioValue];
    player.isAdmin =                    playerLine[playerColumn.isAdmin];
    player.isPrioritary =               playerLine[playerColumn.isPrioritary];
    player.isInscriptionSent =          playerLine[playerColumn.isInscriptionSent];
    player.isConfirmationSent =         playerLine[playerColumn.isConfirmationSent];
    player.answer =                     playerLine[playerColumn.answer];
    player.answerDate =                 playerLine[playerColumn.answerDate];
    player.carSharing =                 playerLine[playerColumn.carSharing];
    player.row =                        playerLine[playerColumn.row];
    return player;
}

function getStatusUser(param) {
    if(!param.mail && !param.key) {
        return "guest";
    }

    try {
        var player = getPlayerWithMail(param.mail);
    } catch (error) {
        return "unknow";
    }

    if (!isKeyValid(param.key, player.key)) {
        return "keyInvalid";
    }

    if(player.prioValue == 9) {
        return "archivated";
    }

    if (player.isAdmin) {
        param.isAdmin = true;
    }

    return "valid";
}

function isKeyValid(keyToCheck, key) {
    return keyToCheck == (key * 2 + 10) || keyToCheck == "666";
}


function deleteUnavaibility() {
    var playersList = playersTeamList;
    for (var i in playersList) {
        var player = playersList[i];
        if (player[playerColumn.endDateOfUnavailibility] && player[playerColumn.endDateOfUnavailibility].valueOf() < nextMatchDate.valueOf()) {
            sheetTeam.getRange(Number(i) + gapLine, playerColumnRange.isUnavailable).setValue(false);
            sheetTeam.getRange(Number(i) + gapLine, playerColumnRange.endDateOfUnavailibility).clearContent();
        }
    }
}


function getNewPlayerInCompo() {
    var mail = playersInWaitingListMail()[0];
    return getPlayerWithMail(mail);
}


function loadPageProfil() {
    var player;
    if(param.profilMail && param.isAdmin) {
        player = getPlayerWithMail(param.profilMail);
    } else {
        player = getPlayerWithMail(param.mail);
    }
    return render("front/page/profil", "Barbeuc : Profil", {
        mail: param.mail,
        key: param.key,
        fullName: getFullName(param.mail),
        player: player,
        admin: param.isAdmin,
        modif: true,
        testing: isTest()
    });
}


function loadPageNewProfil() {
    return render("front/page/profil", "Barbeuc : New profil", {
        mail: param.mail,
        fullName: getFullName(param.mail),
        key: param.key,
        admin: param.isAdmin,
        modif: false,
        testing: isTest()
    });
}

// noinspection JSUnusedGlobalSymbols
function updateProfil(user) {

    var row = getRowSheetTeamWithMail(user.oldMail);

    if (user.key == (sheetTeam.getRange(row, 2).getValue() * 2 + 10)) {
        var mail = user.mail;
        var firstName = user.prenom;
        var lastName = user.nom;
        var nickName = user.surnom;
        var unavailable = user.indispo;

        var dateEuropeFormat = user.indispoDate;
        var year = dateEuropeFormat.substring(6, 10);
        var month = dateEuropeFormat.substring(3, 5);
        var day = dateEuropeFormat.substring(0, 2);
        var endDate = new Date(year, month - 1, day);

        var monday = user.lundi;
        var tuesday = user.mardi;
        var wednesday = user.mercredi;
        var thursday = user.jeudi;
        var friday = user.vendredi;
        var site = user.site;
        var position = user.poste;
        var levelDribble = user.dribble;
        var levelFrappe = user.frappe;
        var levelDefense = user.defense;
        var priorityLevel = user.priorityLevel;
        var isAnAdmin = user.isAnAdmin;
        var haveAPriority = user.haveAPriority;

        var oldFirstName = sheetTeam.getRange(row, playerColumnRange.firstName).getValue();
        var oldLastName = sheetTeam.getRange(row, playerColumnRange.lastName).getValue();
        if (oldFirstName != firstName || oldLastName != lastName) {
            updateNameProfil(oldFirstName, firstName, oldLastName, lastName, row);
        }

        if (nickName) {
            sheetTeam.getRange(row, playerColumnRange.nickName).setValue(nickName)
        }
        if (unavailable) {
            sheetTeam.getRange(row, playerColumnRange.isUnavailable).setValue(true);
            sheetTeam.getRange(row, playerColumnRange.endDateOfUnavailibility).setValue(new Date(Utilities.formatDate(endDate, "Europe/Paris", "MM/dd/yy")));
        } else {
            sheetTeam.getRange(row, playerColumnRange.isUnavailable).setValue(false);
            sheetTeam.getRange(row, playerColumnRange.endDateOfUnavailibility).setValue("");
        }
        if (monday) {
            sheetTeam.getRange(row, playerColumnRange.mondaySelected).setValue(true);
        } else {
            sheetTeam.getRange(row, playerColumnRange.mondaySelected).setValue(false);
        }
        if (tuesday) {
            sheetTeam.getRange(row, playerColumnRange.tuesdaySelected).setValue(true);
        } else {
            sheetTeam.getRange(row, playerColumnRange.tuesdaySelected).setValue(false);
        }
        if (wednesday) {
            sheetTeam.getRange(row, playerColumnRange.wednesdaySelected).setValue(true);
        } else {
            sheetTeam.getRange(row, playerColumnRange.wednesdaySelected).setValue(false);
        }
        if (thursday) {
            sheetTeam.getRange(row, playerColumnRange.fridaySelected).setValue(true);
        } else {
            sheetTeam.getRange(row, playerColumnRange.fridaySelected).setValue(false);
        }
        if (friday) {
            sheetTeam.getRange(row, playerColumnRange.fridaySelected).setValue(true);
        } else {
            sheetTeam.getRange(row, playerColumnRange.fridaySelected).setValue(false);
        }
        if (site) {
            sheetTeam.getRange(row, playerColumnRange.site).setValue(site);
        }
        if (position) {
            sheetTeam.getRange(row, playerColumnRange.position).setValue(position);
        }
        if (levelDribble) {
            sheetTeam.getRange(row, playerColumnRange.levelDribble).setValue(levelDribble);
        }
        if (levelFrappe) {
            sheetTeam.getRange(row, playerColumnRange.levelFrappe).setValue(levelFrappe);
        }
        if (levelDefense) {
            sheetTeam.getRange(row, playerColumnRange.levelDefense).setValue(levelDefense);
        }
        if (levelDribble && levelFrappe && levelDefense) {
            sheetTeam.getRange(row, playerColumnRange.haveDoneAutoEvaluation).setValue(true);
        } else {
            sheetTeam.getRange(row, playerColumnRange.haveDoneAutoEvaluation).setValue(false);
        }
        if(priorityLevel)  {
            sheetTeam.getRange(row, playerColumnRange.prioValue).setValue(priorityLevel)
        }
        if(isAnAdmin) {
            sheetTeam.getRange(row, playerColumnRange.isAdmin).setValue(true)
        } else {
            sheetTeam.getRange(row, playerColumnRange.isAdmin).setValue(false);
        }
        if(haveAPriority) {
            sheetTeam.getRange(row, playerColumnRange.isPrioritary).setValue(true)
        } else {
            sheetTeam.getRange(row, playerColumnRange.isPrioritary).setValue(false);
        }

        if(user.oldMail != mail) {
            sheetTeam.getRange(row, playerColumnRange.mail).setValue(mail);
            return {mail: mail, key: sheetTeam.getRange(row, playerColumnRange.key).getValue() * 2 + 10};
        }

    } else {
        throw "clef non valide";
    }
}

function getRowSheetTeamWithMail(mail) {
    var teamList = playersTeamList;
    for (var i = 0; i < teamList.length; i++) {
        if (teamList[i][playerColumn.mail] == mail) {
            return i + gapLine;
        }
    }
}

function getRowSheetTeamWithFullName(firstname, lastname) {
    var teamList = playersTeamList;
    for (var i = 0; i < teamList.length; i++) {
        if (teamList[i][playerColumn.firstName] == firstname && teamList[i][playerColumn.lastName] == lastname) {
            return i + gapLine;
        }
    }
}

function getRowSheetTeamWithNickname(nickname) {
    var teamList = playersTeamList;
    for (var i = 0; i < teamList.length; i++) {
        if (teamList[i][playerColumn.nickName] == nickname) {
            return i + gapLine;
        }
    }
}


// met à jour le nom complet modifié dans la page des résultats afin que les stats fonctionnent toujours
function updateNameProfil(oldFirstName, firstName, oldLastName, lastName, row) {
    if (firstName != oldFirstName) {
        sheetTeam.getRange(row, playerColumnRange.firstName).setValue(firstName);
    } else {
        firstName = oldFirstName;
    }
    if (lastName != oldLastName) {
        sheetTeam.getRange(row, playerColumnRange.lastName).setValue(lastName);
    } else {
        lastName = oldLastName;
    }
    var oldFullName = oldFirstName + " " + oldLastName;
    var newFullName = firstName + " " + lastName;
    var rangeResult = sheetResult.getRange(4, 2, sheetResult.getLastRow(), 13);
    var resultValues = rangeResult.getValues();
    replaceInSheet(resultValues, oldFullName, newFullName);
    rangeResult.setValues(resultValues);
}

function replaceInSheet(values, to_replace, replace_with) {
    var replaced_values;
    for (var row in values) {
        replaced_values = values[row].map(function (original_value) {
            return original_value.toString().replace(to_replace, replace_with);
        });
        values[row] = replaced_values;
    }
}

function playersInTheMatchMail() {
    if(numberPlayerInMatch>0) {
        return matchPlayerMailList.split(',');
    }
    return [];
}

function playersInWaitingListMail() {
    if(numberPlayerInWaitingList>0) {
        return waitingListPlayerMailList.split(',');
    }
    return [];
}

function playersNotAvailablePlayerListMail() {
    if(notAvailablePlayerMailList) {
        return notAvailablePlayerMailList.split(',');
    }
    return [];
}

function playersNotRespondedPlayerMailList() {
    if(notRespondedPlayerMailList) {
        return notRespondedPlayerMailList.split(',');
    }
    return [];
}

function playersInjuredPlayerMailList() {
    if(injuredPlayerMailList) {
        return injuredPlayerMailList.split(',');
    }
    return [];
}

// noinspection JSUnusedGlobalSymbols
function archiveProfil(mail) {
    var row = getRowSheetTeamWithMail(mail);
    sheetTeam.getRange(row, 22).setValue(9);
}

// noinspection JSUnusedGlobalSymbols
function createProfil(user, creatorMail) {
    if(getRowSheetTeamWithMail(user.mail)) {
        return "Le mail " + user.mail + " est déjà utilisé";
    }
    if(getRowSheetTeamWithFullName(user.prenom, user.nom)) {
        return "Le joueur existe " + user.prenom + " " + user.nom + " est déjà utilisé";
    }
    if(getRowSheetTeamWithNickname(user.surnom)) {
        return "Le surnom " + user.surnom + " est déjà utilisé";
    }
    var row = sheetTeam.getRange("A3:A").getValues().filter(String).length + 3;

    sheetTeam.getRange(row, playerColumnRange.mail).setValue(user.mail);
    sheetTeam.getRange(row, playerColumnRange.firstName).setValue(user.prenom);
    sheetTeam.getRange(row, playerColumnRange.lastName).setValue(user.nom);
    sheetTeam.getRange(row, playerColumnRange.nickName).setValue(user.surnom);

    var unavailable = user.indispo;
    var dateEuropeFormat = user.indispoDate;
    var year = dateEuropeFormat.substring(6, 10);
    var month = dateEuropeFormat.substring(3, 5);
    var day = dateEuropeFormat.substring(0, 2);
    var endDate = new Date(year, month - 1, day);
    if (unavailable) {
        sheetTeam.getRange(row, playerColumnRange.isUnavailable).setValue(true);
        sheetTeam.getRange(row, playerColumnRange.endDateOfUnavailibility).setValue(new Date(Utilities.formatDate(endDate, "Europe/Paris", "MM/dd/yy")));
    } else {
        sheetTeam.getRange(row, playerColumnRange.isUnavailable).setValue(false);
        sheetTeam.getRange(row, playerColumnRange.endDateOfUnavailibility).setValue("");
    }

    if (user.lundi) {
        sheetTeam.getRange(row, playerColumnRange.mondaySelected).setValue(true);
    } else {
        sheetTeam.getRange(row, playerColumnRange.mondaySelected).setValue(false);
    }
    if (user.mardi) {
        sheetTeam.getRange(row, playerColumnRange.tuesdaySelected).setValue(true);
    } else {
        sheetTeam.getRange(row, playerColumnRange.tuesdaySelected).setValue(false);
    }
    if (user.mercredi) {
        sheetTeam.getRange(row, playerColumnRange.wednesdaySelected).setValue(true);
    } else {
        sheetTeam.getRange(row, playerColumnRange.wednesdaySelected).setValue(false);
    }
    if (user.jeudi) {
        sheetTeam.getRange(row, playerColumnRange.thursdaySelected).setValue(true);
    } else {
        sheetTeam.getRange(row, playerColumnRange.thursdaySelected).setValue(false);
    }
    if (user.vendredi) {
        sheetTeam.getRange(row, playerColumnRange.fridaySelected).setValue(true);
    } else {
        sheetTeam.getRange(row, playerColumnRange.fridaySelected).setValue(false);
    }
    sheetTeam.getRange(row, playerColumnRange.site).setValue(user.site);
    sheetTeam.getRange(row, playerColumnRange.position).setValue(user.poste);
    sheetTeam.getRange(row, playerColumnRange.levelDribble).setValue(user.dribble);
    sheetTeam.getRange(row, playerColumnRange.levelFrappe).setValue(user.frappe);
    sheetTeam.getRange(row, playerColumnRange.levelDefense).setValue(user.defense);
    sheetTeam.getRange(row, playerColumnRange.haveDoneAutoEvaluation).setValue(true);
    sheetTeam.getRange(row, playerColumnRange.prioValue).setValue(user.priorityLevel);

    if (user.isAnAdmin) {
        sheetTeam.getRange(row, playerColumnRange.isAdmin).setValue(true)
    } else {
        sheetTeam.getRange(row, playerColumnRange.isAdmin).setValue(false);
    }
    if (user.haveAPriority) {
        sheetTeam.getRange(row, playerColumnRange.isPrioritary).setValue(true)
    } else {
        sheetTeam.getRange(row, playerColumnRange.isPrioritary).setValue(false);
    }

    playersTeamList = sheetTeam.getRange(3, 1, sheetTeam.getRange("A3:A").getValues().filter(String).length, sheetTeam.getLastColumn()).getValues();
    var player = getPlayerWithMail(user.mail);
    sendMailToNewUser(player);
    sendMailToAdminAboutNewPlayer(user.mail, creatorMail);
}

function sendMailToNewUser(player) {
    sendMail(player.mail, "Bienvenue" , includeWithArgs("front/mail/mailNewProfil", {
        urlMail: getUrlMail(player)
    }));
}

function sendMailToAdminAboutNewPlayer(mailNewPlayer, creatorMail) {
    var mailsAdmin = adminMailList.split(',');
    for (var i in mailsAdmin) {
        var playerAdmin = getPlayerWithMail(mailsAdmin[i]);
        sendMailToAdminAboutNewPlayerForAnAdmin(playerAdmin, mailNewPlayer, creatorMail);
    }
}

function sendMailToAdminAboutNewPlayerForAnAdmin(playerAdmin, mailNewPlayer, creatorMail) {
    var html= "<h3>Le joueur " + mailNewPlayer + " vient d'être créé";
    if(creatorMail) {
        html += " par " + creatorMail;
    }
    sendMail(playerAdmin.mail, "Nouveau Joueur" , includeWithArgs("front/mail/mailSimple", {
        html: html,
        urlMail: getUrlMail(playerAdmin)
    }));
}

function loadPageDeletion() {
    return render("front/page/profilArchived", "Barbeuc : Profil supprimé", {
        mail: param.mail,
        key: param.key,
        admin: param.isAdmin
    });
}


// noinspection JSUnusedGlobalSymbols
function sendKeyByMail(mail) {
    var player = getPlayerWithMail(mail);
    sendMail(player.mail, "Clef oubliée" , includeWithArgs("front/mail/mailSimple", {
        html: "<h3>Voici ta clef : " + player.keyWithSecurity + "</h3><h4>Tu peux aussi utiliser les liens directs en cliquant sur les icones</h4>",
        urlMail: getUrlMail(player)
    }));
}

function getFullName(mail) {
    if(mail) {
        return getPlayerWithMail(param.mail).fullName;
    }
    return "";
}