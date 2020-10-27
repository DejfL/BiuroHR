$(".buttonFront").click(function() {

    var $id = $(this).attr('id');
    var $el;

    if ($id == "uslugiFront") {
        $el = $("#Uslugi");

    } else if ($id == "kontaktFront") {
        $el = $("#Kontakt");
    } else {
        return;
    }

    scrol($el);
})


function scrol(el) {
    $('html, body').stop().animate({
        scrollTop: $($(el)).offset().top
    }, 1500, 'easeInOutExpo');
}