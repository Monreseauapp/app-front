import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TabBar from "@/components/TabBar";
import { AppContext } from "@/context/context";
import { NavigationContainer } from "@react-navigation/native";

const mockSetIsMenuOpen = jest.fn();
const mockEmit = jest.fn(() => ({ defaultPrevented: false }));
const mockNavigate = jest.fn();

const baseState = {
  index: 0,
  routes: [
    { key: "home", name: "home" },
    { key: "profil", name: "profil" },
    { key: "recommendation", name: "recommendation" },
  ],
};

const baseDescriptors = {
  home: {
    options: {
      tabBarLabel: "Accueil",
      tabBarButtonTestID: "tab-home",
    },
  },
  profil: {
    options: {
      tabBarLabel: "Profil",
      tabBarButtonTestID: "tab-profil",
    },
  },
  recommendation: {
    options: {
      tabBarLabel: "Reco",
      tabBarButtonTestID: "tab-reco",
    },
  },
};

const baseNavigation = {
  emit: mockEmit,
  navigate: mockNavigate,
};

describe("TabBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders visible tabs and handles press", () => {
    const contextValue = {
      setIsMenuOpen: mockSetIsMenuOpen,
      companyId: "comp1",
    };
    const { getByTestId } = render(
      <NavigationContainer>
        <AppContext.Provider value={contextValue}>
          <TabBar
            state={baseState}
            descriptors={{
              home: baseDescriptors.home,
              profil: baseDescriptors.profil,
              recommendation: baseDescriptors.recommendation,
            }}
            navigation={baseNavigation}
          />
        </AppContext.Provider>
      </NavigationContainer>
    );

    expect(getByTestId("tab-home")).toBeTruthy();
    expect(getByTestId("tab-profil")).toBeTruthy();
    expect(getByTestId("tab-reco")).toBeTruthy();

    fireEvent.press(getByTestId("tab-profil"));
    expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false);
    expect(mockEmit).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "tabPress",
        target: "profil",
        canPreventDefault: true,
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith("profil", undefined);
    fireEvent.press(getByTestId("tab-home"));
    expect(mockNavigate).not.toHaveBeenCalledWith("home", undefined);
  });

  it("hides invisible routes for company", () => {
    const contextValue = {
      setIsMenuOpen: mockSetIsMenuOpen,
      companyId: "comp1",
    };
    const state = {
      ...baseState,
      routes: [
        ...baseState.routes,
        { key: "recommendationForm", name: "recommendation/form" },
      ],
    };
    const descriptors = {
      ...baseDescriptors,
      recommendationForm: {
        options: {
          tabBarLabel: "RecoForm",
          tabBarButtonTestID: "tab-recoform",
        },
      },
    };
    const { queryByTestId } = render(
      <NavigationContainer>
        <AppContext.Provider value={contextValue}>
          <TabBar
            state={state}
            descriptors={descriptors}
            navigation={baseNavigation}
          />
        </AppContext.Provider>
      </NavigationContainer>
    );
    expect(queryByTestId("tab-recoform")).toBeNull();
  });

  it("hides guest routes when no companyId", () => {
    const contextValue = {
      setIsMenuOpen: mockSetIsMenuOpen,
      companyId: undefined,
    };
    const { queryByTestId } = render(
      <NavigationContainer>
        <AppContext.Provider value={contextValue}>
          <TabBar
            state={baseState}
            descriptors={baseDescriptors}
            navigation={baseNavigation}
          />
        </AppContext.Provider>
      </NavigationContainer>
    );
    expect(queryByTestId("tab-profil")).toBeNull();
    expect(queryByTestId("tab-home")).toBeTruthy();
    expect(queryByTestId("tab-reco")).toBeTruthy();
  });
});
