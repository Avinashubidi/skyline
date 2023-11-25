import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";

const MenCollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllMenProducts();
  }, [page]);

  const getAllMenProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/men-products/${page}`);
      setLoading(false);
      // Filter products with gender === 'men'
      const menProducts = data?.products.filter((product) => product.gender === 'men');
      setProducts([...products, ...menProducts]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout title={"Men's Collection"}>
      <div className="container-fluid row mt-2 men-collection-page">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Men's Collection</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Load more <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenCollectionPage;
