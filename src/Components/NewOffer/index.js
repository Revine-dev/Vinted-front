import "./NewOffer.css";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const NewOffer = ({ token }) => {
  const history = useHistory();
  const errorDiv = useRef();
  const maxFiles = 1;

  const removeFromState = (value, remove) => {
    const newArray = [];
    for (let i = 0; i < value.length; i++) {
      if (i !== remove) {
        newArray.push(value[i]);
      }
    }
    return newArray;
  };

  const addToState = (value, adding) => {
    const newArray = [...value];
    newArray.push(adding);
    return newArray;
  };

  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (file) => {
      setFiles(addToState(files, file[0]));

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(addToState(preview, reader.result));
      };
      reader.readAsDataURL(file[0]);
    },
  });

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [brand, setBrand] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [status, setStatus] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();
  const [sharing, setSharing] = useState();

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !files ||
      !files[0] ||
      !title ||
      !description ||
      !brand ||
      !size ||
      !color ||
      !status ||
      !location ||
      !price
    ) {
      setError("Tous les champs sont requis");
      return errorDiv.current.scrollIntoView({ behavior: "smooth" });
    }

    try {
      const formData = new FormData();
      formData.append("picture", files[0]);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", status);
      formData.append("city", location);
      formData.append("brand", brand);

      const response = await axios.post(
        "https://vinted-appli.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        history.push(`/offer/${response.data._id}`);
      } else {
        console.log(response.data);
        alert("Une erreur est survenue, veuillez réessayer ultérieurement.");
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occured");
    }
  };

  return (
    <section className="container publish">
      <h1>Vends ton article</h1>

      <form className="newoffer" method="post" onSubmit={handleSubmit}>
        <fieldset
          className="drop"
          style={{ display: files.length < maxFiles ? "inherit" : "none" }}
        >
          <div {...getRootProps()} className="drag">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Glisse les images ici ...</p>
            ) : (
              <>
                <p>
                  Glisse les images ici, ou clique pour sélectionner les images
                </p>
                <em>(Uniquement les images seront acceptées)</em>
              </>
            )}
          </div>
        </fieldset>
        <aside
          className="files-preview"
          style={{ display: preview.length > 0 ? "inherit" : "none" }}
        >
          <div className="text-preview">Aperçu :</div>
          {preview.map((file, i) => {
            return (
              <div className="img" key={i}>
                <img src={file} key={i} alt={i} />
                <span
                  className="remove"
                  onClick={() => {
                    setFiles(removeFromState(files, i));
                    setPreview(removeFromState(preview, i));
                  }}
                >
                  x
                </span>
              </div>
            );
          })}
        </aside>

        <div
          className="error"
          style={{ display: error ? "inherit" : "none" }}
          ref={errorDiv}
        >
          {error}
        </div>

        <fieldset>
          <div className="row">
            <label htmlFor="">Titre</label>
            <input
              type="text"
              name=""
              id=""
              value={title}
              placeholder="Casque noir modulable taille L"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              placeholder="ex: En très bon état, disponible rapidement"
              onChange={(e) => setDescription(e.target.value)}
            >
              {description}
            </textarea>
          </div>
        </fieldset>

        <fieldset>
          <div className="row">
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={brand}
              placeholder="ex: Shoei"
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="size">Taille</label>
            <input
              type="text"
              name="size"
              value={size}
              id="size"
              placeholder="ex: L / M, XL"
              onChange={(e) => setSize(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="color">Couleur</label>
            <input
              type="text"
              name="color"
              value={color}
              id="color"
              placeholder="ex: Noir / Bleu"
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="status">Etat</label>
            <input
              type="text"
              name="status"
              value={status}
              id="status"
              placeholder="ex: En très bon état, Neuf"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="location">Localisation</label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="ex: Paris, Brive"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="row">
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="0,00€"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="row right">
            <label htmlFor="ok_sharing">
              Je suis intéressé pour échanger avec les acheteurs
            </label>
            <input
              type="checkbox"
              name="ok_sharing"
              id="ok_sharing"
              placeholder="0,00€"
              onChange={(e) => setSharing(e.target.value)}
            />
          </div>
        </fieldset>

        <button type="submit" className="btn">
          Ajouter l'annonce
        </button>
      </form>
    </section>
  );
};

export default NewOffer;
