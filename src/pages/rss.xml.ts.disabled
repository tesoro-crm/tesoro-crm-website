import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return rss({
    title: 'Tesoro CRM Blog',
    description: 'Insights and stories about CRM, real estate marketing, and business growth',
    site: context.site || 'https://new.tesorohq.io',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      author: post.data.author,
      categories: [post.data.category, ...(Array.isArray(post.data.tags) ? post.data.tags : [])],
      ...(post.data.heroImage && {
        enclosure: {
          url: new URL(post.data.heroImage, context.site || 'https://new.tesorohq.io').toString(),
          type: 'image/jpeg',
          length: 0, // Required by RSS spec but not used
        },
      }),
    })),
    customData: `<language>nl</language>`,
  });
}
