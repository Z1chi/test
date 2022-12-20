import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';

import {Table} from "../../Table/Table";
import {Button} from "../../Common/Button/Button";
import {Checkbox} from "../../Common/Checkbox/Checkbox";
import {Form} from "../../Form/Form";
import Modal from "../../Modal/Modal";

import {tableWorkersSlice} from "../../../store/tableWorkersSlice";

import './tableWorkers.scss'

export default React.memo(function TableWorkers({tableData, companyData}) {

  const [modalData, setModalData] = useState({});
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const dispatch = useDispatch();

  const {removeWorker, editWorkersData, removeSelectedWorkers, setActiveWorker, setActiveAllWorkers, createWorker} = tableWorkersSlice.actions;
  const arrCompany = companyData?.map((item) => {
    return {companyId: item.id, company_name: item.company_name}
  });

  const companyWorkersTableConfig = [
    {
      columnId: 'checkWorkers',
      columnName: () =>
          <Checkbox
              isActive={tableData.visibleWorkers.length === tableData.activeWorkersId.length}
              onChange={() => {
                dispatch(setActiveAllWorkers());
              }}
          />,
      columnWidth: '40px',
      renderRowItem: (item, row) =>
          <Checkbox
              id={row.id}
              isActive={tableData.activeWorkersId.includes(row.id)}
              onChange={() => {
                dispatch(setActiveWorker(row.id))
              }}
          />,
    },
    {
      columnId: 'last_name',
      columnName: 'Фамилия',
      columnWidth: '100px',
      editable: true,
    },
    {
      columnId: 'first_name',
      columnName: 'Имя',
      columnWidth: '100px',
      editable: true,
    },
    {
      columnId: 'position',
      columnName: 'Должность',
      columnWidth: '110px',
      editable: true,
    },
    {
      columnId: "handlers",
      columnName: () => <Button
          onClick={() => {
            dispatch(removeSelectedWorkers(tableData.activeWorkersId))
          }}
          styles={{padding: '1px', background: '#881818', maxWidth: '98px'}}
      >Удалить выбранные</Button>,
      renderRowItem: (item, row) =>
          <div>
            <Button styles={{padding: '3px', marginBottom: '3px'}} onClick={() =>
                dispatch(removeWorker(row.id))
            }> Удалить
            </Button>
            <Button styles={{padding: '3px'}} onClick={
              () => {
                setModalData({...row});
                setModalEditOpen(true);
              }
            }>Редактировать
            </Button>

          </div>
    },
  ];

  const createWorkerConfig = [
    {
      columnId: 'last_name',
      columnName: 'Фамилия',
      editable: true,
    },
    {
      columnId: 'first_name',
      columnName: 'Имя',
      editable: true,
    },
    {
      columnId: 'position',
      columnName: 'Должность',
      editable: true,
    },
    {
      columnId: 'companyId',
      columnName: 'Компания',
      editable: true,
    }
  ];

  return (
      <div className='tableWrapper'>
        <div className='tableWrapper__title'>
          <Button styles={{background: "#3dda0c87", maxWidth: '200px'}} onClick={() => {
            setModalCreateOpen(true)
          }}>
            Добавить работника
          </Button>
        </div>
        <Table
            // hasMore={tableData.has_more_pages}
            // fetchMore={() => {
            //   setCursor(tableData.next_page_cursor_param);
            //   setPushTableData(true)
            // }}

            tableConfig={companyWorkersTableConfig}
            emptyTable={{
              text: "Пусто...",
            }}
            data={tableData.visibleWorkers}
            onChange={editWorkersData}
        />
        {modalEditOpen &&
        <Modal isOpen={modalEditOpen} onClose={() => {
          setModalEditOpen(false)
        }}>
          <Form data={modalData} onClick={(formData) => {
            dispatch(editWorkersData(formData));
            setModalEditOpen(false)
          }} config={companyWorkersTableConfig}/>
        </Modal>
        }

        {modalCreateOpen &&
        <Modal isOpen={modalCreateOpen} onClose={() => {
          setModalCreateOpen(false)
        }}>
          <Form data={{
            last_name: '',
            first_name: "",
            position: "",
            companyId: arrCompany
          }} onClick={(formData) => {

            const newFormData = {
              ...formData,
              id: uuidv4(),
              companyId: formData.companyId.find((item) => item.active).companyId

            };
            dispatch(createWorker(newFormData));
            setModalCreateOpen(false)
          }} config={createWorkerConfig}/>
        </Modal>
        }
      </div>
  )
})