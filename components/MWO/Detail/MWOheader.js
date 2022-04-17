// Dependency
import React from 'react'
// Styles & Stores
import styles from './MWOheader.module.scss'
// Components
import { concatStrings, transformEntries, toSentenceCase, cloneAndPluck } from '../../../helpers/reusable'
import MWOitem_Form from '../Forms/MWOitem_Form'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import MWO_Form from '../Forms/MWO_Form'
import ModalButton from '../../UI/ModalButton'
import Button from '../../UI/Button'
import { deleteMWOHandler } from '../../../lib/apollo_client/mwoApollo'
import { deletePOHandler } from '../../../lib/apollo_client/poApollo'

export default function MWOheader({ sourceType = 'MWO', activeSourceData = {}, activeMWOdata, classes }) {

     const headerData = {
          overview: ['mwoId', 'status'],
          meta: ['title'],
          controls: {
               addItem: {
                    caption: `Add ${sourceType} Item`,
                    ModalComponent: /* sourceType === 'PO' ? 'POitem_Form' : */ MWOitem_Form,
                    [`active${sourceType}id`]: activeSourceData[sourceType === 'PO' ? 'refId' : 'mwoId'],
               },
               deleteSource: {
                    caption: `Delete ${sourceType}`,
                    click: () => {
                         sourceType === 'PO'
                              ? deletePOHandler(activeSourceData._id)
                              : deleteMWOHandler(activeSourceData._id)
                    },
               },
               editSource: {
                    caption: `Update ${sourceType} Summary`,
                    ModalComponent: MWO_Form,
                    [`active${sourceType}data`]: activeSourceData
               }
          }

     }

     const OV_data = cloneAndPluck(activeSourceData, headerData.overview)
     const meta_data = cloneAndPluck(activeSourceData, headerData.meta)

     return (
          <section className={concatStrings([...classes, styles.mwoHeader])} >
               {/* Overview */}
               <div className={styles.mwoOverview}>
                    {transformEntries(OV_data, entryCallback)}
               </div>

               {/* Secondary */}
               <div className={styles.mwoMeta} >
                    {transformEntries(meta_data, entryCallback)}
               </div>
               {/* Controls */}
               <section className={styles.mwoControls}>

                    <ModalButton
                         {...headerData.controls.addItem}
                    />
                    <Button
                         {...headerData.controls.deleteSource}
                    />

                    <ModalButton
                         {...headerData.controls.editSource}
                    />
               </section>
          </section>
     )
}

export function entryCallback(pairArr, pairIndex) {
     return (
          <h3 key={`summaryPair-${pairIndex}`} className={concatStrings(['pair', styles.pair])} >
               <span className={concatStrings(['pairField', styles.pairField])} >{toSentenceCase(pairArr[0])}</span>
               <span className={concatStrings(['pairValue', styles.pairValue])} >{pairArr[1]}</span>
          </h3>
     )
}