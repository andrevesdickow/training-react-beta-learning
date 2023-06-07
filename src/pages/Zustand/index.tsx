import { Layout } from '@/components/Layout';
import { useDialogStore } from '@/stores/dialogStore';
import { Button, Typography } from '@mui/material';

/**
 * Gerenciador de estado rápido e escalável
 * @see https://github.com/pmndrs/zustand
 * @returns JSX.Element
 */
export const ZustandPage = () => {
  const { handleOpenDialog } = useDialogStore();
  // OR
  // const handleOpenDialog = useDialogStore((state) => state.handleOpenDialog);

  return (
    <Layout>
      <Typography variant='h4' textAlign="center">Zustand</Typography>
      <Button
        type='button'
        onClick={() => handleOpenDialog({
          message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam incidunt soluta voluptatibus quam totam molestias expedita earum, facilis qui autem vero! Laboriosam voluptates est sint libero repudiandae corporis dolorem accusantium!',
          title: 'Modal de teste'
        })}
      >
        Abrir modal
      </Button>
    </Layout>
  );
};
