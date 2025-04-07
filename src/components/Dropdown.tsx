import { useCallback, useEffect, useState, useRef } from 'preact/hooks';
import { useHandler } from '@tater-archives/react-use-handler';

function Dropdown<T,>(props: {
    options: T[],
    value: number,
    onInput: (value: number) => void,
    children: (option: T) => preact.ComponentChild
}) {
    const [opened, setOpened] = useState(false);
    
    const handleClick = useCallback(() => {
        setOpened(true);
    }, []);

    useHandler('click', useCallback(() => {
        if (opened) {
            setOpened(false);
        }
    }, [opened]));

    const [dropdownHeight, setDropdownHeight] = useState<number | undefined>();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fixSize = useCallback(() => {
        console.log(`checking resize for ${props.value}`);
        if (!dropdownRef.current) return;
        const rect = dropdownRef.current.getBoundingClientRect();
        const height = window.innerHeight - rect.top
        if (height > rect.height) {
            setDropdownHeight(undefined);
        } else {
            setDropdownHeight(height);
        }
    }, [])

    useHandler('resize', fixSize);

    useEffect(fixSize, []);

    return <div class={`dropdown ${opened ? 'dropdown-open' : ''}`}>
        <div class="dropdown-button" onClick={handleClick}>{props.children(props.options[props.value])}</div>
        <div class="dropdown-content" ref={dropdownRef} style={{maxHeight: dropdownHeight}}>{props.options.map((e, i) => (
            <div key={i} class="dropdown-option" onClick={() => props.onInput(i)}>
                {props.children(e)}
            </div>
        ))}</div>
    </div>
}

export { Dropdown };
