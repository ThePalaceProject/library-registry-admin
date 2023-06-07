import * as React from "react";
import {useEffect, useRef, useState} from "react";
import CopyButton from "./CopyButton";
import { Button } from "library-simplified-reusable-components";
import { LibraryData } from "../interfaces";
import {getPercentage, useElementWithRef} from "../utils/sharedFunctions";

export interface AdobeTabProps {
  data: LibraryData[];
}

/** The AdobeTab lives in the Aggregate Data panel.
 * It shows how many Adobe IDs--an approximation of how many patrons--each library has.
 * */
export default ({ data: libraries }) => {
  const [isStyled, setIsStyled] = useState(() => true);
  const totalCount = libraries.reduce((acc, l) => acc + patronCount(l), 0);

  const toggleStyled = () => setIsStyled(styled => !styled);
  const { elementRef: copyElementRef, element: copyElement } = useElementWithRef();

  return (
    <div className="adobe-data">
      <div className="buttons">
        <Button
          key="format"
          callback={toggleStyled}
          content={`${isStyled ? "Remove" : "Restore"} Formatting`}
          className="inline squared inverted left-align"
        />
        <CopyButton element={copyElement} />
      </div>
      <div
        ref={copyElementRef}
        contentEditable
        suppressContentEditableWarning
      >
        <p className={`${isStyled ? "adobe-total" : undefined}`}>Total Adobe IDs: {totalCount}</p>
        <ul
        >
          { libraries && libraries.map(library => {
            let name = library.basic_info.name;
            let numberOfPatrons = parseInt(library.basic_info.number_of_patrons);
            return (
              <li key={libraryKey(library)} className={`${isStyled ? "adobe-li" : undefined}`}>
                <section className={`${isStyled ? "header-bar" : undefined}`}>
                  <span>{name}: {numberOfPatrons} patron{numberOfPatrons !== 1 && "s"}</span>
                  <span> ({getPercentage(numberOfPatrons, totalCount, true)})</span>
                </section>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const libraryKey = (library: LibraryData) => library.uuid;
const patronCount = (library: LibraryData) => parseInt(library.basic_info.number_of_patrons);
