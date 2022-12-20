import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";

import {Checkbox} from "../../Common/Checkbox/Checkbox";
import {Button} from "../../Common/Button/Button";
import {Table} from "../../Table/Table";
import {Form} from "../../Form/Form";
import Modal from "../../Modal/Modal";

import {tableCompanySlice} from "../../../store/tableCompanySlice";
import {tableWorkersSlice} from "../../../store/tableWorkersSlice";

import './tableCompany.scss'

export default React.memo(function TableCompany({isLoading, tableData}) {

  const [modalData, setModalData] = useState({});

  const [modalOpen, setModalOpen] = useState(false);

  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    setActiveCompany, setActiveAllCompany, removeSelectedCompany,
    setUnActiveWorkers, removeCompany, editCompanyData, createCompany
  } = tableCompanySlice.actions;

  const {removeWorkersByIdCompany} = tableWorkersSlice.actions;

  const companyTableConfig = [
    {
      columnId: 'check',
      columnName: () =>
          <Checkbox
              isActive={tableData.data.data.length === tableData.activeCompanyId.length}
              onChange={() => {
                dispatch(setUnActiveWorkers());
                dispatch(setActiveAllCompany());
              }}
          />,
      columnWidth: '40px',
      renderRowItem: (item, row) =>
          <Checkbox
              id={row.id}
              isActive={tableData.activeCompanyId.includes(row.id)}
              onChange={() => {
                dispatch(setUnActiveWorkers());
                dispatch(setActiveCompany(row.id))
              }}
          />,
    },
    {
      columnId: 'company_name',
      columnName: 'Название компании',
      columnWidth: '110px',
      editable: true,
    },
    {
      columnId: 'number_of_employees',
      columnName: 'Количество сотрудников',
      columnWidth: '90px',
      editable: false,
    },
    {
      columnId: 'address',
      columnName: 'Адрес',
      columnWidth: '110px',
      editable: true,
    },
    {
      columnId: "handlers",
      columnName: () => <Button
          styles={{padding: '1px', background: '#881818', maxWidth: '98px'}}
          onClick={() => {
            dispatch(removeSelectedCompany(tableData.activeCompanyId))
          }}
      >Удалить выбранные</Button>,
      renderRowItem: (item, row) =>
          <div>
            <Button styles={{padding: '3px', marginBottom: '3px'}} onClick={() => {
              dispatch(removeCompany(row.id));
              dispatch(removeWorkersByIdCompany(row.id))
            }
            }> Удалить
            </Button>
            <Button styles={{padding: '3px'}} onClick={
              () => {
                setModalData({...row});
                setModalOpen(true);
              }
            }>Редактировать
            </Button>

          </div>
    }
  ];
  const createCompanyConfig = [
    {
      columnId: 'id',
      columnName: 'Фамилия',
    },
    {
      columnId: 'company_name',
      columnName: 'Название компании',
      editable: true,
    },
    {
      columnId: 'address',
      columnName: 'Адрес',
      editable: true,
    },

  ];
  return (
      <div className='tableWrapper'>
        <div className='tableWrapper__title'>
          <Button styles={{background: "#3dda0c87", maxWidth: '200px'}} onClick={() => {
            setModalCreateOpen(true)
          }}>
            Добавить компанию
          </Button>
        </div>
        <Table
            // hasMore={tableData.has_more_pages}
            // fetchMore={() => {
            //   setCursor(tableData.next_page_cursor_param);
            //   setPushTableData(true)
            // }}
            isLoading={isLoading}
            tableConfig={companyTableConfig}
            emptyTable={{
              text: "Пусто...",
            }}
            data={tableData.data.data}

        />
        {modalOpen &&
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <Form data={modalData} onClick={(formData) => {
            dispatch(editCompanyData(formData));
            setModalOpen(false)
          }} config={companyTableConfig}/>
        </Modal>}

        {modalCreateOpen &&
        <Modal isOpen={modalCreateOpen} onClose={() => {
          setModalCreateOpen(false)
        }}>
          <Form data={{
            company_name: '',
            address: "",

          }} onClick={(formData) => {

            const newFormData = {
              ...formData,
              id: Math.floor(Math.random() * 10000),
            };
            dispatch(createCompany(newFormData));
            setModalCreateOpen(false)
          }} config={createCompanyConfig}/>
        </Modal>
        }
      </div>
  )
})