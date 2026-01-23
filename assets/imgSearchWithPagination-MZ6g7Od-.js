import"./style-CqgSiHNI.js";function y(e){const{id:a,webformatURL:t="#",largeImageURL:n="#",tags:r="No description",likes:m=0,views:h=0,comments:g=0,downloads:v=0}=e;return`<div class="photo-card" data-id=${a}>
  <img src="${t}" alt="${r}" loading="lazy" />
  <div class="info">
   <div class="info-item">
  <span class="label">Likes</span>
  <span class="value">${m}</span>
</div>

<div class="info-item">
  <span class="label">Views</span>
  <span class="value">${h}</span>
</div>

<div class="info-item">
  <span class="label">Comments</span>
  <span class="value">${g}</span>
</div>

<div class="info-item">
  <span class="label">Downloads</span>
  <span class="value">${v}</span>
</div>

  </div>
</div>`}const P="https://pixabay.com/api/",L="54316467-1c8c04d8c56deb65224177ffe";async function b(e,a){const t=new URLSearchParams({key:L,q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:42}),n=await fetch(`${P}?${t}`);if(!n.ok)throw new Error(n.statusText);return n.json()}const _=document.querySelector("#search-form"),u=document.querySelector(".gallery"),c=document.querySelector(".pagination-js"),$=40,A=100,i=10;let s=1,o=0,p="";_.addEventListener("submit",E);c.addEventListener("click",S);function E(e){e.preventDefault();const a=e.target.searchQuery.value.trim();if(a){if(a.length>A){alert("Это значение не может превышать 100 символов");return}p=a,s=1,l(),f(),d()}}async function d(){try{const e=await b(p,s),a=e.hits;if(!a.length){l(),f(),alert("Sorry, there are no images matching your search query. Please try again.");return}o=Math.ceil(e.totalHits/$);const t=a.map(n=>y(n));u.insertAdjacentHTML("beforeend",t.join("")),M(),console.log("currentPage:",s)}catch(e){console.log(e.message)}}function M(){let e="";const a=Math.floor(i/2);let t=s-a,n=s+a;t<1&&(t=1,n=Math.min(o,i)),n>o&&(n=o,t=Math.max(1,o-i+1));for(let r=t;r<=n;r+=1)e+=`
      <a href="#" class="${r===s?"active":""}">
        ${r}
      </a>
    `;c.innerHTML=e}function S(e){e.preventDefault();const a=e.target.closest("a");if(!a)return;const t=Number(a.textContent);t!==s&&(s=t,l(),d())}function l(){u.innerHTML=""}function f(){c.innerHTML=""}
