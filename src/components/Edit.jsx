import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { db } from '../firebase-config/firebase'

const Edit = () => {

  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()

  const {id} = useParams()

  //6 Funcion para guardar modifacione de datos de producto (description, price)
  const update = async (e) => {
    e.preventDefault()

    const product = doc(db, "products", id)
    const data = {description: description, price: price}
    await updateDoc(product, data)
    navigate('/')
  }

  //7 Funcion para llenar el formulario con los datos del producto que obtivimos con "id"
  const getProductById = async (id) => {
    const product = await getDoc( doc(db, "products", id) )
    if( product.exists() ) {
      setDescription( product.data().description )
      setPrice( product.data().price )
    } else {
      console.log('El producto no existe');
    }
  }

  //8 Que rellene el formulario al cargar el componente Edit.jsx
  useEffect( () => {
    getProductById(id)
  }, [])

  return (
    <div className='container'>
      <div className="row">
        <div className="col">

          <h1>Edit product</h1>

          <div className="card">
            <div className="card-body">

              <form onSubmit={update}>
                <div className='mb-3'>
                  <label htmlFor="desc" className='form-label'>Description</label>
                  <input
                    value={description}
                    onChange={ (e) => setDescription(e.target.value) }
                    type="text"
                    id="desc"
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor="pric" className='form-label'>Price</label>
                  <input
                    value={price}
                    onChange={ (e) => setPrice(e.target.value) }
                    type="number"
                    id="pric"
                    className='form-control'
                  />
                </div>

                <button type='submit' className='btn btn-success'>Save</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit