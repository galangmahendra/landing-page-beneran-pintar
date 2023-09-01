(function ($) {
  "use strict";

  //Fix for Skills Fill
  skillsFill();
  //Fix z-index
  zIndexSectionFix();
  //Member Content Load
  memberContentLoadOnClick();
  //Portfolio Item Load
  portfolioItemContentLoadOnClick();

  pricingItemContentLoadOnClick();
  //PrettyPhoto initial
  setPrettyPhoto();
  //Send Mail
  $('.contact-us [type="submit"]').on("click", function () {
    SendMail();
  });

  // send mail public
  $('.contact-form-public [type="submit"]').on("click", function () {
    SendMailPublic();
  });

  $('.contact-form-private [type="submit"]').on("click", function () {
    SendMailPrivate();
  });

  if (is_touch_device()) {
    $("body").addClass("is-touch");
  }

  //Fix for Menu
  $(".header-holder").sticky({ topSpacing: 0 });

  //Slow Scroll
  $("#header-main-menu ul li a, .scroll").on("click", function (e) {
    if ($(this).attr("href") === "#") {
      e.preventDefault();
    } else {
      if ($(window).width() < 1024) {
        if (!$(e.target).is(".sub-arrow")) {
          $("html, body").animate(
            { scrollTop: $(this.hash).offset().top - 77 },
            1500
          );
          $(".menu-holder").removeClass("show");
          $("#toggle").removeClass("on");
          return false;
        }
      } else {
        $("html, body").animate(
          { scrollTop: $(this.hash).offset().top - 77 },
          1500
        );
        return false;
      }
    }
  });

  //Logo Click Fix
  $(".header-logo").on("click", function (e) {
    if ($(".page-template-onepage").length) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 1500);
    }
  });

  $(window).scrollTop(1);
  $(window).scrollTop(0);

  $(".single-post .num-comments a").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: $(this.hash).offset().top }, 2000);
    return false;
  });

  //Placeholder show/hide
  $("input, textarea").on("focus", function () {
    $(this).data("placeholder", $(this).attr("placeholder"));
    $(this).attr("placeholder", "");
  });
  $("input, textarea").on("blur", function () {
    $(this).attr("placeholder", $(this).data("placeholder"));
  });

  //Fit Video
  $(".site-content").fitVids();

  //Fix for Default menu
  $(".default-menu ul:first").addClass("sm sm-clean main-menu");

  //Set menu
  $(".main-menu").smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -8,
    markCurrentTree: true,
  });

  var $mainMenu = $(".main-menu")
    .on("click", "span.sub-arrow", function (e) {
      var obj = $mainMenu.data("smartmenus");
      if (obj.isCollapsible()) {
        var $item = $(this).parent(),
          $sub = $item.parent().dataSM("sub");
        $sub.dataSM("arrowClicked", true);
      }
    })
    .bind({
      "beforeshow.smapi": function (e, menu) {
        var obj = $mainMenu.data("smartmenus");
        if (obj.isCollapsible()) {
          var $menu = $(menu);
          if (!$menu.dataSM("arrowClicked")) {
            return false;
          }
          $menu.removeDataSM("arrowClicked");
        }
      },
    });

  //Show-Hide header sidebar
  $("#toggle").on("click", multiClickFunctionStop);

  $(window).on("load", function () {
    //Set Istope Layout on Portfolio
    isotopeSetUp();

    // Animate the elemnt if is allready visible on load
    animateElement();

    //Fix for hash
    var hash = location.hash;
    if (hash != "" && $(hash).length) {
      $("html, body").animate({ scrollTop: $(hash).offset().top - 77 }, 1);
    }

    //Slider Image Set Up
    imageSliderSettings();
    //Slider Text Set Up
    textSliderSettings();
    // testimoni slider

    testimoniSliderSettings();

    splitSectionTitleFix();

    $(".doc-loader").fadeOut(600);
  });

  $(window).on("scroll", function () {
    animateElement();
  });

  //------------------------------------------------------------------------
  //Helper Methods -->
  //------------------------------------------------------------------------

  function animateElement(e) {
    $(".animate").each(function (i) {
      var top_of_object = $(this).offset().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if (bottom_of_window - 70 > top_of_object) {
        $(this).addClass("show-it");
      }
    });
  }

  function skillsFill() {
    $(".skill-fill").each(function (i) {
      var fillPercentage = parseFloat($(this).data("fill"));
      $(this).width(fillPercentage + "%");

      if (fillPercentage === 15) {
        $(this).css("background-color", "#198754");
      } else if (fillPercentage === 20) {
        $(this).css("background-color", "#0DCAF0");
      } else if (fillPercentage === 25) {
        $(this).css("background-color", "#FFC107");
      } else if (fillPercentage === 35) {
        $(this).css("background-color", "#0D6EFD");
      } else {
        $(this).css("background-color", "#DC3545");
      }
    });
  }

  function multiClickFunctionStop(e) {
    $("#toggle").off("click");
    $("#toggle").toggleClass("on");
    if ($("#toggle").hasClass("on")) {
      $(".menu-holder").addClass("show");
      $("#toggle").on("click", multiClickFunctionStop);
    } else {
      $(".menu-holder").removeClass("show");
      $("#toggle").on("click", multiClickFunctionStop);
    }
  }

  $(window).on("scroll resize", function () {
    var currentSection = null;
    $(".section, footer").each(function () {
      var element = $(this).attr("id");
      if ($("#" + element).is("*")) {
        if ($(window).scrollTop() >= $("#" + element).offset().top - 115) {
          currentSection = element;
        }
      }
    });

    $("#header-main-menu ul li")
      .removeClass("active")
      .find('a[href*="#' + currentSection + '"]')
      .parent()
      .addClass("active");
  });

  function imageSliderSettings() {
    $(".image-slider").each(function () {
      var id = $(this).attr("id");
      var auto_value = window[id + "_auto"];
      var hover_pause = window[id + "_hover"];
      var speed_value = window[id + "_speed"];
      auto_value = auto_value === "true" ? true : false;
      hover_pause = hover_pause === "true" ? true : false;
      $("#" + id).owlCarousel({
        loop: true,
        autoHeight: true,
        smartSpeed: 1000,
        autoplay: auto_value,
        autoplayHoverPause: hover_pause,
        autoplayTimeout: speed_value,
        responsiveClass: true,
        items: 1,
      });

      $(this).on("mouseleave", function () {
        $(this).trigger("stop.owl.autoplay");
        $(this).trigger("play.owl.autoplay", [auto_value]);
      });
    });
  }

  function textSliderSettings() {
    $(".text-slider").each(function () {
      var id = $(this).attr("id");
      var auto_value = window[id + "_auto"];
      var hover_pause = window[id + "_hover"];
      var speed_value = window[id + "_speed"];
      auto_value = auto_value === "true" ? true : false;
      hover_pause = hover_pause === "true" ? true : false;
      $("#" + id).owlCarousel({
        loop: true,
        autoHeight: false,
        smartSpeed: 1000,
        autoplay: auto_value,
        autoplayHoverPause: hover_pause,
        autoplayTimeout: speed_value,
        responsiveClass: true,
        items: 1,
      });
    });
  }

  function testimoniSliderSettings() {
    $(".slider-testi").each(function () {
      var id = $(this).attr("id");
      var auto_value = window[id + "_auto"];
      var hover_pause = window[id + "_hover"];
      var speed_value = window[id + "_speed"];
      auto_value = auto_value === "true" ? true : false;
      hover_pause = hover_pause === "true" ? true : false;
      $("#" + id).owlCarousel({
        loop: true,
        autoHeight: false,
        smartSpeed: 1000,
        autoplay: auto_value,
        autoplayHoverPause: hover_pause,
        autoplayTimeout: speed_value,
        responsiveClass: true,
        items: 1,
      });
    });
  }
  $(".slider-testi .owl-item").on("click", (x) => {
    console.log(x);
    $(".slider-testi").hide();
  });

  function zIndexSectionFix() {
    var numSection = $(".page-template-onepage .section-wrapper").length + 2;
    $(".page-template-onepage")
      .find(".section-wrapper")
      .each(function () {
        $(this).css("zIndex", numSection);
        numSection--;
      });
  }

  function pricingItemContentLoadOnClick() {
    $(".ajax-pricing").on("click", function (e) {
      e.preventDefault();
      var pricingItemID = $(this).data("id");
      console.log(pricingItemID, "pricing");
      $(this).addClass("animate-plus");
      console.log(this, "test this");
      if ($("#fcw-" + pricingItemID).length) {
        $("html, body").animate(
          { scrollTop: $("#pricing-wrapper").offset().top - 150 },
          400,
          function() {
            $("#pricing-grid").addClass("hide");
            $("#fcw-" + pricingItemID).addClass("show");
            $(".pricing-load-content-holder").addClass("show");
            $(".ajax-pricing").removeClass("animate-plus");
            $("#pricing-grid").hide();
          }
        );
      } else {
        loadPricingItemContent(pricingItemID);
      }
    });
  }

  function loadPricingItemContent(pricingItemID) {
    $.ajax({
      url: $('.ajax-pricing[data-id="' + pricingItemID + '"]').attr("href"),
      type: "GET",
      success: function (html) {
        var getPriceItemHTML = $(html).find(".price-item-wrapper").html();
        console.log(getPriceItemHTML, "test price html");
        $(".pricing-load-content-holder").append(
          '<div id="fcw-' +
            pricingItemID +
            '" class="pricing-content-wrapper">' +
            getPriceItemHTML +
            "</div>"
        );
        if (!$("#fcw-" + pricingItemID + " .close-icon").length) {
          $("#fcw-" + pricingItemID).prepend('<div class="close-icon"></div>');
        }
        $("html, body").animate(
          { scrollTop: $("#pricing-wrapper").offset().top - 150 },
          400
        );
        $("#fcw-" + pricingItemID).imagesLoaded(function () {
          skillsFill();
          imageSliderSettings();
          $(".site-content").fitVids(); //Fit Video
          $("#pricing-grid").addClass("hide");
          
          // Animasi elemen
          $("#fcw-" + pricingItemID).addClass("show");
          $(".pricing-load-content-holder").addClass("show");
          $(".ajax-pricing").removeClass("animate-plus");
          $("#pricing-grid").hide();
        
          $(".close-icon").on("click", function (e) {
            var pricingReturnItemID = $(this)
              .closest(".pricing-content-wrapper")
              .attr("id")
              .split("-")[1];
            $(".pricing-load-content-holder").addClass("viceversa");
            $("#pricing-grid").css("display", "block");
            
            // Animasi elemen kembali
            $("#fcw-" + pricingReturnItemID).removeClass("show");
            $(".pricing-load-content-holder").removeClass("viceversa show");
            $("#pricing-grid").removeClass("hide");
        
            // Animasi scroll
            $("html, body").animate(
              {
                scrollTop:
                  $("#p-item-" + pricingReturnItemID).offset().top - 150,
              },
              400
            );
          });
        });
        // setTimeout(function () {
        //   $("#fcw-" + pricingItemID).imagesLoaded(function () {
        //     skillsFill();
        //     imageSliderSettings();
        //     $(".site-content").fitVids(); //Fit Video
        //     $("#pricing-grid").addClass("hide");
        //     setTimeout(function () {
        //       $("#fcw-" + pricingItemID).addClass("show");
        //       $(".pricing-load-content-holder").addClass("show");
        //       $(".ajax-pricing").removeClass("animate-plus");
        //       $("#pricing-grid").hide();
        //     }, 300);
        //     $(".close-icon").on("click", function (e) {
        //       var pricingReturnItemID = $(this)
        //         .closest(".pricing-content-wrapper")
        //         .attr("id")
        //         .split("-")[1];
        //       $(".pricing-load-content-holder").addClass("viceversa");
        //       $("#pricing-grid").css("display", "block");
        //       setTimeout(function () {
        //         $("#fcw-" + pricingReturnItemID).removeClass("show");
        //         $(".pricing-load-content-holder").removeClass("viceversa show");
        //         $("#pricing-grid").removeClass("hide");
        //       }, 300);
        //       setTimeout(function () {
        //         $("html, body").animate(
        //           {
        //             scrollTop:
        //               $("#p-item-" + pricingReturnItemID).offset().top - 150,
        //           },
        //           400
        //         );
        //       }, 500);
        //     });
        //   });
        // }, 500);
      },
    });
  }

  function memberContentLoadOnClick() {
    $(".ajax-member-content").on("click", function (e) {
      e.preventDefault();
      var memberID = $(this).data("id");
      console.log(memberID, "test member");
      $(this).find(".member-mask").addClass("animate-plus");
      $("html, body").animate(
        { scrollTop: $("#team-holder").offset().top - 120 },
        300
      );
      if ($("#mcw-" + memberID).length) {
        //Check if is allready loaded
        setTimeout(function () {
          $(".member-holder").addClass("hide").fadeOut();
          setTimeout(function () {
            $("#mcw-" + memberID).addClass("show");
            $(".team-load-content-holder").addClass("show");
            $(".member-mask").removeClass("animate-plus");
          }, 300);
        }, 300);
      } else {
        loadMemberContent(memberID);
      }
    });
  }

  function loadMemberContent(memberID) {
    $.ajax({
      url: $('.ajax-member-content[data-id="' + memberID + '"]').attr("href"),
      type: "GET",
      success: function (html) {
        var getHtml = $(html).find(".member-item-wrapper").html();
        $(".team-load-content-holder").append(
          '<div id="mcw-' +
            memberID +
            '" class="member-content-wrapper">' +
            getHtml +
            "</div>"
        );
        if (!$("#mcw-" + memberID + " .close-icon").length) {
          $("#mcw-" + memberID).prepend('<div class="close-icon"></div>');
        }
        $("html, body").animate(
          { scrollTop: $("#team-holder").offset().top - 150 },
          400
        );
        setTimeout(function () {
          $("#mcw-" + memberID).imagesLoaded(function () {
            imageSliderSettings();
            $(".site-content").fitVids(); //Fit Video
            $(".member-holder").addClass("hide").fadeOut();
            setTimeout(function () {
              $("#mcw-" + memberID).addClass("show");
              $(".team-load-content-holder").addClass("show");
              $(".member-mask").removeClass("animate-plus");
            }, 300);
            $("#team-holder .close-icon").on("click", function (e) {
              var memberReturnItemID = $(this)
                .closest(".member-content-wrapper")
                .attr("id")
                .split("-")[1];
              $(".team-load-content-holder").addClass("viceversa");
              $(".member-holder").css("display", "block");
              setTimeout(function () {
                $("#mcw-" + memberReturnItemID).removeClass("show");
                $(".team-load-content-holder").removeClass("viceversa show");
                $(".member-holder").removeClass("hide");
              }, 300);
              setTimeout(function () {
                $("html, body").animate(
                  {
                    scrollTop:
                      $("#team-member-" + memberReturnItemID).offset().top -
                      150,
                  },
                  400
                );
              }, 500);
            });
          });
        }, 500);
      },
    });
    return false;
  }

  function portfolioItemContentLoadOnClick() {
    $(".ajax-portfolio").on("click", function (e) {
      e.preventDefault();
      var portfolioItemID = $(this).data("id");
      $(this).addClass("animate-plus");
      if ($("#pcw-" + portfolioItemID).length) {
        //Check if is allready loaded
        $("html, body").animate(
          { scrollTop: $("#portfolio-wrapper").offset().top - 150 },
          400
        );
        setTimeout(function () {
          $("#portfolio-grid, .more-posts-portfolio-holder").addClass("hide");
          setTimeout(function () {
            $("#pcw-" + portfolioItemID).addClass("show");
            $(".portfolio-load-content-holder").addClass("show");
            $(".ajax-portfolio").removeClass("animate-plus");
            $("#portfolio-grid, .more-posts-portfolio-holder").hide();
          }, 300);
        }, 500);
      } else {
        loadPortfolioItemContent(portfolioItemID);
      }
    });
  }

  function loadPortfolioItemContent(portfolioItemID) {
    $.ajax({
      url: $('.ajax-portfolio[data-id="' + portfolioItemID + '"]').attr("href"),
      type: "GET",
      success: function (html) {
        var getPortfolioItemHtml = $(html)
          .find(".portfolio-item-wrapper")
          .html();
        $(".portfolio-load-content-holder").append(
          '<div id="pcw-' +
            portfolioItemID +
            '" class="portfolio-content-wrapper">' +
            getPortfolioItemHtml +
            "</div>"
        );
        if (!$("#pcw-" + portfolioItemID + " .close-icon").length) {
          $("#pcw-" + portfolioItemID).prepend(
            '<div class="close-icon"></div>'
          );
        }
        $("html, body").animate(
          { scrollTop: $("#portfolio-wrapper").offset().top - 150 },
          400
        );
        setTimeout(function () {
          $("#pcw-" + portfolioItemID).imagesLoaded(function () {
            skillsFill();
            imageSliderSettings();
            $(".site-content").fitVids(); //Fit Video
            $("#portfolio-grid, .more-posts-portfolio-holder").addClass("hide");
            setTimeout(function () {
              $("#pcw-" + portfolioItemID).addClass("show");
              $(".portfolio-load-content-holder").addClass("show");
              $(".ajax-portfolio").removeClass("animate-plus");
              $("#portfolio-grid").hide();
            }, 300);
            $(".close-icon").on("click", function (e) {
              $(".slider-testi").show();
              var portfolioReturnItemID = $(this)
                .closest(".portfolio-content-wrapper")
                .attr("id")
                .split("-")[1];
              $(".portfolio-load-content-holder").addClass("viceversa");
              $("#portfolio-grid, .more-posts-portfolio-holder").css(
                "display",
                "block"
              );
              setTimeout(function () {
                $("#pcw-" + portfolioReturnItemID).removeClass("show");
                $(".portfolio-load-content-holder").removeClass(
                  "viceversa show"
                );
                $("#portfolio-grid, .more-posts-portfolio-holder").removeClass(
                  "hide"
                );
              }, 300);
              setTimeout(function () {
                $("html, body").animate(
                  {
                    scrollTop:
                      $("#p-item-" + portfolioReturnItemID).offset().top - 150,
                  },
                  400
                );
              }, 500);
            });
          });
        }, 500);
      },
    });
    return false;
  }

  function setPrettyPhoto() {
    $("a[data-rel]").each(function () {
      $(this).attr("rel", $(this).data("rel"));
    });
    $("a[rel^='prettyPhoto']").prettyPhoto({
      slideshow: false /* false OR interval time in ms */,
      overlay_gallery: false /* If set to true, a gallery will overlay the fullscreen image on mouse over */,
      default_width: 1280,
      default_height: 720,
      deeplinking: false,
      social_tools: false,
      iframe_markup:
        '<iframe src ="{path}" width="{width}" height="{height}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    });
  }

  function isotopeSetUp() {
    $(".grid").isotope({
      itemSelector: ".grid-item",
      masonry: {
        columnWidth: ".grid-sizer",
      },
    });
  }

  function splitSectionTitleFix() {
    $(".section-title-holder").stick_in_parent({
      offset_top: 64,
      parent: ".section-wrapper",
      spacer: ".sticky-spacer",
    });
    $(".section-title-holder.portfolio-title-fix-class")
      .stick_in_parent({
        offset_top: 64,
        parent: ".section-wrapper",
        spacer: ".sticky-spacer",
      })
      .on("sticky_kit:bottom", function (e) {
        $(this).addClass("it-is-bottom");
      })
      .on("sticky_kit:unbottom", function (e) {
        $(this).removeClass("it-is-bottom");
      });
  }

  function isValidEmailAddress(emailAddress) {
    var pattern =
      /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
  }

  // Submit form

  const form = document.getElementById("contact-us");
  form.addEventListener("submit", SendMail);

  async function SendMail(e) {
    e.preventDefault();

    const emailVal = $("#contact-email").val();

    if (isValidEmailAddress(emailVal)) {
      const params = {
        action: "SendMessage",
        name: $("#name").val(),
        email: $("#contact-email").val(),
        subject: $("#subject").val(),
        message: $("#message").val(),
      };

      const data = {
        token: "enygma_pwjnkkyn",
        data: [params],
      };

      const settings = {
        method: "POST",
        headers: {
          "x-token-api": "XNiCnLZMrfiFtQmC7mYLhT3OtuYsdm7Y",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(
          "https://api.enygma.id/v1/datasets/multipleinsert/5",
          settings
        );
        if (response.ok) {
          const responseObj = await response.json();
          alert(responseObj.message);
          location.reload();
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        const errorMessage =
          error.message || "Unexpected error, please try again later.";
        alert(errorMessage);
      }
    } else {
      alert("Your email is not in a valid format");
    }
  }

  // const formPublic = document.getElementById("public-form");
  // if (formPublic) {
  //   formPublic.addEventListener("submit", SendMailPublic);
  // } else {
  //   console.error("Element with ID 'public-form' not found.");
  // }

//   window.addEventListener("DOMContentLoaded", (event) => {
//     const formPublic = document.getElementById("public-form");
//     if (formPublic) {
//       formPublic.addEventListener("submit", SendMailPublic);
//     }
// });

  // async function SendMailPublic(e) {
  //   e.preventDefault();

  //   const emailVal = $("#contact-email").val();

  //   if (isValidEmailAddress(emailVal)) {
  //     const params = {
  //       action: "SendMessage",
  //       name: $("#name").val(),
  //       email: $("#contact-email").val(),
  //       subject: $("#subject").val(),
  //     };

  //     console.log(params, "params");

  //     const data = {
  //       token: "enygma_pwjnkkyn",
  //       data: [params],
  //     };

  //     const settings = {
  //       method: "POST",
  //       headers: {
  //         "x-token-api": "XNiCnLZMrfiFtQmC7mYLhT3OtuYsdm7Y",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     };

  //     try {
  //       const response = await fetch(
  //         "https://api.enygma.id/v1/datasets/multipleinsert/5",
  //         settings
  //       );
  //       if (response.ok) {
  //         const responseObj = await response.json();
  //         alert(responseObj.message);
  //         location.reload();
  //       } else {
  //         throw new Error("Request failed");
  //       }
  //     } catch (error) {
  //       const errorMessage =
  //         error.message || "Unexpected error, please try again later.";
  //       alert(errorMessage);
  //     }
  //   } else {
  //     alert("Your email is not in a valid format");
  //   }
  // }
  

  const formPrivate = document.getElementById("private-form");
  formPrivate.addEventListener("submit", SendMailPrivate);

  async function SendMailPrivate(e) {
    e.preventDefault();

    const emailVal = $("#contact-email").val();

    if (isValidEmailAddress(emailVal)) {
      const params = {
        action: "SendMessage",
        name: $("#name-private").val(),
        email: $("#email-private").val(),
        subject: $("#quantity").val(),
      };

      $.ajax({
        type: "POST",
        url: "https://jsonplaceholder.typicode.com/users",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log("User created:", data);
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });

      // console.log(params, "params");

      // const data = {
      //   token: "enygma_pwjnkkyn",
      //   data: [params],
      // };

      // const settings = {
      //   method: "POST",
      //   headers: {
      //     "x-token-api": "XNiCnLZMrfiFtQmC7mYLhT3OtuYsdm7Y",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // };

      // try {
      //   const response = await fetch(
      //     "https://api.enygma.id/v1/datasets/multipleinsert/5",
      //     settings
      //   );
      //   if (response.ok) {
      //     const responseObj = await response.json();
      //     alert(responseObj.message);
      //     location.reload();
      //   } else {
      //     throw new Error("Request failed");
      //   }
      // } catch (error) {
      //   const errorMessage =
      //     error.message || "Unexpected error, please try again later.";
      //   alert(errorMessage);
      // }
    } else {
      alert("Your email is not in a valid format");
    }
  }

  function is_touch_device() {
    return !!("ontouchstart" in window);
  }
})(jQuery);
