import React, { FC, useState } from 'react';
import { BoardInterface } from '../interfaces/BoardInterface';
import { RowInterface } from '../interfaces/RowInterface';
import Row from './Row';


const Board: FC = (): JSX.Element => {
    const [player, setPlayer] = useState<String>('X');
    const [winner, setWinner] = useState<String>('');
    const [messageClass, setMessageClass] = useState('');

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
        if (checkWinningConditionAllDirections(row_index,slot_index)) {
            if(player == 'X'){
                setMessageClass('message_red');
                setWinner('Red Player Won !');
            } else if (player == 'O'){
                setMessageClass('message_yellow');
                setWinner('Yellow Player Won !');
            }
            setTimeout(() => {
                Reset();
            }, 1000);
        } else{
            if(drawCheck()){
                setBoard(emptyBoard);
                setWinner('It is a Draw !!')
                setPlayer('X');
            }
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

    const checkMiddleWinningHorizontal = (row_index: number, slot_index: number): boolean => {
        const player = board.rows[row_index].slots[slot_index].player;
      
        if (board.rows[row_index]?.slots[slot_index]?.player === player && board.rows[row_index]?.slots[slot_index + 1]?.player === player && board.rows[row_index]?.slots[slot_index -1]?.player === player ) {
            return ((board.rows[row_index]?.slots[slot_index + 2]?.player === player || board.rows[row_index]?.slots[slot_index - 2]?.player === player))
        }
        return false;
    }

    const checkMiddleWinningDiagonalLeft = (row_index: number, slot_index: number): boolean => {
        const player = board.rows[row_index].slots[slot_index].player;
      
        if (board.rows[row_index]?.slots[slot_index]?.player === player && board.rows[row_index -1]?.slots[slot_index + 1]?.player === player && board.rows[row_index + 1]?.slots[slot_index - 1]?.player === player ) {
            return ((board.rows[row_index - 2]?.slots[slot_index + 2]?.player === player || board.rows[row_index + 2]?.slots[slot_index - 2]?.player === player))
        }
        return false;
    }

    const checkMiddleWinningDiagonalRight = (row_index: number, slot_index: number): boolean => {
        const player = board.rows[row_index].slots[slot_index].player;
      
        if (board.rows[row_index]?.slots[slot_index]?.player === player && board.rows[row_index + 1]?.slots[slot_index + 1]?.player === player && board.rows[row_index - 1]?.slots[slot_index -1]?.player === player ) {
            return ((board.rows[row_index + 2]?.slots[slot_index + 2]?.player === player || board.rows[row_index - 2]?.slots[slot_index - 2]?.player === player))
        }
        return false;
    }
        
    const checkDiagonalLeft = (row_index: number, slot_index: number): boolean => {
        return (
            checkWinningCondition(row_index, slot_index, -1, 1) ||
            checkWinningCondition(row_index, slot_index, 1, -1) || 
            checkMiddleWinningDiagonalLeft(row_index, slot_index)
        )
    }
      
    const checkDiagonalRight = (row_index: number, slot_index: number): boolean => {
        return (
            checkWinningCondition(row_index, slot_index, -1, -1) ||
            checkWinningCondition(row_index, slot_index, 1, 1) || 
            checkMiddleWinningDiagonalRight(row_index, slot_index)
        )
    }
      
    const checkVertical = (row_index: number, slot_index: number): boolean => {
        return checkWinningCondition(row_index, slot_index, 1, 0);
    }
      
    const checkHorizontal = (row_index: number, slot_index: number): boolean => {
        return (
            checkWinningCondition(row_index, slot_index, 0, -1) ||
            checkWinningCondition(row_index, slot_index, 0, 1) || 
            checkMiddleWinningHorizontal(row_index, slot_index)
        )
    }

    const drawCheck = (): boolean => {
        const board_filled_check = board.rows.every((row) =>
          row.slots.every((slot) => slot.player !== null)
        )
        return board_filled_check;
    }
    
    const checkWinningConditionAllDirections = (row_index: number, slot_index: number): boolean => {
        return (
          checkVertical(row_index, slot_index) ||
          checkHorizontal(row_index, slot_index) ||
          checkDiagonalLeft(row_index, slot_index) ||
          checkDiagonalRight(row_index, slot_index)
        )
    }

    const Reset = (): void =>{
        setBoard(emptyBoard);
        setWinner('');
        setPlayer('X');
    }

    return (
        <>
        <div className={messageClass}>{winner}</div>
        <div className='message_reset' onClick={Reset}>RESET</div>
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