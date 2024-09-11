/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mq6v2kaqpiagpx")

  collection.createRule = "sharedBy ~ creator"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mq6v2kaqpiagpx")

  collection.createRule = ""

  return dao.saveCollection(collection)
})
