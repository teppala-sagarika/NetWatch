import { useState } from "react";
import API from "../services/api";

function AddDevice({ refresh }) {

  const [name, setName] =
    useState("");

  const [host, setHost] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setLoading(true);

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

      }

      catch (err) {

        setError(

          err.response?.data?.message ||

          "Unable to add service."

        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <form
      className="device-form"
      onSubmit={handleSubmit}
    >

      <input

        type="text"

        placeholder="Service Name"

        value={name}

        onChange={(e) =>

          setName(e.target.value)

        }

        required

      />

      <input

        type="text"

        placeholder="Website URL (e.g. google.com)"

        value={host}

        onChange={(e) =>

          setHost(e.target.value)

        }

        required

      />

      {

        error &&

        <p
          style={{
            color: "#ef4444",
            margin: "8px 0"
          }}
        >

          {error}

        </p>

      }

      <button

        type="submit"

        disabled={loading}

      >

        {

          loading

            ? "Adding..."

            : "Add Service"

        }

      </button>

    </form>

  );

}

export default AddDevice;