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