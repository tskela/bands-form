import React from "react";
import InputMask from "react-input-mask";

interface IPaymentDetailsProps {
  values: {
    creditCardNumber: string;
    creditCardDate: string;
    creditCardCvv: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PaymentDetails({ values, onChange }: IPaymentDetailsProps) {
  return (
    <>
      <div className="row">
        <div className="col">
          <InputMask
            mask="9999 9999 9999 9999"
            maskPlaceholder=""
            placeholder="💳  0000 0000 0000 0000"
            name="creditCardNumber"
            value={values.creditCardNumber}
            onChange={onChange}
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
            value={values.creditCardDate}
            onChange={onChange}
            required
          />
        </div>

        <div className="col">
          <InputMask
            mask="999"
            maskPlaceholder=""
            placeholder="CVV"
            name="creditCardCvv"
            value={values.creditCardCvv}
            onChange={onChange}
            required
          />
        </div>
      </div>
    </>
  );
}

export default PaymentDetails;