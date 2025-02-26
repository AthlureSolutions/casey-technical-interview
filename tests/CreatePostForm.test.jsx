// tests/CreatePostForm.test.jsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import CreatePostForm from '../app/components/CreatePostForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the api service
const mockCreatePost = vi.fn();
vi.mock('@/services/api', () => ({
  createPost: () => mockCreatePost(),
}));

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {component}
    </ThemeProvider>
  );
};

describe('CreatePostForm', () => {
  beforeEach(() => {
    mockCreatePost.mockClear();
  });

  it('renders the form', () => {
    renderWithTheme(<CreatePostForm />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create post/i })).toBeInTheDocument();
  });

  it('shows error when submitting empty form', async () => {
    renderWithTheme(<CreatePostForm />);
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /create post/i }));
    });
    
    await waitFor(() => {
      const alerts = screen.getAllByText('Title and Body are required');
      expect(alerts.length).toBeGreaterThan(0);
    });
  });

  it('submits form successfully', async () => {
    mockCreatePost.mockResolvedValueOnce({ id: 1, title: 'Test', body: 'Test body' });

    renderWithTheme(<CreatePostForm />);
    
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
