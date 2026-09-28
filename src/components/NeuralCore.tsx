import { useEffect, useRef } from 'react'
import type { Theme } from '../hooks/useTheme'
import type { Pointer } from '../hooks/usePointerParallax'

type RGB = [number, number, number]

type Palette = {
  node: RGB
  line: RGB
  glowInner: string
  glowOuter: string
  ring: RGB
  dims: [RGB, RGB, RGB]
  nodeAlpha: number
  lineAlpha: number
}

const palettes: Record<Theme, Palette> = {
  night: {
    node: [226, 232, 255],
    line: [138, 152, 255],
    glowInner: 'rgba(120, 138, 255, 0.34)',
    glowOuter: 'rgba(72, 214, 208, 0)',
    ring: [170, 182, 255],
    dims: [
      [150, 140, 255],
      [106, 168, 255],
      [84, 222, 210],
    ],
    nodeAlpha: 0.95,
    lineAlpha: 0.22,
  },
  day: {
    node: [52, 62, 170],
    line: [80, 92, 214],
    glowInner: 'rgba(255, 255, 255, 0.95)',
    glowOuter: 'rgba(160, 200, 255, 0)',
    ring: [86, 98, 210],
    dims: [
      [108, 86, 232],
      [44, 118, 230],
      [8, 150, 160],
    ],
    nodeAlpha: 0.85,
    lineAlpha: 0.2,
  },
}

type Node = { x: number; y: number; z: number; r: number; cluster: number; phase: number }
type Edge = [number, number]
type Pulse = { edge: number; t: number; speed: number; forward: boolean }
type Mote = { x: number; y: number; vx: number; vy: number; depth: number; r: number }

