import React, { FC, useState } from 'react';
import { BoardInterface } from '../interfaces/BoardInterface';
import { RowInterface } from '../interfaces/RowInterface';
import Row from './Row';


const Board: FC = (): JSX.Element => {
    const emptyBoard: BoardInterface = {
        rows: Array.from({ length: 6 }, (i) => ({
            slots: Array.from({ length: 7 }, (i) => ({ player: null 
            })),
        })),
    }

    const [board, setBoard] = useState<BoardInterface>(emptyBoard);

    const dropDisc = (column_index: number): void => {
    }

    return (
        <table>
            <tbody>
                {board.rows.map((row: RowInterface, i: number): JSX.Element => (
                    <Row row={row} dropDisc={dropDisc} />
                ))}
            </tbody>
        </table>
    )
}
        
export default Board;