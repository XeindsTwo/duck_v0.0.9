gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const timeline = gsap.timeline();

const homeSection = document.querySelector('.home');
const duckImage = document.querySelector('.home__img');

gsap.set(duckImage, {opacity: 0, scale: 0, y: 1800});

ScrollTrigger.create({
  trigger: homeSection,
  start: 'top 80%',
  onEnter: () => {
    gsap.to(duckImage, {
      duration: 1,
      y: 0,
      opacity: 1,
      scale: 1,
      delay: 0.5,
      onComplete: () => {
        gsap.to(duckImage, {
          duration: 0.1, scale: 1.05, yoyo: true, repeat: 1, onComplete: () => {
            gsap.to(duckImage, {duration: 0.1, scale: 1});
          }
        });
      }
    });
  }
});

const roadmapItems = document.querySelectorAll('.roadmap__item');

const animateItem = (item, duration) => {
  return new Promise(resolve => {
    timeline.to(item, {className: 'roadmap__item active', duration: duration, onComplete: resolve});
  });
};

const removeActiveClass = (item, duration) => {
  return new Promise(resolve => {
    timeline.to(item, {className: 'roadmap__item', duration: duration, onComplete: resolve});
  });
};

ScrollTrigger.create({
  trigger: '.roadmap',
  start: 'top 66%',
  end: 'bottom 66%',
  once: true,
  lockScroll: true,
  onEnter: async () => {
    setTimeout(async () => {
      timeline.clear();
      for (let index = 0; index < roadmapItems.length; index++) {
        const currentItem = roadmapItems[index];
        const nextItem = roadmapItems[index + 1];
        await animateItem(currentItem, 1.3);
        if (nextItem) {
          await removeActiveClass(currentItem, 0);
        } else {
          await removeActiveClass(currentItem, 1.3);
        }
      }
    }, 1500);
  },
  onEnterBack: () => {
    timeline.clear();
    roadmapItems.forEach((item) => {
      timeline.to(item, {className: 'roadmap__item', duration: 1.2});
    });
  }
});

ScrollTrigger.create({
  trigger: '.explore',
  start: 'top 90%',
  onEnter: async () => {
    await gsap.from('.explore__img', {
      opacity: 0,
      scale: 0,
      duration: 0.8,
    });
  },
  onEnterBack: () => {
    gsap.to('.explore__img', {
      opacity: 0,
      scale: 0,
      duration: 0.7,
      delay: 1.2,
    });
  }
});

const links = document.querySelectorAll('.desktop');
links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    link.blur();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const targetOffsetTop = targetElement.offsetTop - 80;
    gsap.to(window, {
      duration: 1,
      scrollTo: {y: targetOffsetTop},
      ease: "power2.inOut"
    });
  });
});

const menuLinks = document.querySelectorAll('.desktop');
let lastClickTimestamp = 0;
const clickDelay = 2000;

menuLinks.forEach(function (menuLink) {
  menuLink.addEventListener('click', function (event) {
    const currentTimestamp = Date.now();
    if (currentTimestamp - lastClickTimestamp < clickDelay || isScrollingAnimation) {
      return;
    }
    lastClickTimestamp = currentTimestamp;

    menuLink.blur();
    event.preventDefault();

    const targetId = menuLink.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    const headerHeight = document.querySelector('.header').offsetHeight;
    let targetOffset;

    if (targetId === "community") {
      const targetRect = targetElement.getBoundingClientRect();
      const sectionBottom = targetRect.top + targetRect.height + window.scrollY;
      const windowHeight = window.innerHeight;
      targetOffset = sectionBottom - windowHeight + 1;
    } else {
      targetOffset = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
    }

    scrolling.disable();
    gsap.to(window, {
      scrollTo: {y: targetOffset, autoKill: false},
      onComplete: () => {
        ScrollTrigger.refresh();
        scrolling.enable();

        const handleWheel = (e) => {
          if (e.deltaY < 0) {
            scrolling.disable();
            scrolling.enable();
            window.removeEventListener('wheel', handleWheel);
            goToSection(window.scrollY - window.innerHeight);
          }
        };

        window.addEventListener('wheel', handleWheel);
      },
      duration: 2,
      ease: 'power4.inOut'
    });
  });
});

const duckonomicsSection = document.querySelector('#duckonomics');
const duckonomicsTitle = document.querySelector('.ecosystem__inner .top');

if (duckonomicsSection && duckonomicsTitle) {
  ScrollTrigger.create({
    trigger: duckonomicsSection,
    start: 'top-=50 center',
    end: 'bottom center',
    once: true,
    onEnter: () => {
      gsap.to(window, {
        scrollTo: {
          y: duckonomicsTitle.offsetTop + duckonomicsTitle.offsetHeight + 20,
          autoKill: false
        },
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  });
}