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

function ResizeWindows() {
    var Yheight = $(window).height();
    var Xwidth = $(window).width();
    var Portrait = $(window).height() > $(window).width();
    var Landscape = $(window).height() <= $(window).width();
    var RatioScreeen = Yheight / Xwidth;
    var RatioIMG = 744 / 1366;
    var newXwidth;
    var newYheight;

    var overlayPage = $('#overlay');

    if (Xwidth < 800) {
        $(function searchMobie() {
            var hHeaderMobie = $('#header-sidebar').height();


            $(document).ready(function () {
                $('.button-call-search').on('click', function () {
                    $(".boxMobieSearch").addClass("open");
                    overlayPage.fadeIn();
                    $('#iptSearchMobie').blur(function () {
                        $('#iptSearchMobie').focus();
                    });
                });
                $('.bt-close-search-mb').on('click', function () {
                    $(".boxMobieSearch").removeClass("open");
                    overlayPage.fadeOut();
                });
                overlayPage.on('click', function () {
                    $(".boxMobieSearch").removeClass("open");
                    overlayPage.fadeOut();
                });

            });
          
        });

        
    }
}

window.onorientationchange = ResizeWindows;
$(window).resize(function () {
    ResizeWindows();
});
ResizeWindows();