/**
 * Bloqueia a rolagem da página e devolve uma função que a libera,
 * restaurando exatamente a mesma posição (funciona também no Safari do iOS).
 */
export function lockScroll(): () => void {
  const { body, documentElement: html } = document;
  const scrollY = window.scrollY;
  const scrollbar = window.innerWidth - html.clientWidth;
  const prev = {
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
    paddingRight: body.style.paddingRight,
    scrollBehavior: html.style.scrollBehavior,
  };

  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.width = '100%';
  if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

  return () => {
    body.style.position = prev.position;
    body.style.top = prev.top;
    body.style.width = prev.width;
    body.style.paddingRight = prev.paddingRight;
    // Restaura instantaneamente, sem a rolagem suave global.
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, scrollY);
    html.style.scrollBehavior = prev.scrollBehavior;
  };
}
