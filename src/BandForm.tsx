import { FormEvent, useState } from "react";
import InputMask from "react-input-mask"
import sanitizeHtml from "sanitize-html";

import { IBand, ITicketType } from "./types";

interface IBandProps {
  band: IBand;
}

function BandForm({ band }: IBandProps) {
  const initialTicketSelectionValues = band.ticketTypes.reduce((acc, ticket) => {
    acc[ticket.type] = "0";
    return acc;
  }, {});

  const [totalCost, setTotalCost] = useState(0);

  const [bandForm, setBandForm] = useState({
    ...initialTicketSelectionValues,
    firstName: "",
    lastName: "",
    address: "",
    creditCardNumber: "",
    creditCardCvv: "",
    creditCardDate: "",
  });

  const convertTsToDate = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric"});
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, ticket: ITicketType = null) => {
    if (ticket) {
      const difference = Number(event.target.value) - bandForm[ticket.type];
      setTotalCost(totalCost + (difference * (ticket.cost / 100)));
    }
    setBandForm({
      ...bandForm,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (totalCost === 0) {
      alert("You have not selected any tickets for purchase.")
    } else {
      console.log(bandForm);
    }
  }

  return (
    <article className="outer container">
      <h1>{band.name}</h1>
      <div className="event-info">
        <p>📅 {convertTsToDate(band.date)}</p>
        <p>
          📍 <a href={`http://maps.apple.com/?daddr=${band.location}`}>{band.location}</a>
          </p>
      </div>

      <div className="row">
        <section className="col left">
          <figure className="figure">
            <img alt="venue" src={band.imgUrl}></img>
            <figcaption className="fig-caption">
              {sanitizeHtml(band.description_blurb, { allowedTags: [] })}
            </figcaption>
          </figure>
        </section>

        <section className="col right">
          <div className="form-container">
            <h2>Select Tickets</h2>
            <form className="form container" onSubmit={handleSubmit}>
              {band.ticketTypes.map((ticket: ITicketType) => (
                <div className="row" key={ticket.type}>
                  <div className="col">
                    <b>{ticket.name.toUpperCase()}</b>
                    <p>{ticket.description}</p>
                    <p>${ticket.cost / 100}</p>
                  </div>
                  <div className="col text-end">
                    <input
                      type="number"
                      min="0"
                      name={ticket.type}
                      value={bandForm[ticket.type]}
                      onChange={(event) => handleInputChange(event, ticket)}
                    />
                  </div>
                  <hr />
                </div>
              ))}
              <div className="row">
                <h4 className="col">TOTAL: ${totalCost.toFixed(2)}</h4>
              </div>

              <div className="row gx-3">
                <div className="col">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={bandForm.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={bandForm.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={bandForm.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <b className="payment-details">Payment Details</b>
              </div>
              <div className="row">
                <div className="col">
                  <InputMask
                    mask="9999 9999 9999 9999"
                    maskPlaceholder=""
                    placeholder="💳  0000 0000 0000 0000"
                    name="creditCardNumber"
                    value={bandForm.creditCardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row gx-3">
                <div className="col">
                  <InputMask
                    mask="99 / 99"
                    maskPlaceholder="MM / YY"
                    placeholder="MM / YY"
                    name="creditCardDate"
                    value={bandForm.creditCardDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col">
                  <InputMask
                    mask="999"
                    maskPlaceholder=""
                    placeholder="CVV"
                    name="creditCardCvv"
                    value={bandForm.creditCardCvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-secondary submit">
                Get Tickets
              </button>
            </form>
          </div>
        </section>
      </div>
    </article>
  );
}

export default BandForm;
