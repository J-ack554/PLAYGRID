export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-white/10 border-t-brand-400"
      style={{ width: size, height: size }}
    />
  )
}
