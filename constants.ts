import { BlogPost, Project } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Why I Still Use Vim in 2077',
    date: '2024-05-12',
    excerpt: 'Modal editing is the future, past, and present. Here is why your mouse is slowing you down.',
    content: `
      <p>It starts with a simple <code>:q!</code> and ends with you remapping your entire keyboard layout to Colemak-DH.</p>
      <p>Vim is not just a text editor; it is a way of life. When the neural interfaces finally arrive, I bet they will use hjkl for navigation.</p>
      <h3>The Speed</h3>
      <p>Nothing beats the raw speed of text objects. ci" to change inside quotes? Pure magic.</p>
    `,
    tags: ['VIM', 'PRODUCTIVITY', 'CLI']
  },
  {
    id: '2',
    title: 'CSS Grid vs Flexbox: The Final War',
    date: '2024-04-28',
    excerpt: 'Two titans enter, one titan leaves. Or maybe they just coexist peacefully?',
    content: `
      <p>We used to float left. We used to clear fixes. Now we have display: grid and display: flex.</p>
      <p>Use Grid for layout, Flex for components. It is that simple. Don't overcomplicate your 2D structures.</p>
    `,
    tags: ['CSS', 'WEBDEV', 'FRONTEND']
  },
  {
    id: '3',
    title: 'Simulating Reality with WebGL',
    date: '2024-03-15',
    excerpt: 'A deep dive into fragment shaders and how to make your GPU cry.',
    content: `
      <p>Pixels are just little windows into a mathematical void. With WebGL, we can paint that void.</p>
      <p>Today we explore raymarching signed distance fields (SDFs) to create infinite landscapes in under 4KB of code.</p>
    `,
    tags: ['WEBGL', 'GRAPHICS', 'MATH']
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'NEON_NOTES',
    description: 'A markdown note-taking app that looks like a 1980s terminal but syncs to the cloud.',
    techStack: ['React', 'Firebase', 'Tailwind'],
    link: '#',
    status: 'ONLINE'
  },
  {
    id: '2',
    name: 'SYNTH_WAVE_GEN',
    description: 'AI-powered music generator that creates lo-fi synth tracks for coding.',
    techStack: ['Python', 'TensorFlow', 'Audio API'],
    link: '#',
    status: 'BETA'
  },
  {
    id: '3',
    name: 'VOID_MAIL',
    description: 'A secure, encrypted email client that deletes messages after 24 hours.',
    techStack: ['Node.js', 'Cryptography', 'Socket.io'],
    link: '#',
    status: 'OFFLINE'
  },
  {
    id: '4',
    name: 'RETRO_CAM',
    description: 'Web-based image processor applying dithering and CRT effects to uploaded photos.',
    techStack: ['Canvas API', 'WASM', 'Rust'],
    link: '#',
    status: 'ONLINE'
  },
  {
    id: '5',
    name: 'SHORT_TRANSCRIPT',
    description: 'Automated transcription service for short-form video content (YouTube Shorts, TikTok, Reels) using OpenAI Whisper.',
    techStack: ['Python', 'Flask', 'Whisper', 'Cloud Run'],
    link: '/transcript',
    status: 'ONLINE'
  }
];