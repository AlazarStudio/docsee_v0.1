import React, { useEffect, useState } from "react";
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Modal from '../Modal/Modal';
import CreateDocument from '../CreateDocument/CreateDocument';
import AddIp from '../AddIp/AddIp';
import AddCounterparty from '../AddCounterparty/AddCounterparty';
import CreateInvoiceForm from '../CreateInvoiceForm/CreateInvoiceForm';
import classes from './AddDocs.module.css';
import { GET_DATA } from '../../../../requests.js';
import axios from 'axios';
import CreateActForm from "../CreateActForm/CreateActForm.jsx";
import CreateReportForm from "../CreateReportForm/CreateReportForm.jsx";

function AddDocs() {
    const [menuOpenIndex, setMenuOpenIndex] = useState(null);
    const [downloadMenuOpenIndex, setDownloadMenuOpenIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIpModalOpen, setIsIpModalOpen] = useState(false);
    const [isCounterpartyModalOpen, setIsCounterpartyModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false); 
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);


    const [ipList, setIpList] = useState([]);
    const [counterpartyList, setCounterpartyList] = useState([]);
    const [docList, setDocList] = useState([]);
    const [currentContract, setCurrentContract] = useState(null);
    const [filesToDownload, setFilesToDownload] = useState([]);

    const fetchDocuments = () => {
        GET_DATA('documents.json', setDocList);
        GET_DATA('ipName.json', setIpList);
        GET_DATA('contragents.json', setCounterpartyList);
    };

    const sortDocumentsByDate = (documents) => {
        return documents.sort((a, b) => {
            const dateA = new Date(a.data.numberDate);
            const dateB = new Date(b.data.numberDate);
            return dateB - dateA;  // Сортировка по убыванию
        });
    };

    useEffect(() => {
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
        setCurrentContract(contract);
        setIsInvoiceModalOpen(true);
    };

    const closeInvoiceModal = () => {
        setIsInvoiceModalOpen(false);
        setCurrentContract(null);
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

    const [isActModalOpen, setIsActModalOpen] = useState(false);

    const openActModal = (contract) => {
        setCurrentContract(contract);
        setIsActModalOpen(true);
    };

    const closeActModal = () => {
        setIsActModalOpen(false);
        setCurrentContract(null);
    };

    const openReportModal = (contract) => {
        setCurrentContract(contract);
        setIsReportModalOpen(true);
    };
    
    const closeReportModal = () => {
        setIsReportModalOpen(false);
        setCurrentContract(null);
    };

    const handleActSubmit = async (creationDate) => {
        const formData = {
            creationDate,
            contractName: currentContract.filename
        };
        try {
            await axios.post('http://localhost:3000/generate-acts', { formData });
            closeActModal();
            fetchDocuments();
        } catch (error) {
            console.error("Ошибка запроса", error);
            alert('Ошибка при отправке данных');
        }
    };

    const handleReportSubmit = async (creationDate) => {
        const formData = {
            creationDate,
            contractName: currentContract.filename
        };
        try {
            await axios.post('http://localhost:3000/generate-report', { formData });
            closeReportModal();
            fetchDocuments();
        } catch (error) {
            console.error("Ошибка запроса", error);
            alert('Ошибка при отправке данных');
        }
    };


    const handleDownload = (option) => {
        if (option.type === 'single') {
            const link = document.createElement('a');
            link.href = `http://localhost:3000/docs/${option.url}`;
            link.download = '';
            link.click();
        } else if (option.type === 'multiple') {
            setFilesToDownload(option.files);
            setIsDownloadModalOpen(true);
        }
    };

    const closeDownloadModal = () => {
        setIsDownloadModalOpen(false);
        setFilesToDownload([]);
    };

    return (
        <div className={classes.main}>
            <div className={classes.mainForm}>
                <div className={classes.mainForm_buttons}>
                    <div className={classes.mainForm_buttons_btn} onClick={openModal}>Создать документ</div>
                    <div className={classes.mainForm_buttons_btn} onClick={openIpModal}>Добавить ИП</div>
                    <div className={classes.mainForm_buttons_btn} onClick={openCounterpartyModal}>Добавить контрагента</div>
                </div>

                <div className={classes.mainForm_docs_title}>
                    <div className={classes.mainForm_docs_element}>
                        <div className={classes.mainForm_docs_element_info}>
                            <div className={classes.mainForm_docs_element_num}>№</div>
                            <div className={classes.mainForm_docs_element_name}>Наименование договора</div>
                            <div className={classes.mainForm_docs_element_contr}>Контрагент</div>
                            <div className={classes.mainForm_docs_element_date}>Дата</div>
                            <div className={classes.mainForm_docs_element_price}>Стоимость</div>
                        </div>
                    </div>
                </div>

                <div className={classes.mainForm_docs}>
                    {docList.length > 0 && sortDocumentsByDate(docList).map((doc, index) => {
                        const downloadOptions = [];

                        if (doc.filename) {
                            downloadOptions.push({ label: "Скачать договор", type: 'single', url: doc.filename });
                        }
                        if (doc.expenses && doc.expenses.length > 0) {
                            if (doc.expenses.length === 1) {
                                downloadOptions.push({ label: "Скачать счет", type: 'single', url: doc.expenses[0].filename });
                            } else {
                                downloadOptions.push({ label: "Скачать счет", type: 'multiple', files: doc.expenses.map(expense => ({ label: `Счет ${expense.date}`, url: expense.filename })) });
                            }
                        }
                        if (doc.acts && doc.acts.length > 0) {
                            if (doc.acts.length === 1) {
                                downloadOptions.push({ label: "Скачать акт", type: 'single', url: doc.acts[0].filename });
                            } else {
                                downloadOptions.push({ label: "Скачать акт", type: 'multiple', files: doc.acts.map(act => ({ label: `Акт ${act.date}`, url: act.filename })) });
                            }
                        }
                        if (doc.reports && doc.reports.length > 0) {
                            if (doc.reports.length === 1) {
                                downloadOptions.push({ label: "Скачать отчет", type: 'single', url: doc.reports[0].filename });
                            } else {
                                downloadOptions.push({ label: "Скачать отчет", type: 'multiple', files: doc.reports.map(report => ({ label: `Отчет ${report.date}`, url: report.filename })) });
                            }
                        }
                        if (doc.brif && doc.brif.length > 0) {
                            if (doc.brif.length === 1) {
                                downloadOptions.push({ label: "Скачать бриф", type: 'single', url: doc.brif[0].filename });
                            } else {
                                downloadOptions.push({ label: "Скачать бриф", type: 'multiple', files: doc.brif.map(brif => ({ label: `Бриф ${brif.date}`, url: brif.filename })) });
                            }
                        }

                        return (
                            <div className={classes.mainForm_docs_element} key={index}>
                                <div className={classes.mainForm_docs_element_info}>
                                    <div className={classes.mainForm_docs_element_num}>{index + 1}</div>
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
                                                handleDownload(selectedDownloadOption);
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
                                                // "Создать бриф",
                                            ]}
                                            onClose={closeMenu}
                                            onSelect={(option) => {
                                                closeMenu();
                                                if (option === "Создать счет") {
                                                    openInvoiceModal(doc);
                                                } else if (option === "Создать акт") {
                                                    openActModal(doc);
                                                } else if (option === "Создать отчет") {
                                                    openReportModal(doc);
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

            <Modal isOpen={isActModalOpen} onClose={closeActModal}>
                <CreateActForm onSubmit={handleActSubmit} onClose={closeActModal} />
            </Modal>

            <Modal isOpen={isReportModalOpen} onClose={closeReportModal}>
                <CreateReportForm onSubmit={handleReportSubmit} onClose={closeReportModal} />
            </Modal>

            <Modal isOpen={isIpModalOpen} onClose={closeIpModal}>
                <AddIp onSubmit={handleIpSubmit} />
            </Modal>

            <Modal isOpen={isCounterpartyModalOpen} onClose={closeCounterpartyModal}>
                <AddCounterparty onSubmit={handleCounterpartySubmit} />
            </Modal>

            <Modal isOpen={isDownloadModalOpen} onClose={closeDownloadModal}>
                <div className={classes.downloadModal}>
                    <h3>Выберите файл для скачивания:</h3>
                    <ul>
                        {filesToDownload.map((file, index) => (
                            <li key={index} onClick={() => {
                                const link = document.createElement('a');
                                link.href = `http://localhost:3000/docs/${file.url}`;
                                link.download = '';
                                link.click();
                                closeDownloadModal();
                            }}>
                                {file.url}
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </div>
    );
}

export default AddDocs;
