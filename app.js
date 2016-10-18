/***************************************************
 * urlParams stuff
 * via http://stackoverflow.com/a/2880929/1406873
**/
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();
/** end of urlParams stuff
 ***************************************************
**/

$.each(['stamp1', 'stamp2'], function(index, key) {
  if (urlParams[key]) {
    $('#' + key).val(urlParams[key]);
  }
});

function filterNow(input) {
  return input === 'now' ? moment().format() : input;
}

function calculate_elapsed() {
  var stamp1 = filterNow($('#stamp1').val());
  var stamp2 = filterNow($('#stamp2').val());
  var elapsed = Math.abs(moment(stamp1).diff(moment(stamp2))/1000) + " seconds";
  $('#result').text(elapsed);
}

if (urlParams['stamp1'] && urlParams['stamp2']) {
  calculate_elapsed();
}

$('#submit').click(calculate_elapsed);

