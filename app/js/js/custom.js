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
  const tabsWrapper = document.querySelector(".js-tabs");

  if (tabsWrapper) {
    const tabs = document.querySelectorAll(".js-tab");
    const tabContent = document.querySelectorAll(".js-tab-content");

    if (tabs && tabs.length) {
      if (window.matchMedia("(min-width: 768px)").matches) {
        for (let i = 0; i < tabs.length; i++) {
          const linkAnchor = tabs[i].href.split("#")[1];

          tabs[i].classList.remove("active");
          if (!anchor) {
            tabs[0].classList.add("active");
          } else if (anchor === linkAnchor) {
            tabs[i].classList.add("active");
          }

          tabs[i].addEventListener("click", (e) => {
            const targetID = e.currentTarget.href.split("#")[1];

            for (let i = 0; i < tabs.length; i++) {
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
    }

    if (tabContent && tabContent.length) {
      if (window.matchMedia("(min-width: 768px)").matches) {
        for (let i = 0; i < tabContent.length; i++) {
          tabContent[i].style.display = "none";
          if (anchor === tabContent[i].dataset.id) {
            tabContent[i].style.display = "block";
          } else if (!anchor) {
            tabContent[0].style.display = "block";
          }
        }
      } else {
        // for (let i = 0; i < tabContent.length; i++) {
        //   const id = tabContent[i].dataset.id;
        //   tabContent[i].id = id;
        // }
      }
    }

    const stickyMenu = document.querySelector(".js-sticky-menu");
    const stickyMenuWrapper = document.querySelector(".js-sticky-menu-wrapper");

    if (stickyMenu) {
      window.addEventListener("scroll", () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
          const sticky = stickyMenu.offsetTop - 90;
          const height = stickyMenu.clientHeight;

          if (window.pageYOffset > sticky) {
            stickyMenu.classList.add("sticky");
            stickyMenuWrapper.style.paddingBottom = `${height}px`;
          } else {
            stickyMenu.classList.remove("sticky");
            stickyMenuWrapper.style.paddingBottom = 0;
          }
        }
      });
    }

    $(".js-tabs").slick({
      dots: false,
      autoplay: false,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: false,
      centerMode: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
          },
        },
      ],
    });

    $(".js-tabs").on("click", ".slick-slide", function (e) {
      if (window.matchMedia("(max-width: 767px)").matches) {
        e.stopPropagation();
        let index = $(this).index();

        const tabs = document.querySelectorAll(".js-tab");

        for (let i = 0; i < tabs.length; i++) {
          tabs[i].classList.remove("d-active");
        }
        tabs[index].classList.add("d-active");

        const hrefToScroll = $(this).find(".js-tab").attr("href").substring(1);
        const elemToScroll = $(`[data-id="${hrefToScroll}"]`);

        $([document.documentElement, document.body]).animate(
          {
            scrollTop: elemToScroll.offset().top - 158,
          },
          0
        );

        if ($(".js-tabs").slick("slickCurrentSlide") !== index) {
          $(".js-tabs").slick("slickGoTo", index);
        }
      }
    });

    const setIntersectionObserver = (element) => {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (window.matchMedia("(max-width: 767px)").matches) {
              if (entry.isIntersecting) {
                const id = entry.target.getAttribute("data-id");
                const link = document.querySelector(`[href="#${id}"]`);
                const li = link.closest(".slick-slide");
                const index = $(li).attr("data-slick-index");
                $(".js-tabs").slick("slickGoTo", index);

                console.log("index", index);

                const tabs = document.querySelectorAll(".js-tab");
                for (let i = 0; i < tabs.length; i++) {
                  tabs[i].classList.remove("d-active");
                }
                tabs[index].classList.add("d-active");
              } else {
                console.log("is not visible");
              }
            }
          });
        },
        { threshold: 0, rootMargin: "50px" }
      );
      observer.observe(element);
    };

    const sections = [
      document.querySelector('[data-id="bowls"]'),
      document.querySelector('[data-id="soups"]'),
      document.querySelector('[data-id="sides"]'),
      document.querySelector('[data-id="desserts"]'),
      document.querySelector('[data-id="sauces"]'),
      document.querySelector('[data-id="soda-water"]'),
      document.querySelector('[data-id="catering"]'),
    ];

    for (let i = 0; i < sections.length; i++) {
      setIntersectionObserver(sections[i]);
    }

    // const intersectionOptions = {
    //   root: document.querySelector('[data-id="bowls"]'),
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };

    // const intersectionCallback = (entries, observer) => {
    //   console.log("here");
    //   entries.forEach((entry) => {
    //     // you can find out easily if target is intersecting by inspecting `isIntersecting` property
    //     if (entry.isIntersecting) {
    //       console.log(`Hey, I'm intersecting`);
    //     }
    //   });
    // };

    // const observer = new IntersectionObserver(
    //   intersectionCallback,
    //   intersectionOptions
    // );
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
      autoplay: true,
      infinite: true,
      speed: 500,
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
      autoplay: true,
      infinite: true,
      speed: 500,
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

  const randomNumber = (min, max) =>
    Math.round(Math.random() * (max - min) + min);

  setTimeout(function () {
    const nmbr = randomNumber(1, 4);
    if ($(`#js-start-modal-${nmbr}`).length) {
      $.magnificPopup.open({
        items: {
          src: `#js-start-modal-${nmbr}`,
        },
        type: "inline",
      });
      document.body.style.overflow = "hidden";

      const btnClose = document.querySelector(".mfp-close");
      const modalContainer = document.querySelector(".mfp-container");
      if (btnClose) {
        btnClose.addEventListener("click", () => {
          document.body.style.overflow = "";
        });
      }
      if (modalContainer) {
        modalContainer.addEventListener("click", () => {
          document.body.style.overflow = "";
        });
      }
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
    btnSelect.addEventListener("click", (e) => {
      e.currentTarget.nextElementSibling.classList.toggle("active");
    });
  }
});
