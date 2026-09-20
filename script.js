// 页脚年份
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// 页眉滚动状态
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// 滚动显现（尊重 prefers-reduced-motion）
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll([
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

  const groups = new Map();
  targets.forEach((el) => {
    const key = el.parentElement;
    const i = groups.get(key) || 0;
    groups.set(key, i + 1);
    el.style.setProperty('--rvd', `${Math.min(i * 60, 240)}ms`);
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

  targets.forEach((el) => io.observe(el));

  // 兜底：页面加载后，把已处于视口内但未触发的元素直接显示，
  // 防止任何时序问题导致内容停留在透明状态。
  const forceVisible = () => {
    document.querySelectorAll('.rv:not(.in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.96 && r.bottom > 0) el.classList.add('in');
    });
  };
  window.addEventListener('load', () => setTimeout(forceVisible, 600));
  setTimeout(forceVisible, 1500);
}

// 图片灯箱：点击画廊/海报图片查看完整大图
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  const lbCap = lightbox.querySelector('.lb-cap');
  const lbClose = lightbox.querySelector('.lb-close');

  const openLb = (img, caption) => {
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = caption || img.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.g-item, .shot, .poster-card .p-media, .recog-posters figure').forEach((el) => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      if (!img) return;
      const cap = el.querySelector('figcaption');
      openLb(img, cap ? cap.textContent : '');
    });
  });

  lightbox.addEventListener('click', closeLb);
  lbClose.addEventListener('click', closeLb);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLb();
  });
}
