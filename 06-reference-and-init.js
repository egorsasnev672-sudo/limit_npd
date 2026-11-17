/* ============================================================
   40. FAQ / ЛАЙФХАКИ / ГЛОССАРИЙ
   ============================================================ */
function renderFaqLifehacks(){
  var faqEl=document.getElementById('faqList');
  if(faqEl){
    var html='';
    faqData.forEach(function(f){
      html+='<div class="acc"><button class="acc-head" onclick="toggleAcc(this)"><span>'+esc(f.q)+'</span><span class="acc-arrow">▾</span></button><div class="acc-body">'+esc(f.a)+'</div></div>';
    });
    faqEl.innerHTML=html;
  }
  var lhEl=document.getElementById('lifehacksList');
  if(lhEl){
    var html2='';
    lifehacksData.forEach(function(l){
      html2+='<div class="journal-item"><div class="ji-icon inc">💡</div><div class="ji-body"><div class="t" style="white-space:normal">'+esc(l)+'</div></div></div>';
    });
    lhEl.innerHTML=html2;
  }
  var glEl=document.getElementById('glossaryList');
  if(glEl){
    var html3='';
    glossaryData.forEach(function(g){
      html3+='<div class="journal-item"><div class="ji-icon neutral">📖</div><div class="ji-body"><div class="t">'+esc(g.term)+'</div><div class="s" style="white-space:normal">'+esc(g.def)+'</div></div></div>';
    });
    glEl.innerHTML=html3;
  }
}

function toggleAcc(btn){
  var acc=btn.parentElement;
  if(acc)acc.classList.toggle('open');
}

/* ============================================================
   41. МИНИ-КУРС (5 блоков × 15 вопросов + промокод)
   ============================================================ */
function renderCourse(){
  var el=document.getElementById('courseContent');
  if(!el)return;
  // Если открыт блок — рендерим вопросы
  if(courseState.currentBlock!==null){
    renderCourseBlock(el);
    return;
  }
  // Иначе — список блоков
  var html='<div class="card">';
  html+='<div class="card-title">'+t('courseBlocks')+'</div>';
  html+='<div class="card-sub">Пройдите все 5 блоков по 15 вопросов. Блок засчитывается только после правильного ответа на все вопросы. После прохождения всех блоков — промокод на скидку 20%.</div>';
  courseData.forEach(function(block,idx){
    var isDone=!!courseState.blocksDone[block.id];
    var isLocked=false;
    if(idx>0){
      var prevBlock=courseData[idx-1];
      isLocked=!courseState.blocksDone[prevBlock.id];
    }
    var cls='course-block-card'+(isDone?' done':'')+(isLocked?' locked':'');
    html+='<div class="'+cls+'" onclick="'+(isLocked?'showToast(\''+t('courseLocked')+'\',\'warn\')':'startCourseBlock('+idx+')')+'">'+
      '<div class="course-block-num">'+(isDone?'✓':(idx+1))+'</div>'+
      '<div class="course-block-body">'+
        '<div class="t">'+esc(block.title)+'</div>'+
        '<div class="s">'+esc(block.desc)+' · '+block.questions.length+' вопросов</div>'+
      '</div>'+
      '<span class="tag '+(isDone?'green':(isLocked?'':'amber'))+'">'+
        (isDone?t('courseBlockDone'):(isLocked?t('courseBlockLocked'):t('courseBlockInProgress')))+
      '</span>'+
    '</div>';
  });
  if(courseState.promoCode){
    html+='<div class="promo-code-box mt-16">'+
      '<div class="label">'+t('coursePromoTitle')+'</div>'+
      '<div class="code">'+esc(courseState.promoCode)+'</div>'+
      '<div class="note">'+t('coursePromoNote')+'</div>'+
    '</div>';
  }
  html+='</div>';
  el.innerHTML=html;
}

function startCourseBlock(blockIdx){
  var block=courseData[blockIdx];
  if(!block)return;
  courseState.currentBlock=blockIdx;
  courseState.currentQuestion=0;
  courseState.answers={};
  courseState.errors={};
  // Перемешиваем вопросы
  courseState.shuffledQuestions=block.questions.map(function(q,i){return i;});
  for(var i=courseState.shuffledQuestions.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var tmp=courseState.shuffledQuestions[i];
    courseState.shuffledQuestions[i]=courseState.shuffledQuestions[j];
    courseState.shuffledQuestions[j]=tmp;
  }
  // Перемешиваем варианты внутри каждого вопроса
  courseState.shuffledOptions={};
  block.questions.forEach(function(q,qi){
    var opts=q.options.map(function(o,oi){return oi;});
    for(var i=opts.length-1;i>0;i--){
      var j=Math.floor(Math.random()*(i+1));
      var tmp=opts[i];opts[i]=opts[j];opts[j]=tmp;
    }
    courseState.shuffledOptions[qi]=opts;
  });
  renderCourse();
}

function renderCourseBlock(el){
  var block=courseData[courseState.currentBlock];
  if(!block)return;
  var qi=courseState.shuffledQuestions[courseState.currentQuestion];
  var q=block.questions[qi];
  var opts=courseState.shuffledOptions[qi]||q.options.map(function(o,oi){return oi;});
  var html='<div class="card">';
  html+='<div class="card-header">'+
    '<div><div class="card-title">'+esc(block.title)+'</div>'+
    '<div class="card-sub">'+tFormat('courseQuestionOf',[courseState.currentQuestion+1,block.questions.length])+'</div></div>'+
    '<button class="btn btn-ghost btn-sm" onclick="exitCourseBlock()">← '+t('coursePrev')+'</button>'+
  '</div>';
  // Прогресс
  var pct=Math.round((courseState.currentQuestion/block.questions.length)*100);
  html+='<div class="progress mb-12"><div class="progress-bar" style="width:'+pct+'%"></div></div>';
  // Вопрос
  html+='<div class="course-question">';
  html+='<div class="q">'+esc(q.q)+'</div>';
  html+='<div class="course-options">';
  opts.forEach(function(origIdx){
    html+='<button class="course-option" onclick="answerCourseQuestion('+origIdx+')">'+esc(q.options[origIdx])+'</button>';
  });
  html+='</div>';
  html+='</div>';
  html+='</div>';
  el.innerHTML=html;
}

