import { useEffect, useRef, useState } from 'react'
import { Pause, Play, VolumeOff, VolumeOn } from './Icons'

function formatTime(s) {
  if (!Number.isFinite(s)) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

// Muted, looping video. Plays while `playing` is true unless the viewer paused it.
// Controls appear only when `controls` is on (an opened card).
export default function VideoPlayer({ src, poster, label, audio = false, playing = false, controls = false, className = '' }) {
  const videoRef = useRef(null)
  const userPaused = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const v = videoRef.current
    if (playing && !userPaused.current) v.play().catch(() => {})
    if (!playing) {
      v.pause()
      userPaused.current = false
      if (!v.muted) {
        v.muted = true
        setMuted(true)
      }
    }
  }, [playing])

  const toggle = () => {
    const v = videoRef.current
    if (v.paused) {
      userPaused.current = false
      v.play().catch(() => {})
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  const toggleSound = () => {
    const v = videoRef.current
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted && v.paused) {
      userPaused.current = false
      v.play().catch(() => {})
    }
  }

  const seekTo = (ratio) => {
    const v = videoRef.current
    if (v.duration) v.currentTime = Math.min(1, Math.max(0, ratio)) * v.duration
  }

  return (
    <div className={`group relative overflow-hidden bg-white ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onClick={controls ? toggle : undefined}
        className={`block h-full w-full object-cover ${controls ? 'cursor-pointer' : ''}`}
      />

      {controls && (
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            isPlaying ? 'lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100' : ''
          }`}
        >
          <div className="pointer-events-auto absolute bottom-3 left-3 flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-[0_1px_3px_oklch(0_0_0/0.15)] backdrop-blur transition-transform hover:scale-105"
            >
              {isPlaying ? <Pause width={12} height={12} /> : <Play width={12} height={12} className="translate-x-[1px]" />}
            </button>
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.75rem] tabular-nums text-ink-2 shadow-[0_1px_3px_oklch(0_0_0/0.12)] backdrop-blur">
              {formatTime(time)} / {formatTime(duration)}
            </span>
          </div>
          {audio && (
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
              className="pointer-events-auto absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-[0_1px_3px_oklch(0_0_0/0.15)] backdrop-blur transition-transform hover:scale-105"
            >
              {muted ? <VolumeOff width={14} height={14} /> : <VolumeOn width={14} height={14} />}
            </button>
          )}
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Seek ${label}`}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(time)}
            aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              seekTo((e.clientX - r.left) / r.width)
            }}
            onKeyDown={(e) => {
              if (!duration) return
              if (e.key === 'ArrowRight') seekTo((time + 5) / duration)
              if (e.key === 'ArrowLeft') seekTo((time - 5) / duration)
            }}
            className="pointer-events-auto absolute inset-x-0 bottom-0 flex h-2.5 cursor-pointer items-end"
          >
            <div className="h-[3px] w-full bg-black/10">
              <div className="h-full origin-left bg-ink/70" style={{ transform: `scaleX(${duration ? time / duration : 0})` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
