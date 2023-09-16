import React from "react";

interface IUserInformationProps {
  values: {
    firstName: string;
    lastName: string;
    address: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UserInformation({ values, onChange }: IUserInformationProps) {
  return (
    <>
      <div className="row gx-3">
        <div className="col">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={onChange}
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={onChange}
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
            value={values.address}
            onChange={onChange}
            required
          />
        </div>
      </div>
    </>
  );
}

export default UserInformation;