import { createPortal } from 'react-dom';
import { isEmpty, map } from 'lodash';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { useDialogStore } from '@/stores/dialogStore';

export const DialogContainer = () => {
  const { items, handleCloseDialog } = useDialogStore();

  if (isEmpty(items)) return null;

  return createPortal(map(items, (item) => (
    <Dialog
      key={item.dialogId}
      open={item.open}
      onClose={() => handleCloseDialog(item.dialogId)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {item.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {item.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseDialog(item.dialogId)}>Cancelar</Button>
        <Button onClick={() => handleCloseDialog(item.dialogId)} autoFocus>
          Li e aceito os termos
        </Button>
      </DialogActions>
    </Dialog>
  )), document.body);
};
