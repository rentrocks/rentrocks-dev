require('dotenv').config()
const fetch = require('node-fetch');
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require('fs');
// const PaytmChecksum = require('./PaytmChecksum');
// const PaytmChecksum = require('paytmchecksum');
// const https = require('https')
const cors = require('cors')({ origin: true });
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  credentials: JSON.parse(fs.readFileSync('./assets/rent-rocks-5e11c61fbf4c.json'))
});

admin.initializeApp();
const db = admin.firestore();
const rtdb = admin.database()

exports.onCreateUser = functions.auth.user().onCreate(async (user) => {
  await db
    .doc(`users/${user.uid}`)
    .set(
      {
        displayName: user.displayName ?? "",
        email: user.email ?? "",
        emailVerified: user.emailVerified ?? "",
        metadata: {},
        phoneNumber: user.phoneNumber ?? "",
        photoURL: user.photoURL ?? "",
        refreshToken: user.tokensValidAfterTime ?? "",
        tenateId: user.tenantId ?? "",
        uid: user.uid,
        isVerified: false,
      },
      { merge: true }
    )
    .catch((e) => {
      functions.logger.error(e);
    })
    .then(() => {
      functions.logger.info("Successfully Created");
    });
  /// TODO :// Send Notification to Admin
});

exports.onAddProduct = functions.firestore
  .document(`users/{uid}/my_products/{productId}`)
  .onWrite(async (change, context) => {
    if (change.after.exists) {
      // create and update
      const newValue = change.after.data();
      await db
        .doc(`public_products/${newValue.productId}`)
        .set(
          {
            ...newValue,
            location: "",
          },
          { merge: true }
        )
        .catch((e) => {
          functions.logger.error(e);
        })
        .then(() => {
          functions.logger.info("Successfully Created");
        });
      /// TODO:// make history
    } else {
      // delete
      const oldValue = change.before.data();
      db.doc(`public_products/${oldValue.productId}`).delete();
      /// TODO:// make history
    }
  });

exports.onUserViewProduct = functions.firestore
  .document(`users/{uid}/viewed_products/{id}`)
  .onWrite(async (change, context) => {
    // create and update
    const newValue = change.after.data();
    await db
      .doc(`public_products/${newValue.productId}/views/${newValue.id}`)
      .set(
        {
          ...newValue,
        },
        { merge: true }
      )
      .catch((e) => {
        functions.logger.error(e);
      })
      .then(() => {
        functions.logger.info("Successfully Created");
      });
  });

exports.onUserRateProduct = functions.firestore
  .document(`users/{uid}/rated_products/{productId}`)
  .onWrite(async (change, context) => {
    if (change.after.exists) {
      // create and update
      const newValue = change.after.data();
      const productRes = await db
        .doc(`public_products/${newValue.productId}`)
        .get((value) => value);
      const productData = productRes.data();
      const newRating = productData.rating ?? {};
      newRating[newValue.uid] = newValue.rating;
      await db
        .doc(`public_products/${newValue.productId}`)
        .set(
          {
            ...productData,
            rating: newRating,
          },
          { merge: true }
        )
        .catch((e) => {
          functions.logger.error(e);
        })
        .then(() => {
          functions.logger.info("Successfully Created");
        });
    } else {
      // create and update
      const oldValue = change.before.data();
      const productRes = await db
        .doc(`public_products/${oldValue.productId}`)
        .get((value) => value);
      const productData = productRes.data();
      const newRating = productData.rating;
      delete newRating[oldValue.uid];
      await db
        .doc(`public_products/${oldValue.productId}`)
        .set(
          {
            ...productData,
            rating: newRating,
          },
          { merge: true }
        )
        .catch((e) => {
          functions.logger.error(e);
        })
        .then(() => {
          functions.logger.info("Successfully Deleted");
        });
    }
  });

