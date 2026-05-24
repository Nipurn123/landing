import { useParams, Link } from 'react-router-dom';
import { m } from 'framer-motion';
import MainLayout from '../layout/MainLayout';
import CTASection from '../sections/CTASection';
import { SeoHead } from '../../seo';
import { 
  getPostBySlug, 
  getRelatedPosts, 
  generatePostSchema,
  type BlogPost 
} from '../../blog';

function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <div className="prose prose-lg max-w-none">
      <div 
        className="text-[hsl(var(--color-text-primary))] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content || `
          <p class="text-lg text-[hsl(var(--color-text-secondary))] mb-8">
            ${post.excerpt}
          </p>
          <p class="text-[hsl(var(--color-text-muted))] italic">
            Full article content coming soon. Subscribe to get notified when this post is published.
          </p>
        `}}
      />
    </div>
  );
}

function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  
  return (
    <section className="mt-16 pt-16 border-t border-[hsl(var(--color-border))]">
      <h2 className="text-2xl font-semibold text-[hsl(var(--color-text-primary))] mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group block bg-[hsl(var(--color-surface))] rounded-xl p-6 border border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))]/50 transition-all duration-300"
          >
            <span className="text-xs font-medium text-[hsl(var(--color-primary))] uppercase tracking-wider">
              {post.category}
            </span>
            <h3 className="text-lg font-medium text-[hsl(var(--color-text-primary))] mt-2 group-hover:text-[hsl(var(--color-primary))] transition-colors">
              {post.title}
            </h3>
            <p className="text-[hsl(var(--color-text-secondary))] text-sm mt-2 line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AuthorCard({ author }: { author: BlogPost['author'] }) {
  return (
    <div className="flex items-center gap-4 py-6 border-y border-[hsl(var(--color-border))] my-8">
      <div 
        className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--color-primary))] to-emerald-600 flex items-center justify-center text-white font-semibold"
      >
        {author.name.charAt(0)}
      </div>
      <div>
        <p className="text-[hsl(var(--color-text-primary))] font-medium">{author.name}</p>
        <p className="text-[hsl(var(--color-text-secondary))] text-sm">{author.role}</p>
      </div>
    </div>
  );
}

function ShareButtons({ post }: { post: BlogPost }) {
  const shareUrl = `https://100xprompt.com/blog/${post.slug}`;
  const shareText = post.title;
  
  return (
    <div className="flex items-center gap-4 mt-8">
      <span className="text-[hsl(var(--color-text-secondary))] text-sm">Share:</span>
      <div className="flex gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] flex items-center justify-center text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] hover:border-[hsl(var(--color-primary))] transition-all"
          aria-label="Share on Twitter"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] flex items-center justify-center text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] hover:border-[hsl(var(--color-primary))] transition-all"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <button
          onClick={() => navigator.clipboard.writeText(shareUrl)}
          className="w-10 h-10 rounded-full bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] flex items-center justify-center text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] hover:border-[hsl(var(--color-primary))] transition-all"
          aria-label="Copy link"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/blog?tag=${encodeURIComponent(tag)}`}
          className="px-3 py-1 text-sm bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-full text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] hover:border-[hsl(var(--color-primary))] transition-all"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-[hsl(var(--color-text-primary))] mb-4">Article Not Found</h1>
      <p className="text-[hsl(var(--color-text-secondary))] mb-8">The article you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/blog"
        className="px-6 py-3 bg-[hsl(var(--color-primary))] text-white rounded-lg font-medium hover:bg-[hsl(var(--color-primary))]/90 transition-colors"
      >
        Back to Blog
      </Link>
    </div>
  );
}

export default function BlogPostView() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  
  if (!post) {
    return (
      <MainLayout>
        <NotFound />
      </MainLayout>
    );
  }
  
  const relatedPosts = getRelatedPosts(post.id, 3);
  const articleSchema = generatePostSchema(post);
  
  return (
    <MainLayout>
      <SeoHead
        title={post.meta.title}
        description={post.meta.description}
        keywords={post.meta.keywords}
        canonicalPath={`/blog/${post.slug}`}
        ogImage={post.image?.url}
        schema={articleSchema}
      />
      
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <m.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="flex items-center gap-2 text-sm text-[hsl(var(--color-text-secondary))] mb-8">
              <Link to="/" className="hover:text-[hsl(var(--color-primary))] transition-colors">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-[hsl(var(--color-primary))] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[hsl(var(--color-text-muted))] truncate max-w-[200px]">{post.title}</span>
            </nav>
            
            <div className="flex items-center gap-4 text-sm text-[hsl(var(--color-text-secondary))] mb-6">
              <span className="px-3 py-1 bg-[hsl(var(--color-primary))]/10 text-[hsl(var(--color-primary))] rounded-full font-medium">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--color-text-primary))] leading-tight mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-[hsl(var(--color-text-secondary))] leading-relaxed">
              {post.excerpt}
            </p>
            
            <AuthorCard author={post.author} />
          </m.header>
          
          {post.image && (
            <m.figure
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <img
                src={post.image.url}
                alt={post.image.alt}
                width={post.image.width}
                height={post.image.height}
                className="w-full rounded-2xl border border-[hsl(var(--color-border))]"
                loading="eager"
              />
            </m.figure>
          )}
          
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BlogPostContent post={post} />
          </m.div>
          
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TagList tags={post.tags} />
            <ShareButtons post={post} />
          </m.div>
          
          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>
      
      <CTASection />
    </MainLayout>
  );
}
