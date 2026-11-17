/* ============================================================
   8. ПЕРЕВОДЫ (RU + EN)
   ============================================================ */
var translations={
  ru:{
    appName:'Налоговый калькулятор', menu:'Меню', search:'Поиск', theme:'Тема',
    main:'Основное', calculators:'Калькуляторы', tools:'Инструменты', help:'Справка', settings:'Настройки',
    calc:'Расчёт налога', limits:'Лимиты и прогноз', risk:'Анализ рисков', ben:'Льготы и каникулы',
    comp:'Сравнение режимов', kpi:'Дашборд KPI', sickleave:'Больничный', vacation:'Отпускные',
    maternity:'Декретные', bep:'Точка безубыточности', roi:'ROI инвестиций', cashflow:'Cash-flow',
    ndfl:'Возврат НДФЛ', journal:'Журнал операций', scanner:'Сканер чеков', checklist:'Чек-лист ИП/ООО',
    heatmap:'Теплокарта года', simulator:'Симулятор', faq:'База знаний', course:'Мини-курс',
    nk:'НК РФ офлайн', court:'Судебная практика', govproc:'Госзакупки', cbr:'ЦБ/ФНС', backup:'Резервная копия',
    payment:'Оплата',
    installPwa:'Установить PWA', installPwaText:'Установите приложение на устройство для офлайн-доступа к расчётам.',
    mode:'Налоговый режим', income:'Годовой доход, ₽', expenses:'Сумма расходов, ₽',
    calculate:'Рассчитать', reset:'Сбросить', tax:'Налог', netIncome:'Чистый доход', effRate:'Эфф. ставка',
    insurance:'Страховые взносы ИП за себя (2026)',
    insuranceSub:'Фиксированная часть 57 390 ₽ + 1% с дохода свыше 300 000 ₽ (максимум 321 818 ₽).',
    quickTemplates:'Быстрые шаблоны', quickTemplatesSub:'Подставить параметры типового бизнеса.',
    history:'История', taxHistory:'История расчётов', add:'Добавить', cancel:'Отмена', close:'Закрыть',
    save:'Сохранить', delete:'Удалить', clear:'Очистить', export:'Экспорт JSON', import:'Импорт', print:'Печать',
    yes:'Да', no:'Нет', all:'Все', period:'Период', from:'С', to:'По', total:'Итого',
    month:'Месяц', year:'Год', date:'Дата', amount:'Сумма, ₽', category:'Категория', counterparty:'Контрагент',
    comment:'Комментарий', type:'Тип', incomeType:'Доход', expenseType:'Расход',
    profit:'Прибыль', margin:'Маржа', avgCheck:'Средний чек', taxLoad:'Налоговая нагрузка',
    revenue:'Выручка', expensesShort:'Расходы', operations:'Операций',
    region:'Регион', regionLabel:'Субъект Российской Федерации',
    regionSub:'Выберите субъект РФ — покажем региональный закон, ставки и особые условия.',
    law:'Закон', usnRate:'УСН «Доходы»', usnDrRate:'УСН «Д−Р»', status:'Статус',
    federalBenefits:'Федеральные льготы 2026', holidayCheck:'Проверка права на каникулы',
    holidayCheckSub:'Ответьте на 3 вопроса — проверим, можете ли вы применить ставку 0%.',
    holidayQ1:'Вы впервые регистрируетесь как ИП', holidayQ2:'Вы применяете УСН или ПСН',
    holidayQ3:'В вашем регионе действует закон о каникулах',
    holidayTitle:'Налоговые каникулы 0%',
    holidayText:'для впервые зарегистрированных ИП на УСН и ПСН до 2 лет (ст. 346.20 НК РФ).',
    mspTitle:'Пониженные тарифы взносов МСП', mspText:'15% с выплат свыше МРОТ.',
    itTitle:'ИТ-компании', itText:'7,6% страховых взносов.',
    regionRatesTitle:'Региональные ставки УСН',
    regionRatesText:'от 1% до 6% («Доходы») и от 5% до 15% («Д−Р»).',
    modeQuiz:'Индивидуальный подбор режима', modeQuizSub:'Ответьте на 8 вопросов — рекомендуем оптимальный режим.',
    recommendMode:'Подобрать режим', compTable:'Сравнительная таблица',
    compTableSub:'Ключевые параметры режимов налогообложения.',
    compCalc:'Калькулятор сравнения', compCalcSub:'Введите доход и расходы — увидите налог и чистый доход по каждому режиму.',
    ipVsEmployee:'ИП vs наёмный сотрудник', ipVsEmployeeSub:'Сравнение чистого дохода при работе на себя и по трудовому договору.',
    ipVsOoo:'ИП vs ООО', ipVsOooSub:'С учётом бухгалтера, зарплаты директора и дивидендов.',
    salaryVsDividends:'Зарплата vs дивиденды', salaryVsDividendsSub:'Сравнение налоговой нагрузки при выплате собственнику.',
    leasing:'Лизинг vs кредит vs покупка', leasingSub:'Сравнение вариантов приобретения актива.',
    industry:'Отрасль для сравнения', buildChart:'Построить', monthlyChart:'График по месяцам',
    downloadPdf:'Скачать PDF', downloadExcel:'Скачать Excel', downloadPng:'Скачать PNG', downloadCsv:'Скачать CSV',
    savePdf:'Сохранить PDF', sickLeaveData:'Данные для расчёта', sickExp:'Страховой стаж',
    sickDays:'Дней болезни', sickReason:'Причина', sickCoef:'Районный коэффициент', sickLimits:'Ограничения 2026',
    sickBase2024:'База 2024:', sickBase2025:'База 2025:', sickMaxDaily:'Максимум в день:', sickMinDaily:'Минимум в день:',
    mrot:'МРОТ 2026:', exp60:'До 5 лет (60%)', exp80:'5–8 лет (80%)', exp100:'Более 8 лет (100%)',
    sickSelf:'Своя болезнь', sickChild7:'Уход за ребёнком до 7 лет', sickChild15:'Уход за ребёнком 8–15 лет',
    sickAdult:'Уход за взрослым', inc2024:'Доход 2024, ₽', inc2025:'Доход 2025, ₽',
    vacationData:'Данные для расчёта', vacIncome:'Доход за 12 месяцев, ₽', vacMonths:'Полных месяцев',
    vacDays:'Дней отпуска', vacExcl:'Исключаемых дней', maternityData:'Данные для расчёта',
    maternityType:'Тип пособия', bir140:'БиР — 140 дней', bir156:'БиР — 156 дней', bir194:'БиР — 194 дня',
    matMinMonthly:'Минимум в месяц:', matMaxCare:'Максимум по уходу до 1,5 лет:',
    bepParams:'Параметры', bepFix:'Постоянные расходы/мес, ₽', bepPrice:'Средняя цена, ₽', bepVar:'Переменные/ед., ₽',
    roiParams:'Параметры', roiInv:'Инвестиция, ₽', roiProfit:'Прибыль/мес, ₽', roiMonths:'Срок анализа, мес',
    cfParams:'Параметры', cfStart:'Стартовый остаток, ₽', cfIncome:'Средний доход/мес, ₽',
    cfExpense:'Средний расход/мес, ₽', cfSeason:'Сезонность', cfSeasonNone:'Нет', cfSeason20:'±20%', cfSeason50:'±50%',
    ndflIncomeTitle:'Доход и уплаченный налог', ndflPaid:'Уплаченный НДФЛ, ₽', ndflExpenses:'Расходы для вычетов',
    ndflEduSelf:'Обучение (своё/брата), ₽', ndflEduChild:'Обучение детей, ₽', ndflMed:'Лечение (обычное), ₽',
    ndflMedExp:'Дорогостоящее лечение, ₽', ndflProp:'Имущественный вычет (жильё), ₽', ndflInterest:'Проценты по ипотеке, ₽',
    ndflIis:'ИИС, ₽', ndflFitness:'Фитнес, ₽', addOperation:'Добавить операцию', quickAdd:'Быстрое добавление операции',
    categories:'Управление категориями', existingCategories:'Существующие категории', newCategory:'Новая категория',
    filterType:'Фильтр по типу', filterCategory:'Категория', arCamera:'AR-камера',
    arCameraSub:'Наведите камеру на QR-код чека ФНС. Автоматическое распознавание через jsQR. Для OCR текста — кнопка-затвор.',
    arStart:'Включить камеру', arStop:'Остановить', arCapture:'Затвор (OCR)',
    uploadPhoto:'Загрузка фото из галереи', uploadPhotoSub:'JPG, PNG, PDF до 10 МБ. Распознавание QR и текста (OCR).',
    receiptsHistory:'История чеков', duplicates:'Дубликаты', checklistTitle:'Чек-лист регистрации',
    ip:'ИП', ooo:'ООО', docsPackage:'Пакет документов', heatmapTitle:'Теплокарта года 2026',
    heatmapLoad:'Нагрузка по месяцам', event:'Событие', eventTax:'налоговое', note:'Заметка', notePersonal:'личная',
    both:'Оба', bothSub:'событие + заметка', simulatorParams:'Параметры', simIncome:'Доход:', simExpenses:'Расходы:',
    simEmployees:'Сотрудники:', simSalary:'Зарплата:', simMode:'Режим', applyToCalc:'Применить к калькулятору',
    faqTitle:'FAQ', lifehacks:'Лайфхаки', glossary:'Глоссарий', courseTitle:'Мини-курс', courseLesson:'Урок',
    courseOf:'из', courseNext:'Далее', coursePrev:'Назад', courseFinish:'Завершить',
    courseCorrect:'Верно!', courseWrong:'Неверно.', nkTitle:'НК РФ офлайн', nkSearch:'Поиск по статьям',
    nkCategory:'Категория', courtTitle:'Судебная практика', courtSearch:'Поиск по теме',
    govprocTitle:'Госзакупки', govChecklist44:'Чек-лист по 44-ФЗ (12 шагов)',
    govChecklist223:'Чек-лист по 223-ФЗ (8 шагов)', govCompare:'ИП vs ООО в закупках', govLinks:'Полезные ссылки',
    cbrTitle:'Актуальная информация ЦБ/ФНС', cbrCb:'Центральный банк РФ', cbrFns:'ФНС России',
    cbrLaws:'Законы и консультант', cbrCheck:'Проверка контрагента', cbrReg:'Регистрация и маркировка',
    keyRate:'Ключевая ставка', refRate:'Ставка рефинансирования', currency:'Курсы валют', fnsSite:'Сайт ФНС',
    nkPart1:'НК РФ часть 1', nkPart2:'НК РФ часть 2', kkt54fz:'54-ФЗ (ККТ)', mrot2026:'МРОТ 2026',
    egrul:'ЕГРЮЛ/ЕГРИП', transparentBusiness:'Прозрачный бизнес', disqualified:'Дисквалифицированные лица',
    fssp:'ФССП — исполнительные производства', kad:'Картотека арбитражных дел',
    businessReg:'Регистрация бизнеса', gosuslugi:'Госуслуги', myTax:'Мой налог (НПД)', lkIp:'Личный кабинет ИП',
    chestnyZnak:'Честный знак', kktRegistry:'Реестр ККТ', settingsTitle:'Настройки', appearance:'Оформление',
    themeLabel:'Тема', themeLight:'Светлая', themeDark:'Тёмная', fontSize:'Размер шрифта (12–36 px)',
    fontPreview:'Превью шрифта', fontPreviewText:'Пример текста для оценки размера шрифта. Налоговый калькулятор.',
    colorblind:'Режим для дальтоников', simpleMode:'Простой режим',
    sandbox:'Режим песочницы', sandboxOn:'Вкл (данные в памяти)',
    on:'Вкл', off:'Выкл', onboarding:'Онбординг', onboardingSub:'Показать обучающие слайды снова.',
    showOnboarding:'Показать онбординг', appPassword:'Пароль на приложение',
    appPasswordSub:'Защита доступа к данным. Пароль хранится в виде хеша.',
    newPassword:'Новый пароль (4 цифры)', repeatPassword:'Повторите пароль',
    savePassword:'Сохранить пароль', removePassword:'Удалить пароль',
    dataStats:'Статистика данных', deleteData:'Удаление данных',
    deleteDataSub:'Удаляет все данные: журнал, чеки, историю, настройки, заметки.',
    deleteAllData:'Удалить все данные', backupExport:'Экспорт', backupExportSub:'Сохраните данные в JSON или HTML-отчёт.',
    backupImport:'Импорт', backupImportSub:'Загрузите JSON или зашифрованный .enc файл.',
    backupDemo:'Демо-данные', backupDemoSub:'Загрузить примеры для знакомства с приложением.',
    backupPassword:'Пароль (опционально)', importPassword:'Пароль (если зашифровано)',
    shareLink:'Поделиться ссылкой', loadDemo:'Загрузить демо', clearDemo:'Удалить демо',
    htmlReport:'HTML-отчёт (PDF)', downloadJson:'Скачать JSON', installTitle:'Установка приложения',
    installText:'Установите приложение на устройство для быстрого доступа и работы офлайн.',
    advantages:'Преимущества:', advOffline:'Работает без интернета',
    advDesktop:'Запускается с рабочего стола', advNoBrowser:'Не требует браузера',
    lockTitle:'Введите пароль', lockSub:'Приложение защищено паролем',
    obTitle1:'Налоговый калькулятор',
    obText1:'Профессиональный расчёт налогов для самозанятых, ИП и ООО. Все 7 режимов, взносы, льготы.',
    obTitle2:'Журнал операций', obText2:'Учёт доходов и расходов, KPI-дашборд, экспорт в CSV, Excel и PDF.',
    obTitle3:'Сканер чеков', obText3:'Распознавание QR-кодов ФНС и текста чеков через AR-камеру или загрузку фото.',
    obTitle4:'Мини-курс + скидка', obText4:'Пройдите 5 блоков вопросов — получите промокод на скидку 20%.',
    skip:'Пропустить', next:'Далее', done:'Готово', undo:'Отменить', undoLabel:'Элемент удалён',
    simpleBanner:'Простой режим включён. Показаны только основные функции.',
    welcomeBanner:'С возвращением! Вы не заходили более 24 часов.',
    exitSimple:'Выключить', ok:'Ок',
    deleted:'Удалено', added:'Добавлено', saved:'Сохранено', error:'Ошибка', warning:'Внимание', success:'Успешно',
    confirmDelete:'Вы уверены, что хотите удалить?',
    confirmClearAll:'Удалить ВСЕ данные без возможности восстановления?',
    noData:'Нет данных', loading:'Загрузка...', libError:'Ошибка загрузки библиотеки',
    offlineWarning:'Нет интернета. Некоторые функции недоступны.',
    calcShort:'Расчёт', journalShort:'Журнал', scannerShort:'Сканер', courseShort:'Курс', more:'Ещё',
    calcParams:'Параметры расчёта',
    calcSub:'Выберите режим и укажите данные — калькулятор посчитает налог, взносы и чистый доход.',
    modeNpd:'НПД (самозанятый)', modeUsn6:'ИП УСН «Доходы» 6%', modeUsn15:'ИП УСН «Д−Р» 15%',
    modePsn:'ПСН (патент)', modeOoo6:'ООО УСН 6%', modeOoo15:'ООО УСН 15%', modeEsxn:'ЕСХН 6%',
    npdType:'Тип контрагента (НПД)', npdLegal:'Юрлицо / ИП — 4%', npdPerson:'Физлицо — 6%',
    employees:'Есть сотрудники?', psnIncome:'Потенциальный доход по патенту, ₽',
    accIncome:'Накопленный доход', accIncomeSub:'Индикаторы приближения к лимитам режимов налогообложения.',
    accIncomeLabel:'Накопленный доход за год, ₽', forecast:'Прогноз и график',
    forecastSub:'Среднемесячный доход → прогноз накопленного дохода и месяц превышения порога.',
    avgIncome:'Среднемесячный доход, ₽', riskForm:'Анкета налоговых рисков',
    riskFormSub:'Ответьте на вопросы — получите оценку уровня риска и рекомендации.',
    assessRisk:'Оценить риск', industryManufacturing:'Производство', industryRetail:'Торговля',
    industryServices:'Услуги', industryOther:'Прочее',
    catContrib:'Взносы', catChecks:'Проверки', catBanks:'Банки', eis:'ЕИС', rts:'РТС-тендер',
    sberAst:'Сбербанк-АСТ', eetp:'ЕЭТП',
    kpiCompare:'Сравнение с отраслью', above:'выше', below:'ниже',
    simLimitEmployees:'Превышен лимит сотрудников для УСН (130 чел.) — нужен переход на ОСН.',
    simLimitPsn:'Превышен лимит сотрудников для ПСН (15 чел.) — патент недоступен.',
    simNpdNoEmployees:'НПД не допускает сотрудников.',
    qrErrors:'Ошибки в QR ФНС:', qrInvalid:'QR содержит ошибки',
    historyCount:'История расчётов:', shareCopied:'Ссылка скопирована',
    paymentPromo:'Промокод', paymentPromoSub:'Введите промокод, полученный после прохождения курса, для скидки 20%.',
    promoCode:'Промокод', apply:'Применить',
    paymentPlan:'Выберите план', planMonth:'Месяц', planYear:'Год', payNow:'Оплатить',
    paymentStatus:'Статус подписки',
    promoInvalid:'Промокод не найден', promoEmpty:'Введите промокод',
    promoUsed:'Промокод уже использован', promoApplied:'Промокод применён. Скидка 20%.',
    promoNoCourse:'Сначала пройдите курс, чтобы получить промокод.',
    paymentNotReady:'Платёжная система будет подключена позже.',
    paymentSelected:'Выбрано: {0}',
    subscriptionActive:'Подписка активна', subscriptionInactive:'Подписка не оформлена',
    plan:'План', paidDate:'Дата оплаты',
    courseBlocks:'Блоки курса', courseBlockDone:'Пройден', courseBlockLocked:'Заблокирован',
    courseBlockInProgress:'В процессе', courseQuestionOf:'Вопрос {0} из {1}',
    courseErrorsTitle:'Ошибки в блоке', courseRetryErrors:'Пройти ошибки заново',
    courseBlockPassed:'Блок пройден!', courseAllDone:'Все блоки пройдены!',
    coursePromoTitle:'Ваш промокод на скидку 20%:',
    coursePromoNote:'Промокод сохранён в «Настройках» и «Оплате». Используйте его при оформлении подписки.',
    courseExplanation:'Пояснение:',
    courseCorrectAnswer:'Правильный ответ:',
    courseStartBlock:'Начать блок', courseContinueBlock:'Продолжить',
    courseLocked:'Пройдите предыдущий блок, чтобы открыть этот.'
  },
  en:{
    appName:'Tax Calculator', menu:'Menu', search:'Search', theme:'Theme',
    main:'Main', calculators:'Calculators', tools:'Tools', help:'Help', settings:'Settings',
    calc:'Tax calculation', limits:'Limits & forecast', risk:'Risk analysis', ben:'Benefits & holidays',
    comp:'Regime comparison', kpi:'KPI dashboard', sickleave:'Sick leave', vacation:'Vacation pay',
    maternity:'Maternity', bep:'Break-even point', roi:'ROI', cashflow:'Cash-flow',
    ndfl:'NDFL refund', journal:'Operations journal', scanner:'Receipt scanner', checklist:'IP/LLC checklist',
    heatmap:'Year heatmap', simulator:'Simulator', faq:'Knowledge base', course:'Mini-course',
    nk:'Tax Code offline', court:'Court practice', govproc:'Public procurement', cbr:'CBR/FNS', backup:'Backup',
    payment:'Payment',
    installPwa:'Install PWA', installPwaText:'Install the app on your device for offline access.',
    mode:'Tax regime', income:'Annual income, ₽', expenses:'Expenses, ₽',
    calculate:'Calculate', reset:'Reset', tax:'Tax', netIncome:'Net income', effRate:'Effective rate',
    insurance:'IP insurance contributions (2026)',
    insuranceSub:'Fixed part 57,390 ₽ + 1% over 300,000 ₽ (max 321,818 ₽).',
    quickTemplates:'Quick templates', quickTemplatesSub:'Apply typical business parameters.',
    history:'History', taxHistory:'Calculation history', add:'Add', cancel:'Cancel', close:'Close',
    save:'Save', delete:'Delete', clear:'Clear', export:'Export JSON', import:'Import', print:'Print',
    yes:'Yes', no:'No', all:'All', period:'Period', from:'From', to:'To', total:'Total',
    month:'Month', year:'Year', date:'Date', amount:'Amount, ₽', category:'Category', counterparty:'Counterparty',
    comment:'Comment', type:'Type', incomeType:'Income', expenseType:'Expense',
    profit:'Profit', margin:'Margin', avgCheck:'Average check', taxLoad:'Tax burden',
    revenue:'Revenue', expensesShort:'Expenses', operations:'Operations',
    region:'Region', regionLabel:'Russian Federation subject',
    regionSub:'Select a region — show regional law, rates and special conditions.',
    law:'Law', usnRate:'USN "Income"', usnDrRate:'USN "Income−Expenses"', status:'Status',
    federalBenefits:'Federal benefits 2026', holidayCheck:'Holiday eligibility check',
    holidayCheckSub:'Answer 3 questions — check if you can apply 0% rate.',
    holidayQ1:'You register as IP for the first time', holidayQ2:'You apply USN or PSN',
    holidayQ3:'Your region has a holiday law',
    holidayTitle:'Tax holidays 0%',
    holidayText:'for first-registered IP on USN and PSN up to 2 years (art. 346.20 of the Tax Code).',
    mspTitle:'Reduced SME contribution rates', mspText:'15% on payments above minimum wage.',
    itTitle:'IT companies', itText:'7.6% insurance contributions.',
    regionRatesTitle:'Regional USN rates',
    regionRatesText:'from 1% to 6% ("Income") and from 5% to 15% ("Income−Expenses").',
    modeQuiz:'Individual regime selection', modeQuizSub:'Answer 8 questions — we recommend the optimal regime.',
    recommendMode:'Recommend regime', compTable:'Comparison table',
    compTableSub:'Key parameters of tax regimes.',
    compCalc:'Comparison calculator', compCalcSub:'Enter income and expenses — see tax and net income for each regime.',
    ipVsEmployee:'IP vs employee', ipVsEmployeeSub:'Comparison of net income when working for yourself vs employment contract.',
    ipVsOoo:'IP vs LLC', ipVsOooSub:'Including accountant, director salary and dividends.',
    salaryVsDividends:'Salary vs dividends', salaryVsDividendsSub:'Comparison of tax burden when paying the owner.',
    leasing:'Leasing vs credit vs purchase', leasingSub:'Comparison of asset acquisition options.',
    industry:'Industry for comparison', buildChart:'Build', monthlyChart:'Monthly chart',
    downloadPdf:'Download PDF', downloadExcel:'Download Excel', downloadPng:'Download PNG', downloadCsv:'Download CSV',
    savePdf:'Save PDF', sickLeaveData:'Data for calculation', sickExp:'Insurance experience',
    sickDays:'Sick days', sickReason:'Reason', sickCoef:'Regional coefficient', sickLimits:'Limits 2026',
    sickBase2024:'Base 2024:', sickBase2025:'Base 2025:', sickMaxDaily:'Maximum per day:', sickMinDaily:'Minimum per day:',
    mrot:'Minimum wage 2026:', exp60:'Up to 5 years (60%)', exp80:'5–8 years (80%)', exp100:'Over 8 years (100%)',
    sickSelf:'Own illness', sickChild7:'Child care up to 7 years', sickChild15:'Child care 8–15 years',
    sickAdult:'Adult care', inc2024:'Income 2024, ₽', inc2025:'Income 2025, ₽',
    vacationData:'Data for calculation', vacIncome:'Income for 12 months, ₽', vacMonths:'Full months',
    vacDays:'Vacation days', vacExcl:'Excluded days', maternityData:'Data for calculation',
    maternityType:'Benefit type', bir140:'B&R — 140 days', bir156:'B&R — 156 days', bir194:'B&R — 194 days',
    matMinMonthly:'Minimum per month:', matMaxCare:'Maximum for care up to 1.5 years:',
    bepParams:'Parameters', bepFix:'Fixed costs/month, ₽', bepPrice:'Average price, ₽', bepVar:'Variable/unit, ₽',
    roiParams:'Parameters', roiInv:'Investment, ₽', roiProfit:'Profit/month, ₽', roiMonths:'Analysis period, months',
    cfParams:'Parameters', cfStart:'Starting balance, ₽', cfIncome:'Average income/month, ₽',
    cfExpense:'Average expense/month, ₽', cfSeason:'Seasonality', cfSeasonNone:'None', cfSeason20:'±20%', cfSeason50:'±50%',
    ndflIncomeTitle:'Income and paid tax', ndflPaid:'Paid NDFL, ₽', ndflExpenses:'Deduction expenses',
    ndflEduSelf:'Education (self/sibling), ₽', ndflEduChild:'Children education, ₽', ndflMed:'Medical (regular), ₽',
    ndflMedExp:'Expensive medical, ₽', ndflProp:'Property deduction (housing), ₽', ndflInterest:'Mortgage interest, ₽',
    ndflIis:'IIS, ₽', ndflFitness:'Fitness, ₽', addOperation:'Add operation', quickAdd:'Quick add operation',
    categories:'Manage categories', existingCategories:'Existing categories', newCategory:'New category',
    filterType:'Filter by type', filterCategory:'Category', arCamera:'AR camera',
    arCameraSub:'Point camera at FNS receipt QR. Auto-recognition via jsQR. For OCR text — shutter button.',
    arStart:'Start camera', arStop:'Stop', arCapture:'Capture (OCR)',
    uploadPhoto:'Upload photo from gallery', uploadPhotoSub:'JPG, PNG, PDF up to 10 MB. QR and text (OCR) recognition.',
    receiptsHistory:'Receipts history', duplicates:'Duplicates', checklistTitle:'Registration checklist',
    ip:'IP', ooo:'LLC', docsPackage:'Documents package', heatmapTitle:'Year heatmap 2026',
    heatmapLoad:'Load by months', event:'Event', eventTax:'tax', note:'Note', notePersonal:'personal',
    both:'Both', bothSub:'event + note', simulatorParams:'Parameters', simIncome:'Income:', simExpenses:'Expenses:',
    simEmployees:'Employees:', simSalary:'Salary:', simMode:'Regime', applyToCalc:'Apply to calculator',
    faqTitle:'FAQ', lifehacks:'Lifehacks', glossary:'Glossary', courseTitle:'Mini-course', courseLesson:'Lesson',
    courseOf:'of', courseNext:'Next', coursePrev:'Back', courseFinish:'Finish',
    courseCorrect:'Correct!', courseWrong:'Wrong.', nkTitle:'Tax Code offline', nkSearch:'Search articles',
    nkCategory:'Category', courtTitle:'Court practice', courtSearch:'Search by topic',
    govprocTitle:'Public procurement', govChecklist44:'Checklist 44-FZ (12 steps)',
    govChecklist223:'Checklist 223-FZ (8 steps)', govCompare:'IP vs LLC in procurement', govLinks:'Useful links',
    cbrTitle:'CBR/FNS actual info', cbrCb:'Central Bank of Russia', cbrFns:'Federal Tax Service',
    cbrLaws:'Laws and consultant', cbrCheck:'Counterparty check', cbrReg:'Registration and marking',
    keyRate:'Key rate', refRate:'Refinancing rate', currency:'Currency rates', fnsSite:'FNS website',
    nkPart1:'Tax Code part 1', nkPart2:'Tax Code part 2', kkt54fz:'54-FZ (KKT)', mrot2026:'Minimum wage 2026',
    egrul:'EGRUL/EGRIP', transparentBusiness:'Transparent business', disqualified:'Disqualified persons',
    fssp:'FSSP — enforcement proceedings', kad:'Arbitration case file',
    businessReg:'Business registration', gosuslugi:'Gosuslugi', myTax:'My tax (NPD)', lkIp:'IP personal account',
    chestnyZnak:'Chestny Znak', kktRegistry:'KKT registry', settingsTitle:'Settings', appearance:'Appearance',
    themeLabel:'Theme', themeLight:'Light', themeDark:'Dark', fontSize:'Font size (12–36 px)',
    fontPreview:'Font preview', fontPreviewText:'Sample text to evaluate font size. Tax calculator.',
    colorblind:'Colorblind mode', simpleMode:'Simple mode',
    sandbox:'Sandbox mode', sandboxOn:'On (data in memory)',
    on:'On', off:'Off', onboarding:'Onboarding', onboardingSub:'Show tutorial slides again.',
    showOnboarding:'Show onboarding', appPassword:'App password',
    appPasswordSub:'Protect access to data. Password stored as hash.',
    newPassword:'New password (4 digits)', repeatPassword:'Repeat password',
    savePassword:'Save password', removePassword:'Remove password',
    dataStats:'Data statistics', deleteData:'Delete data',
    deleteDataSub:'Deletes all data: journal, receipts, history, settings, notes.',
    deleteAllData:'Delete all data', backupExport:'Export', backupExportSub:'Save data to JSON or HTML report.',
    backupImport:'Import', backupImportSub:'Upload JSON or encrypted .enc file.',
    backupDemo:'Demo data', backupDemoSub:'Load examples to explore the app.',
    backupPassword:'Password (optional)', importPassword:'Password (if encrypted)',
    shareLink:'Share link', loadDemo:'Load demo', clearDemo:'Clear demo',
    htmlReport:'HTML report (PDF)', downloadJson:'Download JSON', installTitle:'App installation',
    installText:'Install the app on your device for quick access and offline work.',
    advantages:'Advantages:', advOffline:'Works without internet',
    advDesktop:'Launches from desktop', advNoBrowser:'No browser required',
    lockTitle:'Enter password', lockSub:'App is protected by password',
    obTitle1:'Tax Calculator',
    obText1:'Professional tax calculation for self-employed, IP and LLC. All 7 regimes, contributions, benefits.',
    obTitle2:'Operations journal', obText2:'Income and expense accounting, KPI dashboard, export to CSV, Excel and PDF.',
    obTitle3:'Receipt scanner', obText3:'FNS QR codes and receipt text recognition via AR camera or photo upload.',
    obTitle4:'Mini-course + discount', obText4:'Pass 5 blocks of questions — get a 20% discount promo code.',
    skip:'Skip', next:'Next', done:'Done', undo:'Undo', undoLabel:'Item deleted',
    simpleBanner:'Simple mode enabled. Only basic functions shown.',
    welcomeBanner:'Welcome back! You have not visited for over 24 hours.',
    exitSimple:'Disable', ok:'Ok',
    deleted:'Deleted', added:'Added', saved:'Saved', error:'Error', warning:'Warning', success:'Success',
    confirmDelete:'Are you sure you want to delete?',
    confirmClearAll:'Delete ALL data without recovery?',
    noData:'No data', loading:'Loading...', libError:'Library load error',
    offlineWarning:'No internet. Some features unavailable.',
    calcShort:'Calc', journalShort:'Journal', scannerShort:'Scanner', courseShort:'Course', more:'More',
    calcParams:'Calculation parameters',
    calcSub:'Select regime and enter data — calculator computes tax, contributions and net income.',
    modeNpd:'NPD (self-employed)', modeUsn6:'IP USN "Income" 6%', modeUsn15:'IP USN "Income−Expenses" 15%',
    modePsn:'PSN (patent)', modeOoo6:'LLC USN 6%', modeOoo15:'LLC USN 15%', modeEsxn:'ESKhN 6%',
    npdType:'Counterparty type (NPD)', npdLegal:'Legal entity / IP — 4%', npdPerson:'Individual — 6%',
    employees:'Have employees?', psnIncome:'Potential patent income, ₽',
    accIncome:'Accumulated income', accIncomeSub:'Indicators of approaching regime limits.',
    accIncomeLabel:'Accumulated income for year, ₽', forecast:'Forecast and chart',
    forecastSub:'Average monthly income → accumulated income forecast and threshold exceeding month.',
    avgIncome:'Average monthly income, ₽', riskForm:'Tax risk questionnaire',
    riskFormSub:'Answer questions — get risk level assessment and recommendations.',
    assessRisk:'Assess risk', industryManufacturing:'Manufacturing', industryRetail:'Retail',
    industryServices:'Services', industryOther:'Other',
    catContrib:'Contributions', catChecks:'Audits', catBanks:'Banks', eis:'EIS', rts:'RTS-tender',
    sberAst:'Sberbank-AST', eetp:'EETP',
    kpiCompare:'Industry comparison', above:'above', below:'below',
    simLimitEmployees:'Employee limit for USN exceeded (130) — switch to OSN.',
    simLimitPsn:'Employee limit for PSN exceeded (15) — patent unavailable.',
    simNpdNoEmployees:'NPD does not allow employees.',
    qrErrors:'FNS QR errors:', qrInvalid:'QR contains errors',
    historyCount:'Calculation history:', shareCopied:'Link copied',
    paymentPromo:'Promo code', paymentPromoSub:'Enter the promo code from the course for a 20% discount.',
    promoCode:'Promo code', apply:'Apply',
    paymentPlan:'Choose a plan', planMonth:'Month', planYear:'Year', payNow:'Pay',
    paymentStatus:'Subscription status',
    promoInvalid:'Promo code not found', promoEmpty:'Enter a promo code',
    promoUsed:'Promo code already used', promoApplied:'Promo applied. 20% discount.',
    promoNoCourse:'Complete the course first to get a promo code.',
    paymentNotReady:'Payment system will be connected later.',
    paymentSelected:'Selected: {0}',
    subscriptionActive:'Subscription active', subscriptionInactive:'No subscription',
    plan:'Plan', paidDate:'Payment date',
    courseBlocks:'Course blocks', courseBlockDone:'Completed', courseBlockLocked:'Locked',
    courseBlockInProgress:'In progress', courseQuestionOf:'Question {0} of {1}',
    courseErrorsTitle:'Errors in block', courseRetryErrors:'Retry errors',
    courseBlockPassed:'Block passed!', courseAllDone:'All blocks passed!',
    coursePromoTitle:'Your 20% discount promo code:',
    coursePromoNote:'Promo code saved in "Settings" and "Payment". Use it when subscribing.',
    courseExplanation:'Explanation:',
    courseCorrectAnswer:'Correct answer:',
    courseStartBlock:'Start block', courseContinueBlock:'Continue',
    courseLocked:'Complete the previous block to unlock this one.'
  }
};

