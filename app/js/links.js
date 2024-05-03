export function links() {
  const headerLinks = document.querySelectorAll('.header__link');
  const sections = document.querySelectorAll('section');
  const footer = document.querySelector('footer');
  const header = document.querySelector('header');
  const roadmapSection = document.querySelector('.roadmap');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
  };

  const observerOptionsRoadmap = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
  };

  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.boundingClientRect.top >= 0) {
        header.classList.remove('white');
      } else {
        header.classList.add('white');
      }
    });
  }, observerOptionsRoadmap);

  headerObserver.observe(roadmapSection);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetId = entry.target.getAttribute('id');
        headerLinks.forEach(link => {
          if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  observer.observe(footer);
}