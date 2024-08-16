import React from "react";
import classes from './AddDocs.module.css';

function AddDocs({ children, ...props }) {
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
                            <div className={classes.mainForm_buttons_btn}>Создать счет</div>
                            <div className={classes.mainForm_buttons_btn}>Создать акт</div>
                            <div className={classes.mainForm_buttons_btn}>Создать отчет</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDocs;