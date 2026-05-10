/* eslint-disable */
import { useState, useEffect, useCallback } from "react";
const API = "http://localhost:5000/api";
const PAYSTACK_PUBLIC_KEY = "pk_test_af505bd0d75d43a06f0bbe3f32a308d18fc5a1f6";
// ── STYLES ────────────────────────────────────────────────────────────────────
const css = `
 @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap');
 *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
 :root{
 --ink:#08111F;--ink2:#0F1C30;--ink3:#162440;
 --gold:#F0A500;--gold2:#FFD166;--gold3:#FFF0C0;
 --sky:#2196F3;--sky2:#64B5F6;
 --white:#FFFFFF;--snow:#F5F8FF;--mist:#EAF0FA;
 --slate:#8899BB;--fog:#C8D4E8;
 --green:#00C853;--red:#F44336;
 --r8:8px;--r12:12px;--r16:16px;--r24:24px;--r99:99px;
 --shadow:0 4px 24px rgba(8,17,31,0.12);
 --shadow-lg:0 16px 48px rgba(8,17,31,0.18);
 --nav:68px;
 }
 html{scroll-behavior:smooth}
 body{font-family:'Cabinet Grotesk',sans-serif;background:var(--snow);color:var(--ink);overflow-x:hidden}
 h1,h2,h3,h4{font-family:'Clash Display',sans-serif}
 button{cursor:pointer;font-family:inherit}
 input,select,textarea{font-family:inherit}
 ::-webkit-scrollbar{width:6px}
 ::-webkit-scrollbar-track{background:var(--mist)}
 ::-webkit-scrollbar-thumb{background:var(--fog);border-radius:3px}
 /* NAV */
 .nav{position:fixed;top:0;left:0;right:0;height:var(--nav);background:rgba(8,17,31,0.96);backdrop-filter:blur(24px);
 border-bottom:1px solid rgba(240,165,0,0.15);display:flex;align-items:center;justify-content:space-between;
 padding:0 32px;z-index:900}
 .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;cursor:pointer}
 .logo-mark{width:36px;height:36px;background:var(--gold);border-radius:10px;display:flex;align-items:center;justify-content:center;
 font-family:'Clash Display',sans-serif;font-weight:700;font-size:17px;color:var(--ink)}
 .logo-text{font-family:'Clash Display',sans-serif;font-weight:600;font-size:17px;color:var(--white)}
 .logo-text span{color:var(--gold)}
 .nav-links{display:flex;gap:28px}
 .nav-link{color:rgba(255,255,255,0.65);font-size:14px;font-weight:500;background:none;border:none;padding:0;
 transition:color .2s;cursor:pointer}
 .nav-link:hover,.nav-link.active{color:var(--gold)}
 .nav-right{display:flex;align-items:center;gap:12px}
 .nav-cart{position:relative;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);
 color:white;padding:8px 16px;border-radius:var(--r8);font-size:14px;font-weight:500;display:flex;align-items:center;gap:8px;
 transition:all .2s}
 .nav-cart:hover{border-color:var(--gold);color:var(--gold)}
 .cart-dot{background:var(--gold);color:var(--ink);border-radius:50%;width:18px;height:18px;
 font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center}
 .btn-gold{background:var(--gold);color:var(--ink);padding:10px 22px;border-radius:var(--r8);
 border:none;font-size:14px;font-weight:700;font-family:'Clash Display',sans-serif;
 transition:all .2s;display:inline-flex;align-items:center;gap:6px}
 .btn-gold:hover{background:var(--gold2);transform:translateY(-1px);box-shadow:0 6px 20px rgba(240,165,0,0.35)}
 .btn-outline{background:transparent;color:var(--sky2);padding:10px 22px;border-radius:var(--r8);
 border:2px solid var(--sky2);font-size:14px;font-weight:600;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
 .btn-outline:hover{background:var(--sky);color:white;border-color:var(--sky)}
 .btn-dark{background:var(--ink);color:white;padding:10px 22px;border-radius:var(--r8);
 border:none;font-size:14px;font-weight:600;transition:all .2s}
 .btn-dark:hover{background:var(--ink3)}
 /* HERO */
 .hero{min-height:100vh;background:var(--ink);padding-top:var(--nav);position:relative;overflow:hidden;
 display:flex;align-items:center}
 .hero-grid{position:absolute;inset:0;
 background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),
 linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);
 background-size:56px 56px}
 .hero-glow{position:absolute;width:700px;height:700px;border-radius:50%;
 background:radial-gradient(circle,rgba(33,150,243,0.12) 0%,transparent 70%);
 top:-200px;right:-100px;pointer-events:none}
 .hero-glow2{position:absolute;width:500px;height:500px;border-radius:50%;
 background:radial-gradient(circle,rgba(240,165,0,0.08) 0%,transparent 70%);
 bottom:-100px;left:-50px;pointer-events:none}
 .hero-inner{max-width:1200px;margin:0 auto;padding:80px 32px;display:grid;grid-template-columns:1fr 480px;gap:60px;align-items:center;position:relative;z-index:2}
 .hero-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(240,165,0,0.1);
 border:1px solid rgba(240,165,0,0.25);color:var(--gold);padding:6px 14px;border-radius:var(--r99);
 font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:24px}
 .hero-pill-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);animation:blink 2s infinite}
 @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
 .hero h1{font-size:clamp(40px,5.5vw,68px);font-weight:700;color:white;line-height:1.08;margin-bottom:22px}
 .hero h1 em{color:var(--gold);font-style:normal}
 .hero p{font-size:17px;color:rgba(255,255,255,0.55);line-height:1.75;margin-bottom:36px;max-width:500px}
 .hero-btns{display:flex;gap:14px;flex-wrap:wrap}
 .hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:52px}
 .hstat{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:var(--r12);padding:18px;text-align:center}
 .hstat-n{font-family:'Clash Display',sans-serif;font-size:30px;font-weight:700;color:var(--gold)}
 .hstat-l{font-size:11px;color:rgba(255,255,255,0.4);margin-top:3px;text-transform:uppercase;letter-spacing:.8px}
 /* HERO VISUAL */
 .hero-visual{position:relative;display:flex;justify-content:center;align-items:center}
 .device-frame{width:240px;height:490px;background:linear-gradient(160deg,#1a2a40,#0a1525);
 border-radius:38px;border:1.5px solid rgba(255,255,255,0.1);
 box-shadow:0 40px 80px rgba(0,0,0,0.6),0 0 0 6px rgba(255,255,255,0.03);
 display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;
 animation:levitate 4s ease-in-out infinite;position:relative}
 @keyframes levitate{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
 .device-notch{position:absolute;top:14px;left:50%;transform:translateX(-50%);
 width:70px;height:5px;background:rgba(255,255,255,0.12);border-radius:3px}
 .device-product{text-align:center;padding:0 24px;transition:opacity .3s}
 .dp-emoji{font-size:58px;display:block;margin-bottom:10px}
 .dp-name{font-family:'Clash Display',sans-serif;color:white;font-size:15px;font-weight:600}
 .dp-old{color:rgba(255,255,255,0.3);font-size:12px;text-decoration:line-through;margin-top:4px}
 .dp-price{color:var(--gold);font-family:'Clash Display',sans-serif;font-size:24px;font-weight:700;margin-top:2px}
 .fbadge{position:absolute;background:var(--gold);color:var(--ink);padding:7px 13px;border-radius:var(--r8);
 font-size:12px;font-weight:800;font-family:'Clash Display',sans-serif;box-shadow:0 6px 20px rgba(240,165,0,0.4)}
 .fbadge-1{top:-16px;right:-28px;transform:rotate(6deg);animation:fb1 3s ease-in-out infinite}
 .fbadge-2{bottom:40px;left:-52px;transform:rotate(-5deg);animation:fb2 3.5s ease-in-out infinite .4s}
 @keyframes fb1{0%,100%{transform:rotate(6deg) translateY(0)}50%{transform:rotate(6deg) translateY(-8px)}}
 @keyframes fb2{0%,100%{transform:rotate(-5deg) translateY(0)}50%{transform:rotate(-5deg) translateY(-6px)}}
 /* FEATURES STRIP */
 .fstrip{background:var(--gold);padding:14px 32px}
 .fstrip-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
 .fstrip-item{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--ink)}
 .fstrip-item span{font-weight:400;color:rgba(8,17,31,0.65)}
 /* CURRENCY BAR */
 .cbar{background:var(--ink2);padding:12px 32px;border-bottom:1px solid rgba(255,255,255,0.06)}
 .cbar-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:20px;flex-wrap:wrap}
 .cbar-label{color:rgba(255,255,255,0.5);font-size:13px}
 .cbar-select{background:rgba(255,255,255,0.08);color:white;border:1px solid rgba(255,255,255,0.15);
 padding:5px 12px;border-radius:6px;font-size:13px;cursor:pointer}
 .cbar-select option{background:var(--ink2)}
 .cbar-rate{color:var(--gold);font-size:13px;font-weight:600}
 .cbar-prices{display:flex;gap:12px;flex-wrap:wrap;margin-left:auto}
 .cbar-price{background:rgba(255,255,255,0.06);padding:4px 10px;border-radius:6px;font-size:12px;color:rgba(255,255,255,0.6)}
 .cbar-price b{color:var(--gold2)}
 /* SECTION */
 .section{padding:72px 32px;max-width:1200px;margin:0 auto}
 .sec-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--sky);margin-bottom:10px}
 .sec-title{font-family:'Clash Display',sans-serif;font-size:clamp(26px,3.5vw,40px);font-weight:700;color:var(--ink);margin-bottom:10px}
 .sec-sub{font-size:15px;color:var(--slate);line-height:1.65;max-width:480px;margin-bottom:36px}
 /* FILTER BAR */
 .filter-bar{background:white;border-bottom:1px solid var(--fog);padding:20px 32px;position:sticky;top:var(--nav);z-index:80}
 .filter-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
 .fsearch{flex:1;min-width:180px;position:relative}
 .fsearch input{width:100%;padding:9px 14px 9px 36px;border:1.5px solid var(--fog);border-radius:var(--r99);
 font-size:13px;outline:none;transition:border-color .2s;background:var(--snow)}
 .fsearch input:focus{border-color:var(--sky)}
 .fsearch-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px;pointer-events:none}
 .fcat-btn{padding:7px 16px;border-radius:var(--r99);border:1.5px solid var(--fog);background:white;
 font-size:13px;font-weight:500;transition:all .2s;color:var(--ink)}
 .fcat-btn.on,.fcat-btn:hover{background:var(--ink);border-color:var(--ink);color:white}
 .fselect{padding:7px 12px;border-radius:var(--r99);border:1.5px solid var(--fog);background:white;
 font-size:13px;color:var(--ink);cursor:pointer;appearance:none;padding-right:24px}
 /* PRODUCT GRID */
 .pgrid-wrap{background:var(--snow);padding:32px}
 .pgrid-head{max-width:1200px;margin:0 auto 20px;display:flex;justify-content:space-between;align-items:center}
 .pgrid-count{font-size:14px;color:var(--slate)}
 .pgrid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(256px,1fr));gap:20px}
 .pcard{background:white;border-radius:var(--r16);border:1px solid var(--fog);overflow:hidden;
 transition:all .25s;cursor:pointer;position:relative}
 .pcard:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:rgba(33,150,243,0.3)}
 .pcard-badge{position:absolute;top:12px;left:12px;padding:4px 10px;border-radius:var(--r99);font-size:11px;font-weight:700;z-index:2}
 .pb-new{background:var(--ink);color:white}
 .pb-used{background:var(--gold);color:var(--ink)}
 .pb-hot{background:#EF5350;color:white}
 .pb-bulk{background:var(--green);color:white}
 .pcard-img{height:175px;display:flex;align-items:center;justify-content:center;font-size:62px;
 background:linear-gradient(135deg,var(--mist),var(--fog))}
 .pcard-body{padding:15px}
 .pcard-vendor{font-size:11px;color:var(--slate);text-transform:uppercase;letter-spacing:.8px;margin-bottom:3px}
 .pcard-name{font-family:'Clash Display',sans-serif;font-size:16px;font-weight:600;color:var(--ink);margin-bottom:6px;line-height:1.3}
 .pcard-rating{display:flex;align-items:center;gap:4px;font-size:12px;color:var(--slate);margin-bottom:8px}
 .stars{color:var(--gold)}
 .pcard-specs{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px}
 .spec{background:var(--mist);color:var(--slate);padding:3px 8px;border-radius:4px;font-size:11px;font-weight:500}
 .pcard-foot{display:flex;align-items:center;justify-content:space-between}
 .pcard-pricing{}
 .pcard-old{font-size:12px;color:var(--slate);text-decoration:line-through}
 .pcard-price{font-family:'Clash Display',sans-serif;font-size:20px;font-weight:700;color:var(--ink)}
 .pcard-save{font-size:11px;color:var(--green);font-weight:600}
 .add-btn{width:36px;height:36px;border-radius:var(--r8);background:var(--ink);border:none;color:white;
 font-size:18px;display:flex;align-items:center;justify-content:center;transition:all .2s}
 .add-btn:hover{background:var(--sky);transform:scale(1.1)}
 /* PAYMENT SECTION */
 .pay-section{background:var(--ink);padding:72px 32px}
 .pay-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
 .pay-info{}
 .pay-info h2{font-family:'Clash Display',sans-serif;font-size:36px;font-weight:700;color:white;margin-bottom:14px}
 .pay-info p{color:rgba(255,255,255,0.55);font-size:15px;line-height:1.75;margin-bottom:32px}
 .pay-methods-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
 .pay-method-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
 border-radius:var(--r12);padding:20px;transition:all .2s;cursor:pointer}
 .pay-method-card:hover,.pay-method-card.active{border-color:var(--gold);background:rgba(240,165,0,0.08)}
 .pmc-icon{font-size:28px;margin-bottom:10px}
 .pmc-name{font-family:'Clash Display',sans-serif;font-weight:600;color:white;font-size:15px}
 .pmc-desc{font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px}
 .pmc-badge{display:inline-block;background:rgba(0,200,83,0.15);color:var(--green);
 padding:2px 8px;border-radius:var(--r99);font-size:10px;font-weight:700;margin-top:8px}
 .pay-demo-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
 border-radius:var(--r16);padding:28px}
 .pdc-title{font-family:'Clash Display',sans-serif;color:white;font-size:18px;font-weight:600;margin-bottom:20px}
 .pdc-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}
 .pdc-tab{padding:7px 14px;border-radius:var(--r99);border:1px solid rgba(255,255,255,0.15);
 background:transparent;color:rgba(255,255,255,0.5);font-size:13px;font-weight:500;transition:all .2s}
 .pdc-tab.active{background:var(--gold);border-color:var(--gold);color:var(--ink);font-weight:700}
 .pdc-form{}
 .pdc-label{color:rgba(255,255,255,0.5);font-size:12px;font-weight:600;margin-bottom:7px;display:block}
 .pdc-input{width:100%;padding:11px 14px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);
 border-radius:var(--r8);color:white;font-size:14px;outline:none;margin-bottom:14px;transition:border-color .2s}
 .pdc-input:focus{border-color:var(--gold)}
 .pdc-input::placeholder{color:rgba(255,255,255,0.25)}
 .pdc-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
 .pdc-summary{background:rgba(240,165,0,0.08);border:1px solid rgba(240,165,0,0.2);border-radius:var(--r8);
 padding:14px;margin-bottom:16px}
 .pdc-sum-row{display:flex;justify-content:space-between;font-size:13px;padding:4px 0}
 .pdc-sum-row.total{font-weight:700;font-size:15px;color:white;border-top:1px solid rgba(255,255,255,0.1);
 padding-top:10px;margin-top:6px}
 .pdc-sum-label{color:rgba(255,255,255,0.5)}
 .pdc-sum-val{color:var(--gold)}
 /* SUPPLIER SECTION */
 .sup-section{background:white;padding:72px 32px}
 .sup-inner{max-width:1200px;margin:0 auto}
 .sup-sync-bar{background:var(--mist);border:1px solid var(--fog);border-radius:var(--r12);
 padding:16px 20px;display:flex;align-items:center;gap:16px;margin-bottom:36px;flex-wrap:wrap}
 .ssb-dot{width:10px;height:10px;border-radius:50%;background:var(--green);animation:blink 2s infinite;flex-shrink:0}
 .ssb-text{font-size:14px;color:var(--slate);flex:1}
 .ssb-text b{color:var(--ink)}
 .ssb-count{background:var(--ink);color:white;padding:4px 12px;border-radius:var(--r99);font-size:12px;font-weight:700}
 .sup-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px}
 .scard{border:1.5px solid var(--fog);border-radius:var(--r16);padding:22px;transition:all .25s}
 .scard:hover{border-color:var(--sky);box-shadow:0 8px 28px rgba(33,150,243,0.1);transform:translateY(-2px)}
 .scard-top{display:flex;align-items:center;gap:14px;margin-bottom:16px}
 .scard-avatar{width:48px;height:48px;border-radius:var(--r12);background:linear-gradient(135deg,var(--ink),var(--sky));
 display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
 .scard-meta{flex:1}
 .scard-name{font-family:'Clash Display',sans-serif;font-size:15px;font-weight:600;color:var(--ink)}
 .scard-loc{font-size:12px;color:var(--slate);margin-top:2px}
 .scard-verified{background:#E8F5E9;color:var(--green);padding:3px 9px;border-radius:var(--r99);font-size:10px;font-weight:800}
 .scard-api{background:rgba(33,150,243,0.1);color:var(--sky);padding:3px 9px;border-radius:var(--r99);font-size:10px;font-weight:700;margin-left:6px}
 .scard-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
 .ss{text-align:center;padding:8px;background:var(--snow);border-radius:var(--r8)}
 .ss-n{font-family:'Clash Display',sans-serif;font-size:14px;font-weight:700;color:var(--ink)}
 .ss-l{font-size:10px;color:var(--slate);margin-top:1px}
 .scard-tags{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px}
 .stag{background:var(--mist);color:var(--sky);padding:3px 9px;border-radius:5px;font-size:11px;font-weight:600}
 .scard-sync{display:flex;align-items:center;justify-content:space-between;background:var(--snow);
 border-radius:var(--r8);padding:10px 12px;margin-bottom:14px;font-size:12px}
 .sync-status{display:flex;align-items:center;gap:6px;color:var(--slate)}
 .sync-dot{width:6px;height:6px;border-radius:50%}
 .sync-dot.green{background:var(--green)}
 .sync-dot.orange{background:#FF9800}
 .scard-btns{display:flex;gap:10px}
 .sbtn-primary{flex:1;padding:9px;border-radius:var(--r8);background:var(--ink);border:none;color:white;
 font-size:12px;font-weight:600;transition:all .2s}
 .sbtn-primary:hover{background:var(--sky)}
 .sbtn-sec{flex:1;padding:9px;border-radius:var(--r8);background:transparent;border:1.5px solid var(--fog);
 color:var(--ink);font-size:12px;font-weight:600;transition:all .2s}
 .sbtn-sec:hover{background:var(--ink);color:white;border-color:var(--ink)}
 /* SHIPPING */
 .ship-section{background:var(--ink2);padding:72px 32px}
 .ship-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
 .ship-left h2{font-family:'Clash Display',sans-serif;font-size:34px;font-weight:700;color:white;margin-bottom:14px}
 .ship-left p{color:rgba(255,255,255,0.5);font-size:15px;line-height:1.75;margin-bottom:28px}
 .carrier-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
 .carrier-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);
 border-radius:var(--r12);padding:14px}
 .cc-name{font-family:'Clash Display',sans-serif;color:white;font-size:14px;font-weight:600}
 .cc-time{color:var(--gold);font-size:12px;margin-top:2px}
 .cc-type{color:rgba(255,255,255,0.35);font-size:11px}
 .calc-box{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:var(--r16);padding:28px}
 .calc-title{font-family:'Clash Display',sans-serif;color:white;font-size:18px;font-weight:600;margin-bottom:22px}
 .calc-label{color:rgba(255,255,255,0.5);font-size:12px;font-weight:600;margin-bottom:7px;display:block}
 .calc-input,.calc-select{width:100%;padding:11px 14px;background:rgba(255,255,255,0.07);
 border:1px solid rgba(255,255,255,0.12);border-radius:var(--r8);color:white;font-size:14px;
 outline:none;margin-bottom:14px;transition:border-color .2s}
 .calc-input:focus,.calc-select:focus{border-color:var(--gold)}
 .calc-select option{background:var(--ink2)}
 .calc-result-box{background:rgba(240,165,0,0.08);border:1px solid rgba(240,165,0,0.2);
 border-radius:var(--r8);padding:14px;margin-top:14px}
 .crb-row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.06)}
 .crb-row:last-child{border:none;font-weight:700;font-size:14px;padding-top:10px;margin-top:4px}
 .crb-l{color:rgba(255,255,255,0.5)}
 .crb-v{color:var(--gold);font-weight:600}
 /* CART DRAWER */
 .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:1000;opacity:0;pointer-events:none;transition:opacity .3s}
 .overlay.on{opacity:1;pointer-events:all}
 .drawer{position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:white;z-index:1001;
 transform:translateX(105%);transition:transform .35s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;
 box-shadow:-8px 0 40px rgba(8,17,31,0.15)}
 .drawer.on{transform:translateX(0)}
 .drawer-head{padding:22px 24px;border-bottom:1px solid var(--fog);display:flex;justify-content:space-between;align-items:center}
 .drawer-title{font-family:'Clash Display',sans-serif;font-size:20px;font-weight:700;color:var(--ink)}
 .drawer-close{background:none;border:none;font-size:22px;color:var(--slate);line-height:1}
 .drawer-close:hover{color:var(--ink)}
 .drawer-body{flex:1;overflow-y:auto;padding:18px 24px}
 .drawer-empty{text-align:center;padding:60px 20px;color:var(--slate)}
 .cart-item{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--fog)}
 .ci-img{width:60px;height:60px;background:var(--mist);border-radius:var(--r8);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0}
 .ci-info{flex:1}
 .ci-name{font-weight:600;font-size:14px;color:var(--ink);margin-bottom:3px}
 .ci-price{font-family:'Clash Display',sans-serif;font-weight:700;color:var(--sky);font-size:14px}
 .ci-controls{display:flex;align-items:center;gap:8px;margin-top:8px}
 .qty-btn{width:24px;height:24px;border-radius:5px;border:1px solid var(--fog);background:white;
 font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s}
 .qty-btn:hover{background:var(--ink);color:white;border-color:var(--ink)}
 .qty-n{font-size:14px;font-weight:600;min-width:20px;text-align:center}
 .ci-del{background:none;border:none;color:var(--slate);font-size:16px;margin-left:auto}
 .ci-del:hover{color:var(--red)}
 .drawer-foot{padding:20px 24px;border-top:1px solid var(--fog)}
 .df-row{display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px;color:var(--slate)}
 .df-total{display:flex;justify-content:space-between;font-family:'Clash Display',sans-serif;
 font-size:20px;font-weight:700;color:var(--ink);padding-top:12px;margin-top:6px;border-top:1px solid var(--fog);margin-bottom:14px}
 .btn-checkout{width:100%;padding:15px;background:var(--gold);border:none;border-radius:var(--r12);
 font-family:'Clash Display',sans-serif;font-size:16px;font-weight:700;color:var(--ink);transition:all .2s}
 .btn-checkout:hover{background:var(--gold2);transform:translateY(-1px);box-shadow:0 6px 20px rgba(240,165,0,0.35)}
 .btn-checkout-note{text-align:center;font-size:11px;color:var(--slate);margin-top:8px}
 /* CHECKOUT MODAL */
 .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:2000;display:flex;align-items:center;justify-content:center;padding:20px}
 .modal{background:white;border-radius:var(--r24);width:100%;max-width:540px;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-lg)}
 .modal-head{padding:26px 30px 18px;border-bottom:1px solid var(--fog);display:flex;justify-content:space-between;align-items:center}
 .modal-title{font-family:'Clash Display',sans-serif;font-size:21px;font-weight:700;color:var(--ink)}
 .modal-body{padding:24px 30px}
 .ml{font-size:13px;font-weight:600;color:var(--ink);margin-bottom:6px;display:block}
 .mi{width:100%;padding:11px 14px;border:1.5px solid var(--fog);border-radius:var(--r8);
 font-size:14px;outline:none;margin-bottom:14px;transition:border-color .2s}
 .mi:focus{border-color:var(--sky)}
 .mi-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
 .pay-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}
 .pt{flex:1;min-width:90px;padding:11px;border:2px solid var(--fog);border-radius:var(--r8);
 text-align:center;font-size:13px;font-weight:600;transition:all .2s;background:white}
 .pt.on{border-color:var(--sky);background:rgba(33,150,243,0.06);color:var(--sky)}
 .order-mini{background:var(--snow);border-radius:var(--r12);padding:14px;margin:14px 0}
 .om-row{display:flex;justify-content:space-between;font-size:13px;padding:4px 0;color:var(--slate)}
 .om-total{font-weight:700;font-size:15px;color:var(--ink);border-top:1px solid var(--fog);padding-top:10px;margin-top:6px;display:flex;justify-content:space-between}
 .modal-foot{padding:0 30px 26px}
 .success-box{text-align:center;padding:24px 0}
 .success-ico{font-size:52px;margin-bottom:14px}
 .success-title{font-family:'Clash Display',sans-serif;font-size:22px;font-weight:700;color:var(--green);margin-bottom:8px}
 .success-sub{font-size:14px;color:var(--slate);line-height:1.6}
 .order-num{background:var(--snow);border-radius:var(--r8);padding:14px;margin-top:18px;font-size:13px;color:var(--slate);text-align:center}
 /* TOAST */
 .toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(16px);
 background:var(--ink);color:white;padding:13px 22px;border-radius:var(--r12);font-size:14px;
 font-weight:500;opacity:0;pointer-events:none;transition:all .3s;z-index:9999;
 border-left:4px solid var(--gold);white-space:nowrap;box-shadow:var(--shadow-lg)}
 .toast.on{opacity:1;transform:translateX(-50%) translateY(0)}
 /* FOOTER */
 footer{background:var(--ink);color:rgba(255,255,255,0.5);padding:56px 32px 28px}
 .footer-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:44px}
 .footer-desc{font-size:13px;line-height:1.75;margin:14px 0 20px;color:rgba(255,255,255,0.4)}
 .footer-socials{display:flex;gap:8px}
 .social{width:34px;height:34px;background:rgba(255,255,255,0.07);border-radius:7px;
 display:flex;align-items:center;justify-content:center;font-size:15px;cursor:pointer;transition:all .2s}
 .social:hover{background:var(--gold)}
 .fh{font-family:'Clash Display',sans-serif;font-size:13px;font-weight:600;color:white;
 text-transform:uppercase;letter-spacing:1px;margin-bottom:14px}
 .fl{list-style:none;display:flex;flex-direction:column;gap:9px}
 .fl a{color:rgba(255,255,255,0.45);text-decoration:none;font-size:13px;transition:color .2s}
 .fl a:hover{color:var(--gold)}
 .footer-bottom{max-width:1200px;margin:0 auto;border-top:1px solid rgba(255,255,255,0.07);
 padding-top:22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
 .footer-badges{display:flex;gap:8px;flex-wrap:wrap}
 .fbadge-s{background:rgba(255,255,255,0.06);padding:4px 10px;border-radius:5px;font-size:11px;color:rgba(255,255,255,0.45)}
 @media(max-width:900px){
 .hero-inner{grid-template-columns:1fr}.hero-visual{display:none}
 .pay-inner,.ship-inner{grid-template-columns:1fr}
 .footer-grid{grid-template-columns:1fr 1fr}
 .nav-links{display:none}
 .section,.pgrid-wrap,.pay-section,.sup-section,.ship-section{padding-left:20px;padding-right:20px}
 .filter-bar{padding:16px 20px}
 }
 @media(max-width:580px){
 .footer-grid{grid-template-columns:1fr}
 .fstrip-inner{gap:8px}
 .drawer{width:100%}
 }
`;
// ── DATA ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
 {id:1,name:'iPhone 15 Pro Max',cat:'iphone',cond:'new',price:649,old:999,emoji:' ',specs:['256GB','Titanium','5G'],vendor:'ShenZhen TechSource',rating:4.8,reviews:312,badge:'hot'},
 {id:2,name:'iPhone 14 Pro',cat:'iphone',cond:'new',price:449,old:799,emoji:' ',specs:['128GB','Deep Purple','5G'],vendor:'GlobalApple Co.',rating:4.7,reviews:208,badge:'new'},
 {id:3,name:'iPhone 13 Pre-Owned',cat:'iphone',cond:'used',price:189,old:349,emoji:' ',specs:['128GB','Grade A','Face ID'],vendor:'RenewTech HK',rating:4.5,reviews:145,badge:'used'},
 {id:4,name:'iPhone 15 (Sealed)',cat:'iphone',cond:'new',price:549,old:799,emoji:' ',specs:['128GB','Pink','USB-C'],vendor:'ShenZhen TechSource',rating:4.9,reviews:421,badge:'hot'},
 {id:5,name:'MacBook Air M2',cat:'mac',cond:'new',price:799,old:1199,emoji:' ',specs:['8GB','256GB SSD','13"'],vendor:'MacWorld Direct',rating:4.9,reviews:187,badge:'new'},
 {id:6,name:'MacBook Pro M3 14"',cat:'mac',cond:'new',price:1199,old:1599,emoji:' ',specs:['16GB','512GB','ProMotion'],vendor:'MacWorld Direct',rating:4.8,reviews:95,badge:'new'},
 {id:7,name:'MacBook Air M1 Used',cat:'mac',cond:'used',price:489,old:899,emoji:' ',specs:['8GB','256GB','Grade B+'],vendor:'RenewTech HK',rating:4.4,reviews:76,badge:'used'},
 {id:8,name:'iPad Pro 12.9" M2',cat:'ipad',cond:'new',price:699,old:1099,emoji:' ',specs:['256GB','5G','Liquid Retina'],vendor:'TabletHub CN',rating:4.7,reviews:143,badge:'new'},
 {id:9,name:'iPad Air 5th Gen',cat:'ipad',cond:'new',price:349,old:599,emoji:' ',specs:['64GB','WiFi','Touch ID'],vendor:'TabletHub CN',rating:4.6,reviews:211,badge:'new'},
 {id:10,name:'iPad Mini 6 Used',cat:'ipad',cond:'used',price:199,old:399,emoji:' ',specs:['64GB','Grade A','USB-C'],vendor:'RenewTech HK',rating:4.3,reviews:89,badge:'used'},
 {id:11,name:'AirPods Pro 2nd Gen',cat:'audio',cond:'new',price:149,old:249,emoji:' ',specs:['ANC','MagSafe','USB-C'],vendor:'SoundTech Wholesale',rating:4.8,reviews:534,badge:'hot'},
 {id:12,name:'AirPods 3rd Gen',cat:'audio',cond:'new',price:89,old:169,emoji:' ',specs:['Spatial Audio','IPX4','Lightning'],vendor:'SoundTech Wholesale',rating:4.6,reviews:278,badge:'new'},
 {id:13,name:'AirPods Max Used',cat:'audio',cond:'used',price:249,old:549,emoji:' ',specs:['Grade A','Silver','ANC'],vendor:'RenewTech HK',rating:4.5,reviews:62,badge:'used'},
 {id:14,name:'Apple Watch Series 9',cat:'watch',cond:'new',price:249,old:399,emoji:' ',specs:['45mm','GPS','Always-On'],vendor:'WearTech Direct',rating:4.7,reviews:198,badge:'new'},
 {id:15,name:'Apple Watch Ultra 2',cat:'watch',cond:'new',price:649,old:799,emoji:' ',specs:['49mm','Titanium','GPS+Cell'],vendor:'WearTech Direct',rating:4.9,reviews:87,badge:'hot'},
 {id:16,name:'iPhone 12 Bulk x10',cat:'iphone',cond:'used',price:1290,old:1990,emoji:' ',specs:['10 Units','Mixed','Grade A/B'],vendor:'GlobalApple Co.',rating:4.6,reviews:44,badge:'bulk'},
];
const SUPPLIERS = [
 {name:'ShenZhen TechSource',loc:'Shenzhen, China ',emoji:' ',verified:true,products:320,rating:4.9,ship:'3–5 days',tags:['iPhones','iPads','MacBooks'],synced:true,lastSync:'2 mins ago',syncCount:320},
 {name:'GlobalApple Co.',loc:'Guangzhou, China ',emoji:' ',verified:true,products:185,rating:4.7,ship:'4–7 days',tags:['iPhones','Wholesale','Bulk'],synced:true,lastSync:'15 mins ago',syncCount:185},
 {name:'RenewTech HK',loc:'Hong Kong ',emoji:' ',verified:true,products:210,rating:4.6,ship:'5–8 days',tags:['Pre-Owned','Refurbished'],synced:true,lastSync:'1 hr ago',syncCount:210},
 {name:'MacWorld Direct',loc:'Beijing, China ',emoji:' ',verified:true,products:90,rating:4.8,ship:'4–6 days',tags:['MacBooks','Mac mini'],synced:false,lastSync:'Pending',syncCount:0},
 {name:'TabletHub CN',loc:'Dongguan, China ',emoji:' ',verified:true,products:140,rating:4.5,ship:'5–9 days',tags:['iPads','Accessories'],synced:true,lastSync:'3 hrs ago',syncCount:138},
 {name:'SoundTech Wholesale',loc:'Shanghai, China ',emoji:' ',verified:true,products:75,rating:4.7,ship:'3–5 days',tags:['AirPods','HomePod'],synced:true,lastSync:'30 mins ago',syncCount:75},
];
const RATES = {USD:1,GBP:0.79,EUR:0.92,GHS:15.2,NGN:1560,AED:3.67,CAD:1.36,AUD:1.54,ZAR:18.6,INR:83.1};
const SYMS = {USD:'$',GBP:'£',EUR:'€',GHS:'₵',NGN:'₦',AED:'AED ',CAD:'CA$',AUD:'A$',ZAR:'R',INR:'₹'};
const HERO_CYCLE = [
 {emoji:' ',name:'iPhone 15 Pro',old:'$999',price:'$549'},
 {emoji:' ',name:'MacBook Air M2',old:'$1,199',price:'$799'},
 {emoji:' ',name:'AirPods Pro 2',old:'$249',price:'$149'},
 {emoji:' ',name:'Apple Watch Ultra',old:'$799',price:'$649'},
];
// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
 const [currency, setCurrency] = useState('USD');
 const [cart, setCart] = useState([]);
 const [drawerOpen, setDrawerOpen] = useState(false);
 const [checkoutOpen, setCheckoutOpen] = useState(false);
 const [orderPlaced, setOrderPlaced] = useState(false);
 const [orderNum, setOrderNum] = useState('');
 const [toast, setToast] = useState({msg:'',on:false});
 const [catFilter, setCatFilter] = useState('all');
 const [condFilter, setCondFilter] = useState('all');
 const [priceFilter, setPriceFilter] = useState('all');
 const [search, setSearch] = useState('');
 const [sortVal, setSortVal] = useState('default');
 const [payTab, setPayTab] = useState('card');
 const [heroIdx, setHeroIdx] = useState(0);
 const [heroFade, setHeroFade] = useState(true);
 const [calcResult, setCalcResult] = useState(null);
 const [destCountry, setDestCountry] = useState('');
 const [carrier, setCarrier] = useState('dhl');
 const [itemQty, setItemQty] = useState(1);
 const [prodCat, setProdCat] = useState('phone');
 const [activePayMethod, setActivePayMethod] = useState(null);
 const [syncingSupplier, setSyncingSupplier] = useState(null);
 const [page, setPage] = useState('home');
 const [products, setProducts] = useState(PRODUCTS);
 const [productsLoading, setProductsLoading] = useState(false);
 const [checkoutForm, setCheckoutForm] = useState({firstName:'',lastName:'',email:'',address:'',country:'',phone:''});
 const fmtP = useCallback((usd) => {
 const r = RATES[currency]; const s = SYMS[currency];
 return s + (usd*r).toLocaleString('en-US',{maximumFractionDigits:0});
 },[currency]);
 const showToast = useCallback((msg) => {
 setToast({msg,on:true});
 setTimeout(()=>setToast(t=>({...t,on:false})),2800);
 },[]);
 // Fetch products from backend API
 useEffect(()=>{
 setProductsLoading(true);
 fetch(`${API}/products`)
 .then(r=>r.json())
 .then(data=>{
 if(data.products?.length){
 const normalized = data.products.map(p=>({...p,id:p._id,cat:p.category,cond:p.condition}));
 setProducts(normalized);
 }
 })
 .catch(()=>console.log('Using local data'))
 .finally(()=>setProductsLoading(false));
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);
 // Hero cycle
 useEffect(()=>{
 const id = setInterval(()=>{
 setHeroFade(false);
 setTimeout(()=>{setHeroIdx(i=>(i+1)%HERO_CYCLE.length);setHeroFade(true);},300);
 },3200);
 return ()=>clearInterval(id);
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);
 // Cart helpers
 const addToCart = (product, e) => {
 e?.stopPropagation();
 setCart(c=>{
 const ex = c.find(x=>x.id===product.id);
 if(ex) return c.map(x=>x.id===product.id?{...x,qty:x.qty+1}:x);
 return [...c,{...product,qty:1}];
 });
 showToast(` ${product.name} added to cart!`);
 };
 const changeQty = (id,d) => setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(0,x.qty+d)}:x).filter(x=>x.qty>0));
 const removeItem = (id) => setCart(c=>c.filter(x=>x.id!==id));
 const cartCount = cart.reduce((s,i)=>s+i.qty,0);
 const cartTotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
 // Products filter
 const filteredProducts = (() => {
 let list = [...products];
 if(catFilter!=='all') list=list.filter(p=>p.cat===catFilter);
 if(condFilter!=='all') list=list.filter(p=>p.cond===condFilter);
 if(priceFilter==='0-200') list=list.filter(p=>p.price<200);
 else if(priceFilter==='200-500') list=list.filter(p=>p.price>=200&&p.price<500);
 else if(priceFilter==='500-800') list=list.filter(p=>p.price>=500&&p.price<800);
 else if(priceFilter==='800+') list=list.filter(p=>p.price>=800);
 if(search) list=list.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.vendor.toLowerCase().includes(search.toLowerCase()));
 if(sortVal==='price-asc') list.sort((a,b)=>a.price-b.price);
 else if(sortVal==='price-desc') list.sort((a,b)=>b.price-a.price);
 else if(sortVal==='rating') list.sort((a,b)=>b.rating-a.rating);
 return list;
 })();
 // Shipping calc
 const calcShipping = () => {
 if(!destCountry){showToast(' Select a destination country');return;}
 const wt = {phone:0.2,laptop:1.5,tablet:0.6,small:0.1}[prodCat]*itemQty;
 const br = {dhl:{base:18,pkg:8,time:'3–7 days',name:'DHL Express'},fedex:{base:15,pkg:6.5,time:'5–10 days',name:'FedEx Intl.'},epacket:{base:4,pkg:2,time:'10–20 days',name:'ePacket'}}[carrier];
 const zm = {US:1,GB:1.1,GH:1.3,NG:1.3,CA:1.05,AU:1.2,DE:1.1,AE:1.15,ZA:1.35,IN:1.25,SG:1.2,BR:1.4,KE:1.35,FR:1.1,JP:1.2}[destCountry]||1.2;
 const ship=(br.base+wt*br.pkg)*zm; const ins=ship*0.05+2;
 setCalcResult({carrier:br.name,time:br.time,ship,ins,total:ship+ins});
 };
 // Supplier sync
 const syncSupplier = (name) => {
 setSyncingSupplier(name);
 setTimeout(()=>{setSyncingSupplier(null);showToast(` ${name} synced — products updated!`);},2200);
 };
 // Save order to DB then open Paystack checkout
 const placeOrder = async () => {
 if(!checkoutForm.email){ showToast(' Please enter your email'); return; }
 try {
 // 1. Save order to MongoDB first
 const orderData = {
 customer: checkoutForm,
 items: cart.map(i=>({product:i._id||i.id,name:i.name,price:i.price,qty:i.qty,emoji:i.emoji})),
 subtotal: cartTotal, shippingCost: 0, total: cartTotal,
 currency, paymentMethod: 'paystack',
 };
 const res = await fetch(`${API}/orders`, {
 method:'POST', headers:{'Content-Type':'application/json'},
 body: JSON.stringify(orderData),
 });
 const data = await res.json();
 const savedOrderId = data.order?._id;
 const savedOrderNum = data.orderNumber || `BNS-${Math.floor(100000+Math.random()*900000)}`;
 // 2. Open Paystack popup
 const PaystackPop = (await import('@paystack/inline-js')).default;
 const popup = new PaystackPop();
 popup.newTransaction({
 key: PAYSTACK_PUBLIC_KEY,
 email: checkoutForm.email,
 amount: Math.round(cartTotal * RATES['GHS'] * 100),
 currency: 'GHS',
 ref: savedOrderNum,
 metadata: { orderId: savedOrderId, customerName: `${checkoutForm.firstName} ${checkoutForm.lastName}` },
 channels: ['card', 'mobile_money', 'bank', 'ussd'],
 onSuccess: async (transaction) => {
 // Verify payment on backend
 await fetch(`${API}/payments/paystack/verify/${transaction.reference}`);
 setOrderNum(savedOrderNum);
 setOrderPlaced(true);
 setCart([]);
 showToast(' Payment successful! Order confirmed!');
 },
 onCancel: () => {
 showToast(' Payment cancelled. Your order is saved — try again.');
 },
 });
 } catch(err) {
 // Fallback if API down
 setOrderNum(`BNS-${Math.floor(100000+Math.random()*900000)}`);
 setOrderPlaced(true);
 setCart([]);
 showToast('Order placed! Payment will be processed shortly.');
 }
 };
 const navLinks = [{k:'home',l:'Home'},{k:'shop',l:'Shop'},{k:'suppliers',l:'Suppliers'},{k:'shipping',l:'Shipping'},{k:'payments',l:'Payments'}];
 const h = HERO_CYCLE[heroIdx];
 return (
 <>
 <style>{css}</style>
 {/* NAV */}
 <nav className="nav">
 <div className="nav-logo" onClick={()=>setPage('home')}>
 <div className="logo-mark">B</div>
 <div className="logo-text">BigName's <span>Stores</span></div>
 </div>
 <div className="nav-links">
 {navLinks.map(n=>(
 <button key={n.k} className={`nav-link${page===n.k?' active':''}`} onClick={()=>setPage(n.k)}>{n.l}</button>
 ))}
 </div>
 <div className="nav-right">
 <button className="nav-cart" onClick={()=>setDrawerOpen(true)}>
 Cart <div className="cart-dot">{cartCount}</div>
 </button>
 <button className="btn-gold" onClick={()=>setPage('shop')}>Shop Now →</button>
 </div>
 </nav>
 {/* HERO */}
 {page==='home'&&(
 <section className="hero">
 <div className="hero-grid"/>
 <div className="hero-glow"/><div className="hero-glow2"/>
 <div className="hero-inner">
 <div>
 <div className="hero-pill"><div className="hero-pill-dot"/>&nbsp;Worldwide Shipping Available</div>
 <h1>Premium Apple<br/>Products at<br/><em>Affordable Prices</em></h1>
 <p>Brand new & certified pre-owned iPhones, MacBooks, iPads & more — sourced directly from verified Chinese wholesalers and shipped to your door.</p>
 <div className="hero-btns">
 <button className="btn-gold" onClick={()=>setPage('shop')}>Browse Products →</button>
 <button className="btn-outline" onClick={()=>setPage('suppliers')}>View Suppliers</button>
 </div>
 <div className="hero-stats">
 {[['500+','Products'],['40+','Vendors'],['150+','Countries']].map(([n,l])=>(
 <div key={l} className="hstat"><div className="hstat-n">{n}</div><div className="hstat-l">{l}</div></div>
 ))}
 </div>
 </div>
 <div className="hero-visual">
 <div className="device-frame">
 <div className="device-notch"/>
 <div className="device-product" style={{opacity:heroFade?1:0,transition:'opacity .3s'}}>
 <span className="dp-emoji">{h.emoji}</span>
 <div className="dp-name">{h.name}</div>
 <div className="dp-old">{h.old}</div>
 <div className="dp-price">{h.price}</div>
 </div>
 </div>
 <div className="fbadge fbadge-1"> 45% OFF</div>
 <div className="fbadge fbadge-2"> Free Ship</div>
 </div>
 </div>
 </section>
 )}
 {/* FEATURES STRIP — always visible */}
 {page==='home'&&(
 <div className="fstrip">
 <div className="fstrip-inner">
 {[[' ','Verified Vendors','Audited & certified'],[' ','Worldwide Shipping','150+ countries'],[' ','Secure Checkout','256-bit SSL'],[' ','14-Day Returns','Hassle-free'],[' ','Bulk Orders','Reseller discounts']].map(([ic,t,s])=>(
 <div key={t} className="fstrip-item">{ic} <div><b>{t}</b> <span>— {s}</span></div></div>
 ))}
 </div>
 </div>
 )}
 {/* CURRENCY BAR */}
 {(page==='home'||page==='shop')&&(
 <div className="cbar">
 <div className="cbar-inner">
 <span className="cbar-label"> Currency:</span>
 <select className="cbar-select" value={currency} onChange={e=>setCurrency(e.target.value)}>
 {Object.keys(RATES).map(c=><option key={c} value={c}>{c}</option>)}
 </select>
 <span className="cbar-rate">1 USD = {RATES[currency].toFixed(2)} {currency}</span>
 <div className="cbar-prices">
 {[['iPhone 15',549],['MacBook Air',799],['AirPods Pro',149]].map(([n,p])=>(
 <div key={n} className="cbar-price">{n}: <b>{fmtP(p)}</b></div>
 ))}
 </div>
 </div>
 </div>
 )}
 {/* SHOP PAGE */}
 {(page==='shop'||page==='home')&&(
 <>
 <div className="filter-bar">
 <div className="filter-inner">
 <div className="fsearch">
 <span className="fsearch-icon"> </span>
 <input placeholder="Search products, vendors..." value={search} onChange={e=>setSearch(e.target.value)}/>
 </div>
 {['all','iphone','mac','ipad','audio','watch'].map(c=>(
 <button key={c} className={`fcat-btn${catFilter===c?' on':''}`} onClick={()=>setCatFilter(c)}>
 {c==='all'?'All':c==='iphone'?'iPhones':c==='mac'?'Mac':c==='ipad'?'iPad':c==='audio'?'Audio':'Watch'}
 </button>
 ))}
 <select className="fselect" value={condFilter} onChange={e=>setCondFilter(e.target.value)}>
 <option value="all">All Conditions</option>
 <option value="new">Brand New</option>
 <option value="used">Pre-Owned</option>
 </select>
 <select className="fselect" value={priceFilter} onChange={e=>setPriceFilter(e.target.value)}>
 <option value="all">Any Price</option>
 <option value="0-200">Under $200</option>
 <option value="200-500">$200–$500</option>
 <option value="500-800">$500–$800</option>
 <option value="800+">$800+</option>
 </select>
 </div>
 </div>
 <div className="pgrid-wrap">
 <div className="pgrid-head">
 <div className="pgrid-count">{productsLoading ? "Loading products..." : <><b>{filteredProducts.length}</b> products found</>}</div>
 <select className="fselect" value={sortVal} onChange={e=>setSortVal(e.target.value)}>
 <option value="default">Featured</option>
 <option value="price-asc">Price: Low → High</option>
 <option value="price-desc">Price: High → Low</option>
 <option value="rating">Best Rated</option>
 </select>
 </div>
 <div className="pgrid">
 {filteredProducts.length===0&&(
 <div style={{gridColumn:'1/-1',textAlign:'center',padding:'60px',color:'var(--slate)'}}>No products match your filters.</div>
 )}
 {filteredProducts.map(p=>(
 <div key={p.id} className="pcard">
 <div className={`pcard-badge pb-${p.badge}`}>
 {p.badge==='hot'?' Hot':p.badge==='new'?'✦ New':p.badge==='used'?'♻ Used':' Bulk'}
 </div>
 <div className="pcard-img">{p.emoji}</div>
 <div className="pcard-body">
 <div className="pcard-vendor">{p.vendor}</div>
 <div className="pcard-name">{p.name}</div>
 <div className="pcard-rating">
 <span className="stars">{'★'.repeat(Math.floor(p.rating))}{'☆'.repeat(5-Math.floor(p.rating))}</span>
 {p.rating} ({p.reviews})
 </div>
 <div className="pcard-specs">{p.specs.map(s=><span key={s} className="spec">{s}</span>)}</div>
 <div className="pcard-foot">
 <div className="pcard-pricing">
 <div className="pcard-old">{p.old ? fmtP(p.old) : ''}</div>
 <div className="pcard-price">{fmtP(p.price)}</div>
<div className="pcard-save">{p.old && p.price ? 'Save ' + Math.round((1-p.price/p.old)*100) + '%' : ''}</div>
 </div>
 <button className="add-btn" onClick={e=>addToCart(p,e)} title="Add to cart">+</button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </>
 )}
 {/* PAYMENTS PAGE */}
 {(page==='payments'||page==='home')&&(
 <div className="pay-section">
 <div className="pay-inner">
 <div className="pay-info">
 <div className="sec-eyebrow" style={{color:'var(--gold2)'}}>Secure Checkout</div>
 <h2 style={{color:'white',fontFamily:"'Clash Display',sans-serif",fontSize:'34px',fontWeight:'700',marginBottom:'14px'}}>
 4 Ways to Pay
 </h2>
 <p>Pay securely with your preferred method — from international cards to Ghanaian Mobile Money. All transactions are encrypted and protected.</p>
 <div className="pay-methods-grid">
 {[
 {icon:' ',name:'Stripe',desc:'Visa, Mastercard, Amex worldwide',badge:'International'},
 {icon:' ',name:'PayPal',desc:'Pay with your PayPal balance or card',badge:'Global Wallet'},
 {icon:' ',name:'Flutterwave',desc:'Africa cards, bank transfer, USSD',badge:'Africa-Ready'},
 {icon:' ',name:'Mobile Money',desc:'MTN MoMo & Vodafone Cash (GH)',badge:'Ghana Local'},
 ].map(m=>(
 <div key={m.name} className={`pay-method-card${activePayMethod===m.name?' active':''}`} onClick={()=>setActivePayMethod(m.name)}>
 <div className="pmc-icon">{m.icon}</div>
 <div className="pmc-name">{m.name}</div>
 <div className="pmc-desc">{m.desc}</div>
 <div className="pmc-badge">{m.badge}</div>
 </div>
 ))}
 </div>
 </div>
 <div className="pay-demo-card">
 <div className="pdc-title"> Payment Demo</div>
 <div className="pdc-tabs">
 {[['card',' Card'],['paypal',' PayPal'],['flutterwave',' Flutterwave'],['momo',' MoMo']].map(([k,l])=>(
 <button key={k} className={`pdc-tab${payTab===k?' active':''}`} onClick={()=>setPayTab(k)}>{l}</button>
 ))}
 </div>
 {payTab==='card'&&(
 <div className="pdc-form">
 <label className="pdc-label">Card Number</label>
 <input className="pdc-input" placeholder="4242 4242 4242 4242"/>
 <div className="pdc-row">
 <div><label className="pdc-label">Expiry</label><input className="pdc-input" placeholder="MM/YY"/></div>
 <div><label className="pdc-label">CVV</label><input className="pdc-input" placeholder="123"/></div>
 </div>
 <label className="pdc-label">Name on Card</label>
 <input className="pdc-input" placeholder="John Doe"/>
 </div>
 )}
 {payTab==='paypal'&&(
 <div className="pdc-form">
 <label className="pdc-label">PayPal Email</label>
 <input className="pdc-input" placeholder="you@paypal.com"/>
 <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'var(--r8)',padding:'14px',marginBottom:'14px',color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>
 You will be redirected to PayPal to complete your payment securely.
 </div>
 </div>
 )}
 {payTab==='flutterwave'&&(
 <div className="pdc-form">
 <label className="pdc-label">Payment Method</label>
 <select className="pdc-input" style={{background:'rgba(255,255,255,0.07)',color:'white'}}>
 <option style={{background:'#0F1C30'}}>Card Payment</option>
 <option style={{background:'#0F1C30'}}>Bank Transfer</option>
 <option style={{background:'#0F1C30'}}>USSD</option>
 <option style={{background:'#0F1C30'}}>M-Pesa</option>
 </select>
 <label className="pdc-label">Phone / Account</label>
 <input className="pdc-input" placeholder="+233 XX XXX XXXX"/>
 </div>
 )}
 {payTab==='momo'&&(
 <div className="pdc-form">
 <label className="pdc-label">Network</label>
 <select className="pdc-input" style={{background:'rgba(255,255,255,0.07)',color:'white'}}>
 <option style={{background:'#0F1C30'}}>MTN Mobile Money</option>
 <option style={{background:'#0F1C30'}}>Vodafone Cash</option>
 <option style={{background:'#0F1C30'}}>AirtelTigo Money</option>
 </select>
 <label className="pdc-label">MoMo Number</label>
 <input className="pdc-input" placeholder="024 XXX XXXX"/>
 <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'var(--r8)',padding:'12px',fontSize:'12px',color:'rgba(255,255,255,0.4)',marginBottom:'14px'}}>
 You'll receive a USSD prompt on your phone to approve payment.
 </div>
 </div>
 )}
 <div className="pdc-summary">
 <div className="pdc-sum-row"><span className="pdc-sum-label">Sample Order</span><span className="pdc-sum-val">iPhone 15 Pro x1</span></div>
 <div className="pdc-sum-row"><span className="pdc-sum-label">Subtotal</span><span className="pdc-sum-val">{fmtP(649)}</span></div>
 <div className="pdc-sum-row"><span className="pdc-sum-label">Shipping</span><span className="pdc-sum-val">{fmtP(22)}</span></div>
 <div className="pdc-sum-row total"><span className="pdc-sum-label" style={{color:'white'}}>Total</span><span className="pdc-sum-val">{fmtP(671)}</span></div>
 </div>
 <button className="btn-gold" style={{width:'100%',justifyContent:'center'}} onClick={()=>showToast(' This is a demo — connect your payment keys to go live!')}>
 Pay {fmtP(671)} →
 </button>
 <div style={{textAlign:'center',fontSize:'11px',color:'rgba(255,255,255,0.3)',marginTop:'10px'}}>
 Powered by Stripe · PayPal · Flutterwave
 </div>
 </div>
 </div>
 </div>
 )}
 {/* SUPPLIERS PAGE */}
 {(page==='suppliers'||page==='home')&&(
 <div className="sup-section">
 <div className="sup-inner">
 <div className="sec-eyebrow">API-Synced Partners</div>
 <div className="sec-title">Supplier Directory</div>
 <div className="sec-sub">All vendors are verified, trade-assurance certified, and auto-synced via API. Products update in real time.</div>
 <div className="sup-sync-bar">
 <div className="ssb-dot"/>
 <div className="ssb-text"><b>API Sync Active</b> — Products auto-updating from Alibaba & DHgate feeds</div>
 <div className="ssb-count">6 Active Suppliers</div>
 <button className="btn-gold" style={{padding:'8px 16px',fontSize:'13px'}} onClick={()=>showToast(' Full sync triggered for all suppliers!')}>Sync All</button>
 </div>
 <div className="sup-grid">
 {SUPPLIERS.map(s=>(
 <div key={s.name} className="scard">
 <div className="scard-top">
 <div className="scard-avatar">{s.emoji}</div>
 <div className="scard-meta">
 <div className="scard-name">{s.name}</div>
 <div className="scard-loc">{s.loc}</div>
 </div>
 <div>
 {s.verified&&<div className="scard-verified">✓ Verified</div>}
 <div className="scard-api">API</div>
 </div>
 </div>
 <div className="scard-stats">
 <div className="ss"><div className="ss-n">{s.products}</div><div className="ss-l">Products</div></div>
 <div className="ss"><div className="ss-n">{s.rating}★</div><div className="ss-l">Rating</div></div>
 <div className="ss"><div className="ss-n">{s.ship}</div><div className="ss-l">Ships In</div></div>
 </div>
 <div className="scard-tags">{s.tags.map(t=><span key={t} className="stag">{t}</span>)}</div>
 <div className="scard-sync">
 <div className="sync-status">
 <div className={`sync-dot ${s.synced?'green':'orange'}`}/>
 {s.synced?`Last sync: ${s.lastSync}`:'Not yet synced'}
 </div>
 <span style={{fontSize:'12px',color:'var(--slate)'}}>{s.syncCount} items</span>
 </div>
 <div className="scard-btns">
 <button className="sbtn-primary" onClick={()=>syncSupplier(s.name)} disabled={syncingSupplier===s.name}>
 {syncingSupplier===s.name?'Syncing...':' Sync Now'}
 </button>
 <button className="sbtn-sec" onClick={()=>showToast(` Viewing ${s.name} catalogue`)}>View Products</button>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 )}
 {/* SHIPPING PAGE */}
 {(page==='shipping'||page==='home')&&(
 <div className="ship-section">
 <div className="ship-inner">
 <div className="ship-left">
 <div className="sec-eyebrow" style={{color:'var(--gold2)'}}>Worldwide Delivery</div>
 <h2>Fast & Reliable<br/>Shipping Worldwide</h2>
 <p>We ship to over 150 countries using trusted global carriers. Get an instant estimate — enter your destination and product details below.</p>
 <div className="carrier-grid">
 {[[' DHL Express','3–7 days','Premium'],[' FedEx Intl.','5–10 days','Business'],[' ePacket','10–20 days','Budget'],[' Local Courier','1–3 days','Africa/MENA']].map(([n,t,ty])=>(
 <div key={n} className="carrier-card">
 <div className="cc-name">{n}</div>
 <div className="cc-time">{t}</div>
 <div className="cc-type">{ty}</div>
 </div>
 ))}
 </div>
 </div>
 <div className="calc-box">
 <div className="calc-title"> Shipping Calculator</div>
 <label className="calc-label">Destination Country</label>
 <select className="calc-select" value={destCountry} onChange={e=>setDestCountry(e.target.value)}>
 <option value="">-- Select Country --</option>
 {[['US',' United States'],['GB',' United Kingdom'],['GH',' Ghana'],['NG',' Nigeria'],['CA',' Canada'],['AU',' Australia'],['DE',' Germany'],['AE',' UAE'],['ZA',' South Africa'],['IN',' India'],['SG',' Singapore'],['BR',' Brazil'],['KE',' Kenya'],['FR',' France'],['JP',' Japan']].map(([v,l])=>(
 <option key={v} value={v}>{l}</option>
 ))}
 </select>
 <label className="calc-label">Carrier</label>
 <select className="calc-select" value={carrier} onChange={e=>setCarrier(e.target.value)}>
 <option value="dhl">DHL Express (Fastest)</option>
 <option value="fedex">FedEx International</option>
 <option value="epacket">ePacket (Budget)</option>
 </select>
 <label className="calc-label">Number of Items</label>
 <input type="number" className="calc-input" value={itemQty} min={1} max={100} onChange={e=>setItemQty(parseInt(e.target.value)||1)}/>
 <label className="calc-label">Product Type</label>
 <select className="calc-select" value={prodCat} onChange={e=>setProdCat(e.target.value)}>
 <option value="phone">iPhone / Smartphone</option>
 <option value="laptop">MacBook / Laptop</option>
 <option value="tablet">iPad / Tablet</option>
 <option value="small">AirPods / Accessory</option>
 </select>
 <button className="btn-gold" style={{width:'100%',justifyContent:'center'}} onClick={calcShipping}>Calculate Shipping </button>
 {calcResult&&(
 <div className="calc-result-box">
 {[['Carrier',calcResult.carrier],['Est. Transit',calcResult.time],['Shipping Cost',fmtP(calcResult.ship)],['Insurance',fmtP(calcResult.ins)],['Total',fmtP(calcResult.total)]].map(([l,v],i)=>(
 <div key={l} className="crb-row"><span className="crb-l">{l}</span><span className="crb-v">{v}</span></div>
 ))}
 </div>
 )}
 </div>
 </div>
 </div>
 )}
 {/* FOOTER */}
 <footer>
 <div className="footer-grid">
 <div>
 <div className="nav-logo" style={{marginBottom:'12px'}}>
 <div className="logo-mark">B</div>
 <div className="logo-text">BigName's <span>Stores</span></div>
 </div>
 <div className="footer-desc">Your trusted global marketplace for affordable Apple products. Sourced from verified Chinese wholesalers, shipped worldwide.</div>
 <div className="footer-socials">
 {[' ',' ',' ',' '].map((i,idx)=><div key={idx} className="social" onClick={()=>showToast(' Social link coming soon!')}>{i}</div>)}
 </div>
 </div>
 {[['Shop',['iPhones','MacBooks','iPads','Apple Watch','AirPods','Accessories']],
 ['Business',['Bulk Orders','Reseller Program','Supplier Directory','Affiliate Program']],
 ['Support',['Track Order','Returns','Shipping Info','Contact Us','FAQ']]].map(([h,ls])=>(
 <div key={h}>
 <div className="fh">{h}</div>
 <ul className="fl">{ls.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
 </div>
 ))}
 </div>
 <div className="footer-bottom">
 <span style={{fontSize:'13px'}}>© 2025 BigName's Stores. All rights reserved.</span>
 <div className="footer-badges">
 {[' SSL Secured',' Trade Assurance',' Global Shipping',' 4 Payment Methods'].map(b=>(
 <span key={b} className="fbadge-s">{b}</span>
 ))}
 </div>
 </div>
 </footer>
 {/* CART DRAWER */}
 <div className={`overlay${drawerOpen?' on':''}`} onClick={()=>setDrawerOpen(false)}/>
 <div className={`drawer${drawerOpen?' on':''}`}>
 <div className="drawer-head">
 <div className="drawer-title"> Your Cart ({cartCount})</div>
 <button className="drawer-close" onClick={()=>setDrawerOpen(false)}>✕</button>
 </div>
 <div className="drawer-body">
 {cart.length===0?(
 <div className="drawer-empty"><div style={{fontSize:'44px',marginBottom:'12px'}}> </div>Your cart is empty.<br/>Start shopping above!</div>
 ):(
 cart.map(item=>(
 <div key={item.id} className="cart-item">
 <div className="ci-img">{item.emoji}</div>
 <div className="ci-info">
 <div className="ci-name">{item.name}</div>
 <div className="ci-price">{fmtP(item.price)}</div>
 <div className="ci-controls">
 <button className="qty-btn" onClick={()=>changeQty(item.id,-1)}>−</button>
 <span className="qty-n">{item.qty}</span>
 <button className="qty-btn" onClick={()=>changeQty(item.id,1)}>+</button>
 <button className="ci-del" onClick={()=>removeItem(item.id)}> </button>
 </div>
 </div>
 </div>
 ))
 )}
 </div>
 {cart.length>0&&(
 <div className="drawer-foot">
 <div className="df-row"><span>Subtotal</span><span>{fmtP(cartTotal)}</span></div>
 <div className="df-row"><span>Shipping</span><span style={{color:'var(--green)'}}>At checkout</span></div>
 <div className="df-total"><span>Total</span><span>{fmtP(cartTotal)}</span></div>
 <button className="btn-checkout" onClick={()=>{setDrawerOpen(false);setCheckoutOpen(true);}}>Proceed to Checkout →</button>
 <div className="btn-checkout-note"> Stripe · PayPal · Flutterwave · MoMo</div>
 </div>
 )}
 </div>
 {/* CHECKOUT MODAL */}
 {checkoutOpen&&(
 <div className="modal-overlay" onClick={e=>{if(e.target.classList.contains('modal-overlay'))setCheckoutOpen(false)}}>
 <div className="modal">
 <div className="modal-head">
 <div className="modal-title">{orderPlaced?' Order Confirmed!':' Secure Checkout'}</div>
 <button className="drawer-close" onClick={()=>{setCheckoutOpen(false);setOrderPlaced(false);}}>✕</button>
 </div>
 {!orderPlaced?(
 <>
 <div className="modal-body">
 <div className="mi-row" style={{marginBottom:'14px'}}>
 <div><label className="ml">First Name</label><input className="mi" placeholder="John" value={checkoutForm.firstName} onChange={e=>setCheckoutForm(f=>({...f,firstName:e.target.value}))}/></div>
 <div><label className="ml">Last Name</label><input className="mi" placeholder="Doe" value={checkoutForm.lastName} onChange={e=>setCheckoutForm(f=>({...f,lastName:e.target.value}))}/></div>
 </div>
 <label className="ml">Email</label>
 <input className="mi" placeholder="you@email.com" type="email" value={checkoutForm.email} onChange={e=>setCheckoutForm(f=>({...f,email:e.target.value}))}/>
 <label className="ml">Shipping Address</label>
 <input className="mi" placeholder="123 Main St, City, Country" value={checkoutForm.address} onChange={e=>setCheckoutForm(f=>({...f,address:e.target.value}))}/>
 <div className="mi-row">
 <div><label className="ml">Country</label><input className="mi" placeholder="Ghana" value={checkoutForm.country} onChange={e=>setCheckoutForm(f=>({...f,country:e.target.value}))}/></div>
 <div><label className="ml">Phone</label><input className="mi" placeholder="+233..." value={checkoutForm.phone} onChange={e=>setCheckoutForm(f=>({...f,phone:e.target.value}))}/></div>
 </div>
 <div className="ml" style={{marginBottom:'8px'}}>Payment Method</div>
 <div className="pay-tabs">
 {[['card',' Card'],['paypal',' PayPal'],['flutterwave',' Flutterwave'],['momo',' MoMo']].map(([k,l])=>(
 <button key={k} className={`pt${payTab===k?' on':''}`} onClick={()=>setPayTab(k)}>{l}</button>
 ))}
 </div>
 {payTab==='card'&&<><input className="mi" placeholder="Card number"/><div className="mi-row"><input className="mi" placeholder="MM/YY"/><input className="mi" placeholder="CVV"/></div></>}
 {payTab==='paypal'&&<input className="mi" placeholder="PayPal email"/>}
 {payTab==='flutterwave'&&<input className="mi" placeholder="Phone / Account number"/>}
 {payTab==='momo'&&<input className="mi" placeholder="MoMo number (024 XXX XXXX)"/>}
 <div className="order-mini">
 <div style={{fontWeight:700,marginBottom:'8px',fontSize:'13px'}}>Order Summary</div>
 {cart.map(i=>(
 <div key={i.id} className="om-row"><span>{i.name} x{i.qty}</span><span>{fmtP(i.price*i.qty)}</span></div>
 ))}
 <div className="om-total"><span>Total</span><span>{fmtP(cartTotal)}</span></div>
 </div>
 </div>
 <div className="modal-foot">
 <button className="btn-checkout" onClick={placeOrder}> Pay with Paystack — {fmtP(cartTotal)} →</button>
 </div>
 </>
 ):(
 <div className="modal-body">
 <div className="success-box">
 <div className="success-ico"> </div>
 <div className="success-title">Order Placed!</div>
 <div className="success-sub">Thank you for shopping at BigName's Stores.<br/>A confirmation email with tracking details will be sent within 24 hours.</div>
 <div className="order-num">Order #{orderNum} · Estimated delivery: 7–14 business days</div>
 <button className="btn-gold" style={{marginTop:'20px'}} onClick={()=>{setCheckoutOpen(false);setOrderPlaced(false);}}>Continue Shopping →</button>
 </div>
 </div>
 )}
 </div>
 </div>
 )}
 {/* TOAST */}
 <div className={`toast${toast.on?' on':''}`}>{toast.msg}</div>
 </>
 );
}