/* MOKEKI streaming concept: shared navigation, JSON catalogue, rendering and interactions. */
'use strict';

// Embedded fallback catalogue: used if fetch() is unavailable (for example, file:// access).
const fallbackTitles = [
 {id:1,title:'Mountain of Echoes',type:'Movie',genre:'Drama',year:2025,duration:'1h 48m',rating:'PG-13',description:'In the highlands of Lesotho, a young shepherd returns home to protect his family’s land and discovers the stories that shaped his community.',poster:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ',featured:true,category:['trending','popular','recommended']},
 {id:2,title:'Big Buck Bunny',type:'Movie',genre:'Comedy',year:2024,duration:'10m',rating:'G',description:'A gentle giant rabbit enjoys a peaceful day until three mischievous rodents disturb the forest. A Blender Foundation open movie.',poster:'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ',featured:false,category:['trending','popular']},
 {id:3,title:'Sintel',type:'Movie',genre:'Action',year:2024,duration:'15m',rating:'PG',description:'A young woman sets out on a dangerous journey across a fantasy world in search of a lost dragon companion. Blender Foundation open movie.',poster:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/eRsGyueVLvQ',featured:false,category:['trending','new']},
 {id:4,title:'Tears of Steel',type:'Movie',genre:'Action',year:2025,duration:'12m',rating:'PG-13',description:'In a futuristic Amsterdam, a team attempts to save humanity through a daring experiment. Blender Foundation open movie.',poster:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/R6MlUcmOul8',featured:false,category:['popular','new']},
 {id:5,title:'Elephants Dream',type:'Movie',genre:'Drama',year:2023,duration:'11m',rating:'PG',description:'Two characters explore a strange machine world in this surreal animated short. Blender Foundation open movie.',poster:'https://images.unsplash.com/photo-1511497584788-876760111969?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1511497584788-876760111969?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/TLkA0arelLg',featured:false,category:['recommended','popular']},
 {id:6,title:'Spring',type:'Movie',genre:'Drama',year:2026,duration:'8m',rating:'G',description:'A shepherd girl and her dog face a changing season in a beautiful animated tale. Blender Foundation open movie.',poster:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/WhWc3b3KhnY',featured:false,category:['new','recommended']},
 {id:7,title:'Cosmos Laundromat',type:'Movie',genre:'Comedy',year:2025,duration:'12m',rating:'PG',description:'A sheep gets a surprising second chance at life in an imaginative animated adventure. Blender Foundation open movie.',poster:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/Y-rmzh0PI3c',featured:false,category:['trending','recommended']},
 {id:8,title:'Voices of the Highlands',type:'Documentary',genre:'Documentary',year:2025,duration:'52m',rating:'PG',description:'Meet the artists, herders and storytellers preserving the living heritage of Lesotho’s mountain communities.',poster:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4',featured:false,category:['popular','recommended']},
 {id:9,title:'The Water Keepers',type:'Documentary',genre:'Documentary',year:2024,duration:'44m',rating:'PG',description:'A look at the people and projects working to protect water resources for future generations.',poster:'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/ysz5S6PUM-U',featured:false,category:['new','popular']},
 {id:10,title:'Code Your Future',type:'Series',genre:'Educational',year:2026,duration:'6 episodes',rating:'G',description:'A beginner-friendly series introducing young creators to coding, web design and digital problem-solving.',poster:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/UB1O30fR-EE',featured:false,category:['new','recommended']},
 {id:11,title:'The Last Seed',type:'Documentary',genre:'Documentary',year:2023,duration:'1h 02m',rating:'PG',description:'Farmers share knowledge about food, biodiversity and the importance of protecting traditional seeds.',poster:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4',featured:false,category:['popular','recommended']},
 {id:12,title:'City Lights, Country Dreams',type:'Series',genre:'Drama',year:2026,duration:'8 episodes',rating:'PG-13',description:'Two friends balance ambition, family expectations and opportunity between the city and their rural home.',poster:'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ',featured:false,category:['trending','new']},
 {id:13,title:'Laughing Stock',type:'Movie',genre:'Comedy',year:2024,duration:'1h 26m',rating:'PG',description:'A small-town theatre group gets one last chance to save its stage with a wonderfully chaotic performance.',poster:'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/ysz5S6PUM-U',featured:false,category:['trending','popular']},
 {id:14,title:'Beyond the Classroom',type:'Series',genre:'Educational',year:2025,duration:'5 episodes',rating:'G',description:'Practical lessons that connect classroom learning with everyday life, creativity and community projects.',poster:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/UB1O30fR-EE',featured:false,category:['recommended','new']},
 {id:15,title:'The Mountain Rescue',type:'Movie',genre:'Action',year:2023,duration:'1h 37m',rating:'PG-13',description:'A volunteer rescue team races against a sudden storm to bring stranded travellers home safely.',poster:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/eRsGyueVLvQ',featured:false,category:['trending','popular']},
 {id:16,title:'Roots and Rhythms',type:'Documentary',genre:'Documentary',year:2026,duration:'48m',rating:'G',description:'Explore the music, dance, craft and contemporary creativity that connect generations across Southern Africa.',poster:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&auto=format&fit=crop&q=85',backdrop:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1800&auto=format&fit=crop&q=90',trailer:'https://www.youtube-nocookie.com/embed/TLkA0arelLg',featured:false,category:['new','recommended']}
];

const LIST_KEY = 'mokekiWatchlist';
let titles = [];
let watchlist = readWatchlist();
let activeTitle = null;

// Read saved IDs safely; malformed localStorage content is reset to an empty list.
function readWatchlist() {
  try { const saved = JSON.parse(localStorage.getItem(LIST_KEY) || '[]'); return Array.isArray(saved) ? saved.map(Number) : []; }
  catch (error) { console.warn('Could not read saved list:', error); return []; }
}
function saveWatchlist() { localStorage.setItem(LIST_KEY, JSON.stringify(watchlist)); updateListBadges(); }
function escapeHTML(value) { return String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character])); }

// Shared page chrome is inserted into every page to keep navigation consistent.
function renderChrome() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  const currentPage = document.body.dataset.page;
  if (header) header.innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark mokeki-navbar"><div class="container-fluid px-lg-4"><a class="navbar-brand" href="index.html"><img src="assets/logo.svg" alt="MOKEKI home" width="180" height="45"></a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navigation" aria-controls="main-navigation" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="main-navigation"><ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2"><li class="nav-item"><a class="nav-link ${currentPage==='home'?'active':''}" href="index.html">Home</a></li><li class="nav-item"><a class="nav-link ${currentPage==='browse'?'active':''}" href="browse.html">Browse</a></li><li class="nav-item"><a class="nav-link ${currentPage==='mylist'?'active':''}" href="mylist.html">My List <span class="count-badge" data-list-count>0</span></a></li><li class="nav-item"><a class="nav-link ${currentPage==='about'?'active':''}" href="about.html">About</a></li><li class="nav-item ms-lg-2"><a class="btn btn-nav ${currentPage==='signin'?'current':''}" href="signin.html">Sign In</a></li></ul></div></div></nav>`;
  if (footer) footer.innerHTML = `<footer class="site-footer"><div class="container"><div class="row gy-4 align-items-center"><div class="col-md-4"><a href="index.html"><img src="assets/logo.svg" alt="MOKEKI" width="165" height="42"></a><p class="footer-tagline">Stories That Move You.</p></div><div class="col-md-4"><p class="footer-copy">An original Lesotho-inspired student streaming-platform concept.</p><p class="footer-copy">Sample trailers are third-party embeds. Blender Foundation open-movie titles are attributed on our About page.</p></div><div class="col-md-4 text-md-end"><a href="browse.html">Browse</a><a href="mylist.html">My List</a><a href="about.html">Help</a><p class="copyright">© ${new Date().getFullYear()} MOKEKI. Student project.</p></div></div></div></footer>`;
  updateListBadges();
}
function updateListBadges() { document.querySelectorAll('[data-list-count]').forEach(node => node.textContent = watchlist.length); const headingCount = document.getElementById('mylist-heading-count'); if (headingCount) headingCount.textContent = `(${watchlist.length})`; }

// Fetch the local JSON data. A complete embedded data array keeps the demo usable offline.
async function loadTitles() {
  const loading = document.getElementById('loading-state');
  const errorBox = document.getElementById('load-error');
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('The catalogue is empty.');
    titles = data;
  } catch (error) {
    console.warn('Using embedded catalogue fallback:', error);
    titles = fallbackTitles;
    if (errorBox) { errorBox.classList.remove('d-none'); errorBox.textContent = 'The local catalogue could not be fetched. The demonstration is using its built-in sample catalogue instead. For the full Fetch demonstration, run the site through GitHub Pages, Netlify or a local web server.'; }
  } finally {
    if (loading) loading.classList.add('d-none');
  }
  renderCurrentPage();
}
function renderCurrentPage() {
  const page = document.body.dataset.page;
  if (page === 'home') renderHome();
  if (page === 'browse') { populateFilters(); applyBrowseFilters(); }
  if (page === 'mylist') renderMyList();
}

function imageMarkup(title, className='poster-image') {
  const safeTitle = escapeHTML(title.title);
  const fallbackClass = className === 'modal-poster' ? 'poster-fallback modal-poster' : 'poster-fallback';
  return `<img class="${className}" src="${escapeHTML(title.poster)}" alt="Poster artwork for ${safeTitle}" loading="lazy" onerror="this.onerror=null;this.outerHTML='<div class=${fallbackClass}><span>${safeTitle}</span></div>'">`;
}
function cardMarkup(title, compact=false) {
  const isSaved = watchlist.includes(Number(title.id));
  return `<article class="${compact?'movie-card compact-card':'col-6 col-sm-4 col-md-3 col-xl-2 movie-column'}"><div class="movie-card-inner"><button class="poster-button" type="button" data-open-title="${Number(title.id)}" aria-label="View details for ${escapeHTML(title.title)}">${imageMarkup(title)}<span class="poster-shade"></span><span class="poster-play" aria-hidden="true">▶</span></button><div class="movie-card-info"><h3>${escapeHTML(title.title)}</h3><p>${escapeHTML(title.genre)} <span>•</span> ${escapeHTML(title.year)}</p><button class="mini-list-button ${isSaved?'saved':''}" type="button" data-toggle-list="${Number(title.id)}" aria-label="${isSaved?'Remove':'Add'} ${escapeHTML(title.title)} ${isSaved?'from':'to'} My List">${isSaved?'✓ In My List':'+ My List'}</button></div></div></article>`;
}
function renderHome() {
  const hero = document.getElementById('hero');
  const rows = document.getElementById('home-rows');
  if (!hero || !rows) return;
  const featured = titles.find(title => title.featured) || titles[0];
  hero.style.backgroundImage = `linear-gradient(90deg,rgba(11,11,11,.98) 0%,rgba(11,11,11,.75) 45%,rgba(11,11,11,.12) 100%),linear-gradient(0deg,#0b0b0b 0%,transparent 45%),url("${featured.backdrop}")`;
  hero.innerHTML = `<div class="hero-content container"><p class="eyebrow">MOKEKI ORIGINAL SPOTLIGHT</p><h1>${escapeHTML(featured.title)}</h1><div class="hero-meta"><span>${escapeHTML(featured.year)}</span><span>${escapeHTML(featured.duration)}</span><span>${escapeHTML(featured.rating)}</span><span>${escapeHTML(featured.genre)}</span></div><p class="hero-description">${escapeHTML(featured.description)}</p><div class="d-flex flex-wrap gap-3"><button class="btn btn-gold btn-lg" type="button" data-open-title="${featured.id}">▶ Watch Now</button><button class="btn btn-outline-light btn-lg" type="button" data-toggle-list="${featured.id}">＋ My List</button></div></div>`;
  const categories = [{key:'trending',label:'Trending Now'},{key:'popular',label:'Popular'},{key:'new',label:'New Releases'},{key:'recommended',label:'Recommended For You'}];
  rows.innerHTML = categories.map(category => { const matching = titles.filter(title => title.category.includes(category.key)); return matching.length ? `<section class="movie-row-section"><div class="row-heading"><h2 class="section-title">${category.label}</h2><a href="browse.html">Explore all <span aria-hidden="true">→</span></a></div><div class="movie-row">${matching.map(title => cardMarkup(title,true)).join('')}</div></section>` : ''; }).join('');
}
function populateFilters() {
  const genreSelect = document.getElementById('genre-filter');
  const yearSelect = document.getElementById('year-filter');
  if (!genreSelect || !yearSelect) return;
  const genres = [...new Set(titles.map(title => title.genre))].sort();
  const years = [...new Set(titles.map(title => title.year))].sort((a,b)=>b-a);
  genres.forEach(genre => genreSelect.insertAdjacentHTML('beforeend',`<option value="${escapeHTML(genre)}">${escapeHTML(genre)}</option>`));
  years.forEach(year => yearSelect.insertAdjacentHTML('beforeend',`<option value="${year}">${year}</option>`));
}
function applyBrowseFilters() {
  const grid = document.getElementById('browse-grid');
  if (!grid) return;
  const search = (document.getElementById('search-input')?.value || '').trim().toLowerCase();
  const genre = document.getElementById('genre-filter')?.value || 'all';
  const type = document.getElementById('type-filter')?.value || 'all';
  const year = document.getElementById('year-filter')?.value || 'all';
  const filtered = titles.filter(title => {
    const matchesSearch = title.title.toLowerCase().includes(search) || title.description.toLowerCase().includes(search);
    return matchesSearch && (genre==='all' || title.genre===genre) && (type==='all' || title.type===type) && (year==='all' || String(title.year)===year);
  });
  grid.innerHTML = filtered.map(title => cardMarkup(title,false)).join('');
  const count = document.getElementById('results-count'); if (count) count.textContent = `${filtered.length} ${filtered.length===1?'title':'titles'} found`;
  document.getElementById('no-results')?.classList.toggle('d-none',filtered.length!==0);
}
function renderMyList() {
  const grid = document.getElementById('mylist-grid');
  if (!grid) return;
  const savedTitles = titles.filter(title => watchlist.includes(Number(title.id)));
  grid.innerHTML = savedTitles.map(title => cardMarkup(title,false)).join('');
  document.getElementById('mylist-empty')?.classList.toggle('d-none',savedTitles.length!==0);
  updateListBadges();
}
function showToast(message) {
  const toastElement = document.getElementById('site-toast');
  const messageElement = document.getElementById('toast-message');
  if (!toastElement || !messageElement || !window.bootstrap) return;
  messageElement.textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastElement,{delay:2600}).show();
}
function toggleMyList(id) {
  const numericId = Number(id);
  const selected = titles.find(title => Number(title.id)===numericId);
  if (!selected) return;
  if (watchlist.includes(numericId)) { watchlist = watchlist.filter(savedId => savedId!==numericId); showToast('Removed from My List'); }
  else { watchlist.push(numericId); showToast('Added to My List'); }
  saveWatchlist();
  renderCurrentPage();
  if (activeTitle && Number(activeTitle.id)===numericId) renderModalContent(activeTitle);
}

function ensureModal() {
  const mount = document.getElementById('shared-modal');
  if (!mount || mount.innerHTML.trim()) return;
  mount.innerHTML = `<div class="modal fade" id="title-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"><div class="modal-content mokeki-modal"><button type="button" class="btn-close btn-close-white modal-close" data-bs-dismiss="modal" aria-label="Close"></button><div id="modal-content-area"></div></div></div></div>`;
  const modal = document.getElementById('title-modal');
  modal.addEventListener('hidden.bs.modal',()=>{ const frame=modal.querySelector('iframe'); if(frame) frame.src='about:blank'; activeTitle=null; });
}
function renderModalContent(title) {
  const area = document.getElementById('modal-content-area');
  if (!area) return;
  const saved = watchlist.includes(Number(title.id));
  area.innerHTML = `<div class="row g-0"><div class="col-md-5 modal-poster-wrap">${imageMarkup(title,'modal-poster')}</div><div class="col-md-7 modal-details"><p class="eyebrow">MOKEKI FEATURE</p><h2 id="modal-title">${escapeHTML(title.title)}</h2><div class="hero-meta"><span>${escapeHTML(title.year)}</span><span>${escapeHTML(title.duration)}</span><span>${escapeHTML(title.rating)}</span></div><p class="genre-label">${escapeHTML(title.type)} · ${escapeHTML(title.genre)}</p><p>${escapeHTML(title.description)}</p><div class="d-flex flex-wrap gap-2 mt-4"><button class="btn btn-gold" type="button" id="play-trailer">▶ Watch Trailer</button><button class="btn btn-outline-light" type="button" data-toggle-list="${title.id}">${saved?'✓ Remove from My List':'+ Add to My List'}</button></div><div id="trailer-area" class="trailer-area d-none"><p class="small-note">Third-party video embed. Playback is provided by the original publisher.</p><div class="ratio ratio-16x9"><iframe title="${escapeHTML(title.title)} trailer" src="${escapeHTML(title.trailer)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></div></div></div>`;
  document.getElementById('play-trailer')?.addEventListener('click',()=>document.getElementById('trailer-area')?.classList.remove('d-none'));
}
function openTitle(id) {
  const title = titles.find(item => Number(item.id)===Number(id));
  if (!title) return;
  activeTitle = title; ensureModal(); renderModalContent(title);
  bootstrap.Modal.getOrCreateInstance(document.getElementById('title-modal')).show();
}

// Event delegation handles buttons created dynamically after the catalogue loads.
document.addEventListener('click',event=>{
  const openButton = event.target.closest('[data-open-title]');
  const listButton = event.target.closest('[data-toggle-list]');
  if (openButton) openTitle(openButton.dataset.openTitle);
  if (listButton) { event.preventDefault(); toggleMyList(listButton.dataset.toggleList); }
});
document.addEventListener('input',event=>{ if (event.target.id==='search-input') applyBrowseFilters(); });
document.addEventListener('change',event=>{ if (['genre-filter','type-filter','year-filter'].includes(event.target.id)) applyBrowseFilters(); });
document.addEventListener('click',event=>{ if(event.target.id==='clear-filters'){ ['search-input','genre-filter','type-filter','year-filter'].forEach(id=>{const control=document.getElementById(id);if(control)control.value=id==='search-input'?'':'all';});applyBrowseFilters(); } });

// Demonstration authentication forms: validate, show feedback and never persist passwords.
function setFeedback(element,message,isSuccess=false){ if(!element)return; element.textContent=message; element.className=`form-feedback ${isSuccess?'success-message':'error-message'}`; }
function validateEmail(input){ return input.validity.valid && input.value.trim()!==''; }
document.addEventListener('submit',event=>{
  if(event.target.id==='login-form'){
    event.preventDefault(); const email=document.getElementById('login-email'); const password=document.getElementById('login-password'); const feedback=document.getElementById('login-feedback');
    if(!validateEmail(email)) return setFeedback(feedback,'Please enter a valid email address.');
    if(password.value.length<8) return setFeedback(feedback,'Password must contain at least 8 characters.');
    setFeedback(feedback,'Demonstration successful! No account was created and no information was stored.',true); event.target.reset();
  }
  if(event.target.id==='signup-form'){
    event.preventDefault(); const name=document.getElementById('signup-name'); const email=document.getElementById('signup-email'); const password=document.getElementById('signup-password'); const confirm=document.getElementById('confirm-password'); const feedback=document.getElementById('signup-feedback');
    if(name.value.trim().length<2) return setFeedback(feedback,'Please enter a display name with at least 2 characters.');
    if(!validateEmail(email)) return setFeedback(feedback,'Please enter a valid email address.');
    if(password.value.length<8) return setFeedback(feedback,'Password must contain at least 8 characters.');
    if(password.value!==confirm.value) return setFeedback(feedback,'The passwords do not match.');
    setFeedback(feedback,'Demo profile validated! No account was created and no information was stored.',true); event.target.reset();
  }
  if(event.target.id==='contact-form'){
    event.preventDefault(); const name=document.getElementById('contact-name'); const email=document.getElementById('contact-email'); const message=document.getElementById('contact-message'); const feedback=document.getElementById('contact-feedback');
    if(name.value.trim().length<2) return setFeedback(feedback,'Please enter your name.');
    if(!validateEmail(email)) return setFeedback(feedback,'Please enter a valid email address.');
    if(message.value.trim().length<10) return setFeedback(feedback,'Please enter a message of at least 10 characters.');
    setFeedback(feedback,'Thank you! Your demonstration message passed validation. It has not been sent or stored.',true); event.target.reset();
  }
});

renderChrome();
ensureModal();
loadTitles();
