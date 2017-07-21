//---------- Detect Device
var isTouchDevice = 'ontouchstart' in window || 'onmsgesturechange' in window;
var isDesktop = $(window).width() != 0 && !isTouchDevice ? true : false;
var isTouchIE = navigator.userAgent.toLowerCase().indexOf('msie') != -1 && navigator.msMaxTouchPoints > 0;
var isIE11 = !!window.MSStream;
var isiPad = navigator.userAgent.indexOf('iPad') != -1;
var isiPhone = navigator.userAgent.indexOf('iPhone') != -1;
var isiPod = navigator.userAgent.indexOf('iPod') != -1;
var isAndroid = navigator.userAgent.indexOf('Android') != -1;
var isIE = navigator.userAgent.toLowerCase().indexOf('msie') != -1 && $(window).width() != 0;
var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

// ----------- Check Device customs
$(document).ready(function () {
    if (!isTouchDevice) {

    }
    if (isDesktop) {

    }
    if (isiPhone) {

    }
    if (isiPad) {

    }
});

$("img.lazyImg").lazyload({
    effect: "fadeIn"
});

AOS.init({
    easing: 'ease-in-out-sine'
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


$('.item-href').on('click', function (event) {
    var target = $($(this).attr('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top - 70
        }, 1000);
    }
});


function ResizeWindows() {
    var Yheight = $(window).height();
    var Xwidth = $(window).width();
    var Portrait = $(window).height() > $(window).width();
    var Landscape = $(window).height() <= $(window).width();
    
    if (Xwidth < 800) {
        $('#mainMenu-mobie ul li a[href^="#"]').on('click', function(event) {

            var target = $($(this).attr('href'));

            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 30
                }, 1000);
            }

        });
    }
    if (Xwidth > 800) {
        $(document).ready(function () {
            var hHeaderMain = $('#header-main').height();
            $(window).bind('scroll', function () {
                var offset = $(document).scrollTop();
                if (offset > (hHeaderMain + 200)) {
                    $('#header-main').addClass('active');
                    // Cache selectors
                    var idCurrent,
                        menuScroll = $("#mainMenu"),
                        menuScrollHeight = menuScroll.outerHeight() + 0,
                        // All list items
                        menuScrollItem = menuScroll.find("a"),
                        // Anchors corresponding to menu items
                        scrollItems = menuScrollItem.map(function () {
                            var item = $($(this).attr("href"));
                            if (item.length) { return item; }

                        });

                    // Bind click handler to menu items
                    // so we can get a fancy scroll animation
                    menuScrollItem.click(function (e) {
                        var href = $(this).attr("href"),
                            offsetTop = href === "#" ? 0 : $(href).offset().top - menuScrollHeight + 1;
                        $('html, body').stop().animate({
                            scrollTop: offsetTop - 5
                        }, 500);
                        e.preventDefault();

                    });

                    // Bind to scroll
                    $(window).scroll(function () {
                        // Get container scroll position
                        var fromTop = $(this).scrollTop() + menuScrollHeight;

                        // Get id of current scroll item
                        var cur = scrollItems.map(function () {
                            if ($(this).offset().top < fromTop)
                                return this;
                        });
                        // Get the id of the current element
                        cur = cur[cur.length - 1];
                        var id = cur && cur.length ? cur[0].id : "";

                        if (idCurrent !== id) {
                            idCurrent = id;
                            // Set/remove active class
                            menuScrollItem
                              .parent().removeClass("active")
                              .end().filter("[href='#" + id + "']").parent().addClass("active");
                        }
                    });
                } else if (offset < (hHeaderMain + 200)) {
                    $('#header-main').removeClass('active');
                }
            });

        });
    }
}

window.onorientationchange = ResizeWindows;
$(window).resize(function () {
    ResizeWindows();
});
ResizeWindows();