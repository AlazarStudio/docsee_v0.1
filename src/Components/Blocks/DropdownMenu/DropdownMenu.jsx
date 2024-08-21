import React, { useEffect, useRef } from 'react';
import classes from './DropdownMenu.module.css';

function DropdownMenu({ options, onClose }) {
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={menuRef} className={classes.dropdownMenu}>
            {options.map((option, index) => (
                <div key={index} className={classes.dropdownMenu_item}>
                    {option}
                </div>
            ))}
        </div>
    );
}

export default DropdownMenu;
