import React from 'react';

const CardComponent = (props)=> {
  return(
    <div className="card-component">
      <ul>
        <h4><span className="title-condtions">Conditions for </span><span style={{fontWeight: 'bold'}}>{props.weather.name}</span></h4>
        <li>
          {props.weather.weather[0].id}
        </li>
        <li>
          {props.weather.weather[0].main}
        </li>
        <li>
          <img src={'http://openweathermap.org/img/w/' + props.weather.weather[0].icon + '.png'} alt=""/>
        </li>
        <li>
          {props.weather.weather[0].description}
        </li>
        <li>
          <button className="btn btn-default" onClick={()=>{ return props.saveCity(props.weather)} }>Save</button>
        </li>
      </ul>
    </div>
  );
};

export default CardComponent;