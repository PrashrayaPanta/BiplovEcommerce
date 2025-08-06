import { useCursorify } from '@cursorify/react'

const BlueCircleCursor = () => {
  const { style } = useCursorify()

  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-[#3c07FF] transition-all duration-300 ease-in-out`}
      style={{
        width: style === 'pointer' ? 40 : 20,
        height: style === 'pointer' ? 40 : 20,
        opacity: style === 'pointer' ? 0.4 : 1,
        transform: `translate(-50%, -50%)`,
      }}
    />
  )
}

export default BlueCircleCursor
