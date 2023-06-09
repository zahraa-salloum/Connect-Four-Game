import React, { FC } from 'react';
import { SlotInterface } from '../interfaces/SlotInterface';

interface SlotProps{
    slot: SlotInterface;
    index: number;
    dropDisc: (index: number) => void;
}

const Slot: FC<SlotProps> = ({slot, index, dropDisc}): JSX.Element => {
    let slotClass;

    if(slot.player == 'X'){
        slotClass = 'X';
    } else if(slot.player == 'O'){
        slotClass = 'O';
    } else{
        slotClass = 'empty';
    }
    return (
        <div className="slot" onClick={() => dropDisc(index)}>
            <div className={[slotClass, "circle"].join(" ")}></div>
        </div>
    )
}

export default Slot;