
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
    return "<div class='lumieres'>" + getLumiere(p[statsColumnRange.result5]) + getLumiere(p[statsColumnRange.result4]) + getLumiere(p[statsColumnRange.result3]) + getLumiere(p[statsColumnRange.result2]) + getLumiere(p[statsColumnRange.result1]) + "</div>";
}