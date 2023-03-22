const { Timestamp } = require("firebase/firestore");

export class User {
    constructor({
        uid = "",
        displayName = "",
        email = "",
        emailVerified = "",
        metadata = "",
        phoneNumber = "",
        photoURL = "",
        refreshToken = "",
        tenantId = "",
        favoritesProducts = [],
        cartItems = [],
        isVerified = "",
        timestamp = null,
    } = {}) {
        this.uid = uid;
        this.displayName = displayName;
        this.email = email;
        this.emailVerified = emailVerified;
        this.metadata = metadata;
        this.phoneNumber = phoneNumber;
        this.photoURL = photoURL;
        this.refreshToken = refreshToken;
        this.tenantId = tenantId;
        this.favoritesProducts = favoritesProducts;
        this.cartItems = cartItems;
        this.isVerified = isVerified;
        this.timestamp = timestamp;
    }



    static fromJson(json) {
        if (json == null) {
            return User.empty;
        }
        return new User({
            uid: json.uid ?? "",
            displayName: json.displayName ?? "",
            email: json.email ?? "",
            emailVerified: json.emailVerified ?? "",
            metadata: json.metadata ?? "",
            phoneNumber: json.phoneNumber ?? "",
            photoURL: json.photoURL ?? "",
            refreshToken: json.refreshToken ?? "",
            tenantId: json.tenantId ?? "",
            favoritesProducts: json.favoritesProducts ?? [],
            cartItems: json.cartItems ?? [],
            isVerified: json.isVerified ?? "",
            timestamp: json.timestamp ?? null,
        });
    }

    static get empty() {
        return new User();
    }

    toJson() {
        return {
            uid: this.uid,
            displayName: this.displayName,
            email: this.email,
            emailVerified: this.emailVerified,
            metadata: this.metadata,
            phoneNumber: this.phoneNumber,
            photoURL: this.photoURL,
            refreshToken: this.refreshToken,
            tenantId: this.tenantId,
            favoritesProducts: this.favoritesProducts,
            cartItems: this.cartItems,
            isVerified: this.isVerified,
            timestamp: this.timestamp,
        };
    }
}
