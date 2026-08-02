# Technische Architektur

## Zielbild

Die erste Version ist ein schlanker 2D-Endless-Runner für Browser. Eine einzige
Cocos-Szene startet das Spiel; die gesamte Laufzeit-Hierarchie wird anschließend
deterministisch aus TypeScript aufgebaut. Das hält die Szene klein, vermeidet
fragile Inspector-Verknüpfungen und hält die Spiellogik unabhängig von der
Darstellung. Lokale Bilddateien werden optional über Cocos `resources` geladen;
prozedurale Fallbacks halten das Spiel auch bei fehlenden Imports lauffähig.

Die Basisauflösung ist adaptiv und folgt dem tatsächlichen Seitenverhältnis:

- Querformat/Desktop: 720 Design-Einheiten hoch, 1024–1920 breit
- Hochformat/Smartphone: 720 Design-Einheiten breit, 960–1560 hoch

Damit werden gängige Smartphones, Tablets, 16:9-Displays und breite
Browserfenster ohne Verzerrung gefüllt. Bei Größen- oder Orientierungswechsel
werden Spielfeld, sichere HUD-Ränder und Menüs neu angeordnet. Die Spielfläche
verwendet ausschließlich `UI_2D`, eine orthografische Kamera und Cocos'
`SHOW_ALL`-Auflösungsstrategie.

## Schichten

### 1. Engine-unabhängiger Kern (`assets/scripts/core`)

- `GameSession`: Zustandsautomat für Menü, Lauf, Pause und Game Over; verwaltet
  Punkte, Leben und verstrichene Spielzeit.
- `DifficultyCurve`: berechnet Level, Scrolltempo und Spawn-Intervalle.
- `HighScoreStore`: defensiver Adapter für einen Key-Value-Speicher; im Browser
  wird `sys.localStorage` verwendet.
- `SpawnSafety`: berechnet einen geschwindigkeitsabhängigen Mindestabstand
  zwischen Sternen und Hindernissen, damit Sammelobjekte nie in eine
  unvermeidbare Kollision locken.

Diese Module importieren kein `cc` und werden mit Node automatisiert getestet.
`JumpRules` begrenzt den Sprung auf drei Impulse und berechnet die kontrollierte
Luftsprung-Geschwindigkeit unabhängig von der Cocos-Laufzeit.

### 2. Konfiguration (`assets/scripts/config`)

- `GameConfig`: zentrale, unveränderliche Werte für Physik, Punkte,
  Unverwundbarkeit und Schwierigkeitskurve.

### 3. Cocos-Laufzeit (`assets/scripts/components`)

- `GameBootstrap`: einziger serialisierter Einstiegspunkt. Legt Kamera, Canvas
  und `GameController` an.
- `GameController`: orchestriert Zustände, Spielschleife, Kollisionen, HUD,
  Menüs, Layout und Highscore.
- `InputController`: vereinheitlicht Touch-, Maus- und Tastatureingaben.
- `RunnerController`: Sprungphysik und Kollisionsrechteck von Keloğlan.

### 4. Präsentation/Spielwelt (`assets/scripts/presentation`,
`assets/scripts/world`)

- `ProceduralArt`: kleine Zeichen- und UI-Hilfen.
- `GameArtLoader`: lädt lokale SpriteFrames unabhängig und fehlertolerant.
- `VillageScroller`: anatolischer Bildhintergrund, prozeduraler Fallback und
  laufende Bodenmarkierungen.
- `SpawnManager`: Object-Lifecycle, Spawn-Timer, Testi-/Mauer-/Heu-Hindernisse
  und Stern-Medaillen.

Manuelle AABB-Kollisionen sind für diese eindimensionale Runner-Mechanik
ausreichend und sparen ein unnötiges Physikmodul.

## Zustandsmodell

```text
MENU -- Start --> RUNNING -- Pause --> PAUSED
 ^                 |   ^                 |
 |                 |   +---- Fortsetzen -+
 |                 |
 +-- Game Over <-- 0 Leben
        |
        +-- Neustart --> RUNNING
```

Nur im Zustand `RUNNING` werden Physik, Weltbewegung, Spawns und Kollisionen
aktualisiert. Das verhindert Eingaben und Zeitfortschritt hinter Menüs.

## Ordnerstruktur

