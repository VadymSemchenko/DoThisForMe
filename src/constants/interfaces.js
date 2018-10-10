import { shape, string, bool, number } from 'prop-types';

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

export const dealItemInterface = shape({
    requestor: shape({
        displayName: string,
        uid: string
    }),
    operator: shape({
        displayName: string,
        uid: string
    }),
    text: string,
    currentBid: shape({
        value: string,
        authorStatus: string
    }),
    status: shape({
        accepted: bool
    })
});