exports.onUserReviewProduct = functions.firestore
  .document(`users/{uid}/reviewed_products/{id}`)
  .onWrite(async (change, context) => {
    if (change.after.exists) {
      // create and update
      const newValue = change.after.data();
      const productRes = await db
        .doc(`public_products/${newValue.productId}`)
        .get((value) => value);
      const productData = productRes.data();
      const newReview = productData.reviews ?? [];
      const idx = newReview.findIndex((value) => value.id == newValue.id); // update
      if (idx != -1) {
        newReview.splice(idx, 1);
      }
      newReview.push(newValue);
      await db
        .doc(`public_products/${newValue.productId}`)
        .set(
          {
            ...productData,
            reviews: newReview,
          },
          { merge: true }
        )
        .catch((e) => {
          functions.logger.error(e);
        })
        .then(() => {
          functions.logger.info("Successfully Created");
        });
    } else {
      // delete
      const oldValue = change.before.data();
      const productRes = await db
        .doc(`public_products/${oldValue.productId}`)
        .get((value) => value);
      const productData = productRes.data();
      const newReview = productData.reviews ?? [];
      const idx = newReview.findIndex((value) => value.id == oldValue.id); // update
      if (idx != -1) {
        newReview.splice(idx, 1);
      }
      await db
        .doc(`public_products/${oldValue.productId}`)
        .set(
          {
            ...productData,
            reviews: newReview,
          },
          { merge: true }
        )
        .catch((e) => {
          functions.logger.error(e);
        })
        .then(() => {
          functions.logger.info("Successfully Deleted");
        });
    }
  });

exports.getImageLabel = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const imageLink = req.query.imageLink;
      const [result] = await client.labelDetection(imageLink);
      const labels = result.labelAnnotations;
      res.status(200).send(labels);
    } catch (error) {
      res.status(400).send({
        status: error,
      });
    }
  })
});

/// [PAYTM] Paytm Gateway

exports.paytmCallBack = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method === 'POST') {
      return res.status(200).send(data);
    } else {
      return res.status(400).send({
        status: "Get Method Not Allowed",
      });
    }
  })
})

