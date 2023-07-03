import * as React from "react";
import {useState} from "react";
import { Button } from "library-simplified-reusable-components";
import { LibraryData } from "../interfaces";
import DropdownButton from "./DropdownButton";
import CopyButton from "./CopyButton";
import { useElementWithRef } from "../utils/sharedFunctions";
import StatsInnerList from "./StatsInnerList";

export interface AggregateListProps {
  data: {[key: string]: LibraryData[]};
}

const STAGES = ["Production", "Testing", "Cancelled"];
const BUTTON_CLASSES = "inline squared inverted left-align";

export default ({ data: libraries }: AggregateListProps) => {
  const [activeStages, setActiveStages] = useState(
    () => STAGES.reduce((states, s) => ({...states, [s.toLowerCase()]: false}), {}),
  );

  const [isStyled, setIsStyled] = useState(() => true);
  const toggleStyled = () => setIsStyled(prev => !prev);

  const [showGeoInfo, setShowGeoInfo] = useState(() => false);
  const toggleGeographicInfo = () => setShowGeoInfo(prev => !prev);

    /** Determining whether the elements in the Library Name Display dropdown should say "Show" or "Hide" */
  const toggleExpanded = e => {
    let [verb, category] = e.target.textContent.toLowerCase().split(" ");
    let newState = {};
    let newValue = verb === "show";
    if (category === "all") {
      STAGES.map(x => newState[x.toLowerCase()] = newValue);
    } else {
      newState[category] = newValue;
    }
    setActiveStages(prevStagesActive => ({...prevStagesActive, ...newState}));
  };

  const { elementRef: copyElementRef, element: copyElement } = useElementWithRef();

  const showOrHideAll: string = `${STAGES.every(x => activeStages[x.toLowerCase()]) ? "Hide" : "Show"} All`;
  const showOrHideStage = (stage) => `${activeStages[stage.toLowerCase()] ? "Hide" : "Show"} ${stage}`;
  let buttons = [
    <Button
      key="format"
      callback={toggleStyled}
      content={`${isStyled ? "Remove" : "Restore"} Formatting`}
      className={BUTTON_CLASSES}
    />,
    <DropdownButton
      mainContent="Library Name Display"
      callback={(e) => { toggleExpanded(e); }}
      menuContent={
        [showOrHideAll].concat(STAGES.map(x => showOrHideStage(x)))
      }
      className={BUTTON_CLASSES}
      key="dropdown"
    />,
    <CopyButton key="copy-button" element={copyElement} />
  ];
  let geographicButton = (
    <Button
      key="geographicInfo"
      callback={toggleGeographicInfo}
      content={`${showGeoInfo ? "Hide" : "Show"} Geographic Info`}
      className={BUTTON_CLASSES}
    />
  );
  // If any of the "Library Name Display" options have been selected, render the "Show Geographic Info" button.
  if (["production", "testing", "cancelled"].some(x => activeStages[x])) {
    buttons.splice(2, 0, geographicButton);
  }
  return (
    <div className="list-view">
      <div className="buttons">
        { buttons }
      </div>
      <section
        className="stats-list"
        ref={copyElementRef}
        contentEditable
        suppressContentEditableWarning
      >
        <StatsInnerList
          data={libraries}
          styled={isStyled}
          stagesToShow={{
            production: activeStages["production"],
            testing: activeStages["testing"],
            cancelled: activeStages["cancelled"],
          }}
          showGeographicInfo={showGeoInfo}
        />
      </section>
    </div>
  );
};
