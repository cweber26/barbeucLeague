
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
    return "<div class='lumieres'>" + getLumiere(p[19]) + getLumiere(p[20]) + getLumiere(p[21]) + getLumiere(p[22]) + getLumiere(p[23]) + "</div>";
}