const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.body;let o=null;t.addEventListener("click",(function(){o=setInterval((()=>{n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.disabled=!0})),e.addEventListener("click",(function(){clearInterval(o),e.disabled=!0,t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.1df82be6.js.map
