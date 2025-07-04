import { EngineName, MoveClassification } from "@/typing/enums.ts";
import { getBasicClassification } from "../evaluation/index.ts";
import { parseEvaluationResults } from "./parsers";

import { Chess } from "chess.js";
import { PositionEvaluation, VariationLineResult } from "@/typing/interfaces.ts";

export abstract class UciEngine {
  private worker: Worker;
  private ready = false;
  private engineName: EngineName;
  private multiPv = 3;
  private customEngineInit?: () => Promise<void>;

  private static depth = 10;

  public static setDepth(newDepth: number) {
    if (newDepth < 2 || newDepth > 40) throw new Error("Invalid depth");
    this.depth = newDepth;
  }

  public static getDepth() {
    return this.depth;
  }

  public getName = () => {
    return this.engineName;
  };

  constructor(engineName: EngineName, enginePath: string, customEngineInit?: () => Promise<void>) {
    this.engineName = engineName;
    this.worker = new Worker(enginePath);
    this.customEngineInit = customEngineInit;
  }

  public async init(): Promise<void> {
    await this.sendCommands(["uci"], "uciok");
    await this.setMultiPv(this.multiPv, true);
    await this.customEngineInit?.();
    this.ready = true;
  }

  private async setMultiPv(multiPv: number, initCase = false) {
    if (!initCase) {
      if (multiPv === this.multiPv) return;

      this.throwErrorIfNotReady();
    }

    if (multiPv < 2 || multiPv > 6) {
      throw new Error(`Invalid MultiPV value : ${multiPv}`);
    }

    await this.sendCommands([`setoption name MultiPV value ${multiPv}`, "isready"], "readyok");

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

  public async getBestMoves(fen: string): Promise<VariationLineResult[] | null> {
    const results = await this.sendCommands([`position fen ${fen}`, `go depth ${UciEngine.depth}`], "bestmove");

    const whiteToPlay = fen.split(" ")[1] === "w";

    const position = parseEvaluationResults(results, whiteToPlay);

    return position?.lines
      .map(({ pv, cp }) => {
        const move = pv[0];

        return {
          move,
          eval: cp
        };
      })
      .filter((line) => line.eval !== undefined) as VariationLineResult[];
  }

  public async evaluatePosition(fen: string): Promise<PositionEvaluation> {
    const results = await this.sendCommands([`position fen ${fen}`, `go depth ${UciEngine.getDepth()}`], "bestmove");

    const whiteToPlay = fen.split(" ")[1] === "w";

    return parseEvaluationResults(results, whiteToPlay);
  }

  public async evaluateMoveQuality(
    fen: string,
    move: string
  ): Promise<{ classification: MoveClassification; bestMove: string }> {
    const chess = new Chess(fen);
    const isValidMove = chess.move(move);

    if (!isValidMove) throw new Error("Invalid move");

    const lastPositionEval = await this.evaluatePosition(fen);
    const currentPositionEval = await this.evaluatePosition(chess.fen());
    const basicClassification = getBasicClassification(lastPositionEval, currentPositionEval, move);

    return {
      classification: basicClassification,
      bestMove: new Chess(fen).move(lastPositionEval.lines[0]?.pv[0], { strict: false })?.san
    };
  }
}
