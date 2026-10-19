const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('closeBtn');

// Находим ВСЕ интерактивные элементы внутри меню
const menuItems = mobileMenu.querySelectorAll('button, a');
const firstFocusable = menuItems[0]; 
const lastFocusable = menuItems[menuItems.length - 1];

function openMenu() {
    mobileMenu.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    closeBtn.focus(); 
}

    function closeMenu(returnFocus = true) {
  mobileMenu.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  if (returnFocus) menuBtn.focus();

}

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', () => closeMenu());
document.querySelectorAll('.menu-link').forEach(function (link) {
  link.addEventListener('click', function () {
    closeMenu(false);
  });
});

// Отслеживаем нажатия клавиш
document.addEventListener('keydown', function(event) {
    // 1. Закрытие по Escape
    if (mobileMenu.classList.contains('is-open') && event.key === 'Escape') {
        closeMenu();
    }

    // 2. Ловушка фокуса (Focus Trap) при нажатии Tab
    if (mobileMenu.classList.contains('is-open') && event.key === 'Tab') {
        if (event.shiftKey) { // Если жмем Shift + Tab (идем назад)
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus(); // прыгаем на последний элемент
                event.preventDefault();
            }
        } else { // Если жмем просто Tab (идем вперед)
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus(); // прыгаем на первый элемент
                event.preventDefault();
            }
        }
    }
});