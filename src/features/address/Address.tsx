import { Alert, AlertTitle, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import "./Address.css";

type MyProps = {
  setActive: (args: boolean) => void;
};

export default function Address({ setActive }: MyProps): JSX.Element {
  const [isDone, setIsDone] = useState(false);

  function sendOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem("cartContent", "[]");
    setIsDone(true);
    window.location.href = "/pizza";
  }

  return (
    <div className="addressContainer">
      <div className="addresHeaderText">
        Your order is almost there, just a little fine-tuning left...
        <br />
        Time to spill the beans (or pepperoni)!
        <p className="redText">
        Enter your delivery deets and let's make this pizza magic happen!
        </p>
      </div>
      <form
        action="/pizza"
        className="formContainer"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          sendOrder(event);
        }}
      >
        <p className="addressTextField">
          Give us the full scoop of your name, surname and all :)
        </p>
        <TextField
          required
          id="firstName"
          label="Enter your first name"
          variant="standard"
        />
        <span className="spanBlank1"> </span>
        <TextField
          required
          id="lasttName"
          label="Enter your last name"
          variant="standard"
        />
        <div className="divBlock">
          <span className="addressTextField2">Deutschland, Berlin</span>
          <span className="spanBlank1"></span>
          <TextField
            required
            id="zipCode"
            label="Enter your ZipCode"
            variant="standard"
          />
          <span className="spanBlank1"> </span>
          <TextField
            required
            id="street"
            label="Enter your street"
            variant="standard"
          />
        </div>
        <div className="phoneDiv">
          <TextField
            required
            id="phone"
            label="Enter your phone"
            variant="standard"
          />
        </div>
        <div className="commentDiv">
          <TextField
            id="comment"
            label="Leave us a note if you have any special requests or want to share your favorite pizza topping ;)"
            variant="standard"
          />
        </div>
        <button type="submit" className="SendOrderBtn">
          Send my order!
        </button>
      </form>
      {isDone && (
        <Alert severity="success">
          <AlertTitle>Pizza victory!</AlertTitle>
          Your order is on its way. Get ready for a slice of happiness!
        </Alert>
      )}
    </div>
  );
}
