$(window).on("load", function () {
   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $("body").addClass("ios");
   } else {
      $("body").addClass("web");
   }
   document.body.dataset.preloader = false;
});

function getAnchor() {
   return document.URL.split("#").length > 1 ? document.URL.split("#")[1] : null;
}

/* viewport width */
$(function () {
   const anchor = getAnchor();
   //  console.log("anchor", anchor);
   //  console.log("here");

   const tabsWrapper = document.querySelector(".js-tabs");
   //  console.log("tabsWrapper", tabsWrapper);

   if (tabsWrapper) {
      // console.log("tabsWrapper");
      const tabs = document.querySelectorAll(".js-tab");
      const tabContent = document.querySelectorAll(".js-tab-content");
      // console.log("tabs", tabs);

      if (tabs && tabs.length) {
         for (let i = 0; i < tabs.length; i++) {
            // console.log("anchor inside loop", anchor);
            const linkAnchor = tabs[i].href.split("#")[1];
            // console.log("linkAnchor", linkAnchor);
            // console.log("anchor", anchor);
            // console.log("anchor === linkAnchor", anchor === linkAnchor);

            tabs[i].classList.remove("active");
            if (!anchor) {
               tabs[0].classList.add("active");
            } else if (anchor === linkAnchor) {
               tabs[i].classList.add("active");
            }

            tabs[i].addEventListener("click", e => {
               const targetID = e.currentTarget.href.split("#")[1];

               for (let i = 0; i < tabs.length; i++) {
                  // console.log("linkAnchor", tabs[i].href.split("#")[1]);
                  tabs[i].classList.remove("active");

                  if (targetID === tabs[i].href.split("#")[1]) {
                     tabs[i].classList.add("active");
                  }
               }

               if (tabContent && tabContent.length) {
                  for (let i = 0; i < tabContent.length; i++) {
                     tabContent[i].style.display = "none";
                     if (targetID === tabContent[i].dataset.id) {
                        tabContent[i].style.display = "block";
                     }
                  }
               }
            });
         }
      }

      if (tabContent && tabContent.length) {
         for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
            if (anchor === tabContent[i].dataset.id) {
               tabContent[i].style.display = "block";
            } else if (!anchor) {
               tabContent[0].style.display = "block";
            }
         }
      }

      console.log("jjjj");

      $(".js-tabs").slick({
         dots: false,
         autoplay: false,
         infinite: false,
         speed: 300,
         slidesToShow: 6,
         slidesToScroll: 1,
         variableWidth: true,
         arrows: false,
      });
   }

   /* placeholder*/
   //  $("input, textarea").each(function () {
   //     var placeholder = $(this).attr("placeholder");
   //     $(this).focus(function () {
   //        $(this).attr("placeholder", "");
   //     });
   //     $(this).focusout(function () {
   //        $(this).attr("placeholder", placeholder);
   //     });
   //  });
   /* placeholder*/

   /* burger */
   const menu = document.querySelector(".js-menu");
   const menuBtnClose = document.querySelector(".js-menu-btn-close");
   const menuBtnOpen = document.querySelector(".js-menu-btn-open");
   const menuOverlay = document.querySelector(".js-menu-overlay");

   if (menu && menuBtnClose && menuBtnOpen && menuOverlay) {
      menuBtnOpen.addEventListener("click", () => {
         menu.classList.add("m-active");
         menu.classList.remove("m-slidein");
      });
      menuBtnClose.addEventListener("click", () => {
         menu.classList.remove("m-active");
         menu.classList.add("m-slidein");
      });
      menuOverlay.addEventListener("click", () => {
         menu.classList.remove("m-active");
         menu.classList.add("m-slidein");
      });
   }

   //  if ($(".js-list .nav__item").length) {
   //     $(".js-list .nav__item").click(function (e) {
   //        $(".js-list .nav__item").removeClass("m-active");
   //        $(this).addClass("m-active");
   //        $("body").removeClass("navigation-opened");
   //        $(".js-list").removeClass("m-active");
   //     });
   //  }

   //  if ($(".js-toggle").length) {
   //     $(".js-toggle").click(function (e) {
   //        e.preventDefault(e);
   //        $(this).toggleClass("m-active");
   //        $(".toggle__content").slideToggle().toggleClass("m-hidden");
   //     });
   //  }

   //  if ($(".js-toggle-once").length) {
   //     $(".js-toggle-once").one("click", function (e) {
   //        e.preventDefault(e);
   //        $(this).toggleClass("m-active");
   //        $(".toggle__content").slideToggle().toggleClass("m-hidden");
   //     });
   //  }

   /* components */
   if ($(".js-main-slider").length) {
      $(".js-main-slider").slick({
         dots: true,
         autoplay: false,
         infinite: true,
         speed: 300,
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         responsive: [
            {
               breakpoint: 1024,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               },
            },
            {
               breakpoint: 768,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               },
            },
            {
               breakpoint: 476,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               },
            },
         ],
      });
   }
   if ($(".js-slider-reviews").length) {
      $(".js-slider-reviews").slick({
         dots: true,
         autoplay: false,
         infinite: true,
         speed: 300,
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         responsive: [
            {
               breakpoint: 1024,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               },
            },
            {
               breakpoint: 768,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               },
            },
            {
               breakpoint: 476,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               },
            },
         ],
      });
   }

   //  if ($(".js-agency-slider").length) {
   //     $(window).on("resize orientationchange", function () {
   //        $(".js-agency-slider").slick("resize");
   //     });
   //  }

   const randomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

   setTimeout(function () {
      const nmbr = randomNumber(1, 4);
      console.log("nmbr", nmbr);
      if ($(`#js-start-modal-${nmbr}`).length) {
         $.magnificPopup.open({
            items: {
               src: `#js-start-modal-${nmbr}`,
            },
            type: "inline",
         });
      }
   }, 5000);

   if ($(".js-gallery").length) {
      $(".js-gallery").each(function () {
         // the containers for all your galleries
         $(this).magnificPopup({
            delegate: "a", // the selector for gallery item
            type: "image",
            gallery: {
               enabled: true,
            },
         });
      });

      // $(".js-gallery").magnificPopup({
      //    delegate: "a",
      //    type: "image",
      //    tLoading: "Loading image #%curr%...",
      //    mainClass: "mfp-img-mobile",
      //    gallery: {
      //       enabled: true,
      //       navigateByImgClick: true,
      //    },
      //    image: {
      //       tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      //    },
      //    fixedContentPos: false,
      //    removalDelay: 500, //delay removal by X to allow out-animation
      //    callbacks: {
      //       beforeOpen: function () {
      //          // just a hack that adds mfp-anim class to markup
      //          this.st.image.markup = this.st.image.markup.replace(
      //             "mfp-figure",
      //             "mfp-figure mfp-with-anim"
      //          );
      //          this.st.mainClass = this.st.el.attr("data-effect");
      //       },
      //    },
      // });
   }

   const btnSelect = document.querySelector(".js-btn-select");
   if (btnSelect) {
      btnSelect.addEventListener("click", e => {
         e.currentTarget.nextElementSibling.classList.toggle("active");
      });
   }
});
