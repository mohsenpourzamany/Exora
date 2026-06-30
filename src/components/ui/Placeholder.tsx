interface PlaceholderProps {
  title: string
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">🚧</span>
        </div>
        <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
        <p className="text-sm text-slate-400 mt-1">در حال توسعه...</p>
      </div>
    </div>
  )
}
