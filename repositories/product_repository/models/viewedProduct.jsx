const { Timestamp } = require("firebase/firestore");

export class ViewedProduct {
    constructor({
        productId = "",
        timestamp = new Timestamp(),
        id = "",
        uid = "",
    } = {}) {
        this.productId = productId;
        this.timestamp = timestamp;
        this.id = id;
        this.uid = uid;
    }


    withNewId(id) {
        if (!id) {
            return;
        }
        this.id = id;
    }


    static fromJson(json) {
        if (json == null) {
            return ViewedProduct.empty;
        }
        return new ViewedProduct({
            productId: json.productId ?? "",
            id: json.id ?? "",
            timestamp: json.timestamp ?? new Timestamp(),
            uid: json.uid ?? "",

        });
    }

    static get empty() {
        return new ViewedProduct();
    }

    toJson() {
        return {
            productId: this.productId,
            id: this.id,
            timestamp: this.timestamp,
            uid: this.uid,
        };
    }
}
