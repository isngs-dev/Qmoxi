/** Remounts per route: a light CSS fade/rise page transition (no JS, reduced-motion aware). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
