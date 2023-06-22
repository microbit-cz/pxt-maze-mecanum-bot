# MAZE SOLVING MECANUM ROBOT

Limitace: bludiště musí mít zatáčky s úhlem zhruba 90° a nesmí obsahovat nenavazující zdi

Robot dokáře řešit bludiště pomocí dvou algoritmů:

1) Sledování levé zdi
- výhody: ----
- limitace: bludiště nesmí mít "nekonečnou" levou stěnu na okraji

2) Depth-First Search
- výhody: je schopný zapamatovat si cestu a její nejkratší variantu zopakovat
- nevýhody: najde pouze 1. možné řešení bludiště
- limitace: šířka zdí se nesmí nijak zásadně lišit

Ukázka řešení bludiště pomocí Depth-First Search (video)

[![Auticko](https://img.youtube.com/vi/PxUHhGyrYmM/0.jpg)](https://www.youtube.com/watch?v=PxUHhGyrYmM)

Ukázka zopakování cesty (video)

[![Auticko](https://img.youtube.com/vi/f8aKKFPSB9Y/0.jpg)](https://www.youtube.com/watch?v=f8aKKFPSB9Y)

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
