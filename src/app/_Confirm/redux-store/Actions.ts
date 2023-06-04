const openConfirm = ({body, title, callback}) => {
  setIsOpen(true);
  setParams({body, title, callback});
}

const closeConfirm = () => {
  setIsOpen(false);
  setParams({});
}

const onConfirm = () => {
  close();
  params.callback(true);
};

const onDismiss = () => {
  close();
  params.callback(false);
};

export default {
  openConfirm,
  closeConfirm,
  onConfirm,
  onDismiss,
};
