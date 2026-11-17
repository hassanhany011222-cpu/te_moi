/* ===== Samira's website: password -> museum (mug, notebook) -> letter, voice message & song ===== */
const SONG_SRC='assets/audio/letter-song.mp3';      // ONE song: background music + player
const VOICE_SRC='assets/audio/voice-message.mp3';   // Hassan's voice message
const PASSWORDS=['16032007','1632007','20070316'];  // Samira's birthday 16/03/2007 (digits only)

/* ===== Museum exhibits ===== */
const EXHIBITS = [
 {id:'mug', tag:'المعرض الأول — السعادة اليومية', card:'ركن السعادة اليومية', teaser:'مج صغير شايل حتة حب في كل رشفة.', icon:'☕',
  img:'assets/images/mug.jpg', title:'شوية سعادة في كل يوم ❤️',
  text:`كل مرة تشربي فيها أي مشروب بتحبيه من المج ده، افتكريني.

وافتكري إن فيه حد بيحبك جدًا، وبيفرح بأبسط تفاصيلك، وبيتمنى دايمًا يشوفك مبسوطة.

خلي المج ده يفكرك بيا، حتى لو مش موجود جنبك في اللحظة دي.

كل رشفة فيه معاها حتة حب مني ليكي يا كوكو ❤️`},
 {id:'notebook', tag:'المعرض الثاني — عالمك الصغير', card:'ركن عالمك الصغير', teaser:'مساحة صغيرة تخصك، لسه صفحاتها مستنية حكاياتنا.', icon:'📓',
  img:'assets/images/notebook.jpg', title:'حكاياتنا اللي لسه هتتكتب ❤️', pen:true,
  text:`النوتة دي مش مجرد ورق وقلم.

دي مساحة صغيرة تخصك إنتي، اكتبي فيها أحلامك، خواطرك، الحاجات اللي بتفرحك، وكل حاجة نفسك تحكيها.

وعايزك كمان تكتبي فيها كل ذكرى حلوة بينا، كل موقف ضحكنا فيه، وكل لحظة جمعتنا.

نفسي بعد سنين نفتح النوتة دي ونرجع نقرأ كل التفاصيل، ونفتكر قد إيه كانت أيامنا حلوة.

ويمكن نكتشف إن كل يوم عيشناه مع بعض كان أجمل من اللي قبله.`}
];

const LETTER = `أنا مش عارف أوصفلك أنا كنت مبسوط قد إيه وأنا شايفك.

أول ما شوفتك حسيت إني دوبت في كل تفصيلة فيكي، من لبسك لعيونك لضحكتك وكل حاجة فيكي حرفيًا.

المرة دي حسيت إني حفظتك أكتر من أي مرة فاتت، وإن كل تفصيلة فيكي بقت محفورة جوايا. كنت مبسوط إني أخيرًا شايفك قدامي، وإن اللحظة اللي كنت بستناها بقت حقيقة.

إنتي أقرب حد لقلبي، وأكتر واحدة ليها مكانة عندي. وأنا عارف قد إيه إنتي بتحبيني، وعايزك تعرفي إن حبي ليكي أكبر من أي كلام ممكن أقوله.

أنا محتاجك دايمًا في حياتي، محتاج وجودك وصوتك وضحكتك وتفاصيل يومك، وحتى أبسط كلام بينا.

وجودك بيفرق معايا أكتر ما تتخيلي.

نفسي أفضل أشوفك وأفرح بيكي، ونفضل نعيش ذكريات جديدة تكون أحلى من كل اللي فات.`;
const $ = s => document.querySelector(s);
const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};

/* ===== Scene navigation (one page, so the song never stops between scenes) ===== */
function show(id){
  document.querySelectorAll('.scene').forEach(s=>s.classList.remove('active'));
  $('#'+id).classList.add('active');
  document.body.classList.toggle('in-finale',id==='finale');
  window.scrollTo({top:0,behavior:'smooth'});
}
function frame(src,file){ // image frame; shows a styled placeholder if the file is missing
  const f=document.createElement('div');
  f.className='frame'; f.innerHTML=`<img src="${src}" alt=""><div class="ph">ضيفي الصورة دي: ${file}</div>`;
  f.querySelector('img').onerror=()=>f.classList.add('missing');
  return f;
}
function btn(txt,cls,fn){const b=document.createElement('button');b.className='btn '+cls;b.textContent=txt;b.onclick=fn;return b;}

/* ===== Guided tour: mug -> notebook -> letter (one corner at a time) ===== */
const NEXT=['روحي لركن عالمك الصغير ❤️','روحي لركن الرسالة ❤️'];
function openStep(i){
  const e=EXHIBITS[i], d=$('#detail'); d.innerHTML='';
  const box=document.createElement('div'); box.className='detail-box';
  box.insertAdjacentHTML('beforeend','<div class="dots">'+[0,1,2].map(k=>`<i class="${k===i?'on':k<i?'done':''}"></i>`).join('')+`</div><small class="tag">${e.tag}</small>`);
  box.appendChild(frame(e.img,e.img.split('/').pop()));
  box.insertAdjacentHTML('beforeend',`<h2>${e.title}</h2>`);
  if(e.pen) box.insertAdjacentHTML('beforeend','<span class="pen">✒️</span>');
  e.text.split('\n\n').forEach((p,k)=>{const el=document.createElement('p');el.textContent=p;el.style.animationDelay=(k*.5)+'s';box.appendChild(el);});
  box.appendChild(btn(NEXT[i],'',()=>i===EXHIBITS.length-1?show('finale'):openStep(i+1)));
  if(i>0){box.appendChild(document.createElement('br'));box.appendChild(btn('← رجوع','ghost',()=>openStep(i-1)));}
  d.appendChild(box); show('detail');
}
$('#enterBtn').onclick=()=>openStep(0);
$('#backBtn').onclick=()=>openStep(EXHIBITS.length-1);