function answerCourseQuestion(origIdx){
  var block=courseData[courseState.currentBlock];
  var qi=courseState.shuffledQuestions[courseState.currentQuestion];
  var q=block.questions[qi];
  var isCorrect=(origIdx===q.correct);
  if(isCorrect){
    // Показываем зелёный
    var el=document.getElementById('courseContent');
    var qEl=el.querySelector('.course-question');
    var btns=qEl.querySelectorAll('.course-option');
    btns.forEach(function(b){b.disabled=true;});
    // Подсвечиваем правильный
    var opts=courseState.shuffledOptions[qi]||q.options.map(function(o,oi){return oi;});
    opts.forEach(function(oidx,i){
      if(oidx===q.correct)btns[i].classList.add('correct');
    });
    // Показываем пояснение
    var expl=document.createElement('div');
    expl.className='course-explanation';
    expl.innerHTML='<strong>✓ '+t('courseCorrect')+'</strong> '+esc(q.explanation);
    qEl.appendChild(expl);
    setTimeout(function(){
      courseState.currentQuestion++;
      if(courseState.currentQuestion>=block.questions.length){
        // Блок пройден
        finishCourseBlock();
      } else {
        renderCourse();
      }
    },1500);
  } else {
    // Ошибка — показываем красный + правильный + пояснение
    var el2=document.getElementById('courseContent');
    var qEl2=el2.querySelector('.course-question');
    var btns2=qEl2.querySelectorAll('.course-option');
    btns2.forEach(function(b){b.disabled=true;});
    var opts2=courseState.shuffledOptions[qi]||q.options.map(function(o,oi){return oi;});
    opts2.forEach(function(oidx,i){
      if(oidx===q.correct)btns2[i].classList.add('correct');
      else if(oidx===origIdx)btns2[i].classList.add('wrong');
    });
    if(!courseState.errors[courseState.currentBlock])courseState.errors[courseState.currentBlock]=[];
    courseState.errors[courseState.currentBlock].push(qi);
    var expl2=document.createElement('div');
    expl2.className='course-explanation wrong';
    expl2.innerHTML='<strong>✗ '+t('courseWrong')+'</strong><br>'+t('courseCorrectAnswer')+' <strong>'+esc(q.options[q.correct])+'</strong><br>'+t('courseExplanation')+' '+esc(q.explanation);
    qEl2.appendChild(expl2);
    // Кнопка «Дальше»
    var btnWrap=document.createElement('div');
    btnWrap.className='mt-12';
    btnWrap.innerHTML='<button class="btn btn-primary btn-sm" onclick="nextCourseQuestion()">'+t('courseNext')+' →</button>';
    qEl2.appendChild(btnWrap);
  }
}

function nextCourseQuestion(){
  var block=courseData[courseState.currentBlock];
  courseState.currentQuestion++;
  if(courseState.currentQuestion>=block.questions.length){
    // Все вопросы пройдены (с ошибками или без)
    var errs=courseState.errors[courseState.currentBlock]||[];
    if(errs.length>0){
      // Показываем ошибки
      renderCourseErrors();
    } else {
      finishCourseBlock();
    }
  } else {
    renderCourse();
  }
}

function renderCourseErrors(){
  var block=courseData[courseState.currentBlock];
  var errs=courseState.errors[courseState.currentBlock]||[];
  var el=document.getElementById('courseContent');
  var html='<div class="card">';
  html+='<div class="card-title">'+t('courseErrorsTitle')+' ('+errs.length+')</div>';
  html+='<div class="card-sub">Проёдите эти вопросы заново, чтобы завершить блок.</div>';
  errs.forEach(function(qi){
    var q=block.questions[qi];
    html+='<div class="course-question">'+
      '<div class="q">'+esc(q.q)+'</div>'+
      '<div class="course-explanation wrong"><strong>✗ '+t('courseWrong')+'</strong><br>'+t('courseCorrectAnswer')+' <strong>'+esc(q.options[q.correct])+'</strong><br>'+t('courseExplanation')+' '+esc(q.explanation)+'</div>'+
    '</div>';
  });
  html+='<button class="btn btn-primary" onclick="retryCourseErrors()">'+t('courseRetryErrors')+'</button>';
  html+='</div>';
  el.innerHTML=html;
}

function retryCourseErrors(){
  var errs=courseState.errors[courseState.currentBlock]||[];
  if(errs.length===0){finishCourseBlock();return;}
  // Ставим очередь из ошибок
  courseState.shuffledQuestions=errs.slice();
  courseState.currentQuestion=0;
  courseState.errors[courseState.currentBlock]=[];
  // Перемешиваем варианты для этих вопросов
  var block=courseData[courseState.currentBlock];
  errs.forEach(function(qi){
    var q=block.questions[qi];
    var opts=q.options.map(function(o,oi){return oi;});
    for(var i=opts.length-1;i>0;i--){
      var j=Math.floor(Math.random()*(i+1));
      var tmp=opts[i];opts[i]=opts[j];opts[j]=tmp;
    }
    courseState.shuffledOptions[qi]=opts;
  });
  renderCourse();
}

function finishCourseBlock(){
  var block=courseData[courseState.currentBlock];
  courseState.blocksDone[block.id]=true;
  Storage.set('courseBlocksDone',courseState.blocksDone);
  // Проверяем все ли блоки пройдены
  var allDone=courseData.every(function(b){return courseState.blocksDone[b.id];});
  if(allDone&&!courseState.promoCode){
    // Генерируем промокод
    courseState.promoCode=generatePromoCode();
    Storage.set('promoCode',courseState.promoCode);
  }
  courseState.currentBlock=null;
  courseState.currentQuestion=0;
  courseState.answers={};
  courseState.errors={};
  if(allDone){
    showCourseResult();
  } else {
    showToast('Блок пройден!','success');
    renderCourse();
  }
}

