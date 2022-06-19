import './ProductComp.scss'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ButtonComp } from '../index-comp/IndexComp';

function ProductComp({ item, onDeleteItem, onSelectItem }) {
    const [ quantity, setQuantity ] = useState(1);
    const price = item.price;
    const totalPrice = price*quantity;
    let formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    });
    
    const plus = () => {
        setQuantity(quantity + 1);;
    }
    const minus = () => {
        setQuantity(quantity - 1);
        
    }


    return (
        <div className="product-container">
            <input id='itemCheckbox' type="checkbox" ></input>
            <img src={item.image} alt="product-pic"></img>
            <div className='product-text'>
                <h4 className='product-title'>주문상품 {item.id} </h4>
                <p>
                    재질: {item.material} <br/>
                    용량: {item.size} <br/> 
                    빨대: {item.strow} </p>

                <div className="product-quantity">
                        <ButtonComp icon>
                            <FontAwesomeIcon icon={solid("minus")} onClick={minus}/>
                        </ButtonComp>
                        <input id="qtyForm" type="number" required value={quantity} onChange={ ()=> setQuantity(quantity)} min="1" />
                        <ButtonComp  icon>
                            <FontAwesomeIcon icon={solid("plus")} onClick={plus}/>
                        </ButtonComp>
                    
                </div>
            </div>
            <div className='mdButtons'>
                    <ButtonComp icon>
                        <FontAwesomeIcon icon={solid("pen-to-square")} />
                    </ButtonComp>
                    <ButtonComp icon onClick={()=> onDeleteItem(item.id)}>
                        <FontAwesomeIcon icon={solid("trash-can")} />
                    </ButtonComp>
            </div>
            <p className='product-price'>{ formatter.format(totalPrice) }</p>
        </div>
    );
}

export default ProductComp;