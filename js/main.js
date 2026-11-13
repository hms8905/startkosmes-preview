$(document).ready(function(){
	var deviceWidth = $(window).width();
    if(deviceWidth < 768){
		// $(document).one(location.reload());
	    mainSwiper();
        introCompany();
    }else{
        mainSwiper();
        introCompany();
	}

    $(window).resize(function(){
		var deviceWidth = $(window).width();
		if(deviceWidth < 768){
        
        }else{
    
        }       
    });
});

function mainSwiper(){
    var mainSwiperInit = new Swiper('.mainSwiper.swiper-container', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
        simulateTouch: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.nextSlide',
            prevEl: '.prevSlide',
        },
        pagination: {
            el: '.mainSwiperWrap .swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView:1.4,
            },
            768: {
                slidesPerView:3,
            },
        },
        on:{
            init: function(){},
            transitionStart: function(){},
        },
    });
    
    // 재생 멈춤 상태에서 시작(웹접근성)
    // mainSwiperInit.autoplay.stop();
    // $('.swiper-controls').addClass('is_stoped').removeClass('is_played');

    $('.swiper-button-play').off('click').on('click', function(){
        $(this).closest('.swiper-controls').addClass('is_played').removeClass('is_stoped');
        $('.swiper-button-pause').focus();
        mainSwiperInit.autoplay.start();
        console.log("시작");
    });
    $('.swiper-button-pause').off('click').on('click', function(){
        $(this).closest('.swiper-controls').addClass('is_stoped').removeClass('is_played');
        $('.swiper-button-play').focus();
        mainSwiperInit.autoplay.stop();
        console.log("정지");
    });
}

function introCompany(){
    var introComInit = new Swiper('.introCompany.swiper-container', {
        loop:true,
        spaceBetween: 30,
        /*effect: 'flip',*/
        effect: 'slide', //2021.01.20 곽현준 수정
        pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    autoplay: {
        delay: 6300,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.introCompanyWrap .swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
        on:{
            init: function(){},
            transitionStart: function(){},
        },
    });
    // 재생 멈춤 상태에서 시작(웹접근성)
    // mainSwiperInit.autoplay.stop();
    // $('.swiper-controls').addClass('is_stoped').removeClass('is_played');

    // $('.swiper-button-play').off('click').on('click', function(){
    //     $(this).closest('.swiper-controls').addClass('is_played').removeClass('is_stoped');
    //     $('.swiper-button-pause').focus();
    //     mainSwiperInit.autoplay.start();
    //     console.log("시작");
    // });
    // $('.swiper-button-pause').off('click').on('click', function(){
    //     $(this).closest('.swiper-controls').addClass('is_stoped').removeClass('is_played');
    //     $('.swiper-button-play').focus();
    //     mainSwiperInit.autoplay.stop();
    //     console.log("정지");
    // });
}


