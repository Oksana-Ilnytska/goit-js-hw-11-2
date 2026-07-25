import{a as m,S as p,i as c}from"./assets/vendor-CaRFiM55.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const h="https://pixabay.com/api/",y="51926469-17331259ac3d6722fcf98d7c3";function g(s){return m.get(h,{params:{key:y,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data)}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),b=new p(".gallery a",{captionsData:"alt",captionDelay:250});function L(s){const r=s.map(({webformatURL:o,largeImageURL:n,tags:e,likes:t,views:i,comments:d,downloads:f})=>`
    <li class="gallery-item">
      <a href="${n}">
        <img src="${o}" alt="${e}" loading="lazy">
      </a>
      <div class="info">
        <p><b>Likes:</b><br>${t}</p>
        <p><b>Views:</b><br>${i}</p>
        <p><b>Comments:</b><br>${d}</p>
        <p><b>Downloads:</b><br>${f}</p>
      </div>
    </li>
  `).join("");l.insertAdjacentHTML("beforeend",r),b.refresh()}function S(){l.innerHTML=""}function v(){u.classList.remove("hidden")}function $(){u.classList.add("hidden")}const a=document.querySelector(".form"),q=a.querySelector('input[name="search-text"]');a.addEventListener("submit",s=>{s.preventDefault();const r=q.value.trim();r&&(S(),v(),g(r).then(o=>{if(!o.hits||o.hits.length===0){c.error({message:`Sorry, there are no images matching your search ${r}. Please try again!`,position:"topRight",timeout:5e3});return}L(o.hits)}).catch(o=>{c.error({message:o.message,position:"topRight",timeout:5e3,backgroundColor:"#EF4040",messageColor:"#FAFAFB",class:"error-toast"})}).finally(()=>{$(),a.reset()}))});
//# sourceMappingURL=index.js.map