/* ===== Audio: one song file + one voice file, never playing together ===== */
const song=new Audio(SONG_SRC); song.loop=true; song.volume=.55;
const voice=new Audio(VOICE_SRC);
let songMissing=false, resumeAfterVoice=false;
const KEY='siteSongOn'; // remembered choice: "1" on, "0" off
song.onerror=()=>{songMissing=true;$('#musicBtn').style.display='none';};
voice.onerror=()=>{$('#vErr').textContent='ضيفي ملف assets/audio/voice-message.mp3';};
function setSongUI(on){
  $('#sBtn').textContent=on?'❚❚':'▶';
  $('#eq').classList.toggle('playing',on);
  $('#musicBtn').classList.toggle('off',!on);
}
function playSong(){ if(songMissing)return; song.play().then(()=>{store.set(KEY,'1');setSongUI(true)}).catch(()=>setSongUI(false)); }
function pauseSong(remember){ song.pause(); setSongUI(false); if(remember) store.set(KEY,'0'); }
function toggleSong(){ // manual choice by the visitor (top music button or the player button)
  if(song.paused){ if(!voice.paused){voice.pause();resumeAfterVoice=false;setVoiceUI(false);} playSong(); }
  else pauseSong(true);
}
$('#musicBtn').onclick=toggleSong;
$('#sBtn').onclick=toggleSong;

/* ===== Password gate ===== */
function checkPw(){
  const ar='٠١٢٣٤٥٦٧٨٩';
  const v=$('#pw').value.replace(/[٠-٩]/g,c=>ar.indexOf(c)).replace(/\D/g,'');
  if(PASSWORDS.includes(v)){ show('entrance'); if(store.get(KEY)!=='0') playSong(); } // first interaction starts the song
  else $('#pwErr').textContent='لأ يا كوكو، فكري تاني 🌙 ده اليوم اللي القمر جه فيه';
}
$('#pwBtn').onclick=checkPw;
$('#pw').addEventListener('keydown',e=>{if(e.key==='Enter')checkPw();});

/* ===== Letter text, photo fallback, scroll reveal ===== */
LETTER.split('\n\n').forEach(t=>{const p=document.createElement('p');p.textContent=t;$('#letterText').appendChild(p);});
$('#pic img').onerror=()=>$('#pic').classList.add('missing');
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return; e.target.classList.add('in');
  if(e.target.classList.contains('paper')) document.querySelectorAll('#letterText p').forEach((p,i)=>setTimeout(()=>p.classList.add('in'),700+i*900));
  io.unobserve(e.target);
}),{threshold:.25});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ===== Voice message player ===== */
const fmt=t=>isFinite(t)?Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0'):'0:00';
function setVoiceUI(on){ $('#vBtn').textContent=on?'❚❚':'▶'; $('#waves').classList.toggle('playing',on); }
function endVoice(){ setVoiceUI(false); if(resumeAfterVoice){ resumeAfterVoice=false; playSong(); } } // resume only if it was playing before
$('#vBtn').onclick=()=>{
  if(voice.paused){
    resumeAfterVoice=!song.paused;       // remember previous state
    song.pause(); setSongUI(false);      // pause song immediately (choice not overwritten)
    voice.play().then(()=>setVoiceUI(true)).catch(()=>{resumeAfterVoice=false;endVoice();});
  } else { voice.pause(); endVoice(); }  // manual stop restores previous state
};
voice.onended=()=>{ $('#vFill').style.width='0'; voice.currentTime=0; endVoice(); };
voice.onloadedmetadata=()=>$('#vDur').textContent=fmt(voice.duration);
voice.ontimeupdate=()=>{ $('#vCur').textContent=fmt(voice.currentTime); if(voice.duration)$('#vFill').style.width=(voice.currentTime/voice.duration*100)+'%'; };
$('#vBar').onclick=e=>{ const r=e.currentTarget.getBoundingClientRect(); if(voice.duration) voice.currentTime=((e.clientX-r.left)/r.width)*voice.duration; };

/* ===== Floating hearts & sparkles ===== */
const P=$('#particles');
for(let i=0;i<22;i++){
  const s=document.createElement('span'); s.textContent=['❤','✦','♡','✧'][i%4];
  s.style.cssText=`left:${Math.random()*100}%;font-size:${10+Math.random()*16}px;color:${i%2?'#C6A15B':'#ff8aa0'};animation-duration:${10+Math.random()*14}s;animation-delay:${-Math.random()*20}s`;
  P.appendChild(s);
}

/* ===== Letter sky: twinkling stars + rising golden hearts and sparkles ===== */
for(let i=0;i<60;i++){
  const s=document.createElement('span');
  if(i<35){s.className='star';s.textContent='✦';s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${6+Math.random()*8}px;color:#F7EBDD;animation-delay:${Math.random()*3}s`;}
  else{s.textContent=i%2?'💛':'✨';s.style.cssText=`left:${Math.random()*100}%;bottom:-30px;font-size:${10+Math.random()*14}px;opacity:.6;animation-duration:${14+Math.random()*16}s;animation-delay:${-Math.random()*25}s`;}
  $('#sky').appendChild(s);
}
