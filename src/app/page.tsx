export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold sm:text-5xl">Welcome to My Portfolio</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          I'm a passionate developer showcasing my projects, articles, and media content.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
          <p className="text-gray-600">Explore my thoughts and insights on technology, development, and more.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <p className="text-gray-600">Check out my latest projects and contributions on GitHub.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Media</h2>
          <p className="text-gray-600">Browse through my collection of images, videos, and presentations.</p>
        </div>
      </section>
    </div>
  );
}
