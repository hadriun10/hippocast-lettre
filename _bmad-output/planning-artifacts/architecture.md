---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['prd.md', 'ux-design.md', 'recap-discovery.md']
workflowType: 'architecture'
project_name: 'hippocast-lettre-motivation'
user_name: 'Hadrien'
date: '2026-01-26'
status: 'complete'
completedAt: '2026-01-26'
---

# Architecture Decision Document

_Ce document se construit collaborativement étape par étape. Les sections sont ajoutées au fur et à mesure des décisions architecturales._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- 48 FRs répartis en 8 catégories (FLOW, BLOC1-4, POPUP, LETTRE, UX, TRACKING)
- Flow principal : Formulaire 4 blocs → Animation → Lettre floutée → Pop-up → Lettre défloutée
- Branchement conditionnel PASS/LAS dès le bloc 1
- Questions progressives (apparition une par une au fur et à mesure des réponses)
- Système de tabs avec états visuels (active/complétée/prête/à venir)
- Tab active intégrée au bloc (continuité visuelle sans bordure)

**Non-Functional Requirements:**
- 27 NFRs avec 2 priorités hautes
- **NFR-RESP** (7 items) : Mobile-first, breakpoint 768px, tabs empilées sur mobile
- **NFR-COMP** (8 items) : Composants réutilisables, configuration externalisée en JSON
- Performance : Chargement < 3s, génération lettre < 20s
- Accessibilité : WCAG AA, navigation clavier
- Compatibilité : Chrome, Safari, Firefox, Edge + iOS/Android

**Scale & Complexity:**
- Complexité globale : Moyenne
- Domaine technique : Frontend SPA React
- UX Complexity : Haute (tabs dynamiques, animations, responsive avancé)
- Composants estimés : ~15-20 composants React
- Pages : 1 (Single Page Application)

### Technical Constraints & Dependencies

| Contrainte | Impact |
|------------|--------|
| Hébergement Vercel | Déploiement simple, edge functions si besoin |
| Backend n8n externe | Pas de contrôle direct, timeout à gérer |
| Timeout LLM ~20s | Animation obligatoire pour masquer latence |
| PostHog analytics | Intégration tracking sur tous les événements |

### Cross-Cutting Concerns

1. **State Management** : Formulaire multi-étapes avec état complexe (réponses, bloc actuel, état des tabs)
2. **Logique Conditionnelle** : Branchement PASS/LAS + questions dynamiques selon réponses
3. **Responsive Design** : Desktop 2 colonnes / Mobile 1 colonne + tabs empilées
4. **Error Handling** : Gestion timeout n8n, retry, messages utilisateur
5. **Tracking** : Events PostHog sur tout le parcours (6 events identifiés)

## Starter Template Evaluation

### Primary Technology Domain

Web App SPA (Single Page Application) - Application frontend React sans besoin de SSR.

### Starter Options Considered

| Option | Verdict |
|--------|---------|
| **Vite + React + TS** | ✅ Recommandé - Léger, rapide, parfait pour SPA |
| **Next.js** | ❌ Overkill - SSR/API routes non nécessaires |
| **Create React App** | ❌ Deprecated |

### Selected Starter: Vite + React + TypeScript

**Rationale:**
- Pas de besoin SEO (outil de génération, pas site vitrine)
- Backend externe (n8n) → pas besoin d'API routes
- Dev ultra-rapide avec HMR
- Léger (31 MB vs 140+ MB pour CRA)
- Déploiement simple sur Vercel

**Initialization Command:**

```bash
npm create vite@latest hippocast-lettre-motivation -- --template react-ts
```

### Architectural Decisions Provided by Starter

| Aspect | Décision |
|--------|----------|
| **Language & Runtime** | TypeScript strict mode, ESLint préconfigurée |
| **Build Tooling** | Vite (esbuild dev, Rollup prod), HMR ultra-rapide |
| **Code Organization** | Structure src/ standard, composants dans src/components/ |

### À Ajouter au Starter

| Aspect | À installer |
|--------|-------------|
| **Styling** | TailwindCSS (responsive complexe) |
| **Testing** | Vitest (compatible Vite natif) |
| **State Management** | Zustand ou useState (à décider) |
| **Analytics** | PostHog SDK |

**Note:** L'initialisation du projet avec cette commande sera la première story d'implémentation.

## Core Architectural Decisions

### Frontend Architecture

