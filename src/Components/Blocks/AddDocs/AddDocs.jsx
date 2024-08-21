import React, { useEffect, useRef, useState } from "react";
import classes from './AddDocs.module.css';

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

function AddDocs({ children, ...props }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={classes.main}>
            <div className={classes.mainForm}>
                <div className={classes.mainForm_buttons}>
                    <div className={classes.mainForm_buttons_btn}>Создать документ</div>
                    <div className={classes.mainForm_buttons_btn}>Добавить ИП</div>
                    <div className={classes.mainForm_buttons_btn}>Добавить контрагента</div>
                </div>

                <div className={classes.mainForm_docs}>
                    <div className={classes.mainForm_docs_element}>
                        <div className={classes.mainForm_docs_element_info}>
                            <div className={classes.mainForm_docs_element_name}>Договор №1 от 16.08.2024</div>
                            <div className={classes.mainForm_docs_element_contr}>ТПП КЧР - ИНН: 0919 0020 2707</div>
                            <div className={classes.mainForm_docs_element_date}>16.08.2024</div>
                            <div className={classes.mainForm_docs_element_price}>115 000 ₽</div>
                        </div>
                        <div className={classes.mainForm_docs_element_btns}>
                            <img src="/dots.png" alt="" onClick={toggleMenu} />
                            {isMenuOpen && (
                                <DropdownMenu
                                    options={[
                                        "Создать счет",
                                        "Создать акт",
                                        "Создать отчет",
                                        "Создать бриф",
                                    ]}
                                    onClose={closeMenu}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDocs;
