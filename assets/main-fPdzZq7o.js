(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const g="C6XjZHZY1fsf-sZFcE-d",h="https://the-one-api.dev/v2",a=document.querySelector(".characters_list-js"),l=document.querySelector(".loadMoreBtn-js");let i=1;function p(o=1){const t=new URLSearchParams({limit:20}),s={method:"GET",headers:{Authorization:`Bearer ${g}`}};return fetch(`${h}/character?${t}&page=${o}`,s).then(n=>{if(!n.ok)throw new Error(n.statusText);return n.json()})}p().then(o=>{console.log(o);const t=o.docs.map(s=>u(s)).join("");a.insertAdjacentHTML("beforeend",t),o.page!==o.pages&&(l.hidden=!1)}).catch(o=>console.log(o.message));const u=({_id:o,name:t,race:s,birth:n,death:e,hair:r,height:c,gender:d,spouse:f})=>`
  <li data-id="${o}">
    <h2>${t}</h2>
    <p><strong>Race:</strong> ${s}</p>
    ${n?`<p><strong>Birth:</strong> ${n}</p>`:""}
    ${e?`<p><strong>Death:</strong> ${e}</p>`:""}
    ${r?`<p><strong>Hair:</strong> ${r}</p>`:""}
    ${c?`<p><strong>Height:</strong> ${c}</p>`:""}
    <p><strong>Gender:</strong> ${d}</p>
    <p><strong>Spouse:</strong> ${f}</p>
  </li>
`;l.addEventListener("click",o=>{i+=1,p(i).then(t=>{console.log(t);const s=t.docs.map(n=>u(n)).join("");a.insertAdjacentHTML("beforeend",s)}).catch(t=>console.log(t.message))});
