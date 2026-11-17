/* ============================================================
   19. КАЛЬКУЛЯТОР НАЛОГА
   ============================================================ */
function onModeChange(){
  var modeEl=document.getElementById('calcMode');
  if(!modeEl)return;
  var mode=modeEl.value;
  var npdRow=document.getElementById('npdRow');
  var empRow=document.getElementById('empRow');
  var expRow=document.getElementById('expRow');
  var psnRow=document.getElementById('psnRow');
  if(npdRow)npdRow.classList.toggle('hidden',mode!=='npd');
  if(empRow)empRow.classList.toggle('hidden',mode!=='usn6'&&mode!=='ooo6');
  if(expRow)expRow.classList.toggle('hidden',mode!=='usn15'&&mode!=='ooo15'&&mode!=='esxn');
  if(psnRow)psnRow.classList.toggle('hidden',mode!=='psn');
  calcTax();
}

function calcInsurance(income){
  var fixed=IP_CONTRIBUTIONS_2026.FIXED;
  var extra=0;
  if(income>IP_CONTRIBUTIONS_2026.EXTRA_THRESHOLD){
    extra=Math.min((income-IP_CONTRIBUTIONS_2026.EXTRA_THRESHOLD)*IP_CONTRIBUTIONS_2026.EXTRA_RATE,IP_CONTRIBUTIONS_2026.EXTRA_MAX);
  }
  return {fixed:fixed,extra:extra,total:fixed+extra};
}

function calcTax(){
  var modeEl=document.getElementById('calcMode');
  if(!modeEl)return;
  var mode=modeEl.value;
  var income=num(document.getElementById('calcIncome').value);
  var expenses=num((document.getElementById('calcExpenses')||{}).value);
  var npdType=(document.getElementById('calcNpdType')||{}).value||'legal';
  var employees=(document.getElementById('calcEmployees')||{}).value||'no';
  var psnIncome=num((document.getElementById('calcPsnIncome')||{}).value);

  var tax=0,net=0,rate=0,detail='',insurance=null,deduction=0;

  if(mode==='npd'){
    rate=(npdType==='legal')?0.04:0.06;
    tax=income*rate;
    net=income-tax;
    detail='НПД: '+formatMoney(income)+' × '+formatPercent(rate*100,0)+' = '+formatMoney(tax)+'. Лимит 2,4 млн ₽'+(income>NPD_LIMIT?' — <strong style="color:#ef4444">превышен!</strong>':' — соблюдён.');
  } else if(mode==='usn6'||mode==='ooo6'){
    rate=0.06;
    var grossTax=income*rate;
    if(mode==='usn6'){
      insurance=calcInsurance(income);
      deduction=employees==='no'?insurance.total:Math.min(insurance.total,grossTax*0.5);
      tax=Math.max(0,grossTax-deduction);
      net=income-tax-insurance.total;
      detail='УСН 6%: налог '+formatMoney(grossTax)+' − вычет взносов '+formatMoney(deduction)+' = '+formatMoney(tax)+'. Взносы ИП: '+formatMoney(insurance.total)+' (фикс. '+formatMoney(insurance.fixed)+' + 1% '+formatMoney(insurance.extra)+').';
    } else {
      tax=grossTax;
      net=income-tax;
      detail='ООО УСН 6%: '+formatMoney(income)+' × 6% = '+formatMoney(tax)+'.';
    }
  } else if(mode==='usn15'||mode==='ooo15'){
    rate=0.15;
    var base=Math.max(0,income-expenses);
    var calcTax15=base*0.15;
    var minTax=income*0.01;
    tax=Math.max(calcTax15,minTax);
    if(mode==='usn15'){
      insurance=calcInsurance(income);
      net=income-expenses-tax-insurance.total;
      detail='УСН 15%: база '+formatMoney(base)+' × 15% = '+formatMoney(calcTax15)+'. Минимальный налог 1% = '+formatMoney(minTax)+'. Итог: '+formatMoney(tax)+'. Взносы ИП: '+formatMoney(insurance.total)+'.';
    } else {
      net=income-expenses-tax;
      detail='ООО УСН 15%: база '+formatMoney(base)+' × 15% = '+formatMoney(calcTax15)+' (мин. 1% = '+formatMoney(minTax)+'). Итог: '+formatMoney(tax)+'.';
    }
  } else if(mode==='psn'){
    rate=0.06;
    tax=psnIncome*rate;
    insurance=calcInsurance(income);
    net=income-tax-insurance.total;
    detail='ПСН: потенциальный доход '+formatMoney(psnIncome)+' × 6% = '+formatMoney(tax)+'. Взносы ИП: '+formatMoney(insurance.total)+'.';
  } else if(mode==='esxn'){
    rate=0.06;
    var base2=Math.max(0,income-expenses);
    tax=base2*0.06;
    insurance=calcInsurance(income);
    net=income-expenses-tax-insurance.total;
    detail='ЕСХН: ('+formatMoney(income)+' − '+formatMoney(expenses)+') × 6% = '+formatMoney(tax)+'. Взносы ИП: '+formatMoney(insurance.total)+'.';
  }

  var effRate=income>0?(tax/income*100):0;
  var resultEl=document.getElementById('calcResult');
  if(resultEl){
    resultEl.innerHTML=
      '<div class="result-grid">'+
        '<div class="result-card highlight"><div class="lbl">'+t('tax')+'</div><div class="val">'+formatMoney(tax)+'</div></div>'+
        '<div class="result-card"><div class="lbl">'+t('netIncome')+'</div><div class="val">'+formatMoney(net)+'</div></div>'+
        '<div class="result-card"><div class="lbl">'+t('effRate')+'</div><div class="val">'+formatPercent(effRate)+'</div></div>'+
      '</div>'+
      '<div class="info-box">'+detail+'</div>';
  }

  var insEl=document.getElementById('insuranceResult');
  if(insEl){
    if(insurance){
      insEl.innerHTML=
        '<div class="result-grid">'+
          '<div class="result-card"><div class="lbl">Фиксированная часть</div><div class="val">'+formatMoney(insurance.fixed)+'</div></div>'+
          '<div class="result-card"><div class="lbl">1% с превышения</div><div class="val">'+formatMoney(insurance.extra)+'</div></div>'+
          '<div class="result-card highlight"><div class="lbl">Всего взносов</div><div class="val">'+formatMoney(insurance.total)+'</div></div>'+
        '</div>'+
        '<div class="info-box">Фиксированные взносы 2026: <strong>57 390 ₽</strong>. 1% с дохода свыше 300 000 ₽, но не более <strong>321 818 ₽</strong>.</div>';
    } else {
      insEl.innerHTML='<div class="info-box">Взносы ИП применяются для режимов УСН, ПСН, ЕСХН. Для НПД и ООО взносы ИП за себя не рассчитываются.</div>';
    }
  }

  // Инкогнито убран — сохраняем всегда, кроме песочницы (в песочнице Storage сам пишет в память)
  taxHistory.unshift({mode:mode,income:income,expenses:expenses,tax:tax,net:net,date:todayISO()});
  if(taxHistory.length>20)taxHistory=taxHistory.slice(0,20);
  Storage.set('taxHistory',taxHistory);
  renderTaxHistory();
  Activation.markDone('calc');
}

