import { getPostData, getAllPostSlugs } from '@/lib/markdown';
import { parseISO, format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function Post({ params }: Props) {
  const resolvedParams = await params;
  let postData;
  try {
    postData = await getPostData(resolvedParams.slug);
  } catch (e) {
    notFound();
  }

  return (
    <article className="max-w-prose mx-auto">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-sans text-[#8b8577] hover:text-[#222] transition-colors mb-8 group">
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to journal
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-[#1a1a1a]">
          {postData.title}
        </h1>
        <time className="text-sm font-sans text-[#8b8577] tracking-wider uppercase block pb-8 border-b border-[#e5e0d8]">
          {format(parseISO(postData.date), 'LLLL d, yyyy')}
        </time>
      </div>
      <div 
        className="prose prose-lg prose-stone max-w-none 
                   prose-headings:font-serif prose-headings:text-[#222] prose-headings:font-semibold
                   prose-p:text-[#333] prose-p:leading-relaxed prose-p:font-serif
                   prose-a:text-[#c49a6c] hover:prose-a:text-[#a88258] prose-a:transition-colors
                   prose-strong:text-[#111] prose-strong:font-semibold
                   prose-blockquote:border-l-4 prose-blockquote:border-[#c49a6c] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#555]
                   prose-img:rounded-xl prose-img:shadow-sm"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml ?? '' }} 
      />
    </article>
  );
}
