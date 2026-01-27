# UX Design - Générateur de Lettres de Motivation Parcoursup

**Date :** 2026-01-26
**Auteur :** Hadrien
**Référence visuelle :** https://calculateur.hippocast.fr/

---

## 1. Layout Global

### Desktop (≥ 768px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│              Génère ta lettre de motivation Parcoursup                      │
│     En 4 minutes, obtiens une lettre personnalisée pour ta candidature      │
│                     ⭐⭐⭐⭐⭐ 4.8/5 (xxx avis)                              │
│                                                                             │
├─────────────────────────────────────────┬───────────────────────────────────┤
│                                         │                                   │
│         BLOC GAUCHE                     │         BLOC DROIT                │
│         (Formulaire + Tabs)             │         (Preview / Animation)     │
│                                         │                                   │
│                                         │                                   │
└─────────────────────────────────────────┴───────────────────────────────────┘
```

### Mobile (< 768px)

```
┌─────────────────────────────────┐
│                                 │
│   Génère ta lettre...           │
│   ⭐⭐⭐⭐⭐ 4.8/5               │
│                                 │
├─────────────────────────────────┤
│                                 │
│   [Tabs empilées]               │
│                                 │
│   BLOC FORMULAIRE               │
│   (Questions)                   │
│                                 │
├─────────────────────────────────┤
│   Mini indicateur progression   │
│   "Étape 2/4 - Bientôt fini!"   │
└─────────────────────────────────┘
```

---

## 2. Système de Tabs/Languettes

### États visuels des tabs

| État | Couleur fond | Couleur texte | Bordure | Hauteur |
|------|--------------|---------------|---------|---------|
| **Active** | Beige (même que bloc) | Noir | Pas de bordure en bas (continuité avec bloc) | Plus haute |
| **Complétée** | Beige foncé / Grisé | Gris foncé | Bordure complète | Normale |
| **Suivante (prête)** | Violet | Blanc | Bordure complète | Normale |
| **À venir** | Blanc | Gris clair | Bordure complète | Normale |

### Règle fondamentale

**La tab active fait partie intégrante du bloc** - il n'y a AUCUNE séparation/bordure entre la tab active et le contenu du bloc. C'est une continuité visuelle totale.

### Positionnement des tabs

- **Tab 1** : Alignée à l'extrême **gauche** du bloc
- **Tab 4** : Alignée à l'extrême **droite** du bloc
- Les tabs occupent **toute la largeur** du bloc
- Espacement égal entre les tabs

---

## 3. Visuels Desktop - Les 4 Étapes

### Étape 1/4 - Profil

```
┌────────────────┐
│                │┌──────────────┐┌──────────────┐┌──────────────┐
│  1/4 - Profil  ││     2/4      ││     3/4      ││     4/4      │
│                └┴──────────────┴┴──────────────┴┴──────────────┤
│                                                                │
│   PASS ou LAS ?                                                │
│                                                                │
│   ┌─────────────────────────────────────────────────────┐      │
│   │  -- Choisis --                                   ▼  │      │
│   └─────────────────────────────────────────────────────┘      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

- Tab 1 : **Active** (beige, plus haute, ouverte dans le bloc)
- Tabs 2, 3, 4 : **À venir** (blanches, bordure complète)

---

### Étape 2/4 - Parcours

```
                 ┌──────────────────┐
┌──────────────┐ │                  │ ┌──────────────┐┌──────────────┐
│     1/4      │ │  2/4 - Parcours  │ │     3/4      ││     4/4      │
├──────────────┴─┘                  └─┴──────────────┴┴──────────────┤
│                                                                    │
│   Qu'est-ce qui t'a donné envie de faire médecine ?               │
│                                                                    │
│   ┌──────────────────────────────────────────────────────────┐     │
│   │                                                          │     │
│   └──────────────────────────────────────────────────────────┘     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

- Tab 1 : **Complétée** (grisée)
- Tab 2 : **Active** (beige, plus haute, ouverte dans le bloc)
- Tabs 3, 4 : **À venir** (blanches)

---

### Étape 3/4 - Projet & Qualités

```
                                  ┌──────────────────────────┐
┌──────────────┐┌──────────────┐  │                          │ ┌──────────────┐
│     1/4      ││     2/4      │  │  3/4 - Projet & Qualités │ │     4/4      │
├──────────────┴┴──────────────┴──┘                          └─┴──────────────┤
│                                                                              │
│   Tu as un engagement qui montre tes qualités humaines ?                    │
│                                                                              │
│   ┌────────────────────────────────────────────────────────────────────┐     │
│   │  -- Choisis --                                                  ▼  │     │
│   └────────────────────────────────────────────────────────────────────┘     │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

