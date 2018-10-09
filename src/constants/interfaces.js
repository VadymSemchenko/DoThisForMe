import { shape, func, string, bool, number } from 'prop-types';

export const newMotionInterface = shape({
    operator: shape({
        uid: string,
        displayName: string
    }),
    task: shape({
        name: string
    }),
    time: shape({
        finishTime: number,
        creationTime: number
    })
});