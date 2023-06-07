import { useReducer } from 'react';

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
  LinearProgress,
  Box
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { Layout } from '@/components/Layout';
import { fakeRequest } from '@/utils/fakeRequest';
import mockData from '@/utils/mock/mockData.json';

type People = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

type ActionType =
  {type: 'page'; page: number;} |
  {type: 'pageSize'; pageSize: number;}

type ReducerState = {
  page: number;
  pageSize: number;
}

async function getPeople(page: number, pageSize: number) {
  const data = mockData.slice(
    page * pageSize,
    page * pageSize + pageSize,
  );

  const response = await fakeRequest(1500, data);
  return response;
}

function tableReducer(prevState: ReducerState, action: ActionType) {
  if (action.type === 'page') {
    return {
      ...prevState,
      page: action.page
    };
  } else if (action.type === 'pageSize') {
    return {
      ...prevState,
      pageSize: action.pageSize,
      page: 0
    };
  }

  return prevState;
}

/**
 * People Table
 * @see https://tanstack.com/query/v4
 * @see https://react.dev/reference/react/useReducer
 * @see https://react.dev/reference/react/useState
 * @returns JSX.Element
 */
export const ReactQueryPeoplePage = () => {
  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(5);

  const [state, dispatch] = useReducer(tableReducer, {
    page: 0,
    pageSize: 5
  });

  const { data, isFetching } = useQuery<People[]>({
    queryKey: ['/people', { page: state.page, pageSize: state.pageSize }],
    queryFn: () => getPeople(state.page, state.pageSize),
      keepPreviousData: true, // se mantém dados anteriores enquanto faz novo get
      staleTime: Infinity,
      // retry: false,
      onSuccess(response) {
        console.info(response);
      },
      onError(err) {
        console.error(err);
      }
    });

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    // setPage(newPage);
    dispatch({ type: 'page', page: newPage });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setPageSize(parseInt(event.target.value, 10));
    // setPage(0);
    dispatch({ type: 'pageSize', pageSize: parseInt(event.target.value, 10) });
  };

  return (
    <Layout>
      <Paper>
        {isFetching && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Id</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Sobrenome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Sexo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' width={200} noWrap>
                      {row.first_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' width={200} noWrap>
                      {row.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mockData.length}
          // rowsPerPage={pageSize}
          // page={page}
          rowsPerPage={state.pageSize}
          page={state.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
};
