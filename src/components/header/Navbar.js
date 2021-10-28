import * as React from "react";
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ToysIcon from "@mui/icons-material/Toys";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FlightIcon from "@mui/icons-material/Flight";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { itemsBasedCategory } from "../../state/action-creators/index";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    position: "fixed",
    top: "64px",
    left: "0",
    right: "0",
    background: "#fff",
    zIndex: "100",
    "& .MuiTabs-scroller .MuiTabs-flexContainer > *": { flexGrow: 1 }
  }
}));

export default function Navbar() {
  const classes = useStyles();

  const itemsListData = useSelector((state) => state.item);
  let { filtersApplied } = itemsListData;
  const [selectedTab, setSelectedTab] = useState(filtersApplied.category);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    console.log(newValue);
    dispatch(itemsBasedCategory(newValue));
  };

  useEffect(() => {
    setSelectedTab(filtersApplied.category);
  }, [filtersApplied.category]);

  return (
    <Tabs
      value={selectedTab}
      onChange={handleChange}
      aria-label="icon label tabs example"
      className={classes.fullWidth}
    >
      <Tab icon={<SportsHandballIcon />} label="SPORTS" value="SPORTS" />
      <Tab icon={<LocalGroceryStoreIcon />} label="GROCERY" value="GROCERY" />
      <Tab
        icon={<ElectricalServicesIcon />}
        label="ELECTRONICS"
        value="ELECTRONICS"
      />
      <Tab icon={<PhoneAndroidIcon />} label="MOBILE" value="MOBILE" />
    </Tabs>
  );
}
