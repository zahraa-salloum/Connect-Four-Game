import React, { FC } from 'react';
import { SlotInterface } from '../interfaces/SlotInterface';
import { RowInterface } from '../interfaces/RowInterface';
import Slot from './Slot';

interface RowProps{
    row: RowInterface;
    dropDisc: (index: number) => void;
}

const Row: FC<RowProps> = ({row, dropDisc}): JSX.Element => {
    return (
        <tr>
            {row.slots.map((slot: SlotInterface, i: number): JSX.Element => (
                <Slot slot={slot} index={i} dropDisc={dropDisc} />
            ))}
        </tr>
    )
}
    
export default Row;