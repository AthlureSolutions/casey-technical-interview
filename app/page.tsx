// app/page.jsx
import PostList from './components/PostList';
import { fetchPosts, fetchComments } from '../services/api';
import { Typography } from '@mui/material';

export default async function Home() {
  let posts = [];
  let comments = [];
  try {
    posts = await fetchPosts();
    comments = await fetchComments();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      <PostList posts={posts} comments={comments} />
    </div>
  );
}
