const modalTime = 200;

$(function() {
  $(".open-edit-modal").click(function() {
    modalResize();
    $("#modal-bg, #modal-field, #edit-todo").fadeIn(modalTime);
    let todo = $(this).data('todo');
    let action = $('#editForm').attr('action');
    action += todo._id + '?_method=PUT';
    $('#editForm').attr('action', action);
    $('#editTitle').attr('value', todo.todo);
    $('#editBody').val(todo.description);
  });

  $("#open-create-modal").click(function() {
    modalResize();
    $("#modal-bg, #modal-field, #create-todo").fadeIn(modalTime);
    $('#edit-todo').hide();
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
});

// TODO もっといいモーダルの作り方を考える
