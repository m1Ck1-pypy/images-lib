import Bun, { randomUUIDv7 } from 'bun';

const PORT = 3000;

interface Post {
  id: number;
  title: string;
  content: string;
}

let posts: Post[] = [];
const images: { id: string; image: string }[] = [];

const CORS_HEADERS: ResponseInit = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
};

const handleGetAllPosts = () => {
  return new Response(JSON.stringify(images), { status: 200, headers: CORS_HEADERS.headers });
};

const handleGetPost = (id: number) => {
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return new Response('Post Not Found', { status: 404, headers: CORS_HEADERS.headers });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: CORS_HEADERS.headers,
  });
};

const handleCreatePost = async (req: Request) => {
  const formdata = await req.formData();

  const file = formdata.get('file') as File;

  if (!formdata.has('file')) {
    return new Response('Image Not Found', { status: 404, headers: CORS_HEADERS.headers });
  }

  const buffer = await file!.arrayBuffer();
  const blob = new Blob([buffer], { type: `${file!.type}` });

  const arrayBuffer = await blob.arrayBuffer();

  const base64 = Buffer.from(arrayBuffer).toString('base64');
  images.unshift({ id: randomUUIDv7(), image: `data:image/png;base64,${base64}` });

  const responce = new Response(JSON.stringify(images), {
    status: 201,
    headers: { ...CORS_HEADERS.headers, 'Content-Type': `${file!.type}` },
  });

  return responce;
};

const handleUpdatePost = (id: number, { title, content }: Post) => {
  const post = posts.findIndex((post) => post.id === id);

  if (post === -1) {
    return new Response('Post Not Found', { status: 404, headers: CORS_HEADERS.headers });
  }

  posts[post] = { ...posts[post], title, content };

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: CORS_HEADERS.headers,
  });
};

const handleDeletePost = (id: number) => {
  const post = posts.findIndex((post) => post.id === id);

  if (post === -1) {
    return new Response('Post Not Found', { status: 404 });
  }

  posts = posts.filter((post) => post.id !== id);
  return new Response('Post Deleted', { status: 200, headers: CORS_HEADERS.headers });
};

const server = Bun.serve({
  port: PORT,
  async fetch(request: Request) {
    const { method } = request;
    const { pathname } = new URL(request.url);

    const pathRegexForId = /^\/posts\/(\d+)/;

    if (method === 'GET') {
      const match = pathname.match(pathRegexForId);
      const id = match && match[1];

      if (id) {
        return handleGetPost(Number(id));
      }
    }

    if (method === 'GET' && pathname === '/posts') {
      return handleGetAllPosts();
    }

    if (method === 'POST' && pathname === '/posts/create') {
      return handleCreatePost(request);
    }

    if (method === 'PATCH') {
      const match = pathname.match(pathRegexForId);
      const id = match && match[1];

      if (id) {
        const updatedPost = await request.json();

        if (updatedPost.title && updatedPost.content) {
          return handleUpdatePost(Number(id), updatedPost);
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
