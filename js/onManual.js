
let MANUAL_DATA = {};
//let CURRENT_SECTION = 'life';
let CURRENT_SECTION = isToggle ? 'life' : 'cost';

$(function () {
  // JSON 로드
  $.getJSON('/startkosmes-preview/data/onManual.json', function (data) {
    MANUAL_DATA = data;
    renderList(CURRENT_SECTION);
    initDefaultContent();
  });

  /* ==========================
     토글 버튼 클릭
  ========================== */
  $('.onToggle-btn').on('click', function () {
    const section = $(this).data('value');
    
    // 버튼 활성화 상태 변경
    $('.onToggle-btn').removeClass('select');
    $(this).addClass('select');
    
    // 섹션 변경 및 리스트 렌더링
    CURRENT_SECTION = section;
    renderList(section);
    
    // 첫 번째 아이템 자동 선택
    setTimeout(function() {
      initDefaultContent();
    }, 100);
  });

  /* ==========================
     대분류(onItem) 클릭
  ========================== */
  $('.onListBox').on('click', '.onItem', function () {
    const $item = $(this).closest('.onItem');

    // 아코디언 형태
    $('.onItem').not($item).removeClass('open');
    $item.toggleClass('open');
  });

  /* ==========================
     소분류(li) 클릭
  ========================== */
  $('.onListBox').on('click', '.onItem ul li', function (e) {
    e.stopPropagation();

    const itemText = $(this).text().trim();
    const parentTitle = $(this).closest('.onItem').find('h2').text().trim();

    renderContent(itemText, parentTitle);
  });
});

/* ==========================
   리스트 렌더링
========================== */
function renderList(section) {
  const sectionData = MANUAL_DATA[section];
  if (!sectionData) return;

  let html = '';
  let itemCount = 1;

  // title1~title6, items1~items6 순회
  while (sectionData[`title${itemCount}`]) {
    const title = sectionData[`title${itemCount}`];
    const items = sectionData[`items${itemCount}`];

    if (title && items) {
      html += `<li class="onItem${itemCount === 1 ? ' open' : ''}">`;
      html += `  <h2>${title}</h2>`;
      html += `  <ul>`;

      // 각 아이템 추가
      Object.keys(items).forEach(itemKey => {
        html += `    <li>${itemKey}</li>`;
      });

      html += `  </ul>`;
      html += `</li>`;
    }

    itemCount++;
  }

  // 리스트 업데이트
  $('.onListBox > ul').html(html);
}

/* ==========================
   초기 콘텐츠
========================== */
function initDefaultContent() {
  const firstItem = $('.onItem.open ul li').first();
  if (firstItem.length) {
    firstItem.trigger('click');
  }
}

/* ==========================
   콘텐츠 렌더링
========================== */
function renderContent(itemText, parentTitle) {
  const sectionData = MANUAL_DATA[CURRENT_SECTION];
  if (!sectionData) return;

  let matchedItem = null;

  // items1 ~ items6 탐색
  Object.keys(sectionData).forEach(key => {
    if (!key.startsWith('items')) return;
    if (sectionData[key][itemText]) {
      matchedItem = sectionData[key][itemText];
    }
  });

  if (!matchedItem) return;

  /* 좌측 선택 처리 */
  $('.onListBox ul li').removeClass('onSelect');
  $('.onListBox ul li').filter(function () {
    return $(this).text().trim() === itemText;
  }).addClass('onSelect');

  /* Header */
  $('.onContentHeader h4').text(matchedItem.header);

  /* Breadcrumb */
  $('.breadcrumb').html(`
    <dt>${parentTitle}</dt>
    <dd>${matchedItem.header}</dd>
  `);

  /* Content 로딩 */
  $('.onContentInner')
    .empty()
    .load(matchedItem.file, function (res, status) {
      if (status === 'error') {
        $(this).html('<p>콘텐츠를 불러오지 못했습니다.</p>');
      }
    });
}
