declare module "abcjs" {
  export interface VisualObj {
    [key: string]: unknown;
  }

  export interface TuneObject {
    [key: string]: unknown;
  }

  export interface SynthController {
    load(_selector: string, _cursorControl: unknown, _options: unknown): void;
    setTune(_visualObj: VisualObj, _userAction: boolean): Promise<void>;
    play(): void;
    pause(): void;
    restart(): void;
    setProgress(_percent: number): void;
    getStatus(): string;
  }

  export interface TimingCallbacks {
    setProgress(_percent: number): void;
  }

  export interface Synth {
    supportsAudio(): boolean;
    SynthController: new () => SynthController;
    CreateSynth: new () => {
      init(_options: { visualObj: VisualObj }): Promise<void>;
    };
  }

  export function renderAbc(
    _container: string | HTMLElement,
    _abcString: string,
    _params: unknown,
  ): VisualObj[];

  export const synth: Synth;

  const abcjs: {
    renderAbc: typeof renderAbc;
    synth: typeof synth;
    TimingCallbacks: new (
      _visualObj: VisualObj,
      _params: { eventCallback: (_event: unknown) => void },
    ) => TimingCallbacks;
  };

  export default abcjs;
}
