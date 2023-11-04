import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import openSocket from "../../services/socket-io";
import useSound from "use-sound";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ForumIcon from "@material-ui/icons/Forum";
import alertSound from "../../assets/sound.mp3";
import { AuthContext } from "../../context/Auth/AuthContext";
import useContacts from "../../hooks/useContacts";

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    overflowY: "auto",
    maxHeight: 350,
    ...theme.scrollbarStyles,
  },
  popoverPaper: {
    width: "100%",
    maxWidth: 350,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 270,
    },
  },
  noShadow: {
    boxShadow: "none !important",
  },
}));

const ChatNotificationsPopOver = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const ticketIdUrl = +history.location.pathname.split("/")[2];
  const ticketIdRef = useRef(ticketIdUrl);
  const anchorEl = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [, setDesktopNotifications] = useState([]);
  const { users } = useContacts(); // Usando o hook de usuários (contacts)
  const [play] = useSound(alertSound);
  const soundAlertRef = useRef();

  useEffect(() => {
    soundAlertRef.current = play;

    if (!("Notification" in window)) {
      console.log("This browser doesn't support notifications");
    } else {
      Notification.requestPermission();
    }
  }, [play]);

  useEffect(() => {
    // Verifique se users não é undefined
    if (users && users.length > 0) {
      setContacts(users);
    } else {
      setContacts([]); // Defina os contatos como um array vazio
    }
  }, [users]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  const NotificationTicket = ({ children }) => {
    return <div onClick={handleClickAway}>{children}</div>;
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        ref={anchorEl}
        aria-label="Open Notifications"
        color="inherit"
      >
        <Badge badgeContent={contacts.length} color="secondary">
          <ForumIcon />
        </Badge>
      </IconButton>
      <Popover
        disableScrollLock
        open={isOpen}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{ paper: classes.popoverPaper }}
        onClose={handleClickAway}
      >
        <List dense className={classes.tabContainer}>
          {contacts.length === 0 ? (
            <ListItem>
              <ListItemText>No users found</ListItemText>
            </ListItem>
          ) : (
            contacts.map((contact) => (
              <NotificationTicket key={contact.id}>
                <ListItemText primary={contact.name} secondary={contact.email} />
              </NotificationTicket>
            ))
          )}
        </List>
      </Popover>
    </>
  );
};

// Atualize o export default para corresponder ao nome da importação
export default ChatNotificationsPopOver;
