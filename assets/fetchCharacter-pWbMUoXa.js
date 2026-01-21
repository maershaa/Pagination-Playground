const h=({_id:r,name:s,race:n,birth:t,death:o,hair:e,height:a,gender:c,spouse:p})=>`
  <li data-id="${r}">
    <h2>${s}</h2>
    <p><strong>Race:</strong> ${n}</p>
    ${t?`<p><strong>Birth:</strong> ${t}</p>`:""}
    ${o?`<p><strong>Death:</strong> ${o}</p>`:""}
    ${e?`<p><strong>Hair:</strong> ${e}</p>`:""}
    ${a?`<p><strong>Height:</strong> ${a}</p>`:""}
    <p><strong>Gender:</strong> ${c}</p>
    ${p?`<p><strong>Spouse:</strong> ${p}</p>`:""}
  </li>
`,$="C6XjZHZY1fsf-sZFcE-d",g="https://the-one-api.dev/v2";async function i(r=1){const s=new URLSearchParams({limit:20,page:r}),n={method:"GET",headers:{Authorization:`Bearer ${$}`}},t=await fetch(`${g}/character?${s}`,n);if(!t.ok)throw new Error(t.statusText);return t.json()}export{h as c,i as f};
