// Custom video player — vanilla JS, no dependencies.
// Works with a real <video> src; falls back to a placeholder state if none is set.

function initPlayer(root){
  const video = root.querySelector('video');
  const scrub = root.querySelector('.mscrub');
  const scrubFill = root.querySelector('.mscrub-fill');
  const scrubBuffered = root.querySelector('.mscrub-buffered');
  const scrubHandle = root.querySelector('.mscrub-handle');
  const playBtn = root.querySelector('.js-play');
  const muteBtn = root.querySelector('.js-mute');
  const volSlider = root.querySelector('.js-vol');
  const timeEl = root.querySelector('.js-time');
  const fsBtn = root.querySelector('.js-fullscreen');
  const speedBtn = root.querySelector('.js-speedbtn');
  const speedMenu = root.querySelector('.js-speedmenu');
  const qualityBtn = root.querySelector('.js-qualitybtn');
  const qualityMenu = root.querySelector('.js-qualitymenu');
  const centerToggle = root.querySelector('.center-toggle');
  const skipBackBtn = root.querySelector('.js-skipback');
  const skipFwdBtn = root.querySelector('.js-skipfwd');

  let idleTimer = null;
  let dragging = false;

  function fmt(t){
    if(!isFinite(t) || t < 0) t = 0;
    const m = Math.floor(t/60);
    const s = Math.floor(t%60).toString().padStart(2,'0');
    const h = Math.floor(m/60);
    const mm = (h>0 ? (m%60).toString().padStart(2,'0') : m).toString();
    return h>0 ? `${h}:${mm}:${s}` : `${mm}:${s}`;
  }

  function updateTime(){
    if(!video.duration) return;
    const pct = (video.currentTime/video.duration)*100;
    scrubFill.style.width = pct+'%';
    scrubHandle.style.left = pct+'%';
    timeEl.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;
  }
  function updateBuffered(){
    if(!video.duration || !video.buffered.length) return;
    const end = video.buffered.end(video.buffered.length-1);
    scrubBuffered.style.width = Math.min(100,(end/video.duration)*100)+'%';
  }

  function togglePlay(){
    if(video.paused){ video.play(); } else { video.pause(); }
  }
  function burst(){
    root.classList.remove('show-burst');
    void root.offsetWidth;
    root.classList.add('show-burst');
  }

  playBtn?.addEventListener('click', togglePlay);
  centerToggle?.addEventListener('click', ()=>{ togglePlay(); burst(); });

  video.addEventListener('play', ()=>{ playBtn.textContent = '⏸'; });
  video.addEventListener('pause', ()=>{ playBtn.textContent = '▶'; });
  video.addEventListener('timeupdate', updateTime);
  video.addEventListener('progress', updateBuffered);
  video.addEventListener('loadedmetadata', updateTime);

  skipBackBtn?.addEventListener('click', ()=>{ video.currentTime = Math.max(0, video.currentTime - 10); });
  skipFwdBtn?.addEventListener('click', ()=>{ video.currentTime = Math.min(video.duration||0, video.currentTime + 10); });

  // Scrub bar interaction
  function seekFromEvent(e){
    const rect = scrub.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let pct = (clientX - rect.left) / rect.width;
    pct = Math.max(0, Math.min(1, pct));
    if(video.duration){ video.currentTime = pct * video.duration; }
    scrubFill.style.width = (pct*100)+'%';
    scrubHandle.style.left = (pct*100)+'%';
  }
  scrub?.addEventListener('mousedown', (e)=>{ dragging = true; seekFromEvent(e); });
  window.addEventListener('mousemove', (e)=>{ if(dragging) seekFromEvent(e); });
  window.addEventListener('mouseup', ()=>{ dragging = false; });
  scrub?.addEventListener('touchstart', (e)=>{ dragging = true; seekFromEvent(e); });
  scrub?.addEventListener('touchmove', (e)=>{ if(dragging) seekFromEvent(e); });
  scrub?.addEventListener('touchend', ()=>{ dragging = false; });

  // Volume
  muteBtn?.addEventListener('click', ()=>{
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
    volSlider.value = video.muted ? 0 : video.volume;
  });
  volSlider?.addEventListener('input', ()=>{
    video.volume = volSlider.value;
    video.muted = Number(volSlider.value) === 0;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  });

  // Speed menu
  speedBtn?.addEventListener('click', (e)=>{ e.stopPropagation(); speedMenu.classList.toggle('open'); qualityMenu?.classList.remove('open'); });
  speedMenu?.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{
      video.playbackRate = parseFloat(b.dataset.rate);
      speedMenu.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      speedBtn.textContent = b.dataset.rate + '×';
      speedMenu.classList.remove('open');
    });
  });

  // Quality menu (cosmetic placeholder — swap video.src per source when real files exist)
  qualityBtn?.addEventListener('click', (e)=>{ e.stopPropagation(); qualityMenu.classList.toggle('open'); speedMenu?.classList.remove('open'); });
  qualityMenu?.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{
      qualityMenu.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      qualityBtn.textContent = b.textContent;
      qualityMenu.classList.remove('open');
    });
  });

  document.addEventListener('click', ()=>{
    speedMenu?.classList.remove('open');
    qualityMenu?.classList.remove('open');
  });

  // Fullscreen
  fsBtn?.addEventListener('click', ()=>{
    if(!document.fullscreenElement){ root.requestFullscreen?.(); }
    else{ document.exitFullscreen?.(); }
  });

  // Idle controls (auto-hide)
  function wake(){
    root.classList.remove('idle');
    clearTimeout(idleTimer);
    if(!video.paused){
      idleTimer = setTimeout(()=> root.classList.add('idle'), 2600);
    }
  }
  root.addEventListener('mousemove', wake);
  root.addEventListener('mouseleave', ()=>{ if(!video.paused) root.classList.add('idle'); });
  video.addEventListener('play', wake);
  video.addEventListener('pause', ()=>{ root.classList.remove('idle'); clearTimeout(idleTimer); });

  // Keyboard shortcuts
  root.tabIndex = 0;
  root.addEventListener('keydown', (e)=>{
    switch(e.key){
      case ' ': case 'k': e.preventDefault(); togglePlay(); burst(); break;
      case 'ArrowRight': video.currentTime = Math.min(video.duration||0, video.currentTime+5); break;
      case 'ArrowLeft': video.currentTime = Math.max(0, video.currentTime-5); break;
      case 'ArrowUp': e.preventDefault(); video.volume = Math.min(1, video.volume+0.1); volSlider.value = video.volume; break;
      case 'ArrowDown': e.preventDefault(); video.volume = Math.max(0, video.volume-0.1); volSlider.value = video.volume; break;
      case 'm': video.muted = !video.muted; muteBtn.textContent = video.muted ? '🔇' : '🔊'; break;
      case 'f': fsBtn?.click(); break;
    }
  });
}

document.querySelectorAll('.mplayer[data-player]').forEach(initPlayer);
