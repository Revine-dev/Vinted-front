import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [dataAd, setDataAd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://vinted-appli.herokuapp.com/offer/" + id
      );
      setDataAd(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const getDetails = (details) => {
    return details.map((item) => {
      return { name: Object.keys(item)[0], value: item[Object.keys(item)] };
    });
  };

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : dataAd.error ? (
    <div className="notfound">Offer not found</div>
  ) : (
    <section className="container offer">
      <div className="pictures">
        <img src={dataAd.product_image.url} alt={dataAd.product_name} />
      </div>
      <div className="infos">
        <div className="price">{dataAd.product_price} €</div>
        <div className="details">
          {getDetails(dataAd.product_details).map((item, i) => {
            return (
              <div key={i}>
                <span className="property">{item.name}</span>
                <span className="content">{item.value}</span>
              </div>
            );
          })}
        </div>
        <div className="name">{dataAd.product_name}</div>
        <div className="description">{dataAd.product_description}</div>
        <div className="saler">{dataAd.owner.account.username}</div>
      </div>
    </section>
  );
};

export default Offer;
