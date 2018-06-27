import React from 'react'
import axios from 'axios'

class UploardPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	img: "",
      imageUrls: []
    };
    this.imgeHandler = this.imgeHandler.bind(this)
    this.UploardHandler = this.UploardHandler.bind(this)
  }

  imgeHandler(e){
  	this.setState({
  		img: e.target.files[0]
  	})
  	console.log(e.target.files[0])
  }

  UploardHandler(ev){
    let app = this
  	ev.preventDefault();

  	const imageFile = new FormData();
    console.log('this.state.img, this.state.img.name: ', this.state.img, this.state.img.name)
  	imageFile.append('image', this.state.img, this.state.img.name)
  	console.log("imageFile",imageFile)
  	axios.post('/UploardImg',imageFile)
		 .then(function (response) {
		    console.log('uploaded picture successfully: ', response);
        app.setState({
          imageUrls: app.state.imageUrls.concat(`http://localhost:3000/${response.data.file}`),
          img: ''
        }, () => {
          app._picture.value = ''
          app.props.getUrl(app.state.imageUrls)
        })
		  })
		  .catch(function (error) {
		    console.log('problem uploading picture: ', error);
		  });
  }

	render(){
    console.log('img: ', this.state.imageUrl)
		return(
			<div>
        {this.state.imageUrls.map(function(img) {
          return <p key={img}>{img}</p>
        })}
        <input ref={ele => this._picture = ele} type="file" onChange={this.imgeHandler}/>
        <button onClick={this.UploardHandler}>Uploard</button>
        {this.state.imageUrls.map(function(img) {
          return <img key={img} src={img} style={{height: '200px', width: '240px'}}/>
        })}
			</div>
		)
	}
}

export default UploardPicture