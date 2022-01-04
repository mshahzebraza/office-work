
const L3K = {
  /* restructure 2.0
  nomenclature,
  type, ...  
  */
  summary: {
    nomenclature: 'PEMA-L3K-BD',
    type: 'EM-Linear',
    application: 'AbWS', //
    // !NOTE: The fetching in the following two properties can be made easy if objects are created using classes
    target: '55', // fetched dynamically from targets based on the project nomenclature
    stock: '15', // fetched dynamically from inventory based on the project nomenclature
    status: 'Production', // OR 'R&D' OR 'Closed'
  },

  // Needs to be input before the input of parts
  assemblies: [
    // function of the sub-assembly can also be added later
    { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: '0000' }, // This is also a default sub-assembly created by project instance
    { nomenclature: 'Main Assembly', id: '0000', parent: null }, // 'parent: null' means it is the default assembly and all the others are sub-assemblies
    { nomenclature: 'Ball Lead Screw Assembly', id: '0100', parent: '0000' },
    { nomenclature: 'Output Shaft Assembly', id: '0200', parent: '0000' },
    { nomenclature: 'Housing Assembly', id: '0300', parent: '0000' },
  ],
  parts: [ // can be segregated in two ways. 1. FamilyTree 2. Part-type  
    {
      parentAssemblyId: '0100', // '0000' by default
      // Assembly name may/not included.
      // parentAssemblyName: 'Ball Lead Screw Assembly', // should be shown automatically on parentAssemblyInput but not saved
      type: 'purchased', // OR Standard OR Manufactured
      nomenclature: 'Ball Lead Screw',
      // Input shows a drop-down of Assemblies' nomenclature but saves the assemblies' ID.
      // Relative id cannot be used as the special parts are given Numerical IDs. They are called by their standard nomenclatures.
      id: 'PEMA-L3K-BD-0100-01', // PEMA-L3K-BD-0100- (ProjectId + AssemblyId) prefix is suggested in the form inputs if part type is manufactured. However, they are still saved in full form. 
      qty: 1,
    },
    {
      parentAssemblyId: '0100',
      type: 'manufactured',

      nomenclature: 'Pulley Shaft',
      id: 'PEMA-L3K-BD-0100-02',
      qty: 2,
    },
    {
      parentAssemblyId: '0200',
      type: 'purchased',

      nomenclature: 'Potentiometer',
      id: 'MLS-130-100-S-N',
      qty: 1,
    },
    {
      parentAssemblyId: 'FAST', // all fastener items are set in 'FAST' OR 'XXXX' OR '0000' Assembly be default
      type: 'standard',

      nomenclature: 'bearing', // OR Screws, Washers etc
      // Different id input types will be provided to the user in forms based on type of fastener 
      id: '7201 AC', // M5 x 12 (Screws) OR M4 (Washers)
      qty: 2,
    },
    {
      parentAssemblyId: 'FAST', // all fastener items are set in 'FAST' OR 'XXXX' OR '0000' Assembly be default
      type: 'standard',

      nomenclature: 'bearing', // OR Screws, Washers etc
      // Different id input types will be provided to the user in forms based on type of fastener 
      id: '7201 AC', // M5 x 12 (Screws) OR M4 (Washers)
      qty: 2,
    },
  ],

}

const L9_5K = {
  summary: {
    nomenclature: 'PEMA-L9.5K-BD',
    type: 'EM-Linear',
  },
  assemblies: [
    { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: '0000' },
    { nomenclature: 'Main Assembly', id: '0000', parent: null },
  ],
}

const R380 = {
  summary: {
    nomenclature: 'PEMA-R380-BL',
    type: 'EM-Rotary',
  },
  assemblies: [
    { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: '0000' },
    { nomenclature: 'Main Assembly', id: '0000', parent: null },
  ],

}


const projectsDb = [ // all projects
  R380,
  L3K,
  L9_5K,
  // { // categorized projects
  //   name: 'EM-Rotary',
  //   projects: [
  //   ]
  // },
  // { // categorized projects
  //   name: 'EM-Linear',
  //   projects: [
  //   ]
  // },
]

export default projectsDb;