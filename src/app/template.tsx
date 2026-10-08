// Re-mounts on every navigation, giving each route a short cinematic entrance (disabled for reduced motion in CSS).
export default function Template({ children }: { children: React.ReactNode }) { return <div className="page-enter">{children}</div>; }
