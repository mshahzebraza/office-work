import * as Yup from 'yup';
import { createPO } from '../../../handlers/po/create';
import { updatePO } from '../../../handlers/po/update';

export function getPOfieldConfig(isNewSubmission) {
    return {
        title: `Purchase Details`,
        fields: {
            refType: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'refType',
                    label: 'Data Reference',
                    options: [
                        { label: 'Select One...', value: '' },
                        { label: 'CST', value: 'CST' },
                        { label: 'Bill', value: 'Bill' },
                        { label: 'PO', value: 'PO' },
                        { label: 'Requisition', value: 'REQ' },
                    ]
                }
            },
            refId: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'text',
                    type: 'text',
                    name: 'refId',
                    disabled: !isNewSubmission,
                    label: 'Data Reference ID'
                }
            },
            category: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'category',
                    label: 'PO Category',
                    options: [
                        { label: 'Select One ...', value: '' },
                        { label: 'Limited Tender', value: 'Limited Tender' },
                        { label: 'Single Quotation', value: 'Single Quotation' },
                        { label: 'Repeat Order', value: 'Repeat Order' },
                        { label: 'Spot Purchase', value: 'Spot Purchase' },
                        { label: 'Imprest', value: 'Imprest' },
                    ]
                }
            },
            fulfillmentSource: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'fulfillmentSource',
                    label: 'Source of Fulfillment',
                    options: [
                        { label: 'Select One', value: '' },
                        { label: 'Local Purchase', value: 'Local' },
                        { label: 'Foreign Purchase', value: 'Foreign' },
                    ]
                }
            },
            currency: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'currency',
                    label: 'Currency of Payment',
                    options: [
                        { label: 'Select One', value: '' },
                        { label: 'RMB', value: 'RMB' },
                        { label: 'USD', value: 'USD' },
                        { label: 'PKR', value: 'PKR' },
                    ]
                }
            },
            totalCost: {
                initialValue: 0,
                validation: Yup.number().required('Required'),
                config: {
                    control: 'text',
                    type: 'number',
                    name: 'totalCost',
                    label: 'Total Cost',
                    inputProps: {
                        min: 0
                    }
                },
            },
            status: {
                initialValue: '',
                validation: Yup.number().required('Required'),
                config: {
                    control: 'select',
                    name: 'status',
                    label: 'Current Status',
                    options: [
                        { label: 'Select One ...', value: '' },
                        { label: 'Rejected', value: 0 },
                        { label: 'Draft', value: 1 },
                        { label: 'Initiated', value: 2 },
                        { label: 'ERP Approved', value: 3 },
                        { label: 'Supplier Evaluated', value: 4 },
                        { label: 'Concurrence Approved', value: 5 },
                        { label: 'PO Approved', value: 6 },
                        { label: 'LC Opened', value: 7 },
                        { label: 'Delivery Confirmed', value: 8 },
                        { label: 'Closed', value: 9 },
                    ],
                }
            },
            initiatorId: {
                initialValue: '',
                validation: Yup.number().required('Required'),
                config: {
                    control: 'text',
                    name: 'initiatorId',
                    label: 'Initiator Employee ID',
                },
            },
            supplier: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'supplier',
                    label: 'Supplier',
                    options: [
                        { label: 'Select One...', value: '' },
                        { label: 'Wuhan', value: 'Wuhan' },
                        { label: 'Chengdu', value: 'Chengdu' },
                        { label: 'E-Tech', value: 'E-Tech' },
                    ]
                }
            },
            items: {
                initialValue: [
                    { id: '', qty: 0, unitPrice: 0, remarks: '' }
                ],
                validation: Yup.array()
                    .of(
                        Yup.object().shape({
                            id: Yup
                                .string()
                                .typeError('Please Enter a valid Code')
                                .required("Item ID is required"),

                            qty: Yup
                                .number()
                                .not([0], 'Quantity cannot be 0')
                                .min(0, 'Quantity must be positive')
                                .integer()
                                .typeError('Please Enter a valid Number')
                                .required("Item Qty is required"),

                            unitPrice: Yup
                                .number()
                                .integer()
                                .min(0, 'Price cannot be a negative number')
                                .typeError('Please Enter a valid Number')
                                .required("Unit Price is required"),

                            remarks: Yup.string()
                        })
                    ),
                config: {
                    control: 'nestedFieldArray',
                    legend: 'List of nested fields',
                    name: 'items',
                    label: 'Provide the list of purchase items',
                    showHelper: true,
                    gridSpan: 12,
                    removeText: 'Remove Item',
                    removeIcon: null,
                    addIcon: null,
                    fieldConfigArr: [
                        // id {string}
                        {
                            control: 'text',
                            type: 'text',
                            label: 'Item ID',
                            name: 'id',
                            gridSpan: 5,
                            default: '',
                            showHelper: false,
                            customHelperText: 'Enter the Item ID',
                        },
                        // qty {number}
                        {
                            control: 'text',
                            type: 'number',
                            label: 'Item Qty',
                            name: 'qty',
                            gridSpan: 3,
                            default: 0,
                            showHelper: false,
                            customHelperText: 'Enter the Item Qty',
                            inputProps: {
                                min: 0
                            }
                        },
                        // unitPrice {number}
                        {
                            control: 'text',
                            type: 'number',
                            gridSpan: 2,
                            label: 'Unit Price',
                            name: 'unitPrice',
                            default: 0,
                            showHelper: false,
                            customHelperText: 'Enter the Unit Price',
                            inputProps: {
                                min: 0
                            }
                        },
                        // remarks {string}
                        {
                            control: 'text',
                            type: 'text',
                            multiline: true,
                            gridSpan: 10,
                            label: 'Item Purchase Remarks',
                            name: 'remarks',
                            default: '',
                            showHelper: false,
                            customHelperText: 'Enter the detail Item Purchase',
                        },
                    ],
                }
            },
            remarks: {
                initialValue: '',
                validation: Yup.string(),
                config: {
                    control: 'text',
                    gridSpan: 12,
                    multiline: true,
                    minRows: 4,
                    name: 'remarks',
                    label: 'Remarks/Description'
                }
            },
        },
        submitHandlers: {
            add: createPO,
            update: updatePO
        }
    };
}
