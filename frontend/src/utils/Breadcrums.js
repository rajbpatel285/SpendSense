import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export const CustomBreadcrumbs = (props) => {
  const navigate = useNavigate();
  const pages = props.pages;

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" style={{ color: "#227dd4" }}>
        {pages.map((item, index) => (
          <Button
            variant="Link"
            onClick={() => {
              navigate(item.link);
            }}
            key={index}
          >
            {item.text}
          </Button>
        ))}
      </Breadcrumbs>
    </div>
  );
};
