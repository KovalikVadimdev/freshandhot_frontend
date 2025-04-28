import React from "react";
import CountrySliderView from "./CountrySliderView";
import { cities } from "./CountrySliderModel";

const CountrySliderController = () => {
  return <CountrySliderView cities={cities} />;
};

export default CountrySliderController;