| Décision | Choix | Rationale |
|----------|-------|-----------|
| **State Management** | Zustand | Léger (~1kb), API simple comme useState, parfait pour formulaire multi-étapes |
| **Styling** | TailwindCSS | Utility-first idéal pour responsive complexe (tabs empilées), variantes d'état faciles |
| **Configuration Questions** | TypeScript (`questions.config.ts`) | Type-safe, autocomplétion IDE, facile à maintenir |
| **Routing** | Aucun (SPA single page) | Une seule page, pas besoin de router |
| **Design System** | Custom (style Hippocast) | Palette beige/violet, coins arrondis, cohérent avec UX Design |

### Composants de Base (Design System)

Les composants réutilisables doivent être stylés selon le design Hippocast :

| Composant | Style (basé sur screenshots Hippocast) |
|-----------|-------|
| **Button Primary** | Fond `#8B5CF6`, texte blanc, bordure-radius 8px, padding 14px 28px |
| **Button Toggle** | Non sélectionné: fond blanc, bordure `#1F2937` / Sélectionné: fond `#8B5CF6` |
| **TextField** | Fond blanc, bordure `#1F2937` 1px, focus `#8B5CF6`, radius 8px |
| **Dropdown** | Idem TextField + chevron, option active fond `#DDD6FE` + checkmark |
| **NumberField** | Idem TextField, compact (80px width) |
| **Modal** | Fond blanc, shadow 20px, overlay semi-transparent, radius 16px |
| **Tabs** | Active: `#E8DFD4` sans bordure bas / Complétée: `#D4C9BC` / Prête: `#8B5CF6` / À venir: blanc |
| **QuestionBlock** | Fond `#FDF8F3`, bordure `#1F2937` 1px, radius 12px |

**Palette de couleurs (Tailwind config) - Référence screenshots Hippocast :**

```javascript
// tailwind.config.js - colors
colors: {
  'bg-page': '#FDF8F3',        // Fond page principal
  'bg-form': '#FDF8F3',        // Fond bloc formulaire
  'tab-active': '#E8DFD4',     // Tab active (beige/tan)
  'tab-completed': '#D4C9BC',  // Tab complétée (beige foncé)
  'violet': {
    DEFAULT: '#8B5CF6',        // Boutons CTA, sélections
    light: '#DDD6FE',          // Fond dropdown sélectionné
    dark: '#7C3AED',           // Hover
  },
  'border': '#1F2937',         // Bordures inputs, tabs
  'text-primary': '#1F2937',   // Texte principal
  'text-secondary': '#6B7280', // Labels, texte secondaire
}
```

### API & Communication

| Décision | Choix | Rationale |
|----------|-------|-----------|
| **HTTP Client** | fetch natif + AbortController | Suffisant pour 2 appels webhook, pas de dépendance supplémentaire |
| **Timeout Strategy** | 20s avec AbortController | Animation 5s minimum masque la latence |
| **Error Handling** | Try/catch + état d'erreur Zustand | Message friendly à l'utilisateur, pas de retry automatique |

### Data & Validation

| Décision | Choix | Rationale |
|----------|-------|-----------|
| **Database** | Aucune (stateless) | Tout est envoyé à n8n, pas de persistance côté frontend |
| **Form Validation** | Validation côté client | Champs requis, format email/téléphone, avant envoi |
| **Data Schema** | Types TypeScript | Interfaces pour FormData, Response, etc. |

### Security

| Décision | Choix | Rationale |
|----------|-------|-----------|
| **Authentication** | Aucune | Outil public, pas de compte utilisateur |
| **HTTPS** | Vercel (automatique) | Certificat SSL inclus |
| **Data Privacy** | Pas de localStorage sensible | Email/téléphone envoyés directement à n8n |

### Infrastructure & Deployment

| Décision | Choix | Rationale |
|----------|-------|-----------|
| **Hosting** | Vercel | Déjà décidé, déploiement automatique |
| **CI/CD** | Vercel (automatique) | Push to main = deploy |
| **Environment Variables** | `.env` + Vercel dashboard | URL webhook n8n, clé PostHog |

### Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.x | UI Framework |
| `zustand` | ^4.x | State Management |
| `tailwindcss` | ^3.x | Styling |
| `posthog-js` | ^1.x | Analytics |

### Decision Impact Analysis

**Séquence d'implémentation recommandée :**
1. Init projet Vite + React + TS
2. Setup TailwindCSS + config couleurs custom
3. Setup Zustand store
4. Créer composants de base stylés (Button, TextField, Dropdown, etc.)
5. Implémenter système de tabs (4 états visuels)
6. Implémenter formulaire multi-étapes
7. Intégrer n8n webhook
8. Ajouter PostHog tracking
9. Implémenter popup + blur/défloutage

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Fichiers & Dossiers :**

