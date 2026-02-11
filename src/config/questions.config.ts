import type { Block } from '../types';

export const SPECIALITES = [
  { value: 'physique-chimie', label: 'Physique-Chimie' },
  { value: 'svt', label: 'SVT' },
  { value: 'maths', label: 'Mathématiques' },
  { value: 'biologie-ecologie', label: 'Biologie-écologie' },
  { value: 'hlp', label: 'Humanités, littérature et philosophie' },
  { value: 'hggsp', label: 'HGGSP' },
  { value: 'histoire-arts', label: 'Histoire des arts' },
  { value: 'llce-anglais', label: 'LLCE Anglais' },
  { value: 'ses', label: 'SES' },
  { value: 'autre', label: 'Autre' },
];

export const LICENCES_LAS = [
  { value: 'droit', label: 'Droit' },
  { value: 'biologie', label: 'Biologie' },
  { value: 'chimie', label: 'Chimie' },
  { value: 'physique', label: 'Physique' },
  { value: 'psychologie', label: 'Psychologie' },
  { value: 'staps', label: 'STAPS' },
  { value: 'economie', label: 'Économie' },
  { value: 'histoire', label: 'Histoire' },
  { value: 'lettres', label: 'Lettres' },
  { value: 'philosophie', label: 'Philosophie' },
  { value: 'sociologie', label: 'Sociologie' },
  { value: 'autre', label: 'Autre' },
];

export const INTERET_PREPA = [
  { value: 'oui-definitivement', label: 'Oui, définitivement' },
  { value: 'oui-peut-etre', label: 'Oui, peut-être' },
  { value: 'non', label: 'Non' },
  { value: 'je-ne-sais-pas', label: 'Je ne sais pas encore' },
];

// Liste des universités basée sur fac.json, triée alphabétiquement
export const UNIVERSITES = [
  { value: 'amiens', label: 'Amiens' },
  { value: 'angers', label: 'Angers' },
  { value: 'antilles', label: 'Antilles' },
  { value: 'besancon', label: 'Besançon' },
  { value: 'bordeaux', label: 'Bordeaux' },
  { value: 'brest', label: 'Brest' },
  { value: 'clermont-ferrand', label: 'Clermont-Ferrand' },
  { value: 'corse', label: 'Corse' },
  { value: 'dijon', label: 'Dijon' },
  { value: 'grenoble', label: 'Grenoble' },
  { value: 'guyane', label: 'Guyane' },
  { value: 'la-reunion', label: 'La Réunion' },
  { value: 'lille-etat', label: 'Lille État' },
  { value: 'limoges', label: 'Limoges' },
  { value: 'lyon', label: 'Lyon' },
  { value: 'marseille-aix', label: 'Marseille (Aix)' },
  { value: 'montpellier', label: 'Montpellier' },
  { value: 'nancy', label: 'Nancy' },
  { value: 'nantes', label: 'Nantes' },
  { value: 'nice', label: 'Nice' },
  { value: 'orleans', label: 'Orléans' },
  { value: 'paris-cite', label: 'Paris Cité (Paris)' },
  { value: 'paris-saclay', label: 'Paris-Saclay (Paris)' },
  { value: 'poitiers', label: 'Poitiers' },
  { value: 'reims', label: 'Reims' },
  { value: 'rennes', label: 'Rennes' },
  { value: 'rouen', label: 'Rouen (Le Havre)' },
  { value: 'saint-etienne', label: 'Saint-Étienne' },
  { value: 'sorbonne-nord', label: 'Sorbonne Nord (Paris)' },
  { value: 'sorbonne', label: 'Sorbonne Université (Paris)' },
  { value: 'toulouse', label: 'Toulouse' },
  { value: 'tours', label: 'Tours' },
  { value: 'uvsq', label: 'Versailles - Saint-Quentin-en-Yvelines UVSQ (Paris)' },
];

