/* ============================================================
   26. БОЛЬНИЧНЫЙ
   ============================================================ */
function calcSickLeave(){
  var inc2024=num(document.getElementById('sickInc2024').value);
  var inc2025=num(document.getElementById('sickInc2025').value);
  var exp=num(document.getElementById('sickExp').value,1);
  var days=int(document.getElementById('sickDays').value,1);
  var coef=num(document.getElementById('sickCoef').value,1);
  var reasonEl=document.getElementById('sickReason');
  var reason=reasonEl?reasonEl.value:'self';
  var base2024=Math.min(inc2024,SICK_CONSTANTS.BASE_2024);
  var base2025=Math.min(inc2025,SICK_CONSTANTS.BASE_2025);
  var avgDaily=(base2024+base2025)/730;
  var daily=avgDaily*exp*coef;
  daily=Math.max(SICK_CONSTANTS.MIN_DAILY,Math.min(SICK_CONSTANTS.MAX_DAILY,daily));
  var limitDays=null;
  if(reason==='child7')limitDays=60;
  else if(reason==='child15')limitDays=45;
  else if(reason==='adult')limitDays=30;
  var effectiveDays=days;
  var limitNote='';
  if(limitDays!=null&&days>limitDays){
    effectiveDays=limitDays;
    limitNote='<div class="info-box warn mt-8">Оплачиваемых дней по причине — не более '+limitDays+' в год. Расчёт по '+limitDays+' дням.</div>';
  }
  var total=daily*effectiveDays;
  var el=document.getElementById('sickResult');
  if(el){
    el.innerHTML=
      '<div class="result-grid">'+
        '<div class="result-card"><div class="lbl">Средний дневной</div><div class="val">'+formatMoney2(avgDaily)+'</div></div>'+
        '<div class="result-card"><div class="lbl">Дневное пособие</div><div class="val">'+formatMoney2(daily)+'</div></div>'+
        '<div class="result-card highlight"><div class="lbl">Итого</div><div class="val">'+formatMoney(total)+'</div></div>'+
      '</div>'+
      '<div class="info-box">База 2024: '+formatMoney(base2024)+' (макс. '+formatMoney(SICK_CONSTANTS.BASE_2024)+'). База 2025: '+formatMoney(base2025)+' (макс. '+formatMoney(SICK_CONSTANTS.BASE_2025)+'). Стаж: '+formatPercent(exp*100,0)+'. Коэффициент: '+coef+'. Дней к оплате: '+effectiveDays+'.</div>'+
      limitNote;
  }
}

function saveSickLeavePDF(){
  LazyLibs.jspdf().then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('Расчёт больничного',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    pdf.setFontSize(11);
    var y=40;
    var inc2024=num(document.getElementById('sickInc2024').value);
    var inc2025=num(document.getElementById('sickInc2025').value);
    var exp=num(document.getElementById('sickExp').value,1);
    var days=int(document.getElementById('sickDays').value,1);
    var coef=num(document.getElementById('sickCoef').value,1);
    var base2024=Math.min(inc2024,SICK_CONSTANTS.BASE_2024);
    var base2025=Math.min(inc2025,SICK_CONSTANTS.BASE_2025);
    var avgDaily=(base2024+base2025)/730;
    var daily=avgDaily*exp*coef;
    daily=Math.max(SICK_CONSTANTS.MIN_DAILY,Math.min(SICK_CONSTANTS.MAX_DAILY,daily));
    var total=daily*days;
    pdf.text('Доход 2024: '+formatMoney(inc2024),14,y);y+=7;
    pdf.text('Доход 2025: '+formatMoney(inc2025),14,y);y+=7;
    pdf.text('Стаж: '+formatPercent(exp*100,0)+'  Коэффициент: '+coef,14,y);y+=7;
    pdf.text('Дней болезни: '+days,14,y);y+=7;
    pdf.text('Средний дневной: '+formatMoney2(avgDaily),14,y);y+=7;
    pdf.text('Дневное пособие: '+formatMoney2(daily),14,y);y+=7;
    pdf.setFontSize(13);
    pdf.text('Итого: '+formatMoney(total),14,y+4);
    pdf.save('sickleave-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

function exportSickLeaveXLSX(){
  LazyLibs.xlsx().then(function(XLSX){
    var inc2024=num(document.getElementById('sickInc2024').value);
    var inc2025=num(document.getElementById('sickInc2025').value);
    var exp=num(document.getElementById('sickExp').value,1);
    var days=int(document.getElementById('sickDays').value,1);
    var coef=num(document.getElementById('sickCoef').value,1);
    var base2024=Math.min(inc2024,SICK_CONSTANTS.BASE_2024);
    var base2025=Math.min(inc2025,SICK_CONSTANTS.BASE_2025);
    var avgDaily=(base2024+base2025)/730;
    var daily=avgDaily*exp*coef;
    daily=Math.max(SICK_CONSTANTS.MIN_DAILY,Math.min(SICK_CONSTANTS.MAX_DAILY,daily));
    var total=daily*days;
    var rows=[
      ['Параметр','Значение'],
      ['Доход 2024',inc2024],
      ['Доход 2025',inc2025],
      ['Стаж, %',exp*100],
      ['Дней',days],
      ['Коэф.',coef],
      ['Средний дневной',avgDaily],
      ['Дневное пособие',daily],
      ['Итого',total]
    ];
    var ws=XLSX.utils.aoa_to_sheet(rows);
    var wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Больничный');
    XLSX.writeFile(wb,'sickleave-'+todayISO()+'.xlsx');
    showToast('Excel скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   27. ОТПУСКНЫЕ
   ============================================================ */
function calcVacation(){
  var inc=num(document.getElementById('vacIncome').value);
  var months=int(document.getElementById('vacMonths').value,12);
  var days=int(document.getElementById('vacDays').value,14);
  var excl=int(document.getElementById('vacExcl').value,0);
  var calDays=29.3*months-excl;
  if(calDays<=0)calDays=1;
  var avgDaily=inc/calDays;
  var vacation=avgDaily*days;
  var ndfl=vacation*0.13;
  var el=document.getElementById('vacResult');
  if(el){
    el.innerHTML=
      '<div class="result-grid">'+
        '<div class="result-card"><div class="lbl">Средний дневной</div><div class="val">'+formatMoney2(avgDaily)+'</div></div>'+
        '<div class="result-card"><div class="lbl">Отпускные</div><div class="val">'+formatMoney(vacation)+'</div></div>'+
        '<div class="result-card highlight"><div class="lbl">На руки (НДФЛ 13%)</div><div class="val">'+formatMoney(vacation-ndfl)+'</div></div>'+
      '</div>'+
      '<div class="info-box">Календарных дней: '+calDays.toFixed(2)+'. НДФЛ: '+formatMoney(ndfl)+'.</div>';
  }
}

function saveVacationPDF(){
  LazyLibs.jspdf().then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('Расчёт отпускных',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    pdf.setFontSize(11);
    var y=40;
    var inc=num(document.getElementById('vacIncome').value);
    var months=int(document.getElementById('vacMonths').value,12);
    var days=int(document.getElementById('vacDays').value,14);
    var excl=int(document.getElementById('vacExcl').value,0);
    var calDays=29.3*months-excl;
    if(calDays<=0)calDays=1;
    var avgDaily=inc/calDays;
    var vacation=avgDaily*days;
    var ndfl=vacation*0.13;
    pdf.text('Доход за 12 мес: '+formatMoney(inc),14,y);y+=7;
    pdf.text('Полных месяцев: '+months,14,y);y+=7;
    pdf.text('Дней отпуска: '+days,14,y);y+=7;
    pdf.text('Исключаемых дней: '+excl,14,y);y+=7;
    pdf.text('Календарных дней: '+calDays.toFixed(2),14,y);y+=7;
    pdf.text('Средний дневной: '+formatMoney2(avgDaily),14,y);y+=7;
    pdf.text('Отпускные: '+formatMoney(vacation),14,y);y+=7;
    pdf.text('НДФЛ 13%: '+formatMoney(ndfl),14,y);y+=7;
    pdf.setFontSize(13);
    pdf.text('На руки: '+formatMoney(vacation-ndfl),14,y+4);
    pdf.save('vacation-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

function exportVacationXLSX(){
  LazyLibs.xlsx().then(function(XLSX){
    var inc=num(document.getElementById('vacIncome').value);
    var months=int(document.getElementById('vacMonths').value,12);
    var days=int(document.getElementById('vacDays').value,14);
    var excl=int(document.getElementById('vacExcl').value,0);
    var calDays=29.3*months-excl;
    if(calDays<=0)calDays=1;
    var avgDaily=inc/calDays;
    var vacation=avgDaily*days;
    var ndfl=vacation*0.13;
    var rows=[
      ['Параметр','Значение'],
      ['Доход за 12 мес',inc],
      ['Полных месяцев',months],
      ['Дней отпуска',days],
      ['Исключаемых дней',excl],
      ['Календарных дней',calDays],
      ['Средний дневной',avgDaily],
      ['Отпускные',vacation],
      ['НДФЛ 13%',ndfl],
      ['На руки',vacation-ndfl]
    ];
    var ws=XLSX.utils.aoa_to_sheet(rows);
    var wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Отпускные');
    XLSX.writeFile(wb,'vacation-'+todayISO()+'.xlsx');
    showToast('Excel скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   28. ДЕКРЕТНЫЕ
   ============================================================ */
function calcMaternity(){
  var inc2024=num(document.getElementById('matInc2024').value);
  var inc2025=num(document.getElementById('matInc2025').value);
  var typeEl=document.getElementById('matType');
  var type=typeEl?typeEl.value:'140';
  var excl=int(document.getElementById('matExcl').value,0);
  var birDays=parseInt(type)||140;
  var base2024=Math.min(inc2024,SICK_CONSTANTS.BASE_2024);
  var base2025=Math.min(inc2025,SICK_CONSTANTS.BASE_2025);
  var denom=730-excl;
  if(denom<=0)denom=730;
  var avgDaily=(base2024+base2025)/denom;
  avgDaily=Math.min(avgDaily,MATERNITY_CONSTANTS.MAX_DAILY_2026);
  var total=avgDaily*birDays;
  var el=document.getElementById('matResult');
  if(el){
    el.innerHTML=
      '<div class="result-grid">'+
        '<div class="result-card"><div class="lbl">Средний дневной</div><div class="val">'+formatMoney2(avgDaily)+'</div></div>'+
        '<div class="result-card"><div class="lbl">Дней</div><div class="val">'+birDays+'</div></div>'+
        '<div class="result-card highlight"><div class="lbl">Итого</div><div class="val">'+formatMoney(total)+'</div></div>'+
      '</div>'+
      '<div class="info-box">Макс. дневное: '+formatMoney2(MATERNITY_CONSTANTS.MAX_DAILY_2026)+'. Минимум по МРОТ: '+formatMoney(MATERNITY_CONSTANTS.MIN_MONTHLY)+'/мес.</div>';
  }
}

function saveMaternityPDF(){
  LazyLibs.jspdf().then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('Расчёт декретных',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    pdf.setFontSize(11);
    var y=40;
    var inc2024=num(document.getElementById('matInc2024').value);
    var inc2025=num(document.getElementById('matInc2025').value);
    var type=document.getElementById('matType').value;
    var excl=int(document.getElementById('matExcl').value,0);
    var birDays=parseInt(type)||140;
    var base2024=Math.min(inc2024,SICK_CONSTANTS.BASE_2024);
    var base2025=Math.min(inc2025,SICK_CONSTANTS.BASE_2025);
    var denom=730-excl;if(denom<=0)denom=730;
    var avgDaily=(base2024+base2025)/denom;
    avgDaily=Math.min(avgDaily,MATERNITY_CONSTANTS.MAX_DAILY_2026);
    var total=avgDaily*birDays;
    pdf.text('Доход 2024: '+formatMoney(inc2024),14,y);y+=7;
    pdf.text('Доход 2025: '+formatMoney(inc2025),14,y);y+=7;
    pdf.text('Тип пособия: БиР '+birDays+' дней',14,y);y+=7;
    pdf.text('Исключаемых дней: '+excl,14,y);y+=7;
    pdf.text('Средний дневной: '+formatMoney2(avgDaily),14,y);y+=7;
    pdf.setFontSize(13);
    pdf.text('Итого: '+formatMoney(total),14,y+4);
    pdf.save('maternity-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

function exportMaternityXLSX(){
  LazyLibs.xlsx().then(function(XLSX){
    var inc2024=num(document.getElementById('matInc2024').value);
    var inc2025=num(document.getElementById('matInc2025').value);
    var type=document.getElementById('matType').value;
    var excl=int(document.getElementById('matExcl').value,0);
    var birDays=parseInt(type)||140;
    var base2024=Math.min(inc2024,SICK_CONSTANTS.BASE_2024);
    var base2025=Math.min(inc2025,SICK_CONSTANTS.BASE_2025);
    var denom=730-excl;if(denom<=0)denom=730;
    var avgDaily=(base2024+base2025)/denom;
    avgDaily=Math.min(avgDaily,MATERNITY_CONSTANTS.MAX_DAILY_2026);
    var total=avgDaily*birDays;
    var rows=[
      ['Параметр','Значение'],
      ['Доход 2024',inc2024],
      ['Доход 2025',inc2025],
      ['Дней БиР',birDays],
      ['Исключаемых дней',excl],
      ['Средний дневной',avgDaily],
      ['Итого',total]
    ];
    var ws=XLSX.utils.aoa_to_sheet(rows);
    var wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Декретные');
    XLSX.writeFile(wb,'maternity-'+todayISO()+'.xlsx');
    showToast('Excel скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   29. ТОЧКА БЕЗУБЫТОЧНОСТИ
   ============================================================ */
function calcBep(){
  var fix=num(document.getElementById('bepFix').value);
  var price=num(document.getElementById('bepPrice').value,1);
  var varCost=num(document.getElementById('bepVar').value);
  var margin=price-varCost;
  var bepUnits=margin>0?fix/margin:0;
  var bepRevenue=bepUnits*price;
  var el=document.getElementById('bepResult');
  if(el){
    el.innerHTML=
      '<div class="result-grid">'+
        '<div class="result-card"><div class="lbl">Маржа/ед.</div><div class="val">'+formatMoney(margin)+'</div></div>'+
        '<div class="result-card"><div class="lbl">BEP (шт.)</div><div class="val">'+Math.ceil(bepUnits)+'</div></div>'+
        '<div class="result-card highlight"><div class="lbl">BEP (выручка)</div><div class="val">'+formatMoney(bepRevenue)+'</div></div>'+
      '</div>'+
      (margin<=0?'<div class="info-box danger">Маржа ≤ 0 — точка безубыточности недостижима при текущих ценах.</div>':'');
  }
  renderBepChart(fix,price,varCost,bepUnits);
}

function renderBepChart(fix,price,varCost,bepUnits){
  LazyLibs.chart().then(function(Chart){
    var canvas=document.getElementById('bepChart');
    if(!canvas)return;
    if(chartInstances.bep){chartInstances.bep.destroy();}
    var maxUnits=Math.max(Math.ceil(bepUnits*2),10);
    var labels=[],revenue=[],costs=[],fixed=[];
    var step=maxUnits/10;
    for(var i=0;i<=10;i++){
      var u=Math.round(step*i);
      labels.push(u);
      revenue.push(u*price);
      costs.push(fix+u*varCost);
      fixed.push(fix);
    }
    chartInstances.bep=new Chart(canvas,{
      type:'line',
      data:{labels:labels,datasets:[
        {label:'Выручка',data:revenue,borderColor:'#10b981',fill:false,tension:.2},
        {label:'Затраты',data:costs,borderColor:'#ef4444',fill:false,tension:.2},
        {label:'Постоянные',data:fixed,borderColor:'#3b82f6',borderDash:[5,5],pointRadius:0,fill:false}
      ]},
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:function(ctx){return ctx.dataset.label+': '+formatMoney(ctx.parsed.y);}}}},
        scales:{x:{title:{display:true,text:'Единицы'}},y:{beginAtZero:true,ticks:{callback:function(v){return formatMillions(v);}}}}
      }
    });
  }).catch(function(){showToast(t('libError'),'error');});
}

function saveBepPDF(){
  LazyLibs.jspdf().then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('Точка безубыточности',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    var canvas=document.getElementById('bepChart');
    if(canvas)pdf.addImage(canvas.toDataURL('image/png'),'PNG',14,35,180,90);
    pdf.setFontSize(11);
    var y=135;
    var fix=num(document.getElementById('bepFix').value);
    var price=num(document.getElementById('bepPrice').value,1);
    var varCost=num(document.getElementById('bepVar').value);
    var margin=price-varCost;
    var bepUnits=margin>0?fix/margin:0;
    pdf.text('Постоянные расходы: '+formatMoney(fix),14,y);y+=7;
    pdf.text('Средняя цена: '+formatMoney(price),14,y);y+=7;
    pdf.text('Переменные/ед.: '+formatMoney(varCost),14,y);y+=7;
    pdf.text('Маржа/ед.: '+formatMoney(margin),14,y);y+=7;
    pdf.text('BEP (шт.): '+Math.ceil(bepUnits),14,y);y+=7;
    pdf.text('BEP (выручка): '+formatMoney(bepUnits*price),14,y);
    pdf.save('bep-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

function exportBepXLSX(){
  LazyLibs.xlsx().then(function(XLSX){
    var fix=num(document.getElementById('bepFix').value);
    var price=num(document.getElementById('bepPrice').value,1);
    var varCost=num(document.getElementById('bepVar').value);
    var margin=price-varCost;
    var bepUnits=margin>0?fix/margin:0;
    var bepRevenue=bepUnits*price;
    var rows=[
      ['Параметр','Значение'],
      ['Постоянные расходы',fix],
      ['Средняя цена',price],
      ['Переменные/ед.',varCost],
      ['Маржа/ед.',margin],
      ['BEP (шт.)',Math.ceil(bepUnits)],
      ['BEP (выручка)',bepRevenue]
    ];
    var ws=XLSX.utils.aoa_to_sheet(rows);
    var wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'BEP');
    XLSX.writeFile(wb,'bep-'+todayISO()+'.xlsx');
    showToast('Excel скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   30. ROI
   ============================================================ */
function calcRoi(){
  var inv=num(document.getElementById('roiInv').value,1);
  var profit=num(document.getElementById('roiProfit').value);
  var months=int(document.getElementById('roiMonths').value,1);
  var totalProfit=profit*months;
  var roi=(totalProfit-inv)/inv*100;
  var payback=profit>0?inv/profit:Infinity;
  var annual=months>0?(roi/months*12):0;
  var el=document.getElementById('roiResult');
  if(el){
    el.innerHTML=
      '<div class="result-grid">'+
        '<div class="result-card"><div class="lbl">Окупаемость</div><div class="val">'+(isFinite(payback)?payback.toFixed(1)+' мес':'—')+'</div></div>'+
        '<div class="result-card"><div class="lbl">ROI</div><div class="val">'+formatPercent(roi,1)+'</div></div>'+
        '<div class="result-card"><div class="lbl">Годовая доходность</div><div class="val">'+formatPercent(annual,1)+'</div></div>'+
        '<div class="result-card highlight"><div class="lbl">Прибыль за срок</div><div class="val">'+formatMoney(totalProfit)+'</div></div>'+
      '</div>';
  }
}

function saveRoiPDF(){
  LazyLibs.jspdf().then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('ROI инвестиций',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    pdf.setFontSize(11);
    var y=40;
    var inv=num(document.getElementById('roiInv').value,1);
    var profit=num(document.getElementById('roiProfit').value);
    var months=int(document.getElementById('roiMonths').value,1);
    var totalProfit=profit*months;
    var roi=(totalProfit-inv)/inv*100;
    var payback=profit>0?inv/profit:Infinity;
    pdf.text('Инвестиция: '+formatMoney(inv),14,y);y+=7;
    pdf.text('Прибыль/мес: '+formatMoney(profit),14,y);y+=7;
    pdf.text('Срок: '+months+' мес',14,y);y+=7;
    pdf.text('Окупаемость: '+(isFinite(payback)?payback.toFixed(1)+' мес':'—'),14,y);y+=7;
    pdf.text('ROI: '+formatPercent(roi,1),14,y);y+=7;
    pdf.setFontSize(13);
    pdf.text('Прибыль за срок: '+formatMoney(totalProfit),14,y+4);
    pdf.save('roi-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   31. CASH-FLOW
   ============================================================ */
function calcCashflow(){
  var start=num(document.getElementById('cfStart').value);
  var inc=num(document.getElementById('cfIncome').value);
  var exp=num(document.getElementById('cfExpense').value);
  var seasonEl=document.getElementById('cfSeason');
  var season=seasonEl?num(seasonEl.value):0;
  var balance=start;
  var minBal=start;
  var gap=false;
  var rows=[];
  var labels=[];
  var data=[];
  for(var m=1;m<=12;m++){
    var k=1+(season?Math.sin(m/12*Math.PI*2)*season:0);
    var incM=inc*k;
    var expM=exp*k;
    balance+=incM-expM;
    if(balance<minBal)minBal=balance;
    if(balance<0)gap=true;
    labels.push(formatMonthRu(m-1));
    data.push(balance);
    rows.push([formatMonthRu(m-1),incM,expM,balance]);
  }
  var el=document.getElementById('cfResult');
  if(el){
    var tableHtml='<div class="table-wrapper"><table class="table"><tr><th>Мес</th><th class="num">Доход</th><th class="num">Расход</th><th class="num">Остаток</th></tr>';
    rows.forEach(function(r){
      tableHtml+='<tr><td>'+r[0]+'</td><td class="num">'+formatMoney(r[1])+'</td><td class="num">'+formatMoney(r[2])+'</td><td class="num" style="color:'+(r[3]<0?'#ef4444':'#10b981')+'">'+formatMoney(r[3])+'</td></tr>';
    });
    tableHtml+='</table></div>';
    el.innerHTML=
      '<div class="result-grid">'+
        '<div class="result-card"><div class="lbl">Мин. остаток</div><div class="val">'+formatMoney(minBal)+'</div></div>'+
        '<div class="result-card '+(gap?'danger':'')+'"><div class="lbl">Кассовый разрыв</div><div class="val">'+(gap?'Да':'Нет')+'</div></div>'+
      '</div>'+tableHtml;
  }
  renderCfChart(labels,data);
}

function renderCfChart(labels,data){
  LazyLibs.chart().then(function(Chart){
    var canvas=document.getElementById('cfChart');
    if(!canvas)return;
    if(chartInstances.cf){chartInstances.cf.destroy();}
    chartInstances.cf=new Chart(canvas,{
      type:'line',
      data:{labels:labels,datasets:[
        {label:'Остаток',data:data,borderColor:'#059669',backgroundColor:'rgba(5,150,105,.1)',fill:true,tension:.3},
        {label:'Нулевая линия',data:Array(12).fill(0),borderColor:'#ef4444',borderDash:[5,5],pointRadius:0,fill:false}
      ]},
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:function(ctx){return ctx.dataset.label+': '+formatMoney(ctx.parsed.y);}}}},
        scales:{y:{beginAtZero:true,ticks:{callback:function(v){return formatMillions(v);}}}}
      }
    });
  }).catch(function(){showToast(t('libError'),'error');});
}

function saveCashflowPDF(){
  LazyLibs.jspdf().then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('Cash-flow прогноз',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    var canvas=document.getElementById('cfChart');
    if(canvas)pdf.addImage(canvas.toDataURL('image/png'),'PNG',14,35,180,90);
    pdf.setFontSize(11);
    pdf.text('Стартовый остаток: '+formatMoney(num(document.getElementById('cfStart').value)),14,135);
    pdf.text('Доход/мес: '+formatMoney(num(document.getElementById('cfIncome').value)),14,142);
    pdf.text('Расход/мес: '+formatMoney(num(document.getElementById('cfExpense').value)),14,149);
    pdf.save('cashflow-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}

/* ============================================================
   32. НДФЛ
   ============================================================ */
function calcNdfl(){
  var inc=num(document.getElementById('ndflIncome').value);
  var paid=num(document.getElementById('ndflPaid').value);
  var eduSelf=Math.min(num(document.getElementById('ndflEduSelf').value),NDFL_CONSTANTS.EDUCATION_SELF_LIMIT);
  var eduChild=Math.min(num(document.getElementById('ndflEduChild').value),NDFL_CONSTANTS.EDUCATION_CHILDREN_LIMIT);
  var med=Math.min(num(document.getElementById('ndflMed').value),NDFL_CONSTANTS.MEDICINE_COMMON_LIMIT);
  var medExp=num(document.getElementById('ndflMedExp').value);
  var prop=Math.min(num(document.getElementById('ndflProp').value),NDFL_CONSTANTS.PROPERTY_COST_LIMIT);
  var interest=Math.min(num(document.getElementById('ndflInterest').value),NDFL_CONSTANTS.PROPERTY_INTEREST_LIMIT);
  var iis=Math.min(num(document.getElementById('ndflIis').value),NDFL_CONSTANTS.IIS_LIMIT);
  var fitness=num(document.getElementById('ndflFitness').value);
  var socialCommon=eduSelf+med+Math.min(fitness,NDFL_CONSTANTS.MEDICINE_COMMON_LIMIT);
  var socialLimit=Math.min(socialCommon,NDFL_CONSTANTS.EDUCATION_SELF_LIMIT);
  var totalBase=socialLimit+eduChild+medExp+prop+interest+iis;
  var calcReturn=totalBase*NDFL_CONSTANTS.RATE;
  var result=Math.min(calcReturn,paid);
  var el=document.getElementById('ndflResult');
  if(el){
    el.innerHTML=
      '<div class="result-grid">'+
        '<div class="result-card"><div class="lbl">База вычетов</div><div class="val">'+formatMoney(totalBase)+'</div></div>'+
        '<div class="result-card"><div class="lbl">Расчётный возврат</div><div class="val">'+formatMoney(calcReturn)+'</div></div>'+
        '<div class="result-card highlight"><div class="lbl">К возврату</div><div class="val">'+formatMoney(result)+'</div></div>'+
      '</div>'+
      '<div class="info-box">'+
      'Обучение (своё): '+formatMoney(eduSelf)+' / 150 000<br>'+
      'Обучение (дети): '+formatMoney(eduChild)+' / 110 000<br>'+
      'Лечение: '+formatMoney(med)+' / 150 000<br>'+
      'Дорогостоящее лечение: '+formatMoney(medExp)+' (без лимита)<br>'+
      'Имущество: '+formatMoney(prop)+' / 2 000 000<br>'+
      'Проценты: '+formatMoney(interest)+' / 3 000 000<br>'+
      'ИИС: '+formatMoney(iis)+' / 400 000<br>'+
      'Фитнес (входит в общий 150 000): '+formatMoney(fitness)+'</div>';
  }
}

function saveNdflPDF(){
  LazyLibs.jspdf().then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    pdf.setFontSize(16);
    pdf.text('Возврат НДФЛ',14,20);
    pdf.setFontSize(10);
    pdf.text('Дата: '+new Date().toLocaleString('ru-RU'),14,28);
    pdf.setFontSize(11);
    var y=40;
    var inc=num(document.getElementById('ndflIncome').value);
    var paid=num(document.getElementById('ndflPaid').value);
    var eduSelf=Math.min(num(document.getElementById('ndflEduSelf').value),NDFL_CONSTANTS.EDUCATION_SELF_LIMIT);
    var eduChild=Math.min(num(document.getElementById('ndflEduChild').value),NDFL_CONSTANTS.EDUCATION_CHILDREN_LIMIT);
    var med=Math.min(num(document.getElementById('ndflMed').value),NDFL_CONSTANTS.MEDICINE_COMMON_LIMIT);
    var medExp=num(document.getElementById('ndflMedExp').value);
    var prop=Math.min(num(document.getElementById('ndflProp').value),NDFL_CONSTANTS.PROPERTY_COST_LIMIT);
    var interest=Math.min(num(document.getElementById('ndflInterest').value),NDFL_CONSTANTS.PROPERTY_INTEREST_LIMIT);
    var iis=Math.min(num(document.getElementById('ndflIis').value),NDFL_CONSTANTS.IIS_LIMIT);
    var fitness=num(document.getElementById('ndflFitness').value);
    var socialCommon=eduSelf+med+Math.min(fitness,NDFL_CONSTANTS.MEDICINE_COMMON_LIMIT);
    var socialLimit=Math.min(socialCommon,NDFL_CONSTANTS.EDUCATION_SELF_LIMIT);
    var totalBase=socialLimit+eduChild+medExp+prop+interest+iis;
    var calcReturn=totalBase*NDFL_CONSTANTS.RATE;
    var result=Math.min(calcReturn,paid);
    pdf.text('Годовой доход: '+formatMoney(inc),14,y);y+=7;
    pdf.text('Уплаченный НДФЛ: '+formatMoney(paid),14,y);y+=7;
    pdf.text('Обучение (своё): '+formatMoney(eduSelf),14,y);y+=7;
    pdf.text('Обучение (дети): '+formatMoney(eduChild),14,y);y+=7;
    pdf.text('Лечение: '+formatMoney(med),14,y);y+=7;
    pdf.text('Дорогостоящее лечение: '+formatMoney(medExp),14,y);y+=7;
    pdf.text('Имущество: '+formatMoney(prop),14,y);y+=7;
    pdf.text('Проценты: '+formatMoney(interest),14,y);y+=7;
    pdf.text('ИИС: '+formatMoney(iis),14,y);y+=7;
    pdf.text('Фитнес: '+formatMoney(fitness),14,y);y+=7;
    pdf.text('База вычетов: '+formatMoney(totalBase),14,y);y+=7;
    pdf.setFontSize(13);
    pdf.text('К возврату: '+formatMoney(result),14,y+4);
    pdf.save('ndfl-'+todayISO()+'.pdf');
    showToast('PDF скачан','success');
  }).catch(function(){showToast(t('libError'),'error');});
}
