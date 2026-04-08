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
    <article className="max-w-2xl mx-auto">
      <div className="mb-14">
        <Link href="/" className="inline-flex items-center text-sm font-sans font-medium text-[#8b7d6b] hover:text-[#5b4636] transition-colors mb-12 group">
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to journal
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#3e2e23] tracking-tight">
          {postData.title}
        </h1>
        <time className="text-base font-sans font-medium text-[#8b7d6b] tracking-widest uppercase block pb-6 border-b border-[#dcd1b3]">
          {format(parseISO(postData.date), 'LLLL d, yyyy')}
        </time>
      </div>
      <div 
        className="prose prose-xl prose-stone max-w-none 
                   prose-headings:font-serif prose-headings:text-[#3e2e23] prose-headings:font-bold prose-headings:tracking-tight
                   prose-p:text-[#4a392d] prose-p:leading-[1.7] prose-p:font-serif
                   prose-a:text-[#8b7d6b] hover:prose-a:text-[#3e2e23] prose-a:underline prose-a:underline-offset-4 prose-a:transition-colors
                   prose-strong:text-[#3e2e23] prose-strong:font-bold
                   prose-blockquote:border-l-2 prose-blockquote:border-[#8b7d6b] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#5b4636]
                   prose-li:text-[#4a392d] prose-li:font-serif
                   prose-ol:text-[#4a392d]
                   prose-ul:marker:text-[#8b7d6b]
                   prose-img:rounded-lg prose-img:shadow-lg"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml ?? '' }} 
      />
    </article>
  );
}
