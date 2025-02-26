// app/components/PostItem.jsx
'use client';

import Link from 'next/link';
import * as React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

export default function PostItem({ post, comments }) {
  return (
    <Card className="mb-3">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {post.body}
        </Typography>
        <Link href={`/edit/${post.id}`}>
          <Button variant="outlined" color="primary">
            Edit Post
          </Button>
        </Link>
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Comments:
          </Typography>
          {comments.map((comment) => (
            <Box key={comment.id} className="border-t pt-1 mt-1">
              <Typography variant="subtitle2">{comment.name}</Typography>
              <Typography variant="body2">{comment.body}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
