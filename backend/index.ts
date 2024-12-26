import Bun from 'bun';

const PORT = 3000;

interface Post {
  id: number;
  title: string;
  content: string;
}

let posts: Post[] = [];

const handleGetAllPosts = () => {
  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handleGetPost = (id: number) => {
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return new Response('Post Not Found', { status: 404 });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handleCreatePost = (title: string, content: string) => {
  const newPost: Post = { id: posts.length + 1, title, content };
  posts.push(newPost);
  return new Response(JSON.stringify(newPost), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handleUpdatePost = (id: number, title: string, content: string) => {
  const post = posts.findIndex((post) => post.id === id);

  if (post === -1) {
    return new Response('Post Not Found', { status: 404 });
  }

  posts[post] = { ...posts[post], title, content };

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

const handleDeletePost = (id: number) => {
  const post = posts.findIndex((post) => post.id === id);

  if (post === -1) {
    return new Response('Post Not Found', { status: 404 });
  }

  posts = posts.filter((post) => post.id !== id);
  return new Response('Post Deleted', { status: 200 });
};

const server = Bun.serve({
  port: PORT,
  async fetch(request) {
    const { method } = request;
    const { pathname } = new URL(request.url);

    const pathRegexForId = /^\/api\/posts\/(\d+)/;

    if (method === 'GET') {
      const match = pathname.match(pathRegexForId);
      const id = match && match[1];

      if (id) {
        return handleGetPost(Number(id));
      }
    }

    if (method === 'GET' && pathname === '/api/posts') {
      return handleGetAllPosts();
    }

    if (method === 'POST' && pathname === '/api/posts') {
      const newPost = await request.json();

      if (newPost.title && newPost.content) {
        return handleCreatePost(newPost.title, newPost.content);
      }
    }

    if (method === 'PATCH') {
      const match = pathname.match(pathRegexForId);
      const id = match && match[1];

      if (id) {
        const updatedPost = await request.json();

        if (updatedPost.title && updatedPost.content) {
          return handleUpdatePost(Number(id), updatedPost.title, updatedPost.content);
        }
      }
    }

    if (method === 'DELETE') {
      const { id } = await request.json();

      if (id) {
        return handleDeletePost(Number(id));
      }
    }

    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Listening on PORT: ${server.port}`);
