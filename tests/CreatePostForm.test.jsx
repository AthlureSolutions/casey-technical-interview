// tests/CreatePostForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CreatePostForm from '../app/components/CreatePostForm';

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the api service
vi.mock('@/services/api', () => ({
  createPost: vi.fn(),
}));

describe('CreatePostForm', () => {
  it('renders the form', () => {
    render(<CreatePostForm />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create post/i })).toBeInTheDocument();
  });

  it('shows error when submitting empty form', async () => {
    render(<CreatePostForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /create post/i }));
    
    expect(await screen.findByText('Title and Body are required')).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    const mockCreatePost = vi.fn().mockResolvedValue({ id: 1, title: 'Test', body: 'Test body' });
    vi.mock('@/services/api', () => ({
      createPost: mockCreatePost,
    }));

    render(<CreatePostForm />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test Content' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /create post/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Post created successfully!')).toBeInTheDocument();
    });
  });
});
