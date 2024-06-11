# Used for testing issue 6834

## Versions

firebase-tools: v13.11.2 - Overriden with local copy using `npm link`<br>
node: v20.12.2
platform: macOS Sonoma 14.5

## Steps to reproduce issue

### via Console only

1. Run `firebase emulators:start --project demo-project --import ./emulator-data`
2. Go to http://127.0.0.1:4000/storage/demo-project.appspot.com
3. (Optional) Click "valid whitespace.png"
   - Image loads as expected
4. Click "invalid whitespace.png"
   - Image does not load
   - An error is raised on the terminal running Firebase emulator

```
[debug] [2024-06-11T12:59:26.870Z] TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Content-Disposition"]
    at ServerResponse.setHeader (node:_http_outgoing:662:3)
    at sendFileBytes (/Users/path/firebase-tools/git-clone/firebase-tools/lib/emulator/storage/apis/shared.js:19:9)
    at /Users/path/firebase-tools/git-clone/firebase-tools/lib/emulator/storage/apis/firebase.js:101:47
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
[error]
[error] Error: An unexpected error has occurred.
```

### via Web App

1. Run `firebase emulators:start --project demo-project --import ./emulator-data`
2. On a new terminal, run `cd web-app`, then `npm run start`
3. Go to http://localhost:3000/
4. Click "Download" button
   - Error is raised in web console `ERR_CONNECTION_REFUSED`
   - An error is raised on the terminal running Firebase emulator

```
[debug] [2024-06-11T13:04:09.079Z] TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Content-Disposition"]
    at ServerResponse.setHeader (node:_http_outgoing:662:3)
    at sendFileBytes (/Users/path/firebase-tools/git-clone/firebase-tools/lib/emulator/storage/apis/shared.js:19:9)
    at /Users/path/firebase-tools/git-clone/firebase-tools/lib/emulator/storage/apis/firebase.js:101:47
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
[error]
[error] Error: An unexpected error has occurred.
```

### via Cloud Functions and Admin SDK

1. Run `firebase emulators:start --project demo-project`
2. Go to http://127.0.0.1:4000/storage/demo-project.appspot.com
3. Upload file located in `./images/invalid whitespace.png`
   - An error is raised on the terminal running Firebase emulator

```
[info] i  functions: Beginning execution of "us-central1-firstGenGenerateThumbnail" {"metadata":{"emulator":{"name":"functions"},"function":{"name":"us-central1-firstGenGenerateThumbnail"},"extension":{},"message":"Beginning execution of \"us-central1-firstGenGenerateThumbnail\""}}
[debug] [2024-06-11T13:52:37.843Z] [worker-us-central1-firstGenGenerateThumbnail-1929b6f3-879f-4b41-9485-154e887a179d]: BUSY {"metadata":{"emulator":{"name":"functions"},"function":{"name":"us-central1-firstGenGenerateThumbnail"},"extension":{},"message":"[worker-us-central1-firstGenGenerateThumbnail-1929b6f3-879f-4b41-9485-154e887a179d]: BUSY"}}
[debug] [2024-06-11T13:52:37.851Z] [runtime-status] [47473] RunBackground {"data":{"kind":"storage#object","name":"invalid whitespace.png","bucket":"demo-project.appspot.com","generation":"1718113957302","metageneration":"1","contentType":"image/png","timeCreated":"2024-06-11T13:52:37.302Z","updated":"2024-06-11T13:52:37.302Z","storageClass":"STANDARD","size":"3157139","md5Hash":"/fRei8dCcrGlNlpjV5A3pQ==","etag":"C+SxwQI4baexwudLYyfMVYRCyxw","metadata":{"firebaseStorageDownloadTokens":"7783554d-2945-404d-a823-03e8a37379da"},"crc32c":"/3bbGw==","timeStorageClassUpdated":"2024-06-11T13:52:37.302Z","id":"demo-project.appspot.com/invalid whitespace.png/1718113957302","selfLink":"http://127.0.0.1:9199/storage/v1/b/demo-project.appspot.com/o/invalid%E2%80%AFwhitespace.png","mediaLink":"http://127.0.0.1:9199/download/storage/v1/b/demo-project.appspot.com/o/invalid%E2%80%AFwhitespace.png?generation=1718113957302&alt=media"},"context":{"eventId":"1718113957323","timestamp":"2024-06-11T13:52:37.323Z","eventType":"google.storage.object.finalize","resource":{"service":"storage.googleapis.com","name":"projects/_/buckets/demo-project.appspot.com/objects/invalid whitespace.png","type":"storage#object"}}} {"metadata":{"emulator":{"name":"functions"},"function":{"name":"us-central1-firstGenGenerateThumbnail"},"extension":{},"message":"[runtime-status] [47473] RunBackground {\"data\":{\"kind\":\"storage#object\",\"name\":\"invalid whitespace.png\",\"bucket\":\"demo-project.appspot.com\",\"generation\":\"1718113957302\",\"metageneration\":\"1\",\"contentType\":\"image/png\",\"timeCreated\":\"2024-06-11T13:52:37.302Z\",\"updated\":\"2024-06-11T13:52:37.302Z\",\"storageClass\":\"STANDARD\",\"size\":\"3157139\",\"md5Hash\":\"/fRei8dCcrGlNlpjV5A3pQ==\",\"etag\":\"C+SxwQI4baexwudLYyfMVYRCyxw\",\"metadata\":{\"firebaseStorageDownloadTokens\":\"7783554d-2945-404d-a823-03e8a37379da\"},\"crc32c\":\"/3bbGw==\",\"timeStorageClassUpdated\":\"2024-06-11T13:52:37.302Z\",\"id\":\"demo-project.appspot.com/invalid whitespace.png/1718113957302\",\"selfLink\":\"http://127.0.0.1:9199/storage/v1/b/demo-project.appspot.com/o/invalid%E2%80%AFwhitespace.png\",\"mediaLink\":\"http://127.0.0.1:9199/download/storage/v1/b/demo-project.appspot.com/o/invalid%E2%80%AFwhitespace.png?generation=1718113957302&alt=media\"},\"context\":{\"eventId\":\"1718113957323\",\"timestamp\":\"2024-06-11T13:52:37.323Z\",\"eventType\":\"google.storage.object.finalize\",\"resource\":{\"service\":\"storage.googleapis.com\",\"name\":\"projects/_/buckets/demo-project.appspot.com/objects/invalid whitespace.png\",\"type\":\"storage#object\"}}}"}}
[debug] [2024-06-11T13:52:37.928Z] TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Content-Disposition"]
    at ServerResponse.setHeader (node:_http_outgoing:662:3)
    at sendFileBytes (/Users/path/firebase-tools/git-clone/firebase-tools/lib/emulator/storage/apis/shared.js:19:9)
    at /Users/path/firebase-tools/git-clone/firebase-tools/lib/emulator/storage/apis/gcloud.js:88:47
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
[error]
[error] Error: An unexpected error has occurred.
```

## Notes

Tested the above scenarios using the changes made to Firebase Tools. No errors were raised in all cases
