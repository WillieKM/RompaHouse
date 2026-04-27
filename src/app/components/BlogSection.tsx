import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const posts = [
{
  category: 'Family Guide',
  date: 'April 14, 2026',
  title: '5 Signs It May Be Time to Consider Assisted Living',
  excerpt: 'Recognizing when a loved one needs more support than you can provide at home is one of the most important — and difficult — decisions a family faces.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f6680cdd-1772146258340.png",
  imageAlt: 'Adult daughter sitting with elderly mother at a kitchen table, having a warm and caring conversation',
  readTime: '6 min read'
},
{
  category: 'Wellness',
  date: 'March 28, 2026',
  title: 'How Social Connection Slows Cognitive Decline in Seniors',
  excerpt: 'New research confirms what caregivers have long observed: meaningful social engagement is one of the most powerful tools for preserving brain health.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b6245c1-1774555378321.png",
  imageAlt: 'Group of senior residents laughing and engaging in a lively group activity in a bright common room',
  readTime: '4 min read'
},
{
  category: 'Memory Care',
  date: 'March 10, 2026',
  title: 'Understanding Sundowning: A Guide for Families',
  excerpt: 'Late-day confusion and agitation in dementia patients — called sundowning — is distressing for everyone. Here\'s what causes it and how specialized care helps.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1804c3c05-1772824481981.png",
  imageAlt: 'Compassionate nurse sitting beside elderly patient in a quiet, softly lit room during late afternoon',
  readTime: '7 min read'
}];


export default function BlogSection() {
  return (
    <section className="py-24 px-6 md:px-10 border-t border-border" id="blog">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">Resources & Insights</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              From our care team.
            </h2>
          </div>
          <Link
            href="/homepage#blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors flex-shrink-0">

            View All Articles →
          </Link>
        </div>

        {/* Article Grid */}
        <div className="divide-y divide-border">
          {posts?.map((post, idx) =>
          <article
            key={idx}
            className="group grid grid-cols-1 md:grid-cols-12 min-h-[200px] py-8 gap-6 md:gap-0 bg-background hover:bg-card transition-colors duration-500 cursor-pointer rounded-xl md:rounded-none -mx-4 px-4">

              {/* Text */}
              <div className="md:col-span-7 flex flex-col justify-center md:pr-10 md:border-r border-border">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-muted-foreground">{String(idx + 1)?.padStart(2, '0')}</span>
                  <div className="h-px w-6 bg-border" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{post?.category}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{post?.readTime}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {post?.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{post?.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-4">{post?.date}</p>
              </div>

              {/* Image */}
              <div className="md:col-span-5 hidden md:block relative overflow-hidden rounded-xl md:rounded-none md:pl-8">
                <div className="w-full h-full min-h-[160px] overflow-hidden rounded-xl">
                  <AppImage
                  src={post?.image}
                  alt={post?.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />

                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}