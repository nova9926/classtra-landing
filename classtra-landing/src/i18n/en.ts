import { fr, type Content } from './fr'

// English texts. Formal register, British spelling. Same shape as fr.ts (checked by TypeScript).
export const en: Content = {
  meta: {
    title: 'Classtra — Centre management',
    description:
      'Classtra: enrolments, attendance, payments and certificates in one place, for training and tutoring centres in Algeria.',
  },

  nav: {
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
    ],
    login: 'Sign in',
    signup: 'Create an account',
    ariaLabel: 'Main navigation',
    menuLabel: 'Open the menu',
    menuTitle: 'Menu',
    closeLabel: 'Close',
    languageLabel: 'Language',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
  },

  hero: {
    badge: 'Designed in Algeria, for training centres',
    titleStart: 'Your training centre,',
    titleAccent: 'finally under control.',
    sub: 'Enrolments, attendance, payments and certificates in one place. For the director, the administrative office and the trainers.',
    primaryCta: { label: 'Request a demonstration', href: '#contact' },
    secondaryCta: { label: 'View the features', href: '#features' },
    trust: [
      { icon: 'handyman', label: 'On-site installation' },
      { icon: 'groups', label: 'Training for your team' },
      { icon: 'support_agent', label: 'Free support all year round' },
    ],
    cards: {
      dashboard: {
        title: 'Dashboard',
        month: 'November',
        kpis: [
          { label: 'Active students', value: '248' },
          { label: 'Attendance', value: '94%' },
          { label: 'Paid this month', value: '74%', accent: true },
        ],
        bars: fr.hero.cards.dashboard.bars,
      },
      attendance: {
        title: 'Attendance · BAC Maths',
        days: [
          { day: 'Sun', state: 'present' },
          { day: 'Mon', state: 'present' },
          { day: 'Tue', state: 'absent' },
          { day: 'Wed', state: 'present' },
          { day: 'Thu', state: 'empty' },
        ],
      },
      paymentsTitle: 'Payments',
      payments: [
        { name: 'Amina B.', tag: 'Paid', status: 'paid' },
        { name: 'Yacine K.', tag: '2nd instalment', status: 'partial' },
        { name: 'Sara M.', tag: 'Overdue', status: 'late' },
      ],
      receipt: { label: 'Receipt', value: '2 500 DA', detail: 'Yacine K. · November' },
      certificate: { label: 'Certificate', value: 'English B1', detail: 'Amina B.' },
      notification: '3 overdue payments',
      sampleLabel: 'Sample data',
    },
  },

  tagline: fr.tagline,

  problems: {
    title: 'No more notebooks, Excel files or forgotten payments.',
    items: [
      {
        problem: 'Who has not paid this month?',
        solution: 'The list of overdue payments in one click.',
      },
      {
        problem: 'The lost attendance register',
        solution: 'Roll call in 30 seconds, saved automatically.',
      },
      {
        problem: 'Certificates written out by hand',
        solution: 'Printed in an instant, with your logo.',
      },
    ],
  },

  features: {
    eyebrow: 'Features',
    title: 'Everything a centre needs.',
    items: [
      {
        id: 'payments',
        icon: 'payments',
        title: 'Payments & reminders',
        text: 'Track instalments and overdue payments, and print receipts. Your monthly revenue at a glance.',
      },
      {
        id: 'attendance',
        icon: 'fact_check',
        title: 'Attendance',
        text: "Roll call by group, from the trainer's phone.",
      },
      {
        id: 'enrolment',
        icon: 'person_add',
        title: 'Enrolments',
        text: 'A clear record for each student, from the first visit to the end of the course.',
      },
      {
        id: 'certificates',
        icon: 'workspace_premium',
        title: 'Certificates',
        text: 'Generated automatically, ready to print.',
      },
      {
        id: 'schedule',
        icon: 'calendar_month',
        title: 'Groups & rooms',
        text: 'Timetables by group, trainer and room, with no scheduling conflicts.',
      },
      {
        id: 'leads',
        icon: 'contact_phone',
        title: 'Lead tracking',
        text: 'Every call and every visit, through to enrolment.',
      },
      {
        id: 'algeria',
        icon: 'flag',
        title: 'Designed for Algeria',
        text: 'In French, Arabic and English, with payments in dinars, suited to Algerian centres.',
        chips: ['2 500 DA', 'FR · عربي · EN'],
      },
    ],
    leadStages: ['Call', 'Visit', 'Enrolled'],
    samples: {
      payments: [
        { name: 'Amina B.', detail: 'BAC Maths', tag: 'Paid', status: 'paid' },
        { name: 'Yacine K.', detail: 'English B1', tag: '2nd instalment', status: 'partial' },
        { name: 'Sara M.', detail: 'BAC Physics', tag: 'Overdue', status: 'late' },
      ],
      attendance: fr.features.samples.attendance,
      student: {
        initials: 'AB',
        name: 'Amina Benali',
        group: 'BAC Maths · Group 2',
        phone: '0555 00 00 00',
      },
      certificate: { title: 'Certificate', course: 'English B1', name: 'Amina Benali' },
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
    },
  },

  roles: {
    titleStart: 'Everyone sees what concerns them.',
    titleSoft: 'Nothing more.',
    tabsLabel: 'Roles',
    tabs: [
      {
        id: 'directeur',
        icon: 'monitoring',
        label: 'Director',
        text: 'Figures, revenue and an overview of every group.',
      },
      {
        id: 'secretariat',
        icon: 'support_agent',
        label: 'Administration',
        text: 'Enrolments, payment collection, receipts and calls to parents.',
      },
      {
        id: 'formateurs',
        icon: 'co_present',
        label: 'Trainers',
        text: 'Their groups, their timetable and roll call in class.',
      },
    ],
    previews: {
      directeur: {
        revenueLabel: 'Revenue · November',
        revenue: '620 000 DA',
        lateLabel: 'Overdue payments',
        late: '3',
        occupancyLabel: 'Group occupancy',
        groups: [
          { name: 'BAC Maths', fill: 92 },
          { name: 'Physics', fill: 70 },
          { name: 'English B1', fill: 55 },
        ],
      },
      secretariat: {
        title: "Today's payments",
        payments: [
          { name: 'Yacine K.', detail: '2nd instalment · 2 500 DA' },
          { name: 'Sara M.', detail: 'Monthly fee · 3 000 DA' },
          { name: 'Rayan T.', detail: 'Enrolment · 1 000 DA' },
        ],
        collect: 'Collect',
        enrol: 'New enrolment',
      },
      formateurs: {
        groupLabel: "Today's group",
        group: 'BAC Maths · 2:00 pm',
        room: 'Room 2',
        students: fr.roles.previews.formateurs.students,
        validate: 'Confirm roll call',
      },
    },
  },

  how: {
    eyebrow: 'How it works',
    title: 'We come to you. We install. We train your team.',
    steps: [
      {
        title: 'You submit a request',
        text: 'Complete the form. We call you back the same day.',
      },
      {
        title: 'We install on site',
        text: 'We import your student records and train your administrative staff at your centre.',
      },
      {
        title: 'You manage with peace of mind',
        text: 'Should you need it, our team is available from morning to evening, free of charge, all year round.',
      },
    ],
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'Clear prices. No surprises.',
    sub: 'Every feature is included in every plan.',
    switchLabel: 'Plan',
    currency: 'DA',
    plans: [
      {
        id: 'mensuel',
        label: 'Monthly',
        unit: '/ month',
        note: 'Start with no commitment.',
        choose: 'Choose the monthly plan',
      },
      {
        id: 'semestre',
        label: '6 months',
        unit: '',
        note: 'One semester settled in a single payment.',
        choose: 'Choose the 6-month plan',
      },
      {
        id: 'annuel',
        label: 'Annual',
        unit: '/ year',
        badge: 'Best value',
        note: 'You save 15 000 DA compared with the monthly plan.',
        choose: 'Choose the annual plan',
      },
    ],
    includedTitle: 'Included in every plan',
    included: [
      'Up to 600 students',
      'On-site installation',
      'Import of your student records',
      'Training for your team',
      'Free support all year round',
      'Updates included',
      'Automatic backups',
    ],
    extraStudents: 'More than 600 students? 5 500 DA for each additional 500 students.',
    footnote:
      'Installation, import of your student records and on-site training are included. No hidden fees.',
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'I am not comfortable with computers. Is it complicated?',
        a: 'No. We install everything and train your team on site, at your centre.',
      },
      {
        q: 'Is my data secure?',
        a: 'Yes. Each user has an individual password and sees only what concerns them. Your data is backed up automatically and is never shared or sold.',
      },
      {
        q: 'Does it work on a phone?',
        a: 'Yes, on computers, tablets and phones.',
      },
      {
        q: 'How do I pay?',
        a: 'In cash or via BaridiMob. Further payment methods will be available soon.',
      },
    ],
  },

  contact: {
    titleStart: 'Ready to take back',
    titleAccent: 'control',
    titleEnd: 'of your centre?',
    sub: 'Leave us your details. We will call you back and visit you for a demonstration.',
    fields: {
      center: 'Centre name',
      name: 'Your name',
      phone: 'Phone',
      wilaya: 'Wilaya',
      plan: 'Plan',
      payment: 'Payment method',
    },
    payments: [
      { id: 'cash', label: 'Cash', hint: 'Paid in person' },
      { id: 'online', label: 'Electronic payment', hint: 'Available soon' },
    ],
    phonePlaceholder: '0550 00 00 00',
    wilayaPlaceholder: 'Select…',
    errors: {
      center: 'Please enter the name of your centre.',
      name: 'Please enter your name.',
      phone: 'Please enter 10 digits, starting with 05, 06 or 07.',
      wilaya: 'Please select your wilaya.',
    },
    submit: 'Request a call back',
    success: 'Thank you. We will call you back very shortly.',
  },

  auth: {
    tabsLabel: 'Account',
    back: 'Discover Classtra',
    showPassword: 'Show the password',
    hidePassword: 'Hide the password',
    login: {
      tab: 'Sign in',
      title: 'Sign in',
      sub: 'Access the management area of your establishment.',
      email: 'Email address',
      emailPlaceholder: 'name@school.dz',
      password: 'Password',
      submit: 'Sign in',
      forgot: 'Forgotten your password?',
      notice: 'Thank you. Sign-in will be enabled very shortly.',
    },
    signup: {
      tab: 'Create an account',
      title: 'Create your account',
      sub: 'Prepare your workspace now: this information will be used when you choose your plan.',
      establishmentTitle: 'Your establishment',
      establishment: 'Name of the establishment',
      establishmentPlaceholder: 'E.g. Ibn Sina School',
      type: 'Type of establishment',
      types: [
        { id: 'training', label: 'Training centre' },
        { id: 'tutoring', label: 'Tutoring centre' },
        { id: 'private', label: 'Private school' },
        { id: 'languages', label: 'Language school' },
        { id: 'other', label: 'Other' },
      ],
      wilaya: 'Wilaya',
      directorTitle: 'Your director account',
      fullName: 'Full name',
      email: 'Email address',
      emailPlaceholder: 'director@school.dz',
      phone: 'Mobile phone',
      password: 'Password',
      passwordHint: 'At least 10 characters, including 1 capital letter and 1 digit.',
      terms: {
        before: 'By creating your account, you accept the',
        sales: 'general terms and conditions of sale',
        and: 'and the',
        privacy: 'privacy policy',
      },
      submit: 'Create my account',
      notice: 'Thank you. Account creation will be enabled very shortly.',
    },
    errors: {
      email: 'Please enter a valid email address.',
      passwordRequired: 'Please enter your password.',
      establishment: 'Please enter the name of the establishment.',
      wilaya: 'Please select your wilaya.',
      fullName: 'Please enter your full name.',
      phone: 'Please enter 10 digits, starting with 05, 06 or 07.',
      password: 'The password must contain at least 10 characters, including 1 capital letter and 1 digit.',
    },
  },

  footer: {
    columns: {
      product: {
        title: 'Product',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'How it works', href: '#how' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Questions', href: '#faq' },
        ],
      },
      company: {
        title: 'Company',
        links: [
          { label: 'About Nuestra-Tech', href: '#' },
          { label: 'Request a demonstration', href: '#contact' },
        ],
      },
      contact: {
        title: 'Contact',
        phone: '[PHONE]',
        email: '[EMAIL]',
        instagram: '[INSTAGRAM]',
        facebook: '[FACEBOOK]',
      },
      legal: {
        title: 'Legal information',
        links: [
          { label: 'Legal notice', href: '#' },
          { label: 'Privacy policy', href: '#' },
        ],
      },
    },
    tagline: 'A Nuestra-Tech product · Designed in Algeria',
    copyright: '© 2026 Nuestra-Tech',
  },

  // Place names keep their usual Latin spelling.
  wilayas: fr.wilayas,
}
