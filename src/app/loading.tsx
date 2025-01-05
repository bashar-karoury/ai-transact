export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>;
}
