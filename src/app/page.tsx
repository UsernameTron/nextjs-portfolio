'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import ImageGallery from '@/components/Gallery/ImageGallery';

export default function Home() {
  useEffect(() => {
    console.log('🚀 Homepage mounted');
    console.log('📱 Device width:', window.innerWidth);
    console.log('🎨 Theme:', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, []);

  const handleAnimationComplete = (definition: string) => {
    console.log('✨ Animation completed:', definition);
  };

  const contentPlatforms = [
    {
      title: 'Phase 1 Hiring Predictive Analytics',
      description: 'Revolutionizing recruitment through AI-driven analytics. Leveraging machine learning to identify top talent and streamline hiring decisions.',
      platform: 'GitHub',
      link: 'https://github.com/UsernameTron/HR-LLM.git',
      action: 'View on GitHub',
      icon: (
        <svg className="w-6 h-6 text-[#2DBA4E]" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      title: 'Creative Stories',
      description: 'Colorful and creative storytelling with a satirical edge. Crafting impactful messages that challenge perspectives and spark meaningful conversations.',
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
      title: 'The Edge of Innovation',
      description: 'Where technology discussions thrive. Deep dives into emerging tech, automation, and the future of innovation, with a focus on practical implications.',
      platform: 'Medium',
      link: 'https://medium.com/@cpeteconnor',
      action: 'Read on Medium',
      icon: (
        <svg className="w-6 h-6 text-[#000000] dark:text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z"/>
        </svg>
      )
    },
    {
      title: 'Professional Network',
      description: 'Strategic insights and industry expertise. Connecting technology leaders and innovators to drive meaningful change and foster collaboration.',
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
      title: 'Building the Future',
      description: 'Open-source projects pushing boundaries. From concept to deployment, sharing practical solutions that drive real innovation.',
      platform: 'GitHub',
      link: 'https://github.com/UsernameTron',
      action: 'Explore on GitHub',
      icon: (
        <svg className="w-6 h-6 text-[#2DBA4E]" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      title: 'Unfiltered Perspectives',
      description: 'Raw, unfiltered takes on tech industry realities. Exposing hype, challenging assumptions, and pushing for authentic innovation.',
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const mobileVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-16 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1a1f2c] relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      <motion.div 
        className="max-w-4xl mx-auto space-y-8 sm:space-y-12 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onAnimationComplete={() => handleAnimationComplete('container')}
      >
        <motion.section 
          className="text-center space-y-4 sm:space-y-6"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold md:text-6xl tracking-tight bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 text-transparent bg-clip-text animate-gradient"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ⚡ A Hard Reset
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg text-blue-300/80 max-w-2xl mx-auto tracking-wide font-light px-4 sm:px-0"
            variants={mobileVariants}
          >
            🔹 Cutting through the noise. Zero fluff. Only what matters.
          </motion.p>
        </motion.section>

        <motion.section 
          className="grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {contentPlatforms.map((platform) => (
            <motion.a
              key={platform.title}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block p-4 sm:p-6 bg-gradient-to-br from-neutral-900/90 to-neutral-900/50 
                backdrop-blur-xl rounded-xl border border-neutral-800/50 
                hover:border-neutral-700/50 transition-all duration-500 
                active:scale-98 touch-pan-y
                hover:shadow-[0_0_2rem_0_rgba(59,130,246,0.1)]"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover gradient effect */}
              <motion.div 
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                initial={false}
                whileHover={{ opacity: 1 }}
              />
              
              {/* Card content */}
              <div className="relative">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="transform group-hover:scale-110 transition-transform duration-300 p-2 sm:p-3 
                    rounded-xl bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 group-hover:from-blue-500/10 group-hover:to-purple-500/10">
                    {platform.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white via-blue-100 to-neutral-200 
                    text-transparent bg-clip-text group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                    {platform.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-neutral-300/80 mb-3 sm:mb-4">
                  {platform.description}
                </p>
                <div className="flex items-center text-blue-400 text-sm">
                  <span className="font-medium">{platform.action}</span>
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.section>

        {/* Gallery Section */}
        <motion.section 
          className="space-y-6"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-2xl font-bold text-center bg-gradient-to-r from-white to-neutral-300 text-transparent bg-clip-text"
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            viewport={{ once: true }}
          >
            Gallery
          </motion.h2>
          <motion.div 
            className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800/50"
            whileInView={{ opacity: [0, 1], scale: [0.95, 1] }}
            viewport={{ once: true }}
          >
            <ImageGallery />
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}
