import { Hero } from '@/components/hero';
import { ProjectIndex } from '@/components/project-index';
import { Constellation } from '@/components/constellation';
import { Infrastructure } from '@/components/infrastructure';
import { NotebookSection } from '@/components/notebook';
import { featuredProjects, projects, siteOrigin } from '@/lib/projects';
export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context':'https://schema.org','@type':'Person',name:'Vincent Leguide',url:siteOrigin,sameAs:['https://github.com/vincentleg','https://www.linkedin.com/in/vincent-leguide-640b29194/','https://notebookfromthevalley.com'],jobTitle:'AI builder, business developer and writer',nationality:'French',homeLocation:'San Francisco Bay Area',worksFor:{'@type':'Organization',name:'INFODIP'}})}}/><Hero/><ProjectIndex items={featuredProjects} total={projects.length}/><NotebookSection/><Constellation/><Infrastructure/></>;
}
