const modalTime = 200;

$(function() {
  var timer = null;
  $('.js-modal').hide();

  $(".js-modal--create__open").click(function() {
    modalResize();
    $(".js-modal__background, .js-modal__field, .js-modal--create").fadeIn(modalTime);
    $('.js-modal--content:not(.js-modal--create)').hide();
  });

  $(".js-modal--edit__open").click(function() {
    modalResize();
    $(".js-modal__background, #modal-field, #edit-todo").fadeIn(modalTime);
    $('.modal-content:not(#edit-todo)').hide();
    let todo = $(this).data('todo'),
        action = $('#editForm').attr('action') + todo._id + '?_method=PUT';
    $('#editForm').attr('action', action);
    $('#editTitle').html(todo.title);
    $('.description-body p').html(todo.contents[0].description);
    $('#editID').attr('value', todo._id);
    $('#createdAt p').html("Created at: "+todo.contents[0].createdAt);
  });

  $(".js-modal__background").click(function() {
    $(".js-modal").fadeOut(modalTime);
  });

  function modalResize() {
    let h = $(window).height(),
        w = $(window).width(),
        mh = $(".js-modal__field").outerHeight(),
        mw = $(".js-modal__field").outerWidth();
    $(".js-modal__field").css({
      "top": ((h-mh)/2) + "px",
      "left": ((w-mw)/2) + "px",
    });
  };
  $(".js-prevent-window-scroll").on("mousewheel", function () {
    $("body").css({overflow: "hidden"});
    clearTimeout(timer);
    timer = setTimeout(function () {
      $("body").css({overflow: "inherit"});
    }, 200);
  });
});
