function controlAndCancelOrRelaunch() {
    if(isTheMatchInProgress()){
        if ((numberPlayerInMatch > 0 && numberPlayerInMatch < minPlayerForAutoCancelation)) {
            cancelMatchAndSendMail(true);
        } else if (numberPlayerInMatch >= minPlayerForAutoCancelation && numberPlayerInMatch < numberPlayerMatch) {
            relaunchInscriptionMailForPlayersWithoutAnswer();
        }
    }
}