import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase-config/firebase'

const Show = () => {

  // 1 - Configuramos los Hooks: paducts con useSatate
  const [products, setProducts] = useState( [] )

  // 2 - Creamos la referencia de nuestra base de datos: db -> products
  const productsCollection = collection(db, "products")

  // 3 - Creemos una funcion para mostrar todos los docs (productos)
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    console.log(data.docs);
    setProducts(
      data.docs.map( (doc) => ( {...doc.data(), id:doc.id} ) )
    )
    console.log(products);
    
  }
  
  // 4 - Mostremos en consola los datos de la coleccion products
  useEffect( () => {
    getProducts()
  } , [])


  return (
    <div>Soy Show.jsx</div>
  )
}

export default Show
