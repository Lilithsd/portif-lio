document.addEventListener('DOMContentLoaded', () => {
  // Cache dos elementos
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const header = document.querySelector('header');
  const projetos = document.querySelectorAll('.projeto');

  // Função para smooth scroll com offset do header fixo
  function smoothScroll(event) {
    event.preventDefault();
    const targetID = this.getAttribute('href');
    const targetElement = document.querySelector(targetID);
    if (!targetElement) return;
    const offsetTop = targetElement.offsetTop - header.offsetHeight;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  navLinks.forEach(link => link.addEventListener('click', smoothScroll));

  // Função para marcar link ativo com base na rolagem
  function updateActiveLink() {
    let index = projetos.length;

    while(--index && window.scrollY + header.offsetHeight + 50 < projetos[index].offsetTop) {}

    navLinks.forEach(link => link.classList.remove('active'));
    if(projetos[index]) {
      const id = '#' + projetos[index].id || '';
      navLinks.forEach(link => {
        if(link.getAttribute('href') === id) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', () => {
    // Cabeçalho menor ao rolar
    if(window.scrollY > 100) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }

    updateActiveLink();
  });

  // Intersection Observer para animar os projetos na entrada da viewport
  const observerOptions = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  projetos.forEach(projeto => observer.observe(projeto));
});
