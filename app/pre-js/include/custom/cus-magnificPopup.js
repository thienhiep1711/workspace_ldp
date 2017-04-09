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
cusMagnificPopup();