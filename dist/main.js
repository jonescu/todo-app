(()=>{"use strict";class e{constructor(e,t,n){this.Title=e,this.Due=t,this.Description=n}}function t(e){this.Title=e}const n=document.querySelector(".new-item-button"),d=document.querySelector(".todo-container"),c=document.createElement("ol"),l=document.querySelector(".projects"),o=document.querySelector(".add-project"),i=document.querySelector(".project-list"),a=document.querySelector(".projects-container");function s(e){e.style.display="none"}document.querySelectorAll(".project-item"),i.style.display="none",c.classList.add("todo-list"),n.addEventListener("click",(function(){s(c);const t=document.createElement("input");t.classList.add("item-input"),t.setAttribute("placeholder","Task Title");const l=document.createElement("textarea");l.classList.add("description-input"),l.setAttribute("placeholder","Task Description");const o=document.createElement("div");o.classList.add("date-container");const i=document.createElement("label");i.classList.add("date-label"),i.textContent="due date: ";const a=document.createElement("input");a.type="date",a.classList.add("date-input"),o.appendChild(i),o.appendChild(a);const r=document.createElement("button");r.classList.add("confirm-add"),r.textContent="add item";const p=document.createElement("button");function u(){d.removeChild(t),d.removeChild(l),d.removeChild(o),d.removeChild(r),d.removeChild(p),n.style.display="block",d.appendChild(c)}p.classList.add("cancel-add"),p.textContent="cancel",d.appendChild(t),d.appendChild(l),d.appendChild(o),d.appendChild(r),d.appendChild(p),s(n),r.addEventListener("click",(function(){if(!t.value)return void alert("task title cannot be empty");u();const n=new e(t.value,a.value,l.value),d=document.createElement("li"),o=document.createElement("button");o.classList.add("remove-item-button"),o.textContent="Remove Item",d.classList.add("list-item");for(const e in n)d.textContent+=`${e}: ${n[e]} `;d.appendChild(o),c.appendChild(d),c.style.display="block",o.addEventListener("click",(function(e){c.removeChild(e.target.parentElement)}))})),p.addEventListener("click",u)})),l.addEventListener("click",(function(){"none"===i.style.display?i.style.display="block":"block"===i.style.display&&(i.style.display="none")})),o.addEventListener("click",(function(){a.removeChild(i);const e=document.createElement("input");e.classList.add("project-input"),e.setAttribute("placeholder","Project Title");const n=document.createElement("button");n.classList.add("add-project-btn"),n.textContent="Add project";const d=document.createElement("button");d.classList.add("cancel-project-btn"),d.textContent="Cancel",a.appendChild(e),a.appendChild(n),a.appendChild(d),s(o),d.addEventListener("click",(function(){a.removeChild(e),a.removeChild(n),a.removeChild(d),o.style.display="block",a.appendChild(i)})),n.addEventListener("click",(function(){const c=new t(e.value),l=document.createElement("li");l.classList.add("project-item"),l.textContent=c.Title;const s=document.createElement("button");s.classList.add("remove-project-btn"),s.textContent="x",l.appendChild(s),a.appendChild(i),i.appendChild(l),i.style.display="block",o.style.display="block",a.removeChild(e),a.removeChild(n),a.removeChild(d),s.addEventListener("click",(function(e){i.removeChild(e.target.parentElement)}))}))})),document.querySelectorAll(".remove-project-li").forEach((e=>e.addEventListener("click",(function(e){i.removeChild(e.target.parentElement)}))))})();