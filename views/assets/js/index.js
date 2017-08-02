const modalTime = 200;
$(".open-edit-modal").click(function() {
  editModalResize();
  $("#modal-bg, #edit-modal").fadeIn(modalTime);
});
$("#modal-bg").click(function() {
  $("#modal-bg, #edit-modal, #delete-modal").fadeOut(modalTime);
});

$("#open-delete-modal").click(function() {
  deleteModalResize();
  $("#modal-bg, #delete-modal").fadeIn(modalTime);
});

function editModalResize() {
  let h = $(window).height(),
      w = $(window).width(),
      mh = $("#edit-modal").outerHeight(),
      mw = $("#edit-modal").outerWidth();
  $("#edit-modal").css({
    "top": ((h-mh)/2) + "px",
    "left": ((w-mw)/2) + "px",
  });
};

function deleteModalResize() {
  let h = $(window).height(),
      w = $(window).width(),
      mh = $("#delete-modal").outerHeight(),
      mw = $("#delete-modal").outerWidth();
  $("#delete-modal").css({
    "top": ((h-mh)/2) + "px",
    "left": ((w-mw)/2) + "px",
  });
}
