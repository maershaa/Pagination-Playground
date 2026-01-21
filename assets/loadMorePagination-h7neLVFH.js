import"./style-jDmJTPYY.js";const g=({_id:t,name:r,race:s,birth:e,death:a,hair:c,height:i,gender:h,spouse:d})=>`
  <li data-id="${t}">
    <h2>${r}</h2>
    <p><strong>Race:</strong> ${s}</p>
    ${e?`<p><strong>Birth:</strong> ${e}</p>`:""}
    ${a?`<p><strong>Death:</strong> ${a}</p>`:""}
    ${c?`<p><strong>Hair:</strong> ${c}</p>`:""}
    ${i?`<p><strong>Height:</strong> ${i}</p>`:""}
    <p><strong>Gender:</strong> ${h}</p>
    ${d?`<p><strong>Spouse:</strong> ${d}</p>`:""}
  </li>
`,u="C6XjZHZY1fsf-sZFcE-d",$="https://the-one-api.dev/v2";async function f(t=1){const r=new URLSearchParams({limit:20,page:t}),s={method:"GET",headers:{Authorization:`Bearer ${u}`}},e=await fetch(`${$}/character?${r}`,s);if(!e.ok)throw new Error(e.statusText);return e.json()}const m=document.querySelector(".characters_list-js"),n=document.querySelector(".loadMoreBtn-js");function L(){n.classList.remove("is-hidden")}function B(){n.classList.add("is-hidden")}let o=1,l=null;async function p(){try{const t=await f(o);console.log("🚀 ~ renderCharacters ~ data:",t),l??=t.pages;const r=t.docs.map(s=>g(s)).join("");m.insertAdjacentHTML("beforeend",r),o<l?L():B()}catch(t){console.log(t.message)}}p();n.addEventListener("click",async()=>{n.disabled=!0,o+=1,await p(),n.disabled=!1});