var currentLang='ru';
function t(key){
  var lang=translations[currentLang]||translations.ru;
  return lang[key]||translations.ru[key]||key;
}
function tFormat(key,args){
  var s=t(key);
  if(!args)return s;
  return s.replace(/\{(\d+)\}/g,function(m,i){return args[i]!=null?args[i]:m;});
}
function setLanguage(lang){
  if(lang!=='ru'&&lang!=='en')return;
  currentLang=lang;
  Storage.set('lang',lang);
  var ru=document.getElementById('langRu');
  var en=document.getElementById('langEn');
  if(ru)ru.classList.toggle('active',lang==='ru');
  if(en)en.classList.toggle('active',lang==='en');
  applyTranslations();
  showToast(lang==='ru'?'Язык: Русский':'Language: English','info');
}
function applyTranslations(){
  document.querySelectorAll('[data-lang]').forEach(function(el){
    var key=el.getAttribute('data-lang');
    if(key){
      var txt=t(key);
      if(txt&&txt!==key)el.textContent=txt;
    }
  });
  document.title=t('appName');
  var si=document.getElementById('searchInput');
  if(si)si.placeholder=currentLang==='ru'?'Поиск: НК, судпрактика, курс, регионы, глоссарий... (Esc — закрыть)':'Search: Tax Code, court, course, regions, glossary... (Esc — close)';
}

/* ============================================================
   9. ДАННЫЕ: РЕГИОНЫ (89 субъектов)
   ============================================================ */
var regionsData=[
  {region:'Республика Адыгея',code:1,law:'Закон РА от 23.12.2015 № 363-З',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Республика Башкортостан',code:2,law:'Закон РБ от 30.11.2015 № 310-з',usnRate:6,usnDrRate:15,status:'Пониженные ставки для отдельных видов',activities:[]},
  {region:'Республика Бурятия',code:3,law:'Закон РБ от 26.11.2015 № 1939-V',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Республика Алтай',code:4,law:'Закон РА от 26.09.2016 № 50-РЗ',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Республика Дагестан',code:5,law:'Закон РД от 30.12.2015 № 97',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Республика Ингушетия',code:6,law:'Закон РИ от 24.11.2015 № 42-РЗ',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Кабардино-Балкарская Республика',code:7,law:'Закон КБР от 28.12.2015 № 44-РЗ',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Республика Калмыкия',code:8,law:'Закон РК от 28.12.2015 № 129-V-З',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Карачаево-Черкесская Республика',code:9,law:'Закон КЧР от 26.11.2015 № 74-РЗ',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Республика Карелия',code:10,law:'Закон РК от 25.12.2015 № 1945-ЗРК',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Республика Коми',code:11,law:'Закон РК от 29.10.2015 № 92-РЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Республика Марий Эл',code:12,law:'Закон РМЭ от 30.11.2015 № 24-З',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Республика Мордовия',code:13,law:'Закон РМ от 28.12.2015 № 98-З',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Республика Саха (Якутия)',code:14,law:'Закон РС(Я) от 23.12.2015 № 370-З',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Республика Северная Осетия — Алания',code:15,law:'Закон РСО-А от 25.11.2015 № 36-РЗ',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Республика Татарстан',code:16,law:'Закон РТ от 25.11.2015 № 18-ЗРТ',usnRate:1,usnDrRate:5,status:'УСН 1% для IT, 5% Д−Р',activities:[]},
  {region:'Республика Тыва',code:17,law:'Закон РТ от 25.11.2015 № 150-ЗРТ',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Удмуртская Республика',code:18,law:'Закон УР от 30.11.2015 № 76-РЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Республика Хакасия',code:19,law:'Закон РХ от 25.11.2015 № 101-ЗРХ',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Чеченская Республика',code:20,law:'Закон ЧР от 25.12.2015 № 55-РЗ',usnRate:6,usnDrRate:15,status:'Каникулы 0%',activities:[]},
  {region:'Чувашская Республика',code:21,law:'Закон ЧР от 30.11.2015 № 65',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Алтайский край',code:22,law:'Закон АК от 18.09.2015 № 81-ЗС',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Краснодарский край',code:23,law:'Закон КК от 08.12.2015 № 3267-КЗ',usnRate:1,usnDrRate:5,status:'УСН 1% для IT, 5% Д−Р',activities:[]},
  {region:'Красноярский край',code:24,law:'Закон КК от 24.11.2015 № 9-4327',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Приморский край',code:25,law:'Закон ПК от 30.12.2015 № 730-КЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Ставропольский край',code:26,law:'Закон СК от 27.11.2015 № 118-кз',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Хабаровский край',code:27,law:'Закон ХК от 25.11.2015 № 129',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Амурская область',code:28,law:'Закон АО от 25.11.2015 № 584-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Архангельская область',code:29,law:'Закон АО от 21.10.2015 № 360-31-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Астраханская область',code:30,law:'Закон АО от 12.10.2015 № 75/2015-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Белгородская область',code:31,law:'Закон БО от 24.12.2015 № 10',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Брянская область',code:32,law:'Закон БО от 30.12.2015 № 133-З',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Владимирская область',code:33,law:'Закон ВО от 17.12.2015 № 155-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Волгоградская область',code:34,law:'Закон ВО от 24.12.2015 № 237-ОД',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Вологодская область',code:35,law:'Закон ВО от 23.12.2015 № 3857-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Воронежская область',code:36,law:'Закон ВО от 25.12.2015 № 172-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Ивановская область',code:37,law:'Закон ИО от 28.12.2015 № 151-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Иркутская область',code:38,law:'Закон ИО от 21.12.2015 № 103-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Калининградская область',code:39,law:'Закон КО от 29.12.2015 № 506',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Калужская область',code:40,law:'Закон КО от 24.12.2015 № 821-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Камчатский край',code:41,law:'Закон КК от 10.12.2015 № 707',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Кемеровская область — Кузбасс',code:42,law:'Закон КО от 24.11.2015 № 99-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Кировская область',code:43,law:'Закон КО от 30.11.2015 № 586-ЗО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Костромская область',code:44,law:'Закон КО от 16.11.2015 № 782-5-ЗКО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Курганская область',code:45,law:'Закон КО от 30.11.2015 № 100',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Курская область',code:46,law:'Закон КО от 21.12.2015 № 112-ЗКО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Ленинградская область',code:47,law:'Закон ЛО от 27.11.2015 № 97-оз',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Липецкая область',code:48,law:'Закон ЛО от 26.11.2015 № 503-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Магаданская область',code:49,law:'Закон МО от 03.12.2015 № 1948-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Московская область',code:50,law:'Закон МО от 24.11.2015 № 226/2015-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Мурманская область',code:51,law:'Закон МО от 28.10.2015 № 1919-01-ЗМО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Нижегородская область',code:52,law:'Закон НО от 28.12.2015 № 190-З',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Новгородская область',code:53,law:'Закон НО от 30.11.2015 № 847-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Новосибирская область',code:54,law:'Закон НО от 01.12.2015 № 8-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Омская область',code:55,law:'Закон ОО от 26.11.2015 № 1830-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Оренбургская область',code:56,law:'Закон ОО от 18.12.2015 № 3671/956-V-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Орловская область',code:57,law:'Закон ОО от 25.12.2015 № 1884-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Пензенская область',code:58,law:'Закон ПО от 30.11.2015 № 2824-ЗПО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Пермский край',code:59,law:'Закон ПК от 30.11.2015 № 560-ПК',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Псковская область',code:60,law:'Закон ПО от 26.10.2015 № 1472-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Ростовская область',code:61,law:'Закон РО от 25.11.2015 № 457-ЗС',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Рязанская область',code:62,law:'Закон РО от 24.11.2015 № 94-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Самарская область',code:63,law:'Закон СО от 18.12.2015 № 135-ГД',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Саратовская область',code:64,law:'Закон СО от 30.11.2015 № 174-ЗСО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Сахалинская область',code:65,law:'Закон СО от 25.11.2015 № 99-ЗО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Свердловская область',code:66,law:'Закон СО от 30.11.2015 № 135-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Смоленская область',code:67,law:'Закон СО от 27.11.2015 № 125-З',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Тамбовская область',code:68,law:'Закон ТО от 30.11.2015 № 589-З',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Тверская область',code:69,law:'Закон ТО от 21.12.2015 № 126-ЗО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Томская область',code:70,law:'Закон ТО от 16.12.2015 № 146-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Тульская область',code:71,law:'Закон ТО от 23.11.2015 № 2361-ЗТО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Тюменская область',code:72,law:'Закон ТО от 11.12.2015 № 84',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Ульяновская область',code:73,law:'Закон УО от 25.12.2015 № 189-ЗО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Челябинская область',code:74,law:'Закон ЧО от 25.12.2015 № 279-ЗО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Забайкальский край',code:75,law:'Закон ЗК от 29.12.2015 № 1312-ЗЗК',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Ярославская область',code:76,law:'Закон ЯО от 25.11.2015 № 51-з',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'город Москва',code:77,law:'Закон г. Москвы от 18.03.2015 № 10',usnRate:1,usnDrRate:10,status:'УСН 1% для IT, производства, науки, соц/бытовых услуг; Д−Р 10%; каникулы 0%',activities:['IT','Производство','Наука','Соц/бытовые услуги']},
  {region:'город Санкт-Петербург',code:78,law:'Закон СПб от 17.12.2015 № 260-49',usnRate:1,usnDrRate:7,status:'УСН 1% для IT; Д−Р 7%; каникулы 0%',activities:['IT','Инновации']},
  {region:'Еврейская автономная область',code:79,law:'Закон ЕАО от 27.11.2015 № 838-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Ненецкий автономный округ',code:83,law:'Закон НАО от 02.12.2015 № 87-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Ханты-Мансийский автономный округ — Югра',code:86,law:'Закон ХМАО от 25.11.2015 № 117-оз',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Чукотский автономный округ',code:87,law:'Закон ЧАО от 30.11.2015 № 107-ОЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Ямало-Ненецкий автономный округ',code:89,law:'Закон ЯНАО от 25.11.2015 № 96-ЗАО',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Запорожская область',code:90,law:'Закон ЗО от 01.01.2024 № 12-З',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Республика Крым',code:91,law:'Закон РК от 19.11.2015 № 175-ЗРК/2015',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'город Севастополь',code:92,law:'Закон г. Севастополя от 26.11.2015 № 197-ЗС',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Донецкая Народная Республика',code:93,law:'Закон ДНР от 01.03.2023 № 6-РЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Луганская Народная Республика',code:94,law:'Закон ЛНР от 01.03.2023 № 5-РЗ',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]},
  {region:'Херсонская область',code:95,law:'Закон ХО от 01.01.2024 № 11-З',usnRate:6,usnDrRate:15,status:'Льгот нет',activities:[]}
];

/* ============================================================
   10. ДАННЫЕ: НК РФ (22 статьи)
   ============================================================ */
var nkArticlesData=[
  {article:'346.11',title:'УСН: общие положения',category:'УСН',text:'Применение УСН организациями и ИП предусматривает освобождение от обязанности по уплате налога на прибыль, НДФЛ, НДС (за исключением НДС при ввозе).',source:'НК РФ'},
  {article:'346.12',title:'УСН: кто не вправе применять',category:'УСН',text:'Не вправе применять УСН: организации с филиалами, банки, страховщики, НПФ, инвестиционные фонды, ломбарды и др.',source:'НК РФ'},
  {article:'346.13',title:'УСН: порядок начала и прекращения',category:'УСН',text:'Организации и ИП, изъявившие желание перейти на УСН, уведомляют налоговый орган до 31 декабря года, предшествующего году перехода.',source:'НК РФ'},
  {article:'346.14',title:'УСН: объекты налогообложения',category:'УСН',text:'Объект налогообложения: доходы; доходы, уменьшенные на величину расходов.',source:'НК РФ'},
  {article:'346.20',title:'УСН: налоговые ставки',category:'УСН',text:'Ставка 6% для объекта «доходы»; 15% для объекта «доходы минус расходы». Законы субъектов РФ могут устанавливать ставки от 1% до 6% и от 5% до 15%.',source:'НК РФ'},
  {article:'346.21',title:'УСН: порядок исчисления и уплаты',category:'УСН',text:'Налог исчисляется по итогам налогового периода. Авансовые платежи — по итогам отчётных периодов.',source:'НК РФ'},
  {article:'346.43',title:'ПСН: общие положения',category:'ПСН',text:'Патентная система применяется ИП в отношении отдельных видов предпринимательской деятельности.',source:'НК РФ'},
  {article:'346.45',title:'ПСН: порядок и сроки уплаты',category:'ПСН',text:'Патент выдаётся на срок от 1 до 12 месяцев. Сумма налога — 6% от потенциально возможного дохода.',source:'НК РФ'},
  {article:'346.2',title:'ЕСХН: общие положения',category:'ЕСХН',text:'ЕСХН применяется организациями и ИП, являющимися сельскохозяйственными товаропроизводителями (доля сельхоздохода не менее 70%).',source:'НК РФ'},
  {article:'427',title:'Пониженные тарифы страховых взносов',category:'Взносы',text:'Пониженные тарифы применяются для МСП, IT-компаний, НКО и др. Для МСП — 15% с выплат свыше МРОТ.',source:'НК РФ'},
  {article:'430',title:'Взносы ИП за себя',category:'Взносы',text:'ИП уплачивает фиксированные взносы + 1% с дохода свыше 300 000 ₽. В 2026 году фиксированные взносы — 57 390 ₽, максимум 321 818 ₽.',source:'НК РФ'},
  {article:'145',title:'Освобождение от НДС',category:'НДС',text:'Организации и ИП освобождаются от НДС, если выручка за 3 предшествующих месяца не превысила 2 млн ₽ (порог заморожен до 2029 на уровне 20 млн).',source:'НК РФ'},
  {article:'164',title:'НДС: налоговые ставки',category:'НДС',text:'Ставка НДС 22% (с 2026 года). Льготная 10% для продовольственных товаров, детских товаров, медицинских товаров.',source:'НК РФ'},
  {article:'171',title:'НДС: налоговые вычеты',category:'НДС',text:'Налогоплательщик вправе уменьшить общую сумму НДС на налоговые вычеты.',source:'НК РФ'},
  {article:'219',title:'НДФЛ: социальные вычеты',category:'НДФЛ',text:'Социальные вычеты: обучение (150 000 ₽ своё, 110 000 ₽ дети), лечение (150 000 ₽, дорогостоящее — без лимита), фитнес.',source:'НК РФ'},
  {article:'220',title:'НДФЛ: имущественные вычеты',category:'НДФЛ',text:'Имущественный вычет: до 2 000 000 ₽ на жильё, до 3 000 000 ₽ на проценты по ипотеке.',source:'НК РФ'},
  {article:'88',title:'Камеральная налоговая проверка',category:'Проверки',text:'Камеральная проверка проводится по месту нахождения налогового органа на основе деклараций и документов в течение 3 месяцев.',source:'НК РФ'},
  {article:'89',title:'Выездная налоговая проверка',category:'Проверки',text:'Выездная проверка проводится на территории налогоплательщика на основании решения руководителя налогового органа.',source:'НК РФ'},
  {article:'54.1',title:'Пределы осуществления прав',category:'Проверки',text:'Не допускается уменьшение налогоплательщиком налоговой базы в результате искажения сведений о фактах хозяйственной жизни.',source:'НК РФ'},
  {article:'122',title:'Неуплата или неполная уплата налога',category:'Проверки',text:'Штраф 20% от неуплаченной суммы; 40% — если деяние совершено умышленно.',source:'НК РФ'},
  {article:'54-ФЗ',title:'О применении ККТ',category:'ККТ',text:'Организации и ИП обязаны применять ККТ при расчётах. Исключения: НПД, ПСН (отдельные виды), торговля через автоматы.',source:'54-ФЗ'},
  {article:'115-ФЗ',title:'ПОД/ФТ',category:'Банки',text:'Кредитные организации обязаны выявлять подозрительные операции. Признаки: транзит, обналичка, разрыв НДС.',source:'115-ФЗ'}
];

/* ============================================================
   11. ДАННЫЕ: СУДЕБНАЯ ПРАКТИКА (8 кейсов)
   ============================================================ */
var courtCasesData=[
  {topic:'Дробление бизнеса',case:'ВС РФ № 305-ЭС18-23124 от 28.03.2019 (Афина)',situation:'Группа компаний использовала несколько юрлиц для снижения налоговой нагрузки.',decision:'Суд признал схему дроблением, доначислил налоги.',conclusion:'Разделение бизнеса без экономической цели — риск доначислений.'},
  {topic:'Самозанятые',case:'АС СКО № Ф08-255/2021 от 19.02.2021',situation:'ИП переоформил сотрудников на самозанятых.',decision:'Суд признал переквалификацию в трудовые отношения.',conclusion:'Нельзя заменять трудовые договоры самозанятостью.'},
  {topic:'115-ФЗ',case:'ВС РФ № 305-ЭС20-14025 от 21.12.2020',situation:'Банк заблокировал счёт по 115-ФЗ без достаточных оснований.',decision:'Суд встал на сторону клиента.',conclusion:'Банк обязан обосновывать блокировку.'},
  {topic:'НДС',case:'КС РФ № 1382-О от 20.07.2021',situation:'Спор о вычетах НДС при отсутствии контрагента.',decision:'КС разъяснил пределы ответственности налогоплательщика.',conclusion:'Вычет возможен при реальности операции.'},
  {topic:'УСН',case:'АС МО № Ф05-2452/2019 от 15.03.2019',situation:'Применение УСН при превышении лимита.',decision:'Суд подтвердил переход на ОСН с момента превышения.',conclusion:'Следите за лимитами УСН.'},
  {topic:'Проверки',case:'ВС РФ № 305-ЭС21-4331 от 19.05.2021',situation:'Спор о правомерности выездной проверки.',decision:'Суд признал проверку незаконной.',conclusion:'Проверка должна иметь законные основания.'},
  {topic:'Дробление бизнеса',case:'ВС РФ № 305-ЭС22-4784 от 06.05.2022',situation:'Использование ИП на УСН вместо работников.',decision:'Доначислены налоги.',conclusion:'Риск переквалификации в трудовые отношения.'},
  {topic:'Самозанятые',case:'АС УО № Ф09-2865/21 от 10.06.2021',situation:'Спор о статусе самозанятого.',decision:'Суд подтвердил правомерность статуса.',conclusion:'Реальность сделки важна для статуса.'}
];