```text
keloglan-star-runner/
├── assets/
│   ├── resources/
│   │   └── art/
│   │       ├── anatolian-star.png
│   │       ├── anatolian-testi.png
│   │       ├── anatolian-village-background.png
│   │       └── keloglan-runner.png
│   ├── scenes/
│   │   └── Main.scene
│   └── scripts/
│       ├── config/
│       │   └── GameConfig.ts
│       ├── core/
│       │   ├── DifficultyCurve.ts
│       │   ├── GameSession.ts
│       │   ├── HighScoreStore.ts
│       │   ├── JumpRules.ts
│       │   └── SpawnSafety.ts
│       ├── components/
│       │   ├── GameBootstrap.ts
│       │   ├── GameController.ts
│       │   ├── InputController.ts
│       │   └── RunnerController.ts
│       ├── presentation/
│       │   ├── GameArtLoader.ts
│       │   ├── ProceduralArt.ts
│       │   └── VillageScroller.ts
│       └── world/
│           └── SpawnManager.ts
├── tests/
│   └── core.test.cjs
├── tools/
│   └── verify-project.mjs
├── .gitignore
├── ARCHITECTURE.md
├── README.md
├── package.json
└── tsconfig.json
```

Die TypeScript- und Szenen-`.meta`-Dateien liegen neben ihren Assets. Die
PNG-Import-Metadaten erzeugt Cocos beim ersten Projektimport passend zur lokal
installierten 3.8-Version. Generierte Cocos-Verzeichnisse bleiben ausgeschlossen.

## Szenen und Komponenten

### `Main.scene`

Die einzige Szene enthält nur den Node `GameBootstrap` mit der gleichnamigen
Komponente. Alle Laufzeit-Nodes werden im Code erzeugt:

- `GameCanvas`
  - `Camera`
  - `BackgroundLayer`
  - `WorldLayer`
    - `Runner`
    - dynamische `Star`- und `Obstacle`-Nodes
  - `HudLayer`
  - `MenuLayer`
  - `PauseLayer`
  - `GameOverLayer`

### Komponentenverantwortung

| Komponente | Verantwortung |
| --- | --- |
| `GameBootstrap` | Canvas/Kamera starten, responsive Auflösung initialisieren |
| `GameController` | Spielzustand, Schleife, Kollisionen, HUD und Menüs |
| `InputController` | Touch, Maus, Tastatur, Pause-Toggle |
| `RunnerController` | Dreifachsprung, Schwerkraft, Bodenkontakt, Hitbox |

`SpawnManager`, `VillageScroller` und der `GameArtLoader` sind bewusst normale
TypeScript-Module:
Sie brauchen keinen eigenen Cocos-Lebenszyklus und werden vom Controller
explizit aktualisiert.

## Spielregeln der ersten Version

- Ein Stern zählt 10 Punkte.
- Der Lauf beginnt mit drei Leben.
- Nach einem Treffer ist Keloğlan kurz unverwundbar.
- Alle 15 Sekunden steigt das Level.
- Innerhalb jedes Levels erhöhen sich Scrollgeschwindigkeit und Spawn-Druck
  kontinuierlich; die sichtbare Levelnummer wechselt weiterhin alle 15 Sekunden.
- Das HUD zeigt die verbleibenden Dreifachsprung-Impulse. Sterne, Treffer und
  Levelwechsel erhalten eine kurze, zustandsabhängige Rückmeldung.
- Sterne und Hindernisse erhalten einen bidirektionalen, mit dem Tempo
  wachsenden Sicherheitsabstand. Ein blockierter Spawn wird kurz vertagt.
- Der Highscore wird unter dem Schlüssel
  `masalnova.keloglan-star-runner.highscore.v1` lokal gespeichert.

## Erweiterungspunkte

- Weitere Bild-Assets können über den `GameArtLoader` ergänzt werden; Audio kann
  als unabhängiger Dienst hinzukommen.
- Neue Hindernisse werden als zusätzliche Variante im `SpawnManager` ergänzt.
- Weitere Szenen sind für Levelauswahl oder Tutorial möglich, ohne den
  engine-unabhängigen Kern zu ändern.
- Weitere Sprachen können später hinter einer kleinen String-Tabelle ergänzt
  werden. Die aktuelle Marktfassung ist bewusst vollständig Türkisch.
