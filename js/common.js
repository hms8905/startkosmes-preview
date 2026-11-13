$(document).ready(function () {
  var deviceWidth = $(window).width();
  if (deviceWidth < 768) {
    // $(document).one(location.reload());
    //gnbMobile();				//mobile
    flinkBtn(); //mobile
    responsTable(); //mobile
    datepickerDisable("mo"); //mobile
    headFix();
  } else {
    //gnbPC();					//pc
    headFix(); //pc
    responsTotal(); //pc
    datepickerDisable("pc"); //pc
  }

  $(window).resize(function () {
    var deviceWidth = $(window).width();
    if (deviceWidth < 768) {
      responsTable(); //mobile
      resetMo();
      datepickerDisable("mo"); //mobile
      headFix();
    } else {
      resetGP(); //pc
      headFix(); //pc
      responsTotal(); //pc
      datepickerDisable("pc"); //pc
    }

    gnbMobile(); //mobile
    gnbPC(); //pc
  });
  gnbMobile(); //mobile
  gnbPC(); //pc

  bodyClickEvent(); //common
  contentHeight(); //common
  swiperFunction.swiperInit(); //common
  tabWrap(); //common
  accordion(); //common
  fileBox(); //common
  slideToggle(); //common
  focusReturn(); //common
  flowStep(); //common
  inputWrap(); //common
  radioSet(); //common
  expandList(); //common
  datePic(); //임시
  tabRadio(); //common
  mobileMenuAccordion();

  focus();
  function focus() {
    $(document).keydown(function (e) {
      //console.log(e.target);
      //console.log("11111");
    });
  }

});

/* 스와이퍼 통합 */
var swiperFunction = {
  swiperInit: function () {
    swiperFunction.slideSingle(); //기본싱글
    swiperFunction.swiperAutoPlay(); //기본 자동재생
    swiperFunction.slideView02(); //2개씩
    swiperFunction.slideView03(); //3개씩
    swiperFunction.slideViewAuto(); //여러줄
  },

  // 기본형
  slideSingle: function () {
    var swipercontainer = ".swiper-container";
    var slideSingle = ".slideSingle";
    var fraction = ".fraction";
    if ($(slideSingle + " .swiper-slide").length > 1) {
      var swiperInit = new Swiper(slideSingle + ".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          // type: 'fraction'
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {},
          transitionStart: function () {},
        },
      });
    } else {
    }
  },

  // 자동재생
  swiperAutoPlay: function () {
    var swiperAutoPlay = ".swiperAutoPlay";
    if ($(swiperAutoPlay + " .swiper-slide").length > 1) {
      var swiperInit = new Swiper(swiperAutoPlay + ".swiper-container", {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {},
          transitionStart: function () {},
        },
      });
      // 재생 멈춤 상태에서 시작(웹접근성)
      swiperInit.autoplay.stop();
      $(".swiper-controls").addClass("is_stoped").removeClass("is_played");

      $(".swiper-button-play")
        .off("click")
        .on("click", function () {
          $(this)
            .closest(".swiper-controls")
            .addClass("is_played")
            .removeClass("is_stoped");
          $(".swiper-button-pause").focus();
          swiperInit.autoplay.start();
          //console.log("시작");
        });
      $(".swiper-button-pause")
        .off("click")
        .on("click", function () {
          $(this)
            .closest(".swiper-controls")
            .addClass("is_stoped")
            .removeClass("is_played");
          $(".swiper-button-play").focus();
          swiperInit.autoplay.stop();
          //console.log("정지");
        });
    } else {
    }
  },
  // swiper 2개단위 이동
  slideView02: function () {
    var slideView02 = ".slideView02";
    if ($(slideView02 + " .swiper-slide").length > 1) {
      var swiperInit = new Swiper(slideView02 + ".swiper-container", {
        slidesPerView: 2,
        slidesPerGroup: 2,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          /* dynamicBullets: true, */
          clickable: true,
          /*type: 'fraction', 숫자  */
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {},
          transitionStart: function () {},
        },
      });
    } else {
    }
  },
  // swiper 3개단위 이동
  slideView03: function () {
    var slideView03 = ".slideView03";
    if ($(slideView03 + " .swiper-slide").length > 1) {
      var swiperInit = new Swiper(slideView03 + ".swiper-container", {
        slidesPerView: 3,
        slidesPerGroup: 3,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          /* dynamicBullets: true, */
          clickable: true,
          /*type: 'fraction', 숫자  */
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {},
          transitionStart: function () {},
        },
      });
    } else {
    }
  },

  // 슬라이드개수 자동
  slideViewAuto: function () {
    var slideViewAuto = ".slideViewAuto";
    if ($(slideViewAuto + " .swiper-slide").length > 1) {
      var swiperInit = new Swiper(slideViewAuto + ".swiper-container", {
        slidesPerView: "auto",
        centeredSlides: true,
        loop: false,
        pagination: {
          el: ".swiper-pagination",
          /* dynamicBullets: true, */
          clickable: true,
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {},
          transitionStart: function () {},
        },
      });
    } else {
    }
  },
}; //스와이퍼 통합

