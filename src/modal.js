export default  () => {
  const divModal = document.createElement('div');
  divModal.classList.add('modal', 'fade');
  divModal.id = 'modal';
  divModal.dataset.bsBackdrop = 'static';
  divModal.dataset.bsKeyboard = false;
  divModal.setAttribute('tabindex', '-1');
  divModal.setAttribute('aria-labeledby', 'modal');
  divModal.ariaHidden = true;
  divModal.style = 'display: none;';
  divModal.role = 'dialog';

  const divHeader = document.createElement('div');
  divHeader.classList.add('modal-header');
  const modalTitle = document.createElement('h5');
  modalTitle.classList.add('modal-title');
  modalTitle.id = 'modalHeader';

  const buttonHeader = document.createElement('button');
  buttonHeader.type = 'button';
  buttonHeader.classList.add('btn-close');
  buttonHeader.dataset.bsDismiss = 'modal';
  buttonHeader.ariaLabel = 'Close';
  divHeader.append(modalTitle, buttonHeader);

  const divBody = document.createElement('div');
  divBody.classList.add('modal-body');
  divBody.id = 'modalBody';

  const divFooter = document.createElement('div');
  divFooter.classList.add('modal-footer');
  const buttonClose = document.createElement('button');
  buttonClose.type = 'button';
  buttonClose.classList.add('btn', 'btn-outline-secondary');
  buttonClose.setAttribute('data-bs-dismiss', 'modal');
  buttonClose.textContent = 'Закрыть';
  const buttonRedirect = document.createElement('button');
  buttonRedirect.type = 'button';
  buttonRedirect.classList.add('btn', 'btn-outline-primary');
  buttonRedirect.id = 'redirect';
  
  const a = document.createElement('a');
  a.textContent = 'Читать статью';
  a.setAttribute('target', '_blank');
  buttonRedirect.appendChild(a);
  divFooter.append(buttonClose, buttonRedirect);

  const divContent = document.createElement('div');
  divContent.classList.add('modal-content');
  divContent.append(divHeader, divBody, divFooter);
  const divDialog = document.createElement('div');
  divDialog.classList.add('modal-dialog');
  divDialog.appendChild(divContent);
  divModal.appendChild(divDialog);
  return divModal;
};
