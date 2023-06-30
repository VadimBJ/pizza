import React, { useEffect, useState } from "react";
import {
  DocumentData,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../api/firebase";
import "./Reviews.css";
import { Avatar, Divider, TextField } from "@mui/material";

export default function Reviews(): JSX.Element {
  const [reviews, setReviews] = useState<DocumentData[]>([]);
  const [inputName, setInputName] = useState("");
  const [inputReview, setInputReview] = useState("");
  const [imgLink, setImgLink] = useState(getImgLinkFetch());
  const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setReviews(
        snapshot.docs.map((document: DocumentData) => ({
          id: document.id,
          item: document.data(),
        }))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputName, inputReview]);

  const addReview = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    getImgLinkFetch();
    addDoc(collection(db, "reviews"), {
      review: inputReview,
      name: inputName,
      link: imgLink,
      timestamp: serverTimestamp(),
    });
    setInputName("");
    setInputReview("");
  };

  async function getImgLinkFetch() {
    const resp = await fetch(
      "https://randombig.cat/roar.json?ref=apislist.com"
    );
    const obj = await resp.json();
    setImgLink(obj.url);
  }

  return (
    <div className="reviewsContainer">
      <div className="reviewsHeaderTextContainer">
        <p className="reviewsHeaderT Text1">
          Did our website make you crave for more?
        </p>
        <p className="reviewsHeaderText redText">
          Share your experience and leave a review!
        </p>
        <p className="reviewsHeaderT Text2">
          Your feedback is the secret ingredient
        </p>
        <p className="reviewsHeaderT Text3">
          that makes our website even more delicious.
        </p>
      </div>
      <form onSubmit={addReview} name="add_review" className="reviewForm">
        <TextField
          required
          id="reviewName"
          value={inputName}
          label="Tell us about yourself"
          variant="standard"
          onChange={(e) => setInputName(e.target.value)}
        />
        <br />
        <textarea
          className="inputReview"
          required
          placeholder="Leave your review here.."
          onChange={(e) => setInputReview(e.target.value)}
          value={inputReview}
        />
        <br />
        <button className="reviewButton" type="submit">
          Add review
        </button>
      </form>
      <Divider />
      <br />
      <div className="reviewListContainer">
        {reviews.map((el) => (
          <div key={el.id} className="reviewContainer">
            <div className="reviewLogoNameDate">
              <Avatar
                alt="Remy Sharp"
                src={el.item.link}
                sx={{ width: 56, height: 56 }}
              />
              <div className="reviewNameDate">
                <p className="reviewName">{el.item.name}</p>
                {/* <p className="reviewName">{formatTimestamp(el.item.timestamp.seconds)}</p> */}
              </div>
            </div>
            <div className="reviewBody">{el.item.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
