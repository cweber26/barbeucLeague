function controlAndCancelOrRelaunch() {
    if (controlDone=="") {
        if(!isTheMatchCancel()){
            if ((numberPlayerInMatch > 0 && numberPlayerInMatch < minPlayerForAutoCancelation)) {
                cancelMatchAndSendMail(true);
                sendMailSimple("Pense à annuler la réservation du match " + matchDayGapInFrench(true), "<h2>Pense à annuler la réservation " + nextMatchStadiumName + "</h2>");

            } else if (numberPlayerInMatch >= minPlayerForAutoCancelation && numberPlayerInMatch < numberPlayerMatch) {
                sendInscriptionMailForAPrio(2, false, true);
            }
        }
        updateParameter("controlDone", now());
    }
}