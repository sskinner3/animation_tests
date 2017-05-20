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
  navAnimation();
  titleAnimation();
  trendingAnimation();
  console.log("Loaded!");
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
    translateY: {value:(-view_h+80)+'px', duration:2000, delay: 800, easing:'easeOutExpo'},
    opacity: {value:0.8, duration:1000, delay:1000},
    complete: function() {
      $("#screen-cover2").css("transform","none");
      $("#screen-cover2").css("height","63px");
      
    }
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