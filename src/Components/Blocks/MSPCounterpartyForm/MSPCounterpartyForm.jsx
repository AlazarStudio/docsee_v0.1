import React from "react";
import classes from './MSPCounterpartyForm.module.css';

function MSPCounterpartyForm({ formData, handleChange }) {
    return (
        <>
            <div>
                <label>Полное наименование</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Сокращенное наименование</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ФИО Директора</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="directorName"
                    value={formData.directorName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ФИО Директора в род. падеже</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="directorFullNameGen"
                    value={formData.directorFullNameGen}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Инициалы директора</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="initials"
                    value={formData.initials}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Адрес</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ИНН</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="INN"
                    value={formData.INN}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>КПП</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="KPP"
                    value={formData.KPP}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ОГРН</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="OGRN"
                    value={formData.OGRN}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Расчётный счёт</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="RSCH"
                    value={formData.RSCH}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Корреспондентский счёт</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="KSCH"
                    value={formData.KSCH}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Банк</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>БИК</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="BIK"
                    value={formData.BIK}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Электронная почта</label>
                <input
                    required
                    className={classes.input}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Телефон</label>
                <input
                    required
                    className={classes.input}
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default MSPCounterpartyForm;