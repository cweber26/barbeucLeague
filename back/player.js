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
    player.mail = playerLine[0];
    player.key = playerLine[1];
    player.keyWithSecurity = (playerLine[1] * 2 + 10);
    player.firstName = playerLine[2];
    player.lastName = playerLine[3];
    player.fullName = playerLine[4];
    player.shortfullName = playerLine[5];
    player.nickName = playerLine[6];
    player.isUnavailable = playerLine[7];
    player.endDateOfUnavailibility = playerLine[8];
    player.mondaySelected = playerLine[9];
    player.tuesdaySelected = playerLine[10];
    player.wednesdaySelected = playerLine[11];
    player.thursdaySelected = playerLine[12];
    player.fridaySelected = playerLine[13];
    player.site = playerLine[14];
    player.position = playerLine[15];
    player.levelDribble = playerLine[16];
    player.levelFrappe = playerLine[17];
    player.levelDefense = playerLine[18];
    player.haveDoneAutoEvaluation = playerLine[19];
    player.haveAlreadyAnswer = playerLine[20];
    player.prioValue = playerLine[21];
    player.isAdmin = playerLine[22];
    player.isPrioritary = playerLine[23];
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
        if (player[8] && player[8].valueOf() < nextMatchDate.valueOf()) {
            sheetTeam.getRange(Number(i) + 3, 8).setValue(false);
            sheetTeam.getRange(Number(i) + 3, 9).clearContent();
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

        var oldFirstName = sheetTeam.getRange(row, 3).getValue();
        var oldLastName = sheetTeam.getRange(row, 4).getValue();
        if (oldFirstName != firstName || oldLastName != lastName) {
            updateNameProfil(oldFirstName, firstName, oldLastName, lastName, row);
        }

        if (nickName) {
            sheetTeam.getRange(row, 7).setValue(nickName)
        }
        if (unavailable) {
            sheetTeam.getRange(row, 8).setValue(true);
            sheetTeam.getRange(row, 9).setValue(new Date(Utilities.formatDate(endDate, "Europe/Paris", "MM/dd/yy")));
        } else {
            sheetTeam.getRange(row, 8).setValue(false);
            sheetTeam.getRange(row, 9).setValue("");
        }
        if (monday) {
            sheetTeam.getRange(row, 10).setValue(true);
        } else {
            sheetTeam.getRange(row, 10).setValue(false);
        }
        if (tuesday) {
            sheetTeam.getRange(row, 11).setValue(true);
        } else {
            sheetTeam.getRange(row, 11).setValue(false);
        }
        if (wednesday) {
            sheetTeam.getRange(row, 12).setValue(true);
        } else {
            sheetTeam.getRange(row, 12).setValue(false);
        }
        if (thursday) {
            sheetTeam.getRange(row, 13).setValue(true);
        } else {
            sheetTeam.getRange(row, 13).setValue(false);
        }
        if (friday) {
            sheetTeam.getRange(row, 14).setValue(true);
        } else {
            sheetTeam.getRange(row, 14).setValue(false);
        }
        if (site) {
            sheetTeam.getRange(row, 15).setValue(site);
        }
        if (position) {
            sheetTeam.getRange(row, 16).setValue(position);
        }
        if (levelDribble) {
            sheetTeam.getRange(row, 17).setValue(levelDribble);
        }
        if (levelFrappe) {
            sheetTeam.getRange(row, 18).setValue(levelFrappe);
        }
        if (levelDefense) {
            sheetTeam.getRange(row, 19).setValue(levelDefense);
        }
        if (levelDribble && levelFrappe && levelDefense) {
            sheetTeam.getRange(row, 20).setValue(true);
        } else {
            sheetTeam.getRange(row, 20).setValue(false);
        }
        if(priorityLevel)  {
            sheetTeam.getRange(row, 22).setValue(priorityLevel)
        }
        if(isAnAdmin) {
            sheetTeam.getRange(row, 23).setValue(true)
        } else {
            sheetTeam.getRange(row, 23).setValue(false);
        }
        if(haveAPriority) {
            sheetTeam.getRange(row, 24).setValue(true)
        } else {
            sheetTeam.getRange(row, 24).setValue(false);
        }

        if(user.oldMail != mail) {
            sheetTeam.getRange(row, 1).setValue(mail);
            updateMailProfilInInscriptionSheet(user.oldMail, mail);
            return {mail: mail, key: sheetTeam.getRange(row, 2).getValue() * 2 + 10};
        }

    } else {
        throw "clef non valide";
    }
}

function getRowSheetTeamWithMail(mail) {
    var teamList = playersTeamList;
    for (var i = 0; i < teamList.length; i++) {
        if (teamList[i][0] == mail) {
            return i + 3;
        }
    }
}


