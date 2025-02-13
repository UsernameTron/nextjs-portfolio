interface CaseStudy {
  title: string;
  description: string;
  fileName: string;
}

export default function CaseStudies() {
  const caseStudies: CaseStudy[] = [
    {
      title: "Accent Neutralization",
      description: "AI-driven approach to accent modification in customer service environments",
      fileName: "Accent Neutralization Case Study.pdf"
    },
    {
      title: "Advanced Logistical Reasoning",
      description: "Implementing intelligent logistics optimization in complex supply chains",
      fileName: "Advaced Logistical Reasoning.pdf"
    },
    {
      title: "BPO Analysis",
      description: "Business process optimization using incomplete data sets",
      fileName: "BPO Analysis With Incomplete Data.pdf"
    },

    {
      title: "Healthcare Systems Integration",
      description: "Seamless integration of EHR and CRM systems for improved patient care",
      fileName: "EHR and CRM Continuity Case Study.pdf"
    },
    {
      title: "Enterprise Operating System",
      description: "Modern approach to enterprise system architecture",
      fileName: "EOS.pdf"
    },
    {
      title: "RCM Automation",
      description: "Revenue cycle management automation with predictive modeling",
      fileName: "RCM Automation and Prediction Model.pdf"
    },
    {
      title: "Social Media Analytics",
      description: "Predictive analytics for social media engagement and trend forecasting",
      fileName: "Social Media Predictive Analytics.pdf"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold sm:text-6xl tracking-tight">
            Case Studies
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto tracking-wide">
            Deep dives into real-world projects and solutions
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((study) => (
            <a
              key={study.title}
              href={`/case-studies/${encodeURIComponent(study.fileName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="transform group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.25 2.25H6.75A1.5 1.5 0 0 0 5.25 3.75v16.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V7.5l-4.5-5.25Z" />
                    <path d="M14.25 2.25v4.5a.75.75 0 0 0 .75.75h4.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">{study.title}</h3>
              </div>
              <p className="text-gray-400 mb-4">{study.description}</p>
              <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
                <span>View Case Study</span>
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
