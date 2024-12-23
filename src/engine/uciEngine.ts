import { EngineName } from "../types/enums";
import { LineResult } from "../types/eval";

import { parseEvaluationResults } from "../utils/parse";

export abstract class UciEngine {
  private worker: Worker;
  private ready = false;
  private engineName: EngineName;
  private multiPv = 3;
  private customEngineInit?: () => Promise<void>;

  constructor(
    engineName: EngineName,
    enginePath: string,
    customEngineInit?: () => Promise<void>
  ) {
    this.engineName = engineName;
    this.worker = new Worker(enginePath);
    this.customEngineInit = customEngineInit;

    console.log(`${engineName} created`);
  }

  public async init(): Promise<void> {
    await this.sendCommands(["uci"], "uciok");
    await this.setMultiPv(this.multiPv, true);
    await this.customEngineInit?.();
    this.ready = true;
    console.log(`${this.engineName} initialized`);
  }

  private async setMultiPv(multiPv: number, initCase = false) {
    if (!initCase) {
      if (multiPv === this.multiPv) return;

      this.throwErrorIfNotReady();
    }

    if (multiPv < 2 || multiPv > 6) {
      throw new Error(`Invalid MultiPV value : ${multiPv}`);
    }

    await this.sendCommands(
      [`setoption name MultiPV value ${multiPv}`, "isready"],
      "readyok"
    );

    this.multiPv = multiPv;
  }

  private throwErrorIfNotReady() {
    if (!this.ready) {
      throw new Error(`${this.engineName} is not ready`);
    }
  }

  public shutdown(): void {
    this.ready = false;
    this.worker.postMessage("quit");
    this.worker.terminate();
    console.log(`${this.engineName} shutdown`);
  }

  public isReady(): boolean {
    return this.ready;
  }

  public async stopSearch(): Promise<void> {
    await this.sendCommands(["stop", "isready"], "readyok");
  }

  protected async sendCommands(
    commands: string[],
    finalMessage: string,
    onNewMessage?: (messages: string[]) => void
  ): Promise<string[]> {
    return new Promise((resolve) => {
      const messages: string[] = [];

      this.worker.onmessage = (event) => {
        const messageData: string = event.data;
        messages.push(messageData);
        onNewMessage?.(messages);

        if (messageData.startsWith(finalMessage)) {
          resolve(messages);
        }
      };

      for (const command of commands) {
        this.worker.postMessage(command);
      }
    });
  }

  public async getBestMoves(
    fen: string,
    depth = 15
  ): Promise<LineResult[] | null> {
    const results = await this.sendCommands(
      [`position fen ${fen}`, `go depth ${depth}`],
      "bestmove"
    );

    const whiteToPlay = fen.split(" ")[1] === "w";

    const position = parseEvaluationResults(results, whiteToPlay);

    return position?.lines
      .map(({ pv, cp }, _) => {
        const move = pv[0];

        return {
          move,
          eval: cp,
        };
      }) as LineResult[];
  }
}
