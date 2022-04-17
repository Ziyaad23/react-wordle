import React, { useEffect } from 'react';
import { keys } from '../Constants/constants';

const Keyboard = ({ boardData, handleKeyPress }) => {

    return (
        <div className="flex flex-col items-center gap-2 mb-10">
            {keys.map((item, index) => (
                <div className="w-auto flex gap-1" key={index}>
                    {
                        item.map((key, keyIndex) => (
                            <button key={keyIndex}
                                className={`${boardData && boardData.correctCharArray.includes(key) ? "bg-[#6aaa64] text-white" :
                                    (boardData && boardData.presentCharArray.includes(key) ? "bg-[#c9b458] text-white" :
                                        boardData && boardData.absentCharArray.includes(key) ? "bg-[#787c7e] text-white" : "")} `}
                                onClick={() => { handleKeyPress(key) }}>
                                {key}
                            </button>
                        ))
                    }
                </div>
            ))}
        </div>);
};

export default Keyboard;