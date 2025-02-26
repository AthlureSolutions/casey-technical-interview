'use client';
import React, { useState, useRef, useEffect } from 'react';
import PostItem from './PostItem';

export default function InfinitePostList({ posts, comments }) {
  const [visibleCount, setVisibleCount] = useState(10);
  const loader = useRef(null);

  useEffect(() => {
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setVisibleCount((prev) => Math.min(prev + 10, posts.length));
      }
    };

    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [posts.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {posts.slice(0, visibleCount).map((post) => (
        <PostItem
          key={post.id}
          post={post}
          comments={comments.filter((c) => c.postId === post.id)}
        />
      ))}
      {visibleCount < posts.length && (
        <div ref={loader} className="col-span-3 p-4 text-center">
          Loading more posts...
        </div>
      )}
    </div>
  );
}