/* 모바일 메뉴 아코디언 기능 */
function mobileMenuAccordion() {
  $(document).on("click", ".moOneDepth li button", function () {
    var depthFirst = $(this).parent("li");
    var depthNum = $(this).parent("li").index();
  
    if ($(depthFirst).hasClass("on") == false) {
      $(".moOneDepth > li, .moTwoDepth > li")
        .removeClass("on")
        .attr("aria-expanded", false);
      $(".moThreeDepth").stop().slideUp();
      $(".moGnbBtmR div").removeClass("on");
      $(depthFirst).addClass("on").attr("aria-expanded", true);
      $(".moGnbBtmR div").eq(depthNum).addClass("on");
    }
  });
  
  $(document).on("click", ".moTwoDepth > li", function () {
    var depthTwo = $(this);
    var depthLast = $(this).find("ul.moThreeDepth");
  
    if ($(depthTwo).hasClass("on") == false) {
      $(".moTwoDepth > li").removeClass("on");
      $(".moThreeDepth > li").removeClass("on");
      $(".moThreeDepth").stop().slideUp().attr("aria-expanded", false);
      $(depthTwo).addClass("on");
      $(depthLast).stop().slideDown().attr("aria-expanded", true);
    } else {
      $(depthTwo).removeClass("on");
      $(depthLast).stop().slideUp().attr("aria-expanded", false);
    }
  });
}

/* 탭이벤트 */
function tabWrap() {
  if ($(".tabWrap").length) {
    $(".tabWrap").each(function () {
      var tabID = $(this).attr("data-tab-label");
      var tabIX = $(this).children(".onTabSub").children("li.on").index();
      // 탭리스트 current 순서에 맞에 컨텐츠 current 지정
      //$(this).children('.tabContents').children('.tabCont').eq(tabIX).addClass('current');

      $(".onTabSub li").each(function () {
        $(this).attr("role", "none");
        var tabBtn = $(this).children("button");
        var tabAncer = $(this).children("a");
        var tabIndex = $(this).index() + 1;
        $(tabBtn).attr("aria-controls", tabID + tabIndex);
        if ($(this).hasClass("on") == true) {
          $(tabBtn).attr({ role: "tab", "aria-selected": true });
          $(tabAncer).attr({ role: "link", "aria-selected": true });
        } else {
          $(tabBtn).attr({ role: "tab", "aria-selected": false });
          $(tabAncer).attr({ role: "link", "aria-selected": false });
        }
      });
      $(".tabCont").each(function () {
        $(this).attr("role", "tabpanel");
        var tcIndex = $(this).index() + 1;
        $(this).attr("id", tabID + tcIndex);
        if ($(this).hasClass("on") == true) {
          $(this).attr("aria-expanded", true);
        } else {
          $(this).attr("aria-expanded", false);
        }
      });
    });
  } else {
  }

  $(".onTabSub li > a").click(function () {
    var tab = $(this).parent("li");
    var tabWrap = $(this).parent().parent().parent(".tabWrap");
    var tabindex = $(tab).index();
    var tabCont = $(this)
      .parent()
      .parent(".tabList")
      .siblings(".tabContents")
      .children(".tabCont");

    if ($('tab').hasClass('on') !== true){
		$('tab').siblings('li').removeClass('on');
		$('tab').addClass('on');

	}else{
		$('tab').siblings('li').removeClass('on');
	}
  });
} //탭이벤트

/* 아코디언 */
function accordion() {
  if ($(".accordionWrap").length) {
    // 아코디언 아이콘블릿생성
    $(".accordionWrap")
      .children()
      .children(".accHead")
      .prepend('<i class="ico"></i>');

    // 버튼 aria-controls 와 컨텐츠 ID 연결
    $(".accUnit").each(function () {
      var accID = $(this).parent(".accordionWrap").attr("data-acc-label");
      var accIndex = $(this).index() + 1;
      $(this)
        .children(".accHead")
        .children("button")
        .attr("aria-controls", accID + accIndex);
      $(this)
        .children(".accBody")
        .attr("id", accID + accIndex);

      if ($(this).hasClass("current") == true) {
        $(this)
          .children(".accHead")
          .children("button")
          .attr("aria-selected", true);
        $(this)
          .children(".accBody")
          .attr("aria-expanded", true)
          .css("display", "block");
      } else {
        $(this)
          .children(".accHead")
          .children("button")
          .attr("aria-selected", false);
        $(this).children(".accBody").attr("aria-expanded", false);
      }
    });
  } else {
  }

  $(document).on("click", ".accbtn", function () {
    var accID = $(this).attr("aria-controls");
    var accWrap = $(this).parent().parent().parent(".accordionWrap");
    var accUnit = $(this).parent().parent(".accUnit");
    var accWrapPosition = $(accWrap).offset().top - 64;
    var headHeight = $(this).parent().height();
    var accLangth = $(accUnit).index();
    var accCont = $(this).parent().next(".accBody");
    if ($(accUnit).hasClass("current") == true) {
      $(accUnit).removeClass("current");
      $(this).attr("aria-selected", false);
      $(accCont).attr("aria-expanded", false);
      $(this).parent().next().stop().slideUp();
    } else {
      $(accWrap).children().removeClass("current");
      $(accUnit).addClass("current");
      $(accWrap)
        .children()
        .children()
        .children("button")
        .attr("aria-selected", false);
      $(this).attr("aria-selected", true);
      $(accWrap).children().children(".accBody").attr("aria-expanded", false);
      $(accCont).attr("aria-expanded", true);
      $(accWrap).children().children(".accBody").stop().slideUp();
      $(this).parent().next().stop().slideDown();
      $("html, body").animate(
        { scrollTop: accWrapPosition + headHeight * accLangth },
        "300"
      );
    }
  });
} //아코디언

