const modalTime = 200;

$(function() {
  var timer = null;
  $('.modals').hide();
  $(".open-edit-modal").click(function() {
    modalResize();
    $("#modal-bg, #modal-field, #edit-todo").fadeIn(modalTime);
    $('.modal-content:not(#edit-todo)').hide();
    let todo = $(this).data('todo'),
        action = $('#editForm').attr('action') + todo._id + '?_method=PUT';
    $('#editForm').attr('action', action);
    $('#editTitle').html(todo.title);
    $('.description-body p').html(todo.contents[0].description);
    $('#editID').attr('value', todo._id);
    $('#createdAt p').html("Created at: "+todo.contents[0].createdAt);
    console.log(todo);
  });

  $("#open-create-modal").click(function() {
    modalResize();
    $("#modal-bg, #modal-field, #create-todo").fadeIn(modalTime);
    $('.modal-content:not(#create-todo)').hide();
  });

  $("#modal-bg").click(function() {
    $(".modals").fadeOut(modalTime);
  });

  function modalResize() {
    let h = $(window).height(),
        w = $(window).width(),
        mh = $("#modal-field").outerHeight(),
        mw = $("#modal-field").outerWidth();
    $("#modal-field").css({
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
