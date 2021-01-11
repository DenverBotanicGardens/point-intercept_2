import React from "react";
import HitList from "./HitList"
//import json object that is list of species

export function HitInputSelect2(props) {


  return (
    <div className="form-group">
      <input onChange={props.onChange} value={props.value} name={props.name} type="text" list="exampleList" className="form-control"/>
        <datalist id="exampleList">
          {HitList.map(opt => 
            <option key={opt.id} value={opt.value}>{opt.value}</option>
            )}
        </datalist>
    </div>
  );
}