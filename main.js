(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("click",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("click",r)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){e.target.classList.contains("popup")&&t(e.target)}function o(e,t,n){n.classList.remove(e.inputErrorClass);var r=t.querySelector(".".concat(n.id,"-error"));r.classList.remove(e.errorClass),r.textContent=""}function c(e,t){e.classList.add(t),e.setAttribute("disabled",!0)}var u=function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(n){o(e,t,n)})),c(r,e.inactiveButtonClass)},a={baseUrl:"https://nomoreparties.co/v1/apf-cohort-202",headers:{authorization:"450ee041-353e-4009-b774-e38bda343da7","Content-Type":"application/json"},ownerId:""};function i(e,t){e.textContent=t?"Сохранение...":"Сохранить"}function s(e){var t=document.querySelector("#card-template").content.cloneNode(!0),n=t.querySelector(".card"),r=t.querySelector(".card__title"),o=t.querySelector(".card__image"),c=t.querySelector(".card__like-button"),u=t.querySelector(".card__delete-button");return r.textContent=e.name,o.src=e.link,o.alt=e.name,n.setAttribute("id",e._id),c.textContent=e.likes.length,e.owner&&e.owner._id!==a.ownerId&&(u.style.display="none"),e.likes.some((function(e){return e._id===a.ownerId}))&&c.classList.toggle("card__like-button_is-active"),t}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p,d=document.querySelector(".places__list"),f=document.querySelector(".profile"),_=f.querySelector(".profile__edit-button"),y=f.querySelector(".profile__title"),m=f.querySelector(".profile__description"),v=f.querySelector(".profile__image"),h=document.querySelector(".popup_type_edit"),b=h.querySelector(".popup__form"),S=h.querySelector(".popup__input_type_name"),q=h.querySelector(".popup__input_type_description"),k=h.querySelector(".popup__close"),E=h.querySelector(".popup__button"),L=document.querySelector(".popup_type_new-profile-image"),g=L.querySelector(".popup__form"),C=L.querySelector(".popup__close"),j=g.querySelector(".popup__button"),A=g.querySelector(".popup__input_type_url"),x=f.querySelector(".profile__add-button"),w=document.querySelector(".popup_type_new-card"),P=w.querySelector(".popup__form"),U=w.querySelector(".popup__close"),I=w.querySelector(".popup__input_type_card-name"),T=w.querySelector(".popup__input_type_url"),B=w.querySelector(".popup__button"),O=document.querySelector(".popup_type_image"),D=O.querySelector(".popup__caption"),z=O.querySelector(".popup__image"),N=O.querySelector(".popup__close"),J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};Promise.all([fetch("".concat(a.baseUrl,"/users/me"),{headers:{authorization:a.headers.authorization}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(a.baseUrl,"/cards"),{headers:{authorization:a.headers.authorization}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(s)throw o}}return a}}(n,r)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];y.textContent=c.name,m.textContent=c.about,v.style.backgroundImage="url(".concat(c.avatar,")"),t=c._id,a.ownerId=t,u.forEach((function(e){return d.append(s(e))}))})).catch((function(e){return console.error(e)})),d.addEventListener("click",(function(t){var n=t.target;if(n.classList.contains("card__like-button")){var r=n.parentElement.parentElement.id;n.classList.toggle("card__like-button_is-active"),n.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(a.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(r).then((function(e){n.textContent=e.likes.length})).catch((function(e){return console.error(e)})):function(e){return fetch("".concat(a.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(r).then((function(e){n.textContent=e.likes.length})).catch((function(e){return console.error(e)}))}if(n.classList.contains("card__delete-button")&&function(e){return fetch("".concat(a.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n.parentElement.id).then((function(){n.closest(".places__item").remove()})).catch((function(e){return console.error(e)})),n.classList.contains("card__image")){var o=n.closest(".places__item").querySelector(".card__title");D.textContent=o.textContent,z.src=n.src,z.alt=o.textContent,e(O)}})),document.querySelectorAll(".popup").forEach((function(e){return e.classList.add("popup_is-animated")})),N.addEventListener("click",(function(){return t(O)})),_.addEventListener("click",(function(){S.value=y.textContent,q.value=m.textContent,e(h)})),k.addEventListener("click",(function(){t(h),u(J,b)})),b.addEventListener("submit",(function(e){e.preventDefault(),i(E,!0),function(e,t){return fetch("".concat(a.baseUrl,"/users/me"),{method:"PATCH",headers:a.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(S.value,q.value).then((function(e){y.textContent=e.name,m.textContent=e.about,t(h),c(E,"popup__button_disabled")})).catch((function(e){console.error(e)})).finally((function(){i(E,!1)}))})),v.addEventListener("click",(function(){A.value="",e(L)})),C.addEventListener("click",(function(){t(L),u(J,g)})),g.addEventListener("submit",(function(e){var n;e.preventDefault(),i(j,!0),(n=A.value,fetch("".concat(a.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:a.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){v.style.backgroundImage="url(".concat(e.avatar,")"),t(L),c(j,"popup__button_disabled")})).catch((function(e){console.error(e)})).finally((function(){i(j,!1)}))})),x.addEventListener("click",(function(){I.value="",T.value="",e(w)})),U.addEventListener("click",(function(){t(w),u(J,P)})),P.addEventListener("submit",(function(e){e.preventDefault(),i(B,!0),function(e,t){return fetch("".concat(a.baseUrl,"/cards"),{method:"POST",headers:a.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(I.value,T.value).then((function(e){d.prepend(s(e)),t(w),c(B,"popup__button_disabled")})).catch((function(e){console.error(e)})).finally((function(){i(B,!1)}))})),p=J,Array.from(document.querySelectorAll(p.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);c(r,e.inactiveButtonClass),n.forEach((function(u){u.addEventListener("input",(function(){!function(e,t,n){var r="";n.validity.valid?"url"===n.type&&(/^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-]*)*$/.test(n.value)||(r="Введите корректный URL")):r=n.validationMessage,r?function(e,t,n,r){n.classList.add(e.inputErrorClass);var o=t.querySelector(".".concat(n.id,"-error"));o.classList.add(e.errorClass),o.textContent=r}(e,t,n,r):o(e,t,n)}(e,t,u),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.classList.remove(e),n.removeAttribute("disabled")):c(n,e)}(e.inactiveButtonClass,n,r)}))}))}(p,e)}))})();