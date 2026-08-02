# Keloğlan – UX- und Dynamik-Audit

## Audit-Umfang

Geprüft wurden Startmenü, aktives Spiel, Dreifachsprung, Pause, Game-over sowie
responsive Darstellung auf 1280 × 720 und 390 × 844 Pixeln.

## Schritte und Zustand

1. **Desktop-Startmenü – gesund.** Die Bildwelt ist eigenständig, der primäre
   Einstieg ist eindeutig und die türkische Tonalität konsistent.
   Beleg: [01-menu-before.jpg](./01-menu-before.jpg)
2. **Desktop-Spiel – gemischt.** Die Spielobjekte waren verständlich, aber
   Treffer, Levelwechsel und verfügbare Sprünge wurden kaum erklärt.
   Beleg: [03-gameplay-before.jpg](./03-gameplay-before.jpg)
3. **Mobiles Startmenü – vor Optimierung riskant.** Das feste 9:16-Verhältnis
   ließ auf längeren Smartphones einen großen ungenutzten Bereich zurück.
   Beleg: [04-mobile-menu-before.jpg](./04-mobile-menu-before.jpg)
4. **Mobiles Spiel – vor Optimierung gemischt.** HUD und Pause waren erreichbar,
   aber Spielfigur und Objekte nahmen viel Platz ein; der Sprungvorrat war nicht
   sichtbar.
   Beleg: [05-mobile-gameplay-before.jpg](./05-mobile-gameplay-before.jpg)
5. **Mobiles Startmenü – nach Optimierung gesund.** Die Bühne füllt die gesamte
   Höhe und wahrt die bestehende Bild- und Farbwelt.
   Beleg: [06-mobile-menu-after.jpg](./06-mobile-menu-after.jpg)
6. **Mobiles Spiel – nach Optimierung gesund.** Kleinere Objekte schaffen mehr
   Reaktionsraum; `ZIPLAMA 3/3` kommuniziert den Dreifachsprung unmittelbar.
   Beleg: [09-mobile-gameplay-final.jpg](./09-mobile-gameplay-final.jpg)
7. **Pause und Game-over – gesund.** Das HUD wird hinter modalen Zuständen
   ausgeblendet, wodurch Handlung und Ergebnis klar im Vordergrund stehen.
   Belege: [10-pause-final.jpg](./10-pause-final.jpg),
   [08-game-over-after.jpg](./08-game-over-after.jpg)
8. **Desktop nach Optimierung – gesund.** Vollbilddarstellung und Menü-Hierarchie
   bleiben bei 16:9 stabil.
   Beleg: [11-desktop-menu-final.jpg](./11-desktop-menu-final.jpg)

Direkte Vorher-/Nachher-Vergleiche:
[Mobiles Menü](./12-mobile-menu-comparison.jpg) und
[Mobiles Spiel](./13-mobile-gameplay-comparison.jpg).

## Umgesetzte Verbesserungen

- Vollbilddarstellung ohne weißen Leerraum auf hohen Smartphones und Desktop.
- Dynamischer Sprungstatus von `3/3` bis `0/3`; vierter Tap wird blockiert.
- Direktes Feedback für Stern (`+10`), Treffer (`CAN -1`) und Levelwechsel.
- Ruhigere Pause-/Game-over-Zustände ohne konkurrierendes HUD.
- Kontinuierliche Schwierigkeitsrampe zwischen den sichtbaren Levelwechseln.
- Längerer sicherer Einstieg vor dem ersten Hindernis.

## Barrierefreiheitsgrenzen

Die Screenshots bestätigen große Touch-Ziele, lesbare Zustände und responsive
Umordnung. Semantik und eindeutige Button-Namen wurden im Browser geprüft.
Screenreader-Ausgabe, Betriebssystem-Zoom und reale Gerätevibration lassen sich
aus Screenshots allein nicht vollständig bewerten.
