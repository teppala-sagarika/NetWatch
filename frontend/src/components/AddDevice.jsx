import { useState } from "react";
import API from "../services/api";

function AddDevice({ refresh }) {

  const [name, setName] =
    useState("");

  const [host, setHost] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/devices",
          {
            name,
            host
          }
        );

        setName("");
        setHost("");

        refresh();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <form
      className="device-form"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        placeholder="Device Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Host/IP"
        value={host}
        onChange={(e) =>
          setHost(e.target.value)
        }
      />

      <button type="submit">
        Add Device
      </button>

    </form>

  );

}

export default AddDevice;