function loadPage(url = "", returnedJson = false) {
    NProgress.start();

    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            if (returnedJson) {
                var newUrl = BASE_URL + "/" + data.redirect;
                window.history.pushState(null, '', newUrl);

                loadPage(newUrl);

                if (data.success) {
                    showToast("success", data.message)
                } else {
                    showToast("error", data.message)
                }

                NProgress.done();
            } else {
                $('#main-wrapper').removeClass('show-sidebar').addClass('mini-sidebar');
                $('#content').html(data);
                $('html, body').animate({
                    scrollTop: 0
                }, 'fast');
            }
            NProgress.done();
        },
        error: function () {
            alert('Terjadi kesalahan saat memuat halaman.');
            NProgress.done();
        }
    });
}

$(document).on('click', '[navigate]', function (e) {
    e.preventDefault();
    var url = $(this).attr('href');

    if (navigator.onLine) {
        window.history.pushState(null, '', url);
        loadPage(url);
    } else {
        lostInternet();
    }
});

$(document).on('click', '[navigate-delete]', function (e) {
    e.preventDefault();
    var url = $(this).attr('href');

    if (navigator.onLine) {
        window.history.pushState(null, '', url);
        loadPage(url, true);
    } else {
        lostInternet();
    }
});

$(window).on('popstate', function () {
    if (navigator.onLine) {
        loadPage(window.location.pathname);
    } else {
        lostInternet();
    }
});

function showValidationErrors(errors) {
    $('.form-error').remove();

    $.each(errors, function (field, messages) {
        var input = $('[name="' + field + '"]');

        if (input.length && input.attr('type') === 'radio') {
            var parentDiv = input.closest('.mb-3');
            if (parentDiv.length) {
                parentDiv.append('<span class="form-error" style="color: red;">' + messages[0] + '</span>');
            }
        } else if (input.length) {
            input.after('<span class="form-error" style="color: red;">' + messages[0] + '</span>');
        }
    });
}

defaultSubmitBtnText = $('button[type="submit"]').text()

$(document).on('submit', 'form[form-navigate]', function (e) {

    e.preventDefault(); // Mencegah default form submit (reload halaman)
    var form = $(this);
    var url = form.attr('action'); // URL dari action form
    var formData = form.serialize(); // Serialize data form untuk dikirim via POST

    var submitButton = form.find('button[type="submit"]');
    var buttonText = submitButton.text(); // Menyimpan teks asli tombol submit

    if (defaultSubmitBtnText == "") {
        defaultSubmitBtnText = buttonText
    }

    console.log(buttonText)

    if (navigator.onLine) {
        NProgress.start();
        submitButton.addClass('disabled');
        submitButton.html(
            '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> Memproses ...'
        );

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            success: function (response) {
                if (response.success) {
                    console.log(response.message)
                    showToast("success", response.message);

                    var newUrl = BASE_URL + "/" + response.redirect;
                    window.history.pushState(null, '', newUrl);

                    loadPage(newUrl);
                } else {
                    showToast("error", 'Terjadi kesalahan: ' + response.message);
                    NProgress.done();
                }

                // submitButton.removeClass('disabled');
                // submitButton.html(defaultSubmitBtnText);
            },
            error: function (xhr) {
                var response = xhr.responseJSON;

                if (response && response.errors) {
                    // Jika error disebabkan oleh validasi, tampilkan pesan error
                    showValidationErrors(response.errors);
                } else {
                    alert('Terjadi kesalahan saat mengirim data.');
                    showToast("error", 'Terjadi kesalahan, Coba beberapa saat lagi atau Hubungi Tim Pengembang');
                }
                NProgress.done();

                submitButton.removeClass('disabled');
                submitButton.html(defaultSubmitBtnText);
            }
        });
    } else {
        lostInternet();
    }
});

function lostInternet() {
    alert("Koneksi internet terputus. Silakan periksa koneksi Anda dan coba lagi.")
}

