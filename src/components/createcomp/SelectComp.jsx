import { useEffect, useState } from "react";
import React from "react";

const SelectComp = ({material, getTypeData}) => {

    const [metSelect,setMetSelect] = useState(0);
    const [tumMetType,setTumMetType] = useState("");

    const changeMet = (e)=>{
        setMetSelect(e.target.value);
        const metWord = e.target.value.split("_");
        setTumMetType(metWord[1]);
    }

    const [sizeSelect,setSizeSelect] = useState(0);
    const [tumSizeType,setTumSizeType] = useState("");

    const changeSize = (e)=>{
        setSizeSelect(e.target.value);
        const sizeWord = e.target.value.split("_");
        setTumSizeType(sizeWord[1]);
    }
    
    const [strawSelect,setStrawSelect] = useState(0);
    const [tumStrawType,setTumStrawType] = useState("");

    const changeStraw = (e)=>{
        setStrawSelect(e.target.value);
        const strawWord = e.target.value.split("_");
        setTumStrawType(strawWord[1]);
    }

    const summa =  parseInt(metSelect)+parseInt(sizeSelect)+parseInt(strawSelect)

    useEffect(()=>{
        material=tumMetType;
        getTypeData(material);
    });
    
    return (
        <div>
            <select defaultValue="0_none" className="cre_selectbox" onChange={changeMet}>
                <option value="0_none">재질을 선택하세요</option>
                <option value="10000_stain">스테인리스</option>
                <option value="5000_pla">플라스틱</option>
            </select>

            <select defaultValue="0_none" className="cre_selectbox" onChange={changeSize}>
                <option value="0_none">용량</option>
                <option value="5000_big">대</option>
                <option value="3000_mid">중</option>
                <option value="2000_small">소</option>
            </select>

            <select defaultValue="0_none" className="cre_selectbox" onChange={changeStraw}>
                <option value="0_none">빨대</option>
                <option value="2000_use">사용</option>
                <option value="0_unuse">미사용</option>
            </select>

            <div className="cre_calc">
                <p>총 가격</p>
                <h3>{summa.toLocaleString()}원</h3>
            </div>
        </div>
    )

}

export default SelectComp;