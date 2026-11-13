$(document).ready(function(){
	var deviceWidth = $(window).width();
    if(deviceWidth < 768){
		makeQRcodeWrap();			//mobile
    }else{
									//pc
	}

    $(window).resize(function(){
		var deviceWidth = $(window).width();
		if(deviceWidth < 768){
			makeQRcodeWrap();		//mobile
		}else{
									//pc
        }       
    });
	
	formGrid();						//common
	requireBox();					//common 검색조건공통
	comment();						//common
	gallaryArt();					//common
	dateSelectAll();
	checkEtc();						//common
	radioEtc();
	radioCheckEssential();			//common
	tabelInDisabled();				//common
	tableInContents();
	clearContBox();				//common
});

// 입력창 
function formGrid(){
	if ($('.formGrid').length){
		$('.formGrid').each(function(){
			if($('.formGrid').children('.row').length < 2){
				$(this).addClass('singleLow');
			}else{}
		});
		
		$('.formGrid > .row .thcell').each(function(){
			var autoLb = $(this).children('label');
			var autoLabelID01 = $(this).next().children().first().attr('id')
			var autoLabelID02 = $(this).next().children('.flexWrap').children().first().attr('id')
			
				if($(autoLb).length > 0 && $(this).parent('.row').hasClass('nonAL') == false){
					$(this).addClass('autoLb');
					$(autoLb).attr('for', autoLabelID01);
					$(autoLb).attr('for', autoLabelID02);
				}
		});
	}
}

// 셀렉트박스 그외 선택시 그다음 인풋창 활성화
function selectEtc(el){ 
	var $el = $(el); 
	var $etcInput = $el.siblings('input[name=etcInput]');
	if($el.val() == "etc"){ 
		$etcInput.attr('readonly', false); 
		$etcInput.val(''); 
	} else { 
		$etcInput.attr('readonly', true); 
		$etcInput.val($el.val()); 
	} 
}

//체크박스 선택 시 인풋창 활성화
function checkEtc(){
	var checkBox = $('.etc').children('input[type="checkbox"]'),
		inpTxt = $('.etc').children('input[type="text"]');

	$(checkBox).change(function(){
		if($(this).prop("checked")){
			inpTxt.attr("readonly", false);
		}else{
			inpTxt.attr("readonly", true);
		}
	});
}

// 라디오버튼 그외 선택시 그다음 인풋창 활성화
function radioEtc(el){ 

	var inpTxt = $('.etc').siblings('input[type="text"]');
	$(document).on('click', '.radioBtn', function(){
		if($(this).hasClass('etc') == true){
			inpTxt.attr("readonly", false);
		} else {
			inpTxt.attr("readonly", "readonly");
		}
	});
}

//게시판 상단 검색조건 
function requireBox(){ 
	if($('.requireBox').length){
		$('.requireList').attr('aria-expanded', true);
		$(document).on('click', '.rqToggle', function(){
			var rqBox;
			var rqList;
			var rqToggle;
			//검색조건 버튼은 form 안에 있어야 작동이 되기 때문에 FORM 체크 추가함(append by YBS) <== 수정하면 안됨
			if($(this).parent().parent().prop("tagName") == "FORM") {
				rqBox = $(this).parent().parent().parent('.requireBox');
				rqList = $(rqBox).children().children('.requireList');
				rqToggle = $(this).children().children('span')
			}else {
				rqBox = $(this).parent().parent('.requireBox');
				rqList = $(rqBox).children('.requireList');
				rqToggle = $(this).children('span');
			}

			if($(rqBox).hasClass('open') == true){
				$(rqList).slideUp('fast');
				$(rqBox).removeClass('open').attr('aria-expand', false);
				$(rqToggle).text('검색조건 열림')
				$('.btn.search').hide()
				$('.btn.reset').hide()
			}else{
				$(rqList).slideDown('fast');
				$(rqBox).addClass('open').attr('aria-expand', true);
				$(rqToggle).text('검색조건 닫힘')
				$('.btn.search').show()
				$('.btn.reset').show()
			}
		});
	}
}

//댓글 작성 버튼 변경 및 하위 목록 개수 가져오기
function comment(){ 
	if($('.commentList').length){
		$('.commentList > li').each(function(){
			var commentBtn = $(this).children('.cmcontWrap').children('.cmBtn').children('.commentBtn');
			var reple = $(this).children('.cminner').children('.repleList').children('li');
			if($(reple).length > 0){
				$(commentBtn).addClass('hascm');
				$(commentBtn).children().children('i').text(reple.length);
			}else{
				$(this).children('.cminner').children('.repleForm').addClass('non');
			}
		});
		$(document).on('click', '.commentBtn', function(){
			var repleBox = $(this).parent().parent().next('.cminner')
			if($(this).hasClass('on') == false){
				$(repleBox).slideDown('fast').attr('aria-expanded', true);
				$(this).addClass('on');
			}else{
				$(repleBox).slideUp('fast').attr('aria-expanded', false);
				$(this).removeClass('on');
			}
		});
	}
}


// 이미지 alt
function gallaryArt(){
	if($('.gallaryList').length){
		$('.gallaryList li').each(function(){
			var altText = $(this).children('.itemWrap').children('.title').children('span').text();
			var altImage = $(this).children('.rateBox').children().children().children('img');
			if($(this).children().siblings('.rateBox').length > 0){
				$(altImage).attr('alt', altText);
			}
		});
	}
}

//dateSelectAll
function dateSelectAll(){
	if($('.dateSelectAll').length){
		$('.dateSelectAll').each(function(){
			var all = $('.dateSelectAll .checkboxSet .checkSingle').children('input[type="checkbox"]');
			var date1 = $('.dateSelectAll').children().children().children().children('input');
			var btn1 = $('.dateSelectAll').children().children().children().children('button');
			var date2 = $('.dateSelectAll').children('.dateSetting').children('.dateMobile').children('input');

			$(document).on('change', all, function(){
				if($(all).is(":checked") == false){
					$(date1).attr("disabled", false);
					$(btn1).attr("disabled", false);
					$(date2).attr("disabled", false);
				}else{
					$(date1).attr("disabled", true);
					$(btn1).attr("disabled", true);
					$(date2).attr("disabled", true);
				}
			})

			$("input[name=chkTermsAll]").change(function(){
		
				if($('input[name=chkTermsAll]').is(":checked")){
					$('.chkAll').addClass('disabled');
					$('.chkAll select').prop("selectedIndex", 0);
				}else{
					$('.chkAll').removeClass('disabled');
				}
			});
		})
	}
}

// 행삭제
function removeForm(el){
	var $el = $(el);
	var checkIndex = $el.children('tbody').children('tr').find('input:checked');
	checkIndex.closest('tr').remove();
} 

//QR 코드 생성
function makeQRcodeWrap(){
	if($('.makeQRcodeWrap').length){
		var deviceHeight = $(window).height();
		var boxHeight = $('.inoutQR').height();
		var position = ((deviceHeight - boxHeight)/2);
		var target = $('.makeQRcodeWrap');
		$('.inoutQR').css("top", position);
	
		$(document).on('click', '.QR.office', function(){
			$(target).addClass('current').attr('aria-expanded', true);
			$('body').addClass('overhidden');
		});

		$(document).on('click', '.closeQR', function(){
			$(target).removeClass('current').attr('aria-expanded', false);
			$('body').removeClass('overhidden');
		});
	}
}

//라디오 버튼 체크시 대상 필수요소로 변경
function radioCheckEssential(){
	var target = $('.targetEssential');
	$(".radioSet .radioCheck").click(function(){
        var chk = $('.radioCheckEssential').is(":checked");//.attr('checked');
        if(chk) {
			target.addClass('essential');
		} else {
			target.removeClass('essential');	
		};
    });
}

//라디오 버튼 체크시 테이블 보임
function radioCheckDisplay() {
	
}

//테이블 안에 th버튼을 클릭했을 때 컨텐츠 보임
function tableInContents(){
	if($('.tableInBtn').length) {
		$(document).on('click', '.tableInBtn', function(){
			var $this = $(this),
				tableInContent = $('.tableInContent'),
	
				/* border-bottom */
				firstInTable = $('.inTable:first-child'),
				firstRow = firstInTable.find('.row');
	
			if($this.closest('th').next('td').find(tableInContent).css('display') == 'none'){
				$this.closest('th').next('td').find(tableInContent).show();
	
				// icoCross
				$this.addClass('is-show');
				// border-bottom
				$this.closest('th').next('td').find(firstRow).addClass('bdB');
			}else{
				$this.closest('th').next('td').find(tableInContent).hide();
	
				// icoCross
				$this.removeClass('is-show');
				// border-bottom
				$this.closest('th').next('td').find(firstRow).removeClass('bdB');
			}
		});
	}
}

/* tableWrap01 disabled="disabled" */
//테이블 안에 요소가 비활성일 때

function tabelInDisabled(){
	var disItem = $('.disabled');

	if($('tr').hasClass('disabled') == true){
		disItem.find('.radioSet').find('input[type=radio]').attr('disabled', true);
	}else{
		disItem.find('.radioSet').find('input[type=radio]').attr('disabled', false);
	}
}


// 상위 contBox 삭제
function clearContBox(){ 
	if($('.contBox').length){
		$(document).on('click', '.clearValue', function(){
			var clearBox = $(this).closest('.contBox');
			clearBox.remove();
		});
	}
}