function resetCalcForm(){
  var el;
  el=document.getElementById('calcIncome');if(el)el.value=1200000;
  el=document.getElementById('calcExpenses');if(el)el.value=600000;
  el=document.getElementById('calcPsnIncome');if(el)el.value=600000;
  el=document.getElementById('calcMode');if(el)el.value='npd';
  onModeChange();
  showToast('Форма сброшена','info');
}

function modeLabel(mode){
  var map={npd:'НПД',usn6:'УСН 6%',usn15:'УСН 15%',psn:'ПСН',ooo6:'ООО УСН 6%',ooo15:'ООО УСН 15%',esxn:'ЕСХН'};
  return map[mode]||mode;
}

function renderTaxHistory(){
  var el=document.getElementById('taxHistoryList');
  if(!el)return;
  if(taxHistory.length===0){
    el.innerHTML='<div class="muted small center" style="padding:20px">История пуста</div>';
    return;
  }
  var html='<div class="table-wrapper"><table class="table"><tr><th>Дата</th><th>Режим</th><th class="num">Доход</th><th class="num">Налог</th><th class="num">Чистый</th></tr>';
  taxHistory.forEach(function(h){
    html+='<tr><td>'+formatDateRu(h.date)+'</td><td>'+modeLabel(h.mode)+'</td><td class="num">'+formatMoney(h.income)+'</td><td class="num">'+formatMoney(h.tax)+'</td><td class="num">'+formatMoney(h.net)+'</td></tr>';
  });
  html+='</table></div>';
  el.innerHTML=html;
}

function openTaxHistory(){
  renderTaxHistory();
  var modal=document.getElementById('taxHistoryModal');
  var body=document.getElementById('taxHistoryModalBody');
  if(body)body.innerHTML=document.getElementById('taxHistoryList').innerHTML;
  if(modal)modal.classList.add('open');
}
function closeTaxHistory(){
  var modal=document.getElementById('taxHistoryModal');
  if(modal)modal.classList.remove('open');
}
function exportTaxHistoryJSON(){
  downloadJSON('tax-history-'+todayISO()+'.json',taxHistory);
  showToast('История экспортирована','success');
}
function clearTaxHistory(){
  if(!confirm(t('confirmDelete')))return;
  taxHistory=[];
  Storage.set('taxHistory',taxHistory);
  renderTaxHistory();
  showToast('История очищена','warn');
}

/* ============================================================
   20. БЫСТРЫЕ ШАБЛОНЫ
   ============================================================ */
function buildQuickTemplates(){
  var el=document.getElementById('quickTemplates');
  if(!el)return;
  var html='';
  quickTemplatesData.forEach(function(tpl){
    html+='<button class="chip" onclick="applyTemplate(\''+tpl.id+'\')">'+esc(tpl.name)+'</button>';
  });
  el.innerHTML=html;
}

function applyTemplate(id){
  var tpl=quickTemplatesData.find(function(t){return t.id===id;});
  if(!tpl)return;
  var el;
  el=document.getElementById('calcMode');if(el)el.value=tpl.mode;
  el=document.getElementById('calcIncome');if(el)el.value=tpl.income;
  el=document.getElementById('calcExpenses');if(el&&tpl.expenses!=null)el.value=tpl.expenses;
  el=document.getElementById('calcNpdType');if(el&&tpl.npdType)el.value=tpl.npdType;
  el=document.getElementById('calcEmployees');if(el&&tpl.employees)el.value=tpl.employees;
  el=document.getElementById('calcPsnIncome');if(el&&tpl.psnIncome)el.value=tpl.psnIncome;
  onModeChange();
  showToast('Шаблон «'+tpl.name+'» применён','success');
}

