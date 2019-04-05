import React, { Component } from 'react';
import { TableCell } from './GenericTable'
import selectImage from '../images/selectimage.jpg';
const axios = require('axios');

const URL = 'http://localhost:5000/'
const IMAGE_URL = `${URL}image`;
  
class Images extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        img1: this.props.images[0] || selectImage,
        img2: this.props.images[1] || selectImage,
        img3: this.props.images[2] || selectImage,
        img4: this.props.images[3] || selectImage
      };
    }

    showImage(img) {
      const src = img !== selectImage ? `${IMAGE_URL}/${img}` : selectImage;
      return <img src={src} className="Select-image" alt="" />;
    };
    newImage = img => <input type="file" accept="image/*,.pdf" onChange={(e) => this.updateImg(img, e.target.files[0])} />;

    updateImg(img, file) {
      const headers = {headers: {'Content-Type': 'multipart/form-data'}};
      const data = new FormData()
      data.append('file', file);

      return axios.post(IMAGE_URL, data, headers)
        .then((response) => this.setState({[img]: file.name}))
        .catch((error) => {      
          console.log('error',error);
        });
    }

    render() {
        return (
          <table>
            <tbody>
              <tr>
                <td>{this.showImage(this.state.img1)}</td>
                <td>{this.showImage(this.state.img2)}</td>
              </tr>
              <tr>
                <td>{this.newImage('img1')}</td>
                <td>{this.newImage('img2')}</td>
              </tr>
              <tr>
                <td>{this.showImage(this.state.img3)}</td>
                <td>{this.showImage(this.state.img4)}</td>
              </tr>
              <tr>
                <td>{this.newImage('img3')}</td>
                <td>{this.newImage('img4')}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                {TableCell("Validate-button", "Retour", 2, () => this.props.cb())}
              </tr>
            </tfoot>
          </table>
        );
    }
}

export default Images;