
function getSerieLumieres(p) {
    var html = "<div class='serieLumieres'>";
    for (var i = 0; i < p.length; i++) {
        html += getLumiere(p.substring(i, i + 1));
    }
    html += "</div>";
    return html;
}


function getLumiere(value) {
    if (value == 'V') {
        return "<div class='lum green'></div>";
    } else if (value == 'D') {
        return "<div class='lum red'></div>";
    } else if (value == 'N') {
        return "<div class='lum yellow'></div>";
    } else {
        return "";
    }
}


function getLumieres(p) {
    return "<div class='lumieres'>" + getLumiere(p[statsColumn.result5]) + getLumiere(p[statsColumn.result4]) + getLumiere(p[statsColumn.result3]) + getLumiere(p[statsColumn.result2]) + getLumiere(p[statsColumn.result1]) + "</div>";
}