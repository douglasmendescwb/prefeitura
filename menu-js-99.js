// Script para corrigir problemas de submenu
document.addEventListener('DOMContentLoaded', function() {
  // Função para remover qualquer scroll dos submenus
  function fixSubmenuScroll() {
    const submenus = document.querySelectorAll('.menu-nav-list-sjp-99 .sub-menu');
    submenus.forEach(function(submenu) {
      // Remover qualquer estilo inline que possa estar causando scroll
      submenu.style.overflow = 'visible';
      submenu.style.maxHeight = 'none';
      submenu.style.height = 'auto';
    });
  }
  
  // Executar a correção no carregamento da página
  fixSubmenuScroll();
  
  // Executar novamente após qualquer operação de redimensionamento
  window.addEventListener('resize', fixSubmenuScroll);
  
  // Melhorar o comportamento dos submenus em desktop
  function enhanceDesktopMenus() {
    if (window.innerWidth >= 992) {
      // Adicionar event listeners para acionar os submenus em hover no desktop
      const menuItemsWithChildren = document.querySelectorAll('.menu-nav-list-sjp-99 > li.menu-item-has-children');
      
      menuItemsWithChildren.forEach(function(item) {
        // Garantir que submenus sejam bem posicionados e visíveis
        const submenu = item.querySelector('.sub-menu');
        if (submenu) {
          // Verificar se o submenu sairia da tela
          item.addEventListener('mouseenter', function() {
            const rect = submenu.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            
            if (rect.right > viewportWidth) {
              // Reposicionar o submenu se ele sair da tela
              submenu.style.left = 'auto';
              submenu.style.right = '0';
            }
          });
        }
      });
    }
  }
  
  // Inicializar os aprimoramentos de desktop
  enhanceDesktopMenus();
  
  // Reajustar quando a janela for redimensionada
  window.addEventListener('resize', enhanceDesktopMenus);
});