export const blocks: Block[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // BLOC 1 : PROFIL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Ton profil',
    shortTitle: 'Profil',
    questions: [
      {
        id: 'classe',
        type: 'dropdown',
        label: 'Dans quelle classe es-tu ?',
        required: true,
        options: [
          { value: 'seconde', label: 'Seconde' },
          { value: 'premiere', label: 'Première' },
          { value: 'terminale', label: 'Terminale' },
          { value: 'licence', label: 'Licence' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        id: 'parcours',
        type: 'dropdown',
        label: 'Quel parcours vises-tu ?',
        required: true,
        options: [
          { value: 'PASS', label: 'PASS' },
          { value: 'LAS', label: 'LAS' },
        ],
      },
      {
        id: 'university',
        type: 'dropdown',
        label: 'Dans quelle université ?',
        required: true,
        options: UNIVERSITES,
        searchable: true,
      },
      // PASS - mineures
      {
        id: 'mineures',
        type: 'text',
        label: 'Quelle(s) mineure(s) as-tu choisie(s) ou repérée(s) ? (tu peux écrire "toutes")',
        placeholder: 'Exemple : Droit, Économie-Gestion',
        required: true,
        condition: { field: 'parcours', value: 'PASS' },
      },
      // LAS - licenceMajeure
      {
        id: 'licenceMajeure',
        type: 'text',
        label: 'Quelle est ta licence majeure ?',
        placeholder: 'Droit, Psychologie, Biologie...',
        required: true,
        condition: { field: 'parcours', value: 'LAS' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BLOC 2 : PARCOURS SCOLAIRE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 2,
    title: 'Ton parcours',
    shortTitle: 'Parcours',
    questions: [
      // LAS - motivationLicence (en premier pour LAS)
      {
        id: 'motivationLicence',
        type: 'text',
        label: 'Pourquoi as-tu choisi cette licence ? Qu\'est-ce qui t\'attire dans cette discipline ?',
        placeholder: 'Depuis mon stage en cabinet d\'avocat, je suis fasciné par le raisonnement juridique. J\'aime analyser des situations complexes, construire une argumentation, et comprendre comment le droit encadre les relations humaines...',
        required: true,
        condition: { field: 'parcours', value: 'LAS' },
      },
      // Spécialités (commun)
      {
        id: 'specialite1',
        type: 'dropdown',
        label: 'Spécialité 1',
        required: true,
        options: SPECIALITES,
        inlineWith: 'moyenne1',
        excludeFrom: 'specialite2',
      },
      {
        id: 'moyenne1',
        type: 'number',
        label: 'Moyenne',
        required: true,
        min: 0,
        max: 20,
      },
      {
        id: 'specialite2',
        type: 'dropdown',
        label: 'Spécialité 2',
        required: true,
        options: SPECIALITES,
        inlineWith: 'moyenne2',
        excludeFrom: 'specialite1',
      },
      {
        id: 'moyenne2',
        type: 'number',
        label: 'Moyenne',
        required: true,
        min: 0,
        max: 20,
      },
      // PASS - projetScientifique
      {
        id: 'projetScientifique',
        type: 'text',
        label: 'Cite un chapitre, exercice ou projet scientifique que tu as bien compris cette année. Qu\'est-ce que tu as appris dans ta manière de réfléchir ?',
        placeholder: 'En SVT, j\'ai particulièrement bien compris le chapitre sur la régulation de la glycémie. Construire le schéma bilan m\'a appris à relier les causes aux conséquences et à raisonner par étapes...',
        required: true,
        condition: { field: 'parcours', value: 'PASS' },
      },
      // LAS - projetAcademique
      {
        id: 'projetAcademique',
        type: 'text',
        label: 'Cite un chapitre, exercice ou projet dans une de tes spécialités que tu as bien compris cette année. Qu\'est-ce que tu as appris dans ta manière de réfléchir ?',
        placeholder: 'En Philosophie, j\'ai particulièrement aimé travailler sur la notion de justice chez Rawls. Ça m\'a appris à nuancer mon raisonnement et à considérer plusieurs points de vue avant de conclure...',
        required: true,
        condition: { field: 'parcours', value: 'LAS' },
      },
      // Organisation (commun)
      {
        id: 'organisation',
        type: 'text',
        label: 'Comment t\'organises-tu concrètement pour travailler (planning, régularité, volume horaire) ? Donne un exemple de période où tu as maintenu cet effort sur plusieurs semaines ou géré une situation de pression. Qu\'en as-tu retenu ?',
        placeholder: 'Je travaille 2h chaque soir après les cours et 4h le week-end. Pendant les révisions du bac blanc, j\'ai tenu ce rythme pendant 3 semaines. J\'ai appris que la régularité compte plus que les longues sessions de dernière minute...',
        required: true,
      },
      // Activité régulière (commun)
      {
        id: 'activiteReguliere',
        type: 'text',
        label: 'Décris une activité régulière (sport, musique, engagement, job, aide familiale…) et ce qu\'elle t\'a appris sur ta façon de travailler ou de persévérer.',
        placeholder: 'Je fais du handball en club depuis 6 ans, avec 2 entraînements par semaine. Ça m\'a appris à gérer la fatigue, à rester concentré même quand je suis fatigué, et à m\'adapter aux imprévus pendant les matchs...',
        required: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BLOC 3 : PROJET & MOTIVATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 3,
    title: 'Projet & Motivation',
    shortTitle: 'Projet',
    questions: [
      // PASS - motivationSante
      {
        id: 'motivationSante',
        type: 'text',
        label: 'Quel métier de santé vises-tu, qu\'est-ce qui a déclenché cette envie, et qu\'est-ce qui t\'attire dans ce métier ?',
        placeholder: 'Je veux devenir médecin généraliste. C\'est en accompagnant ma grand-mère à ses rendez-vous que j\'ai eu le déclic. Ce qui m\'attire, c\'est le contact humain quotidien et pouvoir être là pour les patients dans les moments importants...',
        required: true,
        condition: { field: 'parcours', value: 'PASS' },
      },
      // LAS - projetPro
      {
        id: 'projetPro',
        type: 'text',
        label: 'Quel métier vises-tu à terme, qu\'est-ce qui a déclenché cette envie, et qu\'est-ce qui t\'attire ?',
        placeholder: 'Je vise médecin avec une double compétence en droit. C\'est un stage en cabinet d\'avocat spécialisé santé qui m\'a donné le déclic. Ce qui m\'attire, c\'est de pouvoir allier rigueur intellectuelle et dimension humaine...',
        required: true,
        condition: { field: 'parcours', value: 'LAS' },
      },
      // PASS - experienceSante
      {
        id: 'experienceSante',
        type: 'text',
        label: 'As-tu eu une expérience en lien avec la santé ou l\'aide aux autres (stage, bénévolat, accompagnement d\'un proche…) ? Si oui, qu\'as-tu compris de nouveau ?',
        placeholder: 'J\'ai fait un stage de 3 jours chez un médecin généraliste. J\'ai compris que le métier, c\'est autant écouter que soigner. Le médecin passait du temps à reformuler, à s\'assurer que le patient avait compris...',
        required: true,
        condition: { field: 'parcours', value: 'PASS' },
      },
      // LAS - interetSante
      {
        id: 'interetSante',
        type: 'text',
        label: 'Pourquoi as-tu choisi d\'ajouter l\'option santé à ta licence ?',
        placeholder: 'Le contact humain et l\'envie d\'aider les autres m\'attirent. Garder l\'option santé me permet de ne pas fermer cette porte...',
        required: true,
        condition: { field: 'parcours', value: 'LAS' },
      },
      // PASS - planB
      {
        id: 'planB',
        type: 'text',
        label: 'Si tu n\'accèdes pas aux filières santé après cette année, quelle poursuite d\'études envisages-tu ?',
        placeholder: 'Je continuerais en licence de Biologie pour retenter ma chance en L2 via une passerelle. La biologie m\'intéresse vraiment, et ça me permettrait de garder un lien avec le domaine scientifique...',
        required: true,
        condition: { field: 'parcours', value: 'PASS' },
      },
      // LAS - lienLicenceSante
      {
        id: 'lienLicenceSante',
        type: 'text',
        label: 'Quel lien fais-tu entre ta licence et la santé ? En quoi cette double compétence pourrait être utile ?',
        placeholder: 'Ma licence de Droit me donnera une compréhension des enjeux juridiques et éthiques de la médecine : responsabilité médicale, droits des patients, bioéthique. Ces compétences seront utiles pour accompagner mes patients dans leurs droits...',
        required: true,
        condition: { field: 'parcours', value: 'LAS' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BLOC 4 : LA FACULTÉ
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 4,
    title: 'La faculté',
    shortTitle: 'Faculté',
    questions: [
      {
        id: 'jpo',
        type: 'boolean',
        label: 'As-tu participé à une JPO ou échangé avec des étudiants/enseignants de cette faculté ?',
        required: true,
      },
      {
        id: 'jpoRetenu',
        type: 'text',
        label: 'Cite un élément concret que tu as découvert sur l\'organisation de la formation ou la vie étudiante.',
        placeholder: 'J\'ai appris que la fac propose des groupes de travail encadrés par des tuteurs de 2ème année. Un étudiant m\'a dit que ça l\'avait beaucoup aidé à trouver sa méthode en début d\'année...',
        required: true,
        condition: { field: 'jpo', value: true },
      },
      {
        id: 'attractionFac',
        type: 'text',
        label: 'Qu\'est-ce que cette faculté propose qui pourrait t\'aider à progresser (tutorat, organisation, accompagnement, ambiance…) ?',
        placeholder: 'Le tutorat par les étudiants de 2ème année me rassure car j\'aurai des conseils de gens qui sont passés par là récemment. L\'organisation en petits groupes pour les TD me convient aussi...',
        required: true,
      },
      {
        id: 'accompagnement',
        type: 'checkbox',
        label: 'Quel accompagnement comptes-tu prendre ? (plusieurs choix possibles, non mentionné dans ta lettre)',
        required: true,
        options: [
          { value: 'prepa', label: 'Prépa médecine' },
          { value: 'tutorat', label: 'Tutorat' },
          { value: 'aucun', label: 'Aucun' },
        ],
      },
    ],
  },
];

export const ENCOURAGING_MESSAGES = [
  'Super, on avance bien !',
  'Parfait, continue comme ça !',
  'Excellent, tu y es presque !',
  'Génial, encore quelques questions !',
  'Top ! La suite maintenant.',
];

export function getRandomEncouragingMessage(): string {
  return ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
}