| Élément | Convention | Exemple |
|---------|------------|---------|
| Composants React | PascalCase | `Button.tsx`, `QuestionBlock.tsx` |
| Hooks custom | camelCase avec "use" | `useFormStore.ts` |
| Utilitaires | camelCase | `formatPhone.ts` |
| Types/Interfaces | PascalCase | `types.ts` → `FormData`, `Question` |
| Config | kebab-case | `questions.config.ts` |
| Dossiers | kebab-case | `components/`, `question-blocks/` |

**Variables & Fonctions :**

| Élément | Convention | Exemple |
|---------|------------|---------|
| Variables | camelCase | `currentBlock`, `formData` |
| Fonctions | camelCase | `handleSubmit`, `goToNextBlock` |
| Constantes | UPPER_SNAKE_CASE | `MAX_CHARACTERS`, `API_TIMEOUT` |
| Types | PascalCase | `QuestionType`, `BlockState` |

### Structure Patterns

```
src/
├── components/           # Composants réutilisables
│   ├── ui/              # Composants de base (Button, TextField, Dropdown, Modal)
│   └── form/            # Composants formulaire (QuestionBlock, Tabs, ProgressBar)
├── config/              # Configuration
│   ├── questions.config.ts   # Questions PASS/LAS
│   └── theme.config.ts       # Couleurs, styles
├── hooks/               # Hooks custom
├── store/               # Zustand stores
│   └── useFormStore.ts
├── types/               # Types TypeScript
│   └── index.ts
├── utils/               # Fonctions utilitaires
│   ├── validation.ts
│   └── format.ts
├── lib/                 # Intégrations externes
│   ├── posthog.ts
│   └── api.ts           # Appels n8n
└── App.tsx
```

### Format Patterns

**Réponse n8n attendue :**

```typescript
interface N8nFormResponse {
  success: boolean;
  letter?: string;
  error?: string;
}

interface N8nPopupResponse {
  success: boolean;
  error?: string;
}
```

**Payload formulaire (camelCase) :**

```typescript
interface FormPayload {
  parcours: 'PASS' | 'LAS';
  university: string;
  sousVoeux?: number;        // PASS uniquement
  licenceMajeure?: string;   // LAS uniquement
  motivationMedecine?: string;
  motivationLicence?: string;
  specialite1: string;
  moyenne1: number;
  specialite2: string;
  moyenne2: number;
  qualite: string;
  exempleQualite: string;
  tpe: boolean;
  tpeDetail?: string;
  engagement: string;
  qualiteEngagement: string;
  psc1: boolean;
  jpo: boolean;
  jpoRetenu?: string;
  attractionFac?: string;
}

interface PopupPayload {
  email: string;
  telephone: string;
  interetPrepa: 'oui' | 'non' | 'je-ne-sais-pas';
}
```

### State Patterns (Zustand)

**Organisation du store :**

```typescript
// store/useFormStore.ts
interface FormState {
  // Navigation
  currentBlock: number;
  currentQuestionIndex: number;

  // Data
  parcours: 'PASS' | 'LAS' | null;
  answers: Record<string, string | number | boolean>;

  // UI States
  isLoading: boolean;
  isGenerating: boolean;
  showPopup: boolean;
  isLetterBlurred: boolean;

  // Results
  letter: string | null;
  error: string | null;

  // Actions (verbe + sujet)
  setAnswer: (questionId: string, value: any) => void;
  goToNextQuestion: () => void;
  goToNextBlock: () => void;
  goToPreviousBlock: () => void;
  submitForm: () => Promise<void>;
  submitPopup: (data: PopupPayload) => Promise<void>;
  revealLetter: () => void;
  resetForm: () => void;
}
```

### Process Patterns

**Error Handling :**

```typescript
// Pattern standard pour les appels API
try {
  setIsLoading(true);
  const response = await fetch(url, options);
  const data = await response.json();

  if (!data.success) {
    setError(data.error || 'Une erreur est survenue');
    return;
  }

  // Handle success
} catch (err) {
  setError('Impossible de contacter le serveur. Réessaie dans quelques instants.');
} finally {
  setIsLoading(false);
}
```

**Loading States :**

| State | Usage |
|-------|-------|
| `isLoading` | Appels API généraux |
| `isGenerating` | Animation génération lettre (5s min) |
| `isSubmittingPopup` | Soumission popup |

**PostHog Tracking Pattern :**

```typescript
// lib/posthog.ts
export const track = {
  formStarted: () => posthog.capture('form_started'),
  blocCompleted: (block: number) => posthog.capture('bloc_completed', { block }),
  generationStarted: () => posthog.capture('generation_started'),
  popupDisplayed: () => posthog.capture('popup_displayed'),
  leadCaptured: () => posthog.capture('lead_captured'),
  letterRevealed: () => posthog.capture('letter_revealed'),
};
```

### Enforcement Guidelines

**Tous les développeurs/agents DOIVENT :**

1. Utiliser les conventions de nommage définies (PascalCase composants, camelCase variables)
2. Placer les fichiers dans les dossiers appropriés selon la structure
3. Utiliser le store Zustand pour tout état partagé
4. Suivre le pattern d'error handling pour les appels API
5. Tracker les events PostHog aux moments définis

## Project Structure & Boundaries

### Complete Project Directory Structure

```
hippocast-lettre-motivation/
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── .env.local                    # Variables locales (gitignored)
├── .gitignore
├── index.html
│
├── public/
│   └── favicon.ico
│
└── src/
    ├── App.tsx                   # Point d'entrée
    ├── main.tsx                  # ReactDOM.render
    ├── index.css                 # Tailwind imports
    │
    ├── components/
    │   ├── ui/                   # Composants de base (Design System)
    │   │   ├── Button.tsx
    │   │   ├── TextField.tsx
    │   │   ├── Dropdown.tsx
    │   │   ├── NumberField.tsx
    │   │   ├── Modal.tsx
    │   │   └── index.ts          # Barrel export
    │   │
    │   ├── form/                 # Composants formulaire
    │   │   ├── Tabs.tsx          # Système de tabs (4 états)
    │   │   ├── Tab.tsx           # Tab individuelle
    │   │   ├── QuestionBlock.tsx # Bloc de questions
    │   │   ├── Question.tsx      # Question individuelle
    │   │   ├── ProgressIndicator.tsx
    │   │   └── index.ts
    │   │
    │   ├── layout/               # Layout components
    │   │   ├── Header.tsx        # Tagline + social proof
    │   │   ├── TwoColumnLayout.tsx
    │   │   ├── MobileLayout.tsx
    │   │   └── index.ts
    │   │
    │   ├── letter/               # Composants lettre
    │   │   ├── LetterPreview.tsx # Preview droite (blur/unblur)
    │   │   ├── LetterDisplay.tsx # Affichage final
    │   │   ├── LoadingAnimation.tsx
    │   │   ├── RecapSummary.tsx  # Récap questions/réponses
    │   │   └── index.ts
    │   │
    │   └── popup/                # Pop-up capture
    │       ├── CapturePopup.tsx
    │       ├── PopupForm.tsx
    │       └── index.ts
    │
    ├── config/
    │   ├── questions.config.ts   # Questions PASS et LAS
    │   ├── theme.config.ts       # Couleurs Tailwind custom
    │   └── constants.ts          # MAX_CHARS, TIMEOUTS, etc.
    │
    ├── store/
    │   └── useFormStore.ts       # Zustand store principal
    │
    ├── hooks/
    │   ├── useResponsive.ts      # Détection mobile/desktop
    │   └── useBlockProgress.ts   # Logique progression blocs
    │
    ├── lib/
    │   ├── api.ts                # Appels n8n webhook
    │   └── posthog.ts            # PostHog tracking
    │
    ├── types/
    │   └── index.ts              # Types globaux
    │
    └── utils/
        ├── validation.ts         # Validation email, téléphone
        └── format.ts             # Formatage données
```

### Requirements to Structure Mapping

| Catégorie FR | Fichiers |
|--------------|----------|
| **FR-FLOW** | `App.tsx`, `store/useFormStore.ts` |
| **FR-BLOC1 à BLOC4** | `config/questions.config.ts`, `components/form/*` |
| **FR-POPUP** | `components/popup/*` |
| **FR-LETTRE** | `components/letter/*` |
| **FR-UX** | `components/layout/*`, `components/form/Tabs.tsx` |
| **FR-TRACKING** | `lib/posthog.ts` |

### Integration Points

| Point | Fichier | Description |
|-------|---------|-------------|
| **n8n Webhook (Form)** | `lib/api.ts` | POST données formulaire → reçoit lettre |
| **n8n Webhook (Popup)** | `lib/api.ts` | POST données capture lead |
| **PostHog** | `lib/posthog.ts` | Events tracking (6 events) |
| **State global** | `store/useFormStore.ts` | Zustand store unique |