/* 푸터 링크리스트 */
$(document).ready(function (e) {
  $(".toggleBtn").attr("aria-expanded", "false");
  $(".linkList > .list").attr("aria-hidden", "true");

  $(document).on("click", ".linkList > .toggleBtn", function () {
    var $this = $(this);
    var $linkList = $this.parent(".linkList");
    var $linkBox = $this.next(".list");

    $linkList.toggleClass("opened");
    $linkList.siblings().removeClass("opened");

    $linkList.siblings().find(".toggleBtn").attr("aria-expanded", "false");
    $linkList.siblings().find(".list").attr("aria-hidden", "true");

    if ($linkList.hasClass("opened") == true) {
      //linkList에 opend가 있으면
      $this.attr("aria-expanded", "true");
      $linkBox.attr("aria-hidden", "false");
    } else {
      //linkList에 opend가 없으면
      $this.attr("aria-expanded", "false");
      $linkBox.attr("aria-hidden", "true");
    }
  });

  // 바닥을 클릭했을 때
  $(document).on("click", function (e) {
    //이벤트를 받아와서
    if ($(".linkList").has(e.target).length == 0) {
      $(".linkList").removeClass("opened");
      $(".toggleBtn").attr("aria-expanded", "false");
      $(".list").attr("aria-hidden", "true");
    }
  });
});
/* 푸터 링크리스트 백업 */
// $(document).ready(function(){
// 	$(document).on('click', '.linkList>.toggleBtn', function(){
// 		var $linkList = $(this).parent('.linkList');
// 		var $linkBox = $(this).next('.list');
// 		if($(this).attr('aria-expanded') == 'false'){
// 			$(".linkList .list").slideUp('fast');
// 			$(".linkList").removeClass("opened");
// 			$(".linkList .toggleBtn").attr('aria-expanded', 'false');
// 			$linkBox.stop().slideDown('fast');
// 			$(this).attr('aria-expanded', 'true');
// 			$linkList.addClass('opened');
// 		}else{
// 			$linkBox.stop().slideUp('fast');
// 			$(this).attr('aria-expanded', 'false');
// 			$linkList.removeClass('opened');
// 		}
// 	});

// $(document).on('click', '.linkList .list a', function(){
// 	if($(".linkList .list").hasClass("mCustomScrollbar") == true){
//mCustomScroll이 적용 된케이스
// 		var $linkList = $(this).parent().parent().parent().parent().parent('.linkList');
// 		var $linkBox = $(this).parent().parent().parent().parent('.list');
// 		var $toggleBtn = $(this).parent().parent().parent().parent().siblings('.toggleBtn');
// 		$linkBox.stop().slideUp('fast');
// 		$linkList.removeClass('opened');
// 		$toggleBtn.attr('aria-expanded', 'false');
// 	}else{
// 		var $linkList = $(this).parent().parent().parent('.linkList');
// 		var $linkBox = $(this).parent().parent('.list');
// 		var $toggleBtn = $(this).parent().parent().siblings('.toggleBtn');
// 		$linkBox.stop().slideUp('fast');
// 		$linkList.removeClass('opened');
// 		$toggleBtn.attr('aria-expanded', 'false');
// 	}

// 	if($(this).prop('target') == '_blank'){

// 	}else{
// 		$toggleBtn.text($(this).text());
// 	}

// });
// 링크리스트 창 닫기
// 	$("body").click(function(){
// 		if($(".linkList").hasClass("opened") == true){
// 			$(".linkList .list").stop().slideUp('fast');
// 			$(".linkList").removeClass("opened");
// 		}
// 	});
// });
//푸터 링크리스트

/* 확장영역 리스트 
function expandList() {

	//초기상태
	$(document).ready(function(){
		var $expandListWrap = $('.expandListWrap'),
			$expandTitle = $expandListWrap.find('.expandTitle'),
			$expandContent = $expandListWrap.find('.expandContent');

		$expandTitle.attr({'aria-expanded':'false'});
		$expandTitle.find('.bdgTxt.question').attr({'aria-hidden':'true'});
		$expandTitle.find('.icoCross').attr({'aria-hidden':'true'});
		$expandContent.css('display','none');
		$expandContent.attr({'aria-hidden':'true', 'tabindex':'-1'});
	})

	$(document).on('click', '.expandTitle button', function(){
		var $this = $(this);

		$this.closest('.expandTitle').toggleClass('is-expanded');
		$this.closest('.expandTitle').next('.expandContent').stop().slideToggle('fast');

		if($this.closest('.expandTitle').hasClass('is-expanded')){
			$this.closest('.expandTitle').attr({'aria-expanded':'true'});
			$this.closest('.expandTitle').next('.expandContent').attr({'aria-hidden':'false', 'tabindex':'0'});
		}else{
			$this.closest('.expandTitle').attr({'aria-expanded':'false'});
			$this.closest('.expandTitle').next('.expandContent').attr({'aria-hidden':'true', 'tabindex':'-1'});
		}
	});

}//확장영역 리스트
*/

/* 확장영역 리스트 */
function expandList() {
  //초기상태
  $(document).ready(function () {
    var $expandListWrap = $(".expandListWrap"),
      $expandTitle = $expandListWrap.find(".expandTitle"),
      $expandContent = $expandListWrap.find(".expandContent");

    $expandTitle.attr({ "aria-expanded": "false" });
    $expandTitle.find(".bdgTxt.question").attr({ "aria-hidden": "true" });
    $expandTitle.find(".icoCross").attr({ "aria-hidden": "true" });
    $expandContent.css("display", "none");
    $expandContent.attr({ "aria-hidden": "true", tabindex: "-1" });
  });

  /*
class="expandTitle detailInfo"         qa_li	question
class="expandContent faqContent"				answer

*/
  var qnaNum = -1;
  //$('#faqTitleId').click(function(){
  $(document).on("click", ".expandTitle", function () {
    q = $(".expandTitle").index(this);
    //alert(q +"/"+ qnaNum);
    if (q != qnaNum) {
      $(".expandContent").stop(true, true).slideUp(400);
      qnaNum = q;
      $(".expandContent").eq(qnaNum).stop(true, true).slideDown(400);
      //$(".expandTitle").find('.icoCross').attr({'aria-hidden':'true'});
    } else {
      $(".expandContent").eq(qnaNum).stop(true, true).slideUp(400);
      //$(".expandTitle").find('.icoCross').attr({'aria-hidden':'false'});
      qnaNum = -1;
    }
  });
} //확장영역 리스트

