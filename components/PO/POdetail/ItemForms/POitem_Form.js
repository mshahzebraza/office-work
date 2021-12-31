// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import { poActions } from '../../../../store/po/po-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import Form from '../../../Form/Form'
import FormikForm from '../../../Formik/FormikForm'
import FormikControl from '../../../Formik/FormikControl'
import FormikSubmit from '../../../Formik/FormikSubmit'
import { isObjEmpty } from '../../../../helpers/reusable'
// import { genLog } from '../../../../helpers/reusable'

// showUpdateModal, setShowUpdateModal, dispatch, data
export default function POitem_Form({ closer, activePOid, activePOindex, activePOitemData: oldPOitemData = {} }) {

  const dispatch = useDispatch();
  // Old PO Item Data
  const isNewSubmission = isObjEmpty(oldPOitemData);

  const initialValues = {
    id: '',
    name: '',
    type: '',
    qty: '',
    unitPrice: '',
    remarks: '',
    ...oldPOitemData
  }

  const validationSchema = Yup.object({
    id: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    qty: Yup.number().required('Required'),
    unitPrice: Yup.number().required('Required'),
    remarks: Yup.string(),
  })


  const onSubmit = (values) => {
    console.log(`values`, values);
    isNewSubmission ? dispatch(poActions.addPOitem([activePOid, values])) : dispatch(poActions.updatePOitem([activePOid, values]));
    // submit={(formData) => {  }}
  }

  return (
    <Portal>
      <Modal
        title={`${isNewSubmission ? 'Add' : 'Update'} PO Item`}
        closer={closer}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <FormikForm>
            {/* id */}
            <FormikControl
              control='input'
              type='text'
              label='Item ID'
              name='id'
              disabled={!isNewSubmission}
            />
            {/* name */}
            <FormikControl
              control='input'
              type='text'
              label='Item Name'
              name='name'
            />
            {/* type */}
            <FormikControl
              control='select'
              label='Item Type'
              name='type'
              options={[
                { key: 'Select One...', value: '' },
                { key: 'Special Standard', value: 'Special' }, // change this
                { key: 'Standard', value: 'Standard' },
              ]}
            />
            {/* qty */}
            <FormikControl
              control='input'
              type='number'
              label='Purchased Quantity'
              name='qty'
            />
            {/* unitPrice */}
            <FormikControl
              control='input'
              type='number'
              label='Unit Price'
              name='unitPrice'
            />
            {/* remarks */}
            <FormikControl
              control='input'
              type='text'
              label='Remarks / Description'
              name='remarks'
            />

            <FormikSubmit />

          </FormikForm>
        </Formik>
      </Modal>
    </Portal>
  )
}
// 'id'
// 'name'
// 'type'
// 'qty'
// 'unitPrice'
// 'remarks'

