export default function GalleryLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="relative aspect-video rounded-lg bg-neutral-800/50 animate-pulse"
        />
      ))}
    </div>
  );
} 