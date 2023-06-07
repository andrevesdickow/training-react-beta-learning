import { filter } from 'lodash';
import { create } from 'zustand';

type DialogProps = {
  dialogId: string;
  open: boolean;
  title: string;
  message: string;
}

type DialogStoreType = {
  items: DialogProps[],
  handleOpenDialog: (item: Pick<DialogProps, 'title' | 'message'>) => void;
  handleCloseDialog: (dialogId: string) => void;
}

// função `set` faz o merge do estado
export const useDialogStore = create<DialogStoreType>((set, get) => ({
  items: [],
  handleCloseDialog: (dialogId) =>
    set((oldState) => ({
      items: filter(oldState.items, (item) => item.dialogId !== dialogId)
    })),
  handleOpenDialog(item) {
    const dialog = {
      dialogId: crypto.randomUUID(),
      open: true,
      ...item
    } satisfies DialogProps;
    // Não atribui um tipo, apenas fornece ao compilador para verificar se contempla o tipo

    get().items;

    set((oldState) => ({ items: [...oldState.items, dialog] }));
  }
}));
