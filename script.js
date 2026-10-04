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
});