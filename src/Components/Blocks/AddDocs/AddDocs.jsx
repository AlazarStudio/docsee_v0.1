import React, { useEffect, useRef, useState } from "react";
import ReactModal from 'react-modal';
import classes from './AddDocs.module.css';

import { rubles } from 'rubles'

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contractType, setContractType] = useState('двухсторонний');
    const [numberDate, setNumberDate] = useState('');
    const [writtenDate, setWrittenDate] = useState('');
    const [amount, setAmount] = useState('');
    const [kopecks, setKopecks] = useState('');
    const [writtenAmount, setWrittenAmount] = useState('');

    const [template, setTemplate] = useState('template1');
    const [ip, setIp] = useState('ip1');
    const [contragent, setContragent] = useState('contr1');
    const [receiver, setReceiver] = useState('receiver1');
    const [contractNumber, setContractNumber] = useState('');
    const [contractSubjectNom, setContractSubjectNom] = useState('');
    const [contractSubjectGen, setContractSubjectGen] = useState('');
    const [contractEndDate, setContractEndDate] = useState('');
    const [stoimostNumber, setStoimostNumber] = useState('');

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

    const handleContractTypeChange = (event) => {
        setContractType(event.target.value);
    };

    function getDate(dateInfo, type = 'numeric') {
        const date = new Date(dateInfo);
        const options = { day: 'numeric', month: type, year: 'numeric' };
        const dateString = date.toLocaleDateString('ru-RU', options).replace(' г.', '');
        return dateString
    }

    const handleDateChange = (event) => {
        setNumberDate(getDate(event.target.value))
        setWrittenDate(getDate(event.target.value, 'long'));
    };

    const handleContractEndDateChange = (event) => {
        setContractEndDate(getDate(event.target.value))
    };

    const handleAmountChange = (event) => {
        let value = event.target.value.replace(/[^0-9]/g, '');

        let sum = +value + (kopecks / 100);

        setAmount(value);
        setStoimostNumber(String(sum.toLocaleString('ru-RU')).replace('.', ','));
        setWrittenAmount(rubles(sum));
    };

    const handleKopecksChange = (event) => {
        let value = event.target.value.replace(/[^0-9]/g, '').slice(0, 2);
        let sum = +amount + (value / 100);

        setKopecks(value);        
        setStoimostNumber(String(sum.toLocaleString('ru-RU')).replace('.', ','));
        setWrittenAmount(rubles(sum));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            contractType,
            template,
            ip,
            contragent,
            receiver: contractType === 'трехсторонний' ? receiver : null,
            contractNumber,
            numberDate,
            writtenDate,
            contractSubjectNom,
            contractSubjectGen,
            stoimostNumber,
            writtenAmount,
            contractEndDate,
        };

        console.log("Form Data: ", formData);

        // Здесь можно добавить код для отправки данных на сервер
    };

    return (
        <div className={classes.main}>
            <div className={classes.mainForm}>
                <div className={classes.mainForm_buttons}>
                    <div className={classes.mainForm_buttons_btn} onClick={openModal}>Создать документ</div>
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

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Создать документ"
                className={classes.modal}
                overlayClassName={classes.modalOverlay}
                ariaHideApp={false}
            >
                <h2>Создание нового документа</h2>
                <button onClick={closeModal} className={classes.modalCloseBtn}>&#10006;</button>
                <form className={classes.modalForm} onSubmit={handleSubmit}>
                    <div>
                        <label>Тип договора:</label>
                        <select value={contractType} onChange={handleContractTypeChange}>
                            <option value="двухсторонний">Двухсторонний</option>
                            <option value="трехсторонний">Трехсторонний</option>
                        </select>
                    </div>
                    <div>
                        <label>Шаблон договора:</label>
                        <select value={template} onChange={(e) => setTemplate(e.target.value)}>
                            <option value="template1">Шаблон 1</option>
                            <option value="template2">Шаблон 2</option>
                            <option value="template3">Шаблон 3</option>
                        </select>
                    </div>
                    <div>
                        <label>Выбор ИП:</label>
                        <select value={ip} onChange={(e) => setIp(e.target.value)}>
                            <option value="ip1">ИП Иванов</option>
                            <option value="ip2">ИП Петров</option>
                            <option value="ip3">ИП Сидоров</option>
                        </select>
                    </div>
                    <div>
                        <label>Выбор контрагента:</label>
                        <div className={classes.modalSelectButton}>
                            <select value={contragent} onChange={(e) => setContragent(e.target.value)}>
                                <option value="contr1">Контрагент 1</option>
                                <option value="contr2">Контрагент 2</option>
                                <option value="contr3">Контрагент 3</option>
                            </select>
                            <button type="button" className={classes.addButton}>+</button>
                        </div>
                    </div>
                    {contractType === 'трехсторонний' && (
                        <div>
                            <label>Выбор получателей услуг:</label>
                            <div className={classes.modalSelectButton}>
                                <select value={receiver} onChange={(e) => setReceiver(e.target.value)}>
                                    <option value="receiver1">Получатель 1</option>
                                    <option value="receiver2">Получатель 2</option>
                                    <option value="receiver3">Получатель 3</option>
                                </select>
                                <button type="button" className={classes.addButton}>+</button>
                            </div>
                        </div>
                    )}
                    <div>
                        <label>Номер договора:</label>
                        <input type="text" value={contractNumber} onChange={(e) => setContractNumber(e.target.value)} />
                    </div>
                    <div>
                        <label>Дата договора цифры:</label>
                        <input type="date" onChange={handleDateChange} />
                    </div>
                    <div className={classes.hiddenModalBlock}>
                        <label>Дата договора прописью:</label>
                        <input type="text" value={writtenDate} readOnly />
                    </div>
                    <div>
                        <label>Предмет договора (именительном падеже):</label>
                        <input type="text" value={contractSubjectNom} onChange={(e) => setContractSubjectNom(e.target.value)} />
                    </div>
                    <div>
                        <label>Предмет договора (наименование работ в родительном падеже):</label>
                        <input type="text" value={contractSubjectGen} onChange={(e) => setContractSubjectGen(e.target.value)} />
                    </div>
                    <div>
                        <label>Стоимость</label>
                        <div className={classes.modalSelectButton}>
                            <input type="text" value={amount} onChange={handleAmountChange} placeholder="Рубли" />
                            <input type="text" value={kopecks} onChange={handleKopecksChange} placeholder="Копейки" />
                        </div>
                    </div>
                    <div className={classes.hiddenModalBlock}>
                        <label>Стоимость прописью:</label>
                        <input type="text" value={writtenAmount} readOnly />
                    </div>
                    <div>
                        <label>Дата действия договора (до):</label>
                        <input type="date" onChange={handleContractEndDateChange} />
                    </div>

                    <button type="submit">Создать</button>
                </form>
            </ReactModal>
        </div>
    );
}

export default AddDocs;
