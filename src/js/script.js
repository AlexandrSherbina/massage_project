window.addEventListener('DOMContentLoaded', () => {
//hamburger menu
const menu = document.querySelector('.menu'),
menuItem = document.querySelectorAll('.menu_item'),
hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu_active');
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    })
});

//Modal windows
$('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click' ,function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });      
  $('.button_price').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.services-item__descr').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  }); 
  
  //Validate form
  
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
          maxlength: 50
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа")
        },
        phone: "Пожалуйста введите свой номер телефона",
        email: {
          required: "Пожалуйста введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  };
  validateForms('#signup-form_id');
  validateForms('#consultation form');
  validateForms('#order form');

  //phone number entry Mask
  $('input[name=phone]').mask("+38 (099) 999-99-99");

//send email whith site
$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input", "textarea").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');
  });
  return false;
});

// scroll page up
$(window).scroll(function() {
  if ($(this).scrollTop() > 1000 ) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});

$("a[href^='#']").click(function(){
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});

// tiny slider 
const slider = tns({
  container: '.carousel__inner',
  infinite: true,
  center: true,
  loop: true,
  items: 1,
  touch: true,
  slideBy: "page",
  speed: 1600,
  mouseDrag: true,
  swipeAngle: false,
  autoWidth: true,
  autoplay: false,
  controls: false,
  nav: false,
  responsive: {
    640: {    
      edgePadding: 20,  
      gutter: 20,
      items: 1
    },
    767: {
      gutter: 30
    },
    991: {
      items: 1
    }
  }

});
document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});

// Comments
// let comments =[];
// loadComments();

// document.getElementById('comment-add').onclick = function() {
//   event.preventDefault();
//   let commentName = document.getElementById('comment-name');
//   let commentBody = document.getElementById('comment-body');

//   let comment = {
//     name : commentName.value,
//     body : commentBody.value,
//     time : Math.floor(Date.now()/1000)
//   }
//   commentName = '';
//   commentBody = '';
//   comments.push(comment);
//   saveComments();
//   showComments();
// }
// function saveComments() {
//   localStorage.setItem('comments', JSON.stringify(comments));
// }
// function loadComments() {
//   if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
//   showComments();
// }
// function showComments() {
//   let commentField = document.getElementById('comment-field');
//   let out = '';
//   comments.forEach(function(item) {
//     out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
//     out += `<p class="alert alert-primary">${item.name}</p>`;
//     out += `<p class="alert alert-success">${item.body}</p>`;
//   });
//   commentField.innerHTML = out;
// }
// function timeConverter(UNIX_timestamp) {
//   let a = new Date(UNIX_timestamp * 1000);
//   let months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
//   let year = a.getFullYear();
//   let month = months[a.getMonth()];
//   let date = a.getDate();
//   let hour = a.getHours();
//   let min = a.getMinutes();
//   let sec = a.getSeconds();
//   let time = `${date} ${month} ${year}г.${hour}:${min}:${sec}`;
//   return time;
// }

});
