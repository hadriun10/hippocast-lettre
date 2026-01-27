# Instructions pour Claude Code - Projet BMAD

## Configuration utilisateur
- **Nom**: Hadrien
- **Langue de communication**: Français
- **Langue des documents**: Français
- **Dossier output**: `_bmad-output/`

## BMAD Method

Ce projet utilise **BMAD Method v6.0.0** - une méthodologie de développement produit guidée par IA.

### Structure du projet
- `_bmad/core/` - Fichiers core de la méthode
- `_bmad/bmm/` - Module BMM (Build-Measure-Method)
- `_bmad/_config/` - Configuration et manifestes
- `_bmad-output/` - Artefacts générés

### Commandes BMAD disponibles

Quand l'utilisateur demande d'exécuter une commande BMAD, charge et exécute le workflow correspondant :

| Commande | Fichier workflow |
|----------|------------------|
| `bmad help` | `_bmad/core/tasks/help.md` |
| `bmad brainstorming` | `_bmad/core/workflows/brainstorming/workflow.md` |
| `bmad research` | `_bmad/bmm/workflows/1-analysis/research/workflow.md` |
| `bmad create-brief` | `_bmad/bmm/workflows/1-analysis/create-product-brief/workflow.md` |
| `bmad create-prd` | `_bmad/bmm/workflows/2-plan-workflows/create-prd/workflow.md` |
| `bmad create-ux` | `_bmad/bmm/workflows/2-plan-workflows/create-ux-design/workflow.md` |
| `bmad create-architecture` | `_bmad/bmm/workflows/3-solutioning/create-architecture/workflow.md` |
| `bmad create-epics` | `_bmad/bmm/workflows/3-solutioning/create-epics-and-stories/workflow.md` |
| `bmad check-readiness` | `_bmad/bmm/workflows/3-solutioning/check-implementation-readiness/workflow.md` |
| `bmad sprint-planning` | `_bmad/bmm/workflows/4-implementation/sprint-planning/workflow.yaml` |
| `bmad create-story` | `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml` |
| `bmad dev-story` | `_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml` |
| `bmad code-review` | `_bmad/bmm/workflows/4-implementation/code-review/workflow.yaml` |
| `bmad quick-spec` | `_bmad/bmm/workflows/bmad-quick-flow/quick-spec/workflow.md` |
| `bmad quick-dev` | `_bmad/bmm/workflows/bmad-quick-flow/quick-dev/workflow.md` |
| `bmad party-mode` | `_bmad/core/workflows/party-mode/workflow.md` |

### Comment exécuter un workflow BMAD

1. Lire le fichier workflow correspondant
2. Suivre les instructions exactement comme écrites
3. Charger les templates/données référencés si nécessaire
4. Sauvegarder les outputs dans `_bmad-output/`

### Phases du workflow BMM

1. **Analysis** (optionnel): Brainstorming, Research, Create Brief
2. **Planning** (PRD requis): Create PRD, Create UX
3. **Solutioning** (requis): Architecture, Epics & Stories, Check Readiness
4. **Implementation**: Sprint Planning, Create Story, Dev Story, Code Review

### Raccourcis

- "bmad" ou "lance bmad" → Afficher le menu principal
- "bmad help" → Aide contextuelle sur la prochaine étape
- "quick spec" ou "quick dev" → Mode rapide sans planification extensive
