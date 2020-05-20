import React from 'react'

const List=(props)=>{
    const Items=props.props
    const listOfItems=Items.map((item,i) =>{
            return <div key={i} className="list">
                <p>{item}</p>
                <span onClick={()=>props.delete({item})}>&times;</span>
            </div>
        }) 
    
    return (
        <div className="list-bg">
            {listOfItems}
        </div>
    )
}

export default List
