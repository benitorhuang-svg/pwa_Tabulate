import ABCJS, { VisualObj } from "abcjs";

export class ScoreRenderer {
  private visualObj: VisualObj | null = null;
  private containerId: string;

  constructor() {
    this.containerId = "paper";
  }

  public render(notation: string): VisualObj[] {
    const rendered = ABCJS.renderAbc(this.containerId, notation, {
      responsive: "resize",
      add_classes: true,
      scale: 1.3 /* Enlarge all musical symbols */,
      staffsep: 100 /* Increase gap between lines of music */,
      staffwidth: 1100,
      paddingtop: 0,
      paddingbottom: 0,
      paddingleft: 0,
      paddingright: 0,
    });
    this.visualObj = rendered[0] ?? null;
    return rendered;
  }

  public getVisualObj(): VisualObj | null {
    return this.visualObj;
  }

  public clearHighlights(): void {
    const elements = document.querySelectorAll(".abcjs-highlight");
    elements.forEach((el) => el.classList.remove("abcjs-highlight"));
  }
}
