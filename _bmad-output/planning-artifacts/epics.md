---
stepsCompleted: [1, 2, 3]
inputDocuments: ['prd.md', 'architecture.md', 'ux-design.md']
---

# hippocast-lettre-motivation - Epic Breakdown

## Overview

Ce document fournit le découpage complet en epics et stories pour hippocast-lettre-motivation, décomposant les requirements du PRD, UX Design et Architecture en stories implémentables.

## Requirements Inventory

### Functional Requirements

**FR-FLOW : Flow Global (8)**
- FR-FLOW-01 : Formulaire multi-étapes en 4 blocs
- FR-FLOW-02 : Branchement PASS/LAS selon choix bloc 1
- FR-FLOW-03 : Envoi données au webhook n8n après validation
- FR-FLOW-04 : Animation génération 5 secondes minimum
- FR-FLOW-05 : Affichage lettre floutée
- FR-FLOW-06 : Affichage pop-up capture obligatoire
- FR-FLOW-07 : Envoi données capture au webhook n8n (second appel)
- FR-FLOW-08 : Défloutage lettre après validation popup

**FR-BLOC1 : Profil (4)**
- FR-BLOC1-01 : Question PASS/LAS dropdown obligatoire
- FR-BLOC1-02 : Question université texte libre obligatoire
- FR-BLOC1-03 : [PASS] Question sous-vœux dropdown obligatoire
- FR-BLOC1-04 : [LAS] Question licence majeure dropdown obligatoire

**FR-BLOC2 : Parcours (10)**
- FR-BLOC2-01 : [PASS] Question motivation médecine texte libre
- FR-BLOC2-02 : [LAS] Question motivation licence texte libre
- FR-BLOC2-03 : Question spécialité 1 dropdown
- FR-BLOC2-04 : Question moyenne spé 1 nombre
- FR-BLOC2-05 : Question spécialité 2 dropdown
- FR-BLOC2-06 : Question moyenne spé 2 nombre
- FR-BLOC2-07 : Question qualité travail dropdown
- FR-BLOC2-08 : Question exemple qualité texte libre
- FR-BLOC2-09 : Question TPE/projet oui/non
- FR-BLOC2-10 : [Si TPE=oui] Question détail TPE texte libre

**FR-BLOC3 : Projet & Qualités (10)**
- FR-BLOC3-01 : [PASS 1 sous-vœu] Question mineure texte libre
- FR-BLOC3-02 : [PASS 2-3 sous-vœux] Pas de question mineure
- FR-BLOC3-03 : [LAS] Question motivation santé texte libre
- FR-BLOC3-04 : [LAS] Question pourquoi LAS texte libre
- FR-BLOC3-05 : [LAS] Question lien licence/santé optionnel
- FR-BLOC3-06 : [LAS] Question activité intensive oui/non
- FR-BLOC3-07 : [LAS si activité=oui] Question détail activité
- FR-BLOC3-08 : Question engagement dropdown
- FR-BLOC3-09 : Question qualité engagement texte libre
- FR-BLOC3-10 : Question PSC1 oui/non

**FR-BLOC4 : Faculté (3)**
- FR-BLOC4-01 : Question JPO oui/non
- FR-BLOC4-02 : [Si JPO=oui] Question retenu JPO texte libre
- FR-BLOC4-03 : Question attraction fac optionnel

**FR-POPUP : Capture (5)**
- FR-POPUP-01 : Champ email obligatoire
- FR-POPUP-02 : Champ téléphone obligatoire
- FR-POPUP-03 : Question intérêt prépa dropdown
- FR-POPUP-04 : Incentive affiché
- FR-POPUP-05 : Modal non fermable sans remplir

**FR-LETTRE : Affichage (6)**
- FR-LETTRE-01 : Lettre floutée CSS avant popup
- FR-LETTRE-02 : Lettre défloutée après popup
- FR-LETTRE-03 : Bouton copier
- FR-LETTRE-04 : Max 1500 caractères
- FR-LETTRE-05 : Pas de nom/prénom (anonymat)
- FR-LETTRE-06 : Nom université mentionné

