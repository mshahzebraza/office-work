import React, { useState } from 'react';
import styles from './ListItem.module.scss';
import { useRouter } from 'next/router';
import Modal from '../UI/Modal';
import { poActions } from '../../store/po/po-slice'
import { useDispatch } from 'react-redux';
import MultiForm from '../MultiForm/MultiForm'
import EntryBar from './POentryBar'


export default function POdetail(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Ensures that the delete action is intentional by making the user type a DELETE PHRASE.
  const deletePoItem = (refID) => {
    console.log(`Request to delete ${refID} received.`);
    const answer = prompt('You will now be able to retrieve it back! Type "DELETE THIS PO" if you really want to delete it.')
    if (answer === "DELETE THIS PO") {
      dispatch(poActions.deletePO(refID))
      console.log(`Deletion confirmed`);
    } else {
      console.log(`Confirm the deletion of ${refID} by typing the required message.`);
    }
  }

  function goToPoDetail(refId) {
    router.push(`po/${refId}`)
  }

  // Makes sure that 01 TYPE of item is displayed once. And checks for repetition.
  // In case of repetition, the quantity is increased by 1.
  const itemList = props.data.items && props.data.items.
    reduce((prev, cur, arr) => {

      // Check duplicate
      const duplicateIndex = prev.findIndex((prev) => prev.name === cur.name)

      // No Duplicate
      if (duplicateIndex === -1) {
        prev.push(
          { name: cur.name, qty: 1 }
        )
      };

      // Found Duplicate
      if (duplicateIndex >= 0) {
        prev[duplicateIndex].qty++;
      };

      return prev

    }, []);

  return <li
    className={styles.poItem}
  >
    {/* Code for Modals */}
    {detailModalCodeSnippet(showDetailModal, setShowDetailModal, props, itemList)}
    {updateModalCodeSnippet(showUpdateModal, setShowUpdateModal, dispatch, props)}


    <EntryBar
      data={{
        ...props.data,
        itemList: itemList
        // ? itemList.map((item, itemIdx) => <span key={itemIdx}>{item.name}, </span>)
        // : `No items found`
        ,
        index: props.dataIndex
      }}
      handlers={{
        edit: setShowUpdateModal, // expects true or false
        show: setShowDetailModal, // expects true or false
        detail: goToPoDetail, // expects refId
        delete: deletePoItem, // expects refId
      }}
    >
      {/* ss */}
    </EntryBar>

  </li >

}
function detailModalCodeSnippet(showDetailModal, setShowDetailModal, props, itemList) {
  return showDetailModal &&
    <Modal
      title='PO Detail'
      closer={() => setShowDetailModal(false)}
    >
      {<div className={styles.body}>

        <p className={styles.data} >
          <span className={styles.dataField} >Reference ID:</span>
          <span className={styles.dataValue} >{props.data.refId}</span>
        </p>
        <p className={styles.data} >
          <span className={styles.dataField} >Total Cost:</span>
          <span className={styles.dataValue} >{props.data.totalCost}</span>
        </p>
        <p className={styles.data} >
          <span className={styles.dataField} >Supplier:</span>
          <span className={styles.dataValue} >{props.data.supplier}</span>
        </p>
        <p className={styles.data} >
          <span className={styles.dataField} >PO Category:</span>
          <span className={styles.dataValue} >{props.data.category}</span>
        </p>
        <p className={styles.data} >
          <span className={styles.dataField} >Source:</span>
          <span className={styles.dataValue} >{props.data.fulfillmentSource}</span>
        </p>

        <div className={styles.data}>
          <span className={styles.dataField}>Items Procured:</span>
          <ul className={styles.dataValue} >
            {itemList ?
              itemList.map(
                (item, itemIdx) => <li
                  className={styles.dataItem}
                  key={itemIdx}
                >
                  <span className={styles.dataItemQty}> {item.qty} </span>
                  <span className={styles.dataItemType} >{item.name}</span>
                </li>) : <>No items</>}
          </ul>
        </div>

      </div>}
    </Modal>;
}

function updateModalCodeSnippet(showUpdateModal, setShowUpdateModal, dispatch, props) {
  return showUpdateModal &&
    <Modal
      title='Edit Entry'
      closer={() => setShowUpdateModal(false)}
    >
      <MultiForm
        submit={(formData) => { dispatch(poActions.updatePO(formData)); }}
        // The field should be rendered automatically.
        // The req should be dependant on the req-prop of the original PO-entry. BUT for this case, we can duplicate the keys like in add-PO form bcz after all every PO needs to define some BASIC things, and those WILL be needed in case of update-PO too.
        fields={[
          {
            field: 'refType',
            req: true,
            defaultValue: props.data.refType && props.data.refType,
            dataList: ['CST', 'Bill', 'PO']
          },
          {
            field: 'refId',
            defaultValue: props.data.refId && props.data.refId,
            req: true,
            isFixed: true
          },
          {
            field: 'category',
            req: true,
            defaultValue: props.data.category && props.data.category,
          },
          {
            field: 'fulfillmentSource',
            req: true,
            defaultValue: props.data.fulfillmentSource && props.data.fulfillmentSource,
            dataList: ['Local', 'Foreign'],
          },
          {
            field: 'currency',
            req: true,
            defaultValue: props.data.currency && props.data.currency,
            dataList: ['PKR', 'USD', 'RMB'],
          },
          {
            field: 'totalCost',
            req: true,
            defaultValue: props.data.totalCost && props.data.totalCost,
          },
          {
            field: 'supplier',
            defaultValue: props.data.supplier && props.data.supplier,
            dataList: ['Wuhan', 'E-Tech']
          },
          {
            field: 'status',
            req: true,
            defaultValue: props.data.status && props.data.status,
            dataList: ['Closed', 'In Process', 'Delivered']
          },
          {
            field: 'remarks',
            defaultValue: props.data.remarks && props.data.remarks,
          }
        ]
          // [
          //   'refType', 'refId', 'category', 'fulfillmentSource', 'currency', 'totalCost', 'supplier', 'status', 'remarks'
          // ]
        } />
    </Modal>;
}

