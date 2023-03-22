const { Timestamp } = require("firebase/firestore");

export class ReviewProduct {
    constructor({
        id = "",
        productId = "",
        timestamp = new Timestamp(),
        review = "",
        uid = "",
    } = {}) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.review = review;
        this.uid = uid;
    }

    static fromJson(json) {
        if (json == null) {
            return ReviewProduct.empty;
        }
        return new ReviewProduct({
            id : json.id ?? "",
            productId: json.productId ?? "",
            review: json.review ?? "",
            timestamp: json.timestamp ?? new Timestamp(),
            uid: json.uid ?? "",

        });
    }

    static get empty() {
        return new ReviewProduct();
    }

    toJson() {
        return {
            id: this.id,
            productId: this.productId,
            review: this.review,
            timestamp: this.timestamp,
            uid: this.uid,
        };
    }
}