**FR-UX : Expérience (5)**
- FR-UX-01 : 2 colonnes desktop
- FR-UX-02 : 1 colonne mobile
- FR-UX-03 : Indicateur progression
- FR-UX-04 : Messages encourageants
- FR-UX-05 : Animation génération 5s min

**FR-TRACKING : Analytics (6)**
- FR-TRACKING-01 : Event form_started
- FR-TRACKING-02 : Event bloc_completed
- FR-TRACKING-03 : Event generation_started
- FR-TRACKING-04 : Event popup_displayed
- FR-TRACKING-05 : Event lead_captured
- FR-TRACKING-06 : Event letter_revealed

### NonFunctional Requirements

**NFR-PERF : Performance (3)**
- NFR-PERF-01 : Chargement < 3s sur 4G
- NFR-PERF-02 : Transitions < 100ms
- NFR-PERF-03 : Génération < 20s

**NFR-RESP : Responsive (7)**
- NFR-RESP-01 : Écrans 320px à 1920px
- NFR-RESP-02 : Mobile-first
- NFR-RESP-03 : Breakpoint 768px
- NFR-RESP-04 : Mobile : formulaire pleine largeur
- NFR-RESP-05 : Desktop : 2 colonnes
- NFR-RESP-06 : Touch-friendly (min 44px)
- NFR-RESP-07 : Popup lisible tous écrans

**NFR-COMP : Composants (8)**
- NFR-COMP-01 : Composant QuestionBlock générique
- NFR-COMP-02 : Composant TextField réutilisable
- NFR-COMP-03 : Composant Dropdown réutilisable
- NFR-COMP-04 : Composant NumberField réutilisable
- NFR-COMP-05 : Composant ProgressBar
- NFR-COMP-06 : Composant Modal réutilisable
- NFR-COMP-07 : Composant Button variantes
- NFR-COMP-08 : Questions en config JSON/TS

**NFR-ACCESS : Accessibilité (3)**
- NFR-ACCESS-01 : Navigation clavier
- NFR-ACCESS-02 : Labels associés
- NFR-ACCESS-03 : Contrastes WCAG AA

**NFR-COMPAT : Compatibilité (2)**
- NFR-COMPAT-01 : Chrome, Safari, Firefox, Edge
- NFR-COMPAT-02 : iOS Safari, Chrome Android

**NFR-SEC : Sécurité (3)**
- NFR-SEC-01 : HTTPS uniquement
- NFR-SEC-02 : Validation côté client
- NFR-SEC-03 : Pas de stockage local sensible

**NFR-MAINT : Maintenabilité (3)**
- NFR-MAINT-01 : Composants réutilisables
- NFR-MAINT-02 : Config externalisée
- NFR-MAINT-03 : Questions en fichier config

**NFR-FIAB : Fiabilité (2)**
- NFR-FIAB-01 : Error handling avec message friendly
- NFR-FIAB-02 : Données non perdues en cas d'erreur

### Additional Requirements

**From Architecture :**
- Starter template : `npm create vite@latest -- --template react-ts`
- State management : Zustand
- Styling : TailwindCSS + palette custom Hippocast (beige/violet)
- Tracking : PostHog SDK
- HTTP Client : fetch natif + AbortController
- Structure projet définie avec composants ui/, form/, layout/, letter/, popup/

**From UX Design :**
- Système de tabs avec 4 états visuels (active beige, complétée gris, prête violet, à venir blanc)
- Tab active intégrée au bloc sans bordure (continuité visuelle)
- Tabs empilées sur mobile avec numéros visibles (1/4, 2/4, etc.)
- Questions apparaissent une par une progressivement
- Animation génération 5s minimum avec message engageant
- Lettre floutée → popup modale → lettre défloutée
- État final : récap scrollable à gauche, lettre à droite
- Bouton "Passer à l'étape suivante" quand bloc complété
- Tab suivante devient violette quand bloc actuel terminé

### FR Coverage Map

