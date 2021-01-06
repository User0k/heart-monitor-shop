//detects if browser support webp. If so adds class 'webp' to html
function checkSupport(fn) {
  const html = document.documentElement,
      WebP = new Image();

  WebP.onload = WebP.onerror = function() {
      isSupported = (WebP.height === 2);

      if (isSupported) {
        html.classList.add('webp');
      }
      fn(isSupported);
  };
  WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

$(document).ready(function(){
  $('.carousel__slider').slick({
    speed: 1000,
    adaptiveHeight: true,
    variableWidth: true
  });

  $('.catalog__tab').click(function() {
    $('.catalog__tab').removeClass('catalog__tab-active');
    $(this).addClass('catalog__tab-active');
  });

  function toggleItem(item) {
    $(item).each(function(i) {
      $(this).click(function(e) {
        e.preventDefault();
        $('.face').eq(i).toggleClass('d-none');
        $('.catalog-item__link-face').eq(i).toggleClass('d-none');
        $('.back').eq(i).toggleClass('d-none');
        $('.catalog-item__link-back').eq(i).toggleClass('d-none');
      })
    })
  }

  toggleItem('.catalog-item__link-face');
  toggleItem('.catalog-item__link-back');
});