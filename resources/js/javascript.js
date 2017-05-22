//// Variables
// Scrolling variables
var current_article = 0;
var dest_article = 0;
var max_article = 2;
var scroll_speed = 1000;
var current_scroll = 0;

// Window Variables
var view_h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var view_w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

// On document ready
$(document).ready(function() {
  hideSlideArrows();
  $('html, body').stop().animate({
    scrollTop: 0
  }, 1, function() {
    decideSlideArrows();
  });
  coverAnimation();
  //nxjAnimation();
  logoAnimation();
  navAnimation();
  titleAnimation();
  trendingAnimation();
  console.log("Loaded!");
  var logoTimeline = anime.timeline();
});

// Covers on page load
function coverAnimation() {
  // Slide orange cover right
  anime({
    targets: '#screen-cover',
    left: '100%',
    duration: 1200,
    easing: 'easeOutExpo',
    delay: 600
  });
  // Slide grey cover up and fade out
  anime({
    targets: '#screen-cover2',
    translateY: {value:(-view_h+100)+'px', duration:2000, delay: 800, easing:'easeOutExpo'},
    opacity: {value:0.8, duration:1000, delay:1000},
    complete: function() {
      $("#screen-cover2").css("transform","none");
      $("#screen-cover2").css("display","none");
      $("#nav-bar").css("background-color","#1f1f1f");
    }
  });
}

// NXJ on page load
function nxjAnimation() {
  var logoEl = document.querySelector('.logo-animation');
  var pathEls = document.querySelectorAll('.logo-animation path:not(.icon-curve)');
  var innerWidth = window.innerWidth;
  var maxWidth = 740;
  var logoScale = innerWidth <= maxWidth ? innerWidth / maxWidth : 1;
  var logoTimeline = anime.timeline();

  logoEl.style.transform = 'translateY(50px) scale('+logoScale+')';

  for (var i = 0; i < pathEls.length; i++) {
    var el = pathEls[i];
    el.setAttribute('stroke-dashoffset', anime.setDashoffset(el));
  }

  logoTimeline
  .add({
    targets: '.dot-e',
    translateX: [
    { value: [0,-83], duration: 520, delay: 200, easing: 'easeInQuart' },
    { value: [-50, 0], duration: 500, delay: 1300, easing: 'easeOutQuart' }
    ],
    scale: [
    { value: [0, 1], duration: 200, easing: 'easeOutBack' },
    { value: 0, duration: 20, delay: 500, easing: 'easeInQuart' },
    { value: 1, duration: 200, delay: 1300, easing: 'easeOutQuart' }
    ],
    offset: 0
  })
  .add({
    targets: '.dot-j',
    translateY: { value: [-200, 0], duration: 500, elasticity: 400 },
    scale: [
    { value: [0, 1], duration: 100, easing: 'easeOutQuart' }
    ],
    delay: 1200,
    offset: 0
  })
  .add({
    targets: '.fill.in',
    strokeDashoffset: {
      value: [anime.setDashoffset, 0],
      duration: 800,
      delay: function(el, i, t) { return 900 + ( i * 300 ); },
      easing: 'easeOutQuart'
    },
    stroke: {
      value: ['#FFF', function(el) { return anime.getValue(el.parentNode, 'stroke') } ],
      duration: 500,
      delay: 500,
      easing: 'easeInQuad'
    },
    offset: 0
  });
}

// Logo on page load
function logoAnimation() {
  var logoEl = document.querySelector('.logo-animation');
  var pathEls = document.querySelectorAll('.logo-animation path:not(.icon-curve)');
  var innerWidth = window.innerWidth;
  var maxWidth = 740;
  var logoScale = innerWidth <= maxWidth ? innerWidth / maxWidth : 1;
  var logoTimeline = anime.timeline();

  logoEl.style.transform = 'translateY(50px) scale('+logoScale+')';

  for (var i = 0; i < pathEls.length; i++) {
    var el = pathEls[i];
    el.setAttribute('stroke-dashoffset', anime.setDashoffset(el));
  }

  logoTimeline
  .add({
    targets: '.dot-top',
    translateY: { value: [-50, 0], duration: 500, elasticity: 400 },
    scale: [
    { value: [0, 1], duration: 100, easing: 'easeOutQuart' }
    ],
    delay: 3900,
    offset: 0
  })
  .add({
    targets: '.dot-end',
    translateY: { value: [-20, 0], duration: 3000 },
    scale: [
    { value: [0, 1], duration: 100, easing: 'easeOutQuart' }
    ],
    delay: 3100,
    offset: 0,
    elasticity: 0
  })
  .add({
    targets: '.fill.in',
    strokeDashoffset: {
      value: [anime.setDashoffset, 0],
      duration: 1600,
      delay: function(el, i, t) { return 2200 + ( i * 200 ); },
      easing: 'easeOutQuart'
    },
    stroke: {
      value: ['#FFF', function(el) { return anime.getValue(el.parentNode, 'stroke') } ],
      duration: 500,
      delay: 2000,
      easing: 'easeInQuad'
    },
    offset: 0
  });
}

