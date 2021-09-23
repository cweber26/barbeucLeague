function updatePriority() {
    deleteOldPriority();
    saveNewPriority();
}

function deleteOldPriority() {
    if (isTheMatchInProgress()) {
        playersInTheMatchMail().forEach(function (m) {
                deletePriorityWithMail(m);
            }
        );
    }
}

function saveNewPriority() {
    if (isTheMatchInProgress()) {
        playersInWaitingListMail().forEach(function (m) {
                addPriorityWithMail(m);
            }
        );
    } else {
        playersInTheMatchMail().forEach(function (m) {
                addPriorityWithMail(m);
            }
        );
    }

}

function deletePriorityWithMail(mail) {
    updatePriorityWithMail(mail, false);
}


function addPriorityWithMail(mail) {
    updatePriorityWithMail(mail, true);
}

function updatePriorityWithMail(mail, value) {
    Logger.log("updatePriorityWithMail with mail %s and value %s", mail, value);
    var player = getPlayerWithMail(mail);
    sheetTeam.getRange(player.row, playerColumnRange.isPrioritary).setValue(value);
}