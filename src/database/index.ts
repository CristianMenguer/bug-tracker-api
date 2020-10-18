import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI as string
const DB_NAME = process.env.MONGO_DB_NAME as string
const MONGO_OPTIONS = {
    useUnifiedTopology: true, useNewUrlParser: true
}

export const info = () => {
    console.log('uri: ' + uri)
    console.log('db_name: ' + DB_NAME)
}

export const aggregate = (collectionName: string, pipeline = []) => {
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

export const get = (collectionName: string, query = {}) : Promise<Object[]> => {
    
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

export const add = (collectionName: string, item: object) => {
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

export const count = ((collectionName: string) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
            const db = client.db(DB_NAME)
            const collection = db.collection(collectionName)
            collection.countDocuments({}, (err, docs) => {
                resolve(docs)
                client.close()
            })
        })
    })
})
