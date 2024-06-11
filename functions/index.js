const functions = require("firebase-functions/v1")
const admin = require('firebase-admin');
admin.initializeApp()

exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello world!")
})

exports.firstGenGenerateThumbnail = functions.storage.object().onFinalize(async (object) => {
    const fileBucket = object.bucket
    const filePath = object.name

    const bucket = admin.storage().bucket(fileBucket)
    const downloadResponse = await bucket.file(filePath).download();
}); 