/* 파일첨부 */
function fileBox() {
  // fileBox
  var uploadFile = $(".fileBox .uploadBtn");
  uploadFile.on("change", function () {
    if (window.FileReader) {
      var filename = $(this)[0].files[0].name;
    } else {
      var filename = $(this).val().split("/").pop().split("\\").pop();
    }
    $(this).siblings(".fileName").val(filename);
    $(".fileAddList").append(
      "<li> <span>" +
        filename +
        '</span> <button type="button" name="" id="" class="fileDel">삭제</button></li>'
    );
  });

  // file리스트 삭제
  /* 프로그램을 대체됨
    $(document).on('click','.fileDel', function(){
        var clearfile = $(this).parent().parent().siblings(".fileName");
        $(this).parent("li").remove();
        $(clearfile).val("");
    });*/
} // 파일첨부

/* 레이어팝업 */
function lpOpen(el) {
  // event.preventDefault();
  var $el = $(el);
  $el.addClass("on");
  $el.stop().fadeIn("fast");
  $el.children().children(".btn-wrap").children(".btn").first().focus();

  var windowsHeight = $(window).height();
  var lpHeight = $(el).children(".lpWrap").height();
  var lpPosition = (windowsHeight - lpHeight) / 2;
  $("body").addClass("overhidden");
  $(el).attr({ role: "dialog", "aria-modal": true });
  /* $(el).children('.lpWrap').css('top', lpPosition); */

  $(document).on("click", ".lpOpen", function () {
    var fcID = $(this).attr("id");
    $el.attr("data-focus-return", fcID);
  });
}
// Layer Popup Close
function lpClose(el) {
  var $el = $(el);
  $el.stop().fadeOut("fast", function () {
    $el.removeClass("on");
    $("body").removeClass("overhidden");
    //modify by youn(11/6) alert창 닫을때 초기화
    if ($(el).find("#alertMsg")) $(el).find("#alertMsg").empty();
    if ($(el).find("#confirmMsg")) $(el).find("#confirmMsg").empty();
  });

  $(document).on("click", ".lpClose", function () {
    var fcBack =
      "#" +
      $(this)
        .parent()
        .parent()
        .parent(".lpContainer")
        .attr("data-focus-return");
    var fcBack2 =
      "#" + $(this).parent().parent(".lpContainer").attr("data-focus-return");

    if ($(this).hasClass("closeModal") == true) {
      $(fcBack2).focus();
    } else {
      $(fcBack).focus();
    }
  });
}
//레이어팝업

/* focus Return */
function focusReturn() {
  $(document).on("click", ".fcReturn", function () {
    var fcrID = $(this).attr("id");
    $(".lpContainer").children(".fcBack").attr("data-focus-return", fcrID);
  });
  $(document).on("click", ".fcBack", function () {
    var fcrID = $(this).attr("data-focus-return");
    var fcBack = "#" + fcrID;
    $(fcBack).focus();
  });
}

/** 슬라이드다운 공통  **/
function slideToggle() {
  if ($(".slideToggle").length) {
    $(".slideToggle").each(function () {
      var slideControls = $(this).children(".toggleBtn").attr("aria-controls");
      var focusReturn = $(this).children(".toggleBtn").attr("id");
      var lastUnit = $(this).children(".slideTarget").children().length;
      $(this).children(".toggleBtn").attr("aria-haspopup", "true");
      $(this)
        .children(".slideTarget")
        .attr({ id: slideControls, "aria-expanded": false });
      $(this)
        .children(".slideTarget")
        .find(".selectUnit")
        .attr("data-focus-return", focusReturn);
      $(this)
        .children(".slideTarget")
        .find(".selectUnit")
        .last()
        .addClass("lastUnit");
    });

    $(document).on("click", ".slideToggle .toggleBtn", function () {
      var slideTarget = $(this).next(".slideTarget");
      if ($(this).hasClass("open") == false) {
        $(".slideTarget").hide().attr("aria-expanded", false);
        $(".toggleBtn").removeClass("open");
        $(slideTarget).slideDown("fast").attr("aria-expanded", true);
        $(this).addClass("open");
      } else {
        $(slideTarget).slideUp("fast").attr("aria-expanded", false);
        $(this).removeClass("open");
      }
    });

    $(document).on(
      "click",
      ".slideToggle .slideTarget .selectUnit",
      function () {
        var slideTarget = $(this).parent().siblings().find(".slideTarget");
        var valueInit = $(this).parent().parent().siblings().find(".valueInit");
        var valueText = $(this).text();
        var focusBack = $(this).attr("data-focus-return");
        $(valueInit).html(valueText);
        $(this).parent().parent().find(".toggleBtn").removeClass("open");
        $(slideTarget).hide().attr("aria-expanded", false);
        $("#" + focusBack).focus();
      }
    );

    $(document).on(
      "focusout",
      ".slideToggle .slideTarget .selectUnit",
      function () {
        if ($(this).hasClass("lastUnit") == true) {
          $(".slideTarget").hide().attr("aria-expanded", false);
          $(".toggleBtn").removeClass("open");
        } else {
        }
      }
    );
  }
} //슬라이드다운 공통

/* 플로우스탭 */
function flowStep() {
  if ($(".flowStep").length) {
    $(".flowStep").each(function () {
      var current = $(this).children().children().siblings(".current");
      var tstage = $(this).children().children("li").length;
      var cstage = $(current).index() + 1;
      var summary =
        '<p class="findent">현재 총<span class="total">' +
        tstage +
        '</span>단계 중 <span class="now">' +
        cstage +
        "</span>단계 진행중</p>";
      $(this).attr("role", "text");
      $(current).attr("aria-current", "step");
      $(this).append(summary);
    });
  } else {
  }
}

