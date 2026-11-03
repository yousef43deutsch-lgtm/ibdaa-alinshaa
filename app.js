'use strict';
const COMPANY={whatsapp:'966560006471',phone:'+966560006471'};
const $=s=>document.querySelector(s);
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const behavior=()=>reduced()?'auto':'smooth';
$('#year').textContent=new Date().getFullYear();
const services=[{name:'البناء ومقاولات العظم',icon:'build',kicker:'أساس المشروع',title:['من القواعد،','إلى آخر سقف.'],description:'تنفيذ أعمال البناء والعظم للمباني والفلل، من القواعد والأساسات إلى الأعمدة والأسقف، وفق المخططات الهندسية المعتمدة.',points:['أعمال القواعد والأساسات','الأعمدة والأسقف','تنفيذ وفق نطاق ومواصفات متفق عليها']},{name:'الكهرباء والسباكة',icon:'bolt',kicker:'تأسيس وتشطيب',title:['تفاصيل أساسية،','لعَمَل متكامل.'],description:'تنفيذ أعمال تأسيس وتشطيب الكهرباء والسباكة وفق متطلبات المشروع والمخططات والمواصفات المتفق عليها.',points:['أعمال التأسيس','أعمال التشطيب','وضوح نطاق التوريد والتنفيذ في الاتفاق']},{name:'الدهانات والديكورات',icon:'paint',kicker:'هوية المكان',title:['مساحات لها طابع.','وتفاصيل لها أثر.'],description:'أعمال دهانات عصرية وديكورات داخلية تعطي المساحة طابعها، مع الاهتمام بتفاصيل التنفيذ والمواصفات المطلوبة.',points:['أعمال الدهانات','الديكورات الداخلية','عناية بالمظهر النهائي للأعمال']},{name:'اللياسة والنجارة',icon:'tools',kicker:'إتقان التشطيب',title:['حِرفة في العمل.','ودقة في التفاصيل.'],description:'تنفيذ أعمال اللياسة والنجارة بجودة هندسية واهتمام بالتفاصيل، بحسب احتياجات المشروع ونطاق العمل المتفق عليه.',points:['أعمال اللياسة','أعمال النجارة','تنفيذ حسب متطلبات المشروع']}];
let currentService=0;
const tabs=[...document.querySelectorAll('[data-service]')];
function activateService(i){currentService=i;const service=services[i];tabs.forEach((tab,n)=>{tab.setAttribute('aria-selected',String(i===n));tab.tabIndex=i===n?0:-1});$('#service-panel').setAttribute('aria-labelledby','service-'+i);$('#service-kicker').textContent=service.kicker;$('#service-title').replaceChildren(document.createTextNode(service.title[0]),document.createElement('br'),document.createTextNode(service.title[1]));$('#service-description').textContent=service.description;$('#service-points').replaceChildren(...service.points.map(point=>{const li=document.createElement('li');li.textContent=point;return li}));$('#service-index').textContent=String(i+1).padStart(2,'0');$('#service-icon use').setAttribute('href','#'+service.icon);if(!reduced()&&Element.prototype.animate){document.querySelectorAll('.service-content,#service-icon').forEach((el,n)=>{el.getAnimations().forEach(a=>a.cancel());el.animate([{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,delay:n*30,easing:'ease-out'})})}}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activateService(i));tab.addEventListener('keydown',event=>{let next=i;if(event.key==='ArrowDown'||event.key==='ArrowLeft')next=(i+1)%tabs.length;else if(event.key==='ArrowUp'||event.key==='ArrowRight')next=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();activateService(next);tabs[next].focus()})});
function beginProject(event){event?.preventDefault();const form=$('#quote-form');form.querySelector('[name="name"]').focus({preventScroll:true});$('#request').scrollIntoView({behavior:behavior(),block:'start'});form.classList.remove('request-highlight');void form.offsetWidth;form.classList.add('request-highlight');setTimeout(()=>form.classList.remove('request-highlight'),1600)}
document.querySelectorAll('a[href="#request"]').forEach(link=>link.addEventListener('click',beginProject));$('#request-service').addEventListener('click',event=>{$('#service-select').value=services[currentService].name;beginProject(event)});
const player=$('#site-player'),videoDialog=$('#video-dialog');
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{videoDialog.showModal();player.play().catch(()=>{})}));videoDialog.addEventListener('close',()=>player.pause());
const photoDialog=$('#photo-dialog');document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{$('#full-photo').src=button.dataset.photo;$('#full-photo').alt=button.dataset.caption;$('#photo-caption').textContent=button.dataset.caption;photoDialog.showModal()}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelectorAll('.dialog-close').forEach(button=>button.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()})});
function notice(title,description){$('#notice-title').textContent=title;$('#notice-text').textContent=description;$('#notice-dialog').showModal()}
document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>{const type=button.dataset.contact,number=COMPANY[type];if(!number){notice('التواصل المباشر غير متاح حاليًا','يمكنك تجهيز تفاصيل مشروعك من النموذج وتنزيل نسخة منها. سيتم إتاحة التواصل المباشر بعد إضافة رقم الشركة المعتمد.');return}if(type==='phone')location.href='tel:'+number;else window.open('https://wa.me/'+number.replace(/\D/g,'')+'?text='+encodeURIComponent('مرحبًا إبداع الإنشاء، أرغب في الاستفسار عن مشروعي.'),'_blank','noopener,noreferrer')}));
$('#privacy-button').addEventListener('click',()=>notice('خصوصية بياناتك','تُجهّز بياناتك داخل متصفحك ولا نحفظها على خادم الموقع. عند الضغط على فتح واتساب، تنتقل التفاصيل إلى واتساب لتراجع الرسالة وترسلها للشركة بنفسك. يمكنك أيضًا تنزيل نسخة على جهازك.'));
let requestText='';const form=$('#quote-form'),phone=form.querySelector('[name="phone"]');phone.addEventListener('input',()=>phone.setCustomValidity(''));
form.addEventListener('submit',event=>{event.preventDefault();const normalized=phone.value.replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/\D/g,'');if(normalized.length<8||normalized.length>15){phone.setCustomValidity('يرجى إدخال رقم جوال صحيح.');phone.reportValidity();return}phone.setCustomValidity('');if(!form.reportValidity())return;const d=new FormData(form);requestText=['طلب عرض سعر — شركة إبداع الإنشاء للمقاولات العامة','الاسم: '+d.get('name'),'رقم الجوال: '+d.get('phone'),'مدينة المشروع: '+d.get('city'),'الخدمة: '+d.get('service'),'حالة المخططات: '+d.get('plans'),'المساحة التقريبية: '+(d.get('area')||'غير محددة'),'تفاصيل المشروع: '+(d.get('details')||'غير مذكورة'),'أرغب في التواصل لمراجعة تفاصيل المشروع وعرض السعر.'].join('\n');$('#send-request').href='https://wa.me/'+COMPANY.whatsapp+'?text='+encodeURIComponent(requestText);$('#form-result').hidden=false;$('#form-result').scrollIntoView({behavior:behavior(),block:'nearest'})});
$('#download-request').addEventListener('click',()=>{if(!requestText)return;const url=URL.createObjectURL(new Blob(['\ufeff'+requestText],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Ibdaa-Alinshaa-Project.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
if('IntersectionObserver'in window){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.07});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));new IntersectionObserver(entries=>$('.mobile-cta').classList.toggle('at-form',entries[0].isIntersecting),{threshold:0}).observe(form)}
function progress(){const max=document.documentElement.scrollHeight-innerHeight;$('.read-progress').style.width=(max>0?scrollY/max*100:0)+'%'}addEventListener('scroll',progress,{passive:true});progress();document.documentElement.classList.add('motion-ready');

// Progressive enhancement: bounded work, native scroll, and live motion preferences.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const desktopMotion = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
const finePointer = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
const heroArt = $('.hero-art');
let depthFrame = 0;
let heroVisible = true;
function updateHeroDepth() {
  depthFrame = 0;
  if (reduced() || !desktopMotion.matches || !heroVisible || document.hidden) {
    heroArt.style.removeProperty('--hero-drift');
    heroArt.style.removeProperty('--note-drift');
    return;
  }
  const rect = heroArt.getBoundingClientRect();
  const amount = Math.max(-1, Math.min(1, -rect.top / Math.max(rect.height, 1)));
  heroArt.style.setProperty('--hero-drift', (amount * 12).toFixed(2) + 'px');
  heroArt.style.setProperty('--note-drift', (amount * -7).toFixed(2) + 'px');
}
function requestDepth() {
  if (!depthFrame && heroVisible && !reduced() && desktopMotion.matches) depthFrame = requestAnimationFrame(updateHeroDepth);
}
addEventListener('scroll', requestDepth, {passive:true});
addEventListener('resize', updateHeroDepth, {passive:true});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    updateHeroDepth();
  }).observe(heroArt);
}
// Reveal the journey as a connected sequence when its group enters the viewport.
const journeySteps = [...document.querySelectorAll('.journey-grid article')];
journeySteps.forEach((step, i) => step.style.setProperty('--step-delay', (i * 140) + 'ms'));
if ('IntersectionObserver' in window && matchMedia('(min-width: 761px)').matches) {
  const journeyObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    journeySteps.forEach(step => step.classList.add('in-view'));
    journeyObserver.disconnect();
  }, {threshold:.12});
  journeyObserver.observe($('.journey-grid'));
}
// One frame per pointer update, only within the two large project photographs.
const projectMotionCleanup = [];
document.querySelectorAll('.project-image').forEach(button => {
  const cue = document.createElement('span');
  cue.className = 'project-cue';
  cue.textContent = 'عرض ↗';
  cue.setAttribute('aria-hidden', 'true');
  button.append(cue);
  let pointerFrame = 0;
  let point = {x:0,y:0};
  function placeCue() {
    pointerFrame = 0;
    const rect = button.getBoundingClientRect();
    const edge = Math.min(48, rect.width / 2, rect.height / 2);
    button.style.setProperty('--cue-x', Math.max(edge, Math.min(rect.width - edge, point.x - rect.left)) + 'px');
    button.style.setProperty('--cue-y', Math.max(edge, Math.min(rect.height - edge, point.y - rect.top)) + 'px');
  }
  function resetCue() {
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    button.classList.remove('pointer-inside');
  }
  button.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reduced() || !finePointer.matches) return;
    point = {x:event.clientX,y:event.clientY};
    button.classList.add('pointer-inside');
    if (!pointerFrame) pointerFrame = requestAnimationFrame(placeCue);
  }, {passive:true});
  button.addEventListener('pointerleave', resetCue);
  button.addEventListener('click', resetCue);
  projectMotionCleanup.push(resetCue);
});
function syncMotion() {
  if (depthFrame) cancelAnimationFrame(depthFrame);
  depthFrame = 0;
  projectMotionCleanup.forEach(cleanup => cleanup());
  updateHeroDepth();
}
motionPreference.addEventListener('change', syncMotion);
desktopMotion.addEventListener('change', syncMotion);
finePointer.addEventListener('change', syncMotion);
document.addEventListener('visibilitychange', syncMotion);
updateHeroDepth();
