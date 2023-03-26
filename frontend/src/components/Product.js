import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import Cookies from "js-cookie";
import SockJsClient from "react-stomp";

const SOCKET_URL = "http://localhost:8080/ws";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const myCookie = Cookies.get("JSESSIONID");

  let onMessageReceived = (msg) => {
    for (let i = 0; i < 2; i++) {
      const productId = msg[i].id;
      const lastOffer = msg[i].lastoffer;
      const totalOffer = msg[i].totaloffer;
      const totalOfferuser = msg[i].totalofferuser;

      setProducts((prevState) =>
        prevState.map((product) =>
          product.id === productId
            ? {
                ...product,
                lastoffer: lastOffer,
                totaloffer: totalOffer,
                totalofferuser: totalOfferuser,
              }
            : product
        )
      );
    }
  };

  const handleSavePrice = async (index) => {
    const updatedProducts = [...products];
    const currentProduct = updatedProducts[index];
    currentProduct.lastOfferUser = localStorage.getItem("username");

    const response = await fetch("http://localhost:8080/users/updateproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentProduct.id,
        lastoffer: updatedProducts[index].lastoffer,
        username: localStorage.getItem("username"),
      }),
      credentials: "include",
      origin: true,
    });

    if (!response.ok) {
      // Güncelleme işlemi başarısız oldu
      console.log("Güncelleme işlemi başarısız oldu");
    }
  };

  useEffect(() => {
    //const headers = new Headers();
    //headers.append("Content-Type", "application/json");
    //headers.append("Cookie", `JSESSIONID=${myCookie}`);
    console.log(Cookies.get("JSESSIONID"));
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/users/getproducts", {
        method: "GET",
        credentials: "include",
        origin: true,
        //  headers: headers,
      });
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, [myCookie]);

  const handlePriceChange = (event, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].lastoffer = parseInt(event.target.value);
  };

  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
      <p>Aktif Açık Artırmalarımızı Anında Görüp Teklif Verebilirsiniz</p>

      {!loggedIn ? (
        <div className="login-message">
          <p>Açık artırmaya katılmak için öncelikle lütfen giriş yapınız.</p>
        </div>
      ) : (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="product-container">
              <SockJsClient
                url={SOCKET_URL}
                topics={["/topic/products"]}
                onConnect={console.log("connected!")}
                onDisconnect={console.log("Disconnected!")}
                onMessage={(msg) => onMessageReceived(msg)}
                debug={false}
                onError={(error) => console.error(error)}
              />

              {products.map((product, index) => (
                <div key={product.id} className="product">
                  <img src={product.img} alt="Product" />
                  <h3>{product.name}</h3>
                  <p>{product.info}</p>
                  <div className="price">
                    <h3>Son Teklif Veren:{product.lastOfferUser}</h3>
                    <span>Price:</span>
                    <span>${product.lastoffer}</span>
                    <input
                      type="number"
                      placeholder="Enter price"
                      onChange={(event) => handlePriceChange(event, index)}
                      min={product.lastoffer}
                    />
                    <button
                      className="button-18"
                      onClick={() => handleSavePrice(index)}
                    >
                      Teklif Ver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
