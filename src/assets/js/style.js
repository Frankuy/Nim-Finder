import $ from 'jquery';

$(document).ready(function() {
    // Transition effect for navbar 
    $(window).scroll(function() {
      // checks if window is scrolled more than 500px, adds/removes solid class
      if($(this).scrollTop() > 50) { 
          $('.navbar').addClass('solid');
      } else {
          $('.navbar').removeClass('solid');
      }
    });

    $('#navbarButton').on('click', function() {
        if ($('.navbar').hasClass('solid') && $(window).scrollTop() <= 50) {
            $('.navbar').removeClass('solid');
        }
        else {
            $('.navbar').addClass('solid')
        }
    })
});

 