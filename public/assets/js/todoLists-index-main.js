
// --------------- BEGIN MODULE SCOPE VARIABLES ---------------

const configMap = {
  modalFadeTime: 200,
  cardMoveOpacity: 0.8,
};
let jqueryMap = {};

// ---------------- END MODULE SCOPE VARIABLES ----------------


// -------------------- BEGIN DOM METHODS ---------------------
// Begin DOM method /name/
// End DOM method /name/

// Begin DOM method /setJqueryMap/
const setJqueryMap = () => {
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
    modals: $('.js-modal'),
  };
};
// End DOM method /setJqueryMap/

// Begin DOM method /categorySortable/
// Purpose: make category__body interactive with jQuery's sortable
//
const categorySortable = () => {
  jqueryMap.categoryBody.sortable({
    connectWith: jqueryMap.categoryBody,
    opacity: configMap.cardMoveOpacity,
    stop: (event, ui) => {
      console.log(ui.item.attr('data-todo'));
      console.log(event.currentTarget);
      // TODO 移動した先のカテゴリを取得する
      // TODO 変更した内容をajaxでDBに保存する
    },
  });
};
// End DOM method /categorySortable/

// Begin DOM method /modalResize/
// Purpose: Resize the modal size every time opened
//
const modalResize = () => {
  const h = $(window).height();
  const w = $(window).width();
  const mh = jqueryMap.modalField.outerHeight();
  const mw = jqueryMap.modalField.outerWidth();

  jqueryMap.modalField.css({
    top: `${((h - mh) / 2)}px`,
    left: `${((w - mw) / 2)}px`,
  });
};
// End DOM method /modalResize/

// Begin DOM method /modalHideAndSeek/
// Purpose: Hide unrelated modal content
//
const modalHideAndSeek = (targetContent) => {
  $(`.js-modal-content:not(${targetContent})`).hide();
};
// End DOM method /modalHideAndSeek/


// Begin DOM method /modalCreateOpen/
// Purpose: open edit modal
//
const modalCreateOpen = () => {
  modalResize();
  jqueryMap.modalBackground.fadeIn(configMap.modalFadeTime);
  jqueryMap.modalField.fadeIn(configMap.modalFadeTime);
  jqueryMap.modalCreate.fadeIn(configMap.modalFadeTime);
  modalHideAndSeek(jqueryMap.modalCreateClass);
};
// End DOM method /modalCreateOpen/

// Begin DOM method /modalEditOpen/
const modalEditOpen = () => {
  const todo = $(this).data('todo');
  const action = `${jqueryMap.modalEditForm.attr('action')}${todo._id}?_method=PUT`;

  modalResize();
  jqueryMap.modalBackground.fadeIn(configMap.modalFadeTime);
  jqueryMap.modalField.fadeIn(configMap.modalFadeTime);
  jqueryMap.modalEdit.fadeIn(configMap.modalFadeTime);
  // jqueryMap.modalContent
  modalHideAndSeek(jqueryMap.modalEditClass);
  jqueryMap.modalEditForm.attr('action', action);
  jqueryMap.modalEditTitle.html(todo.title);
  jqueryMap.modalEditCreatedAt.html(`Create at: ${todo.contents[0].createdAt}`);
  jqueryMap.modalEditDescription.html(todo.contents[0].description);
  jqueryMap.modalEditID.attr('value', todo._id);
};
// End DOM method /modalEditOpen/

// Begin DOM method /closeModals/
// Purpose: close modal-related objects
//
const closeModals = () => {
  jqueryMap.modals.fadeOut(configMap.modalFadeTime);
};
// End DOM method /closeModals/

// --------------------- END DOM METHODS ----------------------


// ------------------- BEGIN PUBLIC METHODS -------------------
// Begin Public method /name/
// End Public method /name/

const initModule = () => {
  setJqueryMap();
  categorySortable();
  jqueryMap.modalCreateOpen.click(modalCreateOpen);
  jqueryMap.modalEditOpen.click(modalEditOpen);
  jqueryMap.modalBackground.click(closeModals);
};

// -------------------- END PUBLIC METHODS --------------------


// -------------------- INIT THIS MODULE ----------------------
initModule();
