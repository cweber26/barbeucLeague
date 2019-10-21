function controlAndCancelOrRelaunch() {
    if (isParameterBlank("controlDone")) {
        if(!isMatchCancel()){
            if ((parametersMap.get("numberPlayerInMatch") > 0 && parametersMap.get("numberPlayerInMatch") < parametersMap.get("minPlayerForAutoCancelation"))) {
                cancelMatchAndSendMail(true);
                sendMailSimple("Pense à annuler la réservation du match " + matchDayGapInFrench(true), "<h2>Pense à annuler la réservation " + parametersMap.get("nextMatchStadiumName") + "</h2>");

            } else if (parametersMap.get("numberPlayerInMatch") >= parametersMap.get("minPlayerForAutoCancelation") && parametersMap.get("numberPlayerInMatch") < parametersMap.get("numberPlayerMatch")) {
                sendInscriptionMailForAPrio(2, false, true);
            }
        }
        updateParameterValue("controlDone", now());
    }
}