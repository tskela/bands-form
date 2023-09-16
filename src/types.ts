export interface ITicketType {
  type: string;
  name: string;
  description: string;
  cost: number;
}

export interface IBand {
  id: string;
  date: number;
  description_blurb: string;
  imgUrl: string;
  location: string;
  name: string;
  ticketTypes: ITicketType[];
}