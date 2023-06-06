import * as React from "react";
import {useRef, useState} from "react";
import CopyButton from "./CopyButton";
import { Button } from "library-simplified-reusable-components";
import { LibraryData } from "../interfaces";
import { getPercentage } from "../utils/sharedFunctions";

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
  const dataRef = useRef<HTMLUListElement>();

  return (
    <div className="adobe-data">
      <div className="buttons">
        <Button
          key="format"
          callback={toggleStyled}
          content={`${isStyled ? "Remove" : "Restore"} Formatting`}
          className="inline squared inverted left-align"
        />
        <CopyButton element={dataRef.current} />
      </div>
      <p className={`${isStyled ? "adobe-total" : undefined}`}>Total Adobe IDs: {totalCount}</p>
      <ul
        ref={dataRef}
        contentEditable
        suppressContentEditableWarning
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
  );
};

const libraryKey = (library: LibraryData) => library.uuid;
const patronCount = (library: LibraryData) => parseInt(library.basic_info.number_of_patrons);
