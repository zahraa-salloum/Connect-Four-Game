import React, { FC, useState } from 'react';
import { BoardInterface } from '../interfaces/BoardInterface';
import { RowInterface } from '../interfaces/RowInterface';
import Row from './Row';


const Board: FC = (): JSX.Element => {
    const [player, setPlayer] = useState<String>('X');

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
    }

    return (
        <>
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