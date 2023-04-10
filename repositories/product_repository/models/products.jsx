const { Timestamp, GeoPoint } = require("firebase/firestore");

export class Product {
  constructor({
    productId = "",
    productName = "",
    description = "",
    brand = "",
    price = 0,
    quantity = 0,
    currency = "₹",
    photoList = [],
    photoLabels = [],
    productVideo = "",
    categories = "",
    ratings = [],
    reviews = [],
    highlights = [],
    specifications = [],
    isAvailable = false,
    isOnSale = false,
    salePrice = 0,
    saleStartAt = null,
    saleEndAt = null,
    createdAt = null,
    updatedAt = null,
    weight = 0,
    dimensions = {},
    tags = [],
    relatedProducts = [],
    location = "",
    // location = new GeoPoint(-90, 90),
    userId = "",
    address = "",
  } = {}) {
    this.productId = productId;
    this.productName = productName;
    this.description = description;
    this.brand = brand;
    this.price = price;
    this.quantity = quantity;
    this.currency = currency;
    this.photoList = photoList;
    this.photoLabels = photoLabels;
    this.productVideo = productVideo;
    this.categories = categories;
    this.ratings = ratings;
    this.reviews = reviews;
    this.highlights = highlights;
    this.specifications = specifications;
    this.isAvailable = isAvailable;
    this.isOnSale = isOnSale;
    this.salePrice = salePrice;
    this.saleStartAt = saleStartAt;
    this.saleEndAt = saleEndAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.weight = weight;
    this.dimensions = dimensions;
    this.tags = tags;
    this.relatedProducts = relatedProducts;
    this.location = location;
    this.userId = userId;
    this.address = address;
  }

  withNewId(id) {
    if (!id) {
      return;
    }
    this.productId = id;
  }


  static fromJson(json) {
    if (json == null) {
      return Product.empty;
    }
    return new Product({
      productId: json.productId ?? "",
      productName: json.productName ?? "",
      description: json.description ?? "",
      brand: json.brand ?? "",
      price: json.price ?? 0,
      quantity: json.quantity ?? 0,
      currency: json.currency ?? "INR",
      photoList: json.photoList ?? [],
      photoLabels: json.photoLabels ?? [],
      productVideo: json.productVideo ?? "",
      categories: json.categories ?? [],
      ratings: json.ratings ?? [],
      reviews: json.reviews ?? [],
      highlights: json.highlights ?? [],
      specifications: json.specifications ?? [],
      isAvailable: json.isAvailable ?? true,
      isOnSale: json.isOnSale ?? false,
      salePrice: json.salePrice ?? 0,
      saleStartAt: json.saleStartAt ?? null,
      saleEndAt: json.saleEndAt ?? null,
      createdAt: json.createdAt ?? "",
      updatedAt: json.updatedAt ?? "",
      weight: json.weight ?? 0,
      dimensions: json.dimensions ?? {},
      tags: json.tags ?? [],
      relatedProducts: json.relatedProducts ?? [],
      location: json.location ?? "",
      // location: json.location ?? new GeoPoint(-90, 90),
      userId: json.userId ?? "",
      address: json.address ?? "",
    });
  }



  toJson() {
    return {
      productId: this.productId,
      productName: this.productName,
      description: this.description,
      brand: this.brand,
      price: this.price,
      quantity: this.quantity,
      currency: this.currency,
      photoList: this.photoList,
      photoLabels: this.photoLabels,
      productVideo: this.productVideo,
      categories: this.categories,
      ratings: this.ratings,
      reviews: this.reviews,
      highlights: this.highlights,
      specifications: this.specifications,
      isAvailable: this.isAvailable,
      isOnSale: this.isOnSale,
      salePrice: this.salePrice,
      saleStartAt: this.saleStartAt,
      saleEndAt: this.saleEndAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      weight: this.weight,
      dimensions: this.dimensions,
      tags: this.tags,
      relatedProducts: this.relatedProducts,
      location: this.location,
      userId: this.userId,
      address: this.address,
    };
  }

  
  static get empty() {
    return new Product();
  }
  
  static getCopyProduct(product) {
    return new Product(
      {
        productId: product.productId,
        productName: product.productName,
        description: product.description,
        brand: product.brand,
        price: product.price,
        quantity: product.quantity,
        currency: product.currency,
        photoList: product.photoList,
        photoLabels: product.photoLabels,
        productVideo: product.productVideo,
        categories: product.categories,
        ratings: product.ratings,
        reviews: product.reviews,
        highlights: product.highlights,
        specifications: product.specifications,
        isAvailable: product.isAvailable,
        isOnSale: product.isOnSale,
        salePrice: product.salePrice,
        saleStartAt: product.saleStartAt,
        saleEndAt: product.saleEndAt,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        weight: product.weight,
        dimensions: product.dimensions,
        tags: product.tags,
        relatedProducts: product.relatedProducts,
        location: product.location,
        userId: product.userId,
        address: product.address,
      }
    )
  }

  
  isEmpty() {
    return this.productId === "" && this.productName === "";
  }

  static categoryList = [
    "Apparel and Accessories",
    "Beauty and Personal Care",
    "Electronics",
    "Home and Garden",
    "Health and Wellness",
    "Sports and Outdoors",
    "Toys and Games",
    "Baby and Kids",
    "Automotive",
    "Books and Media",
    "Food and Beverages",
    "Office and School Supplies",
    "Pet Supplies",
    "Jewelry and Watches",
    "Arts and Crafts",
    "Travel and Luggage",
  ]

  getAvgRating = () => {
    const ratings = this.ratings;
    if (ratings.length == 0) {
      return 0;
    }
    let count = 0;
    ratings.forEach((rat) => {
      count += rat.rating;
    })
    return count;
  }

  getTax = () => {
    return parseInt(`${this.price}`) * 0.02;
  }
  getTotalPrice = () => {
    return parseInt(`${this.price}`) + (parseInt(`${this.price}`) * 0.02);
  }
}
