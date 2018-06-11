/**
 * Created by chenruixuan on 15/9/13.
 */
var toast = {};
toast.init = function () {
    $('body').append('<div class="toast"></div>');
}
toast.show = function (message, time) {
    if (typeof(time) == 'undefined') {
        time = 2000;
    } else {
        time = time * 1000;
    }
    $('.toast').show().css({'opacity': 1});
    $('.toast').text(message);
    setTimeout(function () {
        $('.toast').hide().css('opacity', 0);
    }, time);
}

$(function () {
    toast.init();
});

module.exports = toast;
