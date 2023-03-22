'use client';
import { getLabelFromImageLink, uploadAndGetImageLink } from '@/repositories/product_repository/clientProductRepository';
import { Product } from '@/repositories/product_repository/models/products';
import { setUserProduct } from '@/repositories/product_repository/productsRepository';
import { GeoPoint } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSplash } from '../animations/splashContext';
import { useAuth } from '../authContext';
import { useRouter } from 'next/navigation';
const ProductFormContext = createContext();

export function ProductFormProvider({ children }) {
    const { showSuccess } = useSplash()
    const { currentUser } = useAuth()
    const [product, setProduct] = useState(Product.empty);
    const [rendered, setRendered] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false)
    const [image, setImage] = useState(null)
    const router = useRouter();

    const renderUI = () => { setRendered(rendered + 1) }


    const setUserId = () => {
        renderUI();
        const newProduct = product;
        newProduct.userId = currentUser.uid;
        setProduct(newProduct)
    }

    const setProductName = (productName) => {
        renderUI();
        const newProduct = product;
        newProduct.productName = productName;
        setProduct(newProduct)
        setUserId()
    }

    const setDescription = (description) => {
        renderUI();
        const newProduct = product;
        newProduct.description = description;
        setProduct(newProduct)
    }

    const setBrand = (brand) => {
        renderUI();
        const newProduct = product;
        newProduct.brand = brand;
        setProduct(newProduct)
    }

    const setPrice = (price) => {
        renderUI();
        const newProduct = product;
        newProduct.price = price;
        setProduct(newProduct)
    }

    const setQuantity = (quantity) => {
        renderUI();
        const newProduct = product;
        newProduct.quantity = quantity;
        setProduct(newProduct)
    }

    const addPhoto = (url) => {
        renderUI();
        const newProduct = product;
        const newPhotoList = newProduct.photoList
        newPhotoList.push(url);
        newProduct.photoList = newPhotoList;
        setProduct(newProduct)
    }

    const removePhoto = (url) => {
        renderUI();
        const newProduct = product;
        const newPhotoList = newProduct.photoList
        newPhotoList.filter(element => element != url);
        newProduct.photoList = newPhotoList;
        setProduct(newProduct);
    }

    const setProductVideo = (productVideo) => {
        renderUI();
        const newProduct = product;
        newProduct.productVideo = productVideo;
        setProduct(newProduct)
    }

    const setCategories = (categories) => {
        renderUI();
        const newProduct = product;
        newProduct.categories = categories;
        setProduct(newProduct)
    }

    const addHighlights = (highlights) => {
        renderUI();
        const newProduct = product;
        const newHighlightsList = newProduct.highlights
        newHighlightsList.push(highlights);
        newProduct.highlights = newHighlightsList;
        setProduct(newProduct)
    }

    const removeHighlights = (highlights) => {
        renderUI();
        const newProduct = product;
        const newHighlightsList = newProduct.highlights
        newHighlightsList.filter(element => element != highlights);
        newProduct.highlights = newHighlightsList;
        setProduct(newProduct);
    }

    const addSpecifications = (specifications) => {
        renderUI();
        const newProduct = product;
        const newSpecificationsList = newProduct.specifications
        newSpecificationsList.push(specifications);
        newProduct.specifications = newSpecificationsList;
        setProduct(newProduct)
    }

    const removespecifications = (specifications) => {
        renderUI();
        const newProduct = product;
        const newspecificationsList = newProduct.specifications
        newspecificationsList.filter(element => element != specifications);
        newProduct.specifications = newspecificationsList;
        setProduct(newProduct);
    }

    const setAddress = (address) => {
        renderUI();
        const newProduct = product;
        newProduct.address = address;
        setProduct(newProduct)
    }

    const setAvailablility = (isAvailable) => {
        renderUI();
        const newProduct = product;
        newProduct.isAvailable = isAvailable;
        setProduct(newProduct)
    }

    const setLocation = (location) => {
        renderUI();
        const newProduct = product;
        newProduct.location = location;
        setProduct(newProduct)
    }

    const addTags = (tags) => {
        renderUI();
        const newProduct = product;
        const newTagsList = newProduct.tags
        newTagsList.push(tags);
        newProduct.tags = newTagsList;
        setProduct(newProduct)
    }

    const removeTags = (tags) => {
        renderUI();
        const newProduct = product;
        const newTagsList = newProduct.tags
        newTagsList.filter(element => element != tags);
        newProduct.tags = newTagsList;
        setProduct(newProduct);
    }

    const addphotoLabelsList = (photoLabelsList) => {
        renderUI();
        const newProduct = product;
        const newPhotoLabelsList = [...newProduct.photoLabels, ...photoLabelsList]
        newProduct.photoLabels = newPhotoLabelsList;
        setProduct(newProduct)
    }

    const addphotoLabel = (photoLabels) => {
        renderUI();
        const newProduct = product;
        const newPhotoLabelsList = newProduct.photoLabels
        newPhotoLabelsList.push(photoLabels);
        newProduct.photoLabels = newPhotoLabelsList;
        setProduct(newProduct)
    }

    const removephotoLabel = (photoLabels) => {
        renderUI();
        const newProduct = product;
        const newPhotoLabelsList = newProduct.photoLabels
        newPhotoLabelsList.filter(element => element != photoLabels);
        newProduct.photoLabels = newPhotoLabelsList;
        setProduct(newProduct);
    }


    const clearProduct = () => {
        renderUI();
        setProduct(Product.empty)
    }

    const handleOnImageSelect = async (event) => {
        renderUI();
        event.preventDefault()
        setImage(event.target.files[0])
    }

    const handleUploadImage = async (e) => {
        renderUI();
        try {
            e.preventDefault()
            setImageUploading(true);
            const imageLink = await uploadAndGetImageLink(currentUser.uid, image)
            addPhoto(imageLink)
            const labelsData = await getLabelFromImageLink(imageLink) ?? []
            addphotoLabelsList(labelsData)
            setImageUploading(false);
        } catch (error) {
            alert(error.message)
            setImageUploading(false);
        }

    }

    const isReadyForFinalSubmit = () => {
        renderUI();
        return (
            product.userId != "" &&
            product.name != "" &&
            product.description != "" &
            product.price < 10 &&
            product.categories != "" &&
            product.address != ""
            // && product.location != new GeoPoint(-90, 90)
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isReadyForFinalSubmit()) {
            alert("Something is missing!")
            return;
        }
        console.log(product.toJson());
        try {
            setIsLoading(true);
            await setUserProduct({ product: product, userId: currentUser.uid });
            setIsLoading(false);
            showSuccess()
            clearProduct()
            router.push('/dashboard/my-products')
        } catch (error) {
            alert(error.message)
            setIsLoading(false);
        }
        renderUI();
    }


    return (
        <ProductFormContext.Provider value={{
            rendered,
            product,
            setProductName,
            setDescription,
            setBrand,
            setPrice,
            setQuantity,
            addPhoto,
            removePhoto,
            setProductVideo,
            setCategories,
            addHighlights,
            removeHighlights,
            addSpecifications,
            removespecifications,
            setAddress,
            setAvailablility,
            setLocation,
            addTags,
            removeTags,
            addphotoLabelsList,
            addphotoLabel,
            removephotoLabel,
            isLoading,
            imageUploading,
            image,
            handleUploadImage,
            handleOnImageSelect,
            clearProduct,
            handleSubmit,
            isReadyForFinalSubmit,
        }}>
            {children}
        </ProductFormContext.Provider>
    );
}

export const useProductForm = () => useContext(ProductFormContext)