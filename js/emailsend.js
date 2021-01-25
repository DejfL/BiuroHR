$('.SendEmail').click(function() {
    DaneOsobowe();
});

function DaneOsobowe() {
    Swal.fire({
        title: 'Zgoda na przetważanie danych osobowych',
        text: "Wyrażam zgodę na przetwarzanie danych osobowych zgodnie z obecnie obowiązującym prawem, w związku z wysyłaniem zapytania przez formularz kontaktowy. Podanie przedmiotowych danych jest wyłącznie dobrowolne, jednak niezbędne do przetworzenia zapytania. Moje dane osobowe będą przetwarzane do czasu cofnięcia zgody lub przez okres niezbędny do ustalenia, dochodzenia lub obrony roszczeń. Oświadczam, że zostałem poinformowany, iż przysługuje mi w każdym czasie prawo dostępu do swoich danych, możliwości ich sprostowania, przeniesienia danych, żądania usunięcia lub ograniczenie przetwarzania danych osobowych, sprzeciwu (gdy podstawą przetwarzania jest prawnie uzasadniony interes administratora), lub cofnięcia zgody. Administratorem danych osobowych jest BIURO-HR Usługi Kadrowo-Płacowe Anna Bociąga 42-141 Przystajń Górki 12, NIP 574-190-86-69,. Nasze dane kontaktowe: e-mail: a.bociaga@biuro-hr.pl , telefon: 729-922-935",
        icon: 'warning',
        confirmButtonColor: '#e0c434',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Zatwierdź',
    }).then((result) => {
        if (result.isConfirmed) {
            //submitForm();
        }
    })
}

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