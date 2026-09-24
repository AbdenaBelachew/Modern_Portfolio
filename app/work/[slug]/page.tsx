import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/data/projects';
import { site } from '@/data/site';
import CaseStudy from '@/components/CaseStudy';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Toaster from '@/components/Toaster';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const title = `${project.name} — Case study · ${site.name}`;
  const images = project.image ? [{ url: project.image, alt: `${project.name} interface` }] : undefined;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { type: 'article', url: `/work/${project.slug}`, title, description: project.description, images },
    twitter: { card: 'summary_large_image', title, description: project.description, images },
  };
}

export default async function WorkPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main id="main">
        <CaseStudy project={project} />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
