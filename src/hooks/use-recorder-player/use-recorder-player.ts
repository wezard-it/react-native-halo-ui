import * as React from 'react'
import { Platform } from 'react-native'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

export interface RecorderPlayer {
  isPlaying: boolean
  isRecording: boolean
  duration: number | undefined
  currentSecs: number | undefined
  currentTime: string | undefined
  startRecording: () => Promise<void>
  stopRecording: () => Promise<string>
  play: (uri: string) => Promise<void>
  pause: () => Promise<void>
  stop: () => Promise<void>
  seek: (value: number) => Promise<void>
}

export const useRecorderPlayer = (): RecorderPlayer => {
  const recorderPlayer = React.useMemo(() => new AudioRecorderPlayer(), [])

  const [isRecording, setIsRecording] = React.useState<boolean>(false)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const [isPaused, setIsPaused] = React.useState<boolean>(false)

  const [currentSecs, setCurrentSecs] = React.useState<number>()
  const [currentTime, setCurrentTime] = React.useState<string>()
  const [duration, setDuration] = React.useState<number>()

  const startRecording = React.useCallback(async () => {
    setIsRecording(true)
    try {
      await recorderPlayer.stopRecorder()
      await recorderPlayer.removePlayBackListener()
    } catch (error) {
      // nothing
    }
    const timestamp = new Date().getTime()
    await recorderPlayer.startRecorder(
      Platform.select({ ios: `sound_${timestamp}.m4a`, android: `sound_${timestamp}.mp4` }) ?? '',
    )
    recorderPlayer.addRecordBackListener((event) => {
      setCurrentSecs(event.currentPosition)
      setCurrentTime(recorderPlayer.mmss(Math.floor(event.currentPosition / 1000)))
      return
    })
  }, [recorderPlayer])

  const stopRecording = React.useCallback(async (): Promise<string> => {
    const result = await recorderPlayer.stopRecorder()
    recorderPlayer.removeRecordBackListener()
    setCurrentSecs(undefined)
    setCurrentTime(undefined)
    setIsRecording(false)
    return result
  }, [recorderPlayer])

  const _stopPlay = React.useCallback(async (): Promise<void> => {
    await recorderPlayer.stopPlayer()
    recorderPlayer.removePlayBackListener()
    setDuration(undefined)
    setCurrentSecs(undefined)
    setCurrentTime(undefined)
    setIsPlaying(false)
  }, [recorderPlayer])

  const _startPlay = React.useCallback(
    async (uri: string): Promise<void> => {
      setIsPlaying(true)
      setIsPaused(false)
      await recorderPlayer.startPlayer(uri)
      recorderPlayer.addPlayBackListener((event) => {
        if (duration === undefined) {
          setDuration(event.duration)
        }
        if (event.currentPosition < event.duration) {
          setCurrentSecs(event.currentPosition)
          setCurrentTime(recorderPlayer.mmss(Math.floor(event.currentPosition / 1000)))
        } else {
          _stopPlay()
        }
      })
    },
    [duration, recorderPlayer, _stopPlay],
  )

  const _pausePlay = React.useCallback(async (): Promise<void> => {
    await recorderPlayer.pausePlayer()
    setIsPaused(true)
    setIsPlaying(false)
  }, [recorderPlayer])

  const _resumePlay = React.useCallback(async (): Promise<void> => {
    await recorderPlayer.resumePlayer()
    setIsPaused(false)
    setIsPlaying(true)
  }, [recorderPlayer])

  const seek = React.useCallback(
    async (value: number) => {
      await recorderPlayer.seekToPlayer(value)
    },
    [recorderPlayer],
  )

  const play = React.useCallback(
    async (uri?: string) => {
      if (!isPlaying && !isPaused && uri !== undefined) {
        await _startPlay(uri)
      } else if (!isPlaying && isPaused) {
        await _resumePlay()
      }
    },
    [_resumePlay, _startPlay, isPaused, isPlaying],
  )

  const stop = React.useCallback(async () => {
    await _stopPlay()
  }, [_stopPlay])

  const pause = React.useCallback(async () => {
    await _pausePlay()
  }, [_pausePlay])

  return {
    isPlaying,
    isRecording,
    duration,
    currentSecs,
    currentTime,
    startRecording,
    stopRecording,
    play,
    pause,
    stop,
    seek,
  }
}
