import ABCJS, { VisualObj, SynthController, TimingCallbacks } from "abcjs";

export class AudioController {
  private synthControl: SynthController | null = null;
  private timingCallbacks: TimingCallbacks | null = null;
  private currentStatus: string = "off";
  private currentWarp: number = 1.0;
  private currentVisualObj: VisualObj | null = null;
  private currentPlayerSelector: string = "";

  constructor() {}

  public async init(
    visualObj: VisualObj,
    playerSelector: string,
    onEvent: (_event: unknown) => void,
  ): Promise<void> {
    this.currentVisualObj = visualObj;
    this.currentPlayerSelector = playerSelector;
    this.currentStatus = "loading";

    if (!ABCJS.synth.supportsAudio()) {
      throw new Error("Audio not supported");
    }

    if (this.synthControl) {
      this.synthControl.pause();
      this.synthControl = null;
    }

    this.timingCallbacks = new ABCJS.TimingCallbacks(visualObj, {
      eventCallback: onEvent,
    });

    this.synthControl = new ABCJS.synth.SynthController();
    this.synthControl.load(playerSelector, null, {
      displayRestart: false,
      displayPlay: false,
      displayProgress: false,
      displayLoop: false,
      onPlaybackEvent: (ev: { progress: number; status?: string }) => {
        if (this.timingCallbacks) this.timingCallbacks.setProgress(ev.progress);

        if (ev.status) {
          this.currentStatus = ev.status;
        }

        const event = new CustomEvent("playback-update", { detail: ev });
        window.dispatchEvent(event);
      },
    });

    const midiBuffer = new ABCJS.synth.CreateSynth();
    await midiBuffer.init({ visualObj });
    await this.synthControl.setTune(visualObj, false, {
      warp: this.currentWarp,
    });
    this.currentStatus = "ready";
  }

  public play(): void {
    if (this.synthControl) {
      this.synthControl.play();
      this.currentStatus = "playing";
    }
  }

  public pause(): void {
    if (this.synthControl) {
      this.synthControl.pause();
      this.currentStatus = "paused";
    }
  }

  public toggle(): void {
    if (this.synthControl) {
      if (this.currentStatus === "playing") {
        this.pause();
      } else {
        this.play();
      }
    }
  }

  public seek(percent: number): void {
    if (this.synthControl) {
      this.synthControl.setProgress(percent);
      if (this.timingCallbacks) this.timingCallbacks.setProgress(percent);
    }
  }

  public restart(): void {
    if (this.synthControl) {
      this.synthControl.restart();
      this.currentStatus = "playing";
    }
  }

  public async setSpeed(factor: number): Promise<void> {
    this.currentWarp = factor;
    if (this.synthControl && this.currentVisualObj) {
      const isPlaying = this.currentStatus === "playing";
      await this.synthControl.setTune(this.currentVisualObj, false, {
        warp: this.currentWarp,
      });
      if (isPlaying) this.play();
    }
  }

  public getStatus(): string {
    return this.currentStatus;
  }
}
