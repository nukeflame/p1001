import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardFooter } from "reactstrap";
import classNames from "classnames";
import { mapToCssModules } from "reactstrap/lib/utils";
import { Link } from "react-router-dom";

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  footer: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  header: "",
  mainText: "",
  icon: "",
  color: "",
  variant: "0",
  link: "#"
};

class Widget02 extends Component {
  render() {
    const {
      className,
      cssModule,
      header,
      mainText,
      icon,
      color,
      footer,
      link,
      children,
      variant,
      ...attributes
    } = this.props;

    // demo purposes only
    const padding =
      variant === "0"
        ? { card: "p-3", icon: "p-3", lead: "mt-2" }
        : variant === "1"
        ? {
            card: "p-0",
            icon: "p-1",
            lead: "p-t-10"
          }
        : { card: "p-0", icon: "p-4 px-5", lead: "pt-3" };

    const card = { style: "clearfix", color: color, icon: icon, classes: "" };
    card.classes = mapToCssModules(
      classNames(className, card.style, padding.card),
      cssModule
    );

    const lead = { style: "h5 mb-0", color: color, classes: "" };
    lead.classes = classNames(lead.style, "text-" + card.color, padding.lead);

    const blockIcon = function(icon) {
      const classes = classNames(
        icon,
        "bg-" + card.color,
        padding.icon,
        "font-2xl mr-1 float-left"
      );
      return (
        <i
          className={classes}
          style={{
            width: "38px",
            textAlign: "center",
            height: "38px",
            lineHeight: "30px"
          }}
        ></i>
      );
    };

    const cardFooter = function() {
      if (footer) {
        return (
          <CardFooter className="px-3 py-2">
            <a
              className="font-weight-bold font-xs btn-block text-muted"
              href={link}
            >
              View More
              <i className="fa fa-angle-right float-right font-lg"></i>
            </a>
          </CardFooter>
        );
      }
    };

    const cardStyle = {
      minHeight: "30px",
      border: "solid 1px #c5d6de",
      borderRadius: "4px"
    };

    return (
      <Card style={cardStyle}>
        <Link to={link} className="info-link">
          <CardBody className={card.classes} {...attributes}>
            {blockIcon(card.icon)}
            <div className={lead.classes}>{header}</div>
            <div className="text-muted text-uppercase font-weight-bold font-xs">
              {mainText}
            </div>
          </CardBody>
        </Link>
      </Card>
    );
  }
}

Widget02.propTypes = propTypes;
Widget02.defaultProps = defaultProps;

export default Widget02;
