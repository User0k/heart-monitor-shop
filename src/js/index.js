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
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });

  $('.catalog__tab').click(function() {
    $('.catalog__tab').removeClass('catalog__tab-active');
    $(this).addClass('catalog__tab-active');

    $('.catalog__content').children().addClass('d-none');
    if($(this).hasClass('catalog__tab-triathlon')) {
      $('.triathlon').removeClass('d-none');
    } else if($(this).hasClass('catalog__tab-fitness')) {
      $('.fitness').removeClass('d-none');
    } else if($(this).hasClass('catalog__tab-running')) {
      $('.running').removeClass('d-none');
    }

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
  $('.catalog__tab-running').click();

  //modal
  $('[data-modal=consultation]').click(function() {
    $('.overlay, #consultation').fadeIn('fast');
  });

  $('.button-card').each(function(i) {
    $(this).click(function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('fast');
    });
  });

  $('.modal__close').click(function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
  });
});