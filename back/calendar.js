function createEventIfMatchIsFull() {
    if (!isTheMatchCancel() && creationGoogleEvent=="" && numberPlayerInMatch == numberPlayerMatch) {
        sendMatchCompletMail();
        createCalendarEvent();
    }
}

function updateCalendarEvent() {
    if(!isTheMatchCancel() && creationGoogleEvent!=""){
        deleteCalendarEvent();
        createCalendarEvent();
    }
}

function createCalendarEvent() {
    if (creationGoogleEvent=="") {
        var calendar = CalendarApp.getDefaultCalendar();
        var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
        var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
        var mails = matchPlayerMailList;
        if (modeTest) {
            mails = mailTester;
        }
        var event = calendar.createEvent(applicationName, begin, end, {location: nextMatchStadiumAddress, guests: mails, sendInvites: false});

        if(mails.includes("cedric.weber@decathlon.com")){
            event.setMyStatus(CalendarApp.GuestStatus.YES);
        }
        creationGoogleEvent=now();
        sheetParameters.getRange(getRowParameter("creationGoogleEvent"), 2).setValue(now());
    }
}

function deleteCalendarEvent() {
    var calendar = CalendarApp.getDefaultCalendar();
    var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
    var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
    var events = calendar.getEvents(begin, end);
    for (var i in events) {
        if (events[i].getTitle() == applicationName) {
            events[i].deleteEvent();
        }
    }
    creationGoogleEvent="";
    sheetParameters.getRange(getRowParameter("creationGoogleEvent"), 2).clearContent();
}