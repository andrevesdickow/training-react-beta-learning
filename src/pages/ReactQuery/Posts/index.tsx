import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Tooltip,
  IconButton,
  Box,
  LinearProgress,
  Button
} from '@mui/material';
import { Comment as CommentIcon } from '@mui/icons-material';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Layout } from '@/components/Layout';
import { queryClient } from '@/services/queryClient';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string
}

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const result = await response.json();
  return result;
}

async function createPost(newPost: Post) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newPost)}
  );
  const result = await response.json();
  return result;
}

/**
 * Posts Table
 * @see https://tanstack.com/query/v4
 * @see https://react.dev/reference/react/useState
 * @see https://react.dev/reference/react/useMemo
 * @returns JSX.Element
 */
export const ReactQueryPostsPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { isLoading, data } = useQuery<Post[]>({
    queryKey: ['/posts'],
    queryFn: getPosts,
    staleTime: 60 * 1000, // 1 minute
  });

  const newPostMutation = useMutation({
    mutationKey: ['/posts'],
    mutationFn: (newPost: Post) => {
      return createPost(newPost);
    },
    onSuccess(data, variables) {
      console.warn({
        data, variables
      });
      queryClient.invalidateQueries({
        queryKey: ['/posts']
      });
    }
  });

  const visibleRows = useMemo(
    () => {
      if (!data) return [];

      return data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
    },
    [data, page, rowsPerPage],
  );

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout>
      <Paper>
        <Button
          type="button"
          onClick={() => {
            newPostMutation.mutate({
              body: 'Novo Post',
              id: 101,
              title: 'Novo',
              userId: 1
            });
          }}
          >
            Novo
          </Button>
        {isLoading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Id</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Mensagem</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' width={200} noWrap>
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' width={300} noWrap>
                      {row.body}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Ver comentários" placement='right'>
                      <IconButton
                        color='primary'
                        onClick={() => navigate(`/react-query/posts/${row.id}`)}
                      >
                        <CommentIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
};
