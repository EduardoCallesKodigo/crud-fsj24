import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config/firebase'

/*10 
Importamos los componente de Swet Alert 2 y creamos una constante para que
funcione el codigo importado
*/
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


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
  
  // 9 Funcion para elimanr un registo(doc) de products(collection)
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    getProducts()
  }

  // 11 Creamos la funcion que advierte si estamos seguros de borrar (Swet Alert 2)
  const confirmDelete = (id, description) => {
    Swal.fire({
      title: `Are you sure you want to remove the product ${description}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire({
          title: "Deleted!",
          text: `${description} has been deleted.`,
          icon: "success"
        });
      }
    });
  }

  // 4 - Mostremos en consola los datos de la coleccion products
  useEffect( () => {
    getProducts()
  } , [])


  return (
    <>
      {/* {
        products.length > 0 ? products.map( (product, index) => {
          return <h3 key={index}>{product.description}</h3>
        }) : <h3>Loading ... </h3>
      } */}
      <div className="continer">
        <div className="row">
          <div className="col">

            {/* Boton Create */}
            <div className="d-grid gap-2">
              <Link to='/create' className='btn btn-secondary mt-2 mb-2'>Create</Link>
            </div>

            {/* Tabla de Productos */}
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                  products.length > 0 ? 
                    products.map( (product) => (
                      <tr key={ product.id }>
                        <td>{ product.description }</td>
                        <td>{ product.price }</td>
                        <td>
                          <Link to={`/edit/${product.id}`} className='btn btn-light me-2'>Edit</Link>
                          <button onClick={ () => { confirmDelete(product.id, product.description) } } className='btn btn-danger'><i class="fa-solid fa-trash-can"></i> Delete</button>
                        </td>
                      </tr>
                    )) : <tr><td><h3>Loading ...</h3></td></tr>
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  )
}

export default Show