- Tabs 1, 2 : **Complétées** (grisées)
- Tab 3 : **Active** (beige, plus haute, ouverte dans le bloc)
- Tab 4 : **À venir** (blanche)

---

### Étape 4/4 - Faculté

```
                                                   ┌────────────────┐
┌──────────────┐┌──────────────┐┌──────────────┐   │                │
│     1/4      ││     2/4      ││     3/4      │   │  4/4 - Faculté │
├──────────────┴┴──────────────┴┴──────────────┴───┘                │
│                                                                    │
│   Tu as participé aux JPO de cette fac ?                          │
│                                                                    │
│        ┌───────────┐          ┌───────────┐                        │
│        │    Oui    │          │    Non    │                        │
│        └───────────┘          └───────────┘                        │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

- Tabs 1, 2, 3 : **Complétées** (grisées)
- Tab 4 : **Active** (beige, plus haute, ouverte dans le bloc)

---

## 4. Visuels Mobile - Tabs Empilées

### Principe

Sur mobile, pas assez de place pour afficher les 4 tabs côte à côte avec leur texte. Les tabs se **superposent/empilent** :

- **Tab active** : Affichée en entier avec texte "2/4 - Parcours", plus haute
- **Tabs complétées** (gauche) : Empilées, on voit le bord + numéro "1/4"
- **Tabs à venir** (droite) : Empilées, on voit le bord + numéro "3/4", "4/4"

### Visuel Mobile - Étape 2/4

```
                 ┌──────────────────┐
┌───────┐        │                  │        ┌───────┐┌───────┐
│  1/4  │        │  2/4 - Parcours  │        │  3/4  ││  4/4  │
├───────┴────────┘                  └────────┴───────┴┴───────┤
│                                                             │
│   Qu'est-ce qui t'a donné envie                            │
│   de faire médecine ?                                       │
│                                                             │
│   ┌───────────────────────────────────────────────────┐     │
│   │                                                   │     │
│   └───────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Comportement des tabs empilées

- Les tabs **gardent leur numéro visible** ("1/4", "2/4", etc.)
- Elles sont **rangées** mais on voit qu'elles existent
- La tab active est **plus haute** et affiche le texte complet
- Toutes les tabs sont **alignées en bas** (même niveau)
- Tab 1 toujours à l'extrême gauche, Tab 4 à l'extrême droite

---

## 5. Flow des Questions

### Apparition progressive

1. Une question apparaît
2. L'utilisateur répond
3. La question suivante apparaît (animation fade-in)
4. Répéter jusqu'à la fin du bloc

### Fin de bloc

Quand toutes les questions du bloc sont remplies :
1. Bouton "Passer à l'étape suivante" apparaît en bas du bloc
2. La tab suivante passe en **violet** (état "prête")
3. Clic sur le bouton → passage au bloc suivant
4. La tab précédente passe en **grisé** (état "complétée")

### Transition entre blocs

- Animation fluide (slide ou fade)
- La nouvelle tab devient active (beige, plus haute)
- Le contenu du bloc se met à jour

---

## 6. Bloc Droit - Preview & Animations

### Pendant le remplissage (Desktop)

```
┌─────────────────────────────────┐
│                                 │
│      Ta lettre de motivation    │
│                                 │
│   ┌─────────────────────────┐   │
│   │                         │   │
│   │    [Animation]          │   │
│   │    Génération en cours  │   │
│   │                         │   │
│   │    Étape 2/4            │   │
│   │    ~1min30 restantes    │   │
│   │                         │   │
│   └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

### Après complétion du formulaire

1. Animation de génération (5 secondes minimum)
2. Lettre affichée **floutée** (CSS blur)
3. Pop-up de capture apparaît
4. Après validation pop-up → lettre **défloutée**

---

## 7. État Final - Après Complétion

### Bloc Gauche : Récapitulatif

```
┌──────────────┐┌──────────────┐┌──────────────┐┌──────────────┐
│     1/4      ││     2/4      ││     3/4      ││     4/4      │
├──────────────┴┴──────────────┴┴──────────────┴┴──────────────┤
│                                                              │
│   📋 Récapitulatif de tes réponses                          │
│                                                              │
│   ─────────────────────────────────────────────────────      │
│                                                              │
│   PASS ou LAS ?                                              │
│   → PASS                                                     │
│                                                              │
│   Quelle université vises-tu ?                               │
│   → Université Paris-Saclay                                  │
│                                                              │
│   Combien de sous-vœux ?                                     │
│   → 2                                                        │
│                                                              │
│   Qu'est-ce qui t'a donné envie de faire médecine ?         │
│   → Depuis petit, j'ai toujours voulu aider les autres...   │
│                                                              │
│   [... scroll pour voir la suite ...]                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- Les 4 tabs restent visibles en haut (toutes grisées/complétées)
- Le contenu est un **récapitulatif scrollable** (lecture seule)
- Format : Question → Réponse
- Pas de possibilité de modifier (différent du calculateur Hippocast)