/* ============================================================
   21. ЛИМИТЫ И ПРОГНОЗ
   ============================================================ */
function renderLimitIndicators(){
  var el=document.getElementById('limIndicators');
  if(!el)return;
  var income=num(document.getElementById('limIncome').value);
  var limits=[
    {name:'НПД',limit:NPD_LIMIT},
    {name:'НДС',limit:VAT_THRESHOLD},
    {name:'ПСН',limit:PSN_LIMIT},
    {name:'УСН',limit:USN_LIMIT}
  ];
  var html='';
  limits.forEach(function(l){
    var pct=Math.min(100,(income/l.limit)*100);
    var cls=pct>=100?'danger':(pct>=80?'warn':'');
    html+='<div style="margin-bottom:14px">'+
      '<div class="progress-header"><span class="name">'+l.name+'</span><span class="values">'+formatMoney(income)+' / '+formatMoney(l.limit)+'</span></div>'+
      '<div class="progress"><div class="progress-bar '+cls+'" style="width:'+pct+'%"></div></div>'+
      '<div class="small muted">'+formatPercent(pct,1)+(pct>=100?' — <strong style="color:#ef4444">превышен</strong>':'')+'</div>'+
    '</div>';
  });
  el.innerHTML=html;
}

function updForecast(){
  var avg=num(document.getElementById('limAvg').value);
  var annual=avg*12;
  var thresholds=[{name:'НПД',limit:NPD_LIMIT},{name:'НДС',limit:VAT_THRESHOLD},{name:'ПСН',limit:PSN_LIMIT},{name:'УСН',limit:USN_LIMIT}];
  var messages=[];
  thresholds.forEach(function(th){
    if(annual>th.limit&&avg>0){
      var m=Math.ceil(th.limit/avg);
      messages.push(th.name+': превышение на '+m+'-м месяце');
    }
  });
  var el=document.getElementById('limForecast');
  if(el){
    el.innerHTML=
      'Годовой прогноз: <strong>'+formatMoney(annual)+'</strong>.<br>'+
      (messages.length?'<span style="color:#f59e0b">⚠ '+messages.join('; ')+'</span>':'<span style="color:#10b981">✓ Все лимиты соблюдены.</span>');
  }
  renderLimitsChart(avg);
}

function toggleLimitLine(){
  var avg=num((document.getElementById('limAvg')||{}).value);
  renderLimitsChart(avg);
}

function renderLimitsChart(avg){
  LazyLibs.chart().then(function(Chart){
    var canvas=document.getElementById('limitsChart');
    if(!canvas)return;
    if(chartInstances.limits){chartInstances.limits.destroy();}
    var labels=[],data=[];
    var months=['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
    for(var i=0;i<12;i++){labels.push(months[i]);data.push(avg*(i+1));}
    var datasets=[
      {label:'Накопленный доход',data:data,borderColor:'#059669',backgroundColor:'rgba(5,150,105,.1)',fill:true,tension:.3}
    ];
    var npdEl=document.querySelector('input[data-limit="npd"]');
    var vatEl=document.querySelector('input[data-limit="vat"]');
    var psnEl=document.querySelector('input[data-limit="psn"]');
    var usnEl=document.querySelector('input[data-limit="usn"]');
    if(!npdEl || npdEl.checked){
      datasets.push({label:'НПД (2,4 млн)',data:Array(12).fill(NPD_LIMIT),borderColor:'#f59e0b',borderDash:[5,5],pointRadius:0,fill:false});
    }
    if(!vatEl || vatEl.checked){
      datasets.push({label:'НДС (20 млн)',data:Array(12).fill(VAT_THRESHOLD),borderColor:'#ef4444',borderDash:[5,5],pointRadius:0,fill:false});
    }
    if(psnEl && psnEl.checked){
      datasets.push({label:'ПСН (60 млн)',data:Array(12).fill(PSN_LIMIT),borderColor:'#3b82f6',borderDash:[5,5],pointRadius:0,fill:false});
    }
    if(usnEl && usnEl.checked){
      datasets.push({label:'УСН (490,5 млн)',data:Array(12).fill(USN_LIMIT),borderColor:'#8b5cf6',borderDash:[5,5],pointRadius:0,fill:false});
    }
    chartInstances.limits=new Chart(canvas,{
      type:'line',
      data:{labels:labels,datasets:datasets},
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:function(ctx){return ctx.dataset.label+': '+formatMoney(ctx.parsed.y);}}}},
        scales:{y:{beginAtZero:true,ticks:{callback:function(v){return formatMillions(v);}}}}
      }
    });
  }).catch(function(){showToast(t('libError'),'error');});
}

function exportLimitsPNG(){
  var canvas=document.getElementById('limitsChart');
  if(!canvas){showToast('График не построен','error');return;}
  var url=canvas.toDataURL('image/png');
  var a=document.createElement('a');
  a.href=url;a.download='limits-'+todayISO()+'.png';a.click();
  showToast('PNG скачан','success');
}

function exportLimitsPDF(){
  LazyLibs.jspdf().then(function(){
    LazyLibs.chart().then(function(){
      var canvas=document.getElementById('limitsChart');
      var img=canvas?canvas.toDataURL('image/png'):null;
      var pdf=new window.jspdf.jsPDF('p','mm','a4');
      pdf.setFontSize(16);
      pdf.text('Лимиты и прогноз',14,20);
      pdf.setFontSize(10);
      pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
      if(img)pdf.addImage(img,'PNG',14,35,180,90);
      var y=135;
      pdf.setFontSize(11);
      pdf.text('Накопленный доход: '+formatMoney(num(document.getElementById('limIncome').value)),14,y);
      pdf.text('Среднемесячный доход: '+formatMoney(num(document.getElementById('limAvg').value)),14,y+7);
      pdf.save('limits-'+todayISO()+'.pdf');
      showToast('PDF скачан','success');
    });
  }).catch(function(){showToast(t('libError'),'error');});
}

function exportLimitsXLSX(){
  LazyLibs.xlsx().then(function(XLSX){
    var avg=num(document.getElementById('limAvg').value);
    var rows=[['Месяц','Накопленный доход','НПД лимит','НДС лимит','ПСН лимит','УСН лимит']];
    var months=['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
    for(var i=0;i<12;i++){
      rows.push([months[i],avg*(i+1),NPD_LIMIT,VAT_THRESHOLD,PSN_LIMIT,USN_LIMIT]);
    }
    var ws=XLSX.utils.aoa_to_sheet(rows);
    var wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Лимиты');
    XLSX.writeFile(wb,'limits-'+todayISO()+'.xlsx');
    showToast('Excel скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   22. АНАЛИЗ РИСКОВ
   ============================================================ */
var riskQuestionsData=[
  {q:'Есть ли у вас сотрудники, оформленные как самозанятые?',risk:3,block:'Организация'},
  {q:'Дробление бизнеса на несколько юрлиц?',risk:3,block:'Организация'},
  {q:'Транзитные операции по счёту?',risk:3,block:'115-ФЗ'},
  {q:'Превышение лимита УСН?',risk:2,block:'Налоги'},
  {q:'Работа без ККТ при наличии обязанности?',risk:3,block:'ККТ'},
  {q:'Нет раздельного учёта при совмещении режимов?',risk:2,block:'Налоги'},
  {q:'Контрагенты с признаками фирм-однодневок?',risk:3,block:'Налоги'},
  {q:'Отсутствие документов по расходам на УСН 15%?',risk:2,block:'Налоги'},
  {q:'Занижение доходов в отчётности?',risk:3,block:'Налоги'},
  {q:'Нарушение сроков уплаты налогов?',risk:1,block:'Налоги'},
  {q:'Использование схем оптимизации без экономической цели?',risk:3,block:'Налоги'},
  {q:'Нет кассовой дисциплины?',risk:1,block:'ККТ'},
  {q:'Выплаты «в конвертах»?',risk:3,block:'Налоги'},
  {q:'Нет актов сверки с контрагентами?',risk:1,block:'Налоги'},
  {q:'Превышение лимита на ПСН (60 млн)?',risk:2,block:'Налоги'},
  {q:'Отсутствие маркировки товаров?',risk:3,block:'Маркировка'},
  {q:'Нет уведомления о переходе на УСН?',risk:2,block:'Налоги'},
  {q:'Работа с наличными без ККТ?',risk:3,block:'ККТ'},
  {q:'Нет документов на сотрудников?',risk:2,block:'Организация'},
  {q:'Превышение порога НДС без регистрации?',risk:3,block:'НДС'},
  {q:'Нет счетов-фактур при работе с НДС?',risk:3,block:'НДС'},
  {q:'Использование серых схем обналичивания?',risk:3,block:'115-ФЗ'},
  {q:'Нет раздельного учёта НДС?',risk:3,block:'НДС'},
  {q:'Работа без договоров с контрагентами?',risk:2,block:'Организация'},
  {q:'Нарушение валютного законодательства?',risk:3,block:'115-ФЗ'},
  {q:'Нет первичных документов?',risk:2,block:'Налоги'},
  {q:'Фиктивные сделки?',risk:3,block:'Налоги'},
  {q:'Нет инвентаризации?',risk:1,block:'Налоги'},
  {q:'Работа с нерезидентами без документов?',risk:2,block:'115-ФЗ'},
  {q:'Нет учёта доходов на НПД?',risk:2,block:'Налоги'},
  {q:'Превышение лимита НПД (2,4 млн)?',risk:2,block:'Налоги'},
  {q:'Нет чеков на НПД?',risk:1,block:'ККТ'}
];

function renderRiskQuestions(){
  var el=document.getElementById('riskQuestions');
  if(!el)return;
  var html='';
  var lastBlock='';
  riskQuestionsData.forEach(function(item,i){
    if(item.block!==lastBlock){
      html+='<div class="side-group-label" style="padding:12px 0 6px">'+esc(item.block)+'</div>';
      lastBlock=item.block;
    }
    var val=riskAnswers[i];
    html+='<div class="journal-item" style="flex-wrap:wrap">'+
      '<div class="ji-body"><div class="t" style="white-space:normal">'+esc(item.q)+'</div></div>'+
      '<div class="btn-group" style="flex-shrink:0">'+
        '<button class="btn btn-sm '+(val===true?'btn-danger':'btn-ghost')+'" onclick="answerRisk('+i+',true)">Да</button>'+
        '<button class="btn btn-sm '+(val===false?'btn-success':'btn-ghost')+'" onclick="answerRisk('+i+',false)">Нет</button>'+
      '</div>'+
    '</div>';
  });
  el.innerHTML=html;
}

function answerRisk(i,val){
  riskAnswers[i]=val;
  Storage.set('riskAnswers',riskAnswers);
  renderRiskQuestions();
}

function resetRisk(){
  riskAnswers={};
  Storage.set('riskAnswers',riskAnswers);
  renderRiskQuestions();
  var el=document.getElementById('riskResult');
  if(el)el.innerHTML='';
  showToast('Анкета сброшена','info');
}

function calcRisk(){
  var score=0;
  riskQuestionsData.forEach(function(item,i){if(riskAnswers[i]===true)score+=item.risk;});
  var level=score>=15?'Высокий':(score>=7?'Средний':'Низкий');
  var cls=score>=15?'danger':(score>=7?'warn':'');
  var rec=score>=15?'Рекомендуется консультация налогового юриста и аудит документов.':(score>=7?'Проверьте документы, раздельный учёт и сроки уплаты.':'Соблюдайте текущий порядок — риск минимален.');
  var el=document.getElementById('riskResult');
  if(el){
    el.innerHTML=
      '<div class="result-grid">'+
        '<div class="result-card '+cls+'"><div class="lbl">Баллы</div><div class="val">'+score+'</div></div>'+
        '<div class="result-card '+cls+'"><div class="lbl">Уровень риска</div><div class="val">'+level+'</div></div>'+
      '</div>'+
      '<div class="info-box '+(score>=15?'danger':(score>=7?'warn':''))+'">'+rec+'</div>';
  }
}

function saveRiskPDF(){
  LazyLibs.jspdf().then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('Анализ налоговых рисков',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    var y=38;
    pdf.setFontSize(9);
    riskQuestionsData.forEach(function(item,i){
      if(y>270){pdf.addPage();y=20;}
      var ans=riskAnswers[i]===true?'Да':(riskAnswers[i]===false?'Нет':'—');
      var q=item.q.length>80?item.q.slice(0,80)+'...':item.q;
      pdf.text((i+1)+'. '+q,14,y);
      pdf.text('Ответ: '+ans,180,y);
      y+=6;
    });
    pdf.save('risk-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   23. ЛЬГОТЫ И КАНИКУЛЫ
   ============================================================ */
function initRegions(){
  var sel=document.getElementById('benRegion');
  if(!sel)return;
  sel.innerHTML='';
  regionsData.forEach(function(r,i){
    sel.innerHTML+='<option value="'+i+'">'+esc(r.region)+' (код '+r.code+')</option>';
  });
  sel.value='76';
  renderRegionBenefit();
}

function renderRegionBenefit(){
  var sel=document.getElementById('benRegion');
  if(!sel)return;
  var i=parseInt(sel.value)||0;
  var r=regionsData[i];
  if(!r)return;
  var el=document.getElementById('benInfo');
  if(!el)return;
  var activitiesHtml=r.activities&&r.activities.length?'<br>Льготные виды: '+r.activities.map(function(a){return '<span class="tag green">'+esc(a)+'</span>';}).join(' '):'';
  el.innerHTML=
    '<div class="info-box">'+
    '<strong>'+esc(r.region)+'</strong> (код '+r.code+')<br>'+
    'Закон: '+esc(r.law)+'<br>'+
    t('usnRate')+': <strong>'+r.usnRate+'%</strong> · '+t('usnDrRate')+': <strong>'+r.usnDrRate+'%</strong><br>'+
    'Статус: '+esc(r.status)+activitiesHtml+
    '</div>';
}

function checkHoliday(){
  var first=document.getElementById('holidayFirst');
  var usn=document.getElementById('holidayUsn');
  var region=document.getElementById('holidayRegion');
  if(!first||!usn||!region)return;
  var el=document.getElementById('holidayResult');
  if(!el)return;
  if(first.checked&&usn.checked&&region.checked){
    el.className='info-box';
    el.innerHTML='<strong>Вы можете претендовать на налоговые каникулы 0%</strong> до 2 лет (ст. 346.20 НК РФ). Уточните условия в вашем региональном законе.';
  } else {
    el.className='info-box warn';
    var missing=[];
    if(!first.checked)missing.push('первичная регистрация ИП');
    if(!usn.checked)missing.push('применение УСН или ПСН');
    if(!region.checked)missing.push('закон региона о каникулах');
    el.innerHTML='<strong>Право на каникулы не подтверждено.</strong> Не выполнено: '+missing.join(', ')+'.';
  }
}

var modeQuizQuestions=[
  {q:'У вас есть сотрудники?',key:'employees',options:[{v:'yes',l:'Да'},{v:'no',l:'Нет'}]},
  {q:'Ваш годовой доход?',key:'income',options:[{v:'low',l:'До 2,4 млн'},{v:'mid',l:'2,4–60 млн'},{v:'high',l:'Более 60 млн'}]},
  {q:'Есть ли расходы более 60% дохода?',key:'expenses',options:[{v:'yes',l:'Да'},{v:'no',l:'Нет'}]},
  {q:'Вы работаете с юрлицами?',key:'legal',options:[{v:'yes',l:'Да'},{v:'no',l:'Нет'}]},
  {q:'Нужен ли вам НДС?',key:'vat',options:[{v:'yes',l:'Да'},{v:'no',l:'Нет'}]},
  {q:'Вы впервые регистрируетесь?',key:'first',options:[{v:'yes',l:'Да'},{v:'no',l:'Нет'}]},
  {q:'Ваш регион поддерживает каникулы?',key:'holiday',options:[{v:'yes',l:'Да'},{v:'no',l:'Нет'}]},
  {q:'Вид деятельности: услуги/IT?',key:'services',options:[{v:'yes',l:'Да'},{v:'no',l:'Нет'}]}
];

var modeQuizAnswers=Storage.get('modeQuizAnswers',{});

function renderModeQuiz(){
  var el=document.getElementById('modeQuiz');
  if(!el)return;
  var html='';
  modeQuizQuestions.forEach(function(q){
    var val=modeQuizAnswers[q.key];
    html+='<div class="field mb-12"><label>'+esc(q.q)+'</label><div class="btn-group">';
    q.options.forEach(function(opt){
      html+='<button class="btn btn-sm '+(val===opt.v?'btn-primary':'btn-ghost')+'" onclick="answerModeQuiz(\''+q.key+'\',\''+opt.v+'\')">'+esc(opt.l)+'</button>';
    });
    html+='</div></div>';
  });
  el.innerHTML=html;
}

function answerModeQuiz(key,val){
  modeQuizAnswers[key]=val;
  Storage.set('modeQuizAnswers',modeQuizAnswers);
  renderModeQuiz();
}

function recommendMode(){
  var a=modeQuizAnswers;
  var rec='УСН 6%';
  var reason='Универсальный вариант при умеренных расходах.';
  if(a.employees==='no'&&a.income==='low'&&a.vat!=='yes'){
    rec='НПД';
    reason='Нет сотрудников, доход до 2,4 млн, НДС не нужен.';
  } else if(a.expenses==='yes'&&a.income!=='high'){
    rec='УСН 15%';
    reason='Расходы более 60% дохода — выгоднее «Д−Р».';
  } else if(a.income==='high'||a.vat==='yes'){
    rec='ОСН (или УСН с НДС)';
    reason='Высокий доход или необходимость НДС.';
  } else if(a.first==='yes'&&a.holiday==='yes'){
    rec='УСН 0% (каникулы)';
    reason='Первичная регистрация + каникулы в регионе.';
  } else if(a.services==='yes'&&a.income==='mid'){
    rec='ПСН';
    reason='Услуги/IT и доход в пределах 60 млн — патент может быть выгоден.';
  }
  var el=document.getElementById('modeRecommendation');
  if(el){
    el.innerHTML='<div class="info-box"><strong>Рекомендуемый режим: '+rec+'</strong><br>'+reason+'</div>';
  }
}

/* ============================================================
   24. СРАВНЕНИЕ РЕЖИМОВ
   ============================================================ */
function renderCompStaticTable(){
  var el=document.getElementById('compStaticTable');
  if(!el)return;
  var rows=[
    ['Режим','Ставка','Лимит дохода','Сотрудники','Отчётность'],
    ['НПД','4% / 6%','2,4 млн ₽','Нет','Нет'],
    ['УСН 6%','6% (1–6%)','490,5 млн ₽','До 130','Декларация'],
    ['УСН 15%','15% (5–15%)','490,5 млн ₽','До 130','Декларация'],
    ['ПСН','6%','60 млн ₽','До 15','Нет'],
    ['ЕСХН','6%','—','До 130','Декларация'],
    ['ОСН','20% НДС + налог на прибыль','—','—','Полная']
  ];
  var html='';
  rows.forEach(function(r,i){
    html+='<tr>'+(i===0?r.map(function(c){return '<th>'+c+'</th>';}).join(''):r.map(function(c){return '<td>'+c+'</td>';}).join(''))+'</tr>';
  });
  el.innerHTML=html;
}

function renderCompare(){
  var el=document.getElementById('compTable');
  if(!el)return;
  var income=num(document.getElementById('compIncome').value);
  var exp=num(document.getElementById('compExp').value);
  var modes=[
    {name:'НПД (юрлицо)',tax:income*0.04},
    {name:'НПД (физлицо)',tax:income*0.06},
    {name:'УСН 6%',tax:income*0.06},
    {name:'УСН 15%',tax:Math.max((income-exp)*0.15,income*0.01)},
    {name:'ПСН',tax:600000*0.06},
    {name:'ЕСХН',tax:Math.max(0,income-exp)*0.06}
  ];
  var best=modes.reduce(function(a,b){return a.tax<b.tax?a:b;});
  var html='<div class="table-wrapper"><table class="table"><tr><th>Режим</th><th class="num">Налог</th><th class="num">Чистый доход</th></tr>';
  modes.forEach(function(m){
    html+='<tr class="'+(m.name===best.name?'best':'')+'"><td>'+m.name+'</td><td class="num">'+formatMoney(m.tax)+'</td><td class="num">'+formatMoney(income-m.tax)+'</td></tr>';
  });
  html+='</table></div>';
  html+='<div class="info-box mt-12">Лучший режим: <strong>'+best.name+'</strong> (налог '+formatMoney(best.tax)+').</div>';
  el.innerHTML=html;
}

function renderIpVsEmployee(){
  var el=document.getElementById('ipVsEmployeeResult');
  if(!el)return;
  var salary=num(document.getElementById('cmpSalary').value);
  var yearSalary=salary*12;
  var ndfl=yearSalary*0.13;
  var netEmployee=yearSalary-ndfl;
  var ipTax=yearSalary*0.06;
  var ipInsurance=calcInsurance(yearSalary);
  var netIp=yearSalary-ipTax-ipInsurance.total;
  el.innerHTML=
    '<div class="table-wrapper"><table class="table"><tr><th>Параметр</th><th class="num">Наёмный сотрудник</th><th class="num">ИП на УСН 6%</th></tr>'+
    '<tr><td>Годовой доход</td><td class="num">'+formatMoney(yearSalary)+'</td><td class="num">'+formatMoney(yearSalary)+'</td></tr>'+
    '<tr><td>НДФЛ / налог</td><td class="num">'+formatMoney(ndfl)+'</td><td class="num">'+formatMoney(ipTax)+'</td></tr>'+
    '<tr><td>Взносы</td><td class="num">—</td><td class="num">'+formatMoney(ipInsurance.total)+'</td></tr>'+
    '<tr class="best"><td>На руки за год</td><td class="num">'+formatMoney(netEmployee)+'</td><td class="num">'+formatMoney(netIp)+'</td></tr>'+
    '</table></div>';
}

function renderIpVsOoo(){
  var el=document.getElementById('ipVsOooResult');
  if(!el)return;
  var revenue=num(document.getElementById('cmpRevenue').value);
  var costs=num(document.getElementById('cmpCosts').value);
  var accountant=num(document.getElementById('cmpAccountant').value)*12;
  var profit=revenue-costs;
  var ipTax=revenue*0.06;
  var ipIns=calcInsurance(revenue);
  var ipNet=profit-ipTax-ipIns.total;
  var oooTax=profit*0.15;
  var oooNet=profit-oooTax-accountant;
  el.innerHTML=
    '<div class="table-wrapper"><table class="table"><tr><th>Параметр</th><th class="num">ИП УСН 6%</th><th class="num">ООО УСН 15%</th></tr>'+
    '<tr><td>Выручка</td><td class="num">'+formatMoney(revenue)+'</td><td class="num">'+formatMoney(revenue)+'</td></tr>'+
    '<tr><td>Расходы</td><td class="num">'+formatMoney(costs)+'</td><td class="num">'+formatMoney(costs)+'</td></tr>'+
    '<tr><td>Налог</td><td class="num">'+formatMoney(ipTax)+'</td><td class="num">'+formatMoney(oooTax)+'</td></tr>'+
    '<tr><td>Взносы / бухгалтер</td><td class="num">'+formatMoney(ipIns.total)+'</td><td class="num">'+formatMoney(accountant)+'</td></tr>'+
    '<tr class="best"><td>Чистая прибыль</td><td class="num">'+formatMoney(ipNet)+'</td><td class="num">'+formatMoney(oooNet)+'</td></tr>'+
    '</table></div>';
}

function renderSalaryVsDividends(){
  var el=document.getElementById('salaryVsDividendsResult');
  if(!el)return;
  var amount=num(document.getElementById('cmpPayout').value);
  var salaryNdfl=amount*0.13;
  var salaryIns=amount*0.30;
  var salaryNet=amount-salaryNdfl;
  var divNdfl=amount*0.13;
  var divNet=amount-divNdfl;
  el.innerHTML=
    '<div class="table-wrapper"><table class="table"><tr><th>Параметр</th><th class="num">Зарплата</th><th class="num">Дивиденды</th></tr>'+
    '<tr><td>Сумма</td><td class="num">'+formatMoney(amount)+'</td><td class="num">'+formatMoney(amount)+'</td></tr>'+
    '<tr><td>НДФЛ 13%</td><td class="num">'+formatMoney(salaryNdfl)+'</td><td class="num">'+formatMoney(divNdfl)+'</td></tr>'+
    '<tr><td>Страховые взносы 30%</td><td class="num">'+formatMoney(salaryIns)+'</td><td class="num">—</td></tr>'+
    '<tr class="best"><td>На руки</td><td class="num">'+formatMoney(salaryNet)+'</td><td class="num">'+formatMoney(divNet)+'</td></tr>'+
    '</table></div>'+
    '<div class="info-box mt-12">Дивиденды выгоднее по взносам, но требуют прибыли и соблюдения процедуры выплаты.</div>';
}

function renderLeasing(){
  var el=document.getElementById('leasingResult');
  if(!el)return;
  var asset=num(document.getElementById('cmpAsset').value);
  var leaseRate=num(document.getElementById('cmpLeaseRate').value)/100;
  var creditRate=num(document.getElementById('cmpCreditRate').value)/100;
  var leaseTotal=asset*(1+leaseRate*3);
  var creditTotal=asset*(1+creditRate*3);
  var buyTotal=asset;
  el.innerHTML=
    '<div class="table-wrapper"><table class="table"><tr><th>Вариант</th><th class="num">Итоговая стоимость (3 года)</th></tr>'+
    '<tr><td>Покупка</td><td class="num">'+formatMoney(buyTotal)+'</td></tr>'+
    '<tr><td>Кредит</td><td class="num">'+formatMoney(creditTotal)+'</td></tr>'+
    '<tr class="best"><td>Лизинг</td><td class="num">'+formatMoney(leaseTotal)+'</td></tr>'+
    '</table></div>'+
    '<div class="info-box mt-12">Упрощённый расчёт. Лизинг часто выгоднее по налогам, кредит — по итоговой стоимости.</div>';
}

/* ============================================================
   25. ДАШБОРД KPI
   ============================================================ */
var industryAverages={
  it:{taxLoad:6,margin:25,avgCheck:150000,label:'IT'},
  manufacturing:{taxLoad:8,margin:15,avgCheck:300000,label:'Производство'},
  retail:{taxLoad:7,margin:8,avgCheck:3000,label:'Торговля'},
  services:{taxLoad:6,margin:20,avgCheck:15000,label:'Услуги'},
  other:{taxLoad:7,margin:12,avgCheck:10000,label:'Прочее'}
};

function renderKpi(){
  var fromEl=document.getElementById('kpiFrom');
  var toEl=document.getElementById('kpiTo');
  var from=fromEl?fromEl.value:'';
  var to=toEl?toEl.value:'';
  var filtered=journalData.filter(function(e){return e.date>=from&&e.date<=to;});
  var inc=filtered.filter(function(e){return e.type==='income';}).reduce(function(s,e){return s+e.amount;},0);
  var exp=filtered.filter(function(e){return e.type==='expense';}).reduce(function(s,e){return s+e.amount;},0);
  var profit=inc-exp;
  var margin=inc>0?profit/inc*100:0;
  var incomeOps=filtered.filter(function(e){return e.type==='income';});
  var avgCheck=incomeOps.length>0?inc/incomeOps.length:0;
  var el=document.getElementById('kpiResult');
  if(el){
    el.innerHTML=
      '<div class="result-grid cols-2">'+
        '<div class="result-card"><div class="lbl">'+t('revenue')+'</div><div class="val">'+formatMoney(inc)+'</div></div>'+
        '<div class="result-card"><div class="lbl">'+t('expensesShort')+'</div><div class="val" style="color:#ef4444">'+formatMoney(exp)+'</div></div>'+
        '<div class="result-card highlight"><div class="lbl">'+t('profit')+'</div><div class="val">'+formatMoney(profit)+'</div></div>'+
        '<div class="result-card"><div class="lbl">'+t('margin')+'</div><div class="val">'+formatPercent(margin,1)+'</div></div>'+
        '<div class="result-card"><div class="lbl">'+t('avgCheck')+'</div><div class="val">'+formatMoney(avgCheck)+'</div></div>'+
        '<div class="result-card"><div class="lbl">'+t('operations')+'</div><div class="val">'+filtered.length+'</div></div>'+
      '</div>';
    var indEl=document.getElementById('kpiIndustry');
    var indKey=indEl?indEl.value:'services';
    var avg=industryAverages[indKey]||industryAverages.services;
    var taxLoad=inc>0?(inc*0.06/inc*100):0;
    var compareHtml='<div class="info-box mt-12"><strong>'+t('kpiCompare')+' «'+avg.label+'»:</strong><br>'+
      t('margin')+': <strong>'+formatPercent(margin,1)+'</strong> vs отрасль <strong>'+avg.margin+'%</strong> '+
      (margin>=avg.margin?'<span class="tag green">'+t('above')+'</span>':'<span class="tag red">'+t('below')+'</span>')+'<br>'+
      t('taxLoad')+': <strong>'+formatPercent(taxLoad,1)+'</strong> vs отрасль <strong>'+avg.taxLoad+'%</strong><br>'+
      t('avgCheck')+': <strong>'+formatMoney(avgCheck)+'</strong> vs отрасль <strong>'+formatMoney(avg.avgCheck)+'</strong></div>';
    el.insertAdjacentHTML('beforeend', compareHtml);
  }
  renderKpiChart(from,to);
}

function renderKpiChart(from,to){
  LazyLibs.chart().then(function(Chart){
    var canvas=document.getElementById('kpiChart');
    if(!canvas)return;
    if(chartInstances.kpi){chartInstances.kpi.destroy();}
    var months=['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
    var incByMonth=Array(12).fill(0);
    var expByMonth=Array(12).fill(0);
    journalData.forEach(function(e){
      if(e.date<from||e.date>to)return;
      var m=parseInt(e.date.slice(5,7))-1;
      if(m<0||m>11)return;
      if(e.type==='income')incByMonth[m]+=e.amount;
      else expByMonth[m]+=e.amount;
    });
    chartInstances.kpi=new Chart(canvas,{
      type:'bar',
      data:{labels:months,datasets:[
        {label:'Доходы',data:incByMonth,backgroundColor:'#10b981'},
        {label:'Расходы',data:expByMonth,backgroundColor:'#ef4444'}
      ]},
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:function(ctx){return ctx.dataset.label+': '+formatMoney(ctx.parsed.y);}}}},
        scales:{y:{beginAtZero:true,ticks:{callback:function(v){return formatMillions(v);}}}}
      }
    });
  }).catch(function(){showToast(t('libError'),'error');});
}

function exportKpiPDF(){
  LazyLibs.jspdf().then(function(){
    var canvas=document.getElementById('kpiChart');
    var img=canvas?canvas.toDataURL('image/png'):null;
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('Дашборд KPI',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    if(img)pdf.addImage(img,'PNG',14,35,180,90);
    pdf.save('kpi-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

function exportKpiXLSX(){
  LazyLibs.xlsx().then(function(XLSX){
    var rows=[['Месяц','Доходы','Расходы']];
    var months=['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
    var incByMonth=Array(12).fill(0);
    var expByMonth=Array(12).fill(0);
    journalData.forEach(function(e){
      var m=parseInt(e.date.slice(5,7))-1;
      if(m<0||m>11)return;
      if(e.type==='income')incByMonth[m]+=e.amount;
      else expByMonth[m]+=e.amount;
    });
    for(var i=0;i<12;i++)rows.push([months[i],incByMonth[i],expByMonth[i]]);
    var ws=XLSX.utils.aoa_to_sheet(rows);
    var wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'KPI');
    XLSX.writeFile(wb,'kpi-'+todayISO()+'.xlsx');
    showToast('Excel скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}
