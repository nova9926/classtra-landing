import type { DayState, EstablishmentId, PayStatus, PaymentId, PlanId, RoleId } from './types'

// French texts (the default language). Formal register: "nous" and "vous", no "on", no "ça".
// en.ts and ar.ts must have exactly the same shape: TypeScript checks it (type Content).
// Prices are not here: they live once in src/siteConfig.ts.
export const fr = {
  meta: {
    title: 'Classtra — Gestion de centre',
    description:
      'Classtra : inscriptions, présences, paiements et attestations réunis au même endroit, pour les centres de formation et de soutien scolaire en Algérie.',
  },

  nav: {
    links: [
      { label: 'Fonctionnalités', href: '#features' },
      { label: 'Tarifs', href: '#pricing' },
    ],
    login: 'Se connecter',
    signup: 'Créer un compte',
    ariaLabel: 'Navigation principale',
    menuLabel: 'Ouvrir le menu',
    menuTitle: 'Menu',
    closeLabel: 'Fermer',
    languageLabel: 'Langue',
    toDark: 'Passer en mode sombre',
    toLight: 'Passer en mode clair',
  },

  hero: {
    badge: 'Conçu en Algérie, pour les centres de formation',
    titleStart: 'Votre centre de formation,',
    titleAccent: 'enfin sous contrôle.',
    sub: 'Inscriptions, présences, paiements et attestations réunis au même endroit. Pour le directeur, le secrétariat et les formateurs.',
    primaryCta: { label: 'Demander une démonstration', href: '#contact' },
    secondaryCta: { label: 'Voir les fonctionnalités', href: '#features' },
    trust: [
      { icon: 'handyman', label: 'Installation sur place' },
      { icon: 'groups', label: 'Formation de votre équipe' },
      { icon: 'support_agent', label: "Assistance gratuite toute l'année" },
    ],
    cards: {
      dashboard: {
        title: 'Tableau de bord',
        month: 'Novembre',
        kpis: [
          { label: 'Élèves actifs', value: '248' },
          { label: 'Présence', value: '94 %' },
          { label: 'Payé ce mois', value: '74 %', accent: true },
        ],
        bars: [42, 58, 50, 72, 64, 88],
      },
      attendance: {
        title: 'Présences · BAC Maths',
        days: [
          { day: 'Dim', state: 'present' as DayState },
          { day: 'Lun', state: 'present' as DayState },
          { day: 'Mar', state: 'absent' as DayState },
          { day: 'Mer', state: 'present' as DayState },
          { day: 'Jeu', state: 'empty' as DayState },
        ],
      },
      paymentsTitle: 'Paiements',
      payments: [
        { name: 'Amina B.', tag: 'Payé', status: 'paid' as PayStatus },
        { name: 'Yacine K.', tag: '2ᵉ tranche', status: 'partial' as PayStatus },
        { name: 'Sara M.', tag: 'En retard', status: 'late' as PayStatus },
      ],
      receipt: { label: 'Reçu', value: '2 500 DA', detail: 'Yacine K. · Novembre' },
      certificate: { label: 'Attestation', value: 'Anglais B1', detail: 'Amina B.' },
      notification: '3 paiements en retard',
      sampleLabel: "Données d'exemple",
    },
  },

  // Slogan written in chalk above the Problems section. In English in every language, at the owner's request.
  tagline: {
    lang: 'en',
    text: 'ELEVATE YOUR SCHOOL With CLASSTRA',
    accent: 'CLASSTRA', // this word is written in yellow
  },

  problems: {
    title: 'Fini les cahiers, les fichiers Excel et les paiements oubliés.',
    items: [
      { problem: "Qui n'a pas payé ce mois-ci ?", solution: 'La liste des retards en un clic.' },
      {
        problem: 'Le cahier de présence égaré',
        solution: "L'appel en 30 secondes, enregistré automatiquement.",
      },
      {
        problem: 'Les attestations rédigées à la main',
        solution: 'Imprimées en un instant, avec votre logo.',
      },
    ],
  },

  features: {
    eyebrow: 'Fonctionnalités',
    title: 'Tout ce dont un centre a besoin.',
    items: [
      {
        id: 'payments',
        icon: 'payments',
        title: 'Paiements & relances',
        text: "Suivez les tranches et les retards, et imprimez les reçus. Votre chiffre d'affaires du mois en un coup d'œil.",
      },
      {
        id: 'attendance',
        icon: 'fact_check',
        title: 'Présences',
        text: "L'appel par groupe, depuis le téléphone du formateur.",
      },
      {
        id: 'enrolment',
        icon: 'person_add',
        title: 'Inscriptions',
        text: 'Une fiche claire par élève, de la première visite à la fin de la formation.',
      },
      {
        id: 'certificates',
        icon: 'workspace_premium',
        title: 'Attestations',
        text: 'Générées automatiquement, prêtes à imprimer.',
      },
      {
        id: 'schedule',
        icon: 'calendar_month',
        title: 'Groupes & salles',
        text: "Plannings par groupe, formateur et salle, sans conflit d'horaires.",
      },
      {
        id: 'leads',
        icon: 'contact_phone',
        title: 'Suivi des prospects',
        text: "Chaque appel et chaque visite, jusqu'à l'inscription.",
      },
      {
        id: 'algeria',
        icon: 'flag',
        title: "Pensé pour l'Algérie",
        text: 'En français, en arabe et en anglais, avec des paiements en dinars, adapté aux centres algériens.',
        chips: ['2 500 DA', 'FR · عربي · EN'],
      },
    ],
    leadStages: ['Appel', 'Visite', 'Inscrit'],
    // Sample data shown in the small live UIs of each tile.
    samples: {
      payments: [
        { name: 'Amina B.', detail: 'BAC Maths', tag: 'Payé', status: 'paid' as PayStatus },
        { name: 'Yacine K.', detail: 'Anglais B1', tag: '2ᵉ tranche', status: 'partial' as PayStatus },
        { name: 'Sara M.', detail: 'BAC Physique', tag: 'En retard', status: 'late' as PayStatus },
      ],
      attendance: ['Amina B.', 'Yacine K.', 'Sara M.', 'Rayan T.', 'Lina H.'],
      student: {
        initials: 'AB',
        name: 'Amina Benali',
        group: 'BAC Maths · Groupe 2',
        phone: '0555 00 00 00',
      },
      certificate: { title: 'Attestation', course: 'Anglais B1', name: 'Amina Benali' },
      days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu'],
    },
  },

  roles: {
    titleStart: 'Chacun voit ce qui le concerne.',
    titleSoft: 'Rien de plus.',
    tabsLabel: 'Rôles',
    tabs: [
      {
        id: 'directeur' as RoleId,
        icon: 'monitoring',
        label: 'Directeur',
        text: "Chiffres, revenus et vue d'ensemble de chaque groupe.",
      },
      {
        id: 'secretariat' as RoleId,
        icon: 'support_agent',
        label: 'Secrétariat',
        text: 'Inscriptions, encaissements, reçus et appels aux parents.',
      },
      {
        id: 'formateurs' as RoleId,
        icon: 'co_present',
        label: 'Formateurs',
        text: "Leurs groupes, leur planning et l'appel en classe.",
      },
    ],
    // Sample data shown in the preview panel of each role.
    previews: {
      directeur: {
        revenueLabel: 'Revenus · novembre',
        revenue: '620 000 DA',
        lateLabel: 'Paiements en retard',
        late: '3',
        occupancyLabel: 'Remplissage des groupes',
        groups: [
          { name: 'BAC Maths', fill: 92 },
          { name: 'Physique', fill: 70 },
          { name: 'Anglais B1', fill: 55 },
        ],
      },
      secretariat: {
        title: 'Paiements du jour',
        payments: [
          { name: 'Yacine K.', detail: '2ᵉ tranche · 2 500 DA' },
          { name: 'Sara M.', detail: 'Mensualité · 3 000 DA' },
          { name: 'Rayan T.', detail: 'Inscription · 1 000 DA' },
        ],
        collect: 'Encaisser',
        enrol: 'Nouvelle inscription',
      },
      formateurs: {
        groupLabel: 'Groupe du jour',
        group: 'BAC Maths · 14 h 00',
        room: 'Salle 2',
        students: [
          { name: 'Amina B.', present: true },
          { name: 'Yacine K.', present: true },
          { name: 'Sara M.', present: false },
          { name: 'Rayan T.', present: true },
        ],
        validate: "Valider l'appel",
      },
    },
  },

  how: {
    eyebrow: 'Comment cela fonctionne',
    title: 'Nous venons chez vous. Nous installons. Nous formons votre équipe.',
    steps: [
      {
        title: 'Vous faites la demande',
        text: 'Remplissez le formulaire. Nous vous rappelons dans la journée.',
      },
      {
        title: 'Nous installons sur place',
        text: 'Nous importons vos élèves et formons votre secrétariat dans votre centre.',
      },
      {
        title: 'Vous gérez sereinement',
        text: "En cas de besoin, notre équipe vous répond du matin au soir, gratuitement, toute l'année.",
      },
    ],
  },

  pricing: {
    eyebrow: 'Tarifs',
    title: 'Des prix clairs. Sans surprise.',
    sub: 'Toutes les fonctionnalités sont incluses dans chaque formule.',
    switchLabel: 'Formule',
    currency: 'DA',
    plans: [
      {
        id: 'mensuel' as PlanId,
        label: 'Mensuel',
        unit: '/ mois',
        note: 'Pour commencer sans engagement.',
        choose: 'Choisir la formule mensuelle',
      },
      {
        id: 'semestre' as PlanId,
        label: '6 mois',
        unit: '',
        note: 'Un semestre réglé en un seul paiement.',
        choose: 'Choisir la formule 6 mois',
      },
      {
        id: 'annuel' as PlanId,
        label: 'Annuel',
        unit: '/ an',
        badge: 'La plus avantageuse',
        note: 'Vous économisez 15 000 DA par rapport à la formule mensuelle.',
        choose: 'Choisir la formule annuelle',
      },
    ],
    includedTitle: 'Inclus dans chaque formule',
    included: [
      "Jusqu'à 600 élèves",
      'Installation sur place',
      'Import de vos élèves',
      'Formation de votre équipe',
      "Assistance gratuite toute l'année",
      'Mises à jour incluses',
      'Sauvegardes automatiques',
    ],
    // TODO: confirm the period of the extra charge (per month, per plan, or once) and say it here.
    extraStudents: 'Plus de 600 élèves ? 5 500 DA par tranche de 500 élèves supplémentaires.',
    footnote:
      'Installation, import de vos élèves et formation sur place inclus. Aucun frais caché.',
  },

  faq: {
    title: 'Questions fréquentes',
    items: [
      {
        q: "Je ne suis pas à l'aise avec l'informatique. Est-ce compliqué ?",
        a: 'Non. Nous installons tout et formons votre équipe sur place, dans votre centre.',
      },
      {
        q: 'Mes données sont-elles en sécurité ?',
        a: 'Oui. Chaque utilisateur dispose de son propre mot de passe et ne voit que ce qui le concerne. Vos données sont sauvegardées automatiquement et ne sont jamais partagées ni vendues.',
      },
      {
        q: 'Est-ce utilisable sur téléphone ?',
        a: 'Oui, sur ordinateur, tablette et téléphone.',
      },
      {
        q: 'Comment puis-je payer ?',
        a: "En espèces ou par BaridiMob. D'autres moyens de paiement seront bientôt disponibles.",
      },
    ],
  },

  contact: {
    titleStart: 'Prêt à reprendre le',
    titleAccent: 'contrôle',
    titleEnd: 'de votre centre ?',
    sub: 'Laissez-nous vos coordonnées. Nous vous rappelons et venons vous présenter une démonstration.',
    fields: {
      center: 'Nom du centre',
      name: 'Votre nom',
      phone: 'Téléphone',
      wilaya: 'Wilaya',
      plan: 'Formule',
      payment: 'Mode de paiement',
    },
    // TODO: electronic payment is not available yet. Integrate it, then drop the "Bientôt" hint.
    payments: [
      { id: 'cash' as PaymentId, label: 'Espèces', hint: 'En main propre' },
      { id: 'online' as PaymentId, label: 'Paiement électronique', hint: 'Bientôt disponible' },
    ],
    phonePlaceholder: '0550 00 00 00',
    wilayaPlaceholder: 'Choisir…',
    errors: {
      center: 'Veuillez indiquer le nom de votre centre.',
      name: 'Veuillez indiquer votre nom.',
      phone: 'Veuillez saisir 10 chiffres, en commençant par 05, 06 ou 07.',
      wilaya: 'Veuillez choisir votre wilaya.',
    },
    submit: 'Être rappelé',
    success: 'Merci. Nous vous rappellerons très prochainement.',
  },

  // The account page: sign in and create an account.
  auth: {
    tabsLabel: 'Compte',
    back: 'Découvrir Classtra',
    showPassword: 'Afficher le mot de passe',
    hidePassword: 'Masquer le mot de passe',
    login: {
      tab: 'Se connecter',
      title: 'Connexion',
      sub: "Accédez à l'espace de gestion de votre établissement.",
      email: 'Adresse e-mail',
      emailPlaceholder: 'prenom@ecole.dz',
      password: 'Mot de passe',
      submit: 'Se connecter',
      forgot: 'Mot de passe oublié ?',
      // TODO: remove once the form is connected to the Classtra API.
      notice: 'Merci. La connexion sera activée très prochainement.',
    },
    signup: {
      tab: 'Créer un compte',
      title: 'Créer votre compte',
      sub: 'Préparez votre espace dès maintenant : ces informations seront reprises lorsque vous choisirez votre formule.',
      establishmentTitle: 'Votre établissement',
      establishment: "Nom de l'établissement",
      establishmentPlaceholder: 'Ex. École Ibn Sina',
      type: "Type d'établissement",
      types: [
        { id: 'training' as EstablishmentId, label: 'Centre de formation' },
        { id: 'tutoring' as EstablishmentId, label: 'Centre de soutien scolaire' },
        { id: 'private' as EstablishmentId, label: 'École privée' },
        { id: 'languages' as EstablishmentId, label: 'École de langues' },
        { id: 'other' as EstablishmentId, label: 'Autre' },
      ],
      wilaya: 'Wilaya',
      directorTitle: 'Votre compte de directeur',
      fullName: 'Nom complet',
      email: 'Adresse e-mail',
      emailPlaceholder: 'directeur@ecole.dz',
      phone: 'Téléphone mobile',
      password: 'Mot de passe',
      passwordHint: '10 caractères minimum, dont 1 majuscule et 1 chiffre.',
      terms: {
        before: 'En créant votre compte, vous acceptez les',
        sales: 'conditions générales de vente',
        and: 'et la',
        privacy: 'politique de confidentialité',
      },
      submit: 'Créer mon compte',
      // TODO: remove once the form is connected to the Classtra API.
      notice: 'Merci. La création de compte sera activée très prochainement.',
    },
    errors: {
      email: 'Veuillez saisir une adresse e-mail valide.',
      passwordRequired: 'Veuillez saisir votre mot de passe.',
      establishment: "Veuillez indiquer le nom de l'établissement.",
      wilaya: 'Veuillez choisir votre wilaya.',
      fullName: 'Veuillez indiquer votre nom complet.',
      phone: 'Veuillez saisir 10 chiffres, en commençant par 05, 06 ou 07.',
      password: 'Le mot de passe doit contenir au moins 10 caractères, dont 1 majuscule et 1 chiffre.',
    },
  },

  footer: {
    columns: {
      product: {
        title: 'Produit',
        links: [
          { label: 'Fonctionnalités', href: '#features' },
          { label: 'Comment cela fonctionne', href: '#how' },
          { label: 'Tarifs', href: '#pricing' },
          { label: 'Questions', href: '#faq' },
        ],
      },
      company: {
        title: 'Entreprise',
        links: [
          // TODO: link to the Nuestra-Tech "about" page once it exists.
          { label: 'À propos de Nuestra-Tech', href: '#' },
          { label: 'Demander une démonstration', href: '#contact' },
        ],
      },
      contact: {
        title: 'Contact',
        // TODO: fill in the real contacts.
        phone: '[TÉLÉPHONE]',
        email: '[E-MAIL]',
        instagram: '[INSTAGRAM]',
        facebook: '[FACEBOOK]',
      },
      legal: {
        title: 'Informations légales',
        links: [
          // TODO: write and link the legal pages.
          { label: 'Mentions légales', href: '#' },
          { label: 'Politique de confidentialité', href: '#' },
        ],
      },
    },
    tagline: 'Un produit Nuestra-Tech · Conçu en Algérie',
    copyright: '© 2026 Nuestra-Tech',
  },

  // The 58 wilayas, in official order. The form always sends the French name (see fr.wilayas).
  wilayas: [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
    'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
    'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
    'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
    'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès',
    'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', "El M'Ghair", 'El Meniaa',
  ],
}

/** The shape every language file must follow. */
export type Content = typeof fr
