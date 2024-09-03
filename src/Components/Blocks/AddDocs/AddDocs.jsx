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

    const handleInvoiceSubmit = async (data) => {
        const formData = {
            creationDate: data.date,
            contractName: currentContract.filename
        };
        try {
            await axios.post('http://31.128.44.173:80/generate-expenses', { formData });
            closeInvoiceModal();
            fetchDocuments();
            alert(`Счет для документа ${formData.contractName} успешно создан`);
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

    const handleActSubmit = async (data) => {
        const formData = {
            creationDate: data.date,
            contractType: currentContract.data.contractType,
            contractName: currentContract.filename
        };
        console.log(formData);
        try {
            await axios.post('http://31.128.44.173:80/generate-acts', { formData });
            closeActModal();
            fetchDocuments();
            alert(`Акт для документа ${formData.contractName} успешно создан`);
        } catch (error) {
            console.error("Ошибка запроса", error);
            alert('Ошибка при отправке данных');
        }
    };

    const handleReportSubmit = async (data) => {
        const formData = {
            creationDate: data.date,
            contractType: data.contractType,
            reportTemplate: data.reportTemplate,
            contractName: currentContract.filename
        };
        try {
            await axios.post('http://31.128.44.173:80/generate-report', { formData });
            closeReportModal();
            fetchDocuments();
            alert(`Отчет для документа ${formData.contractName} успешно создан`);
        } catch (error) {
            console.error("Ошибка запроса", error);
            alert('Ошибка при отправке данных');
        }
    };

    const handleDeleteDocument = async (filename) => {
        var isAdmin = confirm("Вы уверены что хотите удалить документ?");

        if (isAdmin) {
            try {
                await axios.delete('http://31.128.44.173:80/delete-document', {
                    data: { filename }
                });
                fetchDocuments();
                alert(`Документ ${filename} успешно удален`);
            } catch (error) {
                console.error("Ошибка запроса", error);
                alert('Ошибка при отправке данных');
            }
        }
    };


    const handleDownload = (option) => {
        if (option.type === 'single') {
            const link = document.createElement('a');
            link.href = `http://31.128.44.173:80/docs/${option.url}`;
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

    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' для возрастания, 'desc' для убывания

    const handleSort = (column) => {
        let newSortDirection = 'asc';

        if (sortColumn === column) {
            // Если кликнули на ту же колонку, меняем направление сортировки
            newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        }

        setSortColumn(column);
        setSortDirection(newSortDirection);
        sortDocuments(column, newSortDirection);
    };

    const sortDocuments = (column, direction) => {
        const sortedDocuments = [...docList].sort((a, b) => {
            let compareA, compareB;
            switch (column) {
                case 'name':
                    compareA = a.filename;
                    compareB = b.filename;
                    break;
                case 'subject':
                    compareA = a.data.contractSubjectNom;
                    compareB = b.data.contractSubjectNom;
                    break;
                case 'contragent':
                    compareA = a.data.contragent.type === 'Самозанятый' ? a.data.contragent.fullName : a.data.contragent.shortName;
                    compareB = b.data.contragent.type === 'Самозанятый' ? b.data.contragent.fullName : b.data.contragent.shortName;
                    break;
                case 'date':
                    compareA = convertDate(a.data.numberDate);
                    compareB = convertDate(b.data.numberDate);
                    break;
                case 'price':
                    compareA = parseFloat(a.data.stoimostNumber);
                    compareB = parseFloat(b.data.stoimostNumber);
                    break;
                default:
                    return 0;
            }

            if (compareA < compareB) return direction === 'asc' ? -1 : 1;
            if (compareA > compareB) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setDocList(sortedDocuments);
    };

    const convertDate = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return `${month}-${day}-${year}`;
    };


    // функция для отображения стрелки
    const renderSortArrow = (column) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    const [searchQuery, setSearchQuery] = useState('');

    const filteredDocuments = docList.filter(doc => {
        const searchLower = searchQuery.toLowerCase();
        return (
            doc.filename.toLowerCase().includes(searchLower) ||
            doc.data.contractSubjectNom.toLowerCase().includes(searchLower) ||
            (doc.data.contragent.type === 'Самозанятый' ? doc.data.contragent.fullName : doc.data.contragent.shortName).toLowerCase().includes(searchLower) ||
            doc.data.numberDate.toLowerCase().includes(searchLower) ||
            doc.data.stoimostNumber.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className={classes.main}>
            <div className={classes.mainForm}>
                <div className={classes.mainForm_buttons}>
                    <div className={classes.mainForm_buttons_elem}>
                        <div className={classes.mainForm_buttons_btn} onClick={openModal}>Создать документ</div>
                        <div className={classes.mainForm_buttons_btn} onClick={openIpModal}>Добавить ИП</div>
                        <div className={classes.mainForm_buttons_btn} onClick={openCounterpartyModal}>Добавить контрагента</div>
                    </div>

                    <div className={classes.mainForm_buttons_search}>
                        <input
                            type="text"
                            className={classes.searchInput}
                            placeholder="Поиск..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className={classes.mainForm_docs_title}>
                    <div className={classes.mainForm_docs_element}>
                        <div className={classes.mainForm_docs_element_info}>
                            <div className={classes.mainForm_docs_element_num}>№</div>
                            <div className={classes.mainForm_docs_element_name} onClick={() => handleSort('name')}>Наименование договора {renderSortArrow('name')}</div>
                            <div className={classes.mainForm_docs_element_contr} onClick={() => handleSort('subject')}>Предмет договора {renderSortArrow('subject')}</div>
                            <div className={classes.mainForm_docs_element_contr} onClick={() => handleSort('contragent')}>Контрагент {renderSortArrow('contragent')}</div>
                            <div className={classes.mainForm_docs_element_date} onClick={() => handleSort('date')}>Дата {renderSortArrow('date')}</div>
                            <div className={classes.mainForm_docs_element_price} onClick={() => handleSort('price')}>Стоимость {renderSortArrow('price')}</div>
                        </div>
                    </div>
                </div>

                <div className={classes.mainForm_docs}>
                    {(docList && docList.length > 0) && filteredDocuments.map((doc, index) => {
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
                                    <div className={classes.mainForm_docs_element_name}>
                                        Договор №{doc.data.contractNumber} {
                                            doc.data.receiver ?
                                                (doc.data.receiver.type == 'Самозанятый' ? doc.data.receiver.fullName : doc.data.receiver.shortName) :
                                                doc.data.contragent ?
                                                    (doc.data.contragent.type == 'Самозанятый' ? doc.data.contragent.fullName : doc.data.contragent.shortName)
                                                    : ''
                                        }
                                    </div>
                                    <div className={classes.mainForm_docs_element_contr}>{doc.data.contractSubjectNom}</div>
                                    <div className={classes.mainForm_docs_element_contr}>{doc.data.contragent.type === 'Самозанятый' ? doc.data.contragent.fullName : doc.data.contragent.shortName}</div>
                                    <div className={classes.mainForm_docs_element_date}>{doc.data.numberDate}</div>
                                    <div className={classes.mainForm_docs_element_price}>{Number(doc.data.stoimostNumber).toLocaleString('ru-RU')} ₽</div>
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
                                    <img className={classes.deleteIcon} src="/delete.png" alt="" onClick={() => handleDeleteDocument(doc.filename)} />
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
                <CreateReportForm onSubmit={handleReportSubmit} currentContract={currentContract} onClose={closeReportModal} />
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
                                link.href = `http://31.128.44.173:80/docs/${file.url}`;
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
