import stringToColor from '@/lib/stringToColor'
import React from 'react'
import { motion } from "motion/react"

const FollowPointer = ({
    x, y, info
}: {
    x: number,
    y: number,
    info: {
        name: string,
        email: string,
        avatar: string
    }
}) => {
    const color = stringToColor(info.email || '1');
    return (
        <motion.div 
            style={{
                top: y,
                left: x,
            }}
            initial={{
                scale: 1,
                opacity: 1,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            exit={{
                scale: 0,
                opacity: 0,
            }}
            className='h-4 w-4 rounded-full absolute z-50'
        >
            <div>/</div>
            <motion.div
                style={{
                    backgroundColor: color
                }}
                initial={{
                    scale: 0.5,
                    opacity: 1,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                exit={{
                    scale: 0.5,
                    opacity: 0,
                }}
                className='px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap rounded-full text-xs min-w-max'
            >
                {info?.name || info.email}
            </motion.div>
        </motion.div>
    )
}

export default FollowPointer