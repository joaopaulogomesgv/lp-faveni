/* ============================================================
   CONFIGURAÇÃO — preencha antes de publicar
   ============================================================ */
const CONFIG = {
    // WhatsApp oficial no formato 55 + DDD + número (ex.: '5511999999999').
    // Vazio = botões de WhatsApp ficam ocultos na página.
    WHATSAPP_NUMBER: '',
    // URL do n8n que recebe POST JSON com o lead.
    LEAD_ENDPOINT: 'https://n8n.favbot.ai/webhook/446479c3-932c-4289-8c1a-4b06e7d4b960',
    // Cópia de segurança: Google Sheet (Apps Script) que recebe o mesmo JSON.
    LEAD_BACKUP_ENDPOINT: 'https://script.google.com/macros/s/AKfycbzGxpAA3Q4Rm8GBLSv2fZfUecU1mbEX6NS9IktNZoIq-tUpqPU1Xr4MLsR-VUrVQ7GT3Q/exec',
    // IDs já ativos no pos.faveni.edu.br (Site Kit + GTM).
    GA4_ID: 'G-4HVBV4D2EH',
    GTM_ID: 'GTM-K3PMSHN',
    META_PIXEL_ID: '1186263093428672'
};

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================
       MEDIÇÃO — dataLayer + GA4 + Meta Pixel
       ======================================================== */
    const track = (event, params = {}) => {
        const data = Object.assign({ page: location.pathname }, params);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event }, data));
        if (typeof window.gtag === 'function') window.gtag('event', event, data);
        if (typeof window.fbq === 'function') {
            window.fbq('track', event === 'lead_submit' ? 'Lead' : 'CustomEvent', data);
        }
    };

    if (CONFIG.GA4_ID) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', CONFIG.GA4_ID);
        const s = document.createElement('script');
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA4_ID}`;
        document.head.appendChild(s);
    }

    if (CONFIG.GTM_ID) {
        window.dataLayer = window.dataLayer || [];
        (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', CONFIG.GTM_ID);
    }

    if (CONFIG.META_PIXEL_ID) {
        window.fbq = window.fbq || function () {
            (window.fbq.queue = window.fbq.queue || []).push(arguments);
        };
        window.fbq('init', CONFIG.META_PIXEL_ID);
        window.fbq('track', 'PageView');
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(s);
    }

    /* ========================================================
       UTM / cliques pagos — guardados e enviados com o lead
       ======================================================== */
    const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
    const qp = new URLSearchParams(location.search);
    const utm = {};
    UTM_KEYS.forEach(k => {
        const v = qp.get(k);
        if (v) {
            utm[k] = v;
            try { sessionStorage.setItem('f_' + k, v); } catch (e) {}
        } else {
            try { const s = sessionStorage.getItem('f_' + k); if (s) utm[k] = s; } catch (e) {}
        }
    });
    document.querySelectorAll('form input[type="hidden"]').forEach(el => {
        if (UTM_KEYS.includes(el.name) && utm[el.name]) el.value = utm[el.name];
    });

    /* ========================================================
       WHATSAPP — oculto enquanto CONFIG.WHATSAPP_NUMBER estiver vazio
       ======================================================== */
    const wppDigits = (CONFIG.WHATSAPP_NUMBER || '').replace(/\D/g, '');
    const hasWpp = /^5\d{11,12}$/.test(wppDigits);
    const wppMsg = extra => encodeURIComponent(
        'Olá! Vim pelo site da pós-graduação em ABA da Faveni e gostaria de mais informações.' +
        (extra ? ' ' + extra : '')
    );
    const wppUrl = extra => `https://wa.me/${wppDigits}?text=${wppMsg(extra)}`;

    document.querySelectorAll('.wpp, [data-whatsapp]').forEach(el => {
        if (!hasWpp) { el.setAttribute('hidden', ''); return; }
        el.removeAttribute('hidden');
        el.href = wppUrl();
        el.target = '_blank';
        el.rel = 'noopener';
    });

    /* ========================================================
       Topbar promo rotation
       ======================================================== */
    const promos = [
        'Matrículas abertas para a pós-graduação — vagas limitadas',
        'Aproveite nossas promoções de outubro — vagas limitadas',
        'Pós-graduação com conclusão a partir de 6 meses',
        'Sem TCC e 100% online — nota máxima no MEC'
    ];
    const promoText = document.getElementById('promo-text');
    let promoIdx = 0;
    const setPromo = (i) => {
        promoIdx = (i + promos.length) % promos.length;
        if (promoText) promoText.textContent = promos[promoIdx];
    };
    const prevBtn = document.getElementById('promo-prev');
    const nextBtn = document.getElementById('promo-next');
    if (prevBtn) prevBtn.addEventListener('click', () => setPromo(promoIdx - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => setPromo(promoIdx + 1));
    setInterval(() => setPromo(promoIdx + 1), 6000);

    /* ========================================================
       Navbar scroll
       ======================================================== */
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    /* ========================================================
       Barra CTA inferior (esconde quando o formulário está na tela)
       ======================================================== */
    const stickyCta = document.getElementById('sticky-cta');
    const formEl = document.getElementById('form');
    let formInView = false;
    const updateSticky = () => {
        const show = !!stickyCta && window.scrollY > 480 && !formInView;
        if (!stickyCta) return;
        stickyCta.classList.toggle('show', show);
        document.body.classList.toggle('has-sticky-cta', show);
    };
    if (formEl && 'IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            formInView = entries[0].isIntersecting;
            updateSticky();
        }, { threshold: .12 }).observe(formEl);
    }
    window.addEventListener('scroll', updateSticky, { passive: true });
    updateSticky();

    /* ========================================================
       Smooth scroll
       ======================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href === '#' || href === '#form') return;
            const t = document.querySelector(href);
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    /* ========================================================
       FAQ
       ======================================================== */
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-q').addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });

    /* ========================================================
       Vídeo do hero (YouTube) — clique embute com autoplay
       ======================================================== */
    const YT_ID = /^[A-Za-z0-9_-]{11}$/;
    const isLocalFile = location.protocol === 'file:';
    document.querySelectorAll('[data-youtube]').forEach(media => {
        media.addEventListener('click', () => {
            if (media.querySelector('iframe')) return;
            const id = (media.dataset.youtube || '').trim();
            if (!YT_ID.test(id)) return;
            track('video_play', { tipo: 'hero' });
            // Arquivo aberto sem servidor (file://) não tem referrer → YouTube bloqueia (Erro 153).
            if (isLocalFile) {
                window.open(`https://www.youtube.com/watch?v=${id}`, '_blank', 'noopener');
                return;
            }
            const frame = document.createElement('iframe');
            frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&disablekb=1`;
            frame.title = 'Vídeo';
            frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            frame.allowFullscreen = true;
            frame.referrerPolicy = 'strict-origin-when-cross-origin';
            media.appendChild(frame);
        });
    });

    /* ========================================================
       Depoimentos em vídeo (MP4 nativo)
       Pré-carrega o primeiro frame como capa; clique dá play.
       ======================================================== */
    document.querySelectorAll('[data-video]').forEach(media => {
        const src = (media.dataset.video || '').trim();
        if (!/^https?:\/\/\S+\.mp4(\?\S*)?$/i.test(src)) return;
        const v = document.createElement('video');
        v.src = src;
        v.preload = 'metadata';
        v.muted = true;
        v.playsInline = true;
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        media.prepend(v);
        media.addEventListener('click', () => {
            if (media.classList.contains('playing')) return;
            media.classList.add('playing');
            v.muted = false;
            v.controls = true;
            const p = v.play();
            if (p && p.catch) p.catch(() => {});
            track('video_play', { tipo: 'depoimento' });
        });
    });

    /* ========================================================
       Máscara de telefone
       ======================================================== */
    const maskTel = e => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
        else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
        else if (v.length > 0) v = `(${v}`;
        e.target.value = v;
    };
    [document.getElementById('telefone'), document.getElementById('m-telefone')].forEach(el => {
        if (el) el.addEventListener('input', maskTel);
    });

    /* ========================================================
       Leads — coleta, envio e tela de sucesso
       ======================================================== */
    const buildLead = (form, source) => {
        const data = {};
        new FormData(form).forEach((v, k) => { data[k] = v; });
        data.lgpd = !!(form.querySelector('[name="lgpd"]') || {}).checked;
        data.nome = (data.nome || '').trim();
        data.source = source;
        data.page = location.href;
        data.ref = document.referrer;
        data.ts = new Date().toISOString();
        return Object.assign(data, utm);
    };

    /* Payload no formato dos campos que já vão para o webhook do n8n
       (rótulos) + chaves em minúsculas, caso o workflow espere os slugs. */
    const webhookPayload = data => ({
        'Nome': data.nome || '',
        'Email': data.email || '',
        'Telefone': data.telefone || '',
        'Tipo de curso': data.tipo || '',
        'Área de seu interesse?': data.area || '',
        'nome': data.nome || '',
        'email': data.email || '',
        'telefone': data.telefone || '',
        'tipo': data.tipo || '',
        'area': data.area || '',
        'utm_source': data.utm_source || '',
        'utm_medium': data.utm_medium || '',
        'utm_campaign': data.utm_campaign || '',
        'utm_content': data.utm_content || '',
        'utm_term': data.utm_term || '',
        'gclid': data.gclid || '',
        'fbclid': data.fbclid || '',
        'page_url': data.page || '',
        'referrer': data.ref || '',
        'page': data.page || '',
        'ref': data.ref || '',
        'lgpd': data.lgpd ? 'sim' : 'nao',
        'origem': 'lp-pos-26',
        'ts': data.ts
    });

    /* ========================================================
       ENVIO — webhook principal + cópia, com fila de reenvio
       ======================================================== */
    const QUEUE_KEY = 'faveni_lead_queue';
    const qRead = () => { try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch (e) { return []; } };
    const qWrite = list => { try { localStorage.setItem(QUEUE_KEY, JSON.stringify(list.slice(-20))); } catch (e) {} };

    const postLead = (url, body) =>
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(r => {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return true;
        }).catch(() =>
            /*2ª tentativa sem preflight CORS (content-type simples) */
            fetch(url, { method: 'POST', body: JSON.stringify(body) })
                .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return true; })
        );

    const leadTargets = () => [CONFIG.LEAD_ENDPOINT, CONFIG.LEAD_BACKUP_ENDPOINT].filter(Boolean);

    const tryDeliver = async item => {
        const targets = leadTargets();
        if (!targets.length) return false;
        const payload = webhookPayload(item.lead || item);
        if (!Array.isArray(item.done)) item.done = [];
        await Promise.all(targets.map(async url => {
            if (item.done.includes(url)) return;
            try {
                await postLead(url, payload);
                item.done.push(url);
            } catch (err) {
                console.warn('[LP] falha no envio; na fila para reenvio:', url, err);
            }
        }));
        return targets.every(u => item.done.includes(u));
    };

    let flushing = false;
    const flushQueue = async () => {
        if (flushing) return;
        flushing = true;
        try {
            const q = qRead();
            if (!q.length) return;
            const pending = [];
            for (const raw of q) {
                const item = raw && raw.lead ? raw : { lead: raw, done: [] };
                if (await tryDeliver(item)) continue;
                pending.push(item);
            }
            qWrite(pending);
        } finally {
            flushing = false;
        }
    };

    const persistLead = data => {
        try {
            const list = JSON.parse(localStorage.getItem('faveni_leads') || '[]');
            list.push(data);
            localStorage.setItem('faveni_leads', JSON.stringify(list.slice(-50)));
        } catch (e) {}
        const q = qRead();
        q.push({ lead: data, done: [] });
        qWrite(q);
        flushQueue();
    };

    flushQueue();

    /* ========================================================
       ABRIR O POPUP DO ELEMENTOR EM TODOS OS BOTÕES
       ======================================================== */
    const triggerPopup = (e) => {
        const targetEl = e?.currentTarget || e?.target;
        let popupId = window.FAVENI_POPUP_ID || 2466;
        let popupHash = '#elementor-action:action=popup:open&settings=eyJpZCI6IjI0NjYiLCJ0b2dnbGUiOmZhbHNlfQ==';

        const href = (targetEl && targetEl.getAttribute) ? (targetEl.getAttribute('href') || '') : '';
        const match = href.match(/settings=([A-Za-z0-9+/=]+)/);
        if (match) {
            try {
                const parsed = JSON.parse(atob(match[1]));
                if (parsed && parsed.id) {
                    popupId = Number(parsed.id) || parsed.id;
                    popupHash = href;
                }
            } catch (err) {}
        } else if (window.FAVENI_POPUP_ID) {
            popupId = window.FAVENI_POPUP_ID;
            const b64 = btoa(JSON.stringify({ id: String(popupId), toggle: false }));
            popupHash = '#elementor-action:action=popup:open&settings=' + b64;
        }

        const label = (e?.target?.textContent || e?.currentTarget?.textContent || '').trim().slice(0, 40);
        track('cta_click', { label: label || ('popup_' + popupId) });

        try {
            if (window.elementorProFrontend && elementorProFrontend.modules && elementorProFrontend.modules.popup) {
                if (e && e.preventDefault) e.preventDefault();
                elementorProFrontend.modules.popup.showPopup({ id: popupId });
                return;
            }
        } catch (err) {}

        // Fallback nativo de URL dinâmica do Elementor Pro
        if (window.location.hash !== popupHash) {
            window.location.href = popupHash;
        }
    };
    const triggerPopup2466 = triggerPopup; // Retrocompatibilidade

    document.querySelectorAll('.open-popup-trigger, a[href="#form"], a[href*="popup:open"], .btn, .card-link, .sticky-cta-btn').forEach(el => {
        el.addEventListener('click', triggerPopup);
    });

    /* ========================================================
       Carrossel de depoimentos
       ======================================================== */
    document.querySelectorAll('[data-carousel]').forEach(car => {
        const track = car.querySelector('.carousel-track');
        const prev = car.querySelector('.carousel-prev');
        const next = car.querySelector('.carousel-next');
        if (!track) return;
        const cards = Array.from(track.children);
        const step = () => {
            const c = cards[0];
            if (!c) return 320;
            const cs = getComputedStyle(track);
            const gap = parseFloat(cs.columnGap || cs.gap) || 20;
            return c.getBoundingClientRect().width + gap;
        };
        const sync = () => {
            const max = track.scrollWidth - track.clientWidth;
            const scrollable = max > 4;
            car.classList.toggle('is-scrollable', scrollable);
            if (prev) prev.disabled = track.scrollLeft <= 4;
            if (next) next.disabled = track.scrollLeft >= max - 4;
        };
        if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
        if (next) next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
        track.addEventListener('scroll', sync, { passive: true });
        window.addEventListener('resize', sync);
        sync();
        setTimeout(sync, 400);
    });

    /* ========================================================
       Contador animado
       ======================================================== */
    const numEl = document.querySelector('.numbers-big');
    if (numEl) {
        let animated = false;
        const target = parseInt(numEl.dataset.target) || 500000;
        const obs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                const dur = 2200;
                const start = performance.now();
                const step = now => {
                    const p = Math.min((now - start) / dur, 1);
                    const ease = 1 - Math.pow(1 - p, 3);
                    numEl.textContent = new Intl.NumberFormat('pt-BR').format(Math.floor(target * ease));
                    if (p < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
                obs.disconnect();
            }
        }, { threshold: 0.3 });
        obs.observe(numEl);
    }

    /* ========================================================
       Scroll reveal
       ======================================================== */
    const reveals = document.querySelectorAll('.reveal');
    const revObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                revObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revObs.observe(el));

});