### Environment Variables

```bash
# .env.example
VITE_N8N_WEBHOOK_URL=https://xxx.n8n.cloud/webhook/xxx
VITE_POSTHOG_KEY=phc_xxx
VITE_POSTHOG_HOST=https://eu.posthog.com
```

### Data Flow

```
┌─────────────┐     Zustand Store      ┌─────────────┐
│  Questions  │ ◄───────────────────── │   User      │
│  Config     │                        │   Input     │
└──────┬──────┘                        └─────────────┘
       │
       ▼
┌─────────────┐    POST /webhook       ┌─────────────┐
│   Form      │ ──────────────────────►│    n8n      │
│   Submit    │                        │   + LLM     │
└──────┬──────┘◄───────────────────────└─────────────┘
       │         Response (letter)
       ▼
┌─────────────┐    Blur CSS            ┌─────────────┐
│   Letter    │ ──────────────────────►│   Popup     │
│   Preview   │                        │   Capture   │
└──────┬──────┘◄───────────────────────└─────────────┘
       │         Unblur on submit
       ▼
┌─────────────┐    POST /webhook       ┌─────────────┐
│   Letter    │                        │    n8n      │
│   Revealed  │ ──────────────────────►│   (Lead)    │
└─────────────┘                        └─────────────┘
```

## Architecture Validation Results

### Coherence Validation ✅

| Check | Status |
|-------|--------|
| Vite + React + TypeScript | ✅ Compatible |
| Zustand avec React 18 | ✅ Compatible |
| TailwindCSS avec Vite | ✅ Compatible (PostCSS) |
| PostHog avec React | ✅ Compatible |
| Vercel avec Vite | ✅ Supporté nativement |

### Requirements Coverage ✅

| Catégorie FR | Couverture | Composants responsables |
|--------------|------------|-------------------------|
| FR-FLOW (8) | ✅ 100% | `App.tsx`, `useFormStore.ts` |
| FR-BLOC1-4 (18) | ✅ 100% | `questions.config.ts`, `QuestionBlock.tsx` |
| FR-POPUP (5) | ✅ 100% | `CapturePopup.tsx`, `PopupForm.tsx` |
| FR-LETTRE (6) | ✅ 100% | `LetterPreview.tsx`, `LetterDisplay.tsx` |
| FR-UX (5) | ✅ 100% | `Tabs.tsx`, Layouts, `ProgressIndicator.tsx` |
| FR-TRACKING (6) | ✅ 100% | `lib/posthog.ts` |

| Catégorie NFR | Couverture |
|---------------|------------|
| NFR-PERF | ✅ Vite optimisé |
| NFR-RESP | ✅ TailwindCSS responsive |
| NFR-COMP | ✅ 7 composants UI, config externalisée |
| NFR-ACCESS | ✅ Prévu dans composants |
| NFR-SEC | ✅ HTTPS Vercel |
| NFR-MAINT | ✅ Structure claire |

### Implementation Readiness ✅

| Critère | Status |
|---------|--------|
| Décisions documentées avec versions | ✅ |
| Patterns complets | ✅ |
| Structure complète | ✅ |
| Types définis | ✅ |
| Integration points clairs | ✅ |

### Architecture Completeness Checklist

- [x] Contexte projet analysé
- [x] Stack technique définie avec versions
- [x] Patterns d'implémentation documentés
- [x] Structure projet complète
- [x] Mapping requirements → fichiers
- [x] Integration points définis
- [x] Data flow documenté

### Readiness Assessment

**Status : ✅ READY FOR IMPLEMENTATION**

**Niveau de confiance : HIGH**

**Points forts :**
- Architecture simple et adaptée au scope
- Stack moderne et légère (Vite + React + Zustand)
- Patterns clairs pour les agents IA
- UX Design détaillé disponible

**Nice-to-have (post-MVP) :**
- Tests unitaires (Vitest)
- Tests E2E (Playwright)
- Storybook pour composants UI

### AI Agent Implementation Guidelines

1. Suivre exactement les décisions architecturales documentées
2. Utiliser les patterns d'implémentation de manière cohérente
3. Respecter la structure projet et les boundaries
4. Référencer ce document pour toute question architecturale

### First Implementation Step

```bash
npm create vite@latest hippocast-lettre-motivation -- --template react-ts
cd hippocast-lettre-motivation
npm install zustand tailwindcss postcss autoprefixer posthog-js
npx tailwindcss init -p
```

