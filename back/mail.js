function sendMailSimple(subject, contentHtml) {
    var mails = parametersMap.get("adminMailList").split(',');
    for (var i in mails) {
        var player = getPlayerWithMail(mails[i]);
        sendMailForAnAdmin(player, subject, contentHtml);
    }
}

function sendMailForAnAdmin(player, subject, contentHtml) {
    var body = includeWithArgs("front/mail/mailSimple", {
        html: contentHtml,
        urlMail: getUrlMail(player)
    });
    sendMail(player.mail, subject, body);
}

function sendMail(mail, subject, html) {
    if (isParameterFalse("modeTest")) {
        MailApp.sendEmail({
            to: mail,
            subject: parametersMap.get("applicationName") + " " + subject,
            htmlBody: getFinalBody(mail, html)
        });
    } else {
        sendTestMail(mail, subject, html);
    }
}

function getFinalBody(mail, html) {
    return html;
}

function sendTestMail(mail, subject, html) {
    if (mail.indexOf(parametersMap.get("mailTester")) > -1) {
        MailApp.sendEmail({
            to: parametersMap.get("mailTester"),
            subject: "⚠️Test⚠️ " + parametersMap.get("applicationName") + " " + subject,
            htmlBody: getFinalBody(mail, html)
        });
    }
}

function getUrlMail(player) {
    var urlForm = "https://script.google.com/macros/s/AKfycbw7SggSd_5zNsbmfZ3nUU_nr2cXfRYIgntGSLh2n3sNhOJyUDs/exec";
    var urlFormPage = "?page=";
    var urlFormMail = "&mail=";
    var urlFormKey = "&key=";
    var urlFormAnswer = "&answer=";
    var urlCarSharing = "&carSharing="
    return {
        compo: urlForm + urlFormPage + "compo" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity,
        stat: urlForm + urlFormPage + "stat" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity,
        record: urlForm + urlFormPage + "record" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity,
        resultat: urlForm + urlFormPage + "resultat" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity,
        profil: urlForm + urlFormPage + "profil" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity,
        inscription: urlForm + urlFormPage + "inscription" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Oui",
        desinscription: urlForm + urlFormPage + "inscription" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Non",
        confirmationCarAlone: urlForm + urlFormPage + "confirmation" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Oui" + urlCarSharing + "alone",
        confirmationCarSharing: urlForm + urlFormPage + "confirmation" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Oui" + urlCarSharing + "sharing",
        confirmationCarNeed: urlForm + urlFormPage + "confirmation" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Oui" + urlCarSharing + "need",
        deconfirmation: urlForm + urlFormPage + "confirmation" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Non"
    };
}

function getStadiumInfo() {
    return {
        name: parametersMap.get("nextMatchStadiumName"),
        address: parametersMap.get("nextMatchStadiumAddress"),
        urlAddress: parametersMap.get("nextMatchStadiumUrlMaps"),
        cost: parametersMap.get("nextMatchStadiumCost"),
        reservationName: parametersMap.get("nextMatchReservationName"),
        beginGameHour: parametersMap.get("nextMatchBeginGameHour"),
        infoGame: parametersMap.get("nextMatchComment")
    };
}