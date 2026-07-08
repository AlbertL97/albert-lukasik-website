import ProjectShowcase from '@/components/projects/ProjectShowcase'

export const metadata = {
  title: 'LLM Wiki — Albert Łukasik',
  description:
    'Interactive wiki and knowledge graph for the psychology of human–AI interaction, built by Albert Łukasik.',
}

export default function LlmWikiPage() {
  return (
    <ProjectShowcase
      label="Project"
      title="LLM Wiki"
      tagline="An interactive wiki and knowledge graph mapping the psychology of human–AI interaction."
      embedTitle="LLM Wiki — live preview"
      liveUrl="https://albertl97.github.io/llm_wiki/"
      githubUrl="https://github.com/AlbertL97/llm_wiki"
      description={[
        'LLM Wiki is an interactive knowledge base exploring the emerging psychology of human–AI interaction. It organises concepts, findings, and open questions from cognitive science, HCI, and AI research into a navigable knowledge graph.',
        'Rather than a static reading list, the wiki links ideas together — showing how constructs such as anthropomorphism, trust, mind perception, and parasocial attachment relate across the literature — so readers can trace conceptual connections visually.',
      ]}
      features={[
        'Interactive knowledge graph of interconnected concepts',
        'Curated entries on the psychology of human–AI interaction',
        'Cross-links between constructs, theories, and evidence',
        'Open, browsable, and continuously expanding',
      ]}
      tags={['Human–AI Interaction', 'Knowledge Graph', 'Cognitive Science', 'HCI', 'Psychology']}
    />
  )
}
