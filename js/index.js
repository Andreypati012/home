"use strict";

//pc - mobil

const isMobile = {
  Android: function (){
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function (){
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function (){
    return      navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function(){
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Googole: function(){
    return navigator.userAgent.match(/Googole/i);
  },
  Windows: function (){
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function (){
  return  (
    isMobile.Android() ||
    isMobile.BlackBerry() ||  
    isMobile.iOS() || 
    isMobile.Opera() || 
    isMobile.Windows() ||
    isMobile.Googole());
  }
};

if(isMobile.any()){
  document.body.classList.add('Mobile');
}
else{
  document.body.classList.add('pc');
  const darkBlocks = document.querySelectorAll('.dark');
  const header = document.querySelector('header');
 const telephoneColor = document.querySelectorAll('.colors');
  console.log(telephoneColor);
 window.addEventListener('scroll', function () {
     let isIntersecting = false;
     for (let i = 0; i < darkBlocks.length; i++) {
         if (darkBlocks[i].getBoundingClientRect().bottom >= header.getBoundingClientRect().top
         && darkBlocks[i].getBoundingClientRect().top <= header.getBoundingClientRect().bottom) {
           isIntersecting = true;
             break;
         }
     }
 
     if (isIntersecting) {
         header.classList.add('header--light');
          telephoneColor.forEach(item =>{
           item.style.fill = '#fff';
          })
     } else {
         header.classList.remove('header--light');
         telephoneColor.forEach(item =>{
           item.style.fill = '#000';
          })
     }
 });
}



//burger menu

 const burger = document.querySelector('#burger');
  const bodyMenuBurger = document.querySelector('.header__body');
 const menuItem = document.querySelectorAll('.menu-items__item');
  burger.addEventListener('click', function (e){
   burger.classList.toggle('openBurger');
    bodyMenuBurger.classList.toggle('OpenBodyMenu');
     if(burger.classList.contains('openBurger')){
       document.body.style.overflow = 'hidden';
     }
     else{
      document.body.style.overflow = 'visible';
     }
     for(let item = 0; item < menuItem.length; item++){
       const element = menuItem[item];
        element.addEventListener('click', function (e){
          document.body.style.overflow = 'visible';
          burger.classList.remove('openBurger');
          bodyMenuBurger.classList.remove('OpenBodyMenu');
        })
     }
  });


 //ленивая подгрузка

  const allImage = document.querySelectorAll('img[data-src]');
   const clientHeight = document.documentElement.clientHeight;
  
   let imageArray = [];
    if(allImage.length > 0){
      allImage.forEach((item) => {
        imageArray.push(item.getBoundingClientRect().top + pageYOffset);
      });
      lazyLoading();
    }

   window.addEventListener('scroll', function (e){
     if(document.querySelectorAll('img[data-src]').length > 0){
       lazyLoading();
     }
   })

    function lazyLoading(){
      let arrayImageIndex = [];
       imageArray.forEach((item, index) => {
         if(pageYOffset > item - clientHeight){
           arrayImageIndex.push(index);
         }
         arrayImageIndex.forEach(item => {
           if(allImage[item].dataset.src){
             allImage[item].src = allImage[item].dataset.src;
            allImage[item].removeAttribute('data-src');
           }
           delete arrayImageIndex[item];
         });
       })
    }

    //gallery

    Fancybox.bind('[data-fancybox="gallery"]', {
    });
    


      //смена menu header
      const darkBlocks = document.querySelectorAll('.dark');
       const header = document.querySelector('header');
      const telephoneColor = document.querySelector('.colors');
       console.log(telephoneColor);
      window.addEventListener('scroll', function () {
          let isIntersecting = false;
          for (let i = 0; i < darkBlocks.length; i++) {
              if (darkBlocks[i].getBoundingClientRect().bottom >= header.getBoundingClientRect().top
              && darkBlocks[i].getBoundingClientRect().top <= header.getBoundingClientRect().bottom) {
                  isIntersecting = true;
                  break;
              }
          }
      
          if (isIntersecting) { 
            telephoneColor.style.fill = '#fff'; 
          } else { 
            telephoneColor.style.fill = '#000'; 
          }
      });
      


      //popup

       const popup = document.querySelectorAll('.popup-active[href]');
        var time = 800;
       let click = true;
        var timePopupOpen = 2000;
       const popupBig = document.querySelector('.popup-question');
        if(popup.length > 0){
           for(let item = 0; item < popup.length; item++){
             const element = popup[item];
              const clearElement = element.getAttribute('href').replace('#', '');
             const currentPopup = document.getElementById(clearElement);
              console.log(currentPopup);
            element.addEventListener('click', function (e){
              if(element && click){
                document.querySelectorAll('.popupOpen').forEach(item => item.classList.remove('popupOpen'));
                currentPopup.classList.add('popupOpen');
                bodyStop();  
              }
              currentPopup.addEventListener('click', function (e){
                if(!event.target.closest('.popup__capture') && !event.target.closest('.popup-bay-house__body')){
                  currentPopup.classList.remove('popupOpen');
                  bodyLoad();
                }
              })
              event.preventDefault();
            });
               
        const closesPopup = document.querySelectorAll('.popup__closes');
        if(closesPopup.length > 0){
          for(let item = 0; item < closesPopup.length; item++){
             const element = closesPopup[item];
            element.addEventListener('click', function (e){
               currentPopup.classList.remove('popupOpen');
                bodyLoad();
            });
          }
        }
          }
        }


        function bodyStop(){
          const activePopup = window.innerWidth - document.querySelector('.wrapper').offsetWidth;
           document.body.style.paddingRight = activePopup + 'px';
           document.body.style.overflow = 'hidden';
        }
  
        function bodyLoad(){
          setTimeout(function (e){
            document.body.style.paddingRight = 0 + 'px';
            document.body.style.overflow = 'visible';
          }, time);
          click = false;
          setTimeout(function (e){
            click = true;
           }, timePopupOpen)
        }

        //проверка на наличии содержимого в input

        const input = document.querySelectorAll('.popup__input');
         const buttonPopup = document.querySelector('.popup__button');
          let timeColor = 3000;
         let submitTimeout = false;
          buttonPopup.addEventListener('click', function submits(e){
            const form = document.forms[1];
             const inputLogin = form.elements.login;  
             const inputPassword = form.elements.password;   
           const inputCheckBox = form.elements.agree; 
              if(!inputLogin.value || inputPassword.value.length < 3){
                const currentLogin = document.querySelector('.popup__login');
                 currentLogin.style.borderBottom = '1px solid red';
                  setTimeout(function (e){
                    currentLogin.style.borderBottom = '1px solid #63AFCD';
                  }, timeColor)
                  event.preventDefault();
              }
              if(!inputPassword.value || inputPassword.value.length < 9){
                const currentPassword= document.querySelector('.popup__password');
                 currentPassword.style.borderBottom = '1px solid red';
                  setTimeout(function (e){
                    currentPassword.style.borderBottom = '1px solid #63AFCD';
                  }, timeColor)
                  event.preventDefault();
              }
              if(!inputCheckBox.checked){
                const currentCheckBox = document.querySelector('.popup__agree');
                 const cupturePopup = document.querySelector('.popup__capture');
                  if(!cupturePopup.classList.contains('popup__error')){
                      const popupError = document.querySelector('.popup__error-one');
                      popupError.style.display = 'block';
                     setTimeout(function (e){
                      popupError.style.display = 'none';
                     }, timeColor)
                    event.preventDefault();
                  }
              }                   
         });

      //form 3

       //проверка на наличии содержимого в input
       const inputFooter = document.querySelectorAll('.form-footer__input');
       const buttonFooter = document.querySelector('.form-footer__btn');
       buttonFooter.addEventListener('click', function submits(e){
          const form = document.forms[0];
           const inputLogin = form.elements.name;  
           const inputTelephone = form.elements.telephone;   
         const inputCheckBox = form.elements.agree; 
            if(!inputLogin.value || inputLogin.value.length < 3){
              const currentLogin = document.querySelector('.form-footer__input');
               currentLogin.style.borderBottom = '1px solid red';
                setTimeout(function (e){
                  currentLogin.style.borderBottom = '1px solid #63AFCD';
                }, timeColor)
                event.preventDefault();
            }
            if(!inputTelephone.value || inputTelephone.value.length < 9){
              const currentPassword= document.querySelector('.form-footer__input-password');
               currentPassword.style.borderBottom = '1px solid red';
                setTimeout(function (e){
                  currentPassword.style.borderBottom = '1px solid #63AFCD';
                }, timeColor)
                event.preventDefault();
            }
            if(!inputCheckBox.checked){
              const currentCheckBox = document.querySelector('.form-footer__text-agree');
               const cupturePopup = document.querySelector('.popup__capture');
                if(!cupturePopup.classList.contains('popup__error')){
                    const popupError = document.querySelector('.popup__error');
                    popupError.style.display = 'block';
                   setTimeout(function (e){
                    popupError.style.display = 'none';
                   }, timeColor)
                  event.preventDefault();
                }
            }                   
       });
           
                                
         //scroll down section 1 to section 2

         const scrollSection = document.querySelector('.info__arrow');
          const section = document.querySelector('.future__title');
            if(scrollSection){
              const coordinate = section.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
              scrollSection.addEventListener('click', function (e){
                console.log(scrollSection);
                window.scrollTo({
                 top: coordinate,
                 left: 0,
                 behavior: 'smooth',
                })
              })

            }
          //scroll up footer to header 
          
           const scrollUp = document.querySelector('.scroll-up');
           const cardBuildSection = document.querySelector('.swiper__title');
            if(cardBuildSection){
            window.addEventListener('scroll', function (e){
               const coordinate = cardBuildSection.getBoundingClientRect().top + pageYOffset;
               if(pageYOffset >= coordinate){
                 scrollUp.style.visibility = 'visible';
                 scrollUp.style.opacity = '1';
               }
               if(pageYOffset < coordinate){
                scrollUp.style.visibility = 'hidden';
                 scrollUp.style.opacity = '0';
               }
            });
             scrollUp.addEventListener('click', function (e){
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
             })
            }
  
              //header go to footer contacts 

               const menuContacts = document.querySelector('.menu-items__item-tp');
                if(menuContacts){
                   const elementContacts = document.querySelector('.footer__content');
                    menuContacts.addEventListener('click', function (e){
                      const coordinates = elementContacts.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
                       window.scrollTo({
                        top: coordinates,
                        left: 0,
                        behavior: 'smooth',
                       });
                       event.preventDefault();
                   });
                }


                //hover on card section 2

                const card = document.querySelectorAll('.swiper__item');
                  if(card.length > 0){
                     for(let item = 0; item < card.length; item++){
                       const element = card[item];
                       element.addEventListener('mouseenter', function (e){
                         element.classList.add('swiper-hover');
                       });
                       element.addEventListener('mouseleave', function (e){
                        element.classList.remove('swiper-hover');
                       });
                     }
                    }
                
                    //checkBox style footer

                    const checkBoxFooter = document.querySelectorAll('.check-box');
                     if(checkBoxFooter .length > 0){
                       for(let item = 0; item < checkBoxFooter.length; item++){
                         const element = checkBoxFooter[item];
                          element.addEventListener('click', function (e){
                            const checkBoxAgree = document.querySelectorAll('.check-box-agree')
                            checkBoxAgree.forEach(item => {
                              item.classList.toggle('check-box-agree-yas');
                             })
                          })
                       }
                     }

                     //checkBox style popup

                    const checkBox = document.querySelectorAll('.check-box-popup');
                    if(checkBox.length > 0){
                      for(let item = 0; item < checkBox.length; item++){
                        const element = checkBox[item];
                         element.addEventListener('click', function (e){
                           const checkBoxAgree = document.querySelectorAll('.check-box-agree-popup')
                           checkBoxAgree.forEach(item => {
                             item.classList.toggle('check-box-popup-agree');
                            })
                         })
                      }
                    }


         //link menu collback

           const linkMenu = document.querySelectorAll('[data-tp]');
           if(linkMenu.length > 0){
              for(let item = 0; item < linkMenu.length; item++){
                const element = linkMenu[item];
                const data = element.dataset.tp.replace('#', '');
                 const idElement = document.getElementById(data);
                 const coordinates = idElement.getBoundingClientRect().top + pageYOffset + document.querySelector('header').offsetHeight;
               element.addEventListener('click', function (e){
                  window.scrollTo({
                   top: coordinates,
                   left: 0,
                   behavior: 'smooth',
                  });
                  e.preventDefault();
               })
              }
           }