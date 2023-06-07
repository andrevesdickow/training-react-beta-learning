import { useLoaderData, useParams } from 'react-router-dom';

import { List, ListItem, ListItemText, Typography } from '@mui/material';

import { Layout } from '@/components/Layout';

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

/**
 * Posts Comments
 * @see https://reactrouter.com/en/main/route/lazy
 * @see https://reactrouter.com/en/main/route/loader
 * @see https://reactrouter.com/en/main/hooks/use-loader-data
 * @see https://reactrouter.com/en/main/hooks/use-params
 * @returns JSX.Element
 */
export const ReactQueryPostCommentsPage = () => {
  const data = useLoaderData() as Comment[];
  const params = useParams();

  console.warn({ params });

  return (
    <Layout>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {data.map((comment) => (
          <ListItem key={comment.id} alignItems="flex-start">
            <ListItemText
              primary={comment.email}
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.name}
                  </Typography>
                  &nbsp;{comment.body}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};