/* PC화면 컨텐츠 최소 높이 */
function contentHeight() {
  var windowsHeight = $(window).height();
  var commonHeight =
    $(".headerWrap").outerHeight() + $(".footerWrap").outerHeight();
  var minHeight = windowsHeight - commonHeight;
  $(".contentsWrap").css("min-height", minHeight /*+ 290*/);
}

function headFix() {
  var headerH = $(".headerWrap").outerHeight();
  $(window).scroll(function () {
    //console.log("scroll");
    if ($(document).scrollTop() > headerH) {
      $(".headerWrap").addClass("scroll");
      $(".locationWrap").addClass("scroll");
      $(".swiftArea").slideUp("600");
    } else {
      $(".headerWrap").removeClass("scroll");
      $(".locationWrap").removeClass("scroll");
      $(".swiftArea").slideDown("600");
    }
  });
}

/* 화면 확대축소 */
var defaultZoom = 100;
var maxZoom = 150;
var minZoom = 80;
function zoomIn() {
  if (defaultZoom < maxZoom) {
    defaultZoom += 10;
    $("body")
      .removeClass()
      .addClass("zoom-" + defaultZoom);
  } else {
    return;
  }
  //console.log(defaultZoom);
}
function zoomOut() {
  if (defaultZoom > minZoom) {
    defaultZoom -= 10;
    $("body")
      .removeClass()
      .addClass("zoom-" + defaultZoom);
  } else {
    return;
  }
  //console.log(defaultZoom);
}

/* GNB 메뉴 Mobile */
function gnbMobile() {
  var deviceWidth = $(window).width();

  //console.log(deviceWidth);

  // 초기 2depth 오픈 세팅
  $(".moTwoDepth li.on").children("ul").slideDown();

  if (deviceWidth < 1280) {
    $(document).on("click", ".onMenu", function () {
      $(".header").addClass("opened").attr("aria-expanded", true);
      $(".headerWrap").css("z-index", "1000");
      $(".onMobileGnb, .onAllMenu").addClass("on");
      $(".onMenu").addClass("on");
      $("body").addClass("overhidden");
    });
    $(document).on("click", ".allMenuClose", function () {
      $(".header").removeClass("opened").attr("aria-expanded", false);
      $(".onMenu").focus();
      $(".headerWrap").css("z-index", "1000");
      $(".onMobileGnb, .onAllMenu").removeClass("on");
      $(".onMenu").removeClass("on");
      $("body").removeClass("overhidden");
    });
  } else {
    $(document).on("click", ".onMenu", function () {
      $(".header").addClass("opened").attr("aria-expanded", true);
      $(".headerWrap").css("z-index", "1000");
      $(".onMobileGnb, .onAllMenu").addClass("on");
      $(".onAllMenu").focus();
      $("body").addClass("overhidden");
    });
    $(document).on("click", ".allMenuClose", function () {
      $(".header").addClass("opened").attr("aria-expanded", true);
      $(".headerWrap").css("z-index", "1000");
      $(".onMobileGnb, .onAllMenu").removeClass("on");
      $("body").removeClass("overhidden");
    });
  }
}

/* GNB 메뉴 PC */
function gnbPC() {
  var gnb = $(".gnbArea");
  var realgnb = $(".realgnbWrap");
  /* $(document).on('click', '.fakegnb li button', function(){ 2020.12.31 곽현준 수정 */

  $(document).on("mouseover", ".fakegnb > li", function () {
    $(".memberInfoBox").hide();
    //$(".loginTimer").hide();
    //$(".onLoginBtn").hide();
    $(".headerWrap").addClass("on");
    $(".realGnbBg").show().css("height", $(".realgnbWrap").outerHeight()); // 2026.11.03 수정 - 펼침 메뉴 배경 높이를 메뉴 내용에 맞춤
    // var fakefocus = $(this).parent('li').index();
    // var sendfocus = $('.gnbMenu').children().eq(fakefocus).children('.depthIn').children('li').children('a').first()
    // if ($(gnb).hasClass('opened') == false){
    // 	$(gnb).addClass('opened');

    // 	/*$(".locationWrap").css({"visibility","hidden"});*/ /* 2021.01.12 곽현준 추가 */

    // 	$(realgnb).slideDown('fast').attr('aria-expanded', true);
    // 	$('.depthIn').attr('aria-expanded', true);
    // 	$(sendfocus).focus();
    // }else{
    // 	$(sendfocus).focus();
    // }
  });
  $(document).on("mouseleave", ".fakegnb > li", function () {
    $(".headerWrap").removeClass("on");
    //$(".loginTimer").show();
    //$(".onLoginBtn").show();
    $(".realGnbBg").hide();
    $(".memberInfoBox").show();
  });
  $(document).on("mouseover", ".realgnbWrap", function () {
    $(".memberInfoBox").hide();
    //$(".loginTimer").hide();
    //$(".onLoginBtn").hide();
    $(".headerWrap").addClass("on");
    $(".realGnbBg").show().css("height", $(".realgnbWrap").outerHeight()); // 2026.11.03 수정 - 펼침 메뉴 배경 높이를 메뉴 내용에 맞춤
    // var fakefocus = $(this).parent('li').index();
    // var sendfocus = $('.gnbMenu').children().eq(fakefocus).children('.depthIn').children('li').children('a').first()
    // if ($(gnb).hasClass('opened') == false){
    // 	$(gnb).addClass('opened');

    // 	/*$(".locationWrap").css({"visibility","hidden"});*/ /* 2021.01.12 곽현준 추가 */

    // 	$(realgnb).slideDown('fast').attr('aria-expanded', true);
    // 	$('.depthIn').attr('aria-expanded', true);
    // 	$(sendfocus).focus();
    // }else{
    // 	$(sendfocus).focus();
    // }
  });
  $(document).on("mouseleave", ".realgnbWrap", function () {
    //$(".loginTimer").show();
    //$(".onLoginBtn").show();
    $(".headerWrap").removeClass("on");
    $(".realGnbBg").hide();
    $(".memberInfoBox").show();
  });

  // $(document).on('click focusout', '.realgnbClose', function(){
  // 	$(gnb).removeClass('opened');
  // 	$(realgnb).slideUp('fast').attr('aria-expanded', false);
  // 	$('.depthIn').attr('aria-expanded', false);
  // });
}

