# Récapitulatif Discovery - Générateur de Lettres de Motivation Parcoursup

**Date :** 2026-01-26
**Auteur :** Hadrien

---

## 1. Contexte Business

### Client
- **Qui :** Un média autour de la prépa médecine
- **Business model :** Revente de leads qualifiés à des prépas médecine

### Objectif de l'outil
Créer un **lead magnet** sous forme de générateur de lettres de motivation Parcoursup pour capter des lycéens en Terminale qui veulent faire médecine.

### Ce qu'on veut collecter
1. **Valeur délivrée :** Une lettre de motivation personnalisée et de qualité
2. **Données sur l'étudiant :** Faculté visée, options, parcours (PASS/LAS)
3. **Informations de contact :** Email + Téléphone
4. **Qualification lead :** Niveau d'intérêt pour une prépa

---

## 2. Mécanique du Produit

### Flow utilisateur
```
Choix PASS/LAS → Questions par blocs → Dernière question → Pop-up capture → Lettre débloquée
```

### Pop-up de capture (obligatoire)
- **Email** (obligatoire)
- **Téléphone** (obligatoire)
- **"Tu envisages de faire une prépa ?"** (qualification)
- **Incentive :** "Reçois une méthode pour réussir la prépa PASS" (pour encourager à donner le téléphone)

### Affichage de la lettre
- La lettre est générée et affichée **floutée** en arrière-plan
- La pop-up apparaît pour **débloquer** la lettre
- L'utilisateur doit remplir la pop-up pour voir sa lettre en clair

---

## 3. Architecture Technique

### Frontend (ce qu'on build)
- Application web (SPA)
- Interface formulaire multi-étapes
- Affichage de la lettre générée

### Backend (hors scope direct)
- **Workflow n8n** qui :
  - Reçoit toutes les réponses du formulaire
  - Génère la lettre via template + appels API
  - Renvoie la lettre au frontend pour affichage

