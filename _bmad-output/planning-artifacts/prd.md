---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional']
inputDocuments: ['conversation-context']
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  projectDocs: 0
  conversationContext: 1
classification:
  projectType: 'Web App (Frontend + Backend n8n)'
  domain: 'EdTech / Lead Generation'
  complexity: 'Moyenne'
  projectContext: 'Greenfield'
---

# Product Requirements Document - Générateur de Lettres de Motivation Parcoursup

**Author:** Hadrien
**Date:** 2026-01-26

## Success Criteria

### User Success

- Lettre personnalisée obtenue en **< 4 minutes**
- Expérience **simple et fluide** (pas de friction, pas de questions complexes)
- Lettre **utilisable directement** (respecte les règles Parcoursup : 1500 car., anonymat, nom de fac)
- Sentiment de **valeur reçue** avant la pop-up de capture

### Business Success

- **Taux de complétion élevé** : Maximiser les utilisateurs qui vont jusqu'à la pop-up
- **Capture de leads** : Email + Téléphone collectés
- **Qualification** : Savoir si l'utilisateur veut être recontacté pour une prépa
- Volume de leads qualifiés suffisant pour revente aux prépas médecine

### Technical Success

- Frontend **rapide et responsive** (mobile + desktop)
- Intégration **simple** : Soumission du formulaire → Envoi à n8n
- Génération de lettre **rapide** (< 10 secondes)
- **Fiabilité** : Pas de perte de données, pas d'erreurs

### Measurable Outcomes