/* 유저 권한 변경 셀렉트 */
// $(document).on("click", ".memberInfoIn .position.select > button", function () {
//   var button = $(this);
//   if (button.hasClass("on") !== true) {
//     button.addClass("on");
//     button.siblings(".selectList").slideDown();
//   } else {
//     button.removeClass("on");
//     button.siblings(".selectList").slideUp();
//   }
// });
/* 유저 권한 변경 셀렉트 */
$(document).on(
  "click",
  ".memberInfoIn .position.select, .memberInfoIn .numSelect",
  function () {
    var button = $(this);
    if (button.hasClass("on") !== true) {
      button.addClass("on");
      // button.parents(".last").addClass("border");
      // button.parents(".last").css("border-radius", "0 20px 0px 0");
      button.children(".selectList").slideDown();
    } else {
      button.removeClass("on");
      // button.parents(".last").removeClass("border");
      // button.parents(".last").css("border-radius", "0 20px 20px 0");
      button.children(".selectList").slideUp();
    }
  }
);

/* sns 공유 */
$(document).on("click", ".headIconList .share", function () {
  var share = $(this);
  if (share.hasClass("on") !== true) {
    share.addClass("on");
    $(".shareList").slideDown();
  } else {
    share.removeClass("on");
    $(".shareList").slideUp();
  }
});

/* 오른쪽 퀵버튼 start! */
$(document).on("click", ".quickBtn", function () {
  //console.log("21313");
  var quick = $(this);
  if (quick.hasClass("on") !== true) {
    quick.addClass("on");
    $(".quickBtnList > ul").slideDown();
    $(".quickSetBtn > button").slideDown("fast");
  } else {
    quick.removeClass("on");
    $(".quickBtnList > ul").slideUp();
    $(".quickSetBtn > button").slideUp("fast");
  }
});

$(window).scroll(function () {
  quickMove();
});

function quickMove() {
  var scrollTop = $(window).scrollTop() + 145;
  var totalH = scrollTop + $(window).height();
  var footer = $(".footerWrap").offset().top;
  var footerH = $(".footerWrap").outerHeight();

  var val = footer - $(window).height() + footerH;

  if (scrollTop > val) {
    $(".quickBtnWrap, .chatbotWrap").css("bottom", "340px"); // 2026.11.05 수정 - 챗봇도 푸터를 피해 이동
  } else {
    $(".quickBtnWrap, .chatbotWrap").css("bottom", "50px");
  }

  //console.log("scrollTop: " + scrollTop);
  // console.log('move: ' + move);
  //console.log("val: " + val);
  // console.log('footerH: ' + footerH);
}
/* 오른쪽 퀵버튼 end! */

/* GNB 메뉴 PC 리셋 */
function resetGP() {
  // 화면 최대창으로 변경시 오류제거
  $(".depthIn").attr({ "aria-expanded": true, style: "" });
  $(".depthLast").attr({ "aria-expanded": false, style: "" });
}

function resetMo() {
  if ($(".gnbArea").hasClass("opened")) {
    $(".gnbArea").removeClass("opened");
    // $('.realgnbWrap').css('display','block');
  } else {
    // $('.realgnbWrap').attr({'style':''});
  }

  $(".header").removeClass("opened").attr("aria-expanded", false);
  $(".depthFirst").removeClass("current");
  $(".depthIn > li").removeClass("current");
  //$('.depthIn, .depthLast').slideUp('fast').attr('aria-expanded', false);
  $(".headerWrap").css("z-index", "");
  // $('body').removeClass('overhidden');
}

function flinkBtn() {
  $("#flinkList").attr("aria-expanded", false);
  $(document).on("click", ".flinkBtn", function () {
    if ($(this).parent().hasClass("opened") == false) {
      $("#flinkList").stop().slideDown("fast").attr("aria-expanded", true);
      $(this).parent().addClass("opened");
    } else {
      $("#flinkList").stop().slideUp("fast").attr("aria-expanded", false);
      $(this).parent().removeClass("opened");
    }
  });
  $(document).on("click", "#flinkList a", function () {
    $(".flinkBtn").removeClass("opened");
    $("#flinkList").slideUp("fast").attr("aria-expanded", false);
  });
}

/* 데이터피커 */
// function openCal(fld, fld2) {
// 	var $initFld = $("#"+fld);
// 	$initFld.datepicker({
// 		formatDate:"ATOM",
// 		dateFormat:"yy-mm-dd",
// 		defaultDate: $initFld.val(),
// 		changeMonth: true,
// 		changeYear: true,
// 		showMonthAfterYear:true,
// 		altField: "#"+fld,
// 		showButtonPanel: true,
// 		//showOn: "both", //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
// 		//buttonText: "선택", //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
// 		//yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
// 		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'], //달력의 월 부분 텍스트
// 		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 Tooltip 텍스트
// 		dayNamesMin: ['일','월','화','수','목','금','토'], //달력의 요일 부분 텍스트
// 		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'], //달력의 요일 부분 Tooltip 텍스트
// 		//minDate: "-1M", //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
// 		//maxDate: "+1M", //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
// 		closeText:"취소",
// 		onSelect: function(value) {
// 			if (fld2 !== "" || fld2 !== null) {
// 				var fldDate1 = new Date(value);
// 				var fldDate2 = new Date(fldDate1.setMonth(fldDate1.getMonth() + 1));
// 				var endDate = $.datepicker.formatDate($.datepicker.ATOM, fldDate2);

