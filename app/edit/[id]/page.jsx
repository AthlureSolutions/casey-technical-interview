// app/edit/[id]/page.jsx
import { fetchPosts } from '@/services/api';
import UpdatePostForm from '@/app/components/UpdatePostForm';
import { Typography } from '@mui/material';
import { notFound } from 'next/navigation';

export default async function EditPage({ params }) {
  // Await the entire params object first
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  let posts = [];
  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  
  const post = posts.find((p) => p.id.toString() === id.toString());

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Edit Post
      </Typography>
      <UpdatePostForm post={post} />
    </div>
  );
}
