import React, { useEffect, useState } from "react";
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Modal from '../Modal/Modal';
import CreateDocument from '../CreateDocument/CreateDocument';
import AddIp from '../AddIp/AddIp';
import AddCounterparty from '../AddCounterparty/AddCounterparty';
import classes from './AddDocs.module.css';
import { GET_DATA } from '../../../../requests.js'

function AddDocs() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIpModalOpen, setIsIpModalOpen] = useState(false);
    const [isCounterpartyModalOpen, setIsCounterpartyModalOpen] = useState(false);

    const [ipList, setIpList] = useState([]);
    const [counterpartyList, setCounterpartyList] = useState([]);
    const [docList, setDocList] = useState([]);

    useEffect(() => {
        GET_DATA('ipName.json', setIpList);
        GET_DATA('contragents.json', setCounterpartyList);
        GET_DATA('documents.json', setDocList);
    }, []);

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

    const openCounterpartyModal = () => {
        setIsCounterpartyModalOpen(true);
    };

    const closeCounterpartyModal = () => {
        setIsCounterpartyModalOpen(false);
    };

    const handleIpSubmit = (ipData) => {
        setIpList(prevList => [...prevList, ipData]);
        closeIpModal();
    };

    const handleCounterpartySubmit = (counterpartyData) => {
        setCounterpartyList(prevList => [...prevList, counterpartyData]);
        closeCounterpartyModal();
    };

    return (
        <div className={classes.main}>
            <div className={classes.mainForm}>
                <div className={classes.mainForm_buttons}>
                    <div className={classes.mainForm_buttons_btn} onClick={openModal}>Создать документ</div>
                    <div className={classes.mainForm_buttons_btn} onClick={openIpModal}>Добавить ИП</div>
                    <div className={classes.mainForm_buttons_btn} onClick={openCounterpartyModal}>Добавить контрагента</div>
                </div>

                <div className={classes.mainForm_docs}>
                    <div className={classes.mainForm_docs_element}>
                        <div className={classes.mainForm_docs_element_info}>
                            <div className={classes.mainForm_docs_element_name}>Наименование договора</div>
                            <div className={classes.mainForm_docs_element_contr}>Контрагент</div>
                            <div className={classes.mainForm_docs_element_date}>Дата</div>
                            <div className={classes.mainForm_docs_element_price}>Стоимость</div>
                        </div>
                    </div>

                    {docList.length > 0 && docList.map((doc, index) => (
                        <div className={classes.mainForm_docs_element} key={index}>
                            <div className={classes.mainForm_docs_element_info}>
                                <div className={classes.mainForm_docs_element_name}>{doc.filename}</div>
                                <div className={classes.mainForm_docs_element_contr}>{doc.data.contragent.type == 'Самозанятый' ? doc.data.contragent.fullName : doc.data.contragent.shortName}</div>
                                <div className={classes.mainForm_docs_element_date}>{doc.data.numberDate}</div>
                                <div className={classes.mainForm_docs_element_price}>{doc.data.stoimostNumber} ₽</div>
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
                    ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CreateDocument closeModal={closeModal} ipList={ipList} counterpartyList={counterpartyList} openIpModal={openIpModal} openCounterpartyModal={openCounterpartyModal} />
            </Modal>

            <Modal isOpen={isIpModalOpen} onClose={closeIpModal}>
                <AddIp onSubmit={handleIpSubmit} />
            </Modal>

            <Modal isOpen={isCounterpartyModalOpen} onClose={closeCounterpartyModal}>
                <AddCounterparty onSubmit={handleCounterpartySubmit} />
            </Modal>
        </div>
    );
}

export default AddDocs;
