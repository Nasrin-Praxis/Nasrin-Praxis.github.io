//= require owl.carousel/dist/owl.carousel.js
$(".owl-carousel").each(function (index) {
    var el = $(this),
        options = el.data();
    el.owlCarousel(options);
});