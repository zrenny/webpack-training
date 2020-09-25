export var Slider = (function() {
  var $appContainer = $("#demo-container"),
    $contentContainer = $appContainer.children("div.demo-contentwrapper"),
    // the items (description elements for the slides/products)
    $items = $contentContainer.children("div.demo-content"),
    itemsCount = $items.length,
    $slideContainer = $appContainer.children("div.demo-slideContainer"),
    // the slides (product images)
    $slidescontainer = $slideContainer.find("div.demo-slides"),
    $slides = $slidescontainer.children("div"),
    // navigation arrows
    $navprev = $slideContainer.find("nav > a.demo-prev"),
    $navnext = $slideContainer.find("nav > a.demo-next"),
    // current index for items and slides
    current = 0,
    // checks if the transition is in progress
    isAnimating = false,
    init = function() {
      // show first item
      var $currentItem = $items.eq(current),
        $currentSlide = $slides.eq(current),
        initCSS = {
          top: 0,
          zIndex: 999,
          backgroundSize: "cover"
        };

      $currentItem.css(initCSS);
      $currentSlide.css(initCSS);

      // update nav images
      updateNavImages();

      // initialize some events
      initEvents();
    },
    updateNavImages = function() {
      // updates the background image for the navigation arrows
      var configPrev =
          current > 0
            ? $slides.eq(current - 1).css("background-image")
            : $slides.eq(itemsCount - 1).css("background-image"),
        configNext =
          current < itemsCount - 1
            ? $slides.eq(current + 1).css("background-image")
            : $slides.eq(0).css("background-image");

      $navprev.css("background-image", configPrev);
      $navnext.css("background-image", configNext);
    },
    initEvents = function() {
      $navprev.on("click", function(event) {
        if (!isAnimating) {
          slide("prev");
        }
        return false;
      });

      $navnext.on("click", function(event) {
        if (!isAnimating) {
          slide("next");
        }
        return false;
      });

      // transition end event
      $items.on("transitionend", removeTransition);
      $slides.on("transitionend", removeTransition);
    },
    removeTransition = function() {
      console.log("HMR!!");
      isAnimating = false;
      $(this).removeClass("demo-move");
    },
    slide = function(dir) {
      isAnimating = true;

      var $currentItem = $items.eq(current),
        $currentSlide = $slides.eq(current);

      // update current value
      if (dir === "next") {
        current < itemsCount - 1 ? ++current : (current = 0);
      } else if (dir === "prev") {
        current > 0 ? --current : (current = itemsCount - 1);
      }
      // new item that will be shown
      var $newItem = $items.eq(current),
        // new slide that will be shown
        $newSlide = $slides.eq(current);

      // position the new item up or down the viewport depending on the direction
      $newItem.css({
        top: dir === "next" ? "-100%" : "100%",
        zIndex: 999
      });

      $newSlide.css({
        top: dir === "next" ? "100%" : "-100%",
        zIndex: 999
      });

      setTimeout(function() {
        // move the current item and slide to the top or bottom depending on the direction
        $currentItem.addClass("demo-move").css({
          top: dir === "next" ? "100%" : "-100%",
          zIndex: 1
        });

        $currentSlide.addClass("demo-move").css({
          top: dir === "next" ? "-100%" : "100%",
          zIndex: 1
        });

        // move the new ones to the main viewport
        $newItem.addClass("demo-move").css("top", 0);
        $newSlide.addClass("demo-move").css("top", 0);
      }, 0);

      // update nav images
      updateNavImages();
    };

  return { init: init };
})();
