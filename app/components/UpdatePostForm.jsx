// app/components/UpdatePostForm.jsx
'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Alert, Box, Snackbar } from '@mui/material';
import { updatePost } from '@/services/api';

export default function UpdatePostForm({ post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Title and Body are required');
      setSnackbarOpen(true);
      return;
    }

    try {
      const updatedPost = { ...post, title, body };
      const apiResponse = await updatePost(updatedPost.id, updatedPost);
      setResponse(apiResponse);
      setError('');
      setSnackbarOpen(true);
      // Wait for 2 seconds before redirecting to show the success message
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError('Failed to update post. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Update Post
        </Button>
      </Box>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={error ? "error" : "success"} 
          sx={{ width: '100%' }}
        >
          {error ? error : (
            <div>
              Post updated successfully!
              {response && (
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8em', marginTop: '8px' }}>
                  {JSON.stringify(response, null, 2)}
                </pre>
              )}
            </div>
          )}
        </Alert>
      </Snackbar>
    </Box>
  );
}
