//Menu Sidebar Mobie effect
$(document).ready(function () {
    var overlay = $('.sidebar-overlay');
    $('.sidebar-toggle').on('click', function () {
        var sidebar = $('#sidebar');
        sidebar.toggleClass('open');
        overlay.addClass('active');
    });
    overlay.on('click', function () {
        $(this).removeClass('active');
        $('#sidebar').removeClass('open');
    });
    $('.nav-mobie li.has-sub>.a-open-down').on('click', function () {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        }
        else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    });
});

$("img.lazyImg").lazyload({
    effect: "fadeIn"
});


//Scroll Top
function cusScrollTop () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#scrollTop').fadeIn(200);
        } else {
            $('#scrollTop').fadeOut(200);
        }
    });
    $('#scrollTop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300);

    });
};

cusScrollTop();

