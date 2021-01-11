import React, { useState } from "react";
import HitList from "./HitList"


const useInputValue = initialValue => {
    const [value, setValue] = useState(initialValue);
    
    return {
        value,
        onChange: e => setValue(e.target.value),
        resetValue: () => setValue("")
    };
};

export default ({onSubmit}) => {
    const {resetValue, ...text} = useInputValue("");

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                onSubmit(text.value);
                resetValue();
        }}
        >
            <input className="form-control" {...text}
            //onChange={props.onChange} value={props.value} name={props.name} type="text" list="exampleList"
            />
            <datalist id="exampleList">
                {HitList.map(opt => 
                    <option key={opt.id} value={opt.value}>{opt.value}</option>
                    )}
              </datalist>
            </form>
    );
};
