$(document).ready(function () {
    var sync1 = $("#slide_sync1");
    var sync2 = $("#thub_sync2");

    sync1.owlCarousel({
        singleItem: true,
        slideSpeed: 1000,
        navigation: true,
        pagination: false,
        navigationText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
        lazyLoad: true,
        autoPlay: 4000,
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
    });

    sync2.owlCarousel({
        items: 8,
        itemsDesktop: [1199, 8],
        itemsDesktopSmall: [979, 6],
        itemsTablet: [768, 5],
        itemsMobile: [479, 4],
        pagination: false,
        lazyLoad: true,
        navigation: true,
        navigationText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#thub_sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");
        if ($("#thub_sync2").data("owlCarousel") !== undefined) {
            center(current);
        }
    }

    $("#thub_sync2").on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                var found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2);
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1]);
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1);
        }
    }

    //Gallery effect colection
    $('.callFullScreen').magnificPopup({
        type: 'image',
        removalDelay: 500, //delay removal by X to allow out-animation
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        callbacks: {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            },
            //open: setInterval(function () {
            //    $.magnificPopup.instance.next()
            //}, 5000),
            buildControls: function () {
                // re-appends controls inside the main container
                this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
            },
        },
        closeOnContentClick: true,
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });

    //NiceScroll
    var windowsize = $(window).width();
    if (windowsize > 800) {
        $(".thub-gallery").niceScroll({
            touchbehavior: true,
            cursorcolor: "#999",
            cursoropacitymax: 1,
            cursorwidth: 5,
            cursorborder: "0px",
            cursorborderradius: "4px",
            background: "#f8f8f8",
            autohidemode: false
        });

    };

});