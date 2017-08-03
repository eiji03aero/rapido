const modalTime = 200;

$(".open-edit-modal").click(function() {
  modalResize();
  $("#modal-bg, #edit-modal").fadeIn(modalTime);
});

$("#open-create-modal").click(function() {
  modalResize();
  $("#modal-bg, #modal-field, #create-todo").fadeIn(modalTime);
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
