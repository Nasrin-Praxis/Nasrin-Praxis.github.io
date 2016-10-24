// MailChimp Ajax Subscribe Form
(function($) {
  $.fn.mailchimpForm = (function() {
    var $form = $(this);
    
    function notify(message, level) {
      if(!level) {
        level = 'info';
      }
      var alerter = $form.find('.alert');
      if(!alerter.length) {
        $form.prepend('<div class="alert"/>');
        alerter = $form.find('.alert');
      }
      $(alerter).html(message).attr('class', 'alert alert-'+level);
    }
    
    $form.submit(function(e) {
      e.preventDefault();
      notify("Subscribing...", "info");
      
      var action = $form.attr("action").replace("subscribe/post", "subscribe/post-json");
      $.ajax({
        type: "GET",
        url: action,
        data: $form.serialize(),
        cache: false,
        dataType: "jsonp",
        jsonp: "c", // trigger MailChimp to return a JSONP response
        contentType: "application/json; charset=utf-8",
        error: function(error){
          // According to jquery docs, this is never called for cross-domain JSONP requests
        },
        success: function(data){
          if (data.result !== "success") {
            notify(data.msg || "Sorry. Unable to subscribe. Please try again later.", "danger");
          } else {
            notify(data.msg, "success");
            $form.find('input,select,textarea').val("");
          }
        }
      });
 
    });
   
  });
})(jQuery);