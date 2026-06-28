// ==UserScript==
// @name         YouTube
// @namespace    https://github.com/Mralimoh
// @version      1.0
// @description  Persian Font.
// @author       Mralimoh
// @match        https://www.youtube.com/*
// @resource     VAZIR_FONT https://cdnjs.cloudflare.com/ajax/libs/vazir-font/30.1.0/Vazir-Thin.woff
// @resource     SHABNAM_FONT https://cdnjs.cloudflare.com/ajax/libs/shabnam-font/5.0.1/Shabnam-Thin.woff
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_getResourceURL
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const FONTS = {
        vazir: { name: 'Vazirmatn', url: GM_getResourceURL('VAZIR_FONT') },
        shabnam: { name: 'Shabnam', url: GM_getResourceURL('SHABNAM_FONT') }
    };

    const PREMIUM_LOGO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 846 174'%3E%3Cg transform='translate(0,0.36)'%3E%3Cpath fill='%23FF0033' d='M242.88 27.11A31.07 31.07 0 0 0 220.95 5.18C201.6 0 124 0 124 0S46.46 0 27.11 5.18A31.07 31.07 0 0 0 5.18 27.11C0 46.46 0 86.82 0 86.82s0 40.36 5.18 59.71a31.07 31.07 0 0 0 21.93 21.93C46.46 173.64 124 173.64 124 173.64s77.57 0 96.92-5.18a31.07 31.07 0 0 0 21.93-21.93c5.18-19.35 5.18-59.71 5.18-59.71s0-40.36-5.18-59.71z'/%3E%3Cpath fill='%23FFFFFF' d='M99.22 124.03l64.45-37.21-64.45-37.21z'/%3E%3Cpath fill='%23FFFFFF' d='M358.29 55.1v6c0 30-13.3 47.53-42.39 47.53h-4.43v52.5h-23.76V12.36h30.29c27.7 0 40.29 11.71 40.29 42.74zm-25 2.13c0-21.64-3.9-26.78-17.38-26.78h-4.43v60.48h4.08c12.77 0 17.74-9.22 17.74-29.26zm81.22-6.56l-1.24 28.2c-10.11-2.13-18.45-.53-22.17 6v76.26h-23.58V52.44h18.8l2.13 23.56h.89c2.48-17.2 10.46-25.89 20.75-25.89a22.84 22.84 0 0 1 4.42.56zM441.64 115v5.5c0 19.16 1.06 25.72 9.22 25.72 7.8 0 9.58-6 9.75-18.44l21.1 1.24c1.6 23.41-10.64 33.87-31.39 33.87-25.18 0-32.63-16.49-32.63-46.46v-19c0-31.57 8.34-47 33.34-47 25.18 0 31.57 13.12 31.57 45.93V 115zm0-22.35v7.8h17.91V92.7c0-20-1.42-25.72-9-25.72-7.58 0-8.91 5.86-8.91 25.72zM604.45 79v82.11H580V80.82c0-8.87-2.31-13.3-7.63-13.3-4.26 0-8.16 2.48-10.82 7.09a35.59 35.59 0 0 1 .18 4.43v82.11h-24.49V80.82c0-8.87-2.31-13.3-7.63-13.3-4.26 0-8 2.48-10.64 6.92v86.72h-23.76V52.44h19.33l2.17 13.84h.35c5.5-10.46 14.37-16.14 24.83-16.14 10.29 0 16.14 5.14 18.8 14.37 5.68-9.4 14.19-14.37 23.94-14.37 14.86 0 20.53 10.64 20.53 28.86zm12.24-54.4c0-11.71 4.26-15.07 13.3-15.07 9.22 0 13.3 3.9 13.3 15.07 0 12.06-4.08 15.08-13.3 15.08-9.04-.01-13.3-3.02-13.3-15.08zm1.42 27.84h23.41v108.72h-23.41zm103.39 0v108.72h-19.15l-2.13-13.3h-.53c-5.5 10.64-13.48 15.07-23.41 15.07-14.54 0-21.11-9.22-21.11-29.26V52.44h24.47v79.81c0 9.58 2 13.48 6.92 13.48a12.09 12.09 0 0 0 10.37-5.92V52.44zM845.64 79v82.11h-24.47V80.82c0-8.87-2.31-13.3-7.63-13.3-4.26 0-8.16 2.48-10.82 7.09a35.59 35.59 0 0 1 .18 4.43v82.11h-24.47V80.82c0-8.87-2.31-13.3-7.63-13.3-4.26 0-8 2.48-10.64 6.92v86.72h-23.74V52.44H755l2.13 13.83h.35c5.5-10.46 14.37-16.14 24.83-16.14 10.29 0 16.14 5.14 18.8 14.37 5.68-9.4 14.19-14.37 23.94-14.37 14.95.01 20.59 10.65 20.59 28.87z'/%3E%3C/g%3E%3C/svg%3E";
    const PERSIAN_UNICODE_RANGE = 'U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF';
    const QUALITY_PATCHED = Symbol('qualityPatched');
    const PREFERRED_QUALITIES = ['hd1080', 'hd720', 'large', 'medium', 'small', 'tiny'];

    const activeFontKey = GM_getValue('SELECTED_FONT', 'shabnam');
    const aiStyleSheet = new CSSStyleSheet();
    let menuIds = [];

    document.adoptedStyleSheets = [...document.adoptedStyleSheets, aiStyleSheet];

    function generateCSS(font) {
        return `
            @font-face {
                font-family: 'Roboto';
                src: url('${font.url}') format('woff');
                unicode-range: ${PERSIAN_UNICODE_RANGE};
                font-display: block;
                size-adjust: 114%;
                font-weight: 100 900;
            }

            html[dark] ytd-topbar-logo-renderer yt-icon#logo-icon {
                width: 98px !important;
                content: url("${PREMIUM_LOGO}") !important;
            }

            ytd-topbar-logo-renderer ytd-yoodle-renderer {
                display: none !important;
            }

            .ytp-caption-window-container .caption-window {
                top: auto !important;
                right: 0 !important;
                bottom: 10% !important;
                left: 0 !important;
                width: fit-content !important;
                margin: 0 auto !important;
            }

            .ytp-caption-window-container .ytp-caption-segment {
                fill: #8C8C00 !important;
                color: #8C8C00 !important;
            }
        `;
    }

    function applyFont(fontKey) {
        const activeFont = FONTS[fontKey] || FONTS.shabnam;
        GM_setValue('SELECTED_FONT', fontKey);
        aiStyleSheet.replaceSync(generateCSS(activeFont));
        renderMenu(fontKey);
    }

    function renderMenu(currentFont) {
        menuIds.forEach((id) => GM_unregisterMenuCommand(id));
        menuIds = [];

        Object.keys(FONTS).forEach((key) => {
            const isSelected = currentFont === key ? '✅ ' : '';
            menuIds.push(GM_registerMenuCommand(`${isSelected}${FONTS[key].name}`, () => applyFont(key)));
        });
    }

    function getTargetQuality(player) {
        const levels = typeof player?.getAvailableQualityLevels === 'function'
            ? player.getAvailableQualityLevels()
            : [];

        for (const q of PREFERRED_QUALITIES) {
            if (levels.includes(q)) {
                return q;
            }
        }
        return 'hd1080';
    }

    function patchPlayerQuality(player) {
        if (!player || player[QUALITY_PATCHED]) return;
        player[QUALITY_PATCHED] = true;

        const { setPlaybackQuality: originalSetQuality, setPlaybackQualityRange: originalSetQualityRange } = player;

        const enforceQuality = () => {
            const target = getTargetQuality(player);
            if (typeof originalSetQualityRange === 'function') {
                originalSetQualityRange.call(player, target, target);
            } else if (typeof originalSetQuality === 'function') {
                originalSetQuality.call(player, target);
            }
        };

        if (typeof originalSetQuality === 'function') {
            player.setPlaybackQuality = function() {
                enforceQuality();
            };
        }

        if (typeof originalSetQualityRange === 'function') {
            player.setPlaybackQualityRange = function() {
                enforceQuality();
            };
        }

        if (typeof player.addEventListener === 'function') {
            player.addEventListener('onPlaybackQualityChange', (newQuality) => {
                const target = getTargetQuality(player);
                if (newQuality !== target) {
                    enforceQuality();
                }
            });
        }

        enforceQuality();
    }

    function initPlayerWatcher() {
        const checkAndPatch = () => {
            const player = document.getElementById('movie_player');
            if (player && typeof player.getAvailableQualityLevels === 'function') {
                patchPlayerQuality(player);
            }
        };

        window.addEventListener('yt-navigate-finish', checkAndPatch);
        checkAndPatch();
    }

    applyFont(activeFontKey);
    initPlayerWatcher();
})();
