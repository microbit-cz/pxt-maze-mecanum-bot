# MAZE SOLVING MECANUM ROBOT

Limitace: bludiště musí mít zatáčky s úhlem zhruba 90° a nesmí obsahovat nenavazující zdi

Robot dokáře řešit bludiště pomocí dvou algoritmů:

1) Sledování levé zdi
- výhody: ----
- limitace: bludiště nesmí mít "nekonečnou" levou stěnu na okraji

2) 
- výhody: je schopný zapamatovat si cestu a její optimální trasu zopakovat
- limitace: šířka zdí se nesmí nijak zásadně lišit

## NASTAVENÍ
- v Main.ts je důležité nastavit typ řešení bludiště
- v CarHandler.ts je nutné upravit minimální a maximální rychlost motorů, tak aby při pohybu rovně neměnilo nijak zásadně směr 
- - minimální definuje od jaké hodnoty se do motoru přestanou posílat signály
- - podle maximální se počítá rychlost motoru pomocí funkce "Math.Map(speed, 0, 100, 0, maximální rychlost pro dané kolo)"

1)
- speed, turnPause, gapRegisterTime, minWallDist, correctionStrenght

2)
- minWallDist, servoCheckCountdown, maxSpeed


// AUTO GENERATED
> Open this page at [https://slattburger01.github.io/test/](https://slattburger01.github.io/test/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/slattburger01/test** and import

## Edit this project ![Build status badge](https://github.com/slattburger01/test/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/slattburger01/test** and click import

## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/slattburger01/test/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
