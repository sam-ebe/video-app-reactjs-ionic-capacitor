import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import * as icons from "ionicons/icons";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Upcoming from "./pages/Upcoming";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Downloads from "./pages/Downloads";
import Favorites from "./pages/Favorites";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMediaQuery } from "usehooks-ts";

setupIonicReact();

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const isWideScreen = useMediaQuery("(min-width: 992px)");
  const tabs = [
    {
      name: "Home",
      url: "/home",
      activeIcon: icons.home,
      icon: icons.homeOutline,
      component: Home,
    },
    {
      name: "Search",
      url: "/search",
      activeIcon: icons.search,
      icon: icons.searchOutline,
      component: Search,
    },
    {
      name: "Upcoming",
      url: "/upcoming",
      activeIcon: icons.arrowForwardCircle,
      icon: icons.arrowForwardCircleOutline,
      component: Upcoming,
    },
    {
      name: "Downloads",
      url: "/downloads",
      activeIcon: icons.download,
      icon: icons.downloadOutline,
      component: Downloads,
    },
    {
      name: "Favorites",
      url: "/favorites",
      activeIcon: icons.heart,
      icon: icons.heartOutline,
      component: Favorites,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <IonReactRouter>
          {isWideScreen ? (
            // IonSplitPane for wide screens
            <IonSplitPane contentId="main">
              <IonMenu side="start" contentId="main">
                <IonHeader>
                  <IonToolbar color="tertiary">
                    <IonTitle>Menu</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonContent>
                  <IonList>
                    {tabs.map((tab, index) => (
                      <IonMenuToggle key={index} autoHide={false}>
                        <IonItem
                          button
                          routerLink={tab.url}
                          routerDirection="none"
                        >
                          <IonIcon slot="start" icon={tab.icon} />
                          <IonLabel>{tab.name}</IonLabel>
                        </IonItem>
                      </IonMenuToggle>
                    ))}
                  </IonList>
                </IonContent>
              </IonMenu>
              <IonRouterOutlet id="main">
                {tabs.map((tab, index) => (
                  <Route key={index} exact path={tab.url}>
                    <tab.component />
                  </Route>
                ))}
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          ) : (
            // IonTabs for small screens
            <IonTabs onIonTabsDidChange={(e) => setActiveTab(e.detail.tab)}>
              <IonRouterOutlet>
                {tabs.map((tab, index) => (
                  <Route key={index} exact path={tab.url}>
                    <tab.component />
                  </Route>
                ))}
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                {tabs.map((tab, index) => (
                  <IonTabButton key={index} tab={tab.name} href={tab.url}>
                    <IonIcon
                      aria-hidden="true"
                      icon={tab.name === activeTab ? tab.activeIcon : tab.icon}
                    />
                    <IonLabel>{tab.name}</IonLabel>
                  </IonTabButton>
                ))}
              </IonTabBar>
            </IonTabs>
          )}
        </IonReactRouter>
      </QueryClientProvider>
    </IonApp>
  );
};

export default App;
