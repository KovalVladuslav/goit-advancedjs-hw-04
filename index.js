import{a as w,S as b,i as f}from"./assets/vendor-C1o29VEW.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const L="https://pixabay.com/api/",v="49657036-4525f6d8cdebe924870a85f3e",S=async(t,o)=>{const a=new URLSearchParams({key:v,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o});try{const{data:s,status:e}=await w.get(`${L}?${a}`);if(e!==200)throw new Error("Network response was not ok");return s}catch(s){throw new Error("There has been a problem with your fetch operation:",s)}},q=(t,o)=>{const a=t.map(({webformatURL:s,largeImageURL:e,tags:r,likes:n,views:y,comments:h,downloads:g})=>`<li class="photo-card">
          <a href="${e}" class="photo-link">
            <img src="${s}" alt="${r}" loading="lazy" />
            <div class="info">
            <p class="info-item">
              <span>Likes</span><span class="info-value">${n}</span>
            </p>
            <p class="info-item">
              <span>Views</span><span class="info-value">${y}</span>
            </p>
            <p class="info-item">
              <span>Comments</span><span class="info-value">${h}</span>
            </p>
            <p class="info-item">
              <span>Downloads</span><span class="info-value">${g}</span>
            </p>
          </div>
          </a>
        </li>`).join("");o.insertAdjacentHTML("beforeend",a)},$=new b(".gallery a",{captionDelay:250}),p=document.querySelector(".form"),u=document.querySelector(".gallery"),d=document.querySelector(".loader"),l=document.querySelector(".load-more");let i=1,c="";p.addEventListener("submit",async t=>{if(t.preventDefault(),u.innerHTML="",i=1,l.style.display="none",c=new FormData(p).get("search").trim(),c===""){f.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}await m()});l.addEventListener("click",async()=>{i+=1,await m()});async function m(){d.style.display="block";try{const t=await S(c,i);if(t.hits.length===0&&i===1)throw new Error("Sorry, there are no images matching your search query. Please, try again!");q(t.hits,u),$.refresh(),t.hits.length>0?l.style.display="block":l.style.display="none",i>1&&E()}catch(t){f.error({title:"Error",message:t.message,position:"topRight"})}finally{d.style.display="none"}}function E(){const{height:t}=document.querySelector(".gallery li").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
