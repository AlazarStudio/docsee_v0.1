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
import Notification from "../Notification/Notification.jsx";

function AddDocs() {
    // Состояния для меню и модальных окон
    const [menuOpenIndex, setMenuOpenIndex] = useState(null);
    const [downloadMenuOpenIndex, setDownloadMenuOpenIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIpModalOpen, setIsIpModalOpen] = useState(false);
    const [isCounterpartyModalOpen, setIsCounterpartyModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isActModalOpen, setIsActModalOpen] = useState(false);

    // Состояния для документов и контрагентов
    const [ipList, setIpList] = useState([]);
    const [counterpartyList, setCounterpartyList] = useState([]);
    const [docList, setDocList] = useState([]);
    const [currentContract, setCurrentContract] = useState(null);
    const [filesToDownload, setFilesToDownload] = useState([]);

    // Состояния для сортировки и поиска
    const [sortColumn, setSortColumn] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc'); // 'asc' для возрастания, 'desc' для убывания
    const [searchQuery, setSearchQuery] = useState('');

    const [notification, setNotification] = useState({ message: "", status: "" });

    const documentStates = ['Создан', 'Согласование', 'Закрывающие готовы', 'Ждет оплаты', 'Оплачен'];

    const clearNotification = () => {
        setNotification({ message: "", status: "" });
    };

    // Функция для получения данных
    const fetchDocuments = () => {
        GET_DATA('documents.json', setDocList);
        GET_DATA('ipName.json', setIpList);
        GET_DATA('contragents.json', setCounterpartyList);
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    // Функции для управления меню и модальными окнами
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

    const closeDownloadModal = () => {
        setIsDownloadModalOpen(false);
        setFilesToDownload([]);
    };

    // Функции для обработки данных
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
            await axios.post('https://backend.demoalazar.ru/generate-expenses', { formData });
            closeInvoiceModal();
            fetchDocuments();

            setNotification({ message: `Счет для документа ${formData.contractName} успешно создан`, status: "success" });
            // alert(`Счет для документа ${formData.contractName} успешно создан`);
        } catch (error) {
            console.error("Ошибка запроса", error);
            setNotification({ message: "Ошибка при отправке данных", status: "error" });
            // alert('Ошибка при отправке данных');
        }
    };

    const handleActSubmit = async (data) => {
        const formData = {
            creationDate: data.date,
            contractType: currentContract.data.contractType,
            contractName: currentContract.filename
        };
        try {
            await axios.post('https://backend.demoalazar.ru/generate-acts', { formData });
            closeActModal();
            fetchDocuments();
            setNotification({ message: `Акт для документа ${formData.contractName} успешно создан`, status: "success" });
            // alert(`Акт для документа ${formData.contractName} успешно создан`);
        } catch (error) {
            console.error("Ошибка запроса", error);

            setNotification({ message: "Ошибка при отправке данных", status: "error" });
            // alert('Ошибка при отправке данных');
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
            await axios.post('https://backend.demoalazar.ru/generate-report', { formData });
            closeReportModal();
            fetchDocuments();
            setNotification({ message: `Отчет для документа ${formData.contractName} успешно создан`, status: "success" });
            // alert(`Отчет для документа ${formData.contractName} успешно создан`);
        } catch (error) {
            console.error("Ошибка запроса", error);
            setNotification({ message: "Ошибка при отправке данных", status: "error" });
            // alert('Ошибка при отправке данных');
        }
    };

    const handleDeleteDocument = async (filename) => {
        var isAdmin = confirm("Вы уверены что хотите удалить документ?");

        if (isAdmin) {
            try {
                await axios.delete('https://backend.demoalazar.ru/delete-document', {
                    data: { filename }
                });
                fetchDocuments();
                setNotification({ message: `Документ ${filename} успешно удален`, status: "success" });
                // alert(`Документ ${filename} успешно удален`);
            } catch (error) {
                console.error("Ошибка запроса", error);
                setNotification({ message: "Ошибка при отправке данных", status: "error" });
                // alert('Ошибка при отправке данных');
            }
        }
    };

    const handleDownload = (option) => {
        if (option.type === 'single') {
            const link = document.createElement('a');
            link.href = `https://backend.demoalazar.ru/docs/${option.url}`;
            link.download = '';
            link.click();
        } else if (option.type === 'multiple') {
            setFilesToDownload(option.files);
            setIsDownloadModalOpen(true);
        }
    };

    // Функции для сортировки и фильтрации
    const handleSort = (column) => {
        let newSortDirection = 'asc';

        if (sortColumn === column) {
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
                case 'porNumber':
                    compareA = parseFloat(a.porNumber);
                    compareB = parseFloat(b.porNumber);
                    break;
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
                case 'state':
                    compareA = a.state;
                    compareB = b.state;
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
        return `${year}-${month}-${day}`;
    };

    const renderSortArrow = (column) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    // Фильтрация документов по поисковому запросу
    const filteredDocuments = docList.filter(doc => {
        const searchLower = searchQuery.toLowerCase();
        return (
            doc.filename.toLowerCase().includes(searchLower) ||
            doc.data.contractSubjectNom.toLowerCase().includes(searchLower) ||
            (doc.data.contragent.type === 'Самозанятый' ? doc.data.contragent.fullName : doc.data.contragent.shortName).toLowerCase().includes(searchLower) ||
            doc.data.numberDate.toLowerCase().includes(searchLower) ||
            doc.state.toLowerCase().includes(searchLower) ||
            doc.data.stoimostNumber.toLowerCase().includes(searchLower)
        );
    });

    // Функция для обновления состояния документа
    const changeStateDogovor = (filename, stateDogovor) => {
        handleUpdateStateDocument(filename, stateDogovor);
    };

    const handleUpdateStateDocument = async (filename, state) => {
        try {
            await axios.put('https://backend.demoalazar.ru/update-document-state', {
                data: { filename, state }
            });
            fetchDocuments();
            setNotification({ message: `Состояние успешно изменилось`, status: "success" });
        } catch (error) {
            console.error("Ошибка запроса", error);
            setNotification({ message: "Ошибка при отправке данных", status: "error" });
            // alert('Ошибка при отправке данных');
        }
    };

    // Группировка документов по состоянию
    const groupDocumentsByState = (documents) => {
        return documents.reduce((acc, doc) => {
            const state = doc.state;
            if (!acc[state]) {
                acc[state] = [];
            }
            acc[state].push(doc);
            return acc;
        }, {});
    };

    // Получаем сгруппированные документы
    const groupedDocuments = groupDocumentsByState(filteredDocuments);


    // const triggerSuccessNotification = () => {
    //     setNotification({ message: "Operation was successful!", status: "success" });
    // };

    // const triggerErrorNotification = () => {
    //     setNotification({ message: "Operation failed!", status: "error" });
    // };

    
    const handleExit = () => {
        localStorage.clear();
        window.location.reload();
    }
    
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
                    <img src="/exit.png" alt="" style={{width: '20px', cursor: 'pointer'}} onClick={handleExit} />
                </div>

                <div className={classes.mainForm_docs_title}>
                    <div className={classes.mainForm_docs_element}>
                        <div className={classes.mainForm_docs_element_info}>
                            {/* <div className={classes.mainForm_docs_element_num} onClick={() => handleSort('porNumber')}>№ {renderSortArrow('porNumber')}</div> */}
                            <div className={classes.mainForm_docs_element_name} onClick={() => handleSort('name')}>Наименование договора {renderSortArrow('name')}</div>
                            <div className={classes.mainForm_docs_element_contr} onClick={() => handleSort('subject')}>Предмет договора {renderSortArrow('subject')}</div>
                            <div className={classes.mainForm_docs_element_contr} onClick={() => handleSort('contragent')}>Контрагент {renderSortArrow('contragent')}</div>
                            <div className={classes.mainForm_docs_element_date} onClick={() => handleSort('date')}>Дата {renderSortArrow('date')}</div>
                            <div className={classes.mainForm_docs_element_price} onClick={() => handleSort('price')}>Стоимость {renderSortArrow('price')}</div>
                            <div className={classes.mainForm_docs_element_state} onClick={() => handleSort('state')}>Состояние {renderSortArrow('state')}</div>
                        </div>
                    </div>
                </div>

                {/* Рендеринг документов, сгруппированных по состояниям */}
                <div className={classes.mainForm_docs}>
                    {documentStates.map((state) => (
                        <div key={state} className={classes.documentGroup}>
                            {groupedDocuments[state] && groupedDocuments[state].length > 0 && <h3>{state}</h3>}
                            {groupedDocuments[state] && groupedDocuments[state].length > 0 && (
                                groupedDocuments[state].map((doc, index) => {
                                    const downloadOptions = [];

                                    if (doc.filename) {
                                        downloadOptions.push({ label: "Скачать договор", type: 'single', url: doc.filename });
                                    }
                                    if (doc.expenses && doc.expenses.length > 0) {
                                        if (doc.expenses.length === 1) {
                                            downloadOptions.push({ label: "Скачать счет", type: 'single', url: doc.expenses[0].filename });
                                        } else {
                                            downloadOptions.push({
                                                label: "Скачать счет", type: 'multiple', files: doc.expenses.map(expense => ({
                                                    label: `Счет №${expense.expensesNumber} от ${expense.creationDate} для ${doc.filename}`,
                                                    url: expense.filename
                                                }))
                                            });
                                        }
                                    }
                                    if (doc.acts && doc.acts.length > 0) {
                                        if (doc.acts.length === 1) {
                                            downloadOptions.push({ label: "Скачать акт", type: 'single', url: doc.acts[0].filename });
                                        } else {
                                            downloadOptions.push({
                                                label: "Скачать акт", type: 'multiple', files: doc.acts.map(act => ({
                                                    label: `Акт №${act.actsNumber} от ${act.creationDate} для ${doc.filename}`,
                                                    url: act.filename
                                                }))
                                            });
                                        }
                                    }
                                    if (doc.reports && doc.reports.length > 0) {
                                        if (doc.reports.length === 1) {
                                            downloadOptions.push({ label: "Скачать отчет", type: 'single', url: doc.reports[0].filename });
                                        } else {
                                            downloadOptions.push({
                                                label: "Скачать отчет", type: 'multiple', files: doc.reports.map(report => ({
                                                    label: `Отчет от ${report.creationDate} для ${doc.filename}`,
                                                    url: report.filename
                                                }))
                                            });
                                        }
                                    }
                                    if (doc.brif && doc.brif.length > 0) {
                                        if (doc.brif.length === 1) {
                                            downloadOptions.push({ label: "Скачать бриф", type: 'single', url: doc.brif[0].filename });
                                        } else {
                                            downloadOptions.push({ label: "Скачать бриф", type: 'multiple', files: doc.brif.map(brif => ({ label: `Бриф ${brif.creationDate}`, url: brif.filename })) });
                                        }
                                    }

                                    return (
                                        <div
                                            className={`
                                                ${classes.mainForm_docs_element}
                                                ${doc.state === 'Создан' && classes.grayState}
                                                ${doc.state === 'Закрывающие готовы' && classes.blueState}
                                                ${doc.state === 'Согласование' && classes.yellowState}
                                                ${doc.state === 'Ждет оплаты' && classes.orangeState}
                                                ${doc.state === 'Оплачен' && classes.greenState}
                                            `}
                                            key={doc.filename}
                                        >
                                            <div className={classes.mainForm_docs_element_info}>
                                                {/* <div className={classes.mainForm_docs_element_num}>{doc.porNumber}</div> */}
                                                <div className={classes.mainForm_docs_element_name}>
                                                    Договор №{doc.data.contractNumber} {
                                                        doc.data.receiver ?
                                                            (doc.data.receiver.type === 'Самозанятый' ? doc.data.receiver.fullName : doc.data.receiver.shortName) :
                                                            doc.data.contragent ?
                                                                (doc.data.contragent.type === 'Самозанятый' ? doc.data.contragent.fullName : doc.data.contragent.shortName)
                                                                : ''
                                                    }
                                                </div>
                                                <div className={classes.mainForm_docs_element_contr}>{doc.data.contractSubjectNom}</div>
                                                <div className={classes.mainForm_docs_element_contr}>{doc.data.contragent.type === 'Самозанятый' ? doc.data.contragent.fullName : doc.data.contragent.shortName}</div>
                                                <div className={classes.mainForm_docs_element_date}>{doc.data.numberDate}</div>
                                                <div className={classes.mainForm_docs_element_price}>{doc.data.stoimostNumber.toLocaleString('ru-RU')} ₽</div>
                                                <div className={classes.mainForm_docs_element_state}>
                                                    <select onChange={(e) => changeStateDogovor(doc.filename, e.target.value)} value={doc.state}>
                                                        <option value="Создан">Создан</option>
                                                        <option value="Закрывающие готовы">Закрывающие готовы</option>
                                                        <option value="Согласование">Согласование</option>
                                                        <option value="Ждет оплаты">Ждет оплаты</option>
                                                        <option value="Оплачен">Оплачен</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={classes.mainForm_docs_element_btns}>
                                                <img src="/download_doc.png" alt="" onClick={() => toggleDownloadMenu(doc.filename)} />
                                                {downloadMenuOpenIndex === doc.filename && (
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
                                                <img src="/dots.png" alt="" onClick={() => toggleMenu(doc.filename)} />
                                                {menuOpenIndex === doc.filename && (
                                                    <DropdownMenu
                                                        options={[
                                                            "Создать счет",
                                                            "Создать акт",
                                                            "Создать отчет",
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
                                })
                            )}
                        </div>
                    ))}
                </div>

            </div>

            <Notification message={notification.message} status={notification.status} clearNotification={clearNotification} />

            {/* Модальные окна */}
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
                                link.href = `https://backend.demoalazar.ru/docs/${file.url}`;
                                link.download = '';
                                link.click();
                                closeDownloadModal();
                            }}>
                                {file.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </div>
    );
}

export default AddDocs;
