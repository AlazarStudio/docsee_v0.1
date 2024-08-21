import React from "react";
import classes from './GosCounterpartyForm.module.css';

function GosCounterpartyForm({ formData, handleChange }) {
    return (
        <>
            <div>
                <label>Полное наименование</label>
                <input
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
                    className={classes.input}
                    type="text"
                    name="KPP"
                    value={formData.KPP}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ОКТМО</label>
                <input
                    className={classes.input}
                    type="text"
                    name="OKTMO"
                    value={formData.OKTMO}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ОКАТО</label>
                <input
                    className={classes.input}
                    type="text"
                    name="OKATO"
                    value={formData.OKATO}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ОКПО</label>
                <input
                    className={classes.input}
                    type="text"
                    name="OKPO"
                    value={formData.OKPO}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ОКОПФ</label>
                <input
                    className={classes.input}
                    type="text"
                    name="OKOPF"
                    value={formData.OKOPF}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ОГРН</label>
                <input
                    className={classes.input}
                    type="text"
                    name="OGRN"
                    value={formData.OGRN}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Лицевой счёт</label>
                <input
                    className={classes.input}
                    type="text"
                    name="LSCH"
                    value={formData.LSCH}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Расчётный счёт</label>
                <input
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
                    className={classes.input}
                    type="text"
                    name="BIK"
                    value={formData.BIK}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>ОКОГУ</label>
                <input
                    className={classes.input}
                    type="text"
                    name="OKOGU"
                    value={formData.OKOGU}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Код ОКОПФ</label>
                <input
                    className={classes.input}
                    type="text"
                    name="OKOPFCode"
                    value={formData.OKOPFCode}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Электронная почта</label>
                <input
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

export default GosCounterpartyForm;