/* ============================================================
   12. ДАННЫЕ: FAQ / ЛАЙФХАКИ / ГЛОССАРИЙ
   ============================================================ */
var faqData=[
  {q:'Кто может применять НПД?',a:'Физлица и ИП с доходом до 2.4 млн ₽/год, без сотрудников, не занимающиеся перепродажей товаров.'},
  {q:'Как перейти на УСН?',a:'Подать уведомление в ФНС до 31 декабря предшествующего года.'},
  {q:'Что такое патент?',a:'ПСН — режим для ИП с фиксированной стоимостью патента на срок от 1 до 12 месяцев.'},
  {q:'Обязательна ли ККТ?',a:'Да, для большинства режимов. Исключения: НПД, ПСН (отдельные виды), торговые автоматы.'},
  {q:'Можно ли совмещать режимы?',a:'Да, например УСН + ПСН, но нужно вести раздельный учёт.'}
];
var lifehacksData=[
  'Первый шаг — рассчитайте налог на всех доступных режимах.',
  'ИП на УСН 6% уменьшает налог на страховые взносы (100% без сотрудников, 50% с сотрудниками).',
  'Проверьте право на налоговые каникулы 0% в своём регионе.',
  'Патент часто выгоднее УСН для услуг с небольшим доходом.',
  'Следите за порогом НДС 20 млн ₽ — при превышении нужна регистрация как плательщика НДС.'
];
var glossaryData=[
  {term:'НПД',def:'Налог на профессиональный доход (самозанятость).'},
  {term:'УСН',def:'Упрощённая система налогообложения.'},
  {term:'ПСН',def:'Патентная система налогообложения.'},
  {term:'ЕСХН',def:'Единый сельскохозяйственный налог.'},
  {term:'НДС',def:'Налог на добавленную стоимость.'},
  {term:'Фикс. взносы ИП',def:'Обязательные страховые взносы ИП за себя.'},
  {term:'ККТ',def:'Контрольно-кассовая техника.'}
];

/* ============================================================
   13. ДАННЫЕ: КУРС (5 блоков × 15 вопросов)
   ============================================================ */
