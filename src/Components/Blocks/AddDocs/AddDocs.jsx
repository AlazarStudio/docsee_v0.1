import React, { useEffect, useState } from "react";
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Modal from '../Modal/Modal';
import CreateDocument from '../CreateDocument/CreateDocument';
import AddIp from '../AddIp/AddIp';
import AddCounterparty from '../AddCounterparty/AddCounterparty';
import CreateInvoiceForm from '../CreateInvoiceForm/CreateInvoiceForm';  // Импорт формы для счета
import classes from './AddDocs.module.css';
import { GET_DATA } from '../../../../requests.js'
import axios from 'axios';

function AddDocs() {
    const [menuOpenIndex, setMenuOpenIndex] = useState(null);
    const [downloadMenuOpenIndex, setDownloadMenuOpenIndex] = useState(null); // Состояние для выпадающего меню скачивания
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIpModalOpen, setIsIpModalOpen] = useState(false);
    const [isCounterpartyModalOpen, setIsCounterpartyModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);  // Состояние для модалки счета

    const [ipList, setIpList] = useState([]);
    const [counterpartyList, setCounterpartyList] = useState([]);
    const [docList, setDocList] = useState([]);
    const [currentContract, setCurrentContract] = useState(null);  // Состояние для текущего выбранного договора

    const fetchDocuments = () => {
        GET_DATA('documents.json', setDocList);
    };

    useEffect(() => {
        GET_DATA('ipName.json', setIpList);
        GET_DATA('contragents.json', setCounterpartyList);
        fetchDocuments();
    }, []);

    const toggleMenu = (index) => {
        setMenuOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const closeMenu = () => {
        setMenuOpenIndex(null);
    };

    const toggleDownloadMenu = (index) => {
        setDownloadMenuOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const closeDownloadMenu = () => {
        setDownloadMenuOpenIndex(null);
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

    const openInvoiceModal = (contract) => {
        setCurrentContract(contract);  // Сохраняем выбранный договор
        setIsInvoiceModalOpen(true);
    };

    const closeInvoiceModal = () => {
        setIsInvoiceModalOpen(false);
        setCurrentContract(null);  // Очищаем текущий выбранный договор
    };

    const handleIpSubmit = (ipData) => {
        setIpList(prevList => [...prevList, ipData]);
        closeIpModal();
    };

    const handleCounterpartySubmit = (counterpartyData) => {
        setCounterpartyList(prevList => [...prevList, counterpartyData]);
        closeCounterpartyModal();
    };

    const handleInvoiceSubmit = async (creationDate) => {
        const formData = {
            creationDate,
            contractName: currentContract.filename
        };
        try {
            await axios.post('http://localhost:3000/generate-expenses', { formData });
            closeInvoiceModal();
            fetchDocuments();
        } catch (error) {
            console.error("Ошибка запроса", error);
            alert('Ошибка при отправке данных');
        }
    };

    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = `http://localhost:3000/docs/${url}`;
        link.download = '';  // Укажите имя файла, если оно должно быть отличным от стандартного
        link.click();
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

                    {docList.length > 0 && docList.map((doc, index) => {
                        const downloadOptions = [];

                        if (doc.filename) {
                            
                            downloadOptions.push({ label: "Скачать договор", url: doc.filename });
                        }
                        if (doc.expenses) {
                            downloadOptions.push({ label: "Скачать счет", url: doc.expenses[0].filename });
                        }
                        if (doc.act) {
                            downloadOptions.push({ label: "Скачать акт", url: doc.act[0].filename });
                        }
                        if (doc.reports) {
                            downloadOptions.push({ label: "Скачать отчет", url: doc.reports[0].filename });
                        }
                        if (doc.brif) {
                            downloadOptions.push({ label: "Скачать бриф", url: doc.brif[0].filename });
                        }

                        return (
                            <div className={classes.mainForm_docs_element} key={index}>
                                <div className={classes.mainForm_docs_element_info}>
                                    <div className={classes.mainForm_docs_element_name}>Договор №{doc.data.contractNumber} {doc.data.receiver.fullName}</div>
                                    <div className={classes.mainForm_docs_element_contr}>{doc.data.contragent.type === 'Самозанятый' ? doc.data.contragent.fullName : doc.data.contragent.shortName}</div>
                                    <div className={classes.mainForm_docs_element_date}>{doc.data.numberDate}</div>
                                    <div className={classes.mainForm_docs_element_price}>{doc.data.stoimostNumber} ₽</div>
                                </div>
                                <div className={classes.mainForm_docs_element_btns}>
                                    <img src="/download_doc.png" alt="" onClick={() => toggleDownloadMenu(index)} />
                                    {downloadMenuOpenIndex === index && (
                                        <DropdownMenu
                                            options={downloadOptions.map(option => option.label)}
                                            onClose={closeDownloadMenu}
                                            onSelect={(selectedOption) => {
                                                const selectedDownloadOption = downloadOptions.find(option => option.label === selectedOption);
                                                handleDownload(selectedDownloadOption.url);
                                                closeDownloadMenu();
                                            }}
                                        />
                                    )}
                                    <img src="/dots.png" alt="" onClick={() => toggleMenu(index)} />
                                    {menuOpenIndex === index && (
                                        <DropdownMenu
                                            options={[
                                                "Создать счет",
                                                "Создать акт",
                                                "Создать отчет",
                                                "Создать бриф",
                                            ]}
                                            onClose={closeMenu}
                                            onSelect={(option) => {
                                                closeMenu();
                                                if (option === "Создать счет") {
                                                    openInvoiceModal(doc);
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CreateDocument closeModal={closeModal} fetchDocuments={fetchDocuments} ipList={ipList} counterpartyList={counterpartyList} openIpModal={openIpModal} openCounterpartyModal={openCounterpartyModal} />
            </Modal>

            <Modal isOpen={isInvoiceModalOpen} onClose={closeInvoiceModal}>
                <CreateInvoiceForm onSubmit={handleInvoiceSubmit} onClose={closeInvoiceModal} />
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
