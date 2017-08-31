//--------------- BEGIN MODULE SCOPE VARIABLES ---------------

let
  configMap = {
    modalFadeTime: 200,
    cardMoveOpacity: 0.8
  },
  jqueryMap = {},

  timer,
  setJqueryMap, categorySortable, modalResize,
  modalCreateOpen, modalEditOpen, modalHideAndSeek, closeModals,
  initModule;

//---------------- END MODULE SCOPE VARIABLES ----------------


//-------------------- BEGIN DOM METHODS ---------------------
// Begin DOM method /name/
// End DOM method /name/

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
  jqueryMap = {
    categoryBody: $('.c-column-field__category__body'),
    modalCreateOpen: $('.js-modal--create__open'),
    modalEditOpen: $('.js-modal--edit__open'),
    modalBackground: $('.js-modal__background'),
    modalField: $('.js-modal__field'),
    modalCreate: $('.js-modal-create'),
    modalCreateClass: '.js-modal-create',
    modalEdit: $('.js-modal-edit'),
    modalEditClass: '.js-modal-edit',
    modalContent: $('.js-modal-content'),
    modalEditForm: $('.editForm'),
    modalEditTitle: $('.editTitle'),
    modalEditCreatedAt: $('.editCreatedAt'),
    modalEditDescription: $('.editDescription'),
    modalEditID: $('#editID'),
    modals: $('.js-modal')
  };
};
// End DOM method /setJqueryMap/

// Begin DOM method /categorySortable/
// Purpose: make category__body interactive with jQuery's sortable
//
categorySortable = function() {
  jqueryMap.categoryBody.sortable({
    connectWith: jqueryMap.categoryBody,
    opacity: configMap.cardMoveOpacity,
    stop: function(event, ui) {
      // console.log($(ui.item).attr('data-todo'));
      // console.log($(this).parent().attr('id'));
      // TODO 移動した先のカテゴリを取得する
      // TODO 変更した内容をajaxでDBに保存する
    }
  });
};
// End DOM method /categorySortable/

// Begin DOM method /modalResize/
// Purpose: Resize the modal size every time opened
//
modalResize = function() {
  let
    h = $(window).height(),
    w = $(window).width(),
    mh = jqueryMap.modalField.outerHeight(),
    mw = jqueryMap.modalField.outerWidth();

  jqueryMap.modalField.css({
    "top": ((h-mh)/2) + "px",
    "left": ((w-mw)/2) + "px"
  });
};
// End DOM method /modalResize/

// Begin DOM method /modalHideAndSeek/
// Purpose: Hide unrelated modal content
//
modalHideAndSeek = function(targetContent) {
  $(`.js-modal-content:not(${targetContent})`).hide();
};
// End DOM method /modalHideAndSeek/


// Begin DOM method /modalCreateOpen/
// Purpose: open edit modal
//
modalCreateOpen = function() {
  modalResize();
  jqueryMap.modalBackground.fadeIn(configMap.modalFadeTime);
  jqueryMap.modalField.fadeIn(configMap.modalFadeTime);
  jqueryMap.modalCreate.fadeIn(configMap.modalFadeTime);
  modalHideAndSeek(jqueryMap.modalCreateClass);
};
// End DOM method /modalCreateOpen/

// Begin DOM method /modalEditOpen/
modalEditOpen = function() {
  let
    todo = $(this).data('todo'),
    action = jqueryMap.modalEditForm.attr('action') + todo._id + '?_method=PUT';

  modalResize();
  jqueryMap.modalBackground.fadeIn(configMap.modalFadeTime);
  jqueryMap.modalField.fadeIn(configMap.modalFadeTime);
  jqueryMap.modalEdit.fadeIn(configMap.modalFadeTime);
  jqueryMap.modalContent
  modalHideAndSeek(jqueryMap.modalEditClass);
  jqueryMap.modalEditForm.attr('action', action);
  jqueryMap.modalEditTitle.html(todo.title);
  jqueryMap.modalEditCreatedAt.html('Create at: '+todo.contents[0].createdAt);
  jqueryMap.modalEditDescription.html(todo.contents[0].description);
  jqueryMap.modalEditID.attr('value', todo._id);
};
// End DOM method /modalEditOpen/

// Begin DOM method /closeModals/
// Purpose: close modal-related objects
//
closeModals = function(){
  jqueryMap.modals.fadeOut(configMap.modalFadeTime);
};
// End DOM method /closeModals/

//--------------------- END DOM METHODS ----------------------


//------------------- BEGIN PUBLIC METHODS -------------------
// Begin Public method /name/
// End Public method /name/

initModule = function() {
  setJqueryMap();
  categorySortable();
  jqueryMap.modalCreateOpen.click(modalCreateOpen);
  jqueryMap.modalEditOpen.click(modalEditOpen);
  jqueryMap.modalBackground.click(closeModals);
};

//-------------------- END PUBLIC METHODS --------------------


//-------------------- INIT THIS MODULE ----------------------
initModule();