function exitCourseBlock(){
  courseState.currentBlock=null;
  courseState.currentQuestion=0;
  courseState.answers={};
  courseState.errors={};
  renderCourse();
}

function showCourseResult(){
  var modal=document.getElementById('courseResultModal');
  var body=document.getElementById('courseResultBody');
  if(!modal||!body)return;
  body.innerHTML=
    '<div class="promo-code-box">'+
      '<div class="label">'+t('coursePromoTitle')+'</div>'+
      '<div class="code">'+esc(courseState.promoCode)+'</div>'+
      '<div class="note">'+t('coursePromoNote')+'</div>'+
    '</div>'+
    '<p class="small muted">Промокод сохранён в «Настройках» и «Оплате». Используйте его при оформлении подписки.</p>';
  modal.classList.add('open');
}

function closeCourseResult(){
  var modal=document.getElementById('courseResultModal');
  if(modal)modal.classList.remove('open');
  renderCourse();
}

/* ============================================================
   42. НК РФ
   ============================================================ */
function renderNK(){
  var el=document.getElementById('nkList');
  if(!el)return;
  var searchEl=document.getElementById('nkSearch');
  var catEl=document.getElementById('nkCategory');
  var q=searchEl?searchEl.value.toLowerCase():'';
  var cat=catEl?catEl.value:'';
  var html='';
  nkArticlesData.filter(function(a){
    if(cat&&a.category!==cat)return false;
    if(q&&a.article.toLowerCase().indexOf(q)<0&&a.title.toLowerCase().indexOf(q)<0&&a.text.toLowerCase().indexOf(q)<0)return false;
    return true;
  }).forEach(function(a){
    html+='<div class="acc"><button class="acc-head" onclick="toggleAcc(this)"><span>Ст. '+esc(a.article)+' — '+esc(a.title)+'</span><span class="tag">'+esc(a.category)+'</span></button><div class="acc-body">'+esc(a.text)+'<div class="small muted mt-8">Источник: '+esc(a.source)+'</div></div></div>';
  });
  el.innerHTML=html||'<div class="muted small">Ничего не найдено</div>';
}

/* ============================================================
   43. СУДПРАКТИКА
   ============================================================ */
function renderCourt(){
  var el=document.getElementById('courtList');
  if(!el)return;
  var searchEl=document.getElementById('courtSearch');
  var q=searchEl?searchEl.value.toLowerCase():'';
  var html='';
  courtCasesData.filter(function(c){
    if(q&&c.topic.toLowerCase().indexOf(q)<0&&c.case.toLowerCase().indexOf(q)<0)return false;
    return true;
  }).forEach(function(c){
    html+='<div class="acc"><button class="acc-head" onclick="toggleAcc(this)"><span>'+esc(c.topic)+' — '+esc(c.case)+'</span><span class="acc-arrow">▾</span></button><div class="acc-body"><strong>Ситуация:</strong> '+esc(c.situation)+'<br><strong>Решение:</strong> '+esc(c.decision)+'<br><strong>Вывод:</strong> '+esc(c.conclusion)+'</div></div>';
  });
  el.innerHTML=html||'<div class="muted small">Ничего не найдено</div>';
}

/* ============================================================
   44. ГОСЗАКУПКИ
   ============================================================ */
function renderGovChecklist(){
  var el44=document.getElementById('govChecklist44');
  if(el44){
    var steps44=[
      'Получить ЭЦП и аккредитоваться на ЭТП',
      'Изучить извещение и документацию',
      'Подготовить заявку по требованиям',
      'Внести обеспечение заявки',
      'Подать заявку в срок',
      'Участвовать в торгах',
      'Подписать контракт в регламентный срок',
      'Внести обеспечение исполнения контракта',
      'Исполнить контракт',
      'Подписать акты приёмки',
      'Сдать отчётность',
      'Вести реестр контрактов'
    ];
    var html='<ol style="padding-left:20px;line-height:1.9;font-size:.9rem">';
    steps44.forEach(function(s){html+='<li>'+esc(s)+'</li>';});
    html+='</ol>';
    el44.innerHTML=html;
  }
  var el223=document.getElementById('govChecklist223');
  if(el223){
    var steps223=[
      'Изучить положение о закупке заказчика',
      'Подготовить заявку',
      'Подать заявку через ЭТП',
      'Участвовать в процедуре',
      'Подписать договор',
      'Исполнить договор',
      'Подписать акты',
      'Сдать отчётность'
    ];
    var html2='<ol style="padding-left:20px;line-height:1.9;font-size:.9rem">';
    steps223.forEach(function(s){html2+='<li>'+esc(s)+'</li>';});
    html2+='</ol>';
    el223.innerHTML=html2;
  }
  var cmpEl=document.getElementById('govCompareTable');
  if(cmpEl){
    var rows=[
      ['Критерий','ИП','ООО'],
      ['Регистрация','Проще','Сложнее (устав, капитал)'],
      ['Ответственность','Личным имуществом','В пределах уставного капитала'],
      ['Крупные контракты','Ограничения','Без ограничений'],
      ['Отчётность','Проще','Полная']
    ];
    var html3='';
    rows.forEach(function(r,i){
      html3+='<tr>'+(i===0?r.map(function(c){return '<th>'+c+'</th>';}).join(''):r.map(function(c){return '<td>'+c+'</td>';}).join(''))+'</tr>';
    });
    cmpEl.innerHTML=html3;
  }
}

/* ============================================================
   45. НАСТРОЙКИ: ШРИФТ / ТЕМА / РЕЖИМЫ
   ============================================================ */
function applyFontSize(){
  var el=document.getElementById('setFont');
  if(!el)return;
  var v=clamp(int(el.value,16),12,36);
  document.documentElement.style.setProperty('--fs',v+'px');
  Storage.set('fontSize',v);
  var preview=document.getElementById('setFontPreview');
  if(preview)preview.style.fontSize=v+'px';
}

