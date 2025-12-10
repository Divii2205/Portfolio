export default function GradientLine() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="relative w-full max-w-5xl h-[2px]">

        {/* Soft outer glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent blur-md" />

        {/* Crisp bright line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

      </div>
    </div>
  )
}
