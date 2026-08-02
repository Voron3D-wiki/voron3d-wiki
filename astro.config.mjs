// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// NOTE ON NAVIGATION
//
// The sidebar regroups the site into four sections. It is configured
// independently of where content sits on disk, so navigation can be
// reorganised without moving files or changing a single URL.
//
// The grouping follows the order the fans page established:
//   concept -> criteria -> options -> reviews -> buy
// Each section leads with its explainer, products sit underneath. See the
// editorial stance in README.md before reordering anything here.
//
// NOTE ON URLS
//
// Every page carries an explicit `slug` in its frontmatter, pinned to the path
// it served at under MkDocs. Starlight would otherwise slugify — lowercasing
// and dropping dots — which turns /printers/2.4/ into /printers/24/ and /MMUs/
// into /mmus/. Do not remove those slugs; they are what keeps inbound links and
// search rankings intact.

export default defineConfig({
  site: 'https://voron3d.wiki',
  // Matches MkDocs' use_directory_urls, so /printers/v0/ stays /printers/v0/.
  trailingSlash: 'always',
  build: { format: 'directory' },

  integrations: [
    starlight({
      title: 'Voron3D Wiki',
      description:
        'A community resource for Voron 3D printers — build guides, component selection, and configuration help.',
      logo: { src: './src/assets/VoronLogo.png', alt: 'Voron3D Wiki' },
      favicon: '/favicon.png',

      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/voron3d-wiki' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/voron' },
      ],

      customCss: ['./src/styles/custom.css'],

      // GA4, carrying over the hardened config from overrides/main.html.
      // url_passthrough and linker stay off — they are what decorate outbound
      // URLs with `_gl=` and break affiliate attribution.
      head: [
        { tag: 'script', attrs: { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-7E70MV2KN4' } },
        {
          tag: 'script',
          content: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','G-7E70MV2KN4',{transport_type:'beacon',url_passthrough:false,linker:{domains:[],decorate_forms:false},allow_google_signals:false,allow_ad_personalization_signals:false});`,
        },
        // affiliate_click / outbound_reference / copy_config / search_no_results.
        { tag: 'script', attrs: { src: '/js/analytics.js', defer: true } },
        // External links open in a new tab.
        { tag: 'script', attrs: { src: '/js/external-links.js', defer: true } },
        // Click-to-sort table headers (BOMs, the stepper database, spec tables).
        { tag: 'script', attrs: { src: '/js/tablesort.js', defer: true } },
      ],

      editLink: { baseUrl: 'https://github.com/Voron3D-wiki/voron3d-wiki/edit/main/src/content/docs/' },
      lastUpdated: true,

      sidebar: [
        {
          label: 'Printers',
          items: [
            { label: 'Choosing a printer', link: '/printers/' },
            {
              label: 'Voron V0',
              items: [
                { label: 'Overview', link: '/printers/v0/' },
                { label: 'V0.2 BOM', link: '/printers/v0/bom/' },
              ],
            },
            {
              label: 'Voron V2.4',
              items: [
                { label: 'Overview', link: '/printers/2.4/' },
                { label: 'BOM — 300mm', link: '/printers/2.4/BOM-300/' },
                { label: 'BOM — 350mm', link: '/printers/2.4/BOM-350/' },
              ],
            },
            { label: 'Voron Trident', link: '/printers/trident/' },
            { label: 'Voron Switchwire', link: '/printers/switchwire/' },
            {
              label: 'Legacy',
              collapsed: true,
              items: [
                { label: 'Overview', link: '/printers/legacy/' },
                { label: 'Voron V1.6', link: '/printers/legacy/v1-6/' },
                { label: 'Voron V1.8', link: '/printers/legacy/v1-8/' },
              ],
            },
            {
              label: 'DoomCube',
              collapsed: true,
              items: [
                { label: 'Overview', link: '/printers/DoomCube/' },
                { label: 'Tri Zero', link: '/printers/DoomCube/TriZero/' },
              ],
            },
          ],
        },

        {
          // Everything you choose and buy, in one branch. Motherboards and
          // toolhead boards previously sat in different top-level sections
          // despite answering the same question.
          label: 'Components',
          items: [
            {
              label: 'Electronics',
              items: [
                { label: 'How to choose', link: '/electronics/' },
                {
                  label: 'Motherboards',
                  items: [
                    { label: 'Overview', link: '/electronics/mcu/' },
                    { label: 'BTT SKR Series', link: '/electronics/mcu/btt-skr/' },
                    { label: 'Mellow Fly', link: '/electronics/mcu/mellow-fly/' },
                    { label: 'MKS', link: '/electronics/mcu/mks/' },
                    { label: 'Octopus', link: '/electronics/mcu/octopus/' },
                  ],
                },
                {
                  label: 'Toolhead Boards',
                  items: [
                    { label: 'Overview', link: '/printhead/toolhead-boards/' },
                    { label: 'BTT EBB Gen1', link: '/printhead/toolhead-boards/BTT-EBB-Gen1/' },
                    { label: 'BTT EBB Gen2', link: '/printhead/toolhead-boards/BTT-EBB-Gen2/' },
                    { label: 'FLY-SHT', link: '/printhead/toolhead-boards/FLY-SHT/' },
                    { label: 'FLY-SB2040', link: '/printhead/toolhead-boards/FLY-SB2040/' },
                    { label: 'LDO Orbitool 3', link: '/printhead/toolhead-boards/ldo-orbitool-3/' },
                    { label: 'LDO Orbitool O2', link: '/printhead/toolhead-boards/ldo-orbitool-o2/' },
                    { label: 'MKS-THR', link: '/printhead/toolhead-boards/mks-thr/' },
                  ],
                },
                {
                  label: 'Stepper Motors',
                  items: [
                    { label: 'Overview', link: '/electronics/stepper-motor/' },
                    { label: 'Motor database', link: '/electronics/stepper-motor/database/' },
                  ],
                },
                { label: 'Fans', link: '/electronics/fans/' },
                { label: 'Power Supplies', link: '/electronics/power-supplies/' },
                { label: 'Wiring', link: '/electronics/wiring/' },
                { label: 'Connectors', link: '/electronics/connectors/' },
                { label: 'RP2040 Info', link: '/electronics/rp2040/' },
                { label: 'Safety', link: '/electronics/safety/' },
              ],
            },
            {
              label: 'Printhead',
              items: [
                { label: 'Overview', link: '/printhead/' },
                {
                  label: 'Hotends',
                  items: [
                    { label: 'How to choose', link: '/printhead/hotends/' },
                    { label: 'DropEffect NExt G', link: '/printhead/hotends/dropeffect-nextg/' },
                    { label: 'E3D Revo Voron', link: '/printhead/hotends/e3d-revo/' },
                    { label: 'E3D V6', link: '/printhead/hotends/e3d-v6/' },
                    { label: 'Phaetus Dragon', link: '/printhead/hotends/phaetus-dragon/' },
                    { label: 'Phaetus Rapido', link: '/printhead/hotends/phaetus-rapido/' },
                  ],
                },
                { label: 'Extruders', link: '/printhead/extruders/' },
                { label: 'Nozzles', link: '/printhead/nozzle/' },
                { label: 'Stealthburner', link: '/printhead/stealthburner/' },
              ],
            },
            {
              label: 'Bed Leveling',
              items: [
                { label: 'How to choose', link: '/bedleveling/' },
                { label: 'Beacon', link: '/bedleveling/beacon/' },
                { label: 'Cartographer', link: '/bedleveling/cartographer/' },
                { label: 'Eddy', link: '/bedleveling/eddy/' },
                { label: 'Eddy Coil', link: '/bedleveling/eddy-coil/' },
              ],
            },
            {
              label: 'Multi-Material',
              items: [
                { label: 'How to choose', link: '/MMUs/' },
                { label: 'ERCF v1/v2', link: '/MMUs/ERCF/' },
                { label: 'BoxTurtle', link: '/MMUs/BoxTurtle/' },
                { label: 'Tradrack', link: '/MMUs/tradrack/' },
                { label: 'PICO-MMU', link: '/MMUs/PICO-MMU/' },
                { label: 'BTT-MMU', link: '/MMUs/BTT-MMU/' },
                { label: 'Anycubic-MMU', link: '/MMUs/Anycubic-MMU/' },
                { label: 'Prusa-MMU', link: '/MMUs/Pursa-MMU/' },
              ],
            },
          ],
        },

        {
          // The old "Guides" tab was a single page of outbound links occupying
          // a top-level slot. It belongs with the tuning content.
          label: 'Software & Tuning',
          items: [
            { label: 'Overview', link: '/software/' },
            { label: 'Klipper', link: '/software/klipper/' },
            { label: 'Klipper Config Help', link: '/software/klipper-config-help/' },
            { label: 'Klipper Macros', link: '/software/klipper-macros/' },
            { label: 'Shake&Tune', link: '/software/shakeAndtune/' },
            { label: 'Print tuning guides', link: '/guides/' },
          ],
        },

        {
          label: 'Filament',
          items: [
            { label: 'Overview', link: '/filament/' },
            { label: 'Filament Guide', link: '/filament/filament-guide/' },
          ],
        },
      ],
    }),
  ],
});