function applyColorblind(){
  var el=document.getElementById('setColorblind');
  if(!el)return;
  var on=el.value==='on';
  document.body.classList.toggle('colorblind',on);
  Storage.set('colorblind',el.value);
  showToast(on?'Режим для дальтоников включён':'Режим для дальтоников выключен','info');
}

function applySimpleMode(){
  var el=document.getElementById('setSimple');
  if(!el)return;
  var on=el.value==='on';
  document.body.classList.toggle('simple-mode',on);
  Storage.set('simpleMode',el.value);
  var banner=document.getElementById('simpleBanner');
  if(banner)banner.classList.toggle('show',on);
  showToast(on?'Простой режим включён':'Простой режим выключен','info');
}

function exitSimpleMode(){
  document.body.classList.remove('simple-mode');
  var el=document.getElementById('setSimple');
  if(el)el.value='off';
  Storage.set('simpleMode','off');
  var banner=document.getElementById('simpleBanner');
  if(banner)banner.classList.remove('show');
  showToast('Простой режим выключен','info');
}

function applyThemeSetting(){
  var el=document.getElementById('setTheme');
  if(!el)return;
  var v=el.value;
  document.body.classList.toggle('dark',v==='dark');
  Theme.isDark=(v==='dark');
  var btn=document.getElementById('themeBtn');
  if(btn)btn.textContent=Theme.isDark?'☀️':'🌙';
  Storage.set('theme',v);
}

/* ============================================================
   46. ПАРОЛЬ
   ============================================================ */
var lockInput='';

function saveAppPassword(){
  var p1El=document.getElementById('setPassword');
  var p2El=document.getElementById('setPassword2');
  if(!p1El||!p2El)return;
  var p1=p1El.value;
  var p2=p2El.value;
  if(p1.length!==4||!/^\d{4}$/.test(p1)){showToast('Пароль должен быть 4 цифры','error');return;}
  if(p1!==p2){showToast('Пароли не совпадают','error');return;}
  Storage.set('appPassword',simpleHash(p1));
  Storage.set('appPasswordSet',true);
  p1El.value='';
  p2El.value='';
  updatePasswordStatus();
  showToast('Пароль установлен','success');
}

function removeAppPassword(){
  Storage.remove('appPassword');
  Storage.set('appPasswordSet',false);
  updatePasswordStatus();
  showToast('Пароль удалён','warn');
}

function updatePasswordStatus(){
  var el=document.getElementById('passwordStatus');
  if(!el)return;
  var set=Storage.get('appPasswordSet',false);
  el.textContent=set?'Пароль установлен':'Пароль не установлен';
}

function showLockScreen(){
  var lock=document.getElementById('lockScreen');
  if(!lock)return;
  lock.classList.add('open');
  lockInput='';
  renderLockDots('');
  renderLockKeypad();
}

function renderLockDots(input){
  var el=document.getElementById('lockDots');
  if(!el)return;
  var html='';
  for(var i=0;i<4;i++){
    html+='<div class="lock-dot'+(i<input.length?' filled':'')+'"></div>';
  }
  el.innerHTML=html;
}

function renderLockKeypad(){
  var el=document.getElementById('lockKeypad');
  if(!el)return;
  var keys=['1','2','3','4','5','6','7','8','9','C','0','⌫'];
  var html='';
  keys.forEach(function(k){
    html+='<button class="lock-key'+(k==='C'||k==='⌫'?' action':'')+'" onclick="pressLockKey(\''+k+'\')">'+k+'</button>';
  });
  el.innerHTML=html;
}

function pressLockKey(k){
  if(k==='C'){lockInput='';}
  else if(k==='⌫'){lockInput=lockInput.slice(0,-1);}
  else if(lockInput.length<4){lockInput+=k;}
  renderLockDots(lockInput);
  if(lockInput.length===4){
    var hash=simpleHash(lockInput);
    if(hash===Storage.get('appPassword','')){
      var lock=document.getElementById('lockScreen');
      if(lock)lock.classList.remove('open');
      lockInput='';
      showToast('Добро пожаловать!','success');
    } else {
      showToast('Неверный пароль','error');
      lockInput='';
      renderLockDots('');
    }
  }
}

/* ============================================================
   47. СТАТИСТИКА И ОЧИСТКА
   ============================================================ */
function renderDataStats(){
  var el=document.getElementById('dataStats');
  if(!el)return;
  el.innerHTML=
    'Операций в журнале: <strong>'+journalData.length+'</strong><br>'+
    'Чеков: <strong>'+receiptsData.length+'</strong><br>'+
    'История расчётов: <strong>'+taxHistory.length+'</strong><br>'+
    'Заметок в календаре: <strong>'+Object.keys(calendarNotes).length+'</strong><br>'+
    'Пользовательских категорий: <strong>'+((customJournalCategories.income||[]).length+(customJournalCategories.expense||[]).length)+'</strong><br>'+
    'Промокод: <strong>'+(courseState.promoCode||'—')+'</strong>';
}

function clearAllData(){
  if(!confirm(t('confirmClearAll')))return;
  Storage.clearAll();
  journalData=[];
  receiptsData=[];
  taxHistory=[];
  calendarNotes={};
  checklistState={};
  customJournalCategories={income:[],expense:[]};
  courseState.blocksDone={};
  courseState.promoCode='';
  courseState.promoUsed=false;
  paymentState.subscription={plan:null,paid:false,date:''};
  showToast('Все данные удалены','warn');
  renderDataStats();
  renderJournal();
  renderTaxHistory();
  buildHeatmap();
  renderCourse();
  renderPayment();
}

/* ============================================================
   48. БЭКАП
   ============================================================ */
