# Keloğlan – Yıldız Peşinde

Ein kleines, mobilfreundliches 2D-Endless-Runner-Spiel für Cocos Creator 3.8 LTS.
Keloğlan läuft automatisch durch ein anatolisches Dorf, sammelt Sterne und weicht
Hindernissen aus. Oberfläche und Spieltexte sind vollständig auf Türkisch
lokalisiert.

Die Hauptfigur, Dorfkulisse, Stern-Medaille und der traditionelle Tonkrug
(`testi`) wurden eigens für das Spiel generiert und liegen lokal im Projekt.
Für den ersten Cocos-Import und als technische Absicherung existieren
prozedurale `Graphics`-Fallbacks. Es werden keine externen oder kostenpflichtigen
Bibliotheken und keine fremden Bild-Assets benötigt.

## Projekt öffnen

1. Cocos Creator 3.8.8 oder eine kompatible 3.8-LTS-Version starten.
2. Diesen Ordner als Projekt öffnen:
   `games/keloglan-star-runner`
3. `assets/scenes/Main.scene` öffnen.
4. Die Vorschau mit dem Play-Button starten.

Beim ersten Öffnen erzeugt Cocos Creator die lokalen Ordner `.creator`, `library`,
`local` und `temp` sowie die Import-Metadaten der PNG-Dateien. Diese generierten
Dateien sind absichtlich nicht vorab erzeugt.

## Bedienung

- Touch: bis zu dreimal antippen für den Dreifachsprung
- Maus: bis zu dreimal mit der linken Maustaste klicken
- Tastatur: bis zu dreimal `Leertaste`, `W` oder `Pfeil hoch`
- Pause: Pause-Schaltfläche, `P` oder `Escape`
- Start/Fortsetzen/Neustart: Menüschaltfläche, `Enter` oder Antippen

Das Layout passt seine Designfläche an das reale Browser-Seitenverhältnis an.
Im Hochformat werden Notch-/Touch-Ränder und eine höhere Spielfläche verwendet;
im Querformat nutzt das Spiel breite Desktop- und Browserfenster ohne
Verzerrung.

## Prüfung ohne installierten Cocos Editor

Vom Repository-Stamm aus:

```sh
node games/keloglan-star-runner/tools/verify-project.mjs
```

Die Prüfung validiert Projekt- und Szenendateien, TypeScript-Syntax, die
serialisierte Bootstrap-Komponente sowie die engine-unabhängige Kernlogik.
Ein vollständiger Web-Build benötigt zusätzlich eine lokale Installation von
Cocos Creator 3.8.

Weitere technische Details stehen in [ARCHITECTURE.md](./ARCHITECTURE.md).
Die visuelle und kulturelle Herleitung steht in
[docs/ART_DIRECTION.md](./docs/ART_DIRECTION.md).
