import { fr, type Content } from './fr'

// Arabic texts (Modern Standard Arabic, formal plural address). Read right to left.
// Same shape as fr.ts (checked by TypeScript).
// Numbers such as "2 500" use a narrow no-break space between the groups of digits:
// with an ordinary space, right-to-left text would show them as "500 2".
// TO REVIEW: written by a non-native author. Have a native speaker check it before it goes live.
export const ar: Content = {
  meta: {
    title: 'Classtra — تسيير المراكز',
    description:
      'Classtra: التسجيلات والحضور والمدفوعات والشهادات في مكان واحد، لمراكز التكوين ودروس الدعم في الجزائر.',
  },

  nav: {
    links: [
      { label: 'المزايا', href: '#features' },
      { label: 'الأسعار', href: '#pricing' },
    ],
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    ariaLabel: 'التنقل الرئيسي',
    menuLabel: 'فتح القائمة',
    menuTitle: 'القائمة',
    closeLabel: 'إغلاق',
    languageLabel: 'اللغة',
    toDark: 'التبديل إلى الوضع الداكن',
    toLight: 'التبديل إلى الوضع الفاتح',
  },

  hero: {
    badge: 'صُمِّم في الجزائر، لمراكز التكوين',
    titleStart: 'مركز التكوين الخاص بكم،',
    titleAccent: 'تحت السيطرة أخيرًا.',
    sub: 'التسجيلات والحضور والمدفوعات والشهادات في مكان واحد. للمدير والأمانة والمكوّنين.',
    primaryCta: { label: 'اطلبوا عرضًا توضيحيًا', href: '#contact' },
    secondaryCta: { label: 'اكتشفوا المزايا', href: '#features' },
    trust: [
      { icon: 'handyman', label: 'التثبيت في عين المكان' },
      { icon: 'groups', label: 'تكوين فريقكم' },
      { icon: 'support_agent', label: 'دعم مجاني طوال السنة' },
    ],
    cards: {
      dashboard: {
        title: 'لوحة التحكم',
        month: 'نوفمبر',
        kpis: [
          { label: 'التلاميذ النشطون', value: '248' },
          { label: 'الحضور', value: '94%' },
          { label: 'المدفوع هذا الشهر', value: '74%', accent: true },
        ],
        bars: fr.hero.cards.dashboard.bars,
      },
      attendance: {
        title: 'الحضور · بكالوريا رياضيات',
        days: [
          { day: 'أحد', state: 'present' },
          { day: 'إثنين', state: 'present' },
          { day: 'ثلاثاء', state: 'absent' },
          { day: 'أربعاء', state: 'present' },
          { day: 'خميس', state: 'empty' },
        ],
      },
      paymentsTitle: 'المدفوعات',
      payments: [
        { name: 'أمينة ب.', tag: 'مدفوع', status: 'paid' },
        { name: 'ياسين ك.', tag: 'القسط الثاني', status: 'partial' },
        { name: 'سارة م.', tag: 'متأخر', status: 'late' },
      ],
      receipt: { label: 'وصل', value: '2 500 دج', detail: 'ياسين ك. · نوفمبر' },
      certificate: { label: 'شهادة', value: 'إنجليزية B1', detail: 'أمينة ب.' },
      notification: '3 مدفوعات متأخرة',
      sampleLabel: 'بيانات تجريبية',
    },
  },

  tagline: fr.tagline,

  problems: {
    title: 'وداعًا للدفاتر وملفات إكسل والمدفوعات المنسية.',
    items: [
      { problem: 'من لم يدفع هذا الشهر؟', solution: 'قائمة المتأخرين بنقرة واحدة.' },
      { problem: 'دفتر الحضور الضائع', solution: 'تسجيل الحضور في 30 ثانية، مع حفظ تلقائي.' },
      { problem: 'شهادات تُكتب يدويًا', solution: 'تُطبع في لحظة، وعليها شعاركم.' },
    ],
  },

  features: {
    eyebrow: 'المزايا',
    title: 'كل ما يحتاجه المركز.',
    items: [
      {
        id: 'payments',
        icon: 'payments',
        title: 'المدفوعات والتذكيرات',
        text: 'تابعوا الأقساط والتأخيرات واطبعوا الوصولات. رقم أعمالكم الشهري في لمحة.',
      },
      {
        id: 'attendance',
        icon: 'fact_check',
        title: 'الحضور',
        text: 'تسجيل الحضور لكل فوج، من هاتف المكوّن.',
      },
      {
        id: 'enrolment',
        icon: 'person_add',
        title: 'التسجيلات',
        text: 'بطاقة واضحة لكل تلميذ، من الزيارة الأولى إلى نهاية التكوين.',
      },
      {
        id: 'certificates',
        icon: 'workspace_premium',
        title: 'الشهادات',
        text: 'تُنشأ تلقائيًا وتكون جاهزة للطباعة.',
      },
      {
        id: 'schedule',
        icon: 'calendar_month',
        title: 'الأفواج والقاعات',
        text: 'جداول زمنية حسب الفوج والمكوّن والقاعة، دون أي تعارض في المواعيد.',
      },
      {
        id: 'leads',
        icon: 'contact_phone',
        title: 'متابعة المهتمين',
        text: 'كل اتصال وكل زيارة، حتى إتمام التسجيل.',
      },
      {
        id: 'algeria',
        icon: 'flag',
        title: 'مصمَّم للجزائر',
        text: 'بالعربية والفرنسية والإنجليزية، مع الدفع بالدينار، وملائم للمراكز الجزائرية.',
        chips: ['2 500 دج', 'عربي · FR · EN'],
      },
    ],
    leadStages: ['اتصال', 'زيارة', 'مسجَّل'],
    samples: {
      payments: [
        { name: 'أمينة ب.', detail: 'بكالوريا رياضيات', tag: 'مدفوع', status: 'paid' },
        { name: 'ياسين ك.', detail: 'إنجليزية B1', tag: 'القسط الثاني', status: 'partial' },
        { name: 'سارة م.', detail: 'بكالوريا فيزياء', tag: 'متأخر', status: 'late' },
      ],
      attendance: ['أمينة ب.', 'ياسين ك.', 'سارة م.', 'ريان ت.', 'لينا ح.'],
      student: {
        initials: 'أب',
        name: 'أمينة بن علي',
        group: 'بكالوريا رياضيات · الفوج 2',
        phone: '0555 00 00 00',
      },
      certificate: { title: 'شهادة', course: 'إنجليزية B1', name: 'أمينة بن علي' },
      days: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس'],
    },
  },

  roles: {
    titleStart: 'كلٌّ يرى ما يعنيه.',
    titleSoft: 'لا أكثر.',
    tabsLabel: 'الأدوار',
    tabs: [
      {
        id: 'directeur',
        icon: 'monitoring',
        label: 'المدير',
        text: 'الأرقام والإيرادات ونظرة شاملة على كل فوج.',
      },
      {
        id: 'secretariat',
        icon: 'support_agent',
        label: 'الأمانة',
        text: 'التسجيلات والتحصيل والوصولات والاتصال بالأولياء.',
      },
      {
        id: 'formateurs',
        icon: 'co_present',
        label: 'المكوّنون',
        text: 'أفواجهم وجدولهم الزمني وتسجيل الحضور في القسم.',
      },
    ],
    previews: {
      directeur: {
        revenueLabel: 'الإيرادات · نوفمبر',
        revenue: '620 000 دج',
        lateLabel: 'مدفوعات متأخرة',
        late: '3',
        occupancyLabel: 'نسبة امتلاء الأفواج',
        groups: [
          { name: 'بكالوريا رياضيات', fill: 92 },
          { name: 'فيزياء', fill: 70 },
          { name: 'إنجليزية B1', fill: 55 },
        ],
      },
      secretariat: {
        title: 'مدفوعات اليوم',
        payments: [
          { name: 'ياسين ك.', detail: 'القسط الثاني · 2 500 دج' },
          { name: 'سارة م.', detail: 'الاشتراك الشهري · 3 000 دج' },
          { name: 'ريان ت.', detail: 'التسجيل · 1 000 دج' },
        ],
        collect: 'تحصيل',
        enrol: 'تسجيل جديد',
      },
      formateurs: {
        groupLabel: 'فوج اليوم',
        group: 'بكالوريا رياضيات · 14:00',
        room: 'القاعة 2',
        students: [
          { name: 'أمينة ب.', present: true },
          { name: 'ياسين ك.', present: true },
          { name: 'سارة م.', present: false },
          { name: 'ريان ت.', present: true },
        ],
        validate: 'تأكيد الحضور',
      },
    },
  },

  how: {
    eyebrow: 'كيف يعمل',
    title: 'نأتي إليكم. نثبّت النظام. نكوّن فريقكم.',
    steps: [
      {
        title: 'تقدّمون الطلب',
        text: 'املؤوا الاستمارة، وسنتصل بكم في اليوم نفسه.',
      },
      {
        title: 'نثبّت النظام في عين المكان',
        text: 'ندخل بيانات تلاميذكم ونكوّن أمانتكم داخل مركزكم.',
      },
      {
        title: 'تسيّرون مركزكم بكل طمأنينة',
        text: 'وعند الحاجة، فريقنا في خدمتكم من الصباح إلى المساء، مجانًا، طوال السنة.',
      },
    ],
  },

  pricing: {
    eyebrow: 'الأسعار',
    title: 'أسعار واضحة. دون مفاجآت.',
    sub: 'جميع المزايا متوفرة في كل صيغة.',
    switchLabel: 'الصيغة',
    currency: 'دج',
    plans: [
      {
        id: 'mensuel',
        label: 'شهري',
        unit: '/ الشهر',
        note: 'للبدء دون التزام.',
        choose: 'اختيار الصيغة الشهرية',
      },
      {
        id: 'semestre',
        label: '6 أشهر',
        unit: '',
        note: 'سداسي كامل بدفعة واحدة.',
        choose: 'اختيار صيغة 6 أشهر',
      },
      {
        id: 'annuel',
        label: 'سنوي',
        unit: '/ السنة',
        badge: 'الأفضل قيمة',
        note: 'توفّرون 15 000 دج مقارنة بالصيغة الشهرية.',
        choose: 'اختيار الصيغة السنوية',
      },
    ],
    includedTitle: 'متوفر في كل صيغة',
    included: [
      'حتى 600 تلميذ',
      'التثبيت في عين المكان',
      'إدخال بيانات تلاميذكم',
      'تكوين فريقكم',
      'دعم مجاني طوال السنة',
      'التحديثات مشمولة',
      'نسخ احتياطي تلقائي',
    ],
    extraStudents: 'أكثر من 600 تلميذ؟ 5 500 دج عن كل 500 تلميذ إضافي.',
    footnote: 'التثبيت وإدخال بيانات تلاميذكم والتكوين في عين المكان مشمولة. دون أي رسوم خفية.',
  },

  faq: {
    title: 'الأسئلة الشائعة',
    items: [
      {
        q: 'لستُ متمكّنًا من الإعلام الآلي. هل الاستعمال معقّد؟',
        a: 'لا. نتكفّل بتثبيت كل شيء ونكوّن فريقكم في عين المكان، داخل مركزكم.',
      },
      {
        q: 'هل بياناتي في أمان؟',
        a: 'نعم. لكل مستخدم كلمة مرور خاصة به، ولا يرى إلا ما يعنيه. تُحفظ بياناتكم تلقائيًا ولا تُشارَك ولا تُباع أبدًا.',
      },
      {
        q: 'هل يعمل على الهاتف؟',
        a: 'نعم، على الحاسوب واللوحة الإلكترونية والهاتف.',
      },
      {
        q: 'كيف يتم الدفع؟',
        a: 'نقدًا أو عبر بريدي موب. وستتوفر وسائل دفع أخرى قريبًا.',
      },
    ],
  },

  contact: {
    titleStart: 'هل أنتم مستعدون لاستعادة',
    titleAccent: 'السيطرة',
    titleEnd: 'على مركزكم؟',
    sub: 'اتركوا لنا بياناتكم. سنتصل بكم ونزوركم لتقديم عرض توضيحي.',
    fields: {
      center: 'اسم المركز',
      name: 'اسمكم',
      phone: 'الهاتف',
      wilaya: 'الولاية',
      plan: 'الصيغة',
      payment: 'طريقة الدفع',
    },
    payments: [
      { id: 'cash', label: 'نقدًا', hint: 'يدًا بيد' },
      { id: 'online', label: 'الدفع الإلكتروني', hint: 'متوفر قريبًا' },
    ],
    phonePlaceholder: '0550 00 00 00',
    wilayaPlaceholder: 'اختاروا…',
    errors: {
      center: 'يرجى إدخال اسم مركزكم.',
      name: 'يرجى إدخال اسمكم.',
      phone: 'يرجى إدخال 10 أرقام تبدأ بـ 05 أو 06 أو 07.',
      wilaya: 'يرجى اختيار ولايتكم.',
    },
    submit: 'اطلبوا اتصالًا',
    success: 'شكرًا لكم. سنتصل بكم في أقرب وقت.',
  },

  auth: {
    tabsLabel: 'الحساب',
    back: 'اكتشفوا Classtra',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
    login: {
      tab: 'تسجيل الدخول',
      title: 'تسجيل الدخول',
      sub: 'ادخلوا إلى فضاء تسيير مؤسستكم.',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'name@school.dz',
      password: 'كلمة المرور',
      submit: 'تسجيل الدخول',
      forgot: 'هل نسيتم كلمة المرور؟',
      notice: 'شكرًا لكم. سيُفعَّل تسجيل الدخول قريبًا جدًا.',
    },
    signup: {
      tab: 'إنشاء حساب',
      title: 'أنشئوا حسابكم',
      sub: 'جهّزوا فضاءكم من الآن: ستُستعمل هذه المعلومات عند اختياركم للصيغة.',
      establishmentTitle: 'مؤسستكم',
      establishment: 'اسم المؤسسة',
      establishmentPlaceholder: 'مثال: مدرسة ابن سينا',
      type: 'نوع المؤسسة',
      types: [
        { id: 'training', label: 'مركز تكوين' },
        { id: 'tutoring', label: 'مركز دروس الدعم' },
        { id: 'private', label: 'مدرسة خاصة' },
        { id: 'languages', label: 'مدرسة لغات' },
        { id: 'other', label: 'أخرى' },
      ],
      wilaya: 'الولاية',
      directorTitle: 'حساب المدير',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'director@school.dz',
      phone: 'الهاتف المحمول',
      password: 'كلمة المرور',
      passwordHint: '10 أحرف على الأقل، منها حرف كبير ورقم.',
      terms: {
        before: 'بإنشاء حسابكم، توافقون على',
        sales: 'الشروط العامة للبيع',
        and: 'وعلى',
        privacy: 'سياسة الخصوصية',
      },
      submit: 'إنشاء حسابي',
      notice: 'شكرًا لكم. سيُفعَّل إنشاء الحسابات قريبًا جدًا.',
    },
    errors: {
      email: 'يرجى إدخال بريد إلكتروني صحيح.',
      passwordRequired: 'يرجى إدخال كلمة المرور.',
      establishment: 'يرجى إدخال اسم المؤسسة.',
      wilaya: 'يرجى اختيار ولايتكم.',
      fullName: 'يرجى إدخال اسمكم الكامل.',
      phone: 'يرجى إدخال 10 أرقام تبدأ بـ 05 أو 06 أو 07.',
      password: 'يجب أن تتكوّن كلمة المرور من 10 أحرف على الأقل، منها حرف كبير ورقم.',
    },
  },

  footer: {
    columns: {
      product: {
        title: 'المنتج',
        links: [
          { label: 'المزايا', href: '#features' },
          { label: 'كيف يعمل', href: '#how' },
          { label: 'الأسعار', href: '#pricing' },
          { label: 'الأسئلة', href: '#faq' },
        ],
      },
      company: {
        title: 'الشركة',
        links: [
          { label: 'عن Nuestra-Tech', href: '#' },
          { label: 'اطلبوا عرضًا توضيحيًا', href: '#contact' },
        ],
      },
      contact: {
        title: 'اتصلوا بنا',
        phone: '[الهاتف]',
        email: '[البريد الإلكتروني]',
        instagram: '[INSTAGRAM]',
        facebook: '[FACEBOOK]',
      },
      legal: {
        title: 'معلومات قانونية',
        links: [
          { label: 'الإشعارات القانونية', href: '#' },
          { label: 'سياسة الخصوصية', href: '#' },
        ],
      },
    },
    tagline: 'منتج من Nuestra-Tech · صُمِّم في الجزائر',
    copyright: '© 2026 Nuestra-Tech',
  },

  // Same order as fr.wilayas: the form sends the French name, this is only what is shown.
  wilayas: [
    'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار',
    'البليدة', 'البويرة', 'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر',
    'الجلفة', 'جيجل', 'سطيف', 'سعيدة', 'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة',
    'قسنطينة', 'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة', 'وهران', 'البيض',
    'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي',
    'خنشلة', 'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت',
    'غرداية', 'غليزان', 'تيميمون', 'برج باجي مختار', 'أولاد جلال', 'بني عباس',
    'عين صالح', 'عين قزام', 'تقرت', 'جانت', 'المغير', 'المنيعة',
  ],
}
