const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelector('#year').textContent = new Date().getFullYear();
const projects = {
  medicine: {
    type: 'iOS APP / 2026', title: 'おくすりだより',
    description: '服薬記録と気分の記録をシンプルに続けるiOSアプリ。毎日の習慣を負担なく記録できる体験を目指しています。',
    url: 'https://apps.apple.com/jp/app/%E3%81%8A%E3%81%8F%E3%81%99%E3%82%8A%E3%81%A0%E3%82%88%E3%82%8A/id6823008723'
  },
  creative: {
    type: 'CREATIVE WORK / ONGOING', title: 'Design & Creative',
    description: 'UI・Webデザイン、グラフィック、映像制作など。企画から見た目、使いやすさまで、一貫した世界観を大切に制作しています。',
    url: null
  }
};
const dialog = document.querySelector('#project-dialog');
const dialogLink = document.querySelector('#dialog-link');
const creativeGallery = document.querySelector('#creative-gallery');
const imageDialog = document.querySelector('#image-dialog');
const imageFull = document.querySelector('#image-full');
const imageCaption = document.querySelector('#image-caption');
const creativeWorks = [
  { src: 'assets/design-creative/instagram-cafe.png', title: 'カフェ紹介｜Instagram投稿', type: 'SNS DESIGN' },
  { src: 'assets/design-creative/instagram-cafe-carousel.png', title: 'カフェ紹介｜Instagram投稿デザイン', type: 'SNS DESIGN' },
  { src: 'assets/design-creative/business-card-front.png', title: 'Éclat Mode｜名刺 表面', type: 'BUSINESS CARD' },
  { src: 'assets/design-creative/business-card-back.png', title: 'Éclat Mode｜名刺 裏面', type: 'BUSINESS CARD' },
  { src: 'assets/design-creative/gift-catalog.png', title: 'Gift Catalog｜Canvaテンプレート', type: 'GRAPHIC DESIGN' },
  { src: 'assets/design-creative/vision-board.png', title: 'Vision Board｜Canvaテンプレート', type: 'TEMPLATE DESIGN' },
  { src: 'assets/design-creative/camp-poster.png', title: 'さくらキャンプ場｜ポスターデザイン', type: 'POSTER DESIGN' }
];
creativeGallery.innerHTML = creativeWorks.map((work, index) => `
  <button type="button" class="gallery-item" data-gallery-index="${index}" aria-label="${work.title}を拡大表示">
    <span class="gallery-image-wrap"><img src="${work.src}" alt="${work.title}" loading="lazy" /></span>
    <span class="gallery-item-type">${work.type}</span>
    <span class="gallery-item-title">${work.title}<span aria-hidden="true">↗</span></span>
  </button>
`).join('');
creativeGallery.addEventListener('click', event => {
  const button = event.target.closest('[data-gallery-index]');
  if (!button) return;
  const work = creativeWorks[Number(button.dataset.galleryIndex)];
  imageFull.src = work.src;
  imageFull.alt = work.title;
  imageCaption.textContent = work.title;
  imageDialog.showModal();
});
document.querySelector('.image-dialog-close').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => { if (event.target === imageDialog) imageDialog.close(); });
imageDialog.addEventListener('close', () => { imageFull.removeAttribute('src'); });
document.querySelectorAll('.work-detail').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  if (!project) return;
  document.querySelector('#dialog-type').textContent = project.type;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  creativeGallery.hidden = button.dataset.project !== 'creative';
  dialog.classList.toggle('gallery-dialog', button.dataset.project === 'creative');
  dialogLink.hidden = !project.url;
  if (project.url) dialogLink.href = project.url;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