### Bloc Droit : Lettre Générée

```
┌─────────────────────────────────┐
│                                 │
│      Ta lettre de motivation    │
│                                 │
│   ┌─────────────────────────┐   │
│   │                         │   │
│   │   Madame, Monsieur,     │   │
│   │                         │   │
│   │   Actuellement en       │   │
│   │   Terminale au lycée    │   │
│   │   ... [texte lettre]    │   │
│   │                         │   │
│   │                         │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │      📋 Copier          │   │
│   └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

## 8. Pop-up de Capture

### Apparition

- S'affiche **après** l'animation de génération
- La lettre est visible en arrière-plan mais **floutée**
- Pop-up **modale** (ne peut pas être fermée sans remplir)

### Contenu

```
┌─────────────────────────────────────────────────┐
│                                                 │
│        🎉 Ta lettre est prête !                │
│                                                 │
│   Remplis ces infos pour la débloquer :        │
│                                                 │
│   Email *                                       │
│   ┌─────────────────────────────────────────┐   │
│   │                                         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   Téléphone *                                   │
│   ┌─────────────────────────────────────────┐   │
│   │                                         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   Tu envisages de faire une prépa ? *          │
│   ┌─────────────────────────────────────────┐   │
│   │  -- Choisis --                       ▼  │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   💡 Reçois une méthode pour réussir ta prépa  │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │         Voir ma lettre                  │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 9. Couleurs & Style

### Palette Hippocast (référence : screenshots calculateur)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-page` | `#FDF8F3` | Fond de page principal |
| `--bg-form` | `#FDF8F3` | Fond du bloc formulaire (même que page) |
| `--bg-tab-active` | `#E8DFD4` | Tab active (beige/tan) |
| `--bg-tab-completed` | `#D4C9BC` | Tab complétée (beige foncé) |
| `--violet-primary` | `#8B5CF6` | Boutons CTA, tab prête, sélections |
| `--violet-light` | `#DDD6FE` | Fond sélection dropdown, hover |
| `--white` | `#FFFFFF` | Fond inputs, tabs à venir, boutons secondaires |
| `--border` | `#1F2937` | Bordures inputs, tabs, blocs |
| `--text-primary` | `#1F2937` | Texte principal |
| `--text-secondary` | `#6B7280` | Labels, texte secondaire |
| `--orange-progress` | `#F97316` | Barre de progression (optionnel) |

### Typographie

- Font principale : **Inter** ou **Geist** (sans-serif moderne)
- Titres : `font-weight: 700` (Bold)
- Labels : `font-weight: 500` (Medium)
- Corps : `font-weight: 400` (Regular)
- Taille body : `16px` (mobile-friendly)
- Line-height : `1.5`

### Bordures & Arrondis

| Élément | Border-radius | Border |
|---------|---------------|--------|
| Bloc formulaire | `12px` | `1px solid #1F2937` |
| Inputs / Dropdowns | `8px` | `1px solid #1F2937` |
| Boutons | `8px` | `1px solid #1F2937` (secondary) |
| Tabs | `8px 8px 0 0` (top only) | `1px solid #1F2937` |
| Modal | `16px` | none (shadow) |

### Ombres

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-modal: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## 9b. Composants UI (Détail)

### Dropdown

```
┌─────────────────────────────────────────────────────┐
│  Terminale                                       ▼  │
└─────────────────────────────────────────────────────┘
```

- Fond : `#FFFFFF`
- Bordure : `1px solid #1F2937`
- Border-radius : `8px`
- Padding : `12px 16px`
- Flèche : chevron-down à droite

**État ouvert :**
```
┌─────────────────────────────────────────────────────┐
│  Terminale                                       ▲  │
├─────────────────────────────────────────────────────┤
│  Seconde                                            │
│  Première                                           │
│  ✓ Terminale                          [violet bg]   │
│  Licence                                            │
│  Autre                                              │
└─────────────────────────────────────────────────────┘
```

