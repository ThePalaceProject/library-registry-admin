import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import { testLibrary1, testLibrary2, modifyLibrary } from "./TestUtils";
import AggregateList from "../AggregateList";
import DropdownButton from "../DropdownButton";
import CopyButton from "../CopyButton";
import StatsInnerList from "../StatsInnerList";

describe("AggregateList", () => {
  const productionLibrary1 = modifyLibrary(testLibrary1, { "name": "Production Library 1", "registry_stage": "production" });
  const productionLibrary2 = modifyLibrary(productionLibrary1, { "uuid": "UUID2", "name": "Production Library 2" });
  const data = {
    "production": [productionLibrary1, productionLibrary2],
    "testing": [testLibrary1],
    "cancelled": [testLibrary2]
  };

  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<AggregateList data={data} />);
  });

  it("displays the StatsInnerList", () => {
    let list = wrapper.find(StatsInnerList);
    expect(list.length).to.equal(1);
    expect(list.prop("data")).to.equal(wrapper.prop("data"));
    expect(list.prop("styled")).to.be.true;
    expect(list.prop("stagesToShow")).to.eql({ production: false, testing: false, cancelled: false });
    expect(list.prop("showGeographicInfo")).to.be.false;
  });
  it("has a button to toggle the list of library names", () => {
    const hideStage = ({stageName, menuOptions, optionNumber, listCountAfterHide}) => {
      const allOption = menuOptions.at(0);
      const currentOption = menuOptions.at(optionNumber);
      expect(currentOption.text()).to.equal(`Hide ${stageName}`);
      currentOption.find("button").simulate("click");
      const list = wrapper.find(StatsInnerList);
      const statsCategoryList = list.find(".stats-category-list");
      expect(statsCategoryList.length).to.equal(listCountAfterHide);
      expect(list.prop("stagesToShow")[stageName.toLowerCase()]).to.be.false;
      expect(currentOption.text()).to.equal(`Show ${stageName}`);
      expect(allOption.text()).to.equal("Show All");
    };

    const stages = ["Production", "Testing", "Cancelled"];

    let list = wrapper.find(StatsInnerList);
    const stagSections = list.find(".stats-category");
    let stageLists = wrapper.find(".stats-category-list");
    expect(list.length).to.equal(1);
    expect(stagSections.length).to.equal(stages.length);
    expect(stageLists.length).to.equal(0);
    stages.forEach((x) => expect(list.prop("stagesToShow")[x.toLowerCase()]).to.be.false);

    // Initially, all library categories are hidden,
    // so all buttons are to `Show`.
    let dropdown = wrapper.find(DropdownButton);
    let mainButton = dropdown.find("button").at(0);
    expect(mainButton.text()).to.contain("Library Name Display");
    let menuOptions = dropdown.find(".dropdown-button-menu").find("li");
    expect(menuOptions.length).to.equal(4);
    menuOptions.forEach((x, idx) => expect(x.text()).to.equal(`Show ${["All"].concat(stages)[idx]}`));

    // After show all, all library categories are visible,
    // so all buttons are to `Hide`.
    menuOptions.at(0).find("button").simulate("click");
    list = wrapper.find(StatsInnerList);
    stageLists = list.find(".stats-category-list");
    expect(stageLists.length).to.equal(3);
    stages.forEach((x) => expect(list.prop("stagesToShow")[x.toLowerCase()]).to.be.true);
    menuOptions.forEach((x, idx) => expect(x.text()).to.equal(`Hide ${["All"].concat(stages)[idx]}`));

    hideStage({
      stageName: "Production",
      menuOptions,
      optionNumber: 1,
      listCountAfterHide: 2,
    });
    hideStage({
      stageName: "Testing",
      menuOptions,
      optionNumber: 2,
      listCountAfterHide: 1,
    });
    hideStage({
      stageName: "Cancelled",
      menuOptions,
      optionNumber: 3,
      listCountAfterHide: 0,
    });
  });
  it("has a button to toggle the formatting", () => {
    let list = wrapper.find(StatsInnerList);
    expect(list.prop("styled")).to.be.true;
    let button = wrapper.find(".list-view").find("button").at(0);
    expect(button.text()).to.equal("Remove Formatting");

    button.simulate("click");

    list = wrapper.find(StatsInnerList);
    expect(list.prop("styled")).to.be.false;
    button = wrapper.find(".list-view").find("button").at(0);
    expect(button.text()).to.equal("Restore Formatting");
  });
  it("has a button to copy the data", () => {
    let copyButton = wrapper.find(CopyButton);
    expect(copyButton.length).to.equal(1);
  });
  it("has a button for toggling the display of geographic information", () => {
    // If all the library names are hidden, the button is not rendered.
    let buttons = wrapper.find("button");
    expect(buttons.length).to.equal(7);
    buttons.forEach(b => expect(b.text()).not.to.contain("Geographic Info"));
    let list = wrapper.find(StatsInnerList);
    expect(list.prop("showGeographicInfo")).to.be.false;

    // Showing any of the library names makes the button appear.
    const prodLibrariesButton = buttons.at(3);
    expect(prodLibrariesButton.text()).to.equal("Show Production");
    prodLibrariesButton.simulate("click");
    buttons = wrapper.find("button");
    expect(buttons.length).to.equal(8);
    const geographicInfoButton = wrapper.find("button").at(6);
    expect(geographicInfoButton.text()).to.equal("Show Geographic Info");
    geographicInfoButton.simulate("click");
    list = wrapper.find(StatsInnerList);
    expect(list.prop("showGeographicInfo")).to.be.true;
    expect(geographicInfoButton.text()).to.equal("Hide Geographic Info");
    // Re-hiding the visible libraries will hide the button again.
    expect(prodLibrariesButton.text()).to.equal("Hide Production");
    prodLibrariesButton.simulate("click");
    buttons = wrapper.find("button");
    expect(buttons.length).to.equal(7);
    buttons.forEach(b => expect(b.text()).not.to.contain("Geographic Info"));
  });
});