function exportBackup(){
  var data={
    journal:journalData,
    receipts:receiptsData,
    history:taxHistory,
    notes:calendarNotes,
    checklist:checklistState,
    categories:customJournalCategories,
    courseBlocks:courseState.blocksDone,
    promoCode:courseState.promoCode,
    promoUsed:courseState.promoUsed,
    subscription:paymentState.subscription,
    settings:{
      theme:Storage.get('theme','light'),
      fontSize:Storage.get('fontSize',16),
      colorblind:Storage.get('colorblind','off'),
      simpleMode:Storage.get('simpleMode','off'),
      lang:Storage.get('lang','ru')
    },
    exported:new Date().toISOString()
  };
  var pwEl=document.getElementById('backupPassword');
  var pw=pwEl?pwEl.value:'';
  if(pw){
    var encoded=btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    downloadFile('backup-'+todayISO()+'.enc',encoded,'application/octet-stream');
  } else {
    downloadJSON('backup-'+todayISO()+'.json',data);
  }
  showToast('Бэкап скачан','success');
}

function exportBackupHTML(){
  var html='<html><head><meta charset="utf-8"><title>Налоговый отчёт</title></head><body style="font-family:sans-serif;padding:20px;max-width:800px;margin:0 auto">'+
    '<h1>Налоговый отчёт</h1>'+
    '<p>Дата: '+new Date().toLocaleString('ru-RU')+'</p>'+
    '<h2>Журнал операций</h2>'+
    '<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%"><tr><th>Дата</th><th>Тип</th><th>Категория</th><th>Сумма</th></tr>';
  journalData.forEach(function(e){
    html+='<tr><td>'+formatDateRu(e.date)+'</td><td>'+(e.type==='income'?'Доход':'Расход')+'</td><td>'+esc(e.category)+'</td><td>'+formatMoney(e.amount)+'</td></tr>';
  });
  html+='</table></body></html>';
  renderHtmlToPdf(html,'report.html');
}

function importBackup(ev){
  var file=ev.target.files[0];
  if(!file)return;
  var isEnc=file.name.endsWith('.enc');
  readFileAsText(file).then(function(text){
    var data;
    try{
      if(isEnc){
        data=JSON.parse(decodeURIComponent(escape(atob(text))));
      } else {
        data=JSON.parse(text);
      }
    }catch(e){showToast('Ошибка чтения файла','error');return;}
    if(data.journal)journalData=data.journal;
    if(data.receipts)receiptsData=data.receipts;
    if(data.history)taxHistory=data.history;
    if(data.notes)calendarNotes=data.notes;
    if(data.checklist)checklistState=data.checklist;
    if(data.categories)customJournalCategories=data.categories;
    if(data.courseBlocks)courseState.blocksDone=data.courseBlocks;
    if(data.promoCode)courseState.promoCode=data.promoCode;
    if(data.promoUsed)courseState.promoUsed=data.promoUsed;
    if(data.subscription)paymentState.subscription=data.subscription;
    Storage.set('journalData',journalData);
    Storage.set('receiptsData',receiptsData);
    Storage.set('taxHistory',taxHistory);
    Storage.set('calendarNotes',calendarNotes);
    Storage.set('checklistState',checklistState);
    Storage.set('customJournalCategories',customJournalCategories);
    Storage.set('courseBlocksDone',courseState.blocksDone);
    if(courseState.promoCode)Storage.set('promoCode',courseState.promoCode);
    Storage.set('promoUsed',courseState.promoUsed);
    Storage.set('subscription',paymentState.subscription);
    showToast('Данные восстановлены','success');
    renderJournal();
    renderTaxHistory();
    buildHeatmap();
    renderDataStats();
    renderCourse();
    renderPayment();
  });
}

function shareBackupLink(){
  var data={journal:journalData,history:taxHistory.length};
  var encoded=btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  var url=window.location.origin+window.location.pathname+'#backup='+encoded;
  var qrUrl='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(url);
  var el=document.getElementById('shareResult');
  if(el){
    el.innerHTML='<div class="info-box"><strong>Ссылка для обмена:</strong><br><input type="text" value="'+esc(url)+'" readonly style="width:100%;margin-top:8px;padding:8px;border:1px solid var(--border);border-radius:6px"><div style="margin-top:12px;text-align:center"><img src="'+qrUrl+'" alt="QR" style="width:200px;height:200px;border-radius:8px;background:#fff;padding:8px"></div></div>';
  }
  if(navigator.clipboard){
    navigator.clipboard.writeText(url).then(function(){showToast(t('shareCopied'),'success');});
  }
}

function loadDemo(){
  journalData=[
    {type:'income',date:'2026-01-15',amount:150000,category:'Услуги',counterparty:'ООО Ромашка',comment:'Оплата'},
    {type:'expense',date:'2026-01-20',amount:30000,category:'Аренда',counterparty:'Арендодатель',comment:''},
    {type:'income',date:'2026-02-10',amount:200000,category:'Консалтинг',counterparty:'ИП Иванов',comment:''},
    {type:'expense',date:'2026-02-15',amount:50000,category:'Зарплата',counterparty:'',comment:''}
  ];
  Storage.set('journalData',journalData);
  showToast('Демо-данные загружены','success');
  renderJournal();
}

function clearDemo(){
  journalData=[];
  Storage.set('journalData',journalData);
  renderJournal();
  showToast('Демо удалено','warn');
}

/* ============================================================
   49. ОПЛАТА
   ============================================================ */
