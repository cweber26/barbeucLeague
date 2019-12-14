var currentWeekDay = parseInt(Utilities.formatDate(new Date(), "Europe/Paris", "u"));
var nextMatchDateInFrench = LanguageApp.translate(Utilities.formatDate(nextMatchDate,  "Europe/Paris", "EEEE dd MMMM"), "en", "fr");
var scheduleValues = sheetSchedule.getRange(1, 1).getDataRegion().getValues();

function setNextMatchDate() {
    //lundi = 1 , dimanche = 7
    for (var i = 1; i <= 7; i++) {
        var dayToTest = (currentWeekDay+i);
        if(isADayWithMatch(dayToTest)){
            nextMatchDate=nextDay(dayToTest);
            updateParameter("nextMatchDate", nextDay(dayToTest));
            return;
        }
    }
}

function isADayWithMatch(dayNumber) {
    if (dayNumber > 7) {
        dayNumber -= 7;
    }
    return (scheduleValues[1][dayNumber]);
}

function nextDay(weekDay) {
    var cptDay;
    if (currentWeekDay < weekDay) {
        cptDay = weekDay - currentWeekDay;
    } else if (currentWeekDay == weekDay) {
        cptDay = 7;
    } else {
        cptDay = (7 - (currentWeekDay - weekDay));
    }
    return Utilities.formatDate(new Date(Date.now() + ((cptDay * 1000) * 60 * 60 * 24)), "GMT", "MM/dd/yy");
}

function matchDayGapInFrench(withPronom) {
    var daysDiff = parseInt((getDateAt000000(nextMatchDate)-getDateAt000000(new Date()))/ (1000*60*60*24));
    switch (daysDiff) {
        case 0:
            if (withPronom) {
                return "de ce midi";
            } else {
                return "midi";
            }
        case 1:
            if (withPronom) {
                return "de demain";
            } else {
                return "demain";
            }
        default:
            if (withPronom) {
                return "du " + nextMatchDateInFrench;
            } else {
                return nextMatchDateInFrench;
            }
    }
}

function getDateFormat(date) {
    if (date != "") {
        return Utilities.formatDate(new Date(date), "Europe/Paris", "dd/MM/yy");
    } else {
        return "";
    }
}

function getDateTimeFormat(date) {
    if (date != "") {
        return Utilities.formatDate(new Date(date), "Europe/Paris", "dd/MM/yy HH:mm:ss");
    } else {
        return "";
    }
}


function getDateTimeFormatForForum(date) {
    if (date != "") {
        return LanguageApp.translate(Utilities.formatDate(date,  "Europe/Paris", "EEEE dd MMMM ' at ' HH:mm"),"en","fr");
    } else {
        return "";
    }
}

function getDateAt000000(date) {
    if (date != "") {
        return new Date(Utilities.formatDate(new Date(date), "Europe/Paris", "MM/dd/yyyy"));
    } else {
        return "";
    }
}

function now() {
    return new Date(Date.now());
}