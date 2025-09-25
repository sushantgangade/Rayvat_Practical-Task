import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        // Only fetch once, or if list is empty
        if (list.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, list.length]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
        }

        h2 {
          text-align: center;
          padding: 20px 0;
          color: #242e4d;
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
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .table th, .table td {
          border: 1px solid #ddd;
          padding: 12px 15px;
          text-align: left;
          font-size: 14px;
        }

        .table th {
          background-color: #f4f6fb;
          font-weight: bold;
          color: #333;
        }

        .table tbody tr:nth-child(even) {
          background-color: #fafafa;
        }

        .table tbody tr:hover {
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
          display: inline-block;
          margin: 15px 0;
          padding: 10px 20px;
          background: linear-gradient(135deg, #242e4d, #3a4d7a);
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        button:hover {
          background: linear-gradient(135deg, #1f2a4a, #2f3d6e);
        }

        p {
          font-size: 15px;
          margin: 10px 0;
        }
      `}</style>

            <div className="container">
                <h2>Product List</h2>

                <button onClick={() => navigate("/crud")}>Go to CRUD Operations</button>

                <p>Total Records: {list.length}</p>

                <div className="table-responsive" data-pattern="priority-columns">
                    <table className="table table-bordered table-hover">
                        <caption>Responsive Product Table</caption>
                        <thead>
                            <tr>
                                <th data-priority="1">ID</th>
                                <th data-priority="2">Title</th>
                                <th data-priority="3">Price</th>
                                <th data-priority="4">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td>${p.price}</td>
                                    <td>{p.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
