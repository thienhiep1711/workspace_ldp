function callPopupRegister(el) {
    $.magnificPopup.open({
        removalDelay: 400,
        items: {
            src: '#popupRegister',
            type: 'inline'
        },
        mainClass: 'mfp-zoom-in',
    });
};

function cusMagnificPopup() {
    $(document).ready(function () {
        //Inline popups effect
        $('.call-inline-pop').magnificPopup({
            removalDelay: 400, //delay removal by X to allow out-animation
            mainClass: 'mfp-zoom-in',
        });
    });
};
cusMagnificPopup();
//mmMenu-----------------
function mMenu() {
    var $menu = $("#mainMenu").clone();
    $menu.attr("id", "my-mobile-menu");
    $menu.mmenu({
        //extensions: ["theme-dark"]
    }); 
};
mMenu();
//Validate contact form
$(document).ready(function () {
    $("#frmContact").validate({
        rules: {
            ctName: {
                required: true
            },
            ctEmail: {
                required: true,
                email: true,
            },
            ctPhone: {
                required: true,
                minlength: 10,
                maxlength: 12,
                number: true,
            },
            ctAddress: {
                required: true
            },
            ctContent: {
                required: true
            },
            ctCapcha: {
                required: true
            },
        },
        messages: {
            ctName: {
                required: "Nhập Tên Của Bạn !",
            },
            ctAddress: {
                required: "Nhập địa chỉ của bạn !",
            },
            ctEmail: {
                required: "Email không được để trống",
                email: "Email không đúng định dạng"
            },
            ctPhone: {
                required: "Bạn cần nhập Số điện thoại",
                minlength: "Số điện thoại tối thiểu 10 số",
                maxlength: "Số điện thoại tối đa 12 số",
                number: "Bạn cần nhập chữ số"
            },
            ctContent: {
                required: "Nhập nội dung !",
            },
            ctCapcha: {
                required: "Nhập mã bảo mật !",
            },
        },
        submitHandler: function () {
            form.submit();
        },
    });
});


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
$(document).ready(function () {
    $("#js-slider-main").owlCarousel({
        nav: true,
        navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
        items: 1,
        lazyLoad: true,
        autoHeight: true,
        loop: true,
    });
});

$(document).ready(function () {
    $("#js-slider-carousel").owlCarousel({
        nav: true,
        navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
        items: 6,
        lazyLoad: true,
        autoHeight: true,
        loop: true,
        margin: 10,
        responsive: {
            0: {
                items: 2,
                nav: false,
                dots: false,
            },
            480: {
                items: 3,
            },
            768: {
                items: 5,
            },
            1024: {
                items: 5,
            },
            1280: {
                items: 6,
            }
        }
    });
});

$(document).ready(function () {
    var sync1 = $("#js-slider-views");
    var sync2 = $("#js-slider-thubs");
    var slidesPerPage = 5; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        nav: true,
        autoplay: false,
        lazyLoad: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
    }).on('changed.owl.carousel', syncPosition);

    sync2.on('initialized.owl.carousel', function () {
        sync2.find(".owl-item").eq(0).addClass("current");
    }).owlCarousel({
        items: slidesPerPage,
        dots: false,
        nav: true,
        lazyLoad: true,
        margin: 10,
        navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
        slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
        responsiveRefreshRate: 100
    }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync2
          .find(".owl-item")
          .removeClass("current")
          .eq(current)
          .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
});
