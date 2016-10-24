$( ".donforms" ).on('submit', function( event ) {
    var $el = $(this);
    function message(msg, type) {
      $el.children('.alert').remove();
      if(!type) type = 'info';
      $el.prepend('<div class="alert alert-dismissible alert-' + type + '"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + msg + '</div>');
    }
    event.preventDefault();
    var $form = $(this),
        data = $form.serialize(),
        $input = $form.find('input, select, textarea').prop('disabled', 1),
        $btn = $form.find('button').button('loading');

    $form.find('.has-error').removeClass('has-error');

    $.ajax({
        url: $form.attr("action"),
        type: 'post',
        data: data,
        accepts: {
            json: 'application/json'
        },
    })
    .always(function(data) {
        $input.prop('disabled', 0);
        $btn.button('reset');
        if (typeof Recaptcha != "undefined") {
            Recaptcha.reload();
        }
        $('html,body').animate({ scrollTop: $form.offset().top - $('#navbar').outerHeight() - 15 }, 1000);
    })
    .done(function(data) {
        if(data.status == 'error') {
            //message(data.message, 'danger');
            message('Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut.', 'danger');
            for (var i = 0; i < data.errors.length; i++) {
              $('#' + data.errors[i].field).parent().addClass('has-error');
            }
            $('.has-error').find('input, select, textarea').focus();
        } else {
            $form[0].reset();
            message('Ihre Anfrage wurde gesendet.', 'success');
            $(document).trigger('app:user'); // to re-populate user-details
        }
    })
    .fail(function(data) {
        message('Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut.', 'danger');
        //message(data.message, 'danger');
    });
});