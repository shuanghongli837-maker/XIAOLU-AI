// All input samples are retained; no analyser snapshots or microphone ownership.
class XiaoluPcmRecorder extends AudioWorkletProcessor {
  constructor() {
    super()
    this.samples = new Float32Array(2048)
    this.length = 0
    this.finished = false
    this.port.onmessage = event => {
      if (event.data?.type !== 'finish' || this.finished) return
      this.flush()
      this.finished = true
      this.port.postMessage({ type: 'finished' })
    }
  }

  flush() {
    if (!this.length) return
    const samples = this.length === this.samples.length ? this.samples : this.samples.slice(0, this.length)
    this.port.postMessage({ type: 'audio', samples }, [samples.buffer])
    this.samples = new Float32Array(2048)
    this.length = 0
  }

  process(inputs) {
    if (this.finished) return false
    const channels = inputs[0]
    if (!channels?.length) return true
    const length = channels[0].length
    for (let index = 0; index < length; index++) {
      let mono = 0
      for (const channel of channels) mono += channel[index] / channels.length
      this.samples[this.length++] = mono
      if (this.length === this.samples.length) this.flush()
    }
    return true
  }
}

registerProcessor('xiaolu-pcm-recorder', XiaoluPcmRecorder)
