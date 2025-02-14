export default function Loading() {
  return (
    <div className="container">
      {/* Skeleton for Category Header */}
      <div className="skeleton category-page-header"></div>

      {/* Skeleton Grid Layout */}
      <div className="subcategory-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="subcategory-card skeleton">
            <div className="skeleton-text"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
