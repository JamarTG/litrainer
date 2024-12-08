import { Chess } from "chess.js";

interface Move {
    from: string;
    to: string;
    san: string;
}



const sanToLanWithSquares = (chess: Chess, san: string): { from: string; to: string } => {
    const legalMoves: Move[] = chess.moves({ verbose: true });

    // Find the move corresponding to the provided SAN
    const move: Move | undefined = legalMoves.find((m) => m.san === san);

    if (!move) {
        throw new Error("Invalid SAN move");
    }

    // Return 'from' and 'to' squares
    return { from: move.from, to: move.to };
}

export default sanToLanWithSquares;