import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import { Badge } from "@material-ui/core";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import EventIcon from "@material-ui/icons/Event";
import AndroidIcon from "@material-ui/icons/Android";




import { i18n } from "../translate/i18n";
import { WhatsAppsContext } from "../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../context/Auth/AuthContext";
import { Can } from "../components/Can";

function ListItemLink(props) {
  const { icon, primary, to, className } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} className={className}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const MainListItems = (props) => {
  const { drawerClose } = props;
  const { whatsApps } = useContext(WhatsAppsContext);
  const { user } = useContext(AuthContext);
  const [connectionWarning, setConnectionWarning] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (whatsApps.length > 0) {
        const offlineWhats = whatsApps.filter((whats) => {
          return (
            whats.status === "qrcode" ||
            whats.status === "PAIRING" ||
            whats.status === "DISCONNECTED" ||
            whats.status === "TIMEOUT" ||
            whats.status === "OPENING"
          );
        });
        if (offlineWhats.length > 0) {
          setConnectionWarning(true);
        } else {
          setConnectionWarning(false);
        }
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [whatsApps]);

  return (
    <div onClick={drawerClose}>
      <ListItemLink
        to="/"
        primary="Dashboard"
        icon={<DashboardOutlinedIcon />}
      />
      <ListItemLink
        to="/tickets"
        primary={i18n.t("mainDrawer.listItems.tickets")}
        icon={<WhatsAppIcon />}
      />

      <ListItemLink
        to="/contacts"
        primary={i18n.t("mainDrawer.listItems.contacts")}
        icon={<ContactPhoneOutlinedIcon />}
      />
      <ListItemLink
        to="/quickAnswers"
        primary={i18n.t("mainDrawer.listItems.quickAnswers")}
        icon={<QuestionAnswerOutlinedIcon />}
      />
      <a href="https://phpdemonstracao.pyperbot.com.br/relatorios" style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem>
          <ListItemIcon>
            <DescriptionOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Relatórios"} />
        </ListItem>
      </a>
      <a href="https://phpdemonstracao.pyperbot.com.br" style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem>
          <ListItemIcon>
            <LocalOfferOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Campanhas"} />
        </ListItem>
      </a>
      <a href={`https://phpdemonstracao.pyperbot.com.br/chatinterno/index.php?codfun=${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem>
          <ListItemIcon>
            <ChatBubbleOutlineIcon /> {/* Mantenha o ícone original */}
          </ListItemIcon>
          <ListItemText primary={"ChatInterno"} />
        </ListItem>
      </a>
      <Can
        role={user.profile}
        perform="drawer-superadmin-items:view"
        yes={() => (
          <>
            <Divider />
            <ListSubheader inset>
              {"SuperAdm"}
            </ListSubheader>
            <a href={`https://phpdemonstracao.pyperbot.com.br/datas/`} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem>
                <ListItemIcon>
                  <EventIcon/> {/* Mantenha o ícone original */}
                </ListItemIcon>
                <ListItemText primary={"Feriados/Eventos"} />
              </ListItem>
            </a>
            <a href={`https://phpdemonstracao.pyperbot.com.br/fluxo/`} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem>
                <ListItemIcon>
                  <AndroidIcon/> {/* Mantenha o ícone original */}
                </ListItemIcon>
                <ListItemText primary={"ChatBots"} />
              </ListItem>
            </a>
            <ListItemLink
              to="/users"
              primary={i18n.t("mainDrawer.listItems.users")}
              icon={<PeopleAltOutlinedIcon />}
            />
            <ListItemLink
              to="/connections"
              primary={i18n.t("mainDrawer.listItems.connections")}
              icon={
                <Badge badgeContent={connectionWarning ? "!" : 0} color="error">
                  <SyncAltIcon />
                </Badge>
              }
            />
            <ListItemLink
              to="/queues"
              primary={i18n.t("mainDrawer.listItems.queues")}
              icon={<AccountTreeOutlinedIcon />}
            />
            <a href={`https://phpdemonstracao.pyperbot.com.br/config/index.php?codfun=${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem>
                <ListItemIcon>
                  <SettingsOutlinedIcon /> {/* Mantenha o ícone original */}
                </ListItemIcon>
                <ListItemText primary={i18n.t("mainDrawer.listItems.settings")} />
              </ListItem>
            </a>
          </>
        )}
      />
    </div>
  );
};

export default MainListItems;
