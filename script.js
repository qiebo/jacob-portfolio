// 页面年份
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// 页眉滚动状态：首页和案例页共用
const header = document.querySelector('.site-header, .home-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// 滚动显现：案例页旧组件和首页的新组件都使用 .rv
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll([
  '.rv',
  '.section-head',
  '.work-card',
  '.cap-card',
  '.recog-posters figure',
  '.recog-copy',
  '.about-main',
  '.about-facts li',
  '.hero-copy > *',
  '.hero-side > *',
  '.g-item',
  '.shot',
  '.mascot-band',
  '.info-card',
  '.step-card',
  '.safety-item',
  '.tech-item',
  '.poster-card',
  '.timeline-item',
  '.fact-row',
  '.result-list li',
  '.case-section .label',
  '.case-section h2',
].join(','));

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('in'));
} else {
  const groups = new Map();
  revealTargets.forEach((el) => {
    const key = el.parentElement;
    const index = groups.get(key) || 0;
    groups.set(key, index + 1);
    el.style.setProperty('--rvd', `${Math.min(index * 60, 240)}ms`);
    el.classList.add('rv');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -4% 0px' });

  revealTargets.forEach((el) => io.observe(el));

  const forceVisible = () => {
    document.querySelectorAll('.rv:not(.in)').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * .96 && rect.bottom > 0) el.classList.add('in');
    });
  };
  window.addEventListener('load', () => setTimeout(forceVisible, 500));
  setTimeout(forceVisible, 1200);
}

// 项目集合筛选
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-project]');
const collectionCount = document.querySelector('#collection-count');
if (filterButtons.length && projectCards.length) {
  const applyFilter = (filter) => {
    let visible = 0;
    projectCards.forEach((card) => {
      const kinds = (card.dataset.kind || '').split(/\s+/);
      const match = filter === 'all' || kinds.includes(filter);
      card.classList.toggle('is-filtered-out', !match);
      if (match) visible += 1;
    });
    filterButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    if (collectionCount) collectionCount.textContent = `${visible} 个项目 · 持续更新`;
  };
  filterButtons.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
}

// 图片灯箱：首页项目媒体与案例页画廊共用
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  const lbCap = lightbox.querySelector('.lb-cap');
  const lbClose = lightbox.querySelector('.lb-close');
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  const openLightbox = (img, caption) => {
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = caption || img.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('.media-thumb, .g-item, .shot, .poster-card .p-media, .recog-posters figure').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const img = trigger.querySelector('img');
      if (!img) return;
      const caption = trigger.dataset.caption || trigger.querySelector('figcaption')?.textContent || '';
      openLightbox(img, caption);
    });
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}
