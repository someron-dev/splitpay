/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mq6v2kaqpiagpx")

  collection.listRule = "@request.auth.id = creator || sharedBy ~ @request.auth.id"
  collection.viewRule = "@request.auth.id = creator || sharedBy ~ @request.auth.id"
  collection.updateRule = "@request.auth.id = creator || sharedBy ~ @request.auth.id"
  collection.deleteRule = "@request.auth.id = creator || sharedBy ~ @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mq6v2kaqpiagpx")

  collection.listRule = ""
  collection.viewRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})