| Métrique | Cible |
|----------|-------|
| Temps de complétion | < 4 min |
| Taux de complétion (jusqu'à pop-up) | À maximiser |
| Temps de génération lettre | < 10 sec |

## Product Scope

### MVP (Produit final)

- Parcours PASS complet (4 blocs de questions)
- Parcours LAS complet (4 blocs de questions)
- Interface 2 colonnes (questions à gauche + preview lettre à droite)
- Pop-up de capture obligatoire (email, téléphone, intérêt prépa)
- Intégration n8n (envoi formulaire → génération → retour lettre)
- Design responsive (mobile + desktop)
- **Bonne UX dès le départ** (messages encourageants, flow fluide)
- **Tracking PostHog** intégré

### V2 (Unique évolution prévue)

- Évaluation de lettres existantes (upload → feedback personnalisé)

### Hors scope

- Pas d'expansion à d'autres filières Parcoursup
- Produit focalisé uniquement sur PASS/LAS médecine

### Risk Mitigation

| Risque | Mitigation |
|--------|------------|
| Appel LLM trop lent | Timeout 20s + animation + message sympa |
| n8n webhook fail | Retry + message d'erreur friendly |
| Faible complétion | Questions simples, options "pas d'exemple", messages encourageants |

## User Journeys

### Types d'utilisateurs

| Type | Description |
|------|-------------|
| **Utilisateur principal** | Lycéen en Terminale qui veut candidater en médecine (PASS ou LAS) |
| **Client** | Le média prépa médecine (récupère les leads via n8n → CRM) |

### Journey 1 : Léo - Lycéen PASS (Happy Path)

**Persona :** Léo, 17 ans, Terminale S, veut faire médecine. 22h30, il doit finir ses vœux Parcoursup. La lettre de motivation le bloque depuis 2 jours.

**Obstacle :** Il ne sait pas comment structurer sa lettre, il a peur de faire une lettre "bateau".

| Étape | Action | Émotion |
|-------|--------|---------|
| **Découverte** | Tombe sur l'outil via pub Instagram, accroche "4 minutes" | Curieux, sceptique |
| **Bloc 1 - Profil** | Université, filière, motivation | Engagé, c'est facile |
| **Bloc 2 - Scientifique** | Spécialités, notes, TPE | Réalise qu'il a des choses à valoriser |
| **Bloc 3 - Qualités** | Bénévolat, PSC1 | Se souvient de son engagement |
| **Bloc 4 - Fac** | JPO, éléments spécifiques | Content d'avoir des infos à mettre |
| **Pop-up** | Lettre floutée, donne email + tel + intérêt prépa | Accepte car veut voir sa lettre |
| **Résolution** | Lettre défloutée, personnalisée, copie-colle | Soulagé, satisfait |

**Durée totale :** ~4 minutes

### Journey 2 : Emma - Lycéenne LAS (Happy Path)

**Persona :** Emma, 18 ans, spé Histoire-Géo + SVT. Veut faire médecine mais hésite, tente LAS Droit.

**Obstacle :** Ne sait pas comment montrer qu'elle aime le Droit tout en parlant de son projet santé.

| Étape | Action | Émotion |
|-------|--------|---------|
| **Bloc 1 - Profil** | LAS Droit, filière médecine | OK |
| **Bloc 2 - Licence** | Pourquoi Droit, concours éloquence, fascination | Fière de ses expériences |
| **Bloc 3 - Santé** | Motivation santé, 10h natation/semaine | Confiante |
| **Pop-up** | Idem Léo | Accepte |
| **Résolution** | Lettre 60% Droit / 40% Santé | Rassurée, ça ne fait pas "par défaut" |

### Journey 3 : Théo - Abandon (Edge Case)

**Persona :** Théo, 17 ans, commence mais se décourage au bloc 2.

**Obstacle :** Pas de TPE, pas de bénévolat, notes moyennes. Se sent "nul".

| Étape | Action | Émotion |
|-------|--------|---------|
| **Bloc 1** | Répond normalement | OK |
| **Bloc 2** | TPE ? Non. Exemple de méthode ? Ne sait pas quoi mettre | Découragé |
| **Abandon** | Ferme l'onglet | Frustré |

**💡 Insight produit :** Prévoir options "Je n'ai pas d'exemple" + messages encourageants.

### Journey Requirements Summary

| Journey | Capabilities révélées |
|---------|----------------------|
| Léo (PASS) | Formulaire PASS complet, génération lettre, pop-up capture, affichage lettre |
| Emma (LAS) | Formulaire LAS complet, branchement conditionnel PASS/LAS |
| Théo (Abandon) | Gestion réponses vides, options alternatives, messages de réassurance |

## Technical Requirements

### Stack Technique

| Composant | Choix |
|-----------|-------|
| **Frontend** | React |
| **Hébergement** | Vercel |
| **Backend** | n8n (webhook) |
| **Génération lettre** | Appel API LLM |

### Architecture

```
┌─────────────┐    POST (données formulaire)    ┌─────────────┐
│             │ ────────────────────────────►   │             │
│   React     │                                 │    n8n      │
│   (Vercel)  │   ◄────────────────────────     │  (webhook)  │
│             │    Response (lettre générée)    │             │
└─────────────┘                                 └──────┬──────┘
                                                       │
                                                       │ API Call
                                                       ▼
                                                ┌─────────────┐
                                                │     LLM     │
                                                └─────────────┘
```

### Frontend (React)

- **Formulaire multi-étapes** : 4 blocs avec branchement PASS/LAS
- **State management** : État local (useState) ou Zustand si besoin
- **Validation** : Côté client avant envoi
- **UX** :
  - Desktop : 2 colonnes (questions à gauche, preview à droite)
  - Mobile : 1 colonne, preview en bas
- **Pop-up capture** : Modal obligatoire avant affichage lettre
- **Affichage lettre** : Texte flouté → déflouté après capture

### Intégration n8n

- **Méthode** : POST webhook
- **Payload** : JSON avec toutes les réponses du formulaire
- **Response** : JSON avec la lettre générée
- **Timeout** : Prévoir ~15-20 secondes (appel LLM)

### Considérations Techniques

| Aspect | Décision |
|--------|----------|
| **Loading state** | Animation "Génération en cours..." pendant l'appel n8n |
| **Error handling** | Message d'erreur si webhook fail, retry possible |
| **Responsive** | Mobile-first, breakpoint desktop ~768px |
| **Performance** | App légère, pas de lazy loading nécessaire |

## Functional Requirements

### FR-FLOW : Flow Global

| ID | Requirement |
|----|-------------|
| FR-FLOW-01 | Le système affiche un formulaire multi-étapes organisé en 4 blocs |
| FR-FLOW-02 | Le système branche vers les questions PASS ou LAS selon le choix au bloc 1 |
| FR-FLOW-03 | Le système envoie les données au webhook n8n après validation du dernier bloc |
| FR-FLOW-04 | Le système affiche une animation de génération pendant 5 secondes minimum |
| FR-FLOW-05 | Le système affiche la lettre générée en mode flouté |
| FR-FLOW-06 | Le système affiche la pop-up de capture obligatoire |
| FR-FLOW-07 | Le système envoie les données de capture au webhook n8n (second appel) |
| FR-FLOW-08 | Le système défloute la lettre après validation de la pop-up |

### FR-BLOC1 : Bloc 1 - Profil

| ID | Requirement |
|----|-------------|
| FR-BLOC1-01 | Question "PASS ou LAS ?" avec dropdown (PASS / LAS) - obligatoire |
| FR-BLOC1-02 | Question "Quelle université vises-tu ?" - texte libre, obligatoire |
| FR-BLOC1-03 | [PASS] Question "Combien de sous-vœux ?" - dropdown (1 / 2 / 3) - obligatoire |
| FR-BLOC1-04 | [LAS] Question "Quelle licence majeure ?" - dropdown (Droit / Biologie / Chimie / Psychologie / STAPS / Économie / Maths / Physique / Lettres / Histoire / Autre) - obligatoire |

### FR-BLOC2 : Bloc 2 - Parcours

| ID | Requirement |
|----|-------------|
| FR-BLOC2-01 | [PASS] Question "Qu'est-ce qui t'a donné envie de faire médecine ?" - texte libre, obligatoire |
| FR-BLOC2-02 | [LAS] Question "Pourquoi as-tu choisi CETTE licence ? (pas pour la santé)" - texte libre, obligatoire |
| FR-BLOC2-03 | Question "Ta spécialité n°1 au lycée ?" - dropdown (liste spés Terminale), obligatoire |
| FR-BLOC2-04 | Question "Ta moyenne dans cette spé ?" - nombre, obligatoire |
| FR-BLOC2-05 | Question "Ta spécialité n°2 au lycée ?" - dropdown (liste spés Terminale), obligatoire |
| FR-BLOC2-06 | Question "Ta moyenne dans cette spé ?" - nombre, obligatoire |
| FR-BLOC2-07 | Question "Quelle qualité te décrit le mieux dans ton travail scolaire ?" - dropdown (Rigueur / Organisation / Persévérance / Autonomie / Curiosité), obligatoire |
| FR-BLOC2-08 | Question "Donne un exemple concret qui montre cette qualité" - texte libre, obligatoire |
| FR-BLOC2-09 | Question "Tu as fait un TPE, projet ou concours scientifique ?" - dropdown (Oui / Non), obligatoire |
| FR-BLOC2-10 | [Si FR-BLOC2-09 = Oui] Question "C'était quoi et qu'est-ce que ça t'a appris ?" - texte libre, obligatoire |

### FR-BLOC3 : Bloc 3 - Projet & Qualités

| ID | Requirement |
|----|-------------|
| FR-BLOC3-01 | [PASS, si 1 sous-vœu] Question "Quelle mineure et pourquoi elle s'articule bien avec ton projet ?" - texte libre, obligatoire |
| FR-BLOC3-02 | [PASS, si 2-3 sous-vœux] Pas de question mineure (template générique utilisé) |
| FR-BLOC3-03 | [LAS] Question "Qu'est-ce qui t'a donné envie de faire un métier dans la santé ?" - texte libre, obligatoire |
| FR-BLOC3-04 | [LAS] Question "Pourquoi LAS plutôt que PASS ?" - texte libre, obligatoire |
| FR-BLOC3-05 | [LAS] Question "Tu vois un lien entre ta licence et la santé ?" - texte libre, optionnel |
| FR-BLOC3-06 | [LAS] Question "Tu as une activité intensive en parallèle des cours (sport, musique...) ?" - dropdown (Oui / Non), obligatoire |
| FR-BLOC3-07 | [LAS, si FR-BLOC3-06 = Oui] Question "C'est quoi, combien d'heures/semaine, et quelle qualité ça prouve ?" - texte libre, obligatoire |
| FR-BLOC3-08 | Question "Tu as un engagement qui montre tes qualités humaines ?" - dropdown (Bénévolat / Délégué / Tutorat / Sport collectif / Aide proche malade / Collecte de sang / Autre), obligatoire |
| FR-BLOC3-09 | Question "Quelle qualité cet engagement t'a fait développer ?" - texte libre, obligatoire |
| FR-BLOC3-10 | Question "Tu as le PSC1 ou une formation premiers secours ?" - dropdown (Oui / Non), obligatoire |

### FR-BLOC4 : Bloc 4 - Faculté

| ID | Requirement |
|----|-------------|
| FR-BLOC4-01 | Question "Tu as participé aux JPO de cette fac ?" - dropdown (Oui / Non), obligatoire |
| FR-BLOC4-02 | [Si FR-BLOC4-01 = Oui] Question "Qu'est-ce que tu en as retenu ?" - texte libre, obligatoire |
| FR-BLOC4-03 | Question "Il y a quelque chose qui t'attire spécifiquement dans cette fac ?" - texte libre, optionnel |

### FR-POPUP : Pop-up de Capture

| ID | Requirement |
|----|-------------|
| FR-POPUP-01 | Champ "Email" - email valide, obligatoire |
| FR-POPUP-02 | Champ "Téléphone" - format FR valide, obligatoire |
| FR-POPUP-03 | Question "Tu envisages de faire une prépa ?" - dropdown (Oui / Non / Je ne sais pas), obligatoire |
| FR-POPUP-04 | Incentive affiché : "Reçois une méthode pour réussir ta prépa PASS" |
| FR-POPUP-05 | La pop-up est modale et ne peut être fermée sans remplir les champs |

### FR-LETTRE : Affichage Lettre

| ID | Requirement |
|----|-------------|
| FR-LETTRE-01 | La lettre est affichée avec effet de flou CSS avant validation pop-up |
| FR-LETTRE-02 | La lettre est défloutée après validation pop-up |
| FR-LETTRE-03 | Bouton "Copier" pour copier le texte dans le presse-papier |
| FR-LETTRE-04 | La lettre respecte max 1500 caractères |
| FR-LETTRE-05 | La lettre ne contient pas le nom/prénom de l'utilisateur (anonymat Parcoursup) |
| FR-LETTRE-06 | La lettre mentionne le nom exact de l'université saisie |

### FR-UX : Expérience Utilisateur

| ID | Requirement |
|----|-------------|
| FR-UX-01 | Interface 2 colonnes sur desktop (questions à gauche, preview à droite) |
| FR-UX-02 | Interface 1 colonne sur mobile (questions puis preview) |
| FR-UX-03 | Indicateur de progression visible (bloc actuel / total) |
| FR-UX-04 | Messages encourageants entre les blocs |
| FR-UX-05 | Animation de génération avec message engageant (5s minimum) |

### FR-TRACKING : Analytics PostHog

| ID | Requirement |
|----|-------------|
| FR-TRACKING-01 | Event "form_started" au début du formulaire |
| FR-TRACKING-02 | Event "bloc_completed" à chaque bloc terminé avec numéro du bloc |
| FR-TRACKING-03 | Event "generation_started" à l'envoi vers n8n |
| FR-TRACKING-04 | Event "popup_displayed" à l'affichage de la pop-up |
| FR-TRACKING-05 | Event "lead_captured" à la validation de la pop-up |
| FR-TRACKING-06 | Event "letter_revealed" au défloutage de la lettre |

## Non-Functional Requirements

### NFR-PERF : Performance

| ID | Requirement |
|----|-------------|
| NFR-PERF-01 | L'application se charge en < 3 secondes sur connexion 4G |
| NFR-PERF-02 | Les transitions entre blocs sont instantanées (< 100ms) |
| NFR-PERF-03 | Le temps de génération de lettre ne dépasse pas 20 secondes |

### NFR-RESP : Responsive Design (Priorité Haute)

| ID | Requirement |
|----|-------------|
| NFR-RESP-01 | L'interface s'adapte aux écrans de 320px à 1920px |
| NFR-RESP-02 | **Mobile-first** : L'interface est conçue d'abord pour mobile puis adaptée desktop |
| NFR-RESP-03 | Le breakpoint desktop/mobile est à 768px |
| NFR-RESP-04 | Sur mobile : formulaire en pleine largeur, preview en dessous |
| NFR-RESP-05 | Sur desktop : layout 2 colonnes (50/50 ou 60/40) |
| NFR-RESP-06 | Les champs de formulaire sont adaptés au touch (taille min 44px) |
| NFR-RESP-07 | La pop-up de capture est centrée et lisible sur tous les écrans |

### NFR-COMP : Composants Réutilisables (Priorité Haute)

| ID | Requirement |
|----|-------------|
| NFR-COMP-01 | Composant `<QuestionBlock>` générique pour tous les blocs |
| NFR-COMP-02 | Composant `<TextField>` réutilisable (label, placeholder, validation) |
| NFR-COMP-03 | Composant `<Dropdown>` réutilisable (options configurables) |
| NFR-COMP-04 | Composant `<NumberField>` réutilisable (min, max, validation) |
| NFR-COMP-05 | Composant `<ProgressBar>` pour l'indicateur de progression |
| NFR-COMP-06 | Composant `<Modal>` réutilisable pour la pop-up |
| NFR-COMP-07 | Composant `<Button>` avec variantes (primary, secondary) |
| NFR-COMP-08 | Les questions sont définies dans un fichier de configuration JSON/TS (pas hardcodées) |

### NFR-ACCESS : Accessibilité

| ID | Requirement |
|----|-------------|
| NFR-ACCESS-01 | Les formulaires sont navigables au clavier |
| NFR-ACCESS-02 | Les labels sont associés aux champs correspondants |
| NFR-ACCESS-03 | Les contrastes respectent WCAG AA minimum |

### NFR-COMPAT : Compatibilité

| ID | Requirement |
|----|-------------|
| NFR-COMPAT-01 | Support des navigateurs : Chrome, Safari, Firefox, Edge (versions récentes) |
| NFR-COMPAT-02 | Support iOS Safari et Chrome Android |

### NFR-SEC : Sécurité

| ID | Requirement |
|----|-------------|
| NFR-SEC-01 | Les données sont envoyées via HTTPS uniquement |
| NFR-SEC-02 | Validation côté client des entrées utilisateur |
| NFR-SEC-03 | Pas de stockage local des données sensibles (email, téléphone) |

### NFR-MAINT : Maintenabilité

| ID | Requirement |
|----|-------------|
| NFR-MAINT-01 | Code React structuré en composants réutilisables |
| NFR-MAINT-02 | Configuration externalisée (URL webhook n8n, clé PostHog) |
| NFR-MAINT-03 | Les questions sont stockées dans un fichier de configuration (facile à modifier) |

### NFR-FIAB : Fiabilité

| ID | Requirement |
|----|-------------|
| NFR-FIAB-01 | En cas d'erreur n8n, l'animation continue jusqu'à 20s puis affiche un message d'erreur friendly |
| NFR-FIAB-02 | Les données du formulaire ne sont pas perdues en cas d'erreur (possibilité de retry) |

