import ProjectShowcase from '@/components/projects/ProjectShowcase'

export const metadata = {
  title: 'Conference Searcher — Albert Łukasik',
  description:
    'A source-grounded search tool for European AI, psychology, cognitive science, and HCI conferences.',
}

export default function ConferenceSearcherPage() {
  return (
    <ProjectShowcase
      label="Project"
      title="Conference Searcher"
      tagline="A source-grounded repository and search tool for European AI, psychology, cognitive science, and HCI conferences."
      embedTitle="Conference Searcher — live preview"
      liveUrl="https://confai-henna.vercel.app"
      githubUrl="https://github.com/AlbertL97/confai"
      description={[
        'Conference Searcher (ConfAI) is a source-grounded repository that gathers and organises academic conferences across AI, psychology, cognitive science, and human–computer interaction — with a focus on the European research landscape.',
        'It helps researchers and students quickly find relevant venues, deadlines, and details, all traced back to their original sources so the information stays trustworthy and verifiable.',
      ]}
      features={[
        'Searchable database of European AI & cognitive-science conferences',
        'Source-grounded entries linked to original announcements',
        'Covers AI, psychology, cognitive science, and HCI venues',
        'Built to help researchers find relevant venues and deadlines fast',
      ]}
      tags={['Conferences', 'AI', 'Cognitive Science', 'HCI', 'Research Tools']}
    />
  )
}