// 				$("#"+fld2).val(endDate);
// 			}
// 		}
// 	}).datepicker("show");
// }// 데이터피커

function datePic() {
  if ($(".dateSetting").length) {
    $(".datePic").each(function () {
      var dateIn = $(this).children(".inputDatepicker");

      $(dateIn).datepicker({
        beforeShow: function(input, inst){
    		var offset = $(input).offset();
    		var height = $(input).height();
    		window.setTimeout(function(){
    			$(inst.dpDiv).css({top:(offset.top + height) + 'px', left:offset.left + 'px'})
    		}, 1);
    	},    
        formatDate: "ATOM",
        dateFormat: "yy-mm-dd",
        //defaultDate:,
        changeMonth: true,
        changeYear: true,
        showMonthAfterYear: true,
        showButtonPanel: true,
        showOn: "both", //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
        buttonImage: "/startkosmes-preview/images/common/ico_tws_datepic.png",
        buttonImageOnly: true,
        buttonText: "선택", //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
        //yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
        monthNamesShort: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ], //달력의 월 부분 텍스트
        monthNames: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ], //달력의 월 부분 Tooltip 텍스트
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"], //달력의 요일 부분 텍스트
        dayNames: [
          "일요일",
          "월요일",
          "화요일",
          "수요일",
          "목요일",
          "금요일",
          "토요일",
        ], //달력의 요일 부분 Tooltip 텍스트
        //minDate: "-1M", //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        //maxDate: "+1M", //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        closeText: "clear",
        onSelect: function () {
          var fcreturn = $(this).attr("id");
          //$("#" + fcreturn).focus();
          $("#" + fcreturn).change(); //2021.01.05 김재원 추가 - change event
          $("#" + fcreturn).blur(); //2021.01.09 임현주 추가 - IE이슈 해결
        },
        onClose: function () {
          if ($(this).val().length != 10) {
            $.datepicker._clearDate(this);
          }
          if($(window.event.srcElement).hasClass('ui-datepicker-close')){
          	$(this).val('');
          }
        },
      });
    });
  }
}

//inputWrap
function inputWrap() {
  $(".inputWrap").each(function () {
    var inputbox = $(this).children("input");
    var clearVal = $(this).children().siblings(".clearValue");
    $(clearVal).click(function () {
      $(inputbox).attr("value", "");
      $(this).parent(".inputWrap").removeClass("initDel");
    });
  });
}

//radioset
function radioSet() {
  if ($(".radioSet").length) {
    $(".radioSet").attr("role", "radiogroup");

    $(".radioSet label").each(function () {
      var autoLb = $(this).children("input[type=radio]").attr("id");
      $(this).attr("for", autoLb);
    });
  } else {
  }

  if ($(".checkboxSet, label.checkSingle").length) {
    $(".checkboxSet").attr("role", "checkboxgroup");

    $(".checkboxSet label, label.checkSingle").each(function () {
      var autoLb = $(this).children("input[type=checkbox]").attr("id");
      $(this).attr("for", autoLb);
    });
  } else {
  }
}

/* body영역 클릭시 이벤트 */
function bodyClickEvent() {
  $("body").mouseover(function (e) {
    //GNB영역 메뉴 닫기
    if ($(".gnbArea").hasClass("opened") == true) {
      if (!$(".gnbArea").has(e.target).length) {
        $(".gnbArea").removeClass("opened");
        /*$('.realgnbWrap').stop().slideUp('fast').attr('aria-expanded','false');*/
        $(".realgnbWrap").css({
          display: "none",
        }); /* 2021.01.14 곽현준 추가 */ /* 2021.01.12 곽현준 추가 */
        /*$(".locationWrap").css({"visibility":"visible"});*/
      }
    }
  });
  $("body").click(function (e) {
    //슬라이드 다운 닫기
    if ($(".toggleBtn").hasClass("open") == true) {
      if (!$(".toggleBtn").has(e.target).length) {
        $(".slideTarget").hide().attr("aria-expanded", false);
        $(".toggleBtn").removeClass("open");
      }
    }

    //flink 다운 닫기
    if ($(".relatedAgency").hasClass("opened") == true) {
      if (!$(".relatedAgency").has(e.target).length) {
        $("#flinkList").stop().slideUp().attr("aria-expanded", false);
        $(".relatedAgency").removeClass("opened");
      }
    }
  });
}

/* 반응형 테이블 대응 colspan, rowspan이 없는 경우에만 사용 (1:1대응) */
function responsTable() {
  if ($(".responsTable").length) {
    $(".responsTable table").each(function () {
      var th = $(this).children("thead").children("tr").find(".getLB");
      var tbody = $(this).children("tbody").children("tr");

      if ($(tbody).children("td").children("i").length) {
      } else {
        $(tbody).children().prepend('<i class="thLabel"></i>');
      }

      $(th).each(function () {
        var getLB = $(this).text();
        var lbIndex = $(this).index();

        $(tbody).each(function () {
          $(this).children().children(".thLabel").eq(lbIndex).text(getLB);
        });
      });
    });
  }
}

/* 테이블 하단 영역 th영역 넓이 고정 */
function responsTotal() {
  if ($(".responsTable").length) {
    $(".responsTable table").each(function () {
      var tbody = $(this).children("tbody").children("tr");
      var thwidth = $(tbody).children().first("td").width();
      $(this)
        .parent()
        .find(".totalSum")
        .children(".thcell")
        .css("width", thwidth + 20);
    });
  }
}

