import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';
import { Header, Footer } from '@/components/chrome';
import { ScrollMotion } from '@/components/motion';
import { siteOrigin } from '@/lib/projects';
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin), title: { default: 'Vincent Leguide — The Builder’s Universe', template: '%s — Vincent Leguide' },
  description: 'From sustainable AI infrastructure to autonomous agents. Explore the projects and perspective of Vincent Leguide, a builder in the San Francisco Bay Area.',
  icons: { icon: '/icon.svg' }, openGraph: { type: 'website', locale: 'en_US', siteName: 'Vincent Leguide', title: 'Building what comes next.', description: 'The Builder’s Universe — AI infrastructure, agents, and technology products by Vincent Leguide.', images: ['/opengraph-image'] }, twitter: { card: 'summary_large_image', images: ['/opengraph-image'] }
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body id="top"><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><ScrollMotion/></body></html>;
}