// Nav on page load
function navAnimation() {
  // Slide links down and fade in
  anime({
    targets: '.nav-links',
    translateY: {value:[-30,0], duration:1000, delay:1000, easing:'easeOutExpo', elasticity:300},
    opacity: {value:1, duration:3000, delay:1000},
    delay: 0
  });
}

// Title on page load
function titleAnimation() {
  // Slide title right and fade in
  anime({
    targets: '#intro-title',
    translateX: {value:[-150,0], duration:2000, delay:1000, easing:'easeOutExpo', elasticity:300},
    opacity: {value:1, duration:3000, delay:1000, elasticity: 0, easing:'easeOutExpo'},
  });
}

// Trending on page load
function trendingAnimation() {
  // Slide trending box right and fade in
  anime({
    targets: '.trending-topics',
    translateX: {value:[-40,0], duration:3000, delay:2000, easing:'easeOutExpo'},
    opacity: {value:0.9, duration:1000, delay:2000, elasticity: 0, easing:'easeOutExpo'},
  });
  // Slide trending links right and fade in
  anime({
    targets: '.trending-topics a',
    translateX: {value:[-50,0], duration:2000, elasticity:300,
      delay: function(target, index) {
        return index*200 + 1800
      }},
      opacity: {value:1, duration:3000, delay:0}
    });
}

// Smooth slide scrolling
$(function() {
  $(window).on('wheel', function(e) {
    // Detect whether up or down
    var delta = e.originalEvent.deltaY;
    // Down
    if (delta > 0 && current_scroll !== 1) {
      if (current_article < max_article) {
        current_scroll = 1;
        dest_article = ++current_article;
        hideSlideArrows();
      }
      $('html, body').stop().animate({
        scrollTop: $("#article_"+dest_article).offset().top
      }, scroll_speed, function() {
        current_scroll = 0;
        decideSlideArrows();
      });
    }
    // Up
    else if(delta < 0 && current_scroll !== -1) {
      if (current_article > 0) {
        current_scroll = -1;
        dest_article = --current_article;
        hideSlideArrows();
      }
      $('html, body').stop().animate({
        scrollTop: $("#article_"+dest_article).offset().top
      }, scroll_speed, function() {
        current_scroll = 0;
        decideSlideArrows();
      });
    }
  });
});

// Up Slide
$(function() {
  $("#upScrollArrow").click(function() {
    if(current_scroll == 0) {
      if (current_article > 0) {
        current_scroll = -1;
        dest_article = --current_article;
        hideSlideArrows();
      }
      $('html, body').stop().animate({
        scrollTop: $("#article_"+dest_article).offset().top
      }, scroll_speed, function() {
        current_scroll = 0;
        decideSlideArrows();
      });
    }
  });
});

// Down Slide
$(function() {
  $("#downScrollArrow").click(function() {
    if(current_scroll == 0) {
      if (current_article < max_article) {
        current_scroll = 1;
        dest_article = ++current_article;
        hideSlideArrows();
      }
      $('html, body').stop().animate({
        scrollTop: $("#article_"+dest_article).offset().top
      }, scroll_speed, function() {
        current_scroll = 0;
        decideSlideArrows();
      });
    }
  });
});

// Scroll to Top
$(function() {
  //Check to see if the window is top if not then display button
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  });

  //Click event to scroll to top
  $('.scrollToTop').click(function(){
    hideSlideArrows();
    $('html, body').animate({scrollTop : 0},800, function() {
      current_article = 0;
      decideSlideArrows();
    });
    return false;
  });
});

// Element in view?
function isScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;

  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  return isVisible;
}

// Hide both slide up.doiwn arrows
function hideSlideArrows() {
  $("#downScrollArrow").addClass("opaque");
  $("#upScrollArrow").addClass("opaque");
}

// Display slide up/down arrows
function decideSlideArrows() {
  if (current_article >= max_article)
    $("#downScrollArrow").addClass("opaque");
  else
    $("#downScrollArrow").removeClass("opaque");
  if (current_article <= 0)
    $("#upScrollArrow").addClass("opaque");
  else
    $("#upScrollArrow").removeClass("opaque");
}

// Title zoom
$(function() {
  $("#intro-title").hover(function() {
    // Slide trending links right and fade in
    anime({
      targets: '#intro-title',
      scaleX: {value:1.03, duration:4000, elasticity:300},
      scaleY: {value:1.03, duration:4000, elasticity:300},
      direction: 'alternate'
    });
  },
  function() {
    // Slide trending links right and fade in
    anime({
      targets: '#intro-title',
      scaleX: {value:1.0, duration:4000, elasticity:300},
      scaleY: {value:1.0, duration:4000, elasticity:300},
      direction: 'alternate'
    });
  });
});