function renderPayment(){
  // Статус
  var statusEl=document.getElementById('paymentStatus');
  if(statusEl){
    var sub=paymentState.subscription;
    if(sub&&sub.paid){
      statusEl.innerHTML='<strong>'+t('subscriptionActive')+'</strong><br>'+
        t('plan')+': '+(sub.plan==='month'?t('planMonth'):t('planYear'))+'<br>'+
        t('paidDate')+': '+formatDateRu(sub.date);
    } else {
      statusEl.innerHTML='<span class="muted">'+t('subscriptionInactive')+'</span>';
    }
  }
  // Промокод
  var promoEl=document.getElementById('promoResult');
  if(promoEl){
    if(courseState.promoCode){
      if(courseState.promoUsed){
        promoEl.innerHTML='<div class="info-box warn">'+t('promoUsed')+'</div>';
      } else {
        promoEl.innerHTML='<div class="info-box success"><strong>'+t('promoApplied')+'</strong> ('+esc(courseState.promoCode)+')</div>';
      }
    } else {
      promoEl.innerHTML='<div class="info-box info">'+t('promoNoCourse')+'</div>';
    }
  }
  // Планы
  var mEl=document.getElementById('planMonth');
  var yEl=document.getElementById('planYear');
  if(mEl)mEl.classList.toggle('active',paymentState.plan==='month');
  if(yEl)yEl.classList.toggle('active',paymentState.plan==='year');
  // Summary
  var sumEl=document.getElementById('priceSummary');
  if(sumEl){
    if(!paymentState.plan){
      sumEl.innerHTML='<span class="muted">Выберите план</span>';
    } else {
      var planName=paymentState.plan==='month'?t('planMonth'):t('planYear');
      var discount=paymentState.promoApplied&&!courseState.promoUsed?' (−20%)':'';
      sumEl.innerHTML='<strong>'+planName+discount+'</strong>';
    }
  }
}

function selectPlan(plan){
  paymentState.plan=plan;
  renderPayment();
}

function applyPromoCode(){
  var input=document.getElementById('promoInput');
  if(!input)return;
  var code=input.value.trim();
  if(!code){showToast(t('promoEmpty'),'warn');return;}
  if(!courseState.promoCode){
    showToast(t('promoNoCourse'),'warn');
    return;
  }
  if(courseState.promoUsed){
    showToast(t('promoUsed'),'warn');
    return;
  }
  if(code!==courseState.promoCode){
    showToast(t('promoInvalid'),'error');
    return;
  }
  paymentState.promoApplied=true;
  renderPayment();
  showToast(t('promoApplied'),'success');
}

function payNow(){
  if(!paymentState.plan){
    showToast('Выберите план','warn');
    return;
  }
  if(paymentState.promoApplied&&!courseState.promoUsed){
    courseState.promoUsed=true;
    Storage.set('promoUsed',true);
  }
  paymentState.subscription={
    plan:paymentState.plan,
    paid:false,
    date:todayISO(),
    pending:true
  };
  Storage.set('subscription',paymentState.subscription);
  showToast(t('paymentNotReady'),'info');
  renderPayment();
  renderDataStats();
}

/* ============================================================
   50. СВАЙП (touch)
   ============================================================ */
var _swipeStart=null;
function initSwipe(){
  if(window.innerWidth>=1024)return;
  document.addEventListener('touchstart',function(e){
    if(e.touches.length!==1)return;
    var t=e.touches[0];
    if(t.target.closest('.no-swipe'))return;
    _swipeStart={x:t.clientX,y:t.clientY,edge:(t.clientX<30?'left':(t.clientX>window.innerWidth-30?'right':null))};
  },{passive:true});
  document.addEventListener('touchmove',function(e){
    if(!_swipeStart)return;
    var t=e.touches[0];
    var dx=t.clientX-_swipeStart.x;
    var dy=t.clientY-_swipeStart.y;
    if(Math.abs(dx)<60||Math.abs(dx)<Math.abs(dy))return;
    var sb=document.getElementById('sidebar');
    if(!sb)return;
    if(dx>0&&_swipeStart.edge==='left'){
      // свайп вправо от левого края → открыть
      if(!sb.classList.contains('open')){
        sb.classList.add('open');
        _swipeStart=null;
      }
    } else if(dx<0&&_swipeStart.edge==='right'){
      // свайп влево от правого края → закрыть
      if(sb.classList.contains('open')){
        sb.classList.remove('open');
        _swipeStart=null;
      }
    }
  },{passive:true});
  document.addEventListener('touchend',function(){_swipeStart=null;},{passive:true});
}

/* ============================================================
   51. НАВИГАЦИЯ
   ============================================================ */
function toggleMenu(){
  var sb=document.getElementById('sidebar');
  if(sb)sb.classList.toggle('open');
}

function switchTab(tab){
  document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.remove('active');});
  var el=document.getElementById('tab-'+tab);
  if(el)el.classList.add('active');
  document.querySelectorAll('.side-item').forEach(function(b){
    b.classList.toggle('active',b.dataset.tab===tab);
  });
  document.querySelectorAll('.bt-item').forEach(function(b){
    b.classList.toggle('active',b.dataset.tab===tab);
  });
  if(window.innerWidth<1024){
    var sb=document.getElementById('sidebar');
    if(sb)sb.classList.remove('open');
  }
  window.scrollTo({top:0,behavior:'smooth'});
  if(tab==='limits'){renderLimitIndicators();updForecast();}
  if(tab==='risk')renderRiskQuestions();
  if(tab==='ben'){renderRegionBenefit();renderModeQuiz();}
  if(tab==='comp'){renderCompStaticTable();renderCompare();renderIpVsEmployee();renderIpVsOoo();renderSalaryVsDividends();renderLeasing();}
  if(tab==='kpi')renderKpi();
  if(tab==='sickleave')calcSickLeave();
  if(tab==='vacation')calcVacation();
  if(tab==='maternity')calcMaternity();
  if(tab==='bep')calcBep();
  if(tab==='roi')calcRoi();
  if(tab==='cashflow')calcCashflow();
  if(tab==='ndfl')calcNdfl();
  if(tab==='journal')renderJournal();
  if(tab==='scanner')renderReceipts();
  if(tab==='checklist'){buildChecklist();renderDocsPackage();}
  if(tab==='heatmap')buildHeatmap();
  if(tab==='simulator')runSimulator();
  if(tab==='faq')renderFaqLifehacks();
  if(tab==='course')renderCourse();
  if(tab==='nk')renderNK();
  if(tab==='court')renderCourt();
  if(tab==='govproc')renderGovChecklist();
  if(tab==='payment')renderPayment();
  if(tab==='settings'){renderDataStats();updatePasswordStatus();}
}

