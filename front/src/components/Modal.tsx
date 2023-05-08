import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleYes: () => void;
  handleNo: () => void;
  title: string
};

export default function Modal({
  isOpen,
  onClose,
  handleYes,
  handleNo,
  title
}: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleNo} color="primary">
          Нет
        </Button>
        <Button onClick={handleYes} color="primary" autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
}
