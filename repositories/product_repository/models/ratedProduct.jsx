const { Timestamp } = require("firebase/firestore");

export class RatedProduct {
    constructor({
        productId = "",
        timestamp = new Timestamp(),
        rating = 0,
        uid = "",
    } = {}) {
        this.productId = productId;
        this.timestamp = timestamp;
        this.rating = rating;
        this.uid = uid;
    }

    static fromJson(json) {
        if (json == null) {
            return RatedProduct.empty;
        }
        return new RatedProduct({
            productId: json.productId ?? "",
            rating: json.rating ?? 0,
            timestamp: json.timestamp ?? new Timestamp(),
            uid: json.uid ?? "",

        });
    }

    static get empty() {
        return new RatedProduct();
    }

    toJson() {
        return {
            productId: this.productId,
            rating: this.rating,
            timestamp: this.timestamp,
            uid: this.uid,
        };
    }
}
