const { Timestamp, GeoPoint } = require("firebase/firestore");

export class UserLocation {
    constructor({
        id = "",
        geoLocation = new GeoPoint(-90, 90),
        ipAddress = "",
        kIsWeb = true,
        timestamp = new Timestamp(),
    } = {}) {
        this.id = id;
        this.geoLocation = geoLocation,
            this.ipAddress = ipAddress,
            this.kIsWeb = kIsWeb,
            this.timestamp = timestamp;
    }

    withNewId(id) {
        this.id = id;
    }

    static fromJson(json) {
        if (json == null) {
            return User.empty;
        }
        return new UserLocation({
            id: json.id ?? "",
            geoLocation: json.geoLocation ?? new GeoPoint(-90, 90),
            ipAddress: json.ipAddress ?? "",
            kIsWeb: json.kIsWeb ?? false,
            timestamp: json.timestamp ?? new Timestamp(),
        });
    }

    static get empty() {
        return new UserLocation();
    }

    toJson() {
        return {
            id: this.id,
            geoLocation: this.geoLocation,
            ipAddress: this.ipAddress,
            kIsWeb: this.kIsWeb,
            timestamp: this.timestamp,
        };
    }
}
