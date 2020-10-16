import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI as string
const DB_NAME = 'book-store'
const MONGO_OPTIONS = { 
    useUnifiedTopology: true, useNewUrlParser: true 
}

module.exports = () => {

    const aggregate = (collectionName: string, pipeline = []) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                const db = client.db(DB_NAME)
                const collection = db.collection(collectionName)

                collection.aggregate(pipeline).toArray((err, docs) => {
                    if (err) {
                        console.log(' --- aggregate ERROR --- ')
                        console.log(err)
                    }

                    resolve(docs)
                    client.close()
                })
            })
        })
    }

    const get = (collectionName: string, query = {}) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if (err)
                    console.error('An error occurred connecting to MongoDB: ', err)
                //
                const db = client.db(DB_NAME)
                const collection = db.collection(collectionName)
                collection.find(query).toArray((err, docs) => {
                    resolve(docs)
                    client.close()
                })
            })
        })
    }

    const add = (collectionName: string, item: object) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                const db = client.db(DB_NAME)
                const collection = db.collection(collectionName)
                collection.insertOne(item, (err, result) => {
                    resolve(result)
                })
            })
        })
    }

    const count = ((collectionName: string) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                const db = client.db(DB_NAME)
                const collection = db.collection(collectionName)
                collection.count({}, (err, docs) => {
                    resolve(docs)
                    client.close()
                })
            })
        })
    })

    return {
        get,
        add,
        aggregate,
        count
    }

}