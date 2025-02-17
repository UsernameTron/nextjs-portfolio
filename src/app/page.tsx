export default function Home() {
  const contentPlatforms = [
    {
      title: '💻 Phase 1 Hiring Predictive Analytics',
      description: 'Advanced machine learning system for hiring process optimization, leveraging NLP and predictive analytics to streamline recruitment.',
      platform: 'GitHub',
      link: 'https://github.com/UsernameTron/HR-LLM.git',
      action: 'View on GitHub',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      title: '🎥 Creative Stories',
      description: 'Big ideas deserve bold storytelling. Visual narratives that cut through the noise and bring technology, strategy, and innovation to life.',
      platform: 'YouTube',
      link: 'https://youtube.com/@CPeteConnor',
      action: 'Watch on YouTube',
      icon: (
        <svg className="w-6 h-6 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      title: '⚡ The Edge of Innovation',
      description: "Deep dives into the intersection of automation, human ingenuity, and next gen tech decoding what's real, what's hype, and what's next.",
      platform: 'Medium',
      link: 'https://medium.com/@cpeteconnor',
      action: 'Read on Medium',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z"/>
        </svg>
      )
    },
    {
      title: '🔗 Professional Network',
      description: 'Where insight meets execution. Cutting through the corporate jargon with real strategy, sharp analysis, and conversations that actually matter.',
      platform: 'LinkedIn',
      link: 'https://www.linkedin.com/in/petecconnor',
      action: 'Follow on LinkedIn',
      icon: (
        <svg className="w-6 h-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      title: '💻 Building the Future',
      description: 'From code to concept to open-source projects, experimental builds, and technical deep dives. Less theory, more hands-on execution.',
      platform: 'GitHub',
      link: 'https://github.com/UsernameTron',
      action: 'Explore on GitHub',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    },
    {
      title: '✍️ Unfiltered Perspectives',
      description: 'No-nonsense takes on tech grift, automation failures, and industry dysfunction. If it’s broken, I’m calling it out—with data, not speculation.',
      platform: 'Substack',
      link: 'https://substack.com/@cpconnor',
      action: 'Read on Substack',
      icon: (
        <svg className="w-6 h-6 text-[#FF6719]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold sm:text-6xl tracking-tight text-yellow-400 mb-4">
            ⚡ A Hard Reset
          </h1>
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto tracking-wide">
            🔹 Cutting through the noise. Zero fluff. Only what matters.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contentPlatforms.map((platform) => (
            <a
              key={platform.title}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-[#1e2936]/90 backdrop-blur-sm rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="transform group-hover:scale-105 transition-transform min-w-[24px]" aria-label={platform.platform} role="img">
                  {platform.icon}
                </div>
                <h3 className="text-xl font-semibold" aria-label={platform.title}>{platform.title}</h3>
              </div>
              <p className="text-gray-300/80 mb-4 text-sm leading-relaxed" aria-label={platform.description}>{platform.description}</p>
              <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors text-sm">
                <span>{platform.action}</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          ))}
        </section>
      </div>
    </div>
  );
}
