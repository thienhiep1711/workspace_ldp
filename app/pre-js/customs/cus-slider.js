function sliderAll() {
    $(document).ready(function () {
        //Slider main
        $("#sliderMain").owlCarousel({
            navigation: true, // Show next and prev buttons
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true,
            lazyLoad: true,
            //transitionStyle: "fade",
            navigationText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
            pagination: true,
        });


        //Slider casure
        $("#sliderBottom").owlCarousel({
            items: 6,
            itemsCustom: false,
            itemsDesktop: [1105, 5],
            itemsDesktopSmall: [1024, 5],
            itemsTablet: [768, 4],
            itemsTabletSmall: false,
            itemsMobile: [479, 2],
            navigation: true,
            autoPlay: 7000,
            stopOnHover: true,
            pagination: false,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1000,
            lazyLoad: true,
            transitionStyle: false,
            navigationText: ["<i class='fa fa-angle-left'></i>",
             "<i class='fa fa-angle-right'></i>"]
        });

        //NiceScroll
        //$(".my-div").niceScroll({
        //    touchbehavior: true,
        //    cursorcolor: "#ec1f24",
        //    cursoropacitymax: 1,
        //    cursorwidth: 3,
        //    cursorborder: "0px",
        //    cursorborderradius: "0px",
        //    background: "#f8f8f8",
        //    autohidemode: false
        //});

        //Inline popups effect
        $('.call-inline-pop').magnificPopup({
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    });
    
};

sliderAll();