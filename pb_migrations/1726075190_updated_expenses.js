/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mq6v2kaqpiagpx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j6w6hp57",
    "name": "sharedBy",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mq6v2kaqpiagpx")

  // remove
  collection.schema.removeField("j6w6hp57")

  return dao.saveCollection(collection)
})
