// app/components/CreatePostForm.jsx
'use client';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Alert, Box, Snackbar, Typography } from '@mui/material';
import { createPost } from '@/services/api';

export default function CreatePostForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) {
      setError('Title and Body are required');
      setSnackbarOpen(true);
      return;
    }

    try {
      const newPost = await createPost(formData);
      setResponse(newPost);
      setError('');
      setSnackbarOpen(true);
      // Wait for 2 seconds before redirecting to show the success message
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError('Failed to create post. Please try again.');
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
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Post
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        {error && <Alert severity="error" role="alert" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          fullWidth
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Content"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          margin="normal"
          multiline
          rows={4}
        />
        <Button 
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Post
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
          role="alert"
          sx={{ width: '100%' }}
        >
          {error ? error : (
            <div>
              Post created successfully!
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
