(()=>{"use strict";const e=document.querySelector(".projects-list"),t=document.querySelector(".project-title");document.querySelector(".add-project-btn").addEventListener("click",(function(){if(""!==t.value){const n=document.createElement("li");n.className="project-item",n.textContent=t.value;const c=document.createElement("button");c.className="remove-project-btn",c.textContent="X",e.appendChild(n),e.appendChild(c),t.value=""}else alert("Project title cannot be empty")})),e.addEventListener("click",(function(e){e.target.classList.contains("remove-project-btn")&&(e.target.parentNode.removeChild(e.target.previousSibling),e.target.parentNode.removeChild(e.target))}))})();