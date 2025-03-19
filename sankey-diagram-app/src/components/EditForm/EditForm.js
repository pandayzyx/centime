import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFlow, editFlow, deleteFlow } from '../../redux/slices/dataSlice';
import { useTranslation } from 'react-i18next';
import styles from './EditForm.module.css';
import { v4 as uuidv4 } from 'uuid';

const EditForm = () => {
  const { flows } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ from: '', to: '', amount: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { from, to, amount } = formData;
    if (editIndex !== null) {
      dispatch(editFlow({ index: editIndex, newFlow: [from, to, Number(amount)] }));
      setEditIndex(null);
    } else {
      dispatch(addFlow([from, to, Number(amount)]));
    }
    setFormData({ from: '', to: '', amount: '' });
  };

  const handleEdit = (index) => {
    const [from, to, amount] = flows[index];
    setFormData({ from, to, amount });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    dispatch(deleteFlow(index));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder={t('income')}
          value={formData.from}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder={t('expenditure')}
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <button type="submit">{editIndex !== null ? t('edit') : t('add')}</button>
      </form>

      <ul className={styles.flowList}>
        {flows.map(([from, to, amount], index) => (
          <li key={uuidv4()}>
            {t(from)} → {t(to)}: {amount}
            <button onClick={() => handleEdit(index)}>{t('edit')}</button>
            <button onClick={() => handleDelete(index)}>{t('delete')}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditForm;