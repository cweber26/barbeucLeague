function include(fileName) {
    return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

function includeWithArgs(fileName, argsObject) {
    var tmp = HtmlService.createTemplateFromFile(fileName);
    if(argsObject) {
        var keys = Object.keys(argsObject);
        keys.forEach(function(key) {
            tmp[key] = argsObject[key];
        })
    }
    return tmp.evaluate().getContent();
}

function render(fileName, tabTitle, argsObject) {
    var tmp = HtmlService.createTemplateFromFile(fileName);
    if(argsObject) {
        var keys = Object.keys(argsObject);
        keys.forEach(function(key) {
            tmp[key] = argsObject[key];
        })
    }
    return tmp.evaluate().setTitle(tabTitle).setFaviconUrl("https://i.ibb.co/9csrcMx/favicon.png").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