var courseData=[
  {
    id:1,
    title:'Налоговые режимы',
    desc:'НПД, УСН, ПСН, ЕСХН, ОСН — ставки, лимиты, условия',
    questions:[
      {q:'Кто может применять НПД?',options:['Все ИП','Физлица и ИП с доходом до 2,4 млн ₽/год без сотрудников','Только ООО','Только самозанятые с сотрудниками'],correct:1,explanation:'НПД доступен физлицам и ИП без наёмных сотрудников с годовым доходом до 2,4 млн ₽.'},
      {q:'Ставка НПД при расчётах с юрлицами?',options:['4%','6%','13%','15%'],correct:0,explanation:'С юрлицами — 4%, с физлицами — 6%.'},
      {q:'Лимит дохода для УСН в 2026 году?',options:['150 млн ₽','300 млн ₽','490,5 млн ₽','60 млн ₽'],correct:2,explanation:'Лимит 490,5 млн ₽ с учётом коэффициента-дефлятора.'},
      {q:'Лимит дохода для ПСН?',options:['60 млн ₽','150 млн ₽','490,5 млн ₽','2,4 млн ₽'],correct:0,explanation:'ПСН — 60 млн ₽ в год.'},
      {q:'Максимум сотрудников для УСН?',options:['15','50','100','130'],correct:3,explanation:'УСН — до 130 сотрудников.'},
      {q:'Максимум сотрудников для ПСН?',options:['5','15','30','50'],correct:1,explanation:'ПСН — до 15 сотрудников.'},
      {q:'Что такое ЕСХН?',options:['Единый социальный налог','Единый сельхозналог','Единый страховой взнос','Единый строительный налог'],correct:1,explanation:'ЕСХН — единый сельскохозяйственный налог, 6% с разницы Д−Р, доля сельхоздохода ≥70%.'},
      {q:'Можно ли совмещать УСН и ПСН?',options:['Нет','Да, с раздельным учётом','Только для ООО','Только при доходе до 1 млн'],correct:1,explanation:'Да, но нужен раздельный учёт доходов и расходов.'},
      {q:'Кто не вправе применять УСН?',options:['ИП без сотрудников','ООО с одним учредителем','Организации с филиалами','ИП с доходом 500 тыс.'],correct:2,explanation:'Организации с филиалами не вправе применять УСН.'},
      {q:'Ставка УСН «Д−Р» по умолчанию?',options:['5%','6%','10%','15%'],correct:3,explanation:'15%, регионы могут снижать до 5%.'},
      {q:'Минимальный налог на УСН «Д−Р»?',options:['0,5% от дохода','1% от дохода','2% от дохода','3% от дохода'],correct:1,explanation:'Если налог по Д−Р меньше 1% от дохода — платится 1% от дохода.'},
      {q:'Порог освобождения от НДС в 2026?',options:['2 млн ₽','10 млн ₽','20 млн ₽','60 млн ₽'],correct:2,explanation:'20 млн ₽ (заморожен до 2029).'},
      {q:'Ставка НДС в 2026?',options:['18%','20%','22%','25%'],correct:2,explanation:'С 2026 года — 22%.'},
      {q:'Что такое ОСН?',options:['Общая система','Основной социальный налог','Общий страховой взнос','Оптовая система'],correct:0,explanation:'ОСН — общая система налогообложения (налог на прибыль + НДС).'},
      {q:'Кто может применять ПСН?',options:['Только ООО','Только ИП','ИП и ООО','Только самозанятые'],correct:1,explanation:'ПСН — только для ИП, ООО не может.'}
    ]
  },
  {
    id:2,
    title:'Взносы и отчётность',
    desc:'Фиксированные взносы ИП, МРОТ, сроки уплаты, декларации',
    questions:[
      {q:'Фиксированные взносы ИП в 2026?',options:['40 000 ₽','45 842 ₽','57 390 ₽','60 000 ₽'],correct:2,explanation:'57 390 ₽ — фиксированная часть.'},
      {q:'Максимальные взносы ИП (1% с превышения)?',options:['200 000 ₽','321 818 ₽','400 000 ₽','500 000 ₽'],correct:1,explanation:'Максимум — 321 818 ₽.'},
      {q:'С какого дохода ИП платит 1% доп. взносов?',options:['Свыше 100 000 ₽','Свыше 200 000 ₽','Свыше 300 000 ₽','Свыше 500 000 ₽'],correct:2,explanation:'1% с дохода свыше 300 000 ₽.'},
      {q:'МРОТ 2026?',options:['22 440 ₽','25 000 ₽','27 093 ₽','30 000 ₽'],correct:2,explanation:'МРОТ 2026 — 27 093 ₽.'},
      {q:'Срок уплаты фиксированных взносов ИП?',options:['31 января','31 марта','28 декабря','31 декабря'],correct:2,explanation:'До 28 декабря текущего года.'},
      {q:'Срок уплаты 1% с дохода свыше 300 тыс.?',options:['1 апреля следующего года','1 июля следующего года','28 декабря текущего','31 декабря текущего'],correct:1,explanation:'До 1 июля следующего года.'},
      {q:'Срок сдачи декларации УСН за год?',options:['20 апреля','25 апреля','30 апреля','1 мая'],correct:1,explanation:'До 25 апреля.'},
      {q:'Срок сдачи декларации 3-НДФЛ?',options:['30 апреля','25 апреля','1 мая','30 июня'],correct:0,explanation:'До 30 апреля.'},
      {q:'Нужна ли декларация на НПД?',options:['Да, до 25 апреля','Да, до 30 апреля','Нет','Да, ежеквартально'],correct:2,explanation:'На НПД декларация не сдаётся.'},
      {q:'Нужна ли декларация на ПСН?',options:['Да, до 25 апреля','Да, ежеквартально','Нет','Только при превышении лимита'],correct:2,explanation:'На ПСН декларация не сдаётся.'},
      {q:'Ставка страховых взносов для МСП с выплат свыше МРОТ?',options:['15%','22%','30%','7,6%'],correct:0,explanation:'С 2023 года МСП платят 15% с выплат свыше МРОТ.'},
      {q:'Ставка страховых взносов для IT-компаний?',options:['7,6%','15%','22%','30%'],correct:0,explanation:'7,6% для аккредитованных IT-компаний.'},
      {q:'Срок сдачи 6-НДФЛ за год?',options:['25 февраля','30 апреля','25 апреля','1 марта'],correct:0,explanation:'До 25 февраля следующего года.'},
      {q:'Срок сдачи РСВ за год?',options:['25 января','25 февраля','25 марта','25 апреля'],correct:0,explanation:'До 25 января.'},
      {q:'Нужно ли ИП на НПД платить фиксированные взносы?',options:['Да, обязательно','Нет, НПД освобождает','Только 1%','Только при доходе выше 300 тыс.'],correct:1,explanation:'НПД освобождает от фиксированных взносов.'}
    ]
  },
  {
    id:3,
    title:'Лимиты, НДС, ККТ',
    desc:'Пороги доходов, регистрация плательщика НДС, кассовая техника',
    questions:[
      {q:'Лимит НПД?',options:['1 млн ₽','2,4 млн ₽','10 млн ₽','60 млн ₽'],correct:1,explanation:'НПД — 2,4 млн ₽/год.'},
      {q:'Лимит УСН?',options:['150 млн ₽','300 млн ₽','490,5 млн ₽','60 млн ₽'],correct:2,explanation:'УСН — 490,5 млн ₽ с учётом дефлятора.'},
      {q:'Лимит ПСН?',options:['60 млн ₽','150 млн ₽','490,5 млн ₽','2,4 млн ₽'],correct:0,explanation:'ПСН — 60 млн ₽/год.'},
      {q:'Лимит стоимости основных средств для УСН?',options:['50 млн ₽','100 млн ₽','150 млн ₽','200 млн ₽'],correct:2,explanation:'150 млн ₽ — лимит ОС для УСН.'},
      {q:'Что происходит при превышении лимита УСН?',options:['Автоматический штраф','Переход на ОСН с момента превышения','Переход на НПД','Ничего'],correct:1,explanation:'С момента превышения — переход на ОСН.'},
      {q:'Кто обязан применять ККТ?',options:['Только ООО','Только ИП','Все организации и ИП, кроме исключений','Только самозанятые'],correct:2,explanation:'ККТ обязательна для всех, кроме исключений (НПД, ПСН отдельные виды, торговые автоматы).'},
      {q:'Нужна ли ККТ самозанятым (НПД)?',options:['Да','Нет','Только при доходе выше 1 млн','Только при работе с юрлицами'],correct:1,explanation:'НПД освобождён от ККТ — чеки формируются в «Мой налог».'},
      {q:'Нужна ли ККТ на ПСН?',options:['Всегда','Только для отдельных видов','Никогда','Только для ООО'],correct:1,explanation:'На ПСН ККТ нужна только для отдельных видов деятельности.'},
      {q:'Срок регистрации ККТ после начала деятельности?',options:['До начала расчётов','В течение 10 дней','В течение 30 дней','До конца года'],correct:0,explanation:'ККТ нужно зарегистрировать до начала расчётов.'},
      {q:'Что такое фискальный накопитель?',options:['Программа','Устройство для хранения фискальных данных','Регистратор','Сервер'],correct:1,explanation:'ФН — устройство в составе ККТ для хранения чеков.'},
      {q:'Срок замены ФН (не для торговли)?',options:['13 месяцев','36 месяцев','15 месяцев','18 месяцев'],correct:1,explanation:'36 месяцев для большинства сфер (для торговли — 13).'},
      {q:'Когда наступает обязанность по НДС при превышении 20 млн?',options:['Сразу в том же месяце','Со следующего месяца','Со следующего квартала','Со следующего года'],correct:2,explanation:'С начала следующего квартала.'},
      {q:'Можно ли добровольно платить НДС при УСН?',options:['Да','Нет','Только ООО','Только ИП'],correct:0,explanation:'С 2025 года можно добровольно перейти на НДС.'},
      {q:'Что такое «разрыв НДС»?',options:['Штраф','Ситуация, когда контрагент не уплатил НДС','Ошибка в декларации','Возврат НДС'],correct:1,explanation:'Разрыв НДС — признак недобросовестного контрагента.'},
      {q:'Какая ставка НДС для детских товаров?',options:['10%','20%','22%','0%'],correct:0,explanation:'10% — льготная ставка для детских товаров.'}
    ]
  },
  {
    id:4,
    title:'Льготы, каникулы, оптимизация',
    desc:'Налоговые каникулы, региональные льготы, законная оптимизация',
    questions:[
      {q:'Кто может получить налоговые каникулы?',options:['Все ИП','Впервые зарегистрированные ИП на УСН/ПСН','Только ООО','Только самозанятые'],correct:1,explanation:'Впервые зарегистрированные ИП на УСН/ПСН — до 2 лет.'},
      {q:'Срок налоговых каникул?',options:['1 год','2 года','3 года','5 лет'],correct:1,explanation:'До 2 лет (ст. 346.20 НК РФ).'},
      {q:'Минимальная ставка УСН «Доходы» в регионе?',options:['0%','1%','3%','6%'],correct:1,explanation:'Регионы могут снижать до 1%.'},
      {q:'Минимальная ставка УСН «Д−Р» в регионе?',options:['1%','5%','7%','15%'],correct:1,explanation:'Регионы могут снижать до 5%.'},
      {q:'Что такое каникулы 0%?',options:['Освобождение от отчётности','Ставка 0% для новых ИП','Отмена взносов','Возврат налога'],correct:1,explanation:'Ставка 0% для впервые зарегистрированных ИП на УСН/ПСН.'},
      {q:'Можно ли уменьшить налог УСН 6% на взносы?',options:['Нет','Да, на 50%','Да, на 100% без сотрудников','Только на 1%'],correct:2,explanation:'100% без сотрудников, 50% с сотрудниками.'},
      {q:'Что относится к законной оптимизации?',options:['Дробление бизнеса','Серая зарплата','Выбор режима','Фиктивные сделки'],correct:2,explanation:'Выбор режима — законный способ.'},
      {q:'Что НЕ является законной оптимизацией?',options:['Региональные льготы','Соцвычеты','Дробление бизнеса','Каникулы'],correct:2,explanation:'Дробление бизнеса — риск доначислений.'},
      {q:'Можно ли ИП на УСН 6% уменьшить налог на 100% взносов?',options:['Только если нет сотрудников','Всегда','Только при доходе до 1 млн','Никогда'],correct:0,explanation:'100% — только без сотрудников.'},
      {q:'Что такое «налоговая нагрузка»?',options:['Сумма налога','Отношение налогов к выручке','Количество налогов','Штраф'],correct:1,explanation:'Налоговая нагрузка = налоги / выручка × 100%.'},
      {q:'Можно ли совмещать УСН и ЕСХН?',options:['Да','Нет','Только для ООО','Только для ИП'],correct:1,explanation:'Нет, это разные режимы.'},
      {q:'Что такое «упрощёнка»?',options:['УСН','ЕНВД','ПСН','НПД'],correct:0,explanation:'«Упрощёнка» — разговорное название УСН.'},
      {q:'Что даёт патент?',options:['Освобождение от ККТ','Фиксированную стоимость налога','Освобождение от взносов','Отмену декларации'],correct:1,explanation:'Патент — фиксированная стоимость на срок.'},
      {q:'Можно ли ИП на ПСН уменьшить налог на взносы?',options:['Да, на 100%','Да, на 50%','Нет','Только на 1%'],correct:0,explanation:'С 2023 года ИП на ПСН уменьшает налог на 100% взносов.'},
      {q:'Что такое «камеральная проверка»?',options:['Проверка на месте','Проверка деклараций без выезда','Обыск','Опрос'],correct:1,explanation:'Камеральная — без выезда к налогоплательщику.'}
    ]
  },
  {
    id:5,
    title:'Проверки, 115-ФЗ, судпрактика',
    desc:'Виды проверок, блокировки счетов, судебные кейсы',
    questions:[
      {q:'Срок камеральной проверки?',options:['1 месяц','3 месяца','6 месяцев','1 год'],correct:1,explanation:'3 месяца с даты подачи декларации.'},
      {q:'Срок выездной проверки?',options:['1 месяц','2 месяца','3 месяца (может продлеваться)','6 месяцев'],correct:2,explanation:'2 месяца, может продлеваться до 3 и более.'},
      {q:'Что проверяет 115-ФЗ?',options:['Налоги','ПОД/ФТ (отмывание)','Кассу','Трудовые договоры'],correct:1,explanation:'115-ФЗ — противодействие отмыванию доходов.'},
      {q:'Может ли банк заблокировать счёт по 115-ФЗ?',options:['Нет','Да, при подозрительных операциях','Только по решению суда','Только ФНС'],correct:1,explanation:'Да, при подозрительных операциях банк обязан сообщить в Росфинмониторинг.'},
      {q:'Что такое «дробление бизнеса»?',options:['Разделение компании на несколько юрлиц для снижения налогов','Реорганизация','Слияние','Ликвидация'],correct:0,explanation:'Дробление — риск признания схемы незаконной.'},
      {q:'Кейс «Афина» — о чём?',options:['О НДС','О дроблении бизнеса','О ККТ','О взносах'],correct:1,explanation:'ВС РФ признал дробление незаконным (дело «Афина»).'},
      {q:'Чем опасно переоформление сотрудников в самозанятых?',options:['Штрафом','Переквалификацией в трудовые отношения','Ничем','Потерей статуса ИП'],correct:1,explanation:'Суд может переквалифицировать в трудовые отношения и доначислить налоги.'},
      {q:'Что такое «фиктивная сделка»?',options:['Сделка без реальной цели','Обычная сделка','Экспорт','Импорт'],correct:0,explanation:'Фиктивная сделка — без реальной хозяйственной цели.'},
      {q:'Можно ли оспорить блокировку счёта?',options:['Нет','Да, в суде','Только через ФНС','Только через ЦБ'],correct:1,explanation:'Да, через суд или жалобу в ЦБ.'},
      {q:'Что такое «налоговая тайна»?',options:['Секретная информация ФНС','Данные о налогоплательщике','Штраф','Декларация'],correct:1,explanation:'Сведения о налогоплательщике, защищённые законом.'},
      {q:'Может ли ФНС доначислить налоги за 3 года?',options:['Нет','Да, в пределах 3 лет','Только за 1 год','Только за 5 лет'],correct:1,explanation:'Выездная проверка — за 3 предшествующих года.'},
      {q:'Что такое «встречная проверка»?',options:['Проверка контрагента','Проверка самого налогоплательщика','Проверка банка','Проверка суда'],correct:0,explanation:'Встречная — истребование документов у контрагента.'},
      {q:'Кто рассматривает налоговые споры?',options:['Только ФНС','Арбитражный суд','Полиция','Прокуратура'],correct:1,explanation:'Арбитражный суд — для ИП и организаций.'},
      {q:'Что такое «налоговое правонарушение»?',options:['Ошибка в декларации','Виновное противоправное деяние','Обычная сделка','Убыток'],correct:1,explanation:'Налоговое правонарушение — виновное деяние по НК РФ.'},
      {q:'Можно ли избежать штрафа при самостоятельной уплате?',options:['Нет','Да, при уплате недоимки и пеней до проверки','Только через суд','Только через ФНС'],correct:1,explanation:'При добровольной уплате — освобождение от штрафа (ст. 81 НК РФ).'}
    ]
  }
];

