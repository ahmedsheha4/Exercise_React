import "./styles/App.css";
import React, { useEffect, useState } from "react";
import StatsCard from "./components/statsCard";
import Pagination from "./components/pagination";
import axios from "axios";
import DropDown from "./components/dropDown";
import PhonesTable from "./components/phonesTable";

function App() {
  let baseURL = "http://localhost:8000/api/";
  let phonesPerPage;
  if (!localStorage.getItem("#ofPhones")) {
    phonesPerPage = 10;
  } else {
    phonesPerPage = localStorage.getItem("#ofPhones");
  }
  const [phones, setPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [numValid, setNumvalid] = useState(0);
  const [numInvalid, setNumInvalid] = useState(0);
  const [numberOfPhones, setNumberOfPhones] = useState(phonesPerPage);
  const [pageNum, setPageNum] = useState(1);
  const [totalPhones, setTotalPhones] = useState(0);
  const [countryFilter, setCountryFilter] = useState("");
  const [showValid, setShowValid] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const ApiCall = () => {
    let state;
    if (showValid) {
      state = "1";
    }
    if (showInvalid) {
      state = "0";
    }
    if (!showInvalid && !showValid) {
      state = "";
    }
    axios
      .get(
        `${baseURL}phones?page=${pageNum}&limit=${numberOfPhones}&country=${countryFilter}&state=${state}`,
        {
          mode: "cors",
        },
        setIsLoading(true)
      )
      .then((res) => {
        setIsLoading(false);
        let data = res.data.Phones == null ? [] : res.data.Phones;
        setPhones(data);
        let valid = 0;
        let invalid = 0;
        for (let i of data) {
          i.isValid ? valid++ : invalid++;
        }
        setNumvalid(valid);
        setNumInvalid(invalid);
        setTotalPhones(res.data.TotalRows);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors("Something went wrong");
      });
  };
  useEffect(() => {
    ApiCall();
  }, [numberOfPhones, pageNum]);

  const selectHandler = (e) => {
    setNumberOfPhones(e.target.value);
    localStorage.setItem("#ofPhones", e.target.value);
    setPageNum(1);
  };

  const clickPageHandler = (page) => {
    setPageNum(page);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setPageNum(1);
      ApiCall();
    }
  };

  const changeHandler = (e) => {
    if (e.target.name === "invalid") {
      setShowInvalid(!showInvalid);
      setShowValid(false);
    }
    if (e.target.name === "valid") {
      setShowInvalid(false);
      setShowValid(!showValid);
    }
  };
  if (isLoading) {
    return <div className="center">Loading..</div>;
  }

  if (errors) {
    return <div className="center">{errors}</div>;
  }

  return (
    <div className="container">
      <DropDown selectHandler={selectHandler} numberOfPhones={numberOfPhones} />
      <div className="statsCards">
        <StatsCard num={numValid} valid={true} />
        <StatsCard num={numInvalid} valid={false} />
      </div>
      <div className="input-fields">
        <input
          className="search__input"
          type="text"
          placeholder="Search by country"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="check-boxes">
        <form>
          <label>
            <input
              type="checkbox"
              name="valid"
              onChange={changeHandler}
              checked={showValid}
              value="1"
            />{" "}
            Show valid phone numbers only
          </label>
        </form>
        <form>
          <label>
            <input
              type="checkbox"
              name="invalid"
              onChange={changeHandler}
              checked={showInvalid}
              value="0"
            />{" "}
            Show Invalid phone numbers only
          </label>
        </form>
      </div>
      <div className="btn-div">
        <button
          className="filter-btn"
          onClick={() => {
            setPageNum(1);
            ApiCall();
          }}
        >
          Apply Filter
        </button>
      </div>
      {phones.length > 0 ? (
        <PhonesTable phones={phones} />
      ) : (
        <div className="center no-data">No Results Found!</div>
      )}
      <Pagination
        phonesPerPage={numberOfPhones}
        currentPage={pageNum}
        clickPageHandler={clickPageHandler}
        totalPhones={totalPhones}
      />
    </div>
  );
}

export default App;
