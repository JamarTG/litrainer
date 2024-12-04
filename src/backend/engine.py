from stockfish import Stockfish
import sys
import json

stockfish = Stockfish(path="stockfish.exe")

def get_best_moves(fen):
    stockfish.set_fen_position(fen)
    return stockfish.get_top_moves(10) 

if __name__ == "__main__":
    fen = sys.argv[1]
    best_moves = get_best_moves(fen)
    print(json.dumps(best_moves))