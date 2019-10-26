function createEventIfMatchIsFull() {
    if (isTheMatchInProgress() && creationGoogleEvent=="" && numberPlayerInMatch == numberPlayerMatch) {
        sendMatchCompletMail();
        createCalendarEvent();
    }
}

function updateCalendarEvent(newMail, oldMail) {
    if(isTheMatchInProgress() && creationGoogleEvent!=""){
        var event = getCalendarEvent();
        if(event) {
            event.removeGuest(oldMail);
            event.addGuest(newMail);
        }
        updateParameter("creationGoogleEvent", now());
    }
}

function createCalendarEvent() {
    if (creationGoogleEvent=="") {
        var calendar = CalendarApp.getDefaultCalendar();
        var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
        var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
        var mails = matchPlayerMailList;
        if (isTest()) {
            mails = mailTester;
        }
        var event = calendar.createEvent(applicationName, begin, end, {location: nextMatchStadiumAddress, guests: mails, sendInvites: false});

        if(mails.includes("cedric.weber@decathlon.com")){
            event.setMyStatus(CalendarApp.GuestStatus.YES);
        }
        updateParameter("creationGoogleEvent", now());
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
    clearParameter("creationGoogleEvent");
}

function getCalendarEvent() {
    var calendar = CalendarApp.getDefaultCalendar();
    var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
    var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
    var events = calendar.getEvents(begin, end);
    for (var i in events) {
        if (events[i].getTitle() == applicationName) {
            return events[i];
        }
    }
}