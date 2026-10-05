document.addEventListener("DOMContentLoaded", function () {
  var counters = document.querySelectorAll("[data-number]");

  function animateCounter(element) {
    var target = Number(element.dataset.number);
    var suffix = element.dataset.suffix || "";
    var startTime = null;
    var duration = 1200;

    function updateCounter(timestamp) {
      if (!startTime) startTime = timestamp;

      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var currentValue = Math.round(target * eased);

      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.4
  });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });

  var yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var clientCarousel = document.querySelector("[data-client-carousel]");
  if (clientCarousel) {
    var clientSlides = Array.from(clientCarousel.querySelectorAll(".client-slide"));
    var clientPagination = clientCarousel.querySelector(".client-pagination");
    var clientPosition = clientCarousel.querySelector(".client-position");
    var clientsPerPage = 4;
    var pageCount = Math.ceil(clientSlides.length / clientsPerPage);
    var activePage = 0;

    function showClientPage(index) {
      activePage = (index + pageCount) % pageCount;
      clientSlides.forEach(function (slide, slideIndex) {
        var isActive = Math.floor(slideIndex / clientsPerPage) === activePage;
        slide.hidden = !isActive;
        slide.setAttribute("aria-label", (slideIndex + 1) + " of " + clientSlides.length);
      });
      clientPagination.querySelectorAll(".client-dot").forEach(function (dot, dotIndex) {
        dot.setAttribute("aria-current", String(dotIndex === activePage));
      });
      clientPosition.textContent = String(activePage + 1).padStart(2, "0") + " / " + String(pageCount).padStart(2, "0");
    }

    Array.from({ length: pageCount }, function (_, pageIndex) {
      var dot = document.createElement("button");
      dot.className = "client-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Show client page " + (pageIndex + 1));
      dot.addEventListener("click", function () {
        showClientPage(pageIndex);
      });
      clientPagination.appendChild(dot);
    });

    clientCarousel.querySelector("[data-client-previous]").addEventListener("click", function () {
      showClientPage(activePage - 1);
    });
    clientCarousel.querySelector("[data-client-next]").addEventListener("click", function () {
      showClientPage(activePage + 1);
    });
    showClientPage(activePage);
  }
});
// Click a My Work image to see it big. Click anywhere to close.

var popup = document.getElementById("popup");
var popupImage = document.getElementById("popup-image");
var images = document.querySelectorAll(".work-gallery img");

if (popup && popupImage) {
  images.forEach(function (image) {
    image.addEventListener("click", function () {
      popupImage.src = image.src;
      popup.classList.add("open");
    });
  });

  popup.addEventListener("click", function () {
    popup.classList.remove("open");
  });
}