import React from "react";
import SearchDoctor from "./SearchDoctor";
import "./SearchDoctors.css";
import image1 from "../../assests/image1.jpg";
import image2 from "../../assests/image2.jpg";
import image9 from "../../assests/image9.jpg";
import image4 from "../../assests/image4.jpg";
import image12 from "../../assests/image12.jpg";
import image6 from "../../assests/image6.jpg";

const cards=[
  {
    id:1,
    title:'Mr Silva',
    image:image1,
    text:' Specialist in Allergy and immunology.'
  },

  {
    id:2,
    title:'Dr Lakindu Kavishka',
    image:image2,
    text:'Specialist in Anesthesiology'
  },

  {
    id:3,
    title:'Dr Perera',
    image:image12,
    text:'Specialist in Dermatology'
  },

  {
    id:4,
    title:'Dr Gamage',
    image:image4,
    text:'Specialist in Internal medicine'
  },

  {
    id:5,
    title:'Dr Amarasinghe',
    image:image9,
    text:'Specialist in Diagnostic radiology'
  },

  {
    id:6,
    title:'Dr Namal Gamage',
    image:image6,
    text:'Specialist in Medical genetics'
  }
]
function SearchDoctors(){
  return(
    <div className="doc-home">
    <div className="container d-flex justify-content-center align-items-center h-100 big-info">
      <div className="row">
        
        {
          cards.map(card=>(
            <div className="col-md-4" key={card.id}>
              <SearchDoctor title={card.title} imageSource={card.image} text={card.text}/>
              </div>
          ))
        }
        

        
     
        </div>
      </div>
    </div>
  )
}
export default SearchDoctors;