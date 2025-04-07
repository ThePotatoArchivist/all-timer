import { Dispatch, StateUpdater, useCallback, useEffect, useState } from 'preact/hooks';

function useLocalStorageState<T>(initialValue: T | (() => T), key: string, overrideInitial = false): [T, Dispatch<StateUpdater<T>>] {
    const [state, setState] = useState(initialValue);
    
    useEffect(() => {
        if (overrideInitial) return;
        const currentValue = localStorage.getItem(key);
        if (currentValue) {
            setState(JSON.parse(currentValue));
        } else {
            localStorage.setItem(key, JSON.stringify(initialValue));
        }
    }, [key]);
    
    const handleUpdateState: Dispatch<StateUpdater<T>> = useCallback(value => {
        setState(currentValue => {
            const newValue = (typeof value === 'function') ? (value as (prevState: T) => T)(currentValue) : value;
            localStorage.setItem(key, JSON.stringify(newValue));
            return newValue;
        });
    }, []);
    
    return [state, handleUpdateState];
}

export { useLocalStorageState };
