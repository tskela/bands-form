import { FormEvent, useState } from "react";
import sanitizeHtml from "sanitize-html";

import PaymentDetails from "./PaymentDetails";
import TicketTypeSelection from "./TicketTypeSelection";
import UserInformation from "./UserInformation";

import { IBand, ITicketType } from "./types";

interface IBandProps {
  band: IBand;
}

interface IBandFormState {
  [key: string]: string;
}

function BandForm({ band }: IBandProps) {
  const initialTicketSelectionValues = band.ticketTypes.reduce((acc, ticket) => {
    acc[ticket.type] = "0";
    return acc;
  }, {});
  const initialFormState = {
    ...initialTicketSelectionValues,
    firstName: "",
    lastName: "",
    address: "",
    creditCardNumber: "",
    creditCardCvv: "",
    creditCardDate: "",
  }

  const [totalCost, setTotalCost] = useState<number>(0);
  const [bandForm, setBandForm] = useState<IBandFormState>(initialFormState);

  const convertTsToDate = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleDateString(
      undefined,
      { weekday: "long", month: "long", day: "numeric" }
    );
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    ticket: ITicketType = null
  ) => {
    if (ticket) {
      const difference = Number(event.target.value) - Number(bandForm[ticket.type]);
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
      setBandForm(initialFormState);
      setTotalCost(0);
      alert("Order submitted!");
    }
  }

  const {
    firstName,
    lastName,
    address,
    creditCardNumber,
    creditCardDate,
    creditCardCvv
  } = bandForm;
  const userInformation = { firstName, lastName, address };
  const paymentDetails = { creditCardNumber, creditCardDate, creditCardCvv };

  return (
    <article className="outer container">
      <h1>{band.name}</h1>
      <div className="event-info">
        <p>📅 {convertTsToDate(band.date)}</p>
        <p>
          📍
          <a href={`http://maps.apple.com/?daddr=${band.location}`}>
            {band.location}
          </a>
        </p>
      </div>

      <div className="row">
        <section className="col left">
          <figure>
            <img alt="venue" src={band.imgUrl}></img>
            <figcaption>
              {/* Remove HTML tags from description blurbs */}
              {sanitizeHtml(band.description_blurb, { allowedTags: [] })}
            </figcaption>
          </figure>
        </section>

        <section className="col right">
          <div className="form-container">
            <h2>Select Tickets</h2>
            <form className="band-form container" onSubmit={handleSubmit}>
              {band.ticketTypes.map((ticket: ITicketType) => (
                <TicketTypeSelection
                  key={ticket.type}
                  ticket={ticket}
                  value={bandForm[ticket.type]}
                  onChange={(event) => handleInputChange(event, ticket)}
                />
              ))}

              <div className="row">
                <h4 className="col">TOTAL: ${totalCost.toFixed(2)}</h4>
              </div>

              <UserInformation values={userInformation} onChange={handleInputChange} />

              <div className="row">
                <b>Payment Details</b>
              </div>

              <PaymentDetails values={paymentDetails} onChange={handleInputChange} />

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
