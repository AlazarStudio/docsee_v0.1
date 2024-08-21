import React, { useState } from "react";
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Modal from '../Modal/Modal';
import CreateDocument from '../CreateDocument/CreateDocument';
import AddIp from '../AddIp/AddIp';
import classes from './AddDocs.module.css';

function AddDocs() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIpModalOpen, setIsIpModalOpen] = useState(false);

    const [ipList, setIpList] = useState([]); // Список для хранения ИП

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openIpModal = () => {
        setIsIpModalOpen(true);
    };

    const closeIpModal = () => {
        setIsIpModalOpen(false);
    };

    const handleIpSubmit = (ipData) => {
        setIpList(prevList => [...prevList, ipData]);
        closeIpModal();
    };

    return (
        <div className={classes.main}>
            <div className={classes.mainForm}>
                <div className={classes.mainForm_buttons}>
                    <div className={classes.mainForm_buttons_btn} onClick={openModal}>Создать документ</div>
                    <div className={classes.mainForm_buttons_btn} onClick={openIpModal}>Добавить ИП</div>
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

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CreateDocument closeModal={closeModal} ipList={ipList} />
            </Modal>

            <Modal isOpen={isIpModalOpen} onClose={closeIpModal}>
                <AddIp onSubmit={handleIpSubmit} />
            </Modal>
        </div>
    );
}

export default AddDocs;
