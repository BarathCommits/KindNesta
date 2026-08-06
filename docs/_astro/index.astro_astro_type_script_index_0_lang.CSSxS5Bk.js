var e=document.getElementById(`catalog`),t=document.getElementById(`empty`),n=document.getElementById(`result-count`),r=document.getElementById(`filter-chips`),i=document.getElementById(`category`),a=document.getElementById(`score-band`),o=document.getElementById(`sort`),s=document.getElementById(`catalog-data`);if(!(!e||!i||!a||!o||!s)){let c=JSON.parse(s.textContent||`[]`),l={high:`Strong · 80–100`,mid:`Good · 50–79`,low:`Fair · 0–49`};function u(e){return e>=80?`high`:e>=50?`mid`:`low`}function d(e){let t=u(e);return t===`high`?`Strong`:t===`mid`?`Good`:`Fair`}function f(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}function p(e){let t=u(e.kindnessScore),n=d(e.kindnessScore),r=f(e.title),i=f(e.shortDescription),a=!!e.scoreVerified,o=a?`Verified`:`Provisional`,s=a?``:` · Prov.`,c=(e.bulletPoints||[]).map(e=>`<li>${f(e)}</li>`).join(``);return`
      <article class="product-card">
        <a class="product-card__link" href="${e.href}">
          <div class="product-card__media">
            <picture>
              <source srcset="${e.imageWebp}" type="image/webp" />
              <img src="${e.image}" alt="${r}" loading="lazy" decoding="async" width="640" height="800" />
            </picture>
          </div>
          <div class="product-card__body">
            <div class="product-card__meta">
              <span class="product-card__category">${f(e.subcategory||e.categoryLabel)}</span>
              <span class="kindness-badge kindness-badge--compact${a?``:` kindness-badge--provisional`}" data-band="${t}" title="Kindness Score ${e.kindnessScore} · ${n} · ${o} (KindNesta internal rating)">
                <span class="kindness-badge__ring" style="--pct: ${e.kindnessScore}"><span>${e.kindnessScore}</span></span>
                <span class="kindness-badge__text">${n}<span class="kindness-badge__status">${s}</span></span>
              </span>
            </div>
            ${e.brand?`<p class="product-card__brand">${f(e.brand)}</p>`:``}
            <h3>${r}</h3>
            <p>${i}</p>
            ${c?`<ul class="product-card__bullets">${c}</ul>`:``}
            <div class="product-card__footer">
              <span class="product-card__cue">View product</span>
            </div>
          </div>
        </a>
      </article>
    `}function m(){let e=new URLSearchParams;i.value!==`all`&&e.set(`category`,i.value),a.value!==`all`&&e.set(`score`,a.value),o.value!==`score-desc`&&e.set(`sort`,o.value);let t=e.toString(),n=t?`${window.location.pathname}?${t}`:window.location.pathname;window.history.replaceState({},``,n)}function h(){let e=[];if(i.value!==`all`){let t=i.options[i.selectedIndex].text;e.push({key:`category`,label:`Category: ${t}`})}if(a.value!==`all`&&e.push({key:`score`,label:`Score: ${l[a.value]}`}),!e.length){r.hidden=!0,r.innerHTML=``;return}r.hidden=!1,r.innerHTML=`
      <div class="filter-chips__list" role="list">
        ${e.map(e=>`
          <button type="button" class="filter-chip" data-clear="${e.key}" role="listitem">
            <span>${f(e.label)}</span>
            <span aria-hidden="true">×</span>
          </button>`).join(``)}
        <button type="button" class="filter-chip filter-chip--clear" data-clear="all">Clear all</button>
      </div>
    `}function g(){let r=i.value,s=a.value,l=o.value,d=c.filter(e=>!(r!==`all`&&e.category!==r||s!==`all`&&u(e.kindnessScore)!==s));d=[...d].sort((e,t)=>l===`score-desc`?t.kindnessScore-e.kindnessScore:l===`score-asc`?e.kindnessScore-t.kindnessScore:e.title.localeCompare(t.title)),e.innerHTML=d.map(p).join(``),t.hidden=d.length>0,n.textContent=`${d.length} product${d.length===1?``:`s`}`,h(),m()}i.addEventListener(`change`,g),a.addEventListener(`change`,g),o.addEventListener(`change`,g),r.addEventListener(`click`,e=>{let t=e.target.closest(`[data-clear]`);if(!t)return;let n=t.getAttribute(`data-clear`);(n===`category`||n===`all`)&&(i.value=`all`),(n===`score`||n===`all`)&&(a.value=`all`),n===`all`&&(o.value=`score-desc`),g()});let _=new URLSearchParams(window.location.search),v=_.get(`category`),y=_.get(`score`),b=_.get(`sort`);v&&[...i.options].some(e=>e.value===v)&&(i.value=v),y&&[...a.options].some(e=>e.value===y)&&(a.value=y),b&&[...o.options].some(e=>e.value===b)&&(o.value=b),(i.value!==`all`||a.value!==`all`||o.value!==`score-desc`)&&g()}