- Option sélectionnée : fond `#DDD6FE` (violet clair) + checkmark
- Hover : fond `#F3F4F6` (gris très clair)

### Boutons Toggle (PASS/LAS, Oui/Non)

```
┌─────────────────┐    ┌─────────────────┐
│      PASS       │    │       LAS       │  ← sélectionné
└─────────────────┘    └─────────────────┘
     [blanc]              [violet #8B5CF6]
```

- Non sélectionné : fond blanc, bordure noire, texte noir
- Sélectionné : fond violet `#8B5CF6`, bordure noire, texte noir
- Padding : `12px 24px`
- Border-radius : `8px`

### Boutons Pill (Mention : Ø, AB, B, TB, TBF)

```
┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
│   Ø   │ │  AB   │ │   B   │ │  TB   │ │  TBF  │
└───────┘ └───────┘ └───────┘ └───────┘ └───────┘
  blanc     blanc     blanc    violet     blanc
```

- Style identique aux boutons toggle mais plus compacts
- Padding : `8px 16px`

### Bouton CTA (Primary)

```
┌─────────────────────────────────────────┐
│         Dévoiler les résultats          │
└─────────────────────────────────────────┘
```

- Fond : `#8B5CF6` (violet)
- Texte : `#FFFFFF` (blanc)
- Border-radius : `8px`
- Padding : `14px 28px`
- Font-weight : `600`
- Hover : `#7C3AED` (violet plus foncé)

### Input Number (Moyenne)

```
┌─────────────────┐
│       12        │
└─────────────────┘
```

- Même style que dropdown
- Text-align : left
- Width : `80px` environ (compact)

### Champ Texte (TextField)

```
Label du champ
┌─────────────────────────────────────────────────────┐
│  Placeholder text...                                │
└─────────────────────────────────────────────────────┘
```

- Label au-dessus (`margin-bottom: 8px`)
- Fond : `#FFFFFF`
- Bordure : `1px solid #1F2937`
- Focus : bordure `#8B5CF6` + shadow

### États des champs

| État | Bordure | Fond | Icône |
|------|---------|------|-------|
| Default | `#1F2937` | `#FFFFFF` | - |
| Focus | `#8B5CF6` | `#FFFFFF` | - |
| Filled | `#1F2937` | `#FFFFFF` | - |
| Error | `#EF4444` | `#FEF2F2` | ⚠️ |
| Disabled | `#D1D5DB` | `#F9FAFB` | - |

---

## 10. Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| **< 768px** | Mobile : 1 colonne, tabs empilées |
| **≥ 768px** | Desktop : 2 colonnes, tabs complètes |

### Adaptations Mobile

- Tabs empilées avec numéros visibles
- Formulaire pleine largeur
- Pas de panneau droit pendant le remplissage
- Mini indicateur de progression au-dessus du bloc
- Lettre finale affichée sous le récap (ou en plein écran)

---

## 11. Animations & Transitions

| Élément | Animation |
|---------|-----------|
| Apparition question | Fade-in + léger slide-up (300ms) |
| Transition entre blocs | Slide horizontal (400ms) |
| Tab devient active | Transition hauteur + couleur (200ms) |
| Pop-up apparaît | Fade-in + scale (300ms) |
| Lettre se défloute | Transition blur (500ms) |
| Bouton "Passer à l'étape suivante" | Fade-in (300ms) |

---

## 12. Interactions & Micro-interactions

### Hover sur tabs (desktop)

- Tab à venir : Légère élévation / ombre
- Tab complétée : Curseur pointer (mais pas cliquable pour modifier)

### Focus sur inputs

- Bordure violet
- Légère ombre

### Validation champ

- Check vert discret quand valide
- Bordure rouge + message si erreur

---

## 13. Messages & Micro-copy

### Messages encourageants entre blocs

- "Super ! On continue avec ton parcours scolaire 📚"
- "Parfait ! Parlons maintenant de tes qualités 💪"
- "Dernière étape ! Pourquoi cette fac ? 🎯"

### Pendant la génération

- "On rédige ta lettre personnalisée..."
- "Analyse de ton profil en cours..."
- "Plus que quelques secondes..."

### Erreur

- "Oups, quelque chose s'est mal passé. On réessaie ?"

---

## 14. Accessibilité

- Navigation au clavier (Tab, Enter, Escape)
- Labels associés aux inputs
- Contrastes WCAG AA
- Focus visible sur tous les éléments interactifs
- Aria-labels sur les boutons icônes
