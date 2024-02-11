import { useCountUp } from 'use-count-up';

export const useAnimatedCount = (end: number) => {
    const { value } = useCountUp({
        isCounting: true,
        end,
        duration: 3.2,
    });

    return value;
};


