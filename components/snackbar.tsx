import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'next-i18next';

export interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
  onClick?: () => void;

}

export const BottomSnackbar = forwardRef((props, ref) => {
  const { t } = useTranslation("common");

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  });
  const { vertical, horizontal, open, message } = state;

  const close = () => {setState({ ...state, open: false });}

  useImperativeHandle(ref, () => ({

    handleClick(message: string) {
      setState({ open: true, vertical: 'bottom', horizontal: 'center', message });
    },
    handleClose() {
      close();
    }
  }));

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={6000}
      onClose={close}
      message={message}
      key={vertical + horizontal}
    />
  );
});

BottomSnackbar.displayName = 'BottomSnackbar';

export default BottomSnackbar;