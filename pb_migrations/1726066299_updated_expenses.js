/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mq6v2kaqpiagpx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jsnswpot",
    "name": "currency",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": 3,
      "pattern": "[A-Z]{3}"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mq6v2kaqpiagpx")

  // remove
  collection.schema.removeField("jsnswpot")

  return dao.saveCollection(collection)
})
