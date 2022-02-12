module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI: 'mongodb://localhost:27017/OfficeWorks',
    API: {
      // CONNECT: "http://localhost:3000/api/connect",
      PO: "http://localhost:3000/api/po",
      PO_ITEM: "http://localhost:3000/api/po-item",
      PO_ITEM_SPEC: "http://localhost:3000/api/po-item-spec",
      MWO: "http://localhost:3000/api/mwo",
      PROJECT: "http://localhost:3000/api/project",
      PROJECT_PART: "http://localhost:3000/api/project-part",
      PROJECT_ASSY: "http://localhost:3000/api/project-assembly",
      TRANSACTION: "http://localhost:3000/api/transaction",
    }
  }
}
