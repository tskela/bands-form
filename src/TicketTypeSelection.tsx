import React from "react";

import { ITicketType } from "./types";

interface ITicketTypeSelectionProps {
  ticket: ITicketType;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TicketTypeSelection({ ticket, value, onChange }: ITicketTypeSelectionProps) {
  return (
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
          value={value}
          onChange={onChange}
        />
      </div>
      <hr />
    </div>
  );
}

export default TicketTypeSelection;