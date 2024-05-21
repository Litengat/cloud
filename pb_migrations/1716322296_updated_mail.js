/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("czmzdq4cks8okl0")

  collection.name = "mails"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("czmzdq4cks8okl0")

  collection.name = "mail"

  return dao.saveCollection(collection)
})
