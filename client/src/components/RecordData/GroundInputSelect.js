import React from "react";

export function GroundInputSelect(props) {
  return (
    <div className="form-group">
      <select className="form-control" {...props} >
        <option value=""></option>
        <option value="rock">rock</option>
        <option value="bare soil">bare soil</option>
        <option value="litter">litter</option>
        <option value="biological soil crust">biological soil crust</option>
        <option value="water">water</option>
        <option value="downed woody debris">downed woody debris</option>
        <option value="road/trail">road/trail</option>
      </select>
    </div>
  );
}