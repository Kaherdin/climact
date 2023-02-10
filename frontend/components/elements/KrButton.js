import React from "react";
import { Button } from "react-bootstrap";
import classNames from "classnames";

const KrButton = ({
  children: text,
  icon, //format fontawesome fa fa-facebook
  size, //xs, sm, md, lg
  rounded, //circle / default
  className,
  outline, //bool
  ...rest
}) => {
  // const logicalClasses = [icon && "btn-icon"];
  const logicalClasses = [
    icon && "btn-icon",
    !text && "btn-icon-only",
    rounded && (rounded == "circle" ? "rounded-circle" : "btn-round"),
  ];

  return (
    <Button
      className={classNames(className, ...logicalClasses)}
      size={size}
      outline={outline}
      {...rest}
    >
      {icon ? (
        <>
          <span className="btn-inner--icon">
            <i className={`${icon}`}></i>
          </span>
          {text && <span className="btn-inner--text">{text}</span>}
        </>
      ) : (
        <span>{text}</span>
      )}
    </Button>
  );
};

export default KrButton;
