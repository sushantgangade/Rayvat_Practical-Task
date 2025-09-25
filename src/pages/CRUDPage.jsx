import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../features/products/productSlice";

export default function CRUDPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list, loading, error } = useSelector((state) => state.products);

    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        category: "",
    });
    const [editProductId, setEditProductId] = useState(null);
    const [editProductData, setEditProductData] = useState({
        title: "",
        price: "",
        category: "",
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAdd = () => {
        dispatch(
            addProduct({
                ...newProduct,
                price: Number(newProduct.price),
            })
        ).then(() => {
            setNewProduct({ title: "", price: "", category: "" });
            navigate("/products"); // Go back to ProductList
        });
    };

    const handleEdit = (product) => {
        setEditProductId(product.id);
        setEditProductData({
            title: product.title,
            price: product.price,
            category: product.category,
        });
    };

    const handleUpdate = () => {
        dispatch(
            updateProduct({
                id: editProductId,
                data: { ...editProductData, price: Number(editProductData.price) },
            })
        ).then(() => {
            setEditProductId(null);
            setEditProductData({ title: "", price: "", category: "" });
            navigate("/products"); // Go back to ProductList
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
        }

        h1 {
          text-align: center;
          color: #242e4d;
          padding: 20px 0;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          margin-top: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 12px 15px;
          text-align: left;
          font-size: 14px;
        }

        th {
          background-color: #f4f6fb;
          font-weight: bold;
          color: #333;
        }

        tbody tr:nth-child(even) {
          background-color: #fafafa;
        }

        tbody tr:hover {
          background-color: #f1f1f1;
        }

        table caption {
          padding: .75em;
          font-size: 1rem;
          font-weight: 600;
          text-align: center;
          caption-side: top;
          color: #242e4d;
        }

        @media screen and (max-width: 767px) {
          table caption {
            display: none;
          }
        }

        .text-center {
          text-align: center;
        }

        button {
          margin: 5px;
          padding: 8px 15px;
          background: linear-gradient(135deg, #242e4d, #3a4d7a);
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        button:hover {
          background: linear-gradient(135deg, #1f2a4a, #2f3d6e);
        }

        input {
          padding: 6px 10px;
          margin-right: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .form-inline {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 15px;
        }

        .form-inline input {
          margin-bottom: 5px;
        }

        p {
          font-size: 15px;
          margin-bottom: 10px;
        }
      `}</style>

            <div className="container">
                <h1>CRUD Operations</h1>

                <div className="form-inline">
                    <input
                        placeholder="Title"
                        value={newProduct.title}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, title: e.target.value })
                        }
                    />
                    <input
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                        }
                    />
                    <input
                        placeholder="Category"
                        value={newProduct.category}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, category: e.target.value })
                        }
                    />
                    <button onClick={handleAdd}>Add Product</button>
                </div>

                <p>Total Records: {list.length}</p>

                <div className="table-responsive">
                    <table>
                        <caption>Product Table</caption>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        {editProductId === product.id ? (
                                            <input
                                                value={editProductData.title}
                                                onChange={(e) =>
                                                    setEditProductData({
                                                        ...editProductData,
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            product.title
                                        )}
                                    </td>
                                    <td>
                                        {editProductId === product.id ? (
                                            <input
                                                value={editProductData.price}
                                                onChange={(e) =>
                                                    setEditProductData({
                                                        ...editProductData,
                                                        price: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            `$${product.price}`
                                        )}
                                    </td>
                                    <td>
                                        {editProductId === product.id ? (
                                            <input
                                                value={editProductData.category}
                                                onChange={(e) =>
                                                    setEditProductData({
                                                        ...editProductData,
                                                        category: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            product.category
                                        )}
                                    </td>
                                    <td>
                                        {editProductId === product.id ? (
                                            <button onClick={handleUpdate}>Save</button>
                                        ) : (
                                            <button onClick={() => handleEdit(product)}>Edit</button>
                                        )}
                                        <button onClick={() => handleDelete(product.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