| Requirement | Epic |
|-------------|------|
| FR-FLOW-01 | Epic 3 |
| FR-FLOW-02 | Epic 3 |
| FR-FLOW-03 | Epic 4 |
| FR-FLOW-04 | Epic 4 |
| FR-FLOW-05 | Epic 4 |
| FR-FLOW-06 | Epic 4 |
| FR-FLOW-07 | Epic 4 |
| FR-FLOW-08 | Epic 4 |
| FR-BLOC1-01 à 04 | Epic 3 |
| FR-BLOC2-01 à 10 | Epic 3 |
| FR-BLOC3-01 à 10 | Epic 3 |
| FR-BLOC4-01 à 03 | Epic 3 |
| FR-POPUP-01 à 05 | Epic 4 |
| FR-LETTRE-01 à 06 | Epic 4 |
| FR-UX-01 | Epic 2 |
| FR-UX-02 | Epic 2 |
| FR-UX-03 | Epic 2 |
| FR-UX-04 | Epic 3 |
| FR-UX-05 | Epic 4 |
| FR-TRACKING-01 à 06 | Epic 4 |
| NFR-COMP-01 à 07 | Epic 1 |
| NFR-COMP-08 | Epic 3 |
| NFR-RESP-01 à 07 | Epic 2 |
| NFR-ACCESS-01 à 03 | Epic 1 |
| NFR-MAINT-01 à 03 | Epic 1, 3 |
| NFR-FIAB-01 à 02 | Epic 4 |

## Epic List

1. **Epic 1: Fondations & Design System** - Setup projet + composants UI de base stylés Hippocast
2. **Epic 2: Système de Tabs & Layout** - Layout 2 colonnes + système de tabs avec 4 états visuels
3. **Epic 3: Formulaire Multi-Blocs** - 4 blocs de questions avec branchement PASS/LAS
4. **Epic 4: Génération, Capture & Analytics** - Webhook, animation, popup capture, tracking PostHog

---

## Epic 1: Fondations & Design System

**Goal :** Setup du projet Vite/React/TS avec TailwindCSS et création des composants UI de base stylés selon la charte Hippocast.

**Requirements couverts :** NFR-COMP-01 à 07, NFR-ACCESS-01 à 03, NFR-MAINT-01, Architecture setup

### Story 1.1: Setup projet et configuration TailwindCSS

As a **développeur**,
I want **un projet Vite/React/TS configuré avec TailwindCSS et la palette Hippocast**,
So that **je puisse développer les composants avec le bon design system**.

**Acceptance Criteria:**

**Given** le projet n'existe pas encore
**When** j'exécute `npm create vite@latest -- --template react-ts`
**Then** le projet est créé avec React 18 et TypeScript
**And** TailwindCSS est installé et configuré
**And** la palette custom (beige #F5F0E8, violet #7C3AED, etc.) est définie dans tailwind.config.js
**And** la structure de dossiers `src/components/{ui,form,layout,letter,popup}` existe
**And** `npm run dev` lance l'app sur localhost

### Story 1.2: Composant Button avec variantes

As a **utilisateur**,
I want **des boutons visuellement cohérents et accessibles**,
So that **je puisse naviguer clairement dans le formulaire**.

**Acceptance Criteria:**

**Given** le projet est configuré avec TailwindCSS
**When** j'utilise le composant Button
**Then** il supporte 3 variantes : primary (violet), secondary (beige), ghost (transparent)
**And** il supporte 2 tailles : default et small
**And** il a un état disabled visuellement distinct
**And** il est navigable au clavier (focus visible)
**And** la zone tactile fait minimum 44px

### Story 1.3: Composant TextField réutilisable

As a **utilisateur**,
I want **des champs texte clairs avec labels et validation visuelle**,
So that **je sache quoi remplir et si ma saisie est valide**.

**Acceptance Criteria:**

**Given** j'utilise le composant TextField
**When** je remplis un champ
**Then** le label est affiché et associé au champ (htmlFor)
**And** le placeholder est optionnel
**And** l'état error affiche un message rouge sous le champ
**And** le champ est navigable au clavier
**And** le contraste texte/fond respecte WCAG AA

### Story 1.4: Composant Dropdown réutilisable

As a **utilisateur**,
I want **des menus déroulants avec les options du formulaire**,
So that **je puisse sélectionner mes réponses rapidement**.

**Acceptance Criteria:**

**Given** j'utilise le composant Dropdown
**When** je clique ou navigue au clavier
**Then** les options s'affichent dans une liste déroulante
**And** je peux sélectionner avec click ou Enter
**And** le composant accepte une liste d'options en props
**And** l'option sélectionnée est visible dans le champ
**And** le style est cohérent avec TextField

### Story 1.5: Composant NumberField réutilisable

As a **utilisateur**,
I want **des champs numériques pour saisir mes moyennes**,
So that **je puisse entrer des valeurs entre 0 et 20**.

**Acceptance Criteria:**

**Given** j'utilise le composant NumberField
**When** je saisis une valeur
**Then** seuls les chiffres sont acceptés
**And** les valeurs min/max sont configurables en props
**And** l'état error s'affiche si valeur hors bornes
**And** le style est cohérent avec TextField

### Story 1.6: Composant Modal réutilisable

As a **développeur**,
I want **un composant Modal générique**,
So that **je puisse l'utiliser pour la popup de capture**.

**Acceptance Criteria:**

**Given** j'utilise le composant Modal
**When** la modal est ouverte
**Then** un overlay sombre couvre l'arrière-plan
**And** le contenu est centré sur l'écran
**And** la modal est responsive (lisible sur mobile)
**And** le focus est piégé dans la modal (accessibilité)
**And** le composant accepte children en props

---

## Epic 2: Système de Tabs & Layout

**Goal :** Créer le layout 2 colonnes desktop / 1 colonne mobile avec le système de tabs à 4 états visuels.

**Requirements couverts :** FR-UX-01, FR-UX-02, FR-UX-03, NFR-RESP-01 à 07, UX Design tabs

### Story 2.1: Layout 2 colonnes desktop

As a **utilisateur desktop**,
I want **voir le formulaire à gauche et la preview lettre à droite**,
So that **je puisse suivre ma progression tout en voyant le résultat**.

**Acceptance Criteria:**

**Given** l'écran fait 768px ou plus de large
**When** j'affiche l'application
**Then** le layout affiche 2 colonnes côte à côte (50/50)
**And** la colonne gauche contient le formulaire avec les tabs
**And** la colonne droite contient la zone de preview lettre
**And** les colonnes ont une hauteur de 100vh avec scroll interne si nécessaire

### Story 2.2: Layout 1 colonne mobile

As a **utilisateur mobile**,
I want **voir le formulaire en plein écran**,
So that **je puisse remplir confortablement sur petit écran**.

**Acceptance Criteria:**

**Given** l'écran fait moins de 768px de large
**When** j'affiche l'application
**Then** le layout affiche 1 seule colonne pleine largeur
**And** le formulaire avec tabs occupe tout l'écran
**And** la zone de preview est masquée (affichée plus tard)
**And** tous les éléments interactifs font minimum 44px de zone tactile

### Story 2.3: Composant Tab avec 4 états visuels

As a **utilisateur**,
I want **voir visuellement l'état de chaque étape du formulaire**,
So that **je sache où j'en suis et ce qui reste à faire**.

**Acceptance Criteria:**

**Given** j'utilise le composant Tab
**When** je lui passe un état (active, completed, ready, upcoming)
**Then** l'état **active** : fond beige, pas de bordure en bas, hauteur plus grande
**And** l'état **completed** : fond gris/beige foncé, bordure complète, numéro visible
**And** l'état **ready** : fond violet, bordure complète, cliquable
**And** l'état **upcoming** : fond blanc, bordure complète, non cliquable
**And** le numéro du bloc est toujours visible (1, 2, 3, 4)

### Story 2.4: Barre de tabs desktop avec progression

As a **utilisateur desktop**,
I want **une barre de tabs horizontale au-dessus du formulaire**,
So that **je puisse voir ma progression et naviguer entre les blocs complétés**.

**Acceptance Criteria:**

**Given** je suis sur desktop (≥768px)
**When** j'affiche le formulaire
**Then** les 4 tabs sont alignées horizontalement de gauche à droite
**And** tab 1 est à l'extrême gauche, tab 4 à l'extrême droite
**And** la tab active est visuellement connectée au bloc (pas de bordure entre les deux)
**And** je peux cliquer sur les tabs completed ou ready pour y naviguer
**And** quand je termine un bloc, la tab suivante passe de upcoming à ready (violet)

### Story 2.5: Tabs empilées mobile avec numéros

As a **utilisateur mobile**,
I want **voir les tabs empilées avec les numéros de progression**,
So that **je sache où j'en suis même sur petit écran**.

**Acceptance Criteria:**

**Given** je suis sur mobile (<768px)
**When** j'affiche le formulaire
**Then** les tabs sont affichées en ligne compacte
**And** les tabs complétées sont à gauche avec leur numéro (ex: "1")
**And** la tab active est au centre, plus haute
**And** les tabs à venir sont à droite avec leur numéro
**And** le format "X/4" est visible pour indiquer la progression
**And** le bloc de questions fait toute la largeur sous les tabs

---

## Epic 3: Formulaire Multi-Blocs

**Goal :** Implémenter les 4 blocs de questions avec branchement conditionnel PASS/LAS et apparition progressive des questions.

**Requirements couverts :** FR-FLOW-01, FR-FLOW-02, FR-BLOC1-* à FR-BLOC4-*, FR-UX-04, NFR-COMP-08, NFR-SEC-02, NFR-MAINT-02/03

### Story 3.1: Configuration des questions en TypeScript

As a **développeur**,
I want **toutes les questions définies dans un fichier de configuration typé**,
So that **je puisse facilement modifier les questions sans toucher au code des composants**.

**Acceptance Criteria:**

**Given** je crée le fichier `src/config/questions.config.ts`
**When** je définis les questions
**Then** chaque question a : id, type (text/dropdown/number/boolean), label, placeholder, options (si dropdown)
**And** chaque question a : required (boolean), condition (optionnel pour affichage conditionnel)
**And** les questions sont groupées par bloc (bloc1, bloc2, bloc3, bloc4)
**And** les conditions PASS/LAS sont exprimées (ex: `{ field: 'parcours', value: 'PASS' }`)
**And** les types TypeScript sont exportés pour typage fort

### Story 3.2: Store Zustand pour le formulaire

As a **développeur**,
I want **un store Zustand gérant l'état du formulaire**,
So that **toutes les réponses soient centralisées et persistantes entre les blocs**.

**Acceptance Criteria:**

**Given** je crée le fichier `src/store/useFormStore.ts`
**When** j'utilise le store
**Then** il contient : currentBloc (1-4), parcours ('PASS'|'LAS'|null), responses (Record<string, any>)
**And** il contient : blocStatus (array de 'pending'|'active'|'completed')
**And** actions disponibles : setResponse, nextBloc, previousBloc, goToBloc, completeBloc
**And** les réponses sont conservées quand je navigue entre les blocs
**And** le store calcule automatiquement quelles questions afficher selon les conditions

### Story 3.3: Bloc 1 Profil avec branchement PASS/LAS

As a **utilisateur**,
I want **répondre aux questions de profil et choisir PASS ou LAS**,
So that **le formulaire s'adapte à mon parcours**.

**Acceptance Criteria:**

**Given** je suis sur le bloc 1
**When** je réponds aux questions
**Then** question 1 : dropdown PASS/LAS (obligatoire)
**And** question 2 : texte libre université (obligatoire)
**And** si PASS : question 3 = dropdown sous-vœux (1/2/3)
**And** si LAS : question 3 = dropdown licence majeure (Droit, Biologie, etc.)
**And** les questions apparaissent une par une après validation de la précédente
**And** bouton "Passer à l'étape suivante" apparaît quand toutes les questions obligatoires sont remplies
**And** la tab du bloc 2 devient violette (ready) quand je termine

### Story 3.4: Bloc 2 Parcours avec questions conditionnelles

As a **utilisateur**,
I want **répondre aux questions sur mon parcours scolaire**,
So that **ma lettre reflète mes résultats et expériences**.

**Acceptance Criteria:**

**Given** je suis sur le bloc 2
**When** je réponds aux questions
**Then** si PASS : question motivation médecine (texte)
**And** si LAS : question motivation licence (texte)
**And** questions communes : spé 1 (dropdown) + moyenne (number 0-20)
**And** questions communes : spé 2 (dropdown) + moyenne (number 0-20)
**And** question qualité travail (dropdown : Rigueur, Organisation, etc.)
**And** question exemple qualité (texte)
**And** question TPE/projet (oui/non)
**And** si TPE=oui : question détail TPE (texte)
**And** les questions apparaissent progressivement
**And** validation : moyennes entre 0 et 20

### Story 3.5: Bloc 3 Projet & Qualités

As a **utilisateur**,
I want **répondre aux questions sur mon projet et mes qualités humaines**,
So that **ma lettre mette en valeur mes engagements**.

**Acceptance Criteria:**

**Given** je suis sur le bloc 3
**When** je réponds aux questions
**Then** si PASS avec 1 sous-vœu : question mineure (texte)
**And** si PASS avec 2-3 sous-vœux : pas de question mineure
**And** si LAS : question motivation santé (texte)
**And** si LAS : question pourquoi LAS (texte)
**And** si LAS : question lien licence/santé (texte optionnel)
**And** si LAS : question activité intensive (oui/non)
**And** si LAS + activité=oui : question détail activité (texte)
**And** questions communes : engagement (dropdown), qualité engagement (texte), PSC1 (oui/non)
**And** les questions apparaissent progressivement selon les conditions

### Story 3.6: Bloc 4 Faculté

As a **utilisateur**,
I want **répondre aux questions sur la faculté visée**,
So that **ma lettre montre mon intérêt pour cette université**.

**Acceptance Criteria:**

**Given** je suis sur le bloc 4
**When** je réponds aux questions
**Then** question JPO (oui/non)
**And** si JPO=oui : question retenu JPO (texte)
**And** question attraction fac (texte optionnel)
**And** les questions apparaissent progressivement
**And** bouton "Générer ma lettre" apparaît quand bloc complété
**And** ce bouton déclenche l'envoi au webhook (Epic 4)

### Story 3.7: Apparition progressive et messages encourageants

As a **utilisateur**,
I want **voir les questions apparaître une par une avec des messages positifs**,
So that **le formulaire soit engageant et pas intimidant**.

**Acceptance Criteria:**

**Given** je remplis un bloc
**When** je valide une question
**Then** la question suivante apparaît avec une animation douce (fade-in)
**And** un message encourageant s'affiche entre certaines questions (ex: "Super ! Continue comme ça")
**And** l'indicateur de progression se met à jour
**And** le scroll suit automatiquement vers la nouvelle question
**And** les questions déjà remplies restent visibles et modifiables au-dessus

---

## Epic 4: Génération, Capture & Analytics

**Goal :** Implémenter l'envoi webhook, l'animation de génération, la popup de capture, le défloutage et le tracking PostHog.

**Requirements couverts :** FR-FLOW-03 à 08, FR-POPUP-01 à 05, FR-LETTRE-01 à 06, FR-UX-05, FR-TRACKING-01 à 06, NFR-PERF-03, NFR-FIAB-01/02

### Story 4.1: Envoi des données au webhook n8n

As a **système**,
I want **envoyer toutes les réponses du formulaire au webhook n8n**,
So that **la lettre puisse être générée côté backend**.

**Acceptance Criteria:**

**Given** l'utilisateur clique sur "Générer ma lettre"
**When** j'envoie les données
**Then** un POST est envoyé au webhook n8n avec toutes les réponses en JSON
**And** le payload inclut : parcours, université, toutes les réponses des 4 blocs
**And** j'utilise fetch natif avec AbortController (timeout 20s)
**And** en cas de succès, je reçois la lettre générée dans la réponse
**And** en cas d'erreur, un message friendly s'affiche avec possibilité de réessayer
**And** les données du formulaire ne sont pas perdues en cas d'erreur

### Story 4.2: Animation de génération 5 secondes minimum

As a **utilisateur**,
I want **voir une animation engageante pendant la génération**,
So that **je reste patient et ne quitte pas la page**.

**Acceptance Criteria:**

**Given** j'ai cliqué sur "Générer ma lettre"
**When** la génération est en cours
**Then** une animation de chargement s'affiche (spinner ou animation custom)
**And** un message engageant accompagne l'animation (ex: "On rédige ta lettre...")
**And** l'animation dure minimum 5 secondes même si la réponse arrive plus tôt
**And** si la réponse prend plus de 5s, l'animation continue jusqu'à réception
**And** la zone de preview (colonne droite ou plein écran mobile) affiche cette animation

### Story 4.3: Affichage de la lettre floutée

As a **utilisateur**,
I want **voir ma lettre générée en version floutée**,
So that **je sois motivé à remplir la popup pour la débloquer**.

**Acceptance Criteria:**

**Given** la lettre a été générée avec succès
**When** j'affiche le résultat
**Then** la lettre apparaît dans la zone de preview
**And** le texte est flouté avec un effet CSS (filter: blur)
**And** la lettre fait maximum 1500 caractères
**And** le nom de l'université est visible (mentionné dans la lettre)
**And** aucun nom/prénom n'apparaît (anonymat Parcoursup)
**And** la popup de capture s'affiche automatiquement par-dessus

### Story 4.4: Popup de capture avec validation

As a **utilisateur**,
I want **remplir mes coordonnées dans une popup**,
So that **je puisse débloquer ma lettre**.

**Acceptance Criteria:**

**Given** la lettre floutée est affichée
**When** la popup s'ouvre
**Then** champ email obligatoire avec validation format email
**And** champ téléphone obligatoire avec validation format FR
**And** dropdown "Tu envisages de faire une prépa ?" (Oui définitivement / Oui peut-être / Non / Je ne sais pas)
**And** texte incentive affiché : "Reçois une méthode pour réussir la prépa PASS"
**And** la popup ne peut PAS être fermée sans remplir tous les champs obligatoires
**And** cliquer en dehors ou sur X ne ferme pas la popup
**And** bouton "Voir ma lettre" actif seulement si formulaire valide

### Story 4.5: Envoi données capture et défloutage

As a **système**,
I want **envoyer les données de capture au webhook et déflouter la lettre**,
So that **le lead soit capturé et l'utilisateur récompensé**.

**Acceptance Criteria:**

**Given** l'utilisateur valide la popup de capture
**When** j'envoie les données
**Then** un POST est envoyé au webhook n8n avec : email, téléphone, intérêt prépa
**And** le payload inclut aussi un identifiant liant au premier appel (ou les mêmes données formulaire)
**And** en cas de succès, la popup se ferme
**And** la lettre se défloute avec une animation douce (transition CSS)
**And** en cas d'erreur, message friendly avec possibilité de réessayer

### Story 4.6: État final avec bouton copier

As a **utilisateur**,
I want **voir ma lettre en clair avec un bouton pour la copier**,
So that **je puisse l'utiliser facilement sur Parcoursup**.

**Acceptance Criteria:**

**Given** la popup est validée et la lettre défloutée
**When** j'affiche l'état final
**Then** sur desktop : récap scrollable à gauche, lettre à droite
**And** sur mobile : lettre en plein écran
**And** bouton "Copier ma lettre" visible et proéminent
**And** clic sur le bouton copie le texte dans le presse-papier
**And** feedback visuel après copie (ex: "Copié !" pendant 2s)
**And** la lettre affiche max 1500 caractères, nom université, pas de nom/prénom

### Story 4.7: Intégration PostHog tracking

As a **product owner**,
I want **tracker tous les événements clés du parcours**,
So that **je puisse analyser les conversions et optimiser le funnel**.

**Acceptance Criteria:**

**Given** PostHog SDK est configuré
**When** l'utilisateur progresse dans le flow
**Then** event `form_started` envoyé quand bloc 1 commence
**And** event `bloc_completed` envoyé avec bloc number (1-4) à chaque fin de bloc
**And** event `generation_started` envoyé au clic sur "Générer"
**And** event `popup_displayed` envoyé quand popup capture s'affiche
**And** event `lead_captured` envoyé quand popup validée (avec intérêt prépa)
**And** event `letter_revealed` envoyé quand lettre défloutée
**And** chaque event inclut un user_id anonyme pour tracking du parcours
