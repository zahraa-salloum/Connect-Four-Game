import React, { FC, useState } from 'react';
import { BoardInterface } from '../interfaces/BoardInterface';
import { RowInterface } from '../interfaces/RowInterface';
import Row from './Row';


const Board: FC = (): JSX.Element => {
    const [player, setPlayer] = useState<String>('X');
    const [winner, setWinner] = useState<String>('');

    const emptyBoard: BoardInterface = {
        rows: Array.from({ length: 6 }, (i) => ({
            slots: Array.from({ length: 7 }, (i) => ({ player: null 
            })),
        })),
    }

    const [board, setBoard] = useState<BoardInterface>(emptyBoard);

    const dropDisc = (slot_index: number): void => {
        let new_board: BoardInterface = board;
        let vertical_slots_filled: Boolean = true;
        let row_index: number = 0;

        for (let i: number = 5; i >= 0; i--) {
            let slot_player = new_board.rows[i].slots[slot_index].player;
            if (!slot_player) {
                new_board.rows[i].slots[slot_index].player = player;
                row_index = i;
                vertical_slots_filled = false;
                break;
            }
        }
        if (!vertical_slots_filled) {
            setBoard(new_board);
            setPlayer(player === 'X' ? 'O' : 'X');
        }
        if (checkVertical(row_index, slot_index)|| checkHorizontal(row_index, slot_index)|| checkDiagonalRight(row_index, slot_index)|| checkDiagonalLeft(row_index, slot_index)) {
            setBoard(emptyBoard);
            if(player == 'X'){
                setWinner('Red Player Won');
            } else if (player == 'O'){
                setWinner('Yellow Player Won');
            }
            
            setPlayer('X');
        }
    }

    const checkWinningCondition = (row_index: number, slot_index: number, row_increment: number, slot_increment: number): boolean => {
        const player = board.rows[row_index].slots[slot_index].player;
        let consecutive_slots = 0;
        let r = row_index;
        let s = slot_index;
      
        while (board.rows[r]?.slots[s]?.player === player) {
            consecutive_slots++;
                if (consecutive_slots >= 4) {
                    return true;
                }
            r += row_increment;
            s += slot_increment;
        }
      
        return false;
    }
      
    const checkDiagonalLeft = (row_index: number, slot_index: number): boolean => {
        return (
            checkWinningCondition(row_index, slot_index, -1, 1) ||
            checkWinningCondition(row_index, slot_index, 1, -1)
        )
    }
      
    const checkDiagonalRight = (row_index: number, slot_index: number): boolean => {
        return (
            checkWinningCondition(row_index, slot_index, -1, -1) ||
            checkWinningCondition(row_index, slot_index, 1, 1)
        )
    }
      
    const checkVertical = (row_index: number, slot_index: number): boolean => {
        return checkWinningCondition(row_index, slot_index, 1, 0);
    }
      
    const checkHorizontal = (row_index: number, slot_index: number): boolean => {
        return checkWinningCondition(row_index, slot_index, 0, 1);
    }

    return (
        <>
        <h3>{winner}</h3>
        <table>
            <tbody>
                {board.rows.map((row: RowInterface, i: number): JSX.Element => (
                    <Row row={row} dropDisc={dropDisc} />
                ))}
            </tbody>
        </table>
        <div className='stand'>.</div>
        </>
    )
}
        
export default Board;