'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
  setSmoothScroll()
  highlightNavOnScroll()
  toggleHamburgerMenuOnClick()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

const setSmoothScroll = function () {
  // Target all a tags inside .sidebar-middle and .sidebar-hamburger, and apply smooth scrolling.
  $('.sidebar-middle a, .sidebar-hamburger a').click(function (event) {
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000)
  })
}

const highlightNavOnScroll = function () {
  /**
   * This part handles the highlighting functionality.
   * We use the scroll functionality again, some array creation and
   * manipulation, class adding and class removing, and conditional testing
   */
   // Create array of hrefs: [#about-section, #project-section]
  const aChildren = $('.sidebar-middle li').children() // find the a children of the list items (i.e. <a> elements)
  const aArray = [] // create the empty aArray
  for (let i = 0; i < aChildren.length; i++) {
    const aChild = aChildren[i]
    const ahref = $(aChild).attr('href')
    aArray.push(ahref)
  } // this for loop fills the aArray with attribute href values

  // function called upon on scroll event
  $(window).scroll(function () {
    // get the offset of the window from the top of page. How far you scrolled down from top of the page.
    const windowPos = $(window).scrollTop()

    for (let i = 0; i < aArray.length; i++) {
      // assign each array element as 'theID' variable
      const theID = aArray[i]
      // Get the offset of each array element from the top of the page (i.e. section container)
      const divPos = $(theID).offset().top - 1 // subtract 1 such that button will be highlighted even if the computer scrolls to a spot that is 1 pixel above the actual element, therefore providing a buffer for errors
      const divHeight = $(theID).height() // get the height of the div in question
      // if scroll position is within the element (if scroll position is below top of element and higher than the end of the element)
      if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
        // then highlight the button with the corresponding hash
        $("a[href='" + theID + "']").addClass('nav-active')
        // else remove highlight
      } else {
        $("a[href='" + theID + "']").removeClass('nav-active')
      }
    }
  })
}

const toggleHamburgerMenuOnClick = function () {
  $('#hamburger-icon').on('click', function (event) {
    event.preventDefault();

    // toggle 'is-active' class to animate hamburger menu icon
    ($(this).hasClass("is-active") === true) ? $(this).removeClass("is-active") : $(this).addClass("is-active")

    // toggle opening and closing of hamburger menu
    if ($('.sidebar-hamburger').css('height') === '50px') {
      $('.sidebar-hamburger').css({'height':'400px'})
    } else if ($('.sidebar-hamburger').css('height') === '400px') {
      $('.sidebar-hamburger').css({'height':'50px'})
    }
  })
}