/* 라디오 버튼을 체크할 경우 하단 폼이 바뀜 */
function tabRadio() {
  //초기상태
  $(document).ready(function () {
    var contRadio = $(".contRadio");
    contRadio
      .children(".unit:first-child")
      .addClass("is-active")
      .attr({ "aria-hidden": "false" });
    contRadio
      .children(".unit:not(:first-child)")
      .attr({ "aria-hidden": "true" });
  });

  //라디오버튼을 클릭하면
  $(document).on(
    "click",
    '.tabRadio .radioSet input[type="radio"]',
    function () {
      var $this = $(this),
        indexNo = $this.closest("label").index(); //라디오 버튼 순서 받아오기

      //라디오 버튼 checked 상태
      $this.attr({ checked: "checked" });
      $this
        .closest("label")
        .siblings()
        .find('input[type="radio"]')
        .removeAttr("checked");

      //라디오 버튼 순서에 따라 컨텐츠 display 처리
      $this
        .closest(".tabRadio")
        .siblings(".contRadio")
        .children(".unit")
        .eq(indexNo)
        .addClass("is-active")
        .attr({ "aria-hidden": "false" })
        .siblings()
        .removeClass("is-active")
        .attr({ "aria-hidden": "true" });
    }
  );
}

/* 2021.01.14 GNB 개별메뉴 펼침 */
(function ($) {
  var lnbUI = {
    click: function (target, speed) {
      var _self = this,
        $target = $(target);
      _self.speed = speed || 300;

      $target.each(function () {
        if (findChildren($(this))) {
          return;
        }
        $(this).addClass("noDepth");
      });

      function findChildren(obj) {
        return obj.find("> ul").length > 0;
      }

      $target.on("click", "a", function (e) {
        e.stopPropagation();
        var $this = $(this),
          $depthTarget = $this.next(),
          $siblings = $this.parent().siblings();

        $this.parent("li").find("ul li").removeClass("on");
        $siblings.removeClass("on");
        $siblings.find("ul").slideUp(250);

        if ($depthTarget.css("display") == "none") {
          _self.activeOn($this);
          $depthTarget.slideDown(_self.speed);
        } else {
          $depthTarget.slideUp(_self.speed);
          _self.activeOff($this);
        }
      });
    },
    activeOff: function ($target) {
      $target.parent().removeClass("on");
    },
    activeOn: function ($target) {
      $target.parent().addClass("on");
    },
  };

  // Call lnbUI
  $(function () {
    lnbUI.click("#gnbpc li", 300);
  });
})(jQuery);

$(document).ready(function () {
  $(".fakegnb > li:nth-child(n) > button").mouseover(function () {
    var index = $(".fakegnb > li").index(this.parentElement);

    if (index >= 0) {
      index = index + 1;
      $(".fakegnb > li:nth-child(" + index + ") > button + #gnbpc").css(
        "display",
        "block"
      );
    }
  });
  $(
    ".fakegnb > li:nth-child(n) > button + #gnbpc, .fakegnb > li:nth-child(n)"
  ).mouseleave(function () {
    $(".fakegnb > li:nth-child(n) > button + #gnbpc").css("display", "none");
  });
});
/*//2021.01.14 GNB 개별메뉴 펼침 */

/*//2021.01.25 datepicker  resize시,  ready 시 처리  common.js 최상단에 위치 by harrison 
  조건에 따라 4번 호출
    */
function datepickerDisable(gubn) {
  // alert(gubn);
  /*
 if('mo' == gubn){
    $("div.datePC").find("input[type=date]").attr("disabled", true);
    $("div.dateMobile").find("input[type=date]").attr("disabled", false);
    
    //임시방변으로 가짜 이름을 준다.
   // $("div.datePC").find("input[type=date]").attr("name", "test"); 
    
 }else if ('pc' == gubn ) {
    $("div.datePC").find("input[type=date]").attr("disabled", false);
    $("div.dateMobile").find("input[type=date]").attr("disabled", true);
    
    //임시방변으로 가짜 이름을 준다.
    //$("div.dateMobile").find("input[type=date]").attr("name", "test"); 
    //alert($("div.dateMobile").find("input[type=date]").val());
 }
 */
  if ("mo" == gubn) {
    $("div.datePC").find("input[type=date]").prop("disabled", true);
    $("div.dateMobile").find("input[type=date]").prop("disabled", false);

    //임시방변으로 가짜 이름을 준다.
    $("div.datePC").find("input[type=date]").prop("name", "test");
  } else if ("pc" == gubn) {
    $("div.datePC").find("input[type=date]").prop("disabled", false);
    $("div.dateMobile").find("input[type=date]").prop("disabled", true);

    //임시방변으로 가짜 이름을 준다.
    $("div.dateMobile").find("input[type=date]").prop("name", "test");
    //alert($("div.dateMobile").find("input[type=date]").val());
  }
}
/* 2026.10.30 추가 - 텍스트 입력 (.textInput) : 지우기, 비밀번호 보기 */
$(document).on("click", ".textInputClear", function () {
  var $input = $(this).closest(".textInputBox").find("input");
  $input.val("").trigger("input").trigger("focus");
});
$(document).on("click", ".textInputView", function () {
  var $input = $(this).closest(".textInputBox").find("input");
  if ($input.prop("disabled")) return;
  var isHidden = $input.attr("type") === "password";
  $input.attr("type", isHidden ? "text" : "password");
  $(this).attr("aria-pressed", isHidden ? "true" : "false");
});
/* //2026.10.30 추가 - 텍스트 입력 */