/* ============================================================
   52. ПОИСК
   ============================================================ */
function openSearch(){
  var m=document.getElementById('searchModal');
  if(m)m.classList.add('open');
  setTimeout(function(){
    var i=document.getElementById('searchInput');
    if(i)i.focus();
  },50);
}
function closeSearch(){
  var m=document.getElementById('searchModal');
  if(m)m.classList.remove('open');
  var i=document.getElementById('searchInput');
  if(i)i.value='';
  var r=document.getElementById('searchResults');
  if(r)r.innerHTML='';
}
function runSearch(){
  var input=document.getElementById('searchInput');
  var resultsEl=document.getElementById('searchResults');
  if(!input||!resultsEl)return;
  var q=input.value.toLowerCase().trim();
  if(!q){resultsEl.innerHTML='';return;}
  var res=[];
  nkArticlesData.forEach(function(a){
    if(a.article.toLowerCase().indexOf(q)>=0||a.title.toLowerCase().indexOf(q)>=0||a.text.toLowerCase().indexOf(q)>=0){
      res.push({t:'НК РФ ст. '+a.article+': '+a.title,s:a.category,tab:'nk'});
    }
  });
  courtCasesData.forEach(function(c){
    if(c.topic.toLowerCase().indexOf(q)>=0||c.case.toLowerCase().indexOf(q)>=0){
      res.push({t:'Судпрактика: '+c.topic,s:c.case,tab:'court'});
    }
  });
  courseData.forEach(function(c,i){
    if(c.title.toLowerCase().indexOf(q)>=0||c.desc.toLowerCase().indexOf(q)>=0){
      res.push({t:'Курс: '+c.title,s:c.desc,tab:'course'});
    }
  });
  regionsData.forEach(function(r){
    if(r.region.toLowerCase().indexOf(q)>=0){
      res.push({t:r.region,s:'Регион, код '+r.code,tab:'ben'});
    }
  });
  glossaryData.forEach(function(g){
    if(g.term.toLowerCase().indexOf(q)>=0||g.def.toLowerCase().indexOf(q)>=0){
      res.push({t:'Глоссарий: '+g.term,s:g.def,tab:'faq'});
    }
  });
  faqData.forEach(function(f){
    if(f.q.toLowerCase().indexOf(q)>=0||f.a.toLowerCase().indexOf(q)>=0){
      res.push({t:'FAQ: '+f.q,s:f.a.slice(0,80),tab:'faq'});
    }
  });
  var html='';
  res.slice(0,30).forEach(function(r){
    html+='<div class="sr-item" onclick="closeSearch();switchTab(\''+r.tab+'\')"><div class="st">'+esc(r.t)+'</div><div class="ss">'+esc(r.s)+'</div></div>';
  });
  resultsEl.innerHTML=html||'<div class="sr-item muted">Ничего не найдено</div>';
}

/* ============================================================
   53. ОНБОРДИНГ
   ============================================================ */
var onboardingSlide=0;
function startOnboarding(){
  onboardingSlide=0;
  var overlay=document.getElementById('onboardingOverlay');
  if(overlay)overlay.classList.add('open');
  updateOnboarding();
}
function updateOnboarding(){
  document.querySelectorAll('.onboarding-slide').forEach(function(s,i){
    s.classList.toggle('active',i===onboardingSlide);
  });
  document.querySelectorAll('#onboardingDots .dot').forEach(function(d,i){
    d.classList.toggle('active',i===onboardingSlide);
  });
  var btn=document.getElementById('onboardingNextBtn');
  if(btn)btn.textContent=(onboardingSlide===3?'Начать':'Далее');
}
function onboardingNext(){
  if(onboardingSlide<3){onboardingSlide++;updateOnboarding();}
  else{onboardingSkip();}
}
function onboardingSkip(){
  var overlay=document.getElementById('onboardingOverlay');
  if(overlay)overlay.classList.remove('open');
  Storage.set('onboardingDone',true);
  showToast('Добро пожаловать!','success');
}
function restartOnboarding(){
  Storage.set('onboardingDone',false);
  startOnboarding();
}

/* ============================================================
   54. WELCOME BACK / PWA
   ============================================================ */
function showWelcomeBackIfNeeded(){
  var lastVisit=Storage.get('lastVisit',0);
  var now=Date.now();
  if(lastVisit&&(now-lastVisit)>24*60*60*1000){
    var b=document.getElementById('welcomeBanner');
    if(b){
      b.classList.add('show');
      setTimeout(function(){b.classList.remove('show');},8000);
    }
  }
  Storage.set('lastVisit',now);
}
function dismissWelcomeBack(){
  var b=document.getElementById('welcomeBanner');
  if(b)b.classList.remove('show');
  Storage.set('lastVisit',Date.now());
}

var deferredPrompt=null;
window.addEventListener('beforeinstallprompt',function(e){
  e.preventDefault();
  deferredPrompt=e;
});
function installApp(){
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choice){
      if(choice.outcome==='accepted')showToast('Приложение установлено','success');
      deferredPrompt=null;
    });
  } else {
    var m=document.getElementById('installModal');
    if(m)m.classList.add('open');
  }
}
function confirmInstall(){
  closeInstallModal();
  if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null;}
  else showToast('Установка недоступна в этом браузере','warn');
}
function closeInstallModal(){
  var m=document.getElementById('installModal');
  if(m)m.classList.remove('open');
}

/* ============================================================
   55. ИНИЦИАЛИЗАЦИЯ
   ============================================================ */
function initEventBindings(){
  var jDate=document.getElementById('jDate');
  if(jDate)jDate.value=todayISO();
  var fabDate=document.getElementById('fabDate');
  if(fabDate)fabDate.value=todayISO();
  buildJournalCategorySelect();
  var jType=document.getElementById('jType');
  if(jType)jType.addEventListener('change',buildJournalCategorySelect);
  var fabType=document.getElementById('fabType');
  if(fabType)fabType.addEventListener('change',buildFabCategorySelect);
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape')closeSearch();
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();openSearch();}
    if(e.key==='Enter'){
      var modal=document.getElementById('addEntryModal');
      if(modal&&modal.classList.contains('open')){
        var active=document.activeElement;
        if(active&&(active.tagName==='INPUT'||active.tagName==='SELECT')){
          e.preventDefault();
          addFabEntry();
        }
      }
    }
  });
  // Свайп
  initSwipe();
}

function initApp(){
  Theme.init();
  Sandbox.init();
  initRegions();
  initEventBindings();
  buildQuickTemplates();
  renderTaxHistory();
  calcTax();
  renderLimitIndicators();
  updForecast();
  renderCompStaticTable();
  renderCompare();
  renderFaqLifehacks();
  renderNK();
  renderCourt();
  renderGovChecklist();
  buildHeatmap();
  runSimulator();
  renderDataStats();
  updatePasswordStatus();
  renderCourse();
  renderPayment();

  // Настройки
  var fs=Storage.get('fontSize',16);
  document.documentElement.style.setProperty('--fs',fs+'px');
  var fsEl=document.getElementById('setFont');
  if(fsEl)fsEl.value=fs;
  var theme=Storage.get('theme','light');
  var tEl=document.getElementById('setTheme');
  if(tEl)tEl.value=theme;
  var cb=Storage.get('colorblind','off');
  var cbEl=document.getElementById('setColorblind');
  if(cbEl)cbEl.value=cb;
  if(cb==='on')document.body.classList.add('colorblind');
  var sm=Storage.get('simpleMode','off');
  var smEl=document.getElementById('setSimple');
  if(smEl)smEl.value=sm;
  if(sm==='on'){
    document.body.classList.add('simple-mode');
    var sb=document.getElementById('simpleBanner');
    if(sb)sb.classList.add('show');
  }
  var lang=Storage.get('lang','ru');
  setLanguage(lang);

  showWelcomeBackIfNeeded();

  if(!Storage.get('onboardingDone',false)){
    startOnboarding();
  }
  if(Storage.get('appPasswordSet',false)){
    showLockScreen();
  }
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js').catch(function(){});
  }
  switchTab('calc');
}

/* ============================================================
   56. ЭКСПОРТ В WINDOW
   ============================================================ */
var windowFunctions=[
  'toggleMenu','switchTab','toggleTheme','openSearch','closeSearch','runSearch','setLanguage',
  'calcTax','onModeChange','resetCalcForm','applyTemplate','openTaxHistory','closeTaxHistory',
  'exportTaxHistoryJSON','clearTaxHistory',
  'renderLimitIndicators','updForecast','toggleLimitLine','exportLimitsPNG','exportLimitsPDF','exportLimitsXLSX',
  'renderRiskQuestions','answerRisk','resetRisk','calcRisk','saveRiskPDF',
  'initRegions','renderRegionBenefit','checkHoliday','renderModeQuiz','answerModeQuiz','recommendMode',
  'renderCompare','renderIpVsEmployee','renderIpVsOoo','renderSalaryVsDividends','renderLeasing',
  'renderKpi','exportKpiPDF','exportKpiXLSX',
  'calcSickLeave','saveSickLeavePDF','exportSickLeaveXLSX',
  'calcVacation','saveVacationPDF','exportVacationXLSX',
  'calcMaternity','saveMaternityPDF','exportMaternityXLSX',
  'calcBep','saveBepPDF','exportBepXLSX',
  'calcRoi','saveRoiPDF',
  'calcCashflow','saveCashflowPDF',
  'calcNdfl','saveNdflPDF',
  'buildJournalCategorySelect','buildFabCategorySelect','addJournalCategory','renderCategoriesList',
  'removeJournalCategory','openCategoryManager','closeCategoryManager',
  'addJournalEntry','addFabEntry','openAddEntryModal','closeAddEntryModal','renderJournal',
  'deleteJournalEntry','clearJournalAll','exportJournalCSV','exportJournalXLSX','exportJournalPDF',
  'startARScanner','stopARScanner','captureARFrame','handleScannerFile','parseFNSQR','runOCR',
  'parseReceiptText','saveReceipt','renderReceipts','saveReceiptToJournal','deleteReceipt',
  'findDuplicateReceipts','exportReceiptsCSV','exportReceiptsXLSX','searchReceipts',
  'switchChecklistType','buildChecklist','toggleChecklistItem','resetChecklist','renderDocsPackage','printChecklist',
  'buildHeatmap','changeHeatmapMonth','showHeatmapEvents','saveNote','deleteNote','exportCalendarICS','exportCalendarICSFull','printHeatmap',
  'runSimulator','applySimulatorToCalc',
  'renderFaqLifehacks','toggleAcc','renderCourse','answerCourseQuestion','nextCourseQuestion','retryCourseErrors','exitCourseBlock','startCourseBlock','closeCourseResult',
  'renderNK','renderCourt','renderGovChecklist',
  'applyFontSize','applyColorblind','applySimpleMode','exitSimpleMode','applyThemeSetting',
  'saveAppPassword','removeAppPassword',
  'pressLockKey','renderDataStats','clearAllData',
  'exportBackup','exportBackupHTML','importBackup','shareBackupLink','loadDemo','clearDemo',
  'startOnboarding','onboardingNext','onboardingSkip','restartOnboarding',
  'dismissWelcomeBack','installApp','confirmInstall','closeInstallModal','performUndo',
  'onSandboxChange','confirmSandboxOn','cancelSandboxOn','confirmSandboxOff','cancelSandboxOff','sandboxOffKeep','sandboxOffDiscard','disableSandbox',
  'renderPayment','selectPlan','applyPromoCode','payNow'
];
windowFunctions.forEach(function(name){
  if(typeof window[name]==='undefined'&&typeof eval(name)==='function'){
    window[name]=eval(name);
  }
});

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initApp);
} else {
  initApp();
}

console.log('Налоговый калькулятор готов. 5 блоков курса, промокод, оплата, свайп — всё на месте.');