exports.onWriteUserOrder = functions.firestore
  .document(`users/{uid}/orders/{orderId}`)
  .onWrite(async (change, context) => {

    const { orderId } = context.params;
    if (change.after.exists) {
      const docRef = change.after.ref;
      const newValue = change.after.data();
      const oldValue = change.before.data();
      const { buyerId, productId, productUserId, status, amount } = newValue;
      if (change.before.exists &&
        ((oldValue.buyerId ?? "") === (newValue.buyerId ?? "") &&
          (oldValue.productId ?? "") === (newValue.productId ?? "") &&
          (oldValue.productUserId ?? "") === (newValue.productUserId ?? "") &&
          (oldValue.status ?? "") === (newValue.status ?? "") &&
          (oldValue.amount ?? "") === (newValue.amount ?? ""))
      ) {
        return;
      }
      try {
        if (!buyerId || !orderId || !productId || !productUserId || !status || !amount) {
          // !Order Known Error [TESTED]
          /**
          * 0. [[ATTENTION]] Process should be in @Batch atomic write mode
          * 1. Create New Order Object with all required properties
          *    const order = {
          *                        productId: productId,
          *                        productUserId: productUserId,
          *                        buyerId: buyerId,
          *                        amount: amount,
          *                        status: status,
          *                        orderId: orderId,
          *                        isVerified: false, // explicitly  false
          *                   }
          * 2. Remove @this.order docs
          * 3. Set @this.order docs to [orders_known_error/${orderId}] with the following additional
          *                        {
          *                           error: { 
          *                               code: 401,
          *                               message: "missing required field",
          *                           }
          *                         }
          * 4. [POSTPONED] Send Notifications @BuyerId and @Admins 
         */
          const order = {
            productId: productId ?? "",
            productUserId: productUserId ?? null,
            buyerId: buyerId ?? null,
            amount: amount ?? null,
            status: status ?? null,
            orderId: orderId ?? null,
            isVerified: false,
            error: {
              code: 401,
              message: "missing required field",
            }
          }
          const batch = db.batch()
          batch.set(db.doc(`orders_known_error/${orderId}`), order)
          await batch.commit();
          await docRef.delete();
          // send notification
          await setNewNotification({
            uid: buyerId,
            title: "Payment could not proceed",
            body: `Missing required field for your payment with orderId ${orderId}`,
          })
          return;
        }

        const endPoint = 'https://rent-rocks.web.app/api/getPaytmTxnStatus';

        /** 
           > Fetching txn status for @orderId [TESTED]
           > API Docs - https://business.paytm.com/docs/api/v3/transaction-status-api/
           > [Reminder] This @endPoint is in rent-rocks-api-12 project 
        */

        const txnResponse = await fetch(endPoint,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ORDERID: orderId,
            })
          }
        );
        const txnData = await txnResponse.json()
        const txn = JSON.parse(txnData)

        if (txn.body.resultInfo.resultStatus === 'TXN_SUCCESS' && txn.body.txnAmount === amount) {

          // *SUCCESS [TESTED]

          /**
           * 0. [[ATTENTION]] Process should be in @Transaction atomic write mode
           * 1. Get @Product and @User from productUserId productId and @User from buyerId
           * 2. Create New Order Object with all required properties
           *    const order = {
           *                        productId: productId,
           *                        productUserId: productUserId,
           *                        productUserName: productUserName,
           *                        productUserPhoneNumber: productUserPhoneNumber,
           *                        productUserEmail: productUserEmail,
           *                        buyerId: buyerId,
           *                        buyerName: buyerName,
           *                        buyerPhoneNumber: buyerPhoneNumber,
           *                        buyerEmail: buyerEmail,
           *                        amount: amount,
           *                        status: status,
           *                        txnDate: txnDate,
           *                        orderId: orderId,
           *                        location: location,
           *                        isVerified: true, // explicitly  true
           *                   }
           * 3. Update @this.order docs with This Order object
           * 4. Set @this.order docs to [users/${productUserId}/my_products/${productId}/orders/${orderId}]
           * 5. Set @this.order docs to [orders/${orderId}] with updated @this.order
           *                        { txnStatusResponse: @txn }
           * 6. [ADMIN LEFT] Send Notifications to @productUserId and @BuyerId and @Admins 
         */

          await db.runTransaction(async (transaction) => {
            const productRef = db.doc(`users/${productUserId}/my_products/${productId}`);
            const productRes = await transaction.get(productRef)
            const product = productRes.exists ? productRes.data() : {};
            const productUserRef = db.doc(`users/${productUserId}`);
            const productUserRes = await transaction.get(productUserRef)
            const productUser = productUserRes.exists ? productUserRes.data() : {};
            const buyerRef = db.doc(`users/${buyerId}`);
            const buyerRes = await transaction.get(buyerRef)
            const buyer = buyerRes.exists ? buyerRes.data() : {};
            let order = {
              productId: productId ?? "",
              productUserId: productUserId ?? "",
              productUserName: productUser.displayName ?? "",
              productUserPhoneNumber: productUser.phoneNumber ?? "",
              productUserEmail: productUser.email ?? "",
              buyerId: buyerId ?? "",
              buyerName: buyer.displayName ?? "",
              buyerPhoneNumber: buyer.phoneNumber ?? "",
              buyerEmail: buyer.email ?? "",
              amount: amount ?? "",
              status: txn.body.resultInfo.resultStatus,
              txnDate: txn.body.txnDate,
              orderId: orderId,
              location: product.location ?? "",
              isVerified: true,
            }
            await docRef.update(order)
            const productOrderRef = db.doc(`users/${productUserId}/my_products/${productId}/orders/${orderId}`)
            transaction.set(productOrderRef, order)
            const orderRef = db.doc(`orders/${orderId}`)
            order['txnStatusResponse'] = txn;
            transaction.set(orderRef, order)
          })
          // send notification
          await setNewNotification({
            uid: buyerId,
            title: "Thanks for purchasing!",
            body: `Your payment is successfully recieved with orderId ${orderId}`,
          })
          await setNewNotification({
            uid: productUserId,
            title: "Wow!! Someone has purchased your product",
            body: `Tap to see`,
          })
          return;
        } else {

          // !FAILED [TESTED]

          /**
           * 0. [[ATTENTION]] Process should be in @Batch atomic write mode
           * 1. Create New Order Object with all required properties
           *    const order = {
           *                        productId : productId,
           *                        productUserId: productUserId,
           *                        buyerId: buyerId,
           *                        amount: amount,
           *                        status: status,
           *                        orderId: orderId,
           *                        isVerified: false, // explicitly  false
           *                   }
           * 2. Update @this.order docs with This Order object
           * 3. Set @this.order docs to [orders_failed/${orderId}]
           *                        {errorResponse: <txn>}
           * 4. [ADMIN LEFT] Send Notifications @BuyerId and @Admins 
         */
          let order = {
            productId: productId,
            productUserId: productUserId,
            buyerId: buyerId,
            amount: amount,
            status: status,
            orderId: orderId,
            isVerified: false
          }
          await docRef.update(order)
          const batch = db.batch()
          order.errorResponse = txn;
          batch.set(db.doc(`orders_failed/${orderId}`), order)
          await batch.commit();
          // send notification
          await setNewNotification({
            uid: buyerId,
            title: "Your Payment Failed!",
            body: `Try again with another payment request`,
          })
          return;
        }

      } catch (error) {

        // !UNEXPECTED_ERROR

        /**
         * 1. Create New Order Object with all required properties
         *    const order = {
         *                        productId: productId,
         *                        productUserId: productUserId,
         *                        buyerId: buyerId,
         *                        amount: amount,
         *                        status: status,
         *                        orderId: orderId,
         *                        isVerified: false, // explicitly  false
         *                   }
         * 2. Update @this.order docs with This Order object
         * 3. Set @this.order docs to [orders_failed_unexpected_error/${orderId}] with the following additional
         *                        {error: <error>}
         * 4. [ADMIN LEFT] Send Notifications @BuyerId and @Admins 
         */
        let order = {
          productId: productId,
          productUserId: productUserId ?? null,
          buyerId: buyerId ?? null,
          amount: amount ?? null,
          status: status ?? null,
          orderId: orderId ?? null,
          isVerified: false,
        }
        await docRef.update(order);
        order.error = error.message;
        const orderFailedUERef = db.doc(`orders_failed_unexpected_error/${orderId}`)
        await orderFailedUERef.set(order)
        // send notification
        await setNewNotification({
          uid: buyerId,
          title: "Unexpected error while processing payment request!",
          body: `Contact Customer Service with orderId ${orderId}`,
        })
        return;
      }

    } else {
      // ! When delete Order [TESTED]
      const docRef = change.before.ref;
      const oldValue = change.before.data();
      const { buyerId, orderId, productId, productUserId, status, amount } = oldValue;

      if (!oldValue.isInsideFunctionDeletionAllowed) {
        await db.runTransaction(async (transaction) => {
          const orderDeletedRef = db.doc(`orders_deleted/${orderId}`)
          transaction.set(orderDeletedRef, oldValue)
        })
        return;
      }

      try {
        // ?DELETED [TESTED]
        /**
         * 0. [[ATTENTION]] Process should be in @Transaction atomic write mode
         * 1. Delete @this.order docs from [orders/${orderId}]
         * 2. Delete @this.order docs from [users/${productUserId}/my_products/${productId}/orders/${orderId}]
         * 3. Set @this.order docs to [orders_deleted/${orderId}]
         * 4. [POSTPONED] Send Notifications @Admins 
         */
        await db.runTransaction(async (transaction) => {
          if (oldValue.isVerified) {
            const orderRef = db.doc(`orders/${orderId}`)
            transaction.delete(orderRef)
            const productOrderRef = db.doc(`users/${productUserId}/my_products/${productId}/orders/${orderId}`)
            transaction.delete(productOrderRef)
          }
          const orderDeletedRef = db.doc(`orders_deleted/${orderId}`)
          transaction.set(orderDeletedRef, oldValue)
        })
      } catch (error) {
        // !Order deletion failed [TESTED]
        /**
         * 1. Set Again @this.order to @this.doc {Again}
         * 2. Set @this.order docs to [orders_deletion_failed/${orderId}] with the following additional
         *                        {error: <error>}
         * 3. [POSTPONED] Send Notifications @Admins 
         * 
         */
        await docRef.update(oldValue);
        oldValue.error = error.message;
        const orderFailedRef = db.doc(`orders_deletion_failed/${orderId}`)
        await orderFailedRef.set(oldValue)
      }
    }
  })

