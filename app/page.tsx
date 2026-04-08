import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import { parseISO, format } from 'date-fns';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="space-y-12">
      <ul className="space-y-10">
        {allPostsData.map(({ slug, date, title }) => (
          <li key={slug} className="group">
            <Link href={`/posts/${slug}`} className="block">
              <article className="p-6 -mx-6 rounded-2xl transition-all duration-300 ease-in-out hover:bg-[#f5f1ea] hover:shadow-sm">
                <time className="text-sm font-sans text-[#a69680] mb-2 block tracking-wide uppercase">
                  {format(parseISO(date), 'LLLL d, yyyy')}
                </time>
                <h2 className="text-2xl font-semibold mb-3 text-[#3e2e23] group-hover:text-[#5b4636] transition-colors">
                  {title}
                </h2>
                <span className="text-sm font-sans font-medium text-[#8b7d6b] group-hover:text-[#5b4636] transition-colors flex items-center">
                  Read entry
                  <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </article>
            </Link>
          </li>
        ))}
      </ul>
      {allPostsData.length === 0 && (
        <p className="text-[#8b7d6b] italic">No entries found yet.</p>
      )}
    </div>
  );
}
