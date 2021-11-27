import React, { Component } from 'react';

class Newsitem extends Component {
    // updateTime = (date)=>{
    //     let updated = new Date(date);
    //     return updated;
    // }
    render() {
        let {title,description,imageUrl,articleUrl,author,date,source} = this.props;
        let updatedTime =()=>{
            let newTime = new Date(date);
            let updated = `${newTime.getHours()}:${newTime.getMinutes()}, ${newTime.getDate()}-${newTime.getMonth()}-${newTime.getFullYear()}`;
            return updated
        } 
        return (
            <div>
                <div className="card" style={{width: '18rem'}}>
                    <img src={imageUrl} className="card-img-top" alt="..." style={{height:"170px"}}/>
                    <div className="card-body">
                        <span className="position-absolute top-0 badge  bg-danger" style={{zIndex:"1",left:"0%",borderRadius: '3px',transform: 'inherit'}}>{source}</span>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text text-danger" ><small>{`Updated by ${author?author:"Unknown"} at ${updatedTime()}`}</small></p>
                        <a href={articleUrl} target="_blank" rel="noreferrer" className="btn btn-dark">View Details</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Newsitem;
