import { ref, onMounted, onUnmounted } from 'vue'

export function useSliderDrag(containerRef) {
  const sliderPos = ref(50)
  const isDragging = ref(false)

  const handleMove = (clientX) => {
    if (!containerRef.value) return
    const rect = containerRef.value.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    sliderPos.value = percentage
  }

  const onMouseMove = (e) => {
    if (isDragging.value) {
      handleMove(e.clientX)
    }
  }

  const onTouchMove = (e) => {
    if (isDragging.value) {
      handleMove(e.touches[0].clientX)
    }
  }

  const onMouseUp = () => {
    isDragging.value = false
  }

  const startDrag = () => {
    isDragging.value = true
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onMouseUp)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onMouseUp)
  })

  return {
    sliderPos,
    isDragging,
    startDrag
  }
}