// met à jour le nom complet modifié dans la page des résultats afin que les stats fonctionnent toujours
function updateNameProfil(oldFirstName, firstName, oldLastName, lastName, row) {
    if (firstName != oldFirstName) {
        sheetTeam.getRange(row, 3).setValue(firstName);
    } else {
        firstName = oldFirstName;
    }
    if (lastName != oldLastName) {
        sheetTeam.getRange(row, 4).setValue(lastName);
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

// met à jour le mail et la clef dans la page d'inscriptions
function updateMailProfilInInscriptionSheet(oldMail, newMail) {
    var rangeInscriptionMail = sheetInscription.getRange(2, 1, sheetInscription.getLastRow(), 1);
    var inscriptionMailValues = rangeInscriptionMail.getValues();
    replaceInSheet(inscriptionMailValues, oldMail, newMail);
    rangeInscriptionMail.setValues(inscriptionMailValues);
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
        return "Le mail est déjà utilisé";
    }
    var row = sheetTeam.getRange("A3:A").getValues().filter(String).length + 3;

    sheetTeam.getRange(row, 1).setValue(user.mail);
    sheetTeam.getRange(row, 3).setValue(user.prenom);
    sheetTeam.getRange(row, 4).setValue(user.nom);
    sheetTeam.getRange(row, 7).setValue(user.surnom);

    var unavailable = user.indispo;
    var dateEuropeFormat = user.indispoDate;
    var year = dateEuropeFormat.substring(6, 10);
    var month = dateEuropeFormat.substring(3, 5);
    var day = dateEuropeFormat.substring(0, 2);
    var endDate = new Date(year, month - 1, day);
    if (unavailable) {
        sheetTeam.getRange(row, 8).setValue(true);
        sheetTeam.getRange(row, 9).setValue(new Date(Utilities.formatDate(endDate, "Europe/Paris", "MM/dd/yy")));
    } else {
        sheetTeam.getRange(row, 8).setValue(false);
        sheetTeam.getRange(row, 9).setValue("");
    }

    if (user.lundi) {
        sheetTeam.getRange(row, 10).setValue(true);
    } else {
        sheetTeam.getRange(row, 10).setValue(false);
    }
    if (user.mardi) {
        sheetTeam.getRange(row, 11).setValue(true);
    } else {
        sheetTeam.getRange(row, 11).setValue(false);
    }
    if (user.mercredi) {
        sheetTeam.getRange(row, 12).setValue(true);
    } else {
        sheetTeam.getRange(row, 12).setValue(false);
    }
    if (user.jeudi) {
        sheetTeam.getRange(row, 13).setValue(true);
    } else {
        sheetTeam.getRange(row, 13).setValue(false);
    }
    if (user.vendredi) {
        sheetTeam.getRange(row, 14).setValue(true);
    } else {
        sheetTeam.getRange(row, 14).setValue(false);
    }
    sheetTeam.getRange(row, 15).setValue(user.site);
    sheetTeam.getRange(row, 16).setValue(user.poste);
    sheetTeam.getRange(row, 17).setValue(user.dribble);
    sheetTeam.getRange(row, 18).setValue(user.frappe);
    sheetTeam.getRange(row, 19).setValue(user.defense);
    sheetTeam.getRange(row, 20).setValue(true);
    sheetTeam.getRange(row, 22).setValue(user.priorityLevel)

    if (user.isAnAdmin) {
        sheetTeam.getRange(row, 23).setValue(true)
    } else {
        sheetTeam.getRange(row, 23).setValue(false);
    }
    if (user.haveAPriority) {
        sheetTeam.getRange(row, 24).setValue(true)
    } else {
        sheetTeam.getRange(row, 24).setValue(false);
    }

    playersTeamList = sheetTeam.getRange(3, 1, sheetTeam.getRange("A3:A").getValues().filter(String).length, sheetTeam.getLastColumn()).getValues();
    var player = getPlayerWithMail(user.mail);
    sendMailToNewUser(player);
    sendMailToAdminAboutNewPlayer(user.mail, creatorMail);
}

function sendMailToNewUser(player) {
    sendMail(player.mail, "Bienvenue " , includeWithArgs("front/mail/mailNewProfil", {
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
        html: "<h3>Clef : " + player.keyWithSecurity + "</h3><h4>Les liens ci desssous fonctionnent aussi</h4>",
        urlMail: getUrlMail(player)
    }));
}

function getFullName(mail) {
    if(mail) {
        return getPlayerWithMail(param.mail).fullName;
    }
    return "";
}