/* ============================================================
   14. ДАННЫЕ: ШАБЛОНЫ (16 штук)
   ============================================================ */
var quickTemplatesData=[
  {id:'freelance',name:'Фрилансер',mode:'npd',income:600000,expenses:0,npdType:'legal'},
  {id:'shop',name:'Магазин',mode:'usn6',income:3000000,expenses:0,employees:'yes'},
  {id:'cafe',name:'Кафе',mode:'usn15',income:5000000,expenses:3500000},
  {id:'it',name:'IT-компания',mode:'usn6',income:8000000,expenses:0,employees:'yes'},
  {id:'consult',name:'Консалтинг',mode:'npd',income:1200000,expenses:0,npdType:'legal'},
  {id:'production',name:'Производство',mode:'usn15',income:12000000,expenses:8000000},
  {id:'tutor',name:'Репетитор',mode:'npd',income:600000,expenses:0,npdType:'person'},
  {id:'marketplace',name:'Маркетплейс',mode:'usn6',income:5000000,expenses:0,employees:'yes'},
  {id:'dentist',name:'Стоматология',mode:'usn15',income:12000000,expenses:8000000},
  {id:'autoservice',name:'Автосервис',mode:'usn15',income:6000000,expenses:4000000},
  {id:'beauty',name:'Салон красоты',mode:'usn6',income:3500000,expenses:0,employees:'yes'},
  {id:'trucking',name:'Грузоперевозки',mode:'psn',income:1200000,expenses:0,psnIncome:1200000},
  {id:'agro',name:'Агробизнес',mode:'esxn',income:15000000,expenses:10000000},
  {id:'onlinestore',name:'Интернет-магазин',mode:'usn6',income:8000000,expenses:0,employees:'yes'},
  {id:'construction',name:'Строительная бригада',mode:'usn15',income:10000000,expenses:7000000},
  {id:'photographer',name:'Фотограф',mode:'npd',income:900000,expenses:0,npdType:'person'}
];

/* ============================================================
   15. КОНСТАНТЫ 2026
   ============================================================ */
var IP_CONTRIBUTIONS_2026={FIXED:57390,EXTRA_RATE:0.01,EXTRA_THRESHOLD:300000,EXTRA_MAX:321818};
var SICK_CONSTANTS={MAX_DAILY:6827.40,MIN_DAILY:890.72,BASE_2024:2225000,BASE_2025:2759000};
var MATERNITY_CONSTANTS={MAX_DAILY_2026:6827.40,MIN_MONTHLY:9227,MAX_MONTHLY_CARE:83021,BIR_DAYS:{bir:140,bir156:156,bir194:194}};
var NDFL_CONSTANTS={RATE:0.13,EDUCATION_SELF_LIMIT:150000,EDUCATION_CHILDREN_LIMIT:110000,MEDICINE_COMMON_LIMIT:150000,PROPERTY_COST_LIMIT:2000000,PROPERTY_INTEREST_LIMIT:3000000,IIS_LIMIT:400000};
var MIN_WAGE_2026=27093;
var VAT_THRESHOLD=20000000;
var USN_LIMIT=490500000;
var PSN_LIMIT=60000000;
var NPD_LIMIT=2400000;

/* ============================================================
   16. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
   ============================================================ */
var journalData=Storage.get('journalData',[]);
var receiptsData=Storage.get('receiptsData',[]);
var taxHistory=Storage.get('taxHistory',[]);
var riskAnswers=Storage.get('riskAnswers',{});
var calendarNotes=Storage.get('calendarNotes',{});
var checklistState=Storage.get('checklistState',{});
var customJournalCategories=Storage.get('customJournalCategories',{income:[],expense:[]});
var heatmapMonth=0;
var heatmapYear=2026;
var checklistType='ip';

var chartInstances={
  limits:null,
  kpi:null,
  bep:null,
  cf:null,
  sim:null
};

/* ============================================================
   17. КУРС — СОСТОЯНИЕ
   ============================================================ */
var courseState={
  currentBlock:null,
  currentQuestion:0,
  answers:{},
  errors:{},
  blocksDone:Storage.get('courseBlocksDone',{}),
  promoCode:Storage.get('promoCode',''),
  promoUsed:Storage.get('promoUsed',false)
};
if(courseState.promoCode){
  courseState.blocksDone=Storage.get('courseBlocksDone',{});
}

/* ============================================================
   18. ОПЛАТА — СОСТОЯНИЕ
   ============================================================ */
var paymentState={
  plan:null,
  promoApplied:false,
  subscription:Storage.get('subscription',{plan:null,paid:false,date:''})
};