### Simplicité visée
- Pas de backend complexe côté app
- Tout le traitement de génération est délégué à n8n
- Template-based generation (pas d'IA complexe, juste du templating intelligent)

---

## 4. UX / Interface

### Layout envisagé
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   GAUCHE (50%)        │        DROITE (50%)         │
│                       │                             │
│   Bloc de questions   │   Preview de la lettre      │
│   (formulaire)        │   (ou animation "en cours") │
│                       │                             │
│                       │   → Floutée tant que        │
│                       │     pop-up pas remplie      │
│                       │                             │
└─────────────────────────────────────────────────────┘
```

### Principes UX
- Questions simples et rapides
- Taux de complétion maximisé
- Pas trop de questions (éviter l'abandon)
- Formulaire engageant (pas un questionnaire administratif)

---

## 5. Cible Utilisateur

### Persona principal
- **Qui :** Lycéen en Terminale
- **Objectif :** Candidater en médecine via Parcoursup (PASS ou LAS)
- **Pain point :** Ne sait pas comment rédiger une lettre de motivation efficace
- **Contexte :** Stressé, peu de temps, veut une solution rapide

### Contraintes utilisateur
- Souvent connecté le soir (22h-23h)
- Patience limitée
- Si c'est trop long ou compliqué → abandonne

---

## 6. Parcours PASS vs LAS

### PASS (Parcours d'Accès Spécifique Santé)
- Mono-orienté santé
- 80% santé, 20% mineure
- Profil : Vocation médicale affirmée
- Jury : Profs de santé uniquement

### LAS (Licence avec Accès Santé)
- Bi-orienté (Licence + Santé)
- 60% licence, 40% santé
- Profil : Double intérêt ou hésitation
- Jury : Profs de licence + Profs de santé

### Implication pour l'outil
- **Branchement conditionnel** dès la première question
- **Questions différentes** selon PASS ou LAS
- **Structure de lettre différente** pour chaque parcours

---

## 7. Structure des Questions - PASS

### Temps estimé : ~3-4 minutes

### BLOC 1 - Profil
| # | Question | Format |
|---|----------|--------|
| 1.1 | PASS ou LAS ? | Dropdown (PASS / LAS) |
| 1.2 | Quelle université vises-tu ? | Texte libre |
| 1.3 | Combien de sous-vœux ? | Dropdown (1 / 2 / 3) |

### BLOC 2 - Parcours
| # | Question | Format |
|---|----------|--------|
| 2.1 | Qu'est-ce qui t'a donné envie de faire médecine ? | Texte libre |
| 2.2 | Ta spécialité n°1 au lycée ? | Dropdown |
| 2.3 | Ta moyenne dans cette spé ? | Nombre |
| 2.4 | Ta spécialité n°2 au lycée ? | Dropdown |
| 2.5 | Ta moyenne dans cette spé ? | Nombre |
| 2.6 | Quelle qualité te décrit le mieux dans ton travail scolaire ? | Dropdown (Rigueur / Organisation / Persévérance / Autonomie / Curiosité) |
| 2.7 | Donne un exemple concret qui montre cette qualité | Texte libre |
| 2.8 | Tu as fait un TPE, projet ou concours scientifique ? | Oui / Non |
| 2.9 | [Si oui] C'était quoi et qu'est-ce que ça t'a appris ? | Texte libre |

### BLOC 3 - Projet & Qualités
| # | Question | Format |
|---|----------|--------|
| 3.1 | [Si 1 sous-vœu] Quelle mineure et pourquoi elle s'articule bien avec ton projet ? | Texte libre |
| 3.2 | Tu as un engagement qui montre tes qualités humaines ? | Dropdown (Bénévolat / Délégué / Tutorat / Sport collectif / Aide proche malade / Collecte de sang / Autre) |
| 3.3 | Quelle qualité cet engagement t'a fait développer ? | Texte libre |
| 3.4 | Tu as le PSC1 ou une formation premiers secours ? | Oui / Non |

### BLOC 4 - Faculté
| # | Question | Format |
|---|----------|--------|
| 4.1 | Tu as participé aux JPO de cette fac ? | Oui / Non |
| 4.2 | [Si oui] Qu'est-ce que tu en as retenu ? | Texte libre |
| 4.3 | Il y a quelque chose qui t'attire spécifiquement dans cette fac ? | Texte libre optionnel |

---

## 8. Structure des Questions - LAS

### Temps estimé : ~4 minutes

### BLOC 1 - Profil
| # | Question | Format |
|---|----------|--------|
| 1.1 | PASS ou LAS ? | Dropdown (PASS / LAS) |
| 1.2 | Quelle université vises-tu ? | Texte libre |
| 1.3 | Quelle licence majeure ? | Dropdown (Droit / Biologie / Chimie / Psychologie / STAPS / Économie / Maths / Physique / Lettres / Histoire / Autre) |

### BLOC 2 - Parcours
| # | Question | Format |
|---|----------|--------|
| 2.1 | Pourquoi as-tu choisi CETTE licence ? (pas pour la santé) | Texte libre |
| 2.2 | Ta spécialité n°1 au lycée ? | Dropdown |
| 2.3 | Ta moyenne ? | Nombre |
| 2.4 | Ta spécialité n°2 au lycée ? | Dropdown |
| 2.5 | Ta moyenne ? | Nombre |
| 2.6 | Quelle qualité te décrit le mieux dans ton travail scolaire ? | Dropdown (Rigueur / Organisation / Persévérance / Autonomie / Curiosité) |
| 2.7 | Donne un exemple concret qui montre cette qualité | Texte libre |
| 2.8 | Tu as fait un TPE, projet ou concours scientifique ? | Oui / Non |
| 2.9 | [Si oui] C'était quoi et qu'est-ce que ça t'a appris ? | Texte libre |

### BLOC 3 - Projet & Qualités
| # | Question | Format |
|---|----------|--------|
| 3.1 | Qu'est-ce qui t'a donné envie de faire un métier dans la santé ? | Texte libre |
| 3.2 | Pourquoi LAS plutôt que PASS ? | Texte libre |
| 3.3 | Tu vois un lien entre ta licence et la santé ? | Texte libre optionnel |
| 3.4 | Tu as une activité intensive en parallèle des cours (sport, musique...) ? | Oui / Non |
| 3.5 | [Si oui] C'est quoi, combien d'heures/semaine, et quelle qualité ça prouve ? | Texte libre |
| 3.6 | Tu as un engagement qui montre tes qualités humaines ? | Dropdown (Bénévolat / Délégué / Tutorat / Sport collectif / Aide proche malade / Collecte de sang / Autre) |
| 3.7 | Quelle qualité cet engagement t'a fait développer ? | Texte libre |
| 3.8 | Tu as le PSC1 ou une formation premiers secours ? | Oui / Non |

### BLOC 4 - Faculté
| # | Question | Format |
|---|----------|--------|
| 4.1 | Tu as participé aux JPO de cette fac ? | Oui / Non |
| 4.2 | [Si oui] Qu'est-ce que tu en as retenu ? | Texte libre |
| 4.3 | Il y a quelque chose qui t'attire spécifiquement dans cette fac ? | Texte libre optionnel |

---

## 9. Structure de la Lettre Générée

### Lettre PASS (1500 caractères max)
| Partie | Caractères | Contenu |
|--------|------------|---------|
| 1 - Introduction | 150-200 | Accroche + filière + élément concret + université |
| 2 - Développement scientifique | 400-500 | Spécialités + notes + méthode + projet scientifique |
| 3 - Plan B et mineure | 300-400 | Stratégie générique ou spécifique selon nb mineures |
| 4 - Qualités humaines | 200-300 | Engagement + qualités acquises + PSC1 |
| 5 - Conclusion | 100-150 | Engagement + conscience de la difficulté |

### Lettre LAS (1500 caractères max)
| Partie | Caractères | Contenu |
|--------|------------|---------|
| 1 - Introduction | 150-200 | Double projet + université |
| 2 - Licence majeure (60%) | 500-600 | Passion licence + résultats + expériences |
| 3 - Santé + Organisation (40%) | 400-500 | Projet santé + preuve gestion double charge |
| 4 - Conclusion | 100-150 | Double engagement |

---

## 10. Règles de Génération

### Ce qu'on génère automatiquement (templates fixes)
- **Plan B générique (PASS avec plusieurs mineures)** : Formulation stratégiquement vague
- **Conclusion** : Template standard adapté PASS ou LAS

### Ce qui dépend des réponses
- Accroche personnalisée selon l'expérience déclencheuse
- Mention des notes SI ≥ 14/20
- Détail de la mineure SI une seule sélectionnée
- Engagement + qualités acquises selon le type

### Règles business
- Maximum 1500 caractères
- Pas de nom/prénom dans la lettre (anonymat Parcoursup)
- Nom exact de l'université mentionné
- Pas de formules de politesse

---

## 11. V2 Future (hors scope V1)

### Fonctionnalité prévue
- **Évaluation de lettre existante**
- L'utilisateur upload/colle sa lettre
- L'outil donne un feedback détaillé
- Même mécanique de lead capture

---

## 12. Classification Projet

| Dimension | Valeur |
|-----------|--------|
| Type de projet | Web App (Frontend + Backend n8n) |
| Domaine | EdTech / Lead Generation |
| Complexité | Moyenne |
| Contexte | Greenfield |

---

## 13. Triple Contrainte à Respecter

1. **Assez d'infos** pour générer une lettre de qualité
2. **Pas trop de questions** pour maximiser le taux de complétion
3. **Workflow de génération simple** (template-based, pas d'IA complexe)

---

## 14. Prochaines Étapes

1. Finaliser le PRD complet
2. Définir l'architecture technique détaillée
3. Designer les wireframes
4. Développer le frontend
5. Configurer le workflow n8n
6. Tester le flow complet
7. Lancer en production