const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r},${g},${b},${a})`

function buildGraph(count: number) {
  const nodes: Node[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    const jitter = 0.94 + Math.random() * 0.1
    const x = Math.cos(theta) * radius * jitter
    const z = Math.sin(theta) * radius * jitter
    const angle = Math.atan2(z, x) + Math.PI
    nodes.push({
      x,
      y: y * jitter,
      z,
      r: 0.9 + Math.random() * 1.1,
      cluster: Math.floor((angle / (Math.PI * 2)) * 3) % 3,
      phase: Math.random() * Math.PI * 2,
    })
  }
  const inner = Math.round(count * 0.18)
  for (let i = 0; i < inner; i++) {
    const u = Math.random() * 2 - 1
    const t = Math.random() * Math.PI * 2
    const s = Math.sqrt(1 - u * u)
    const rad = 0.28 + Math.random() * 0.22
    nodes.push({
      x: Math.cos(t) * s * rad,
      y: u * rad,
      z: Math.sin(t) * s * rad,
      r: 0.8 + Math.random() * 0.8,
      cluster: i % 3,
      phase: Math.random() * Math.PI * 2,
    })
  }

  const edges: Edge[] = []
  const seen = new Set<string>()
  const neighbours = 3
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]
    const distances: { j: number; d: number }[] = []
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const b = nodes[j]
      distances.push({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 })
    }
    distances.sort((p, q) => p.d - q.d)
    for (const { j } of distances.slice(0, neighbours)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push([i, j])
    }
  }
  return { nodes, edges }
}

type Props = {
  theme: Theme
  active: number
  pointer: Pointer
  reducedMotion: boolean
  className?: string
}

export function NeuralCore({ theme, active, pointer, reducedMotion, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)
  const activeRef = useRef(active)
  const redrawRef = useRef<() => void>(() => undefined)

  useEffect(() => {
    themeRef.current = theme
    activeRef.current = active
    redrawRef.current()
  }, [theme, active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let graph = buildGraph(150)
    let pulses: Pulse[] = []
    let motes: Mote[] = []
    let rotation = 0.6
    let tiltX = 0
    let tiltY = 0
    let lastTime = performance.now()
    let raf = 0
    let running = false
    let visible = true
    const activeGlow = [0, 0, 0]
    const local = { x: -9999, y: -9999 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = width < 360 ? 96 : width < 480 ? 120 : 150
      if (graph.nodes.length !== count + Math.round(count * 0.18)) graph = buildGraph(count)
      const moteCount = width < 480 ? 22 : 38
      motes = Array.from({ length: moteCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        depth: 0.3 + Math.random() * 0.7,
        r: 0.6 + Math.random() * 1.2,
      }))
    }

    const spawnPulse = () => {
      const target = activeRef.current
      for (let tries = 0; tries < 6; tries++) {
        const edge = Math.floor(Math.random() * graph.edges.length)
        const [a] = graph.edges[edge]
        if (graph.nodes[a].cluster === target || tries === 5) {
          pulses.push({ edge, t: 0, speed: 0.6 + Math.random() * 0.8, forward: Math.random() > 0.5 })
          return
        }
      }
    }

    const draw = (time: number, dt: number) => {
      const palette = palettes[themeRef.current]
      const target = activeRef.current
      for (let i = 0; i < 3; i++) {
        const goal = i === target ? 1 : 0
        activeGlow[i] += (goal - activeGlow[i]) * Math.min(1, dt * 3)
      }

      const px = reducedMotion ? 0 : pointer.x.get()
      const py = reducedMotion ? 0 : pointer.y.get()
      tiltX += (py * 0.35 - tiltX) * Math.min(1, dt * 2.5)
      tiltY += (px * 0.45 - tiltY) * Math.min(1, dt * 2.5)
      if (!reducedMotion) rotation += dt * 0.12

      const cx = width / 2 + px * 10
      const cy = height / 2 + py * 10 + (reducedMotion ? 0 : Math.sin(time * 0.0006) * 6)
      const radius = Math.min(width, height) * 0.34
      const breathe = reducedMotion ? 1 : 1 + Math.sin(time * 0.0011) * 0.035

      ctx.clearRect(0, 0, width, height)

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.55 * breathe)
      glow.addColorStop(0, palette.glowInner)
      glow.addColorStop(1, palette.glowOuter)
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      for (const mote of motes) {
        if (!reducedMotion) {
          mote.x += mote.vx * dt * 60
          mote.y += mote.vy * dt * 60
          const dx = mote.x - local.x
          const dy = mote.y - local.y
          const dist = Math.hypot(dx, dy)
          if (dist < 90 && dist > 0.01) {
            const push = ((90 - dist) / 90) * 0.6 * mote.depth
            mote.x += (dx / dist) * push
            mote.y += (dy / dist) * push
          }
          if (mote.x < -10) mote.x = width + 10
          if (mote.x > width + 10) mote.x = -10
          if (mote.y < -10) mote.y = height + 10
          if (mote.y > height + 10) mote.y = -10
        }
        const ox = px * 18 * mote.depth
        const oy = py * 18 * mote.depth
        ctx.fillStyle = rgba(palette.node, 0.12 + mote.depth * 0.22)
        ctx.beginPath()
        ctx.arc(mote.x + ox, mote.y + oy, mote.r, 0, Math.PI * 2)
        ctx.fill()
      }

      const cosY = Math.cos(rotation + tiltY)
      const sinY = Math.sin(rotation + tiltY)
      const cosX = Math.cos(tiltX - 0.25)
      const sinX = Math.sin(tiltX - 0.25)
      const focal = 3.2
      const projected = graph.nodes.map((node) => {
        const x1 = node.x * cosY - node.z * sinY
        const z1 = node.x * sinY + node.z * cosY
        const y2 = node.y * cosX - z1 * sinX
        const z2 = node.y * sinX + z1 * cosX
        const scale = focal / (focal + z2)
        return {
          sx: cx + x1 * radius * scale * breathe,
          sy: cy + y2 * radius * scale * breathe,
          depth: (1 - z2) / 2,
          scale,
        }
      })

      ctx.lineWidth = 1
      graph.edges.forEach(([a, b]) => {
        const pa = projected[a]
        const pb = projected[b]
        const depth = (pa.depth + pb.depth) / 2
        const cluster = graph.nodes[a].cluster
        const boost = graph.nodes[b].cluster === cluster ? activeGlow[cluster] : 0
        const color = boost > 0.05 ? palette.dims[cluster] : palette.line
        ctx.strokeStyle = rgba(color, palette.lineAlpha * (0.25 + depth) * (1 + boost * 1.6))
        ctx.beginPath()
        ctx.moveTo(pa.sx, pa.sy)
        ctx.lineTo(pb.sx, pb.sy)
        ctx.stroke()
      })

      pulses = pulses.filter((pulse) => pulse.t <= 1)
      for (const pulse of pulses) {
        if (!reducedMotion) pulse.t += dt * pulse.speed
        const [a, b] = graph.edges[pulse.edge]
        const from = projected[pulse.forward ? a : b]
        const to = projected[pulse.forward ? b : a]
        const t = Math.min(pulse.t, 1)
        const x = from.sx + (to.sx - from.sx) * t
        const y = from.sy + (to.sy - from.sy) * t
        const color = palette.dims[graph.nodes[a].cluster]
        const fade = Math.sin(t * Math.PI)
        ctx.fillStyle = rgba(color, 0.9 * fade)
        ctx.beginPath()
        ctx.arc(x, y, 1.9, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = rgba(color, 0.18 * fade)
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
      }

      graph.nodes.forEach((node, i) => {
        const p = projected[i]
        const boost = activeGlow[node.cluster]
        const twinkle = reducedMotion ? 1 : 0.8 + Math.sin(time * 0.002 + node.phase) * 0.2
        const color = boost > 0.05 ? palette.dims[node.cluster] : palette.node
        const alpha = palette.nodeAlpha * (0.2 + p.depth * 0.8) * twinkle
        const r = node.r * p.scale * (1 + boost * 0.35)
        ctx.fillStyle = rgba(color, alpha)
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.save()
      ctx.translate(cx, cy)
      const rings = [
        { rx: 1.32, ry: 0.36, rot: -0.35 + tiltY * 0.4, speed: 0.22 },
        { rx: 1.18, ry: 0.5, rot: 0.55 + tiltX * 0.4, speed: -0.16 },
      ]
      rings.forEach((ring, index) => {
        ctx.save()
        ctx.rotate(ring.rot)
        ctx.strokeStyle = rgba(palette.ring, 0.16)
        ctx.lineWidth = 1
        ctx.setLineDash(index === 0 ? [] : [2, 6])
        ctx.beginPath()
        ctx.ellipse(0, 0, radius * ring.rx, radius * ring.ry, 0, 0, Math.PI * 2)
        ctx.stroke()
        const angle = time * 0.001 * ring.speed + index * 2
        const sx = Math.cos(angle) * radius * ring.rx
        const sy = Math.sin(angle) * radius * ring.ry
        ctx.fillStyle = rgba(palette.dims[(index + target) % 3], 0.9)
        ctx.beginPath()
        ctx.arc(sx, sy, 2.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      ctx.restore()

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.3)
      core.addColorStop(0, rgba(palette.dims[target], 0.55))
      core.addColorStop(1, rgba(palette.dims[target], 0))
      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2)
      ctx.fill()
    }

    const frame = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      if (Math.random() < dt * 5 && pulses.length < 24) spawnPulse()
      draw(time, dt)
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || reducedMotion || !visible || document.hidden) return
      running = true
      lastTime = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    redrawRef.current = () => {
      if (!running) draw(performance.now(), 1)
    }

    resize()
    draw(performance.now(), 1)
    start()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (!running) draw(performance.now(), 1)
    })
    resizeObserver.observe(canvas)

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    intersection.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      local.x = event.clientX - rect.left
      local.y = event.clientY - rect.top
    }
    if (!reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      stop()
      resizeObserver.disconnect()
      intersection.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
      redrawRef.current = () => undefined
    }
  }, [pointer, reducedMotion])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
