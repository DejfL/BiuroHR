$('.SendEmail').click(function() {
    submitForm();
});

function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $('#subject').val();
    var message = $("#message").val();

    $('.validation').each(function() {
        if (!$(this).hasClass('collapse')) {
            $(this).addClass('collapse');
        }
    });

    if (name == "" || name.length < 4) {
        $('#validationName').removeClass('collapse');
        return;
    }
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        $('#validationEmail').removeClass('collapse');
        return;
    }
    if (subject == "" || subject.length < 4) {
        $('#validationSubject').removeClass('collapse');
        return;
    }
    if (message == "") {
        $('#validationMessage').removeClass('collapse');
        return;
    }
    Wyslij(name, email, subject, message);
}

function Wyslij(name, email, subject, message) {
    var divToBeWorkedOn = "#AjaxPlaceHolder";
    var webMethod = "http://pomoc.konar.pl:69/WebService.asmx/Wyslij";
    var parameters = "{'emailDoKogo':'" + 'a.bociaga@biuro-hr.pl' + "','nazwa':'" + name + "','emailOdKogo':'" + email + "','temat':'" + subject + "','wiadomosci':'" + message + "'}";

    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            console.log(result);
            czysc();
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function czysc() {
    $("#name").val('');
    $("#email").val('');
    $('#subject').val('');
    $("#message").val('');
}