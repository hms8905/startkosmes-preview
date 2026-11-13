/**
 * 공통 자바스크립트 유틸모음
 * 
 */

/**
 * 전화번호 포맷
 */
function phoneFomatter(num,type){
    var formatNum = '';
    if(num.length==11){
        if(type==0){
            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
        }else{
            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
    }else if(num.length==8){
        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    }else{
        if(num.indexOf('02')==0){
            if(type==0){
                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
            }else{
                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        }else{
            if(type==0){
                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
            }else{
                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
        }
    }
    return formatNum;

}


/**
 * IE 브라우저 버전체크
 */
function get_version_of_IE () { 

	 var word; 
	 var version = "N/A"; 

	 var agent = navigator.userAgent.toLowerCase(); 
	 var name = navigator.appName; 

	 // IE old version ( IE 10 or Lower ) 
	 if ( name == "Microsoft Internet Explorer" ) word = "msie "; 

	 else { 
		 // IE 11 
		 if ( agent.search("trident") > -1 ) word = "trident/.*rv:"; 

		 // IE 12  ( Microsoft Edge ) 
		 else if ( agent.search("edge/") > -1 ) word = "edge/"; 
	 } 

	 var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

	 if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2; 

	 return version; 
} 

/**
 * 브라우저 종류 확인
 */
function fn_getUserAgent(){
	var agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome'; 
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("msie") != -1) return 'Internet Explorer'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla'; 
}

/**
 * 모바일 확인
 */
function fn_isMobile(){
	var platform = navigator.platform.toLowerCase();
	var filter = "win16|win32|win64|windows|mac|macintel|linux|freebsd|openbsd|sunos";
	
	if(platform){
		if(0 > filter.indexOf(platform)){
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/**
 * 익스플로러 버전확인
 */
function fn_getInternetExplorerVersion() {    
    var rv = -1; // Return value assumes failure.    
    if (navigator.appName == 'Microsoft Internet Explorer') {        
         var ua = navigator.userAgent;        
         var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
         if (re.exec(ua) != null)            
             rv = parseFloat(RegExp.$1);    
        }    
    return rv; 
}


//숫자체크
function isNumber2(control, msg) {
	
	var val = control;
	var Num = "1234567890";
	for (i=0; i<val.length; i++) {
		if(Num.indexOf(val.substring(i,i+1))<0) {
			alert(msg+' 형식이 잘못되었습니다.');
			return false;
		}
	}
	return true;
}

// 날짜체크
function isDate(control, msg) {
	// '/'나 '-' 구분자 제거
	var val = getRemoveFormat(control);
	
	// 숫자, length 확인
	if (isNumber(val, msg) && val.length == 8) {
		var year = val.substring(0,4);
		var month = val.substring(4,6);
		var day = val.substring(6,8);
		
		// 유효날짜 확인
		if(checkDate(year,month,day,msg)){
			return true;
		} else {
			return false;
		}
	} else {
		alert(msg + " 유효하지 않은 년,월,일(YYYYMMDD)입니다. 다시 확인해 주세요!");
		return false;
	}
}

function chkLastDate(val) {
	var ymd = val.replace(/[^0-9]/gi,"");
	var year = Number(ymd.substring(0,4));
	var month = Number(ymd.substring(4,6));
	var day = Number(ymd.substring(6,8));
	
	if(new Date(year, month, 0).getDate() < day) {
		return false;
	}
	return true;
}

// 구분자 제거
function getRemoveFormat(val) {
	if(val.length == 10) {
		var arrDate = new Array(3);
		arrDate = val.split("/");
		if(arrDate.length != 3) {
			arrDate = val.split("-");
		}
		return arrDate[0] + arrDate[1] + arrDate[2];
	} else {
		return val;
	}	
}

// 유효날짜 확인
function checkDate(varCk1, varCk2, varCk3, msg) {
	if (varCk1>="0001" && varCk1<="9999" && varCk2>="01" && varCk2<="12") {
		febDays = "29";
		if ((parseInt(varCk1,10) % 4) == 0) {
			if ((parseInt(varCk1,10) % 100) == 0 && (parseInt(varCk1,10) % 400) != 0){
				febDays = "28";
			}
		}else{
			febDays = "28";
		}
		if (varCk2=="01" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="02" && varCk3>="01" && varCk3<=febDays) return true;
		if (varCk2=="03" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="04" && varCk3>="01" && varCk3<="30") return true;
		if (varCk2=="05" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="06" && varCk3>="01" && varCk3<="30") return true;
		if (varCk2=="07" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="08" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="09" && varCk3>="01" && varCk3<="30") return true;
		if (varCk2=="10" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="11" && varCk3>="01" && varCk3<="30") return true;
		if (varCk2=="12" && varCk3>="01" && varCk3<="31") return true;
	}
	alert(msg + " 유효하지 않은 년,월,일(YYYYMMDD)입니다. 다시 확인해 주세요!");
	return false;
}

/** 
* 입력값이 NULL인지 체크 
*/ 
function isNull(input) { 
if (input.value == null || input.value == "") { 
return true; 
} 
return false; 
} 

/** 
* 입력값에 스페이스 이외의 의미있는 값이 있는지 체크 
* ex) if (isEmpty(form.keyword)) { 
* alert!("검색조건을 입력하세요."); 
* } 
*/ 
function isEmpty(value) { 
if(value==null || value==undefined || (value!=null && typeof value=="object" && !Object.keys(value).length) || value=="" || (typeof value!="object" && value.replace(/ /gi,"").length<1)) {
return true;
}
else {
return false;
}
}

/** 
* 입력값에 특정 문자(chars)가 있는지 체크 
* 특정 문자를 허용하지 않으려 할 때 사용 
* ex) if (containsChars(form.name,"!,*&^%$#@~;")) { 
* alert!("이름 필드에는 특수 문자를 사용할 수 없습니다."); 
* } 
*/ 
function containsChars(input,chars) { 
for (var inx = 0; inx < input.value.length; inx++) { 
if (chars.indexOf(input.value.charAt(inx)) != -1) 
return true; 
} 
return false; 
} 

/** 
* 입력값이 특정 문자(chars)만으로 되어있는지 체크 
* 특정 문자만 허용하려 할 때 사용 
* ex) if (!containsCharsOnly(form.blood,"ABO")) { 
* alert!("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다."); 
* } 
*/ 
function containsCharsOnly(input,chars) { 
for (var inx = 0; inx < input.value.length; inx++) { 
if (chars.indexOf(input.value.charAt(inx)) == -1) 
return false; 
} 
return true; 
} 

/** 
* 입력값이 알파벳인지 체크 
* 아래 isAlphabet() 부터 isNumComma()까지의 메소드가 
* 자주 쓰이는 경우에는 var chars 변수를 
* global 변수로 선언하고 사용하도록 한다. 
* ex) var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
* var lowercase = "abcdefghijklmnopqrstuvwxyz"; 
* var number = "0123456789"; 
* function isAlphaNum(input) { 
* var chars = uppercase + lowercase + number; 
* return containsCharsOnly(input,chars); 
* } 
*/ 
function isAlphabet(input) { 
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; 
return containsCharsOnly(input,chars); 
} 

/** 
* 입력값이 알파벳 대문자인지 체크 
*/ 
function isUpperCase(input) { 
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
return containsCharsOnly(input,chars); 
} 

/** 
* 입력값이 알파벳 소문자인지 체크 
*/ 
function isLowerCase(input) { 
var chars = "abcdefghijklmnopqrstuvwxyz"; 
return containsCharsOnly(input,chars); 
} 

/** 
* 입력값에 숫자만 있는지 체크 
*/ 
function isNumber(val) {
var regExp = /^[0-9]*$/; 
return regExp.test(val);
}

/** 
* 입력값이 알파벳,숫자로 되어있는지 체크 
*/ 
function isAlphaNum(input) { 
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
return containsCharsOnly(input,chars); 
} 

/** 
* 입력값이 숫자,대시(-)로 되어있는지 체크 
*/ 
function isNumDash(input) { 
var chars = "-0123456789"; 
return containsCharsOnly(input,chars); 
} 

/** 
* 입력값이 숫자,콤마(,)로 되어있는지 체크 
*/ 
function isNumComma(val) { 
var regExp = /^[0-9,]*$/; 
return regExp.test(val);
} 

/** 
* 입력값이 숫자,콤마(,)로 되어있는지 체크 
*/ 
function isNumPoint(val) { 
var regExp = /^[0-9.]*$/; 
return regExp.test(val);
} 

/** 
* 입력값이 사용자가 정의한 포맷 형식인지 체크 
* 자세한 format 형식은 자바스크립트의 'regular expression!'을 참조 
*/ 
function isValidFormat(value,format) { 
return format.test(value); 
} 

/** 
* 입력값이 이메일 형식인지 체크 
* ex) if (!isValidEmail(form.email)) { 
* alert!("올바른 이메일 주소가 아닙니다."); 
* } 
*/ 
function isValidEmail(value) {
var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/; 
return isValidFormat(value,format); 
} 

/** 
* 입력값이 이메일 형식인지 체크 
* ex) if (!isValidEmail(form.email)) { 
* alert!("올바른 이메일 주소가 아닙니다."); 
* } 
*/ 
function isValidEmailFst(val) {
var regExp = /^((\w|[\-\.])+)$/; 
return regExp.test(val);
} 

/** 
* 입력값이 이메일 형식인지 체크 
* ex) if (!isValidEmail(form.email)) { 
* alert!("올바른 이메일 주소가 아닙니다."); 
* } 
*/ 
function isValidEmailLst(val) {
var regExp = /^((\w|[\-\.])+)\.([A-Za-z]+)$/; 
return regExp.test(val);
} 

/** 
* 입력값이 전화번호 형식(숫자-숫자-숫자)인지 체크 
*/ 
function isValidPhone(input) { 
var format = /^(\d+)-(\d+)-(\d+)$/; 
return isValidFormat(input,format); 
}

function isValidDate(val) {
var regExp = /^(19|20)\d{2}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/; 
return regExp.test(val);
}

/** 
* 입력값의 바이트 길이를 리턴 
* ex) if (getByteLength(form.title) > 100) { 
* alert!("제목은 한글 50자(영문 100자) 이상 입력할 수 없습니다."); 
* } 
* Author : Wonyoung Lee 
*/ 
function getByteLength(input) { 
var byteLength = 0;
for (var inx = 0; inx < input.val().length; inx++) {
var oneChar = escape(input.val().charAt(inx));
if(oneChar.length == 1 ) {
byteLength ++;
} else if(oneChar.indexOf("%u") != -1) {
byteLength += 2;
} else if(oneChar.indexOf("%") != -1) {
byteLength += oneChar.length/3;
}
}
return byteLength;
}

function addComma(val) {
return removeChars(String(val)).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}

/** 
* 입력값에서 콤마를 없앤다. 
*/ 
function removeComma(val) { 
return val.replace(/,/gi,""); 
}

/** 
* 입력값에서 콤마를 없앤다. 
*/ 
function removeDash(val) { 
return val.replace(/-/gi,""); 
}

function removeChars(val) {
return val.replace(/[^0-9]/gi,"");
}

/** 
* 선택된 라디오버튼이 있는지 체크 
*/ 
function hasCheckedRadio(input) { 
if (input.length > 1) { 
for (var inx = 0; inx < input.length; inx++) { 
if (input[inx].checked) return true; 
} 
} else { 
if (input.checked) return true; 
} 
return false; 
} 

/** 
* 선택된 체크박스가 있는지 체크 
*/ 
function hasCheckedBox(input) { 
return hasCheckedRadio(input); 
} 

/** 
* 입력길이 바이트 체크 
*/
function fn_max_length_check(input,maxValue){
	if(getByteLength(input) > maxValue){
		alert('입력값의 길이는 '+maxValue+'자 이내 이어야 합니다.');
		return false;
	}
	return true;
}


/** 
* check encoding
*/
function gfn_isEncoded(str) {
	return str !== decodeURI(str) ;
}


/** 
* ajax fileSend
*/
function gfn_fileAjaxSend(frmId, func, sync) {
	if(typeof sync == "undefined") sync = true;
	var retVal = true;
	var options = {
		//url : '/startkosmes-preview/cmm/fms/processUpload.do',
		url:"/startkosmes-preview/cmm/fms/processUploadTotal.do", //맥북 호완
		type : 'POST',
		dataType : 'json',
		async : sync,
		success : function(data){
			//alert('첨부파일이 정상적으로 저장되었습니다.'+data);
			if (func != null) func(eval(data), frmId);
		}, error : function(xhr, status, error){
			/*if(gfn_isEncoded(error)){
				var Ca=/\+/g;
				alert("error:"+ decodeURI(error.replace(Ca, ' ')) );
			}else{
				alert("error:"+ error);
			}*/
			//console.log("fileupload 실패 : " + status + "//" + xhr.message + "//" + xhr.responseText + "//" + error);
			//console.log("fileupload 실패 :  xhr //" + JSON.stringify(xhr));
			//console.log("fileupload 실패 : status//" + JSON.stringify(status));
			//console.log("fileupload 실패 : error  //" + JSON.stringify(error));
			
			
			//alert("파일 업로드 중 에러가 발생하였습니다.");
			retVal = false;
		}
	};
	
	$('#'+frmId+'_fileForm').ajaxSubmit(options);
	return retVal;
}

/** 
* ajax image file & comment Send
*/
function gfn_fileCommentAjaxSend(frmId, func) {
	var retVal = true;
	
	var options = {
		url : '/startkosmes-preview/cmm/fms/processImageCommentUpload.do',
		type : 'POST',
		dataType : 'json',
		success : function(data){
			//alert('첨부파일이 정상적으로 저장되었습니다.'+data);
			if (func != null) func(eval(data));
		}, error : function(xhr, status, error){
			if(gfn_isEncoded(error)){
				var Ca=/\+/g;
				alert("error:"+ decodeURI(error.replace(Ca, ' ')) );
			}else{
				alert("error:"+ error);
			}
			retVal = false;
		}
	};
	
	$('#'+frmId+'_fileForm').ajaxSubmit(options);
	return retVal;
}

$(document).ready(function() {
	
	var message = $("#resultMsg").val();
	if (message != undefined && message != "") {
        alert(message);
    }
});



/**
 * ajax fileSend
 */
 function gfn_multiFileAjaxSend(frmId, func, sync) {

	 //변수 찾기
	var _fileList = window[frmId + "_fileList"];
	var _maxUploadSize = window[frmId + "_maxUploadSize"];
	var _totalFileSize = window[frmId + "_totalFileSize"];

	
	if(typeof sync == "undefined") sync = true;
 	var retVal = true;
 	
 	// 등록할 파일 리스트
     
   
    var uploadFileList = Object.keys(_fileList);
    
    //console.log(_fileList);
    //console.log(uploadFileList.length);
	//return false;
	// 파일이 있는지 체크
    //if(uploadFileList.length == 0){
    //    // 파일등록 경고창
    //    alert("파일이 없습니다.");
    //    return;
    //}
    
    // 용량을 500MB를 넘을 경우 업로드 불가
    if(_totalFileSize > _maxUploadSize){
        // 파일 사이즈 초과 경고창
        alert("총 용량 초과\n총 업로드 가능 용량 : " + _maxUploadSize + " MB");
        return;
    }
        
 // 등록할 파일 리스트를 formData로 데이터 입력
    var form = $('#'+frmId+'_fileForm');
    var maxFileLimitSize = $('#'+frmId+'_maxFileLimitSize').val();
    var fileAcceptExtn = $('#'+frmId+'_fileAcceptExtn').val();
 
    var formData = new FormData(form[0]);
    for(var i = 0; i < uploadFileList.length; i++){
   	 	formData.append(frmId, _fileList[uploadFileList[i]]);
   	 	//alert()
   	 	formData.append(frmId +"_maxFileLimitSize", maxFileLimitSize);
   	 	formData.append(frmId +"_fileAcceptExtn", fileAcceptExtn);
   	
    }

    $.ajax({
	    //url:"/startkosmes-preview/cmm/fms/processUpload.do",
		url:"/startkosmes-preview/cmm/fms/processUploadTotal.do", //맥북 호완
	    data:formData,
	    type:'POST',
	    enctype:'multipart/form-data',
	    processData:false,
	    contentType:false,
	    dataType:'json',
	    async : sync,
	    cache:false,
	    cache:false,
        success : function(data) {
        	//alert("성공!!!!!")
        	//console.log("성공 data ::::::::::" + JSON.stringify(data));
			//add by harrison  소스 적용시 주석 제거
			if (func != null) func(eval(data), frmId);
		},
		error : function(xhr, status, error) {
			alert("fileupload 실패 : " + status + "//" + xhr.message + "//" + xhr.responseText + "//" + error);
			//console.log("fileupload 실패 : " + status + "//" + xhr.message + "//" + xhr.responseText + "//" + error);
			/*
			if(gfn_isEncoded(error)){
				var Ca=/\+/g;
				alert("error:"+ decodeURI(error.replace(Ca, ' ')) );
			}else{
				alert("error:"+ error);
			}
			*/
			retVal = false;
		}
    });
	
    return retVal;
   
 }



function gfn_validation(obj, title, rules, msg) {
	var rulesArray = rules.split(";");
	
	for(i=0; i<rulesArray.length; i++) {
		var ruleArray = rulesArray[i].split(":");
		var rule = ruleArray[0];
		var condition = ruleArray[1];
		
		switch(rule) {
			case "required":
				if(condition == undefined || condition == "true") {
					if(obj.is(":radio, :checkbox")) {
						if(!obj.is(":checked")) {
							if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
							else alert(title + " 항목을 선택해주세요.");
							obj.eq(0).focus();
							return false;
						}
					}else if(obj.is(":input") && !obj.is(":disabled")) {
						if(isEmpty(obj.val())) {
							if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
							else alert(title + " 항목을 입력해주세요.");
							obj.focus();
							return false;
						}						
					}else {
						if(isEmpty(obj.val())) {
							if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
							else alert(title + " 항목을 선택해주세요.");
							obj.focus();
							return false;
						}
					}
				} else {
					if(isEmpty(obj.val())) {
						return true;
					}
				}
				
				break;
			case "length":
				if(getByteLength(obj) != condition) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]+"\n(입력한 자리수="+getByteLength(obj)+")");
					else alert(title + " 항목은 " + condition + "자리를 입력해주세요.\n(입력한 자리수="+getByteLength(obj)+")");
					obj.focus();
					return false;
				}
				
				break;
				
			case "minlength":
				if(getByteLength(obj) < condition) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]+"\n(입력한 자리수="+getByteLength(obj)+")");
					else alert(title + " 항목은 최소 " + condition + "자리까지 입력해주세요.\n(입력한 자리수="+getByteLength(obj)+")");
					obj.focus();
					return false;
				}
				
				break;
				
			case "maxNumlength":
				if(getByteLength(obj) > condition) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]+"\n(입력한 자리수="+getByteLength(obj)+")");
					else alert(title + " 항목은 최대 " + condition + "자리까지 입력해주세요.\n(입력한 자리수="+getByteLength(obj)+")");
					obj.focus();
					return false;
				}
				
				break;
								
			case "maxlength":
				if(getByteLength(obj) > condition) {
					var hanLength = Math.round(condition/2);
					var inputLength = Math.round(getByteLength(obj)/2);
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]+"\n(입력한 자리수="+getByteLength(obj)+")");
					else alert(title + " 항목은 최대 한글("+hanLength+") 영문(" + condition + ") 자리까지 입력해주세요.\n(입력한 자리수 한글기준 "+inputLength+"자)");
					obj.focus();
					return false;
				}
				
				break;
				
			case "date":
				if(!isValidDate(obj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목은 2017-01-31 형식으로 입력해주세요.");
					obj.focus();
					return false;
				}
				
				if(!chkLastDate(obj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목의 날짜가 유효하지 않습니다.");
					obj.focus();
					return false;
				}
				
				break;
			
			case "comp":
				var compObj = $("[name='"+condition+"']");
				
				if(isEmpty(compObj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(compObj.attr("title") + " 항목을 입력해주세요.");
					compObj.focus();
					return false;
				}
				
				if(!isValidDate(compObj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(compObj.attr("title") + " 항목은 2017-01-31 형식으로 입력해주세요.");
					compObj.focus();
					return false;
				}
				
				if(!chkLastDate(compObj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(compObj.attr("title") + " 항목의 날짜가 유효하지 않습니다.");
					compObj.focus();
					return false;
				}
				
				if(compObj.val() < obj.val()) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 보다 " + compObj.attr("title") + "이 앞날짜 입니다.");
					compObj.focus();
					return false;
				}
				
				break;
				
			case "range":
				if(!(removeChars(obj.val()) >= removeChars(condition.split(",")[0]) && removeChars(obj.val()) <= removeChars(condition.split(",")[1]))) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목은 " + condition.split(",")[0] + "와 " + condition.split(",")[1] + "사이로 입력해주세요.");
					obj.focus();
					return false;
				}
				
				break;
				
			case "maxval":
				if(Number(removeComma(obj.val())) > condition) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목은 " + condition + " 이하로 입력해주세요.");
					obj.focus();
					return false;
				}
				
				break;
				
			case "minval":
				if(Number(removeComma(obj.val())) < condition) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목은 " + condition + " 이상으로 입력해주세요.");
					obj.focus();
					return false;
				}
				
				break;
				
			case "number":
				if(!isNumber(obj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목은 숫자만 입력해주세요.");
					obj.focus();
					return false;
				}
					
				break;
				
			case "comma":
				if(!isNumComma(obj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목은 숫자만 입력해주세요.");
					obj.focus();
					return false;
				}
					
				break;
				
			case "point":
				if(!isNumPoint(obj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목은 숫자만 입력해주세요.");
					obj.focus();
					return false;
				}
					
				break;
				
			case "emailFst":
				if(!isValidEmailFst(obj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목을 형식에 맞게 입력해주세요.");
					obj.focus();
					return false;
				}
				
				break;
				
			case "emailLst":
				if(!isValidEmailLst(obj.val())) {
					if(!isEmpty(msg) && !isEmpty(msg[i])) alert(msg[i]);
					else alert(title + " 항목을 형식에 맞게 입력해주세요.");
					obj.focus();
					return false;
				}
				
				break;
				
			case "regNo":
				// TODO 주민등록번호 유효성 검사
					
				break;
				
			case "corpNo":
				// TODO 법인번호 유효성 검사
					
				break;
				
			case "bsnsNo":
				// TODO 사업자등록번호 유효성 검사
				
				break;
				
			default:
				alert("잘못된 유효성 검사입니다.");
				return;
		}
	}
	
	return true;
}

// TODO hoem, end 키 추가
function onNumber(e) {
	var key;

	if(window.event) key = window.event.keyCode;
	else key = e.which;
	
	var event;
	// 0:, 8:backspace, 46:delete, 9:tab, 36:home, 35:end, 37:왼쪽화살표, 39:오른쪽화살표
	if(key==0 || key==8 || key==46 || key==9 || key==36 || key==35 || key==37 || key==39) {
		event = e || window.event;

		if(typeof event.stopPropagation != "undefined") {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
		return;
	}

	if(key < 48 || (key > 57 && key < 96) || key > 105 || e.shiftKey) {
		e.preventDefault ? e.preventDefault():e.returnValue = false;
	}
}

function onRemoveChars() {
	this.value = removeChars(this.value);
	return;
}

function onAddComma() {
	this.value = addComma(this.value);
	return;
}

//공통코드 조회
//commTpClmNm : 코드
//commTpCommCd : 코드값
//selectId : selectId
//첫줄명
function getCommCodeList(commTpClmNm, commTpCommCd, selectId, txt, chkId) {
	
	var _commParams = {dtyDvCd: "YA"};
	if(commTpClmNm != "" && commTpClmNm != undefined) {
		_commParams.commTpClmNm = commTpClmNm;
	}
	if(commTpCommCd != "" && commTpCommCd != undefined) {
		_commParams.commTpCommCd = commTpCommCd;
	}
	
	// 기존 데이타 초기화
	$("#"+selectId).empty();
	
	$.ajax({
		type:"post",
		url:"/startkosmes-preview/yh_cmn001_001.do",
		data: _commParams,
		dataType:"json",
		success:function(data){
			if(data.resultSVO.resultCode != "") {
				alert(data.resultSVO.resultMsg);
				return;
			}
			// 공통코드 리스트 조회
			var list = data.resultSVO.commCodeList;
			//선택 추가
			if(txt != "" && txt != undefined)
			$("#"+selectId).append("<option value=''>"+txt+"</option>");
			var selected = "selected";
			for(var i=0; i<list.length; i++) {
				if(chkId == list[i].commTpCommCd) {
					selected = "selected";
				}else {
					selected = "";
				}
				$("#"+selectId).append("<option value='"+list[i].commTpCommCd+"' "+selected+">"+list[i].dtlCommCdNm1+"</option>");
			}

		},
		error:function(request,status,error){
			alert("공통코드 조회 중 오류가 발생했습니다.\n(오류코드:"+error+")");
		}
	});
}

var backFocusObj;
function openLayerPop(frm, obj){
	backFocusObj = obj;
	var iPop = "<iframe id='iFramePop' name='iFramePop' title='레이어팝업' src='' width='1020' height='900' class='layerPopupWrap'>";
//	$("div.cont_box").after(iPop);
	$(obj).after(iPop);
	
	var $popup_wrap = $(".layerPopupWrap");	
	var $btnClose = $(".layer_popup_wrap .btn_close"); 
	var dimTag = $("<div class='dimmed'></div>");	
	var $wrap = $("#wrap");
	var body = $("body").height();
	var popHeight = body/2;
	$("body").addClass("fixed");
	$wrap.after(dimTag);
	dimTag.css({height: body});
	
	$popup_wrap.css({
			'display': 'block',
			'top'    : 0,
			'left'   : 0
	});

	frm.submit();
}

function openWindowPop(frm, params){
	var iWinPop = window.open("about:blank",params.target,"width="+params.width+", height="+params.height+", top="+params.top+", left="+params.left+", scrollbars=yes");

	frm.attr("action", params.url);
	frm.attr("target", params.target);
	frm.submit();
	
	if(fn_getUserAgent()=="Internet Explorer") iWinPop.focus();
}

function searchIndustCl(obj){
	backFocusObj = obj;
	var iPop = "<iframe id='iFramePop' name='iFramePop' src='/startkosmes-preview/yh_cmn110_001.do' width='1020' height='900' class='layerPopupWrap'>";
	//$("div.cont_box").after(iPop);
	$(obj).after(iPop);
	
	var $popup_wrap = $(".layerPopupWrap");	
	var $btnClose = $(".layer_popup_wrap .btn_close"); 
	var dimTag = $("<div class='dimmed'></div>");	
	var $wrap = $("#wrap");
	var body = $("body").height();
	var popHeight = body/2;
	$("body").addClass("fixed");
	$wrap.after(dimTag);
	dimTag.css({height: body});

//	var top = Math.max(0, ( $(window).height() / 2) - (popHeight)) + $(window).scrollTop();
	
	$popup_wrap.css({
			'display': 'block',
			'top'    : 0,
			'left'   : 0
	});
}

$(document).ready(function() {
	// 숫자만 입력 - 2020.12.04 강환규
	$('.numberOnly').keyup(function(){
		this.value = this.value.replace(/[^0-9\.]/g,'');
	});
	
	// 숫자에 콤마만 입력 - 2020.12.04 강환규
	$('.numberCommaOnly').keyup(function(){
		var str = this.value.replace(/[^0-9\.]/g,'');
		this.value = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	});

	$(".layer_popup_wrap").each(function(){
		var $layer = $(this);
		
		if(window.parent.$("#iFramePop").length > 0){
			window.parent.$("#iFramePop").attr('width',$(this).prop("clientWidth"));
			var $popup_wrap = window.parent.$("#iFramePop");
			var offTop = window.parent.$("#iFramePop").offsetParent().offset().top*-1;
			var offLeft = window.parent.$("#iFramePop").offsetParent().offset().left*-1;
			var width = window.parent.$("#iFramePop").prop("width");
			var top = Math.max(0, ( $(window.parent).height() - $(this).prop("clientHeight")) / 2) + $(window.parent).scrollTop();
			var left = Math.max(0, ( $(window.parent).width() - width) / 2);
			$popup_wrap.css({
				'top': offTop + top,
				'left' : offLeft + left
			});

			$layer.attr("tabindex",0);
			$layer.find(".btn_pop_close").focusout(function(){
				setTimeout(function(){
					$layer.focus();
				},100);
			});
			
			var $prev = window.parent.$("#iFramePop").prev();

			$prev.focus(function(){
				setTimeout(function(){
					$layer.find(".btn_pop_close").focus();
				},100);
			});
		}
	});
});

function closeLayerPop(){
	$(".dimmed").remove();
	$("body").removeClass("fixed");
	$("#iFramePop").remove();
	backFocusObj.focus();
	backFocusObj = null;
}

function num2han(num) {
	var hn = new Array("영","일","이","삼","사","오","육","칠","팔","구");
	var hj = new Array("","만","억","조","경","해","시","양","구","간","정","재","극","항하사","아승지","나유타","불가사의","무량대수");
	var ul = new Array("영천","영백","영십","영");
	var tm = new Array();

	var result = ""; 
	var string = removeChars(num);

	if(string.charAt(0) == "-") {
		result = "마이너스 ";
		string = string.substr(1, string.length-1);
	}
	
	var loop_size = Math.ceil(string.length/4);
	
	var string2 = "";
	for(count=string.length; count>=0; count--) {
		string2 += string.substring(count, count-1);
	}
	string = string2;
		
	for(A=0; A<loop_size; A++) {
		sum = hj[A] + " ";
		tm[A] = string.substr(A*4,4);

		tm2 = "";

		for(count=tm[A].length; count>=0; count--) {
			tm2 += tm[A].substring(count, count-1);
		}
		tm[A] = tm2;
		part_jari = tm[A].length;
		
		for(D=0; D<10; D++) {
			for(B=0; B<10; B++) {
				tm[A] = tm[A].replace(B, hn[B]);
			}
		} 

		if(part_jari == 4) {
			tm[A] = tm[A].charAt(0)+"천"+tm[A].charAt(1)+"백"+tm[A].charAt(2)+"십"+tm[A].charAt(3);
		}
		else if(part_jari == 3) {
			tm[A] = tm[A].charAt(0)+"백"+tm[A].charAt(1)+"십"+tm[A].charAt(2);
		}
		else if(part_jari == 2) {
			tm[A] = tm[A].charAt(0)+"십"+tm[A].charAt(1);
		}
		else {
			tm[A] = tm[A].charAt(0); 
		}
		
		for(C=0; C<4; C++) {
			if(tm[A].match(ul[C])) {
				part_jari--;
				tm[A] = tm[A].replace(ul[C], "");
			}
		}
		
		if(part_jari != 0) {
			tm[A] += sum; 
		}
	}
	
	for(loop_size; loop_size>-1; loop_size--) {
		result += tm[loop_size];
	}
	result = result.replace("undefined","");
	
	return result;
}

function LPAD(str, len, letter) {
    var sStr = String(str);
    for( ;sStr.length < len; ){
    	sStr = String(letter) + String(sStr); 
    }
    return sStr;
}

function RPAD(str, len, letter) {
    var sStr = String(str);
    for( ;sStr.length < len; ){
    	sStr = String(sStr) + String(letter); 
    }
    return sStr;
}

function fn_doFrmReset(frmId) {
	$("#"+frmId).find("input, select").each(function(i, e){
		if($(this).is(":radio, :checkbox")) {
			$(this).attr("checked", false);
		} else {
			$(this).val("");
		}
	});
}

//Cookie setting
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString()+";";
	document.cookie = cname + "=" + escape(cvalue) + ";path=/;" + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) != -1) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

//게시판 답글 아이콘 추가하기
function fn_addReIcon(){
	$('[name="level"]').each(function(index){
		var thisMap = $(this);
		var setLevel = $(this).val();
		
		for(i=0; i < setLevel -2; i++){
			var icon = '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
			if(setLevel > 1){
				thisMap.next('span').append(icon);	
			}
		}
		
		
	});
}

//게시판 첨부파일 확장자에 따른 아이콘 이미지 변경
function fn_chgFileExtImg(){
	$('a.ico_file').each(function(index){
		
		var thisMap = $(this);
		var setTitle = $(this).attr('title');
		
		if(setTitle != ''){
			var getTitle = setTitle.substr(0, setTitle.length -5);
			var ext = getTitle.split('.').pop().toLowerCase();
			
			if(ext == 'hwp'){
				var spanTg = '<span class="blind">hwp 파일</span>';
				thisMap.attr('class', 'ico_file hwp');
				thisMap.append(spanTg);
			} else if(ext == 'xlsx' || ext == 'xls'){
				var spanTg = '<span class="blind">xlsx 파일</span>';
				thisMap.attr('class', 'ico_file xls');
				thisMap.append(spanTg);
			} else if(ext == 'jpg' || ext == 'jpeg' || ext == 'gif' || ext == 'png'){
				var spanTg = '<span class="blind">image 파일</span>';
				thisMap.attr('class', 'ico_file image');
				thisMap.append(spanTg);
			} else if(ext == 'pptx' || ext == 'ppt'){
				var spanTg = '<span class="blind">ppt 파일</span>';
				thisMap.attr('class', 'ico_file ppt');
				thisMap.append(spanTg);	
			} else if(ext == 'pdf'){
				var spanTg = '<span class="blind">pdf 파일</span>';
				thisMap.attr('class', 'ico_file pdf');
				thisMap.append(spanTg);	
			} else if(ext == 'docx' || ext == 'doc'){
				var spanTg = '<span class="blind">word 파일</span>';
				thisMap.attr('class', 'ico_file word');
				thisMap.append(spanTg);					
			} else if(ext == 'zip'){
				var spanTg = '<span class="blind">zip 파일</span>';
				thisMap.attr('class', 'ico_file zip');
				thisMap.append(spanTg);					
			} else {
				var spanTg = '<span class="blind">etc 파일</span>';
				thisMap.attr('class', 'ico_file etc');
				thisMap.append(spanTg);
			}
		}
	});
}

function fn_getBirthDt(ymd, cd) {
	if(ymd.length != 6) {
		alert("잘못된 인수입니다.");
		return;
	}
	
	if(cd.length != 1) {
		alert("잘못된 인수입니다.");
		return;
	}
	
	var year = "";
	
	switch(cd) {
		case "9":
		case "0":
			year = "18";
			break;
		case "1":
		case "2":
		case "5":
		case "6":
			year = "19";
			break;
		case "3":
		case "4":
		case "7":
		case "8":
			year = "20";
			break;
		default:
			alert("잘못된 인수입니다.");
			return;
	}
	
	return year + ymd;
}

function fn_getManYears(birthDtVal, compDtVal) {
	if(birthDtVal.length != 8) {
		alert("잘못된 인수입니다.");
		return;
	}
	
	var compDt = "";
	if(compDtVal!=null && compDtVal.length==8) {
		var compYear = Number(compDtVal.substring(0, 4));
		var compMon = Number(compDtVal.substring(4, 6));
		var compDay = Number(compDtVal.substring(6, 8));
		
		compDt = new Date(compYear, compMon-1, compDay);
	} else {
		compDt = new Date();
	}
	
	/*
	var birthYear = Number(birthDtVal.substring(0, 4));
	var birthMon = Number(birthDtVal.substring(4, 6));
	var birthDay = Number(birthDtVal.substring(6, 8));
	var birthDt = new Date(birthYear, birthMon-1, birthDay);
	
	var years = compDt.getFullYear() - birthDt.getFullYear();
	
	birthDt.setFullYear(compDt.getFullYear());
	
	if(compDt < birthDt) {
		years--;
	}
	*/
	var years = 99;
	if(birthDtVal!=null && birthDtVal.length==8) {
		var birthYear = Number(birthDtVal.substring(0, 4));
		years = compDt.getFullYear() - birthYear - 1;
	}
	
	return years;
}

function fn_loadCalendar(obj) {
	obj.datepicker({
		showOn:"both",
		buttonImage:"/startkosmes-preview/images/ico/ico_calendar.png",
		buttonText:"달력",
		buttonImageOnly:true,
		changeMonth : true, //추가
		changeYear : true, //추가
		dateFormat: 'yy.mm.dd',
		monthNames:['.1','.2','.3','.4','.5','.6','.7','.8','.9','.10','.11','.12'],
		monthNamesShort : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //추가
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		closeText: "닫기" ,
		currentText: "오늘" ,
		prevText : "이전달",
		nextText : "다음달",
		showMonthAfterYear:true,
		showButtonPanel: true,
		yearRange: 'c-80:c+10'
	});
}

//로딩바
function showProgress(){
	var $progress = $("<div id='progress' style='display:none;'>");
	var $loadimg = $("<img id='loadingBar' src='/startkosmes-preview/images/img_loading.gif'>");
	$progress.append($loadimg);
	
	$("body").append($progress);
	
	var maskHeight = $(document).height();
	var maskWidth = $(document).width();
	var maskLeft = ($(window).width() - 160) / 2;
	var maskTop =  ($(window).height() - 160) / 2 + $(window).scrollTop();
		
	$("#progress").css({'width':maskWidth, 'height':maskHeight});
	$("#loadingBar").css({'left':maskLeft, 'top':maskTop});
 
	$("#progress").show();
}

function hideProgress(){
	$("#progress").remove();
}

$(document).ajaxStart(function(){
	showProgress();
});

$(document).ajaxStop(function(){
	hideProgress();
});

//화면상단 가+ 이미지 글자 크게 , 작게
var nowZoom = 100;
var maxZoom = 200;
var minZoom = 50;

function zoomIn() {
        if (nowZoom < maxZoom) {
                nowZoom += 10;
        }
        else {
                return;
        }
        document.body.style.zoom = nowZoom + "%";
}

function zoomOut() {
        if (nowZoom > minZoom) {
                nowZoom -= 10;
        }
        else {
                return;
        }
        document.body.style.zoom = nowZoom + "%";
}

function fn_openPrintPop() {
	window.open("/startkosmes-preview/yh_cmn100_003.do","printPopup","width=980,height=600,top=0,left=0,scrollbars=yes");
}

// 공통 모달 메시지
function setAlertMsg(msg) {
	$("#alertMsg").append(msg);
	lpOpen('.alertPop');
}

// 공통 모달 메시지
function setAlertMsgBack(msg) {
	$("#alertMsgBack").append(msg);
	lpOpen('.alertPopBack');
}

//Excel 다운로드 2020.12.11 강환규
jQuery.download = function(url, data, method){
    // data 는  string 또는 array/object 를 파라미터로 받는다.
    data = typeof data == 'string' ? data : jQuery.param(data);
    // 파라미터를 form의  input으로 만든다.
    var inputs = '';
    jQuery.each(data.split('&'), function(){ 
        var pair = this.split('=');
        inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
    });
    
    // request를 보낸다.
    jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>').appendTo('body').submit().remove();
};




//카카오톡 버튼 생성 하기
function gfn_kakaoShare(params, title){
	// 게시판 리스트 상태에서 공유
	if(params === undefined || title === undefined){
		var href = window.location.protocol +"//"+ window.location.host + window.location.pathname;
		//console.log("kakao list " + href);
		//Kakao.init('c30880e9b6d37d7a2424b150757274b5');
		Kakao.init('b13e2adf79d4dd1a6f8106806fa55674');
	   
	    Kakao.Link.createDefaultButton({
	          container: '#kakao-link-btn',
	          objectType: 'feed',
	          content: {
	            title: '청년창업사관학교',
	            description: "",
	            //imageUrl: 'http://start.kosmes.or.kr/images/common/kakaotalk_logo.png',
	            imageUrl: '',
	            link: {
	                mobileWebUrl:href,
	                webUrl: href
	              }
	            },
	            buttons: [
	              {
	                title: '청년창업사관학교',
	                link: {
	                  mobileWebUrl: href,
	                  webUrl: href
	                }
	              }
	            ]
	          });
	}else {
		// 게시글 상세보기 상태에서 공유
		var href = window.location.protocol +"//"+ window.location.host + window.location.pathname +"?" + params ;
		//console.log("kakao detail " + href);
		//Kakao.init('c30880e9b6d37d7a2424b150757274b5');
		Kakao.init('b13e2adf79d4dd1a6f8106806fa55674');
	   
	    Kakao.Link.createDefaultButton({
	          container: '#kakao-link-btn',
	          objectType: 'feed',
	          content: {
	            title: '청년창업사관학교',
	            description: title,
	            //imageUrl: 'http://start.kosmes.or.kr/images/common/kakaotalk_logo.png',
	            imageUrl: '',
	            link: {
	                mobileWebUrl:href,
	                webUrl: href
	              }
	            },
	            buttons: [
	              {
	                title: '청년창업사관학교',
	                link: {
	                  mobileWebUrl: href,
	                  webUrl: href
	                }
	              }
	            ]
	          });
	}
	
	
}

//SNS 공유하기
function gfn_shareSns(sns_type, params, title){
	// 게시판 리스트 상태에서 공유
	if(params === undefined || title === undefined){
		var href = window.location.protocol +"//"+ window.location.host + window.location.pathname ;
		//console.log("sns list " + href);
		//var title = _this.attr('data-title');
		var loc = "";
		if( ! sns_type || !href ) return;
		
		if( sns_type == 'facebook' ) {
			loc = '//www.facebook.com/sharer/sharer.php?u='+href;
		}else if ( sns_type == 'twitter' ) {
			loc ='https://twitter.com/intent/tweet?url='+encodeURIComponent(href);
		}else if ( sns_type == 'google' ) {
			loc = '//plus.google.com/share?url='+href;
		}else if ( sns_type == 'kakaostory') {
			loc = 'https://story.kakao.com/share?url='+encodeURIComponent(href);
		}else if ( sns_type == 'band' ) {
			loc = 'http://www.band.us/plugin/share?body='+encodeURIComponent(" ")+'%0A'+encodeURIComponent(href);
		}else if ( sns_type == 'naver' ) {
			loc = "http://share.naver.com/web/shareView.nhn?url="+encodeURIComponent(href);
		}else if ( sns_type == 'kakaotalk') {
			
			
		}else {
			  return false;
		}
		//console.log(loc);
		window.open(loc,'','width=600,height=300,top=100,left=100,scrollbars=yes');
		
	}else {
	// 게시글 상세보기 상태에서 공유
		var href = window.location.protocol +"//"+ window.location.host + window.location.pathname +"?" + params ;
		//console.log("sns detail " + href);
		//var title = _this.attr('data-title');
		var loc = "";
		if( ! sns_type || !href || !title) return;
		
		if( sns_type == 'facebook' ) {
			loc = '//www.facebook.com/sharer/sharer.php?u='+href+'&t='+title;
		}else if ( sns_type == 'twitter' ) {
			loc ='https://twitter.com/intent/tweet?text='+title+'&url='+encodeURIComponent(href);
		}else if ( sns_type == 'google' ) {
			loc = '//plus.google.com/share?url='+href;
		}else if ( sns_type == 'kakaostory') {
			loc = 'https://story.kakao.com/share?url='+encodeURIComponent(href);
		}else if ( sns_type == 'band' ) {
			loc = 'http://www.band.us/plugin/share?body='+encodeURIComponent(title)+'%0A'+encodeURIComponent(href);
		}else if ( sns_type == 'naver' ) {
			loc = "http://share.naver.com/web/shareView.nhn?url="+encodeURIComponent(href)+"&title="+encodeURIComponent(title);
		}else if ( sns_type == 'kakaotalk') {
			
			
		}else {
			  return false;
		}
		//console.log(loc);
		window.open(loc,'','width=600,height=300,top=100,left=100,scrollbars=yes');
	}
	
	
	
	
	

	
}




//공통 모달 confirm 메시지
function setConfirmMsg(msg, target, url) {
$("#confirmMsg").append(msg);
$("#idConfirmMsg").click(function(){
	 $("#"+target).attr("action", url);
     $("#"+target).submit();
	
})
lpOpen('.confirmMsgPop');
}

//공통 모달 confirm 메시지 게시판 전용
function setConfirmMsgforBoard(msg, target, url) {
$("#confirmMsgforBoard").append(msg);
$("#idConfirmMsgforBoard").click(function(){
	 $("#"+target).attr("action", url);
     $("#"+target).submit();
	
})
lpOpen('.confirmMsgPop');
}
//공통코드  추가 된 코드 조회 조회
//commTpClmNm : 코드
//commTpCommCd : 코드값
//selectId : selectId
//첫줄명
function getAddCommCodeList(commTpClmNm, commTpCommCd, selectId, txt, chkId, code, codeName) {
	
	var _commParams = {dtyDvCd: "YA"};
	if(commTpClmNm != "" && commTpClmNm != undefined) {
		_commParams.commTpClmNm = commTpClmNm;
	}
	if(commTpCommCd != "" && commTpCommCd != undefined) {
		_commParams.commTpCommCd = commTpCommCd;
	}
	
	// 기존 데이타 초기화
	$("#"+selectId).empty();
	
	$.ajax({
		type:"post",
		url:"/startkosmes-preview/yh_cmn001_001.do",
		data: _commParams,
		dataType:"json",
		success:function(data){
			if(data.resultSVO.resultCode != "") {
				alert(data.resultSVO.resultMsg);
				return;
			}
			// 공통코드 리스트 조회
			var list = data.resultSVO.commCodeList;
			//선택 추가
			if(txt != "" && txt != undefined)
			$("#"+selectId).append("<option value=''>"+txt+"</option>");
			var selected = "selected";
			for(var i=0; i<list.length; i++) {
				if(chkId == list[i].commTpCommCd) {
					selected = "selected";
				}else {
					selected = "";
				}
				$("#"+selectId).append("<option value='"+list[i].commTpCommCd+"' "+selected+">"+list[i].dtlCommCdNm1+"</option>");
			}
			
			
			if(chkId == code) {
				selected = "selected";
			}else {
				selected = "";
			}
			$("#"+selectId).append("<option value='"+ code +"' "+selected+">"+ codeName +"</option>");

		},
		error:function(request,status,error){
			alert("공통코드 조회 중 오류가 발생했습니다.\n(오류코드:"+error+")");
		}
	});
}

//특수문자 제거
function gfn_regExp(str){  
	
	//alert(str);
	var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
	
		
	//특수문자 검증
	if(reg.test(str)){
		//특수문자 제거후 리턴
		return str.replace(reg, "");    
	} else {
		//특수문자가 없으므로 본래 문자 리턴
		return str;
	}  
}


//사업자번호 확인
function gfn_checkBnrn(bnrn, bsnBeginDt, repKorNm){
	var businessFlag = false;
    var reqData = {
    		businesses:[
    		        {
					b_no : bnrn,
					start_dt : bsnBeginDt,
					p_nm : repKorNm,
					p_nm2 : "",
					b_nm : "",
					corp_no : "",
					b_sector : "",
					b_type : "",
					b_adr : ""
				}
    		]
    };
    
	$.ajax({
         url :"https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=NKihZbdeMk94hse%2B%2FDVWz5XG7FPSYk0J808TjXVrhqO3Tav4mOMtxOjNZeg3InlKHjMGV4jGkcYmWj%2FJLWs59g%3D%3D"
        ,type:"POST"
        ,data:JSON.stringify(reqData)
        ,dataType:"JSON"
        ,contentType:"application/json"
        ,accept:"applecation/json"
        ,async: false
       	,success:function(result){
			if(result.data[0].valid == "01"){
				businessFlag = true;
			}else{
				businessFlag = false;
			}
		},
		error:function(result){
			alert("다시 시도해 주세요.\n(오류코드:"+result.responseText+")");
			businessFlag = false;
		}
    });
    
    return businessFlag;
}

function isValidKoreanPhone(phone) {
  // 1. 숫자 이외의 모든 문자(하이픈, 공백, 점 등) 제거
  const cleaned = phone.replace(/\D/g, "");

  // 2. 통합 정규식 패턴
  // (01[016789]) : 휴대폰 (010, 011 등)
  // (02|0[3-6][1-5]) : 유선전화 (서울 02, 경기 031 등)
  // (070|080|050) : 인터넷전화, 수신자부담, 안심번호
  // (1[5678]\d{2}) : 대표번호 (1588, 1644 등 - 8자리)
  
  const regex = /^(01[016789]|02|0[3-6][1-5]|070|080|050)\d{3,4}\d{4}$|^(1[5678]\d{2})\d{4}$/;

  return regex.test(cleaned);
}
