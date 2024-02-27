import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { get_all_country } from "../service/country.service";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountry } from "../redux/slice/countrySlice";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

const countryImage = (rowData) => {
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt={rowData.name.official}
        src={rowData.flags.png}
        style={{ minWidth: "40px", height: "40px", objectFit: "cover" }}
      />
    </div>
  );
};

const AlternativeName = (rowData) => {
  return (
    <div className="flex align-items-center gap-2">
      {rowData?.altSpellings.map((data: string, idx: number) => (
        <span key={idx}>{data},</span>
      ))}
    </div>
  );
};

const Table = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null); // State to store selected country

  useEffect(() => {
    get_all_country().then((res) => {
      if (res.status === 200) {
        dispatch(getAllCountry(res.data));
        setLoading(false);
      }
    });
  }, []);

  const dataCountries = useSelector((state: any) => state.country.country);

  //   ============================ finder ============================
  const findCommon = (nativeName: any) => {
    for (let key in nativeName) {
      if (nativeName[key].hasOwnProperty("common")) {
        return nativeName[key].common;
      }
    }
    return null;
  };
  const findCurrency = (currency: any) => {
    for (let key in currency) {
      if (currency[key].hasOwnProperty("name")) {
        return currency[key].name;
      }
    }
    return null;
  };
  const findSymbol = (Symbol: any) => {
    for (let key in Symbol) {
      if (Symbol[key].hasOwnProperty("symbol")) {
        return Symbol[key].symbol;
      }
    }
    return null;
  };

  //   ============================

  return (
    <div style={{ marginTop: "40px" }}>
      <span className="p-input-icon-left" style={{ marginBottom: "20px" }}>
        <i className="pi pi-search" />
        <InputText
          placeholder="Search by Country Name"
          onInput={(e) =>
            setSearch({
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            })
          }
          size={130}
        />
      </span>
      <DataTable
        value={dataCountries}
        paginator
        rows={25}
        rowsPerPageOptions={[25, 50, 100]}
        filters={search}
        loading={loading}
        onSelectionChange={(e) => setSelectedCountry(e.value)}
        selectionMode="single" // Optional: If you want to allow selecting only one row at a time
      >
        <Column field="flags.png" header="Flag" body={countryImage} />
        <Column field="name.official" header="Country" sortable />
        <Column field="cca2" header="Character Country Code 2" />
        <Column field="cca3" header="Character Country Code 3" />
        <Column
          field="name.nativeName"
          header="Native Name"
          body={(rowData) => findCommon(rowData.name.nativeName)}
        />
        <Column
          field="altSpellings"
          header="Alternative Country Name"
          body={AlternativeName}
        />
      </DataTable>
      <Dialog
        visible={selectedCountry !== null} // Show the dialog when a country is selected
        onHide={() => setSelectedCountry(null)} // Close dialog
        style={{ width: "25vw" }}
      >
        {/* Render additional details of the selected country */}
        {selectedCountry && (
          <div>
            <img
              alt={selectedCountry.name?.official}
              src={selectedCountry.flags?.png}
              style={{ minWidth: "100%", height: "100%", objectFit: "cover" }}
            />
            <p>
              Country Name :{" "}
              <span style={{ fontWeight: "bold" }}>
                {selectedCountry.name?.official}
              </span>
            </p>
            <p>
              Capital Name :{" "}
              <span style={{ font: "bold" }}>{selectedCountry.capital}</span>
            </p>
            <p>
              Currency Name :{" "}
              <span style={{ font: "bold" }}>
                {" "}
                {findCurrency(selectedCountry?.currencies)}
              </span>
            </p>
            <p>
              Currency Symbol :{" "}
              <span style={{ font: "bold" }}>
                {" "}
                {findSymbol(selectedCountry?.currencies)}
              </span>
            </p>
            <p>
              Regions :{" "}
              <span style={{ font: "bold" }}> {selectedCountry.region}</span>
            </p>
            <p>
              Subregion :{" "}
              <span style={{ font: "bold" }}> {selectedCountry.subregion}</span>
            </p>
            <p>
              Area :{" "}
              <span style={{ font: "bold" }}> {selectedCountry.area}</span>
            </p>
            <p>
              Population :{" "}
              <span style={{ font: "bold" }}>
                {" "}
                {selectedCountry.population}
              </span>
            </p>
            <p>
              Timezones :{" "}
              <span style={{ font: "bold" }}> {selectedCountry.timezones}</span>
            </p>
            <p>
              Borders :{" "}
              <span style={{ font: "bold" }}>
                {" "}
                {selectedCountry.borders.join(", ")}
              </span>
            </p>
            <p>Character Country Code 2: {selectedCountry.cca2}</p>
            <p>Character Country Code 3: {selectedCountry.cca3}</p>
            <p>Native Name: {findCommon(selectedCountry.name.nativeName)}</p>
            <p>Alternative Names: {selectedCountry.altSpellings.join(", ")}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Table;
