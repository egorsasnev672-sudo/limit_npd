/* ============================================================
   33. ЖУРНАЛ: КАТЕГОРИИ
   ============================================================ */
var journalCategoriesData={
  income:['Продажа','Услуги','Консалтинг','Аренда','Аванс','Прочее'],
  expense:['Аренда','Зарплата','Налоги','Материалы','Оборудование','Услуги','Транспорт','Реклама','Офис','Банк','Интернет','Прочее']
};

function getCategories(type){
  var base=journalCategoriesData[type]||[];
  var custom=(customJournalCategories[type]||[]);
  return base.concat(custom);
}

function buildJournalCategorySelect(){
  var typeEl=document.getElementById('jType');
  var sel=document.getElementById('jCategory');
  if(!typeEl||!sel)return;
  var type=typeEl.value;
  var cats=getCategories(type);
  sel.innerHTML='';
  cats.forEach(function(c){sel.innerHTML+='<option>'+esc(c)+'</option>';});
}

function buildFabCategorySelect(){
  var typeEl=document.getElementById('fabType');
  var sel=document.getElementById('fabCategory');
  if(!typeEl||!sel)return;
  var type=typeEl.value;
  var cats=getCategories(type);
  sel.innerHTML='';
  cats.forEach(function(c){sel.innerHTML+='<option>'+esc(c)+'</option>';});
}

function addJournalCategory(){
  var input=document.getElementById('newCategoryInput');
  var typeEl=document.getElementById('newCategoryType');
  if(!input||!typeEl)return;
  var name=input.value.trim();
  if(!name){showToast('Введите название','error');return;}
  var type=typeEl.value;
  if(!customJournalCategories[type])customJournalCategories[type]=[];
  if(getCategories(type).indexOf(name)>=0){showToast('Категория уже существует','warn');return;}
  customJournalCategories[type].push(name);
  Storage.set('customJournalCategories',customJournalCategories);
  input.value='';
  renderCategoriesList();
  buildJournalCategorySelect();
  buildFabCategorySelect();
  showToast('Категория добавлена','success');
}

function renderCategoriesList(){
  var el=document.getElementById('categoriesList');
  if(!el)return;
  var html='';
  ['income','expense'].forEach(function(type){
    html+='<div class="side-group-label" style="padding:8px 0 4px">'+(type==='income'?'Доходы':'Расходы')+'</div>';
    html+='<div class="chips">';
    getCategories(type).forEach(function(c){
      var isCustom=(customJournalCategories[type]||[]).indexOf(c)>=0;
      html+='<span class="chip">'+esc(c)+(isCustom?' <button class="chip-del" onclick="removeJournalCategory(\''+type+'\',\''+esc(c).replace(/'/g,"\\'")+'\')">✕</button>':'')+'</span>';
    });
    html+='</div>';
  });
  el.innerHTML=html;
}

function removeJournalCategory(type,name){
  if(!customJournalCategories[type])return;
  customJournalCategories[type]=customJournalCategories[type].filter(function(c){return c!==name;});
  Storage.set('customJournalCategories',customJournalCategories);
  renderCategoriesList();
  buildJournalCategorySelect();
  buildFabCategorySelect();
  showToast('Категория удалена','warn');
}

function openCategoryManager(){
  renderCategoriesList();
  var m=document.getElementById('categoryModal');
  if(m)m.classList.add('open');
}
function closeCategoryManager(){
  var m=document.getElementById('categoryModal');
  if(m)m.classList.remove('open');
}

/* ============================================================
   34. ЖУРНАЛ: ОПЕРАЦИИ
   ============================================================ */
function addJournalEntry(){
  var typeEl=document.getElementById('jType');
  var dateEl=document.getElementById('jDate');
  var amountEl=document.getElementById('jAmount');
  var catEl=document.getElementById('jCategory');
  if(!typeEl||!amountEl||!catEl)return;
  var type=typeEl.value;
  var date=(dateEl&&dateEl.value)||todayISO();
  var amount=num(amountEl.value);
  var category=catEl.value;
  var cpEl=document.getElementById('jCounterparty');
  var cmEl=document.getElementById('jComment');
  var counterparty=cpEl?cpEl.value.trim():'';
  var comment=cmEl?cmEl.value.trim():'';
  if(amount<=0){showToast('Введите сумму','error');return;}
  var entry={type:type,date:date,amount:amount,category:category,counterparty:counterparty,comment:comment};
  journalData.unshift(entry);
  Storage.set('journalData',journalData);
  amountEl.value='';
  if(cpEl)cpEl.value='';
  if(cmEl)cmEl.value='';
  renderJournal();
  Activation.markDone('journal');
  showToast(t('added'),'success');
  UndoManager.perform({
    label:'Операция добавлена',
    undo:function(){
      journalData=journalData.filter(function(e){return e!==entry;});
      Storage.set('journalData',journalData);
      renderJournal();
    }
  });
}

function addFabEntry(){
  var typeEl=document.getElementById('fabType');
  var dateEl=document.getElementById('fabDate');
  var amountEl=document.getElementById('fabAmount');
  var catEl=document.getElementById('fabCategory');
  if(!typeEl||!amountEl||!catEl)return;
  var type=typeEl.value;
  var date=(dateEl&&dateEl.value)||todayISO();
  var amount=num(amountEl.value);
  var category=catEl.value;
  var cpEl=document.getElementById('fabCounterparty');
  var cmEl=document.getElementById('fabComment');
  var counterparty=cpEl?cpEl.value.trim():'';
  var comment=cmEl?cmEl.value.trim():'';
  if(amount<=0){showToast('Введите сумму','error');return;}
  var entry={type:type,date:date,amount:amount,category:category,counterparty:counterparty,comment:comment};
  journalData.unshift(entry);
  Storage.set('journalData',journalData);
  amountEl.value='';
  if(cpEl)cpEl.value='';
  if(cmEl)cmEl.value='';
  closeAddEntryModal();
  renderJournal();
  showToast(t('added'),'success');
  UndoManager.perform({
    label:'Операция добавлена',
    undo:function(){
      journalData=journalData.filter(function(e){return e!==entry;});
      Storage.set('journalData',journalData);
      renderJournal();
    }
  });
}

function openAddEntryModal(){
  var d=document.getElementById('fabDate');
  if(d)d.value=todayISO();
  buildFabCategorySelect();
  var m=document.getElementById('addEntryModal');
  if(m)m.classList.add('open');
}
function closeAddEntryModal(){
  var m=document.getElementById('addEntryModal');
  if(m)m.classList.remove('open');
}

function renderJournal(){
  var wEl=document.getElementById('journalWidgets');
  if(wEl){
    var inc=journalData.filter(function(e){return e.type==='income';}).reduce(function(s,e){return s+e.amount;},0);
    var exp=journalData.filter(function(e){return e.type==='expense';}).reduce(function(s,e){return s+e.amount;},0);
    wEl.innerHTML=
      '<div class="widget"><div class="l">'+t('incomeType')+'</div><div class="v inc">'+formatMoney(inc)+'</div></div>'+
      '<div class="widget"><div class="l">'+t('expenseType')+'</div><div class="v exp">'+formatMoney(exp)+'</div></div>'+
      '<div class="widget"><div class="l">'+t('profit')+'</div><div class="v">'+formatMoney(inc-exp)+'</div></div>';
  }
  var listEl=document.getElementById('journalList');
  if(!listEl)return;
  var typeEl=document.getElementById('jFilterType');
  var monthEl=document.getElementById('jFilterMonth');
  var catFilter=document.getElementById('jFilterCategory');
  var filterType=typeEl?typeEl.value:'all';
  var filterMonth=monthEl?monthEl.value:'';
  var filterCat=catFilter?catFilter.value:'';
  if(catFilter){
    var currentVal=catFilter.value;
    var allCats=[];
    journalData.forEach(function(e){if(allCats.indexOf(e.category)<0)allCats.push(e.category);});
    catFilter.innerHTML='<option value="">Все</option>';
    allCats.sort().forEach(function(c){
      catFilter.innerHTML+='<option value="'+esc(c)+'">'+esc(c)+'</option>';
    });
    catFilter.value=currentVal||'';
  }
  var filtered=journalData.filter(function(e){
    if(filterType!=='all'&&e.type!==filterType)return false;
    if(filterMonth&&e.date.slice(0,7)!==filterMonth)return false;
    if(filterCat&&e.category!==filterCat)return false;
    return true;
  });
  if(filtered.length===0){
    listEl.innerHTML='<div class="muted small center" style="padding:20px">'+t('noData')+'</div>';
    return;
  }
  var html='';
  filtered.forEach(function(e){
    var realIdx=journalData.indexOf(e);
    html+='<div class="journal-item">'+
      '<div class="ji-icon '+(e.type==='income'?'inc':'exp')+'">'+(e.type==='income'?'+':'−')+'</div>'+
      '<div class="ji-body"><div class="t">'+esc(e.category)+'</div><div class="s">'+formatDateRu(e.date)+(e.counterparty?' · '+esc(e.counterparty):'')+(e.comment?' · '+esc(e.comment):'')+'</div></div>'+
      '<div class="ji-amount '+(e.type==='income'?'inc':'exp')+'">'+(e.type==='income'?'+':'−')+formatMoney(e.amount)+'</div>'+
      '<button class="ji-del" onclick="deleteJournalEntry('+realIdx+')" aria-label="Удалить">✕</button>'+
    '</div>';
  });
  listEl.innerHTML=html;
}

function deleteJournalEntry(idx){
  var entry=journalData[idx];
  if(!entry)return;
  journalData.splice(idx,1);
  Storage.set('journalData',journalData);
  renderJournal();
  showToast(t('deleted'),'warn');
  UndoManager.perform({
    label:'Операция удалена',
    undo:function(){
      journalData.splice(idx,0,entry);
      Storage.set('journalData',journalData);
      renderJournal();
    }
  });
}

function clearJournalAll(){
  if(!confirm(t('confirmDelete')))return;
  journalData=[];
  Storage.set('journalData',journalData);
  renderJournal();
  showToast('Журнал очищен','warn');
}

/* ============================================================
   35. ЭКСПОРТ ЖУРНАЛА
   ============================================================ */
function exportJournalCSV(){
  var rows=[['Дата','Тип','Категория','Сумма','Контрагент','Комментарий']];
  journalData.forEach(function(e){
    rows.push([e.date,e.type==='income'?'Доход':'Расход',e.category,e.amount,e.counterparty||'',e.comment||'']);
  });
  downloadCSV('journal-'+todayISO()+'.csv',rows);
  showToast('CSV скачан','success');
}

function exportJournalXLSX(){
  LazyLibs.xlsx().then(function(XLSX){
    var rows=[['Дата','Тип','Категория','Сумма','Контрагент','Комментарий']];
    journalData.forEach(function(e){
      rows.push([e.date,e.type==='income'?'Доход':'Расход',e.category,e.amount,e.counterparty||'',e.comment||'']);
    });
    var ws=XLSX.utils.aoa_to_sheet(rows);
    var wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Журнал');
    XLSX.writeFile(wb,'journal-'+todayISO()+'.xlsx');
    showToast('Excel скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

function exportJournalPDF(){
  LazyLibs.jspdf().then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('Журнал операций',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    var y=40;
    pdf.setFontSize(9);
    pdf.text('Дата',14,y);
    pdf.text('Тип',40,y);
    pdf.text('Категория',65,y);
    pdf.text('Сумма',130,y);
    pdf.text('Контрагент',160,y);
    y+=6;
    journalData.forEach(function(e){
      if(y>270){pdf.addPage();y=20;}
      pdf.text(e.date,14,y);
      pdf.text(e.type==='income'?'Доход':'Расход',40,y);
      pdf.text(String(e.category).slice(0,20),65,y);
      pdf.text(formatMoney(e.amount),130,y);
      pdf.text(String(e.counterparty||'').slice(0,20),160,y);
      y+=6;
    });
    pdf.save('journal-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   36. СКАНЕР ЧЕКОВ
   ============================================================ */
var arStream=null;
var arAnimationId=null;
var currentScannerFile=null;

function startARScanner(){
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){
    showToast('Камера недоступна в этом браузере','error');
    return;
  }
  navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}}).then(function(stream){
    arStream=stream;
    var video=document.getElementById('arVideo');
    if(video){video.srcObject=stream;video.play();}
    var wrap=document.getElementById('arVideoWrap');
    if(wrap)wrap.style.display='block';
    var startBtn=document.getElementById('arStartBtn');
    if(startBtn)startBtn.style.display='none';
    var stopBtn=document.getElementById('arStopBtn');
    if(stopBtn)stopBtn.style.display='inline-flex';
    var captureBtn=document.getElementById('arCaptureBtn');
    if(captureBtn)captureBtn.style.display='inline-flex';
    LazyLibs.jsqr().then(function(){
      scanARFrame();
    }).catch(function(){showToast('jsQR не загружен','warn');});
  }).catch(function(err){
    showToast('Не удалось открыть камеру: '+err.message,'error');
  });
}

function stopARScanner(){
  if(arAnimationId){cancelAnimationFrame(arAnimationId);arAnimationId=null;}
  if(arStream){
    arStream.getTracks().forEach(function(t){t.stop();});
    arStream=null;
  }
  var wrap=document.getElementById('arVideoWrap');
  if(wrap)wrap.style.display='none';
  var startBtn=document.getElementById('arStartBtn');
  if(startBtn)startBtn.style.display='inline-flex';
  var stopBtn=document.getElementById('arStopBtn');
  if(stopBtn)stopBtn.style.display='none';
  var captureBtn=document.getElementById('arCaptureBtn');
  if(captureBtn)captureBtn.style.display='none';
}

function scanARFrame(){
  var video=document.getElementById('arVideo');
  if(!video||!window.jsQR)return;
  if(!video.videoWidth){
    arAnimationId=requestAnimationFrame(scanARFrame);
    return;
  }
  var canvas=document.createElement('canvas');
  canvas.width=video.videoWidth;
  canvas.height=video.videoHeight;
  var ctx=canvas.getContext('2d');
  ctx.drawImage(video,0,0,canvas.width,canvas.height);
  var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
  var code=window.jsQR(imgData.data,imgData.width,imgData.height);
  if(code&&code.data){
    parseFNSQR(code.data);
    stopARScanner();
    return;
  }
  arAnimationId=requestAnimationFrame(scanARFrame);
}

function captureARFrame(){
  var video=document.getElementById('arVideo');
  if(!video||!video.videoWidth)return;
  var canvas=document.createElement('canvas');
  canvas.width=video.videoWidth;
  canvas.height=video.videoHeight;
  canvas.getContext('2d').drawImage(video,0,0);
  canvas.toBlob(function(blob){
    if(!blob)return;
    var file=new File([blob],'ar-capture.png',{type:'image/png'});
    runOCR(file);
  });
}

function handleScannerFile(ev){
  var file=ev.target.files[0];
  if(!file)return;
  if(file.size>10*1024*1024){showToast('Файл больше 10 МБ','error');return;}
  currentScannerFile=file;
  if(file.type.indexOf('image')===0){
    readFileAsDataURL(file).then(function(dataUrl){
      var img=new Image();
      img.onload=function(){
        var canvas=document.createElement('canvas');
        canvas.width=img.width;canvas.height=img.height;
        var ctx=canvas.getContext('2d');
        ctx.drawImage(img,0,0);
        var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
        LazyLibs.jsqr().then(function(){
          var code=window.jsQR(imgData.data,imgData.width,imgData.height);
          if(code&&code.data){
            parseFNSQR(code.data);
          } else {
            runOCR(file);
          }
        }).catch(function(){runOCR(file);});
      };
      img.src=dataUrl;
    });
  } else {
    runOCR(file);
  }
}

function parseFNSQR(text){
  var params={};
  text.split('&').forEach(function(pair){
    var idx=pair.indexOf('=');
    if(idx>0)params[pair.slice(0,idx)]=pair.slice(idx+1);
  });
  var errors=[];
  if(params.fn && !/^\d{10,12}$/.test(params.fn)) errors.push('ФН: должен быть 10–12 цифр');
  if(params.fd && !/^\d{1,6}$/.test(params.fd)) errors.push('ФД: должен быть 1–6 цифр');
  if(params.fp && !/^\d{10}$/.test(params.fp)) errors.push('ФП: должен быть 10 цифр');
  if(params.s && isNaN(parseFloat(params.s))) errors.push('Сумма: не число');
  if(params.t && !/^\d{8}T?\d{0,6}$/.test(params.t)) errors.push('Дата: неверный формат');
  if(errors.length){
    var elErr=document.getElementById('scannerResult');
    if(elErr) elErr.innerHTML='<div class="info-box danger"><strong>'+t('qrErrors')+'</strong><br>'+errors.map(function(e){return '• '+e;}).join('<br>')+'</div>';
    showToast(t('qrInvalid'),'error');
    return;
  }
  var sum=parseFloat(params.s)||0;
  var dateRaw=params.t||'';
  var dateFormatted=todayISO();
  if(dateRaw){
    var m=dateRaw.match(/^(\d{4})(\d{2})(\d{2})/);
    if(m)dateFormatted=m[1]+'-'+m[2]+'-'+m[3];
  }
  var receipt={
    id:'qr-'+Date.now(),
    amount:sum,
    date:dateFormatted,
    inn:params.inn||'',
    fn:params.fn||'',
    fd:params.fd||'',
    fp:params.fp||'',
    raw:text,
    source:'QR'
  };
  var el=document.getElementById('scannerResult');
  if(el){
    el.innerHTML=
      '<div class="info-box">'+
      '<strong>QR ФНС распознан</strong><br>'+
      'Сумма: <strong>'+formatMoney(sum)+'</strong><br>'+
      'Дата: '+formatDateRu(dateFormatted)+'<br>'+
      'ИНН: '+(params.inn||'—')+'<br>'+
      (params.fn?'ФН: '+params.fn+'<br>':'')+
      (params.fd?'ФД: '+params.fd+'<br>':'')+
      (params.fp?'ФП: '+params.fp+'<br>':'')+
      '</div>';
  }
  showToast('QR ФНС распознан','success');
  saveReceipt(receipt);
}

function runOCR(file){
  showToast('Запуск OCR...','info');
  LazyLibs.tesseract().then(function(Tesseract){
    Tesseract.recognize(file,'rus+eng').then(function(result){
      var text=(result.data&&result.data.text)||'';
      parseReceiptText(text);
    }).catch(function(err){
      showToast('OCR ошибка: '+err.message,'error');
    });
  }).catch(function(){
    showToast(t('libError'),'error');
  });
}

function parseReceiptText(text){
  var amountMatch=text.match(/(?:итог|total|сумма)[^\d]*(\d+[.,]\d{2})/i);
  var dateMatch=text.match(/(\d{2})[.\/](\d{2})[.\/](\d{4})/);
  var innMatch=text.match(/инн[^\d]*(\d{10,12})/i);
  var amount=amountMatch?parseFloat(amountMatch[1].replace(',','.')):0;
  var date=dateMatch?(dateMatch[3]+'-'+dateMatch[2]+'-'+dateMatch[1]):todayISO();
  var inn=innMatch?innMatch[1]:'';
  var el=document.getElementById('scannerResult');
  if(el){
    el.innerHTML=
      '<div class="info-box">'+
      '<strong>OCR результат:</strong><br>'+
      'Сумма: '+formatMoney(amount)+'<br>'+
      'Дата: '+formatDateRu(date)+'<br>'+
      'ИНН: '+(inn||'—')+'<br>'+
      '<details class="mt-8"><summary class="small muted">Показать распознанный текст</summary><pre class="small" style="white-space:pre-wrap;max-height:200px;overflow:auto">'+esc(text.slice(0,2000))+'</pre></details>'+
      '</div>';
  }
  showToast('OCR завершён','success');
  if(amount>0){
    saveReceipt({id:'ocr-'+Date.now(),amount:amount,date:date,inn:inn,raw:text,source:'OCR'});
  }
}

function saveReceipt(receipt){
  receiptsData.unshift(receipt);
  if(receiptsData.length>100)receiptsData=receiptsData.slice(0,100);
  Storage.set('receiptsData',receiptsData);
  renderReceipts();
  Activation.markDone('receipt');
}

function renderReceipts(){
  var el=document.getElementById('receiptsList');
  if(!el)return;
  if(receiptsData.length===0){
    el.innerHTML='<div class="muted small center" style="padding:20px">История пуста</div>';
    return;
  }
  var html='';
  receiptsData.forEach(function(r,i){
    html+='<div class="journal-item">'+
      '<div class="ji-icon inc">🧾</div>'+
      '<div class="ji-body"><div class="t">'+formatMoney(r.amount)+'</div><div class="s">'+formatDateRu(r.date)+(r.inn?' · ИНН '+r.inn:'')+' · '+r.source+'</div></div>'+
      '<button class="btn btn-ghost btn-xs" onclick="saveReceiptToJournal('+i+')">В журнал</button>'+
      '<button class="ji-del" onclick="deleteReceipt('+i+')" aria-label="Удалить">✕</button>'+
    '</div>';
  });
  el.innerHTML=html;
}

function searchReceipts(query){
  var q=(query||'').toLowerCase();
  var el=document.getElementById('receiptsList');
  if(!el)return;
  var filtered=receiptsData.filter(function(r){
    return String(r.amount).indexOf(q)>=0||
      r.date.indexOf(q)>=0||
      (r.inn||'').indexOf(q)>=0||
      (r.raw||'').toLowerCase().indexOf(q)>=0;
  });
  if(filtered.length===0){
    el.innerHTML='<div class="muted small center" style="padding:20px">Ничего не найдено</div>';
    return;
  }
  var html='';
  filtered.forEach(function(r){
    var realIdx=receiptsData.indexOf(r);
    html+='<div class="journal-item">'+
      '<div class="ji-icon inc">🧾</div>'+
      '<div class="ji-body"><div class="t">'+formatMoney(r.amount)+'</div><div class="s">'+formatDateRu(r.date)+(r.inn?' · ИНН '+r.inn:'')+' · '+r.source+'</div></div>'+
      '<button class="btn btn-ghost btn-xs" onclick="saveReceiptToJournal('+realIdx+')">В журнал</button>'+
      '<button class="ji-del" onclick="deleteReceipt('+realIdx+')" aria-label="Удалить">✕</button>'+
    '</div>';
  });
  el.innerHTML=html;
}

function saveReceiptToJournal(idx){
  var r=receiptsData[idx];
  if(!r)return;
  journalData.unshift({type:'expense',date:r.date,amount:r.amount,category:'Прочее',counterparty:'',comment:'Чек '+r.source});
  Storage.set('journalData',journalData);
  renderJournal();
  showToast('Добавлено в журнал','success');
}

function deleteReceipt(idx){
  receiptsData.splice(idx,1);
  Storage.set('receiptsData',receiptsData);
  renderReceipts();
  showToast(t('deleted'),'warn');
}

function findDuplicateReceipts(){
  var seen={};
  var dups=[];
  receiptsData.forEach(function(r){
    var key=r.amount+'|'+r.date;
    if(seen[key])dups.push(r);else seen[key]=true;
  });
  showToast(dups.length?'Найдено дубликатов: '+dups.length:'Дубликатов нет',dups.length?'warn':'success');
}

function exportReceiptsCSV(){
  var rows=[['Дата','Сумма','ИНН','Источник']];
  receiptsData.forEach(function(r){rows.push([r.date,r.amount,r.inn||'',r.source]);});
  downloadCSV('receipts-'+todayISO()+'.csv',rows);
  showToast('CSV скачан','success');
}

function exportReceiptsXLSX(){
  LazyLibs.xlsx().then(function(XLSX){
    var rows=[['Дата','Сумма','ИНН','Источник']];
    receiptsData.forEach(function(r){rows.push([r.date,r.amount,r.inn||'',r.source]);});
    var ws=XLSX.utils.aoa_to_sheet(rows);
    var wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Чеки');
    XLSX.writeFile(wb,'receipts-'+todayISO()+'.xlsx');
    showToast('Excel скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   37. ЧЕК-ЛИСТ
   ============================================================ */
var checklistStepsData={
  ip:[
    'Выбрать коды ОКВЭД',
    'Подготовить паспорт',
    'Заполнить заявление Р21001',
    'Уплатить госпошлину 800 ₽',
    'Подать документы в ФНС',
    'Получить лист записи ЕГРИП',
    'Выбрать налоговый режим',
    'Открыть расчётный счёт',
    'Получить ЭЦП',
    'Зарегистрировать ККТ (если нужно)',
    'Сделать печать (опционально)',
    'Встать на учёт в фонды',
    'Оформить сотрудников (если есть)',
    'Настроить учёт',
    'Начать деятельность'
  ],
  ooo:[
    'Выбрать коды ОКВЭД',
    'Подготовить устав',
    'Провести собрание учредителей',
    'Сформировать уставный капитал',
    'Заполнить заявление Р11001',
    'Уплатить госпошлину 4000 ₽',
    'Подать документы в ФНС',
    'Получить лист записи ЕГРЮЛ',
    'Выбрать налоговый режим',
    'Назначить директора',
    'Открыть расчётный счёт',
    'Получить ЭЦП',
    'Зарегистрировать ККТ (если нужно)',
    'Сделать печать',
    'Встать на учёт в фонды',
    'Оформить сотрудников',
    'Настроить учёт',
    'Начать деятельность'
  ]
};

var documentsPackageData={
  ip:{
    base:['Паспорт','ИНН','Заявление Р21001','Квитанция госпошлины'],
    after:['Лист записи ЕГРИП','Свидетельство ИНН','Уведомление о переходе на УСН'],
    extra:['Договор аренды','ЭЦП','Печать','Расчётный счёт']
  },
  ooo:{
    base:['Устав','Решение/протокол','Заявление Р11001','Квитанция госпошлины','Документы на адрес'],
    after:['Лист записи ЕГРЮЛ','Свидетельство ИНН','Уведомление о переходе на УСН'],
    extra:['Договор аренды','ЭЦП','Печать','Расчётный счёт','Приказ о назначении директора']
  }
};

function switchChecklistType(type){
  checklistType=type;
  var ipBtn=document.getElementById('clBtnIp');
  var oooBtn=document.getElementById('clBtnOoo');
  if(ipBtn)ipBtn.className='btn btn-sm '+(type==='ip'?'btn-primary':'btn-ghost');
  if(oooBtn)oooBtn.className='btn btn-sm '+(type==='ooo'?'btn-primary':'btn-ghost');
  buildChecklist();
  renderDocsPackage();
}

function buildChecklist(){
  var steps=checklistStepsData[checklistType];
  if(!checklistState[checklistType])checklistState[checklistType]={};
  var state=checklistState[checklistType];
  var done=0;
  var html='';
  steps.forEach(function(s,i){
    var checked=!!state[i];
    if(checked)done++;
    html+='<div class="journal-item" style="cursor:pointer" onclick="toggleChecklistItem('+i+')">'+
      '<div class="ji-icon" style="background:'+(checked?'rgba(16,185,129,.15)':'var(--surface2)')+';color:'+(checked?'#10b981':'var(--muted)')+'">'+(checked?'✓':'')+'</div>'+
      '<div class="ji-body"><div class="t" style="'+(checked?'text-decoration:line-through;opacity:.6':'')+'">'+esc(s)+'</div></div>'+
    '</div>';
  });
  var pct=Math.round(done/steps.length*100);
  var progressEl=document.getElementById('checklistProgress');
  if(progressEl){
    progressEl.innerHTML='<div class="progress-header"><span class="name">Прогресс</span><span class="values">'+done+' / '+steps.length+'</span></div><div class="progress"><div class="progress-bar" style="width:'+pct+'%"></div></div>';
  }
  var itemsEl=document.getElementById('checklistItems');
  if(itemsEl)itemsEl.innerHTML=html;
}

function toggleChecklistItem(i){
  if(!checklistState[checklistType])checklistState[checklistType]={};
  checklistState[checklistType][i]=!checklistState[checklistType][i];
  Storage.set('checklistState',checklistState);
  buildChecklist();
}

function resetChecklist(){
  if(!confirm(t('confirmDelete')))return;
  checklistState[checklistType]={};
  Storage.set('checklistState',checklistState);
  buildChecklist();
  showToast('Чек-лист сброшен','warn');
}

function renderDocsPackage(){
  var el=document.getElementById('docsPackage');
  if(!el)return;
  var pkg=documentsPackageData[checklistType];
  var html='';
  [['base','Базовый'],['after','После регистрации'],['extra','Дополнительно']].forEach(function(pair){
    html+='<div class="side-group-label" style="padding:8px 0 4px">'+pair[1]+'</div><div class="chips">';
    pkg[pair[0]].forEach(function(doc){html+='<span class="chip">'+esc(doc)+'</span>';});
    html+='</div>';
  });
  el.innerHTML=html;
}

function printChecklist(){
  var steps=checklistStepsData[checklistType];
  var state=checklistState[checklistType]||{};
  var html='<html><head><meta charset="utf-8"><title>Чек-лист</title></head><body style="font-family:sans-serif;padding:20px"><h1>Чек-лист '+(checklistType==='ip'?'ИП':'ООО')+'</h1><ol>';
  steps.forEach(function(s,i){
    html+='<li>'+(state[i]?'✓ ':'☐ ')+esc(s)+'</li>';
  });
  html+='</ol></body></html>';
  renderHtmlToPdf(html,'checklist.html');
}

/* ============================================================
   38. ТЕПЛОКАРТА
   ============================================================ */
var calendarEvents2026=[
  {date:'2026-01-25',title:'Аванс УСН за 2025'},
  {date:'2026-01-28',title:'РСВ за 2025'},
  {date:'2026-03-31',title:'Декларация УСН за 2025'},
  {date:'2026-04-28',title:'Аванс УСН за 1 кв.'},
  {date:'2026-04-30',title:'6-НДФЛ за 2025'},
  {date:'2026-07-28',title:'Аванс УСН за полугодие'},
  {date:'2026-10-28',title:'Аванс УСН за 9 мес.'},
  {date:'2026-12-28',title:'Фикс. взносы ИП'},
  {date:'2026-12-31',title:'Уведомление о переходе на УСН'}
];

function buildHeatmap(){
  var el=document.getElementById('heatmap');
  if(!el)return;
  var first=new Date(heatmapYear,heatmapMonth,1);
  var daysInMonth=new Date(heatmapYear,heatmapMonth+1,0).getDate();
  var startDay=(first.getDay()+6)%7;
  var title=document.getElementById('hmTitle');
  if(title)title.textContent=formatMonthRu(heatmapMonth)+' '+heatmapYear;
  var weekdays=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  var html='';
  weekdays.forEach(function(w){html+='<div class="hm-weekday">'+w+'</div>';});
  for(var i=0;i<startDay;i++)html+='<div class="hm-cell empty"></div>';
  var today=todayISO();
  for(var d=1;d<=daysInMonth;d++){
    var iso=heatmapYear+'-'+String(heatmapMonth+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    var hasEv=calendarEvents2026.some(function(e){return e.date===iso;});
    var hasNote=!!calendarNotes[iso];
    var cls=hasEv&&hasNote?'both':(hasEv?'ev':(hasNote?'note':''));
    if(iso===today)cls+=' today';
    html+='<div class="hm-cell '+cls+'" onclick="showHeatmapEvents(\''+iso+'\')">'+d+'</div>';
  }
  el.innerHTML=html;
  renderHeatmapLoad();
}

function renderHeatmapLoad(){
  var el=document.getElementById('hmLoad');
  if(!el)return;
  var counts=Array(12).fill(0);
  calendarEvents2026.forEach(function(e){
    var m=parseInt(e.date.slice(5,7))-1;
    if(m>=0&&m<12)counts[m]++;
  });
  var html='';
  counts.forEach(function(c,i){
    if(c>0)html+='<div class="flex justify-between small" style="padding:4px 0"><span>'+formatMonthRu(i)+'</span><span class="tag amber">'+c+'</span></div>';
  });
  el.innerHTML=html||'<div class="muted small">Нет событий</div>';
}

function changeHeatmapMonth(delta){
  heatmapMonth+=delta;
  if(heatmapMonth<0){heatmapMonth=11;heatmapYear--;}
  if(heatmapMonth>11){heatmapMonth=0;heatmapYear++;}
  buildHeatmap();
}

function showHeatmapEvents(iso){
  var el=document.getElementById('hmEvents');
  if(!el)return;
  var evs=calendarEvents2026.filter(function(e){return e.date===iso;});
  var note=calendarNotes[iso]||'';
  var html='<div class="info-box"><strong>'+formatDateRuLong(iso)+'</strong><br>';
  if(evs.length)evs.forEach(function(e){html+='📌 '+esc(e.title)+'<br>';});
  else html+='Событий нет.<br>';
  html+='</div>';
  html+='<div class="field mt-12"><label for="hmNote">Личная заметка</label><input id="hmNote" type="text" value="'+esc(note)+'" placeholder="Заметка..."></div>';
  html+='<div class="btn-group mt-8"><button class="btn btn-primary btn-sm" onclick="saveNote(\''+iso+'\')">Сохранить заметку</button>'+(note?'<button class="btn btn-ghost btn-sm" onclick="deleteNote(\''+iso+'\')">Удалить заметку</button>':'')+'</div>';
  el.innerHTML=html;
}

function saveNote(iso){
  var input=document.getElementById('hmNote');
  var v=input?input.value:'';
  if(v)calendarNotes[iso]=v;else delete calendarNotes[iso];
  Storage.set('calendarNotes',calendarNotes);
  buildHeatmap();
  showToast('Заметка сохранена','success');
}

function deleteNote(iso){
  delete calendarNotes[iso];
  Storage.set('calendarNotes',calendarNotes);
  buildHeatmap();
  showToast('Заметка удалена','warn');
}

function exportCalendarICS(){
  var lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//TaxCalc//RU'];
  calendarEvents2026.forEach(function(e){
    var d=e.date.replace(/-/g,'');
    lines.push('BEGIN:VEVENT');
    lines.push('UID:'+d+'@taxcalc');
    lines.push('DTSTART;VALUE=DATE:'+d);
    lines.push('SUMMARY:'+e.title);
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  downloadFile('calendar-2026.ics',lines.join('\r\n'),'text/calendar');
  showToast('ICS скачан','success');
}

function exportCalendarICSFull(){
  var lines=[
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TaxCalc//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];
  calendarEvents2026.forEach(function(e){
    var d=e.date.replace(/-/g,'');
    lines.push('BEGIN:VEVENT');
    lines.push('UID:'+d+'-'+Math.random().toString(36).slice(2,8)+'@taxcalc');
    lines.push('DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z');
    lines.push('DTSTART;VALUE=DATE:'+d);
    lines.push('SUMMARY:'+e.title);
    lines.push('DESCRIPTION:Налоговое событие '+e.date);
    lines.push('BEGIN:VALARM');
    lines.push('TRIGGER:-P1D');
    lines.push('ACTION:DISPLAY');
    lines.push('DESCRIPTION:Напоминание: '+e.title);
    lines.push('END:VALARM');
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  downloadFile('calendar-2026-full.ics',lines.join('\r\n'),'text/calendar');
  showToast('ICS с напоминаниями скачан','success');
}

function printHeatmap(){
  var html='<html><head><meta charset="utf-8"><title>Теплокарта 2026</title></head><body style="font-family:sans-serif;padding:20px"><h1>Налоговые события 2026</h1>';
  calendarEvents2026.forEach(function(e){
    html+='<p><strong>'+formatDateRu(e.date)+'</strong> — '+esc(e.title)+'</p>';
  });
  html+='</body></html>';
  renderHtmlToPdf(html,'heatmap.html');
}

/* ============================================================
   39. СИМУЛЯТОР
   ============================================================ */
function runSimulator(){
  var incEl=document.getElementById('simInc');
  var expEl=document.getElementById('simExp');
  var empEl=document.getElementById('simEmp');
  var salaryEl=document.getElementById('simSalary');
  var modeEl=document.getElementById('simMode');
  if(!incEl||!expEl)return;
  var inc=num(incEl.value);
  var exp=num(expEl.value);
  var emp=int((empEl||{}).value);
  var salary=num((salaryEl||{}).value);
  var mode=(modeEl||{}).value||'npd';

  var incLabel=document.getElementById('simIncLabel');
  var expLabel=document.getElementById('simExpLabel');
  var empLabel=document.getElementById('simEmpLabel');
  var salaryLabel=document.getElementById('simSalaryLabel');
  if(incLabel)incLabel.textContent=formatMoney(inc);
  if(expLabel)expLabel.textContent=formatMoney(exp);
  if(empLabel)empLabel.textContent=emp;
  if(salaryLabel)salaryLabel.textContent=formatMoney(salary);

  var salaryFund=emp*salary*12;
  var empContrib=salaryFund*0.30;
  var tax=0;
  if(mode==='npd')tax=inc*0.04;
  else if(mode==='usn6')tax=inc*0.06;
  else if(mode==='usn15')tax=Math.max((inc-exp-salaryFund-empContrib)*0.15,inc*0.01);
  else if(mode==='psn')tax=600000*0.06;
  var totalExp=exp+salaryFund+empContrib;
  var profit=inc-totalExp-tax;
  var effRate=inc>0?(tax/inc*100):0;

  var warningsEl=document.getElementById('simWarnings');
  if(warningsEl){
    var warns=[];
    if(inc>VAT_THRESHOLD)warns.push('Превышен порог НДС (20 млн)');
    if(inc>USN_LIMIT)warns.push('Превышен лимит УСН (490,5 млн)');
    if(mode==='npd'&&inc>NPD_LIMIT)warns.push('Превышен лимит НПД (2,4 млн)');
    if(mode==='npd'&&emp>0)warns.push(t('simNpdNoEmployees'));
    if((mode==='usn6'||mode==='usn15')&&emp>130)warns.push(t('simLimitEmployees'));
    if(mode==='psn'&&emp>15)warns.push(t('simLimitPsn'));
    warningsEl.innerHTML=warns.map(function(w){return '<div class="info-box warn">⚠ '+w+'</div>';}).join('');
  }

  var el=document.getElementById('simResult');
  if(el){
    el.innerHTML=
      '<div class="result-card"><div class="lbl">Налог</div><div class="val">'+formatMoney(tax)+'</div></div>'+
      '<div class="result-card"><div class="lbl">Взносы за сотрудников</div><div class="val">'+formatMoney(empContrib)+'</div></div>'+
      '<div class="result-card"><div class="lbl">Чистая прибыль</div><div class="val">'+formatMoney(profit)+'</div></div>'+
      '<div class="result-card"><div class="lbl">Эфф. ставка</div><div class="val">'+formatPercent(effRate,1)+'</div></div>';
  }
  renderSimChart(tax,empContrib,Math.max(0,profit));
}

function renderSimChart(tax,contrib,profit){
  LazyLibs.chart().then(function(Chart){
    var canvas=document.getElementById('simChart');
    if(!canvas)return;
    if(chartInstances.sim){chartInstances.sim.destroy();}
    chartInstances.sim=new Chart(canvas,{
      type:'doughnut',
      data:{labels:['Налог','Взносы','Прибыль'],datasets:[{data:[tax,contrib,profit],backgroundColor:['#ef4444','#f59e0b','#10b981']}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}
    });
  }).catch(function(){showToast(t('libError'),'error');});
}

function applySimulatorToCalc(){
  var simModeEl=document.getElementById('simMode');
  var simIncEl=document.getElementById('simInc');
  var simExpEl=document.getElementById('simExp');
  var calcModeEl=document.getElementById('calcMode');
  var calcIncEl=document.getElementById('calcIncome');
  var calcExpEl=document.getElementById('calcExpenses');
  if(calcModeEl&&simModeEl)calcModeEl.value=simModeEl.value;
  if(calcIncEl&&simIncEl)calcIncEl.value=simIncEl.value;
  if(calcExpEl&&simExpEl)calcExpEl.value=simExpEl.value;
  onModeChange();
  switchTab('calc');
  showToast('Применено к калькулятору','success');
}
