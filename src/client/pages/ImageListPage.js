import React, { Component } from 'react';

class ImageList extends Component {

  renderImages() {

    let images = [];

      for(let i=0;i < 32;i++){
          for(let j=0;j < 32;j++){
              images.push(<li key={`${i}-${j}`} Style="display:inline-block">
                   <img  src={`/images/IMAGE/IMAGE-${i}-${j}.jpeg`} width="30px" height="25px"/>
              </li>)
          }
      }
       // let images = names.map(name => {
       //     return(
       //     <li key={name} Style="display:inline-block">
       //          <img  src={`/images/${name}`} width="600px" height="400px"/>
       //     </li>
       //   )
       // });

       console.log(images);
       return images;
  }

  render (){
    return (
      <div Style="width:1020px">
              <ul>
                {this.renderImages()}
              </ul>
      </div>
    )
  }
}

export default {
  component: ImageList
}
