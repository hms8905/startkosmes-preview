$(function() {
  const buttons = document.querySelectorAll('.onToggle-btn');
  const activeBg = document.querySelector('.onToggle-active');

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('select'))
      btn.classList.add('select')

      activeBg.style.transform = `translateX(${index * 100}%)`
    })
  });

  $(".onCloseBtn").on('click', function() {
    if(!$(this).hasClass('clicked')) {
      $(this).addClass('clicked');
      $(".onLeftNavBar").css('display', 'none');
      $(".onOpenBtn").css('display', 'flex');
      $(".onOpenBtn").removeClass('clicked');
    }
  });
  
  $(".onOpenBtn").on('click', function() {
    if(!$(this).hasClass('clicked')) {
      $(this).addClass('clicked');
      $(".onLeftNavBar").css('display', 'block');
      $(".onOpenBtn").css('display', 'none');
      $(".onCloseBtn").removeClass('clicked');
    }
  });
});