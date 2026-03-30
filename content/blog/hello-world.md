---
title: "Hello World!: The first blog post"
date: "2026-03-30"
description: "The first post on my blog, detailing how it's built."
tags: ["web", "dev", "blog"]
draft: false
---

I've been meaning to get around to writing a proper blog at some point, for things like:

- Technical articles on things I've learned about or recently implemented
- Opinion pieces on things I've thought about
- Anything else I want to write about and publish on my website

## How the blog is built

This blog is in the same project as my portfolio site for consistent styling and theming, I debated a separate project and allowing for `blog.yaqinhasan.com` to work, but I decided against it for the maintenance overhead.

- **Vue & TypeScript & Vite SSG & Tailwind CSS** for the UI, this is the same stuff the site is built with. SSG is so that everything is pre-rendered to HTML for SEO and GEO.
- **Markdown** files for simple authoring of the blog posts, I just write portable `.md` files and the build system handles the rest. Also makes it really easy to port these files to different platforms.

### Code Highlighting

The blog supports theme-aware syntax highlighting out of the box:

```typescript
const greeting = (name: string): string => `Hello, ${name}! Welcome to the blog.`;

console.log(greeting("World"));
```

```python
def fibonacci(n: int) -> list[int]:
    """Generate the first n Fibonacci numbers."""
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib[:n]

print(fibonacci(10))
```

### Embedded Content (Images)

You can embed saved images from the `content/blog/images/..` directory using standard md embedding syntax:

![image](/content/blog/images/coconut.jpg)

Or you can use a url for online images (this is the same image, just served from the internet):

![image](https://preview.redd.it/this-is-inside-the-tf2-game-files-as-why-v0-vw6c9iwr6rk51.jpg?auto=webp&s=e7afd0eb74dc2572e7c50cee902cda7c140d6a74)

This is the iconic `coconut.jpg`, which is load-bearing in the TF2 codebase.

### Embedded Content (Video)

You can embed YouTube videos and other external content directly in posts using standard HTML:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

More posts coming at some point...