exports.onWriteOrder = functions.firestore
  .document(`orders/{orderID}`)
  .onCreate(async (snap, context) => {
    // create a new chat Room
    const newValue = snap.data();
    const { buyerId, productUserId, orderId, productId } = newValue;
    const newChatId = `chatId${rtdb.ref(`/chat_rooms`).push().key}`;
    const memberData = {}
    memberData['chatId'] = newChatId;
    memberData['orderId'] = orderId;
    memberData['productId'] = productId;
    memberData[buyerId] = true;
    memberData[productUserId] = true;
    memberData['user1'] = buyerId;
    memberData['user2'] = productUserId;
    const memberRef = rtdb.ref(`/chat_rooms/${newChatId}`);
    await memberRef.set(memberData);
    // send welcome message
    const newMessageId = `messageId${rtdb.ref(`/messages/${newChatId}`).push().key}`;
    const newMessage = {
      timestamp: "Timestamp",
      messageId: newMessageId,
      message: "Thanks for using Rent Rocks! Your can now chat!",
      uid: "superAdmin",
    }
    const memberMessageRef = rtdb.ref(`/messages/${newChatId}/${newMessageId}`);
    await memberMessageRef.set(newMessage)
    await updateUserProductAvailability({
      userId: productUserId,
      productId: productId,
      isAvailable: false,
    })
  })

exports.onCreateChatRoom = functions.database.ref(`/chat_rooms/{chatId}`)
  .onWrite(async (change, context) => {
    const { chatId } = context.params;
    // if (change.after.exists()) {
    //   const newValue = change.after.val();
    //   const { user1, user2 } = newValue;
    //   const updates = {};
    //   updates[`/user_chatIds/${user1}`] = { [chatId]: true };
    //   updates[`/user_chatIds/${user2}`] = { [chatId]: true };
    //   await rtdb.ref().update(updates);
    // }
    if (change.after.exists()) {
      const newValue = change.after.val();
      const { user1, user2 } = newValue;
      const user1ref = rtdb.ref(`/user_chatIds/${user1}`)
      const user2ref = rtdb.ref(`/user_chatIds/${user2}`)
      const user1Data = {}
      user1Data[chatId] = true;
      const user2Data = {}
      user2Data[chatId] = true;
      await user1ref.update(user1Data)
      await user2ref.update(user2Data)
    }
  })

exports.onCreateMemberInRTDB = functions.database.ref(`/messages/{chatId}/{messageId}`)
  .onWrite(async (change, context) => {
    const { chatId, messageId, uid } = context.params;
    if (change.after.exists()) {
      // create new chat metadata
      const newValue = change.after.val();
      const { timestamp, message } = newValue;
      const newChatMetadata = {}
      newChatMetadata['timestamp'] = timestamp ?? "";
      newChatMetadata['messageId'] = messageId ?? "";
      newChatMetadata['lastMessage'] = message ?? "";
      newChatMetadata['uid'] = uid ?? "";
      const newChatMetadataRef = rtdb.ref(`/chat_metadata/${chatId}`)
      await newChatMetadataRef.set(newChatMetadata)
    }
  })


exports.onCreateNotification = functions.firestore
  .document(`users/{uid}/notifications/{notificationId}`)
  .onCreate(async (snapshot, context) => {
    const { uid, notificationId } = context.params;
    const { title, body } = snapshot.data();
    await sendNotification({
      uid,
      title,
      body,
    })
  })

const setNewNotification = async ({ uid, title, body }) => {
  try {
    const id = db.collection('id').doc().id;
    const notificationRef = db.doc(`users/${uid}/notifications/${id}`)
    await notificationRef.set({ id, title, body })
  } catch (error) {
    functions.logger.error(error.message);
  }
}

const sendNotification = async ({ uid, title, body }) => {
  // get notification tokens list from users/${uid}/notification_tokens from firestore
  const notificationTokensRef = db.collection(`users/${uid}/notification_tokens`);
  const tokenListSnap = await notificationTokensRef.get()
  const tokenList = tokenListSnap.docs.map((doc) => doc.data()['token']);

  if (tokenList.length === 0) {
    functions.logger.log('No notification tokens found');
    return;
  }

  for (var i = 0; i < tokenList.length; i++) {
    const token = tokenList[i];
    functions.logger.info(token)
    const payload = {
      token,
      notification: {
        title: title ?? 'New Notification from Rent Rocks',
        body: body ?? 'Open App Now!',
      }
    };
    await admin.messaging().send(payload).then((response) => {
      functions.logger.log('Successfully sent message:  ', response);
    }).catch((error) => {
      functions.logger.log('error: ', error.message);
    });
  }
}

const updateUserProductAvailability = async ({ productId, userId, isAvailable }) => {
  try {
    const docRef = db.doc(`users/${userId}/my_products/${productId}`)
    await docRef.update({ isAvailable: isAvailable })
  } catch (error) {
    functions.logger.error(error.message);
  }
}