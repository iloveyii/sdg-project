import React from "react";
import { Button } from "@material-ui/core";
import {
  NotificationsNone as NotificationsIcon,
  ThumbUp as ThumbUpIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as TicketIcon,
  
  SmsFailed as FeedbackIcon,
  DiscFull as DiscIcon,
  Email as MessageIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
  AccountBox as CustomerIcon,
  Done as ShippedIcon,
  Publish as UploadIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classnames from "classnames";
import tinycolor from "tinycolor2";



// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

const typesIcons = {
  "e-commerce": <ShoppingCartIcon />,
  notification: <NotificationsIcon />,
  offer: <TicketIcon />,
  info: <ThumbUpIcon />,
  message: <MessageIcon />,
  feedback: <FeedbackIcon />,
  customer: <CustomerIcon />,
  shipped: <ShippedIcon />,
  goodinfo: <SentimentVerySatisfiedIcon />,
  badinfo: <SentimentVeryDissatisfiedIcon />,
  averinfo: <SentimentSatisfiedIcon />,
  upload: <UploadIcon />,
  disc: <DiscIcon />,
};

export default function Notification({ variant, ...props }) {
  var classes = useStyles();
  var theme = useTheme();

  var colour = "success";
  switch (props.type){
    case 'goodinfo':
      colour = "success";
      break;
    case 'badinfo':
      colour = "error";
      break;
    default:
      break;
  }



  const icon = getIconByType(props.type);
  const iconWithStyles = React.cloneElement(icon, {
    classes: {
      root: classes.notificationIcon,
    },
    style: {
      color:
        variant !== "contained" &&
        theme.palette[colour] &&
        theme.palette[colour].main,
    },
  });

  return (
    <div
      className={classnames(classes.notificationContainer, props.className, {
        [classes.notificationContained]: variant === "contained",
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor:
          variant === "contained" &&
          theme.palette[colour] &&
          theme.palette[colour].main,
      }}
    >
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === "contained",
          [classes.notificationIconContainerRounded]: variant === "rounded",
        })}
        style={{
          backgroundColor:
            variant === "rounded" &&
            theme.palette[colour] &&
            tinycolor(theme.palette[colour].main)
              .setAlpha(0.15)
              .toRgbString(),
        }}
      >
        {iconWithStyles}
      </div>
      <div className={classes.messageContainer}>
        <Typography
          className={classnames({
            [classes.containedTypography]: variant === "contained",
          })}
          variant={props.typographyVariant}
          size={variant !== "contained" && !props.typographyVariant && "md"}
        >
          {/* {props.message} */}
          {props.notificationmessage}
        </Typography>
        {props.extraButton && props.extraButtonClick && (
          <Button
            onClick={props.extraButtonClick}
            disableRipple
            className={classes.extraButton}
            
          >
            {props.extraButton}
          </Button>
        )}
      </div>
    </div>
  );
}

// ####################################################################
function getIconByType(type = "offer") {
  return typesIcons[type];
}
