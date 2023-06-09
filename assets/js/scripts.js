$(window).on('load', function() {
	$('.site-preloader').delay(1000).fadeOut();
	$('.site-preloader .fade-in').delay(500).fadeOut('slow');
});
$(document).ready(function() {  
  $(document).on('click', "header ul li, footer ul li", function(e){

  });
  $("header ul li").on("click","a", function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
    

                top = $(id).offset().top;
              $('body,html').animate({scrollTop: top}, 500);
			  $('.hamburger').removeClass('active');
			  $('.hamburger_menu').removeClass('active');
			  $("body").removeClass("overflow_hidden");

        });
        $("footer ul li").on("click","a", function (event) {
          event.preventDefault();
          var id  = $(this).attr('href'),
  

              top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 500);

      });
	var delivery_swiper = new Swiper(".delivery .delivery_swiper", {
		slidesPerView: 4,
		spaceBetween: 20,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			0: {
				slidesPerView: 1.2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},
	});
	var team_swiper = new Swiper(".team .team_row", {
		slidesPerView: 3,
		spaceBetween: 50,
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 50,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 75,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 50,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 50,
			},
		},
	});
	// FAQ ACCORDION
	$('.faq .accordion_item').on('click', function(e) {
		e.preventDefault();
		$(this).find('.accordion_content_wrapper').slideToggle(300);
		$(this).toggleClass('active');
		$('.faq .accordion_item').not($(this)).removeClass('active')
		$('.faq .accordion_item').not($(this)).find('.accordion_content_wrapper').slideUp(300)
	});
	// FORM INPUT RANGE
	$('.input_item.range [type="range"]').on('change input', function() {
		rangeCount = $('.input_item.range [type="range"]').val();
		$('.range_output').text(rangeCount);
	});
	const slider = document.querySelector("form .progress")
	const min = slider.min
	const max = slider.max
	const value = slider.value
	slider.style.background = `linear-gradient(to right, #FF8A00 0%, #FF8A00 ${(value-min)/(max-min)*100}%, #fff ${(value-min)/(max-min)*100}%, #fff 100%)`
	slider.oninput = function() {
		this.style.background = `linear-gradient(to right, #FF8A00 0%, #FF8A00 ${(this.value-this.min)/(this.max-this.min)*100}%, #fff ${(this.value-this.min)/(this.max-this.min)*100}%, #fff 100%)`
	};
	// SELECT
	$('select').niceSelect();
	// TESTIMONIALS SWIPER
	var testimonials_swiper = new Swiper(".testimonials .testimonial", {
		slidesPerView: 3,
		spaceBetween: 20,
		pagination: {
			el: ".testimonials .swiper-pagination",
			clickable: true
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});
	$('.wrapper .order_btn').on("click", function(e) {
		$(".modal").addClass("active");
		$(".overlay").addClass("active");
	});
	$('.modal .close_btn').on("click", function(e) {
		$(".modal").removeClass("active");
		$(".overlay").removeClass("active");
	});
	$(".overlay").on("click", function(e) {
		$(".modal").removeClass("active");
		$(".overlay").removeClass("active");
	});
	$("header .hamburger").click(function() {
		$(this).toggleClass("active");
		$("header .hamburger_menu").toggleClass("active");
		$("body").toggleClass("overflow_hidden");
	});
	var gallery_swiper = new Swiper(".gallery_swiper", {
		slidesPerView: 4,
		spaceBetween: 20,
		pagination: {
			el: ".pagination",
			clickable: true,
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 15,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},
	});
	$(".wrapper #order_form").on('submit', function(e){
		e.preventDefault();
		let form = $(this);
		let formData = $(this).serialize();
		let formButton = $(this).find('button');
		formButton.attr('disabled',true).addClass('disabled');
		$.ajax({
		  url: '/send.php',
		  method: 'post',
		  data: formData,
		  success: function(data){
			formButton.removeAttr("disabled").removeClass('disabled');
			form[0].reset();
			$(".modal").removeClass("active");
			$('#overlay').removeClass('active');
			iziToast.success({
				title: 'Ваша заявка принято!',
				message: 'Спасибо за обращение! В ближайшее время наш менеджер свяжется с Вами.',
				position: 'bottomCenter'
			});
		  }
		});
	  });
})