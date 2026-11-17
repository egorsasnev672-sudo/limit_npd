/* ============================================================
   1. УТИЛИТЫ
   ============================================================ */
function esc(s){
  if(s==null)return'';
  return String(s).replace(/[&<>"']/g,function(m){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
  });
}
function formatNumber(n){
  if(n==null||isNaN(n))return'0';
  return new Intl.NumberFormat('ru-RU').format(Math.round(n));
}
function formatMoney(n){
  if(n==null||isNaN(n))return'0 ₽';
  return formatNumber(n)+' ₽';
}
function formatMoney2(n){
  if(n==null||isNaN(n))return'0,00 ₽';
  return new Intl.NumberFormat('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n)+' ₽';
}
function formatMillions(n){
  if(n==null||isNaN(n))return'0 млн ₽';
  return (n/1000000).toFixed(2).replace('.',',')+' млн ₽';
}
function formatPercent(n,dec){
  if(n==null||isNaN(n))return'0%';
  return n.toFixed(dec==null?2:dec).replace('.',',')+'%';
}
function todayISO(){
  var d=new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function dateToISO(d){
  if(!d)return'';
  if(typeof d==='string')return d.slice(0,10);
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function formatDateRu(iso){
  if(!iso)return'';
  try{
    var d=new Date(iso+'T00:00:00');
    return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric'});
  }catch(e){return iso;}
}
function formatDateRuLong(iso){
  if(!iso)return'';
  try{
    var d=new Date(iso+'T00:00:00');
    return d.toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'});
  }catch(e){return iso;}
}
function formatMonthRu(monthIndex){
  var names=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  return names[monthIndex]||'';
}
function formatMonthRuGenitive(monthIndex){
  var names=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  return names[monthIndex]||'';
}
function readFileAsDataURL(file){
  return new Promise(function(resolve,reject){
    var reader=new FileReader();
    reader.onload=function(e){resolve(e.target.result);};
    reader.onerror=function(e){reject(e);};
    reader.readAsDataURL(file);
  });
}
function readFileAsText(file){
  return new Promise(function(resolve,reject){
    var reader=new FileReader();
    reader.onload=function(e){resolve(e.target.result);};
    reader.onerror=function(e){reject(e);};
    reader.readAsText(file);
  });
}
function downloadFile(name,content,mime){
  try{
    var blob=new Blob([content],{type:mime||'text/plain;charset=utf-8'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;
    a.download=name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){URL.revokeObjectURL(url);},1000);
    return true;
  }catch(e){
    console.warn('downloadFile failed',e);
    showToast('Ошибка скачивания файла','error');
    return false;
  }
}
function downloadJSON(name,data){
  return downloadFile(name,JSON.stringify(data,null,2),'application/json');
}
function downloadCSV(name,rows){
  var csv=rows.map(function(row){
    return row.map(function(cell){
      var s=String(cell==null?'':cell);
      if(s.indexOf(',')>=0||s.indexOf('"')>=0||s.indexOf('\n')>=0){
        return '"'+s.replace(/"/g,'""')+'"';
      }
      return s;
    }).join(',');
  }).join('\r\n');
  return downloadFile(name,'\ufeff'+csv,'text/csv;charset=utf-8');
}
function simpleHash(str){
  var hash=0;
  for(var i=0;i<str.length;i++){
    var char=str.charCodeAt(i);
    hash=((hash<<5)-hash)+char;
    hash=hash&hash;
  }
  return Math.abs(hash).toString(36);
}
function generatePromoCode(){
  var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  var code='';
  for(var i=0;i<15;i++){
    code+=chars.charAt(Math.floor(Math.random()*chars.length));
  }
  return code;
}
function animateCounter(el,from,to,duration){
  if(!el)return;
  duration=duration||600;
  var start=performance.now();
  function step(now){
    var t=Math.min(1,(now-start)/duration);
    var val=from+(to-from)*t;
    el.textContent=formatMoney(val);
    if(t<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function showToast(msg,type){
  type=type||'info';
  var c=document.getElementById('toastContainer');
  if(!c)return;
  var el=document.createElement('div');
  el.className='toast '+type;
  el.textContent=msg;
  c.appendChild(el);
  setTimeout(function(){
    el.style.opacity='0';
    el.style.transform='translateY(-8px)';
    el.style.transition='all .3s';
    setTimeout(function(){el.remove();},300);
  },3500);
}
function renderHtmlToPdf(html,filename){
  var w=window.open('','_blank');
  if(w){
    w.document.write(html);
    w.document.close();
    setTimeout(function(){w.print();},300);
    return true;
  }
  downloadFile(filename||'report.html',html,'text/html;charset=utf-8');
  showToast('Всплывающее окно заблокировано — HTML скачан','warn');
  return false;
}
function debounce(fn,delay){
  var t;
  return function(){
    var args=arguments,ctx=this;
    clearTimeout(t);
    t=setTimeout(function(){fn.apply(ctx,args);},delay||250);
  };
}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
function num(v,def){var n=parseFloat(v);return isNaN(n)?(def||0):n;}
function int(v,def){var n=parseInt(v);return isNaN(n)?(def||0):n;}
function deepClone(o){return JSON.parse(JSON.stringify(o));}

/* ============================================================
   2. STORAGE
   ============================================================ */
var Storage={
  _mem:{},
  _sandbox:false,
  get:function(key,def){
    try{
      var raw;
      if(this._sandbox){
        raw=this._mem[key];
      } else {
        raw=localStorage.getItem(key);
      }
      if(raw==null)return def;
      return JSON.parse(raw);
    }catch(e){
      console.warn('Storage.get failed for',key,e);
      return def;
    }
  },
  set:function(key,val){
    try{
      var raw=JSON.stringify(val);
      if(this._sandbox)this._mem[key]=raw;
      else localStorage.setItem(key,raw);
      return true;
    }catch(e){
      console.warn('Storage.set failed for',key,e);
      return false;
    }
  },
  remove:function(key){
    try{
      if(this._sandbox)delete this._mem[key];
      else localStorage.removeItem(key);
      return true;
    }catch(e){return false;}
  },
  clearAll:function(){
    try{
      if(this._sandbox)this._mem={};
      else localStorage.clear();
      return true;
    }catch(e){return false;}
  },
  keys:function(){
    try{
      if(this._sandbox)return Object.keys(this._mem);
      return Object.keys(localStorage);
    }catch(e){return[];}
  }
};

/* ============================================================
   3. SANDBOX — новая логика с предупреждением и переносом
   ============================================================ */
var Sandbox={
  init:function(){
    var saved=Storage.get('sandbox','off');
    if(saved==='on'){
      Storage._sandbox=true;
      this.updateBadge(true);
    }
  },
  updateBadge:function(on){
    var badge=document.getElementById('sandboxBadge');
    if(badge)badge.classList.toggle('show',on);
    var sel=document.getElementById('setSandbox');
    if(sel)sel.value=on?'on':'off';
  },
  requestEnable:function(){
    var m=document.getElementById('sandboxOnModal');
    if(m)m.classList.add('open');
    var sel=document.getElementById('setSandbox');
    if(sel)sel.value='off';
  },
  confirmEnable:function(){
    Storage._sandbox=true;
    Storage.set('sandbox','on');
    this.updateBadge(true);
    var m=document.getElementById('sandboxOnModal');
    if(m)m.classList.remove('open');
    showToast('Режим песочницы включён. Данные не сохранятся.','warn');
  },
  cancelEnable:function(){
    var m=document.getElementById('sandboxOnModal');
    if(m)m.classList.remove('open');
    var sel=document.getElementById('setSandbox');
    if(sel)sel.value='off';
  },
  requestDisable:function(){
    var m=document.getElementById('sandboxOffModal');
    if(m)m.classList.add('open');
    var sel=document.getElementById('setSandbox');
    if(sel)sel.value='on';
  },
  confirmDisableKeep:function(){
    // Переносим данные из памяти в localStorage
    var keys=Object.keys(Storage._mem);
    keys.forEach(function(k){
      try{localStorage.setItem(k,Storage._mem[k]);}catch(e){console.warn(e);}
    });
    Storage._sandbox=false;
    Storage._mem={};
    Storage.set('sandbox','off');
    this.updateBadge(false);
    var m=document.getElementById('sandboxOffModal');
    if(m)m.classList.remove('open');
    showToast('Данные из песочницы сохранены','success');
  },
  confirmDisableDiscard:function(){
    Storage._sandbox=false;
    Storage._mem={};
    Storage.set('sandbox','off');
    this.updateBadge(false);
    var m=document.getElementById('sandboxOffModal');
    if(m)m.classList.remove('open');
    journalData=[];
    receiptsData=[];
    taxHistory=[];
    calendarNotes={};
    checklistState={};
    courseAnswers={};
    customJournalCategories={income:[],expense:[]};
    if(typeof renderJournal==='function')renderJournal();
    if(typeof renderTaxHistory==='function')renderTaxHistory();
    if(typeof buildHeatmap==='function')buildHeatmap();
    showToast('Данные песочницы удалены','warn');
  },
  cancelDisable:function(){
    var m=document.getElementById('sandboxOffModal');
    if(m)m.classList.remove('open');
    var sel=document.getElementById('setSandbox');
    if(sel)sel.value='on';
  }
};

function onSandboxChange(){
  var el=document.getElementById('setSandbox');
  if(!el)return;
  if(el.value==='on'){
    Sandbox.requestEnable();
  } else {
    if(Storage._sandbox){
      Sandbox.requestDisable();
    }
  }
}
function confirmSandboxOn(){Sandbox.confirmEnable();}
function cancelSandboxOn(){Sandbox.cancelEnable();}
function confirmSandboxOff(){Sandbox.confirmDisableKeep();}
function cancelSandboxOff(){Sandbox.cancelDisable();}
function sandboxOffKeep(){Sandbox.confirmDisableKeep();}
function sandboxOffDiscard(){Sandbox.confirmDisableDiscard();}
function disableSandbox(){Sandbox.requestDisable();}

/* ============================================================
   4. UNDO MANAGER
   ============================================================ */
var UndoManager={
  _stack:[],
  _timer:null,
  push:function(action){
    this._stack.push(action);
    if(this._stack.length>10)this._stack.shift();
  },
  perform:function(action){
    this.push(action);
    this._show(action.label||'Изменение');
  },
  _show:function(label){
    var t=document.getElementById('undoToast');
    var txt=document.getElementById('undoText');
    if(!t||!txt)return;
    txt.textContent=label;
    t.classList.add('show');
    var self=this;
    clearTimeout(this._timer);
    this._timer=setTimeout(function(){self._hide();},6000);
  },
  _hide:function(){
    var t=document.getElementById('undoToast');
    if(t)t.classList.remove('show');
  },
  undo:function(){
    var action=this._stack.pop();
    if(!action)return;
    try{
      action.undo();
      showToast('Действие отменено','success');
    }catch(e){
      console.warn('Undo failed',e);
    }
    this._hide();
  }
};
function performUndo(){UndoManager.undo();}

/* ============================================================
   5. THEME — без тоста, быстрая
   ============================================================ */
var Theme={
  isDark:false,
  init:function(){
    var saved=Storage.get('theme','light');
    this.isDark=(saved==='dark');
    document.body.classList.toggle('dark',this.isDark);
    var btn=document.getElementById('themeBtn');
    if(btn)btn.textContent=this.isDark?'☀️':'🌙';
    var sel=document.getElementById('setTheme');
    if(sel)sel.value=saved;
  },
  toggle:function(){
    this.isDark=!this.isDark;
    document.body.classList.toggle('dark',this.isDark);
    var btn=document.getElementById('themeBtn');
    if(btn)btn.textContent=this.isDark?'☀️':'🌙';
    Storage.set('theme',this.isDark?'dark':'light');
    var sel=document.getElementById('setTheme');
    if(sel)sel.value=this.isDark?'dark':'light';
    // Тост НЕ показываем. Графики НЕ перерисовываем.
  }
};
function toggleTheme(){Theme.toggle();}

/* ============================================================
   6. ACTIVATION
   ============================================================ */
var Activation={
  steps:['calc','journal','receipt'],
  done:Storage.get('activationDone',{}),
  markDone:function(step){
    if(this.done[step])return;
    this.done[step]=true;
    Storage.set('activationDone',this.done);
  },
  isAllDone:function(){
    return this.steps.every(function(s){return this.done[s];},this);
  }
};

/* ============================================================
   7. LAZY LIBS
   ============================================================ */
var LazyLibs={
  _loaded:{},
  _load:function(name,url,check){
    var self=this;
    if(this._loaded[name]){
      return Promise.resolve(window[check]||true);
    }
    return new Promise(function(resolve,reject){
      var existing=document.querySelector('script[data-lib="'+name+'"]');
      if(existing){
        existing.addEventListener('load',function(){
          self._loaded[name]=true;
          resolve(window[check]||true);
        });
        existing.addEventListener('error',reject);
        return;
      }
      var script=document.createElement('script');
      script.src=url;
      script.async=true;
      script.dataset.lib=name;
      script.onload=function(){
        self._loaded[name]=true;
        resolve(window[check]||true);
      };
      script.onerror=function(){
        reject(new Error('Не удалось загрузить библиотеку: '+name));
      };
      document.head.appendChild(script);
    });
  },
  chart:function(){
    return this._load('chart','https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js','Chart');
  },
  jspdf:function(){
    return this._load('jspdf','https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js','jspdf');
  },
  xlsx:function(){
    return this._load('xlsx','https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js','XLSX');
  },
  jsqr:function(){
    return this._load('jsqr','https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js','jsQR');
  },
  tesseract:function(){
    return this._load('tesseract','https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/dist/tesseract.min.js','Tesseract');